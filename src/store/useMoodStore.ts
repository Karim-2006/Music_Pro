import { create } from 'zustand';

export type MoodType = 'Happy' | 'Chill' | 'Sad' | 'Focus' | 'Romantic' | 'Energetic' | 'Night Drive' | 'Gaming' | 'Workout' | 'Rainy Mood';
export type ActivityType = 'Coding' | 'Studying' | 'Gym' | 'Relaxing' | 'Driving' | 'Streaming';

interface WeatherInfo {
  temp: number;
  condition: string;
  location: string;
}

interface MoodState {
  currentMood: MoodType;
  currentActivity: ActivityType;
  weather: WeatherInfo;
  setMood: (mood: MoodType) => void;
  setActivity: (activity: ActivityType) => void;
  setWeather: (weather: WeatherInfo) => void;
}

export const useMoodStore = create<MoodState>((set) => ({
  currentMood: 'Chill',
  currentActivity: 'Relaxing',
  weather: {
    temp: 24,
    condition: 'Rainy',
    location: 'Bengaluru, IN',
  },
  setMood: (currentMood) => set({ currentMood }),
  setActivity: (currentActivity) => set({ currentActivity }),
  setWeather: (weather) => set({ weather }),
}));
