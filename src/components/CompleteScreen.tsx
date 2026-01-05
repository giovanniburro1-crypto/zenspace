import { RotateCcw } from 'lucide-react';

interface CompleteScreenProps {
  duration: number;
  onRestart: () => void;
}

export const CompleteScreen = ({ duration, onRestart }: CompleteScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-blue-200 flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-5xl">🧘‍♀️</div>
        
        <h1 className="text-3xl font-bold text-gray-900">
          Практика завершена
        </h1>
        
        <p className="text-lg text-gray-700">
          Вы медитировали {duration} минут<br />
          <span className="text-sm text-gray-600">
            Дарим вам время, проведенное с собой
          </span>
        </p>

        <button
          onClick={onRestart}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold flex items-center justify-center gap-3 transition-all shadow-lg"
        >
          <RotateCcw size={20} />
          Вернуться
        </button>
      </div>
    </div>
  );
};
