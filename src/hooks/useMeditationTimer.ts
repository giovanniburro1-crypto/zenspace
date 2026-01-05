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
  const stagesRef = useRef(stages);
  const currentStageIndexRef = useRef(0);

  useEffect(() => {
    stagesRef.current = stages;
  }, [stages]);

  const currentStage = stages[currentStageIndex];

  const startTimer = useCallback(() => {
    if (stages.length === 0) return;

    const stageDuration = stages[0].duration * 60;
    setTimeLeft(stageDuration);
    setTotalStageTime(stageDuration);
    setCurrentStageIndex(0);
    currentStageIndexRef.current = 0;
    setIsRunning(true);
    onStageChange(0);
  }, [stages, onStageChange]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  // Main timer loop - updates every 100ms for smooth animation
  useEffect(() => {
    if (!isRunning || stages.length === 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTimeLeft = prev - 0.1;

        if (newTimeLeft <= 0) {
          // Current stage finished, move to next
          const nextIdx = currentStageIndexRef.current + 1;

          if (nextIdx >= stagesRef.current.length) {
            // All stages complete
            setIsRunning(false);
            onComplete();
            return 0;
          } else {
            // Move to next stage
            const nextStageDuration = stagesRef.current[nextIdx].duration * 60;
            setTotalStageTime(nextStageDuration);
            setCurrentStageIndex(nextIdx);
            currentStageIndexRef.current = nextIdx;
            onStageChange(nextIdx);
            return nextStageDuration;
          }
        }

        return newTimeLeft;
      });
    }, 100); // Update every 100ms instead of 1s

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, stages, onComplete, onStageChange]);

  const progress =
    totalStageTime > 0 ? ((totalStageTime - timeLeft) / totalStageTime) * 100 : 0;

  return {
    currentStage,
    currentStageIndex,
    timeLeft: Math.max(0, Math.round(timeLeft)),
    progress: Math.min(100, progress),
    isRunning,
    startTimer,
    stopTimer,
  };
};
