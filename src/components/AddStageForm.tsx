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
  const [duration, setDuration] = useState(5);
  const [durationInput, setDurationInput] = useState('5');
  const [showPresets, setShowPresets] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && duration > 0) {
      onAdd(name.trim(), duration);
      setName('');
      setDuration(5);
      setDurationInput('5');
      setShowPresets(true);
    }
  };

  const handlePresetClick = (preset: string) => {
    setName(preset);
    setShowPresets(false);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDurationInput(value);
    const num = parseInt(value) || 0;
    setDuration(num);
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
          <div className="flex items-center gap-2 bg-input rounded-xl px-3 py-2 flex-shrink-0">
            <input
              type="text"
              inputMode="numeric"
              value={durationInput}
              onChange={handleDurationChange}
              maxLength="3"
              className="w-10 bg-transparent text-center text-foreground focus:outline-none text-sm"
            />
            <span className="text-muted-foreground text-xs">мин</span>
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
