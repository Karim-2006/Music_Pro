import { Track, Artist } from './mockData';

export class MusicLibraryManager {
  private static instance: MusicLibraryManager;
  private tracks: Map<string, Track> = new Map();
  private artists: Map<string, Artist> = new Map();

  private constructor() {}

  public static getInstance(): MusicLibraryManager {
    if (!MusicLibraryManager.instance) {
      MusicLibraryManager.instance = new MusicLibraryManager();
    }
    return MusicLibraryManager.instance;
  }

  /**
   * Adds a track to the library with duplicate validation
   * @returns true if added, false if duplicate
   */
  public addTrack(track: Track): boolean {
    // Check for duplicates by title and artist
    const duplicate = Array.from(this.tracks.values()).find(
      (t) => 
        t.title.toLowerCase() === track.title.toLowerCase() && 
        t.artist.toLowerCase() === track.artist.toLowerCase()
    );

    if (duplicate) {
      console.warn(`Duplicate track detected: ${track.title} by ${track.artist}`);
      return false;
    }

    this.tracks.set(track.id, track);
    return true;
  }

  public addArtist(artist: Artist): boolean {
    if (this.artists.has(artist.id)) return false;
    this.artists.set(artist.id, artist);
    return true;
  }

  public getTracks(): Track[] {
    return Array.from(this.tracks.values());
  }

  public getArtists(): Artist[] {
    return Array.from(this.artists.values());
  }

  public getTracksByLanguage(language: 'Hindi' | 'English'): Track[] {
    return this.getTracks().filter((t) => t.language === language);
  }

  public getTracksByGenre(genre: string): Track[] {
    return this.getTracks().filter((t) => t.genre === genre);
  }

  public getTrendingTracks(limit: number = 10): Track[] {
    return this.getTracks()
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit);
  }

  public clearLibrary() {
    this.tracks.clear();
    this.artists.clear();
  }
}
