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

  const currentStage = stages[currentStageIndex];

  const startTimer = useCallback(() => {
    if (stages.length === 0) return;

    const stageDuration = stages[0].duration * 60;
    setTimeLeft(stageDuration);
    setTotalStageTime(stageDuration);
    setCurrentStageIndex(0);
    setIsRunning(true);
    onStageChange(0);
  }, [stages, onStageChange]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  // Main timer loop
  useEffect(() => {
    if (!isRunning || stages.length === 0) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Move to next stage
          setCurrentStageIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;

            if (nextIndex >= stages.length) {
              // Meditation complete
              setIsRunning(false);
              onComplete();
              return prevIndex;
            } else {
              // Start next stage
              const nextStageDuration = stages[nextIndex].duration * 60;
              setTotalStageTime(nextStageDuration);
              onStageChange(nextIndex);
              return nextIndex;
            }
          });

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, stages, onComplete, onStageChange]);

  const progress =
    totalStageTime > 0 ? (totalStageTime - timeLeft) / totalStageTime : 0;

  return {
    currentStage,
    currentStageIndex,
    timeLeft,
    progress,
    isRunning,
    startTimer,
    stopTimer,
  };
};
