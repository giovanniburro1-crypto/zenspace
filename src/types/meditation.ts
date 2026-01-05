export interface MeditationStage {
  id: string;
  name: string;
  duration: number; // in minutes
}

export interface SavedMeditation {
  id: string;
  name: string;
  stages: MeditationStage[];
  selectedMusic: string;
  selectedBackground: string;
  totalDuration: number;
  createdAt: number;
}

export interface MusicOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  audioFile: string;
}

export interface BackgroundOption {
  id: string;
  name: string;
  imageFile: string;
  displayName: string;
}

export type AppScreen = 'home' | 'editor' | 'meditation' | 'complete';
