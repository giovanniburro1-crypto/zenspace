import { useState, useCallback, useRef, useEffect } from 'react';
import { MeditationStage } from '@/types/meditation';

interface UseMeditationTimerProps {
  stages: MeditationStage[];
  onStageChange: (stageIndex: number) => void;
  onComplete: () => void;
}

export const useMeditationTimer = ({
  stages,
  onStageChange,
  onComplete,
}: UseMeditationTimerProps) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalStageTime, setTotalStageTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (stages.length === 0) return;

    const stageDuration = stages[0].duration * 60;
    setTimeLeft(stageDuration);
    setTotalStageTime(stageDuration);
    setCurrentStageIndex(0);
    setIsRunning(true);
  }, [stages]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  // Call onStageChange when currentStageIndex changes
  useEffect(() => {
    if (isRunning && stages.length > 0) {
      onStageChange(currentStageIndex);
    }
  }, [currentStageIndex, isRunning, stages.length, onStageChange]);

  // Main timer loop - update every 1 second
  useEffect(() => {
    if (!isRunning || stages.length === 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;

        if (newTime <= 0) {
          setCurrentStageIndex((idx) => {
            const nextIdx = idx + 1;
            if (nextIdx >= stages.length) {
              setIsRunning(false);
              onComplete();
              return idx;
            } else {
              const nextDuration = stages[nextIdx].duration * 60;
              setTotalStageTime(nextDuration);
              setTimeLeft(nextDuration);
              return nextIdx;
            }
          });
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, stages, onComplete]);

  const progress =
    totalStageTime > 0 ? ((totalStageTime - timeLeft) / totalStageTime) * 100 : 0;

  return {
    currentStageIndex,
    timeLeft: Math.max(0, timeLeft),
    progress: Math.min(100, progress),
    isRunning,
    startTimer,
    stopTimer,
  };
};
