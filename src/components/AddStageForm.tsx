import { useState } from 'react';
import { Plus } from 'lucide-react';

const presetStages = ['Дыхание', 'Расслабление', 'Тишина', 'Осознанность', 'Тело'];

interface AddStageFormProps {
  onAdd: (name: string, duration: number) => void;
}

export const AddStageForm = ({ onAdd }: AddStageFormProps) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(5);
  const [showPresets, setShowPresets] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && duration > 0) {
      onAdd(name.trim(), duration);
      setName('');
      setDuration(5);
      setShowPresets(true);
    }
  };

  const handlePresetClick = (preset: string) => {
    setName(preset);
    setShowPresets(false);
  };

  return (
    <div className="zen-card space-y-4">
      <h3 className="text-lg text-muted-foreground">Добавить этап</h3>

      {showPresets && (
        <div className="flex flex-wrap gap-2">
          {presetStages.map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetClick(preset)}
              className="px-4 py-2 rounded-full bg-secondary/50 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              {preset}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setShowPresets(false);
            }}
            placeholder="Название этапа"
            className="zen-input flex-1"
          />
          <div className="flex items-center gap-2 bg-input rounded-xl px-4">
            <input
              type="number"
              value={duration}
              onChange={(e) =>
                setDuration(Math.max(1, parseInt(e.target.value) || 1))
              }
              min="1"
              className="w-12 bg-transparent text-center text-foreground focus:outline-none"
            />
            <span className="text-muted-foreground text-sm">мин</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!name.trim() || duration <= 0}
          className="w-full py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          <Plus size={18} />
          Добавить в цепочку
        </button>
      </form>
    </div>
  );
};
