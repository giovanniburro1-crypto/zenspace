import { useState, useCallback, useEffect } from 'react';
import type { SavedMeditation, AppScreen } from '@/types/meditation';
import { HomeScreen } from './HomeScreen';
import { EditorScreen } from './EditorScreen';
import { MeditationScreen } from './MeditationScreen';
import { CompleteScreen } from './CompleteScreen';
import { useMeditationStorage } from '@/hooks/useMeditationStorage';
import { useMeditationTimer } from '@/hooks/useMeditationTimer';
import { useAudio } from '@/hooks/useAudio';
import { musicOptions } from './MusicSelector';

export const MeditationApp = () => {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [currentMeditation, setCurrentMeditation] = useState<SavedMeditation | null>(
    null
  );
  const [editingMeditation, setEditingMeditation] = useState<SavedMeditation | null>(null);

  const { meditations, saveMeditation, deleteMeditation, isLoaded } =
    useMeditationStorage();
  const { playGong, playCompletionSound, playBackgroundMusic, stopBackgroundMusic } =
    useAudio();

  const {
    currentStageIndex,
    timeLeft,
    progress,
    isRunning,
    startTimer,
    stopTimer,
  } = useMeditationTimer({
    stages: currentMeditation?.stages || [],
    onStageChange: useCallback(
      (stageIndex: number) => {
        if (stageIndex > 0) {
          playGong();
        }
      },
      [playGong]
    ),
    onComplete: useCallback(() => {
      playCompletionSound();
      stopBackgroundMusic();
      setScreen('complete');
    }, [playCompletionSound, stopBackgroundMusic]),
  });

  const handleCreateNew = useCallback(() => {
    setEditingMeditation(null);
    setScreen('editor');
  }, []);

  const handleSelectMeditation = useCallback((meditation: SavedMeditation) => {
    setCurrentMeditation(meditation);
    setEditingMeditation(meditation);
    setScreen('editor');
  }, []);

  const handleDeleteMeditation = useCallback(
    (id: string) => {
      if (confirm('Вы уверены?')) {
        deleteMeditation(id);
      }
    },
    [deleteMeditation]
  );

  const handleSaveMeditation = useCallback(
    (meditation: SavedMeditation) => {
      saveMeditation(meditation);
    },
    [saveMeditation]
  );

  const handleStartMeditation = useCallback(
    (meditation: SavedMeditation) => {
      setCurrentMeditation(meditation);
      setScreen('meditation');

      setTimeout(() => {
        startTimer();

        if (meditation.selectedMusic !== 'silence') {
          const musicFile = musicOptions.find((m) => m.id === meditation.selectedMusic);
          if (musicFile?.audioFile) {
            playBackgroundMusic(musicFile.audioFile);
          }
        }
      }, 100);
    },
    [startTimer, playBackgroundMusic]
  );

  const handleStopMeditation = useCallback(() => {
    stopTimer();
    stopBackgroundMusic();
    setScreen('home');
  }, [stopTimer, stopBackgroundMusic]);

  const handleRestart = useCallback(() => {
    stopBackgroundMusic();
    setScreen('home');
    setCurrentMeditation(null);
  }, [stopBackgroundMusic]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextStageName =
    currentMeditation && currentStageIndex + 1 < currentMeditation.stages.length
      ? currentMeditation.stages[currentStageIndex + 1].name
      : null;

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {screen === 'home' && (
        <HomeScreen
          meditations={meditations}
          onCreateNew={handleCreateNew}
          onSelectMeditation={handleSelectMeditation}
          onDeleteMeditation={handleDeleteMeditation}
        />
      )}

      {screen === 'editor' && (
        <EditorScreen
          initialMeditation={editingMeditation}
          onSave={handleSaveMeditation}
          onClose={() => setScreen('home')}
          onStart={handleStartMeditation}
        />
      )}

      {screen === 'meditation' && currentMeditation && (
        <MeditationScreen
          meditation={currentMeditation}
          currentStageIndex={currentStageIndex}
          totalStages={currentMeditation.stages.length}
          timeLeft={timeLeft}
          progress={progress}
          formatTime={formatTime}
          nextStageName={nextStageName}
          onStop={handleStopMeditation}
        />
      )}

      {screen === 'complete' && currentMeditation && (
        <CompleteScreen
          meditation={currentMeditation}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};
