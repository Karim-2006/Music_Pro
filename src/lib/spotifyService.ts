import axios from 'axios';
import { Track, Artist } from './mockData';
import { MusicLibraryManager } from './musicLibraryManager';

export class SpotifyService {
  private clientId: string = process.env.SPOTIFY_CLIENT_ID || '';
  private clientSecret: string = process.env.SPOTIFY_CLIENT_SECRET || '';
  private rapidApiKey: string = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '';
  private rapidApiHost: string = process.env.NEXT_PUBLIC_RAPIDAPI_HOST || 'spotify23.p.rapidapi.com';
  private accessToken: string | null = null;

  /**
   * Fetches real tracks from Spotify via RapidAPI if key is provided,
   * otherwise falls back to simulated data.
   */
  public async fetchPopularTracks(count: number = 1000): Promise<Track[]> {
    if (this.rapidApiKey && this.rapidApiKey !== 'your_rapidapi_key_here') {
      try {
        console.log('Fetching real data from Spotify RapidAPI...');
        return await this.fetchFromRapidAPI(count);
      } catch (error) {
        console.error('RapidAPI fetch failed, falling back to simulation:', error);
      }
    }
    
    return this.generateSimulatedTracks(count);
  }

  private async fetchFromRapidAPI(count: number): Promise<Track[]> {
    const tracks: Track[] = [];
    const searchQueries = ['Hindi Hits 2024', 'English Top Hits', 'Shape of You', 'Arijit Singh Best', 'The Weeknd'];
    
    for (const query of searchQueries) {
      if (tracks.length >= count) break;

      const options = {
        method: 'GET',
        url: `https://${this.rapidApiHost}/search/`,
        params: {
          q: query,
          type: 'tracks',
          offset: '0',
          limit: '50',
          numberOfTopResults: '5'
        },
        headers: {
          'x-rapidapi-key': this.rapidApiKey,
          'x-rapidapi-host': this.rapidApiHost
        }
      };

      const response = await axios.request(options);
      const items = response.data.tracks?.items || [];

      items.forEach((item: any) => {
        const trackData = item.data;
        if (!trackData) return;

        tracks.push({
          id: trackData.id,
          title: trackData.name,
          artist: trackData.artists.items[0]?.profile.name || 'Unknown Artist',
          album: trackData.albumOfTrack.name,
          albumArt: trackData.albumOfTrack.coverArt.sources[0]?.url || '',
          duration: Math.floor(trackData.duration.totalMilliseconds / 1000),
          url: '', // RapidAPI usually doesn't provide direct MP3 links
          genre: 'Popular',
          mood: ['Chill'],
          language: query.toLowerCase().includes('hindi') ? 'Hindi' : 'English',
          popularity: 80
        });
      });
    }

    return tracks.slice(0, count);
  }

  private generateSimulatedTracks(count: number): Track[] {
    const tracks: Track[] = [];
    
    // Popular English Hits Data Seeds
    const englishArtists = ['Ed Sheeran', 'The Weeknd', 'Taylor Swift', 'Dua Lipa', 'Justin Bieber', 'Ariana Grande', 'Drake', 'Harry Styles'];
    const englishGenres = ['Pop', 'R&B', 'Rock', 'Electronic', 'Hip Hop'];
    
    // Popular Hindi Hits Data Seeds
    const hindiArtists = ['Arijit Singh', 'Neha Kakkar', 'Badshah', 'Jubin Nautiyal', 'Shreya Ghoshal', 'Atif Aslam', 'Armaan Malik', 'Pritam'];
    const hindiGenres = ['Bollywood', 'Indie Pop', 'Sufi', 'Classical Fusion'];

    const moods = ['Chill', 'Happy', 'Energetic', 'Focus', 'Romantic', 'Sad'];

    for (let i = 1; i <= count; i++) {
      const isHindi = i > count / 2;
      const language = isHindi ? 'Hindi' : 'English';
      const artistList = isHindi ? hindiArtists : englishArtists;
      const genreList = isHindi ? hindiGenres : englishGenres;
      
      const artist = artistList[Math.floor(Math.random() * artistList.length)];
      const genre = genreList[Math.floor(Math.random() * genreList.length)];
      const mood = [moods[Math.floor(Math.random() * moods.length)]];
      
      // Seed some real trending titles for realism
      let title = `Trending Hit ${i}`;
      if (i === 1) title = "Shape of You";
      if (i === 2) title = "Blinding Lights";
      if (i === 501) title = "Kesariya";
      if (i === 502) title = "Tum Hi Ho";

      tracks.push({
        id: `spotify-${i}`,
        title: title,
        artist: artist,
        album: `Album ${Math.ceil(i / 10)}`,
        albumArt: `https://images.unsplash.com/photo-${1600000000000 + i}?w=400&h=400&fit=crop`,
        duration: 180 + Math.floor(Math.random() * 120),
        url: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i % 16) + 1}.mp3`,
        genre: genre,
        mood: mood,
        language: language as 'Hindi' | 'English',
        popularity: 50 + Math.floor(Math.random() * 50)
      });
    }

    return tracks;
  }

  public async bulkImport() {
    const manager = MusicLibraryManager.getInstance();
    const tracks = await this.fetchPopularTracks(1000);
    
    let addedCount = 0;
    let duplicateCount = 0;

    tracks.forEach(track => {
      if (manager.addTrack(track)) {
        addedCount++;
      } else {
        duplicateCount++;
      }
    });

    console.log(`Bulk Import Complete:`);
    console.log(`- Total Processed: ${tracks.length}`);
    console.log(`- Successfully Added: ${addedCount}`);
    console.log(`- Duplicates Skipped: ${duplicateCount}`);
    
    return { addedCount, duplicateCount };
  }

  // Real Spotify Auth Logic (Placeholder for production)
  private async getAccessToken() {
    if (this.accessToken) return this.accessToken;
    // Implementation would go here if keys were provided
    return 'mock-token';
  }
}
