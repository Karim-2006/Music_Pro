import { MoodType, ActivityType } from "@/store/useMoodStore";
import { MOCK_TRACKS, MOCK_ARTISTS, MOCK_PLAYLISTS, Track, Artist, Playlist } from "./mockData";
import { MusicLibraryManager } from "./musicLibraryManager";
import { SpotifyService } from "./spotifyService";

// Initialize Expanded Library
const manager = MusicLibraryManager.getInstance();
const spotify = new SpotifyService();

// Load initial mock data
MOCK_TRACKS.forEach(t => manager.addTrack(t));
MOCK_ARTISTS.forEach(a => manager.addArtist(a));

// Auto-expand with 1,000 songs on initialization
export async function initializeLibrary() {
  await spotify.bulkImport();
}

export interface Recommendation {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  tags: string[];
  description: string;
}

export async function getAIRecommendation(mood: MoodType, activity: ActivityType): Promise<Recommendation> {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const allTracks = manager.getTracks();
  // Find a track that matches the mood
  const matchingTrack = allTracks.find(t => t.mood.includes(mood)) || allTracks[0];
  
  return {
    id: matchingTrack.id,
    title: matchingTrack.title,
    artist: matchingTrack.artist,
    albumArt: matchingTrack.albumArt,
    tags: matchingTrack.mood.concat([matchingTrack.genre, matchingTrack.language]),
    description: `Perfect ${matchingTrack.genre} blend in ${matchingTrack.language} for your ${mood.toLowerCase()} mood while ${activity.toLowerCase()}.`
  };
}

export async function searchMusic(query: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  const q = query.toLowerCase();
  
  // Ensure library is initialized if not already
  const allTracks = manager.getTracks();
  const allArtists = manager.getArtists();
  
  // If library is empty, we might need to wait for initialization
  if (allTracks.length === 0) {
    console.log("Search: Library empty, waiting for initialization...");
    await initializeLibrary();
  }

  const tracks = manager.getTracks().filter(t => 
    t.title.toLowerCase().includes(q) || 
    t.artist.toLowerCase().includes(q) ||
    t.genre.toLowerCase().includes(q) ||
    t.language.toLowerCase().includes(q)
  );

  const artists = manager.getArtists().filter(a => 
    a.name.toLowerCase().includes(q) ||
    a.genres.some(g => g.toLowerCase().includes(q))
  );
  
  return {
    tracks: tracks.slice(0, 20),
    artists: artists.slice(0, 10),
    playlists: MOCK_PLAYLISTS.filter(p => p.name.toLowerCase().includes(q))
  };
}

export async function getTrendingTracks(): Promise<Track[]> {
  await new Promise(resolve => setTimeout(resolve, 600));
  return manager.getTrendingTracks(10);
}

export async function getMoodTracks(mood: MoodType): Promise<Track[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return manager.getTracksByGenre(mood) || manager.getTracks().filter(t => t.mood.includes(mood));
}

export async function getFeaturedArtists(): Promise<Artist[]> {
  await new Promise(resolve => setTimeout(resolve, 400));
  return MOCK_ARTISTS;
}

export async function getPlaylists(): Promise<Playlist[]> {
  await new Promise(resolve => setTimeout(resolve, 700));
  return MOCK_PLAYLISTS;
}

export async function getWeather(lat: number, lon: number) {
  // Simulate API fetch
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    temp: 24,
    condition: 'Rainy',
    location: 'Bengaluru, IN'
  };
}

export function getMoodInsight(mood: MoodType, activity: ActivityType) {
  const insights = [
    `You've been listening to ${mood.toLowerCase()} music more often during ${activity.toLowerCase()}. This helps reduce stress by 32%.`,
    `Great choice! ${mood} vibes are scientifically proven to enhance ${activity.toLowerCase()} performance.`,
    `The current weather matches your ${mood} mood perfectly. Stay in the flow.`,
    `Your listening patterns suggest you're ready for a productive ${activity.toLowerCase()} session.`
  ];
  return insights[Math.floor(Math.random() * insights.length)];
}
