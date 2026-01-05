import { Plus, Trash2 } from 'lucide-react';
import type { SavedMeditation } from '@/types/meditation';

interface HomeScreenProps {
  meditations: SavedMeditation[];
  onCreateNew: () => void;
  onSelectMeditation: (meditation: SavedMeditation) => void;
  onDeleteMeditation: (id: string) => void;
}

const musicLabels: Record<string, string> = {
  silence: 'Тишина',
  nature: 'Природа',
  water: 'Вода',
  guitar: 'Гитара',
  bowls: 'Чаши',
  ambient: 'Эмбиент',
};

export const HomeScreen = ({
  meditations,
  onCreateNew,
  onSelectMeditation,
  onDeleteMeditation,
}: HomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col px-4 py-8 max-w-md mx-auto fade-in">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-light tracking-wide text-foreground mb-2">
          ZenSpace
        </h1>
        <p className="text-muted-foreground text-sm">
          Мои медитации
        </p>
      </header>

      <section className="flex-1 mb-6">
        {meditations.length > 0 ? (
          <div className="space-y-3">
            {meditations.map((meditation) => (
              <button
                key={meditation.id}
                onClick={() => onSelectMeditation(meditation)}
                className="w-full p-4 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all text-left group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg text-foreground font-medium mb-2">
                      {meditation.name}
                    </h3>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                      <span>⏱️ {meditation.totalDuration} мин</span>
                      <span>🎵 {musicLabels[meditation.selectedMusic] || meditation.selectedMusic}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteMeditation(meditation.id);
                    }}
                    className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="zen-card text-center py-12">
            <p className="text-muted-foreground mb-4">
              Нет сохраненных медитаций
            </p>
            <p className="text-sm text-muted-foreground/60">
              Создай первую медитацию и она появится здесь
            </p>
          </div>
        )}
      </section>

      <section>
        <button
          onClick={onCreateNew}
          className="zen-button-primary w-full flex items-center justify-center gap-3"
        >
          <Plus size={20} />
          <span>Создать медитацию</span>
        </button>
      </section>
    </div>
  );
};
