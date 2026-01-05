import { useState } from 'react';
import { Heart, X } from 'lucide-react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const amounts = [100, 300, 500];

export const DonateModal = ({ isOpen, onClose }: DonateModalProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  if (!isOpen) return null;

  const handleDonate = () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (amount > 0) {
      alert(`Спасибо за поддержку! Переход к оплате: ${amount}₽`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-in">
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-card border border-border rounded-3xl p-8 max-w-sm w-full slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Heart className="text-primary" size={28} />
          </div>
          <h2 className="text-2xl font-light mb-2">Спасибо за практику</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Если приложение было полезным, вы можете поддержать разработчика.
            <br />
            <span className="text-foreground/70">Сколько считаете нужным.</span>
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-4">
          {amounts.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setSelectedAmount(amount);
                setCustomAmount('');
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedAmount === amount
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {amount}₽
            </button>
          ))}
        </div>

        <input
          type="number"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setSelectedAmount(null);
          }}
          placeholder="Или введите сумму"
          className="w-full mb-6 px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
        />

        <button
          onClick={handleDonate}
          disabled={!selectedAmount && !customAmount}
          className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all disabled:opacity-50"
        >
          Поддержать
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          Может быть позже
        </button>
      </div>
    </div>
  );
};
