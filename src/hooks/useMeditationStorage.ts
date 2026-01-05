import { useState, useCallback, useEffect } from 'react';
import { SavedMeditation } from '@/types/meditation';

const STORAGE_KEY = 'zenspace_meditations';

export const useMeditationStorage = () => {
  const [meditations, setMeditations] = useState<SavedMeditation[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Загружаем медитации из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setMeditations(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading meditations:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveMeditation = useCallback((meditation: SavedMeditation) => {
    setMeditations((prev) => {
      const existing = prev.findIndex((m) => m.id === meditation.id);
      let updated: SavedMeditation[];

      if (existing >= 0) {
        // Обновляем существующую
        updated = [...prev];
        updated[existing] = meditation;
      } else {
        // Добавляем новую
        updated = [...prev, meditation];
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteMeditation = useCallback((id: string) => {
    setMeditations((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getMeditation = useCallback(
    (id: string) => {
      return meditations.find((m) => m.id === id);
    },
    [meditations]
  );

  return {
    meditations,
    saveMeditation,
    deleteMeditation,
    getMeditation,
    isLoaded,
  };
};
