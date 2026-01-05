import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import type { MeditationStage, SavedMeditation } from '@/types/meditation';
import { StageItem } from './StageItem';
import { AddStageForm } from './AddStageForm';
import { MusicSelector } from './MusicSelector';
import { BackgroundSelector } from './BackgroundSelector';

interface EditorScreenProps {
  initialMeditation?: SavedMeditation;
  onSave: (meditation: SavedMeditation) => void;
  onClose: () => void;
  onStart: (meditation: SavedMeditation) => void;
}

export const EditorScreen = ({
  initialMeditation,
  onSave,
  onClose,
  onStart,
}: EditorScreenProps) => {
  const [name, setName] = useState('');
  const [stages, setStages] = useState<MeditationStage[]>([]);
  const [selectedMusic, setSelectedMusic] = useState('silence');
  const [selectedBackground, setSelectedBackground] = useState('bg1');
  const [showBackgroundModal, setShowBackgroundModal] = useState(false);

  useEffect(() => {
    if (initialMeditation) {
      setName(initialMeditation.name);
      setStages(initialMeditation.stages);
      setSelectedMusic(initialMeditation.selectedMusic);
      setSelectedBackground(initialMeditation.selectedBackground);
    }
  }, [initialMeditation]);

  const totalDuration = stages.reduce((acc, stage) => acc + stage.duration, 0);

  const handleAddStage = (stageName: string, duration: number) => {
    const newStage: MeditationStage = {
      id: Date.now().toString(),
      name: stageName,
      duration,
    };
    setStages([...stages, newStage]);
  };

  const handleRemoveStage = (id: string) => {
    setStages(stages.filter((stage) => stage.id !== id));
  };

  const handleSaveAndStart = () => {
    if (!name.trim()) {
      alert('Пожалуйста, введите название медитации');
      return;
    }
    if (stages.length === 0) {
      alert('Добавьте хотя бы один этап');
      return;
    }

    const meditation: SavedMeditation = {
      id: initialMeditation?.id || Date.now().toString(),
      name: name.trim(),
      stages,
      selectedMusic,
      selectedBackground,
      totalDuration,
      createdAt: initialMeditation?.createdAt || Date.now(),
    };

    onSave(meditation);
    onStart(meditation);
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('Пожалуйста, введите название медитации');
      return;
    }
    if (stages.length === 0) {
      alert('Добавьте хотя бы один этап');
      return;
    }

    const meditation: SavedMeditation = {
      id: initialMeditation?.id || Date.now().toString(),
      name: name.trim(),
      stages,
      selectedMusic,
      selectedBackground,
      totalDuration,
      createdAt: initialMeditation?.createdAt || Date.now(),
    };

    onSave(meditation);
    onClose();
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 max-w-md mx-auto fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-light text-foreground">
          {initialMeditation ? 'Редактировать' : 'Новая медитация'}
        </h1>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название (Утро, 5 мин, Релакс)"
          className="zen-input w-full text-lg"
        />
      </div>

      <section className="mb-6">
        <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-3">
          Этапы практики
        </h3>
        {stages.length > 0 ? (
          <div className="space-y-2 mb-4">
            {stages.map((stage, index) => (
              <StageItem
                key={stage.id}
                stage={stage}
                index={index}
                onRemove={handleRemoveStage}
              />
            ))}
          </div>
        ) : (
          <div className="zen-card text-center py-6 mb-4">
            <p className="text-muted-foreground text-sm">Добавь первый этап</p>
          </div>
        )}

        {stages.length > 0 && (
          <div className="text-center text-sm text-muted-foreground mb-4">
            Всего: <span className="text-primary font-medium">{totalDuration} мин</span>
          </div>
        )}

        <AddStageForm onAdd={handleAddStage} />
      </section>

      <section className="mb-6">
        <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-3">
          Фоновый звук
        </h3>
        <div className="zen-card p-4">
          <MusicSelector selectedMusic={selectedMusic} onSelect={setSelectedMusic} />
        </div>
      </section>

      <section className="mb-8">
        <button
          onClick={() => setShowBackgroundModal(true)}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
        >
          <span className="text-sm text-muted-foreground uppercase tracking-wider">
            Фон медитации
          </span>
          <span className="text-primary">⚙️</span>
        </button>
      </section>

      <div className="flex gap-3 mt-auto pt-4">
        <button
          onClick={handleSave}
          disabled={!name.trim() || stages.length === 0}
          className="flex-1 py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-medium transition-all disabled:opacity-50"
        >
          Сохранить
        </button>
        <button
          onClick={handleSaveAndStart}
          disabled={!name.trim() || stages.length === 0}
          className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Начать
        </button>
      </div>

      {showBackgroundModal && (
        <BackgroundSelector
          selectedBackground={selectedBackground}
          onSelect={setSelectedBackground}
          onClose={() => setShowBackgroundModal(false)}
        />
      )}
    </div>
  );
};
