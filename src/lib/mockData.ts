export interface Track {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  duration: number;
  url: string;
  genre: string;
  mood: string[];
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  followers: string;
  genres: string[];
}

export interface Playlist {
  id: string;
  name: string;
  image: string;
  description: string;
  tracks: Track[];
}

export const MOCK_TRACKS: Track[] = [
  { 
    id: '1', 
    title: 'Midnight Raindrops', 
    artist: 'LoFi Girl', 
    albumArt: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop', 
    duration: 156, 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 
    genre: 'Lo-Fi', 
    mood: ['Chill', 'Rainy Mood'] 
  },
  { 
    id: '2', 
    title: 'Cyberpunk Drive', 
    artist: 'Synthwave Pro', 
    albumArt: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400&h=400&fit=crop', 
    duration: 422, 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', 
    genre: 'Synthwave', 
    mood: ['Energetic', 'Night Drive'] 
  },
  { 
    id: '3', 
    title: 'Deep Work Flow', 
    artist: 'Focus Flow', 
    albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop', 
    duration: 362, 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', 
    genre: 'Ambient', 
    mood: ['Focus'] 
  },
  { 
    id: '4', 
    title: 'Sunshine Grooves', 
    artist: 'Feel Good Inc.', 
    albumArt: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=400&fit=crop', 
    duration: 311, 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', 
    genre: 'Pop', 
    mood: ['Happy'] 
  },
  { 
    id: '5', 
    title: 'Melancholy Skies', 
    artist: 'Blue Notes', 
    albumArt: 'https://images.unsplash.com/photo-1514525253344-f81bad3b7438?w=400&h=400&fit=crop', 
    duration: 245, 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', 
    genre: 'Acoustic', 
    mood: ['Sad'] 
  },
  { 
    id: '6', 
    title: 'Velvet Nights', 
    artist: 'Smooth Jazz', 
    albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop', 
    duration: 280, 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', 
    genre: 'Jazz', 
    mood: ['Romantic'] 
  },
];

export const MOCK_ARTISTS: Artist[] = [
  { id: 'a1', name: 'LoFi Girl', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LoFi', followers: '12M', genres: ['Lo-Fi', 'Ambient'] },
  { id: 'a2', name: 'Synthwave Pro', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Synth', followers: '800K', genres: ['Synthwave', 'Electronic'] },
  { id: 'a3', name: 'Focus Flow', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Focus', followers: '1.5M', genres: ['Ambient', 'Classical'] },
  { id: 'a4', name: 'The Weeknd', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Weeknd', followers: '50M', genres: ['Pop', 'R&B'] },
  { id: 'a5', name: 'Miley Cyrus', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miley', followers: '30M', genres: ['Pop', 'Rock'] },
];

export const MOCK_PLAYLISTS: Playlist[] = [
  { id: 'p1', name: 'Late Night Coding', description: 'Deep house and synthwave for high focus.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop', tracks: MOCK_TRACKS.slice(0, 5) },
  { id: 'p2', name: 'Chill Vibes', description: 'Relaxing lo-fi and acoustic tracks.', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop', tracks: MOCK_TRACKS.slice(5, 10) },
  { id: 'p3', name: 'Gym Hype', description: 'Energetic beats to push your limits.', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop', tracks: [MOCK_TRACKS[1], MOCK_TRACKS[8]] },
];
