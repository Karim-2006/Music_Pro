import { MoodType, ActivityType } from "@/store/useMoodStore";
import { MOCK_TRACKS, MOCK_ARTISTS, MOCK_PLAYLISTS, Track, Artist, Playlist } from "./mockData";

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
  
  // Find a track that matches the mood
  const matchingTrack = MOCK_TRACKS.find(t => t.mood.includes(mood)) || MOCK_TRACKS[0];
  
  return {
    id: matchingTrack.id,
    title: matchingTrack.title,
    artist: matchingTrack.artist,
    albumArt: matchingTrack.albumArt,
    tags: matchingTrack.mood.concat([matchingTrack.genre]),
    description: `Perfect ${matchingTrack.genre} blend for your ${mood.toLowerCase()} mood while ${activity.toLowerCase()}.`
  };
}

export async function searchMusic(query: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  const q = query.toLowerCase();
  
  return {
    tracks: MOCK_TRACKS.filter(t => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q)),
    artists: MOCK_ARTISTS.filter(a => a.name.toLowerCase().includes(q)),
    playlists: MOCK_PLAYLISTS.filter(p => p.name.toLowerCase().includes(q))
  };
}

export async function getTrendingTracks(): Promise<Track[]> {
  await new Promise(resolve => setTimeout(resolve, 600));
  // Simulate some randomness for "real-time" feel
  return [...MOCK_TRACKS].sort(() => Math.random() - 0.5).slice(0, 10);
}

export async function getMoodTracks(mood: MoodType): Promise<Track[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_TRACKS.filter(t => t.mood.includes(mood));
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
