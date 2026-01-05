import { X, GripVertical } from 'lucide-react';
import type { MeditationStage } from '@/types/meditation';

interface StageItemProps {
  stage: MeditationStage;
  index: number;
  onRemove: (id: string) => void;
}

export const StageItem = ({ stage, index, onRemove }: StageItemProps) => {
  return (
    <div className="flex items-center gap-4 group p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
      <div className="text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity">
        <GripVertical size={18} />
      </div>

      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-primary/60 text-sm font-medium">{index + 1}.</span>
          <span className="text-foreground">{stage.name}</span>
        </div>
        <span className="text-sm text-muted-foreground">{stage.duration} мин</span>
      </div>

      <button
        onClick={() => onRemove(stage.id)}
        className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
      >
        <X size={18} />
      </button>
    </div>
  );
};
