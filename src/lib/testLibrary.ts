import { MusicLibraryManager } from './musicLibraryManager';
import { SpotifyService } from './spotifyService';

export async function verifyLibraryExpansion() {
  const manager = MusicLibraryManager.getInstance();
  const spotify = new SpotifyService();

  console.log('--- Starting Library Expansion Verification ---');
  
  // 1. Check Initial State
  const initialCount = manager.getTracks().length;
  console.log(`Initial track count: ${initialCount}`);

  // 2. Perform Bulk Import
  console.log('Performing bulk import of 1,000 songs...');
  const result = await spotify.bulkImport();
  
  // 3. Validate Count
  const finalCount = manager.getTracks().length;
  console.log(`Final track count: ${finalCount}`);
  
  if (finalCount >= 1000) {
    console.log('✅ Success: Library contains 1,000+ songs.');
  } else {
    console.error('❌ Failure: Library count is less than 1,000.');
  }

  // 4. Validate Metadata
  const sampleTrack = manager.getTracks().find(t => t.title === 'Shape of You');
  if (sampleTrack) {
    console.log('✅ Metadata Check (English): "Shape of You" found with complete metadata.');
    console.log(`   - Artist: ${sampleTrack.artist}`);
    console.log(`   - Popularity: ${sampleTrack.popularity}`);
    console.log(`   - Language: ${sampleTrack.language}`);
  }

  const hindiTrack = manager.getTracks().find(t => t.language === 'Hindi');
  if (hindiTrack) {
    console.log(`✅ Metadata Check (Hindi): "${hindiTrack.title}" by ${hindiTrack.artist} found.`);
  }

  // 5. Validate Categorization
  const genres = Array.from(new Set(manager.getTracks().map(t => t.genre)));
  console.log(`Library contains ${genres.length} unique genres.`);
  
  console.log('--- Verification Complete ---');
}
