import { X, Check } from 'lucide-react';

interface BackgroundSelectorProps {
  selectedBackground: string;
  onSelect: (backgroundId: string) => void;
  onClose: () => void;
}

const backgrounds = [
  { id: 'bg1', name: 'Вода и медитация', image: '/images/дыхание_.jpeg' },
  { id: 'bg2', name: 'Энергия ума', image: '/images/размышление.jpg' },
  { id: 'bg3', name: 'Золотое свечение', image: '/images/images__1_.jpeg' },
  { id: 'bg4', name: 'Стихии', image: '/images/images__2_.jpeg' },
  { id: 'bg5', name: 'Космос', image: '/images/images.jpeg' },
];

export const BackgroundSelector = ({
  selectedBackground,
  onSelect,
  onClose,
}: BackgroundSelectorProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 fade-in">
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-card border border-border rounded-3xl p-6 max-w-sm w-full slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light text-foreground">Выбор фона</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {backgrounds.map((bg) => (
            <button
              key={bg.id}
              onClick={() => {
                onSelect(bg.id);
                onClose();
              }}
              className={`relative rounded-2xl overflow-hidden aspect-square transition-all border-2 ${
                selectedBackground === bg.id
                  ? 'border-primary ring-2 ring-primary/30'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <img
                src={bg.image}
                alt={bg.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col items-end justify-between p-2">
                {selectedBackground === bg.id && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check size={16} className="text-primary-foreground" />
                  </div>
                )}
              </div>
              <span className="absolute bottom-2 left-2 text-xs text-white font-medium truncate max-w-[calc(100%-16px)]">
                {bg.name}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-medium transition-all"
        >
          Готово
        </button>
      </div>
    </div>
  );
};
