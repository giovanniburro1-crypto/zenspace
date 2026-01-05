import { Square } from 'lucide-react';
import type { SavedMeditation } from '@/types/meditation';

interface MeditationScreenProps {
  meditation: SavedMeditation;
  currentStageIndex: number;
  totalStages: number;
  timeLeft: number;
  progress: number;
  formatTime: (seconds: number) => string;
  nextStageName: string | null;
  onStop: () => void;
}

const backgroundImages: Record<string, string> = {
  bg1: '/images/дыхание_.jpeg',
  bg2: '/images/размышление.jpg',
  bg3: '/images/images__1_.jpeg',
  bg4: '/images/images__2_.jpeg',
  bg5: '/images/images.jpeg',
};

export const MeditationScreen = ({
  meditation,
  currentStageIndex,
  totalStages,
  timeLeft,
  progress,
  formatTime,
  nextStageName,
  onStop,
}: MeditationScreenProps) => {
  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 fade-in relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImages[meditation.selectedBackground]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10">
        <div className="text-center mb-8">
          <span className="text-muted-foreground text-sm tracking-widest uppercase">
            Этап {currentStageIndex + 1} из {totalStages}
          </span>
        </div>

        <h2 className="text-3xl font-light text-center mb-12 text-foreground max-w-xs">
          {meditation.stages[currentStageIndex]?.name}
        </h2>

        <div className="relative w-80 h-80 mb-12">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 300 300"
          >
            <circle
              cx="150"
              cy="150"
              r="140"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            <circle
              cx="150"
              cy="150"
              r="140"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 1s linear',
              }}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-light text-foreground mb-2">
                {formatTime(timeLeft)}
              </div>
              <div className="text-muted-foreground text-sm">
                {meditation.stages[currentStageIndex]?.duration} мин
              </div>
            </div>
          </div>
        </div>

        {nextStageName && (
          <div className="text-center mb-8">
            <p className="text-muted-foreground text-sm">
              Далее: <span className="text-foreground">{nextStageName}</span>
            </p>
          </div>
        )}

        <button
          onClick={onStop}
          className="zen-button-ghost flex items-center gap-2 mx-auto mt-12"
        >
          <Square size={18} />
          <span>Завершить</span>
        </button>
      </div>
    </div>
  );
};
