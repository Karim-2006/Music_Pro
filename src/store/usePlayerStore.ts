import { create } from 'zustand';
import { Track } from '@/lib/mockData';

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  queue: Track[];
  audio: HTMLAudioElement | null;
  setCurrentTrack: (track: Track) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  progress: 0,
  queue: [],
  audio: typeof Audio !== 'undefined' ? new Audio() : null,

  setCurrentTrack: (track) => {
    const { audio } = get();
    if (audio) {
      audio.pause();
      audio.src = track.url || ''; // Ensure it's a string
      if (track.url) {
        audio.play().catch(e => console.error("Error playing audio:", e));
      }
      set({ currentTrack: track, isPlaying: !!track.url, progress: 0 });
      
      audio.ontimeupdate = () => {
        set({ progress: (audio.currentTime / audio.duration) * 100 });
      };
      
      audio.onended = () => {
        get().playNext();
      };
    }
  },

  setIsPlaying: (isPlaying) => {
    const { audio } = get();
    if (audio) {
      if (isPlaying) {
        audio.play().catch(e => console.error("Error playing audio:", e));
      } else {
        audio.pause();
      }
      set({ isPlaying });
    }
  },

  setVolume: (volume) => {
    const { audio } = get();
    if (audio) {
      audio.volume = volume;
      set({ volume });
    }
  },

  setProgress: (progress) => {
    const { audio } = get();
    if (audio && audio.duration) {
      audio.currentTime = (progress / 100) * audio.duration;
      set({ progress });
    }
  },

  addToQueue: (track) => set((state) => ({ queue: [...state.queue, track] })),
  removeFromQueue: (trackId) => set((state) => ({ queue: state.queue.filter(t => t.id !== trackId) })),
  
  playNext: () => {
    const { queue, currentTrack } = get();
    if (queue.length > 0) {
      const nextTrack = queue[0];
      set({ queue: queue.slice(1) });
      get().setCurrentTrack(nextTrack);
    } else {
      set({ isPlaying: false });
    }
  },
  
  playPrevious: () => {
    // Logic to play previous track
  },
}));
