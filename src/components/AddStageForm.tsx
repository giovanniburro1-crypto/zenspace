import { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddStageFormProps {
  onAdd: (name: string, duration: number) => void;
}

const presetStages = [
  'Дыхание',
  'Расслабление',
  'Размышление',
  'Концентрация',
  'Отпускание',
];

export const AddStageForm = ({ onAdd }: AddStageFormProps) => {
  const [name, setName] = useState('');
  const [durationInput, setDurationInput] = useState('5');
  const [showPresets, setShowPresets] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const duration = parseInt(durationInput) || 0;
    if (name.trim() && duration > 0) {
      onAdd(name.trim(), duration);
      setName('');
      setDurationInput('5');
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
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setShowPresets(false);
            }}
            placeholder="Название этапа"
            className="zen-input flex-1 min-w-0"
          />
          <div className="flex items-center gap-1 bg-input rounded-xl px-2 py-2 flex-shrink-0">
            <input
              type="text"
              inputMode="numeric"
              value={durationInput}
              onChange={(e) => setDurationInput(e.target.value)}
              maxLength="2"
              className="w-7 bg-transparent text-center text-foreground focus:outline-none text-sm"
            />
            <span className="text-muted-foreground text-xs">м</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!name.trim() || !durationInput || parseInt(durationInput) <= 0}
          className="w-full py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          <Plus size={18} />
          Добавить в цепочку
        </button>
      </form>
    </div>
  );
};
