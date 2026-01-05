import { Trees, Droplets, Music, Bell, Moon, VolumeX } from 'lucide-react';
import type { MusicOption } from '@/types/meditation';

export const musicOptions: MusicOption[] = [
  { id: 'silence', name: 'Тишина', icon: 'silence', description: 'Без звуков', audioFile: '' },
  { id: 'nature', name: 'Природа', icon: 'nature', description: 'Лес и птицы', audioFile: '/audio/nature.mp3' },
  { id: 'water', name: 'Вода', icon: 'water', description: 'Дождь и ручей', audioFile: '/audio/water.mp3' },
  { id: 'guitar', name: 'Гитара', icon: 'guitar', description: 'Спокойные мелодии', audioFile: '/audio/guitar.mp3' },
  { id: 'bowls', name: 'Чаши', icon: 'bowls', description: 'Тибетские звуки', audioFile: '/audio/bowl.mp3' },
  { id: 'ambient', name: 'Эмбиент', icon: 'ambient', description: 'Медитативный дрон', audioFile: '/audio/ambient.mp3' },
];

const IconMap: Record<string, React.ReactNode> = {
  silence: <VolumeX size={24} />,
  nature: <Trees size={24} />,
  water: <Droplets size={24} />,
  guitar: <Music size={24} />,
  bowls: <Bell size={24} />,
  ambient: <Moon size={24} />,
};

interface MusicSelectorProps {
  selectedMusic: string;
  onSelect: (musicId: string) => void;
}

export const MusicSelector = ({ selectedMusic, onSelect }: MusicSelectorProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {musicOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
            selectedMusic === option.id
              ? 'bg-primary/10 border-primary text-foreground'
              : 'bg-secondary/30 border-border hover:border-primary/50 text-muted-foreground'
          }`}
        >
          <div className="text-primary">{IconMap[option.icon]}</div>
          <div className="text-center">
            <p className="text-sm font-medium">{option.name}</p>
            <p className="text-xs text-muted-foreground">{option.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};
