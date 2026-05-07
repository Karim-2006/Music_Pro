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
  {
    id: '7',
    title: 'Electric Dreams',
    artist: 'Synthwave Pro',
    albumArt: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=400&fit=crop',
    duration: 215,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    genre: 'Synthwave',
    mood: ['Energetic', 'Focus']
  },
  {
    id: '8',
    title: 'Mountain Mist',
    artist: 'Nature Sounds',
    albumArt: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop',
    duration: 480,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    genre: 'Ambient',
    mood: ['Peaceful', 'Focus']
  },
  {
    id: '9',
    title: 'Urban Jungle',
    artist: 'Street Beats',
    albumArt: 'https://images.unsplash.com/photo-1449156059431-787c1be1f62b?w=400&h=400&fit=crop',
    duration: 195,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    genre: 'Hip Hop',
    mood: ['Energetic', 'Confident']
  },
  {
    id: '10',
    title: 'Ocean Breeze',
    artist: 'Island Vibes',
    albumArt: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop',
    duration: 230,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    genre: 'Reggae',
    mood: ['Happy', 'Chill']
  },
  {
    id: '11',
    title: 'Neon Streets',
    artist: 'Night Crawler',
    albumArt: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=400&fit=crop',
    duration: 310,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    genre: 'Cyberpunk',
    mood: ['Night Drive', 'Dark']
  },
  {
    id: '12',
    title: 'Golden Hour',
    artist: 'Summer Soul',
    albumArt: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=400&fit=crop',
    duration: 275,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    genre: 'Soul',
    mood: ['Happy', 'Romantic']
  },
  {
    id: '13',
    title: 'Starlight Waltz',
    artist: 'Classical Dreams',
    albumArt: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop',
    duration: 410,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
    genre: 'Classical',
    mood: ['Elegant', 'Peaceful']
  },
  {
    id: '14',
    title: 'Thunderstorm Focus',
    artist: 'Atmospheric',
    albumArt: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&h=400&fit=crop',
    duration: 600,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
    genre: 'Ambient',
    mood: ['Rainy Mood', 'Focus']
  },
  {
    id: '15',
    title: 'Phoenix Rising',
    artist: 'Epic Cinematic',
    albumArt: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop',
    duration: 345,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
    genre: 'Cinematic',
    mood: ['Epic', 'Inspirational']
  },
  {
    id: '16',
    title: 'Coffee Shop Jazz',
    artist: 'Smooth Jazz',
    albumArt: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=400&fit=crop',
    duration: 290,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
    genre: 'Jazz',
    mood: ['Chill', 'Focus']
  }
];

export const MOCK_ARTISTS: Artist[] = [
  { id: 'a1', name: 'LoFi Girl', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LoFi', followers: '12M', genres: ['Lo-Fi', 'Ambient'] },
  { id: 'a2', name: 'Synthwave Pro', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Synth', followers: '800K', genres: ['Synthwave', 'Electronic'] },
  { id: 'a3', name: 'Focus Flow', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Focus', followers: '1.5M', genres: ['Ambient', 'Classical'] },
  { id: 'a4', name: 'The Weeknd', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Weeknd', followers: '50M', genres: ['Pop', 'R&B'] },
  { id: 'a5', name: 'Miley Cyrus', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miley', followers: '30M', genres: ['Pop', 'Rock'] },
  { id: 'a6', name: 'Smooth Jazz', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jazz', followers: '2M', genres: ['Jazz', 'Blues'] },
  { id: 'a7', name: 'Nature Sounds', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nature', followers: '5M', genres: ['Ambient', 'Nature'] },
];

export const MOCK_PLAYLISTS: Playlist[] = [
  { id: 'p1', name: 'Late Night Coding', description: 'Deep house and synthwave for high focus.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop', tracks: MOCK_TRACKS.slice(0, 8) },
  { id: 'p2', name: 'Chill Vibes', description: 'Relaxing lo-fi and acoustic tracks.', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop', tracks: MOCK_TRACKS.slice(8, 16) },
  { id: 'p3', name: 'Gym Hype', description: 'Energetic beats to push your limits.', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop', tracks: [MOCK_TRACKS[1], MOCK_TRACKS[6], MOCK_TRACKS[8]] },
  { id: 'p4', name: 'Rainy Day', description: 'Soft music for a cozy rainy day.', image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&h=400&fit=crop', tracks: [MOCK_TRACKS[0], MOCK_TRACKS[13]] },
];

