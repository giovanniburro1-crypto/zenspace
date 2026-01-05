import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { SavedMeditation } from '@/types/meditation';
import { DonateModal } from './DonateModal';

interface CompleteScreenProps {
  meditation: SavedMeditation;
  onRestart: () => void;
}

const backgroundImages: Record<string, string> = {
  bg1: '/images/дыхание_.jpeg',
  bg2: '/images/размышление.jpg',
  bg3: '/images/images__1_.jpeg',
  bg4: '/images/images__2_.jpeg',
  bg5: '/images/images.jpeg',
};

export const CompleteScreen = ({
  meditation,
  onRestart,
}: CompleteScreenProps) => {
  const [showDonateModal, setShowDonateModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDonateModal(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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

      <div className="relative z-10 text-center">
        <h2 className="text-3xl font-light tracking-wide mb-4 text-foreground">
          Практика завершена
        </h2>
        <p className="text-muted-foreground mb-2">
          Вы медитировали {meditation.totalDuration} минут
        </p>
        <p className="text-sm text-muted-foreground/60 mb-12">
          Благодарим за время, проведённое с собой
        </p>

        <button
          onClick={onRestart}
          className="zen-button-ghost flex items-center gap-2 mx-auto"
        >
          <ArrowLeft size={18} />
          <span>Вернуться</span>
        </button>
      </div>

      <DonateModal
        isOpen={showDonateModal}
        onClose={() => setShowDonateModal(false)}
      />
    </div>
  );
};
