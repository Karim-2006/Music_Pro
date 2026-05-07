"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, Music, Disc, User, Play } from "lucide-react";
import { searchMusic } from "@/lib/services";
import { Track, Artist, Playlist } from "@/lib/mockData";
import { usePlayerStore } from "@/store/usePlayerStore";

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ tracks: Track[], artists: Artist[], playlists: Playlist[] } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { setCurrentTrack, setIsPlaying } = usePlayerStore();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim()) {
        setIsSearching(true);
        const data = await searchMusic(query);
        setResults(data);
        setIsSearching(false);
      } else {
        setResults(null);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handlePlay = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#020617]/98 backdrop-blur-2xl p-8 overflow-y-auto scroll-hide"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12 sticky top-0 bg-transparent z-10 py-4">
          <div className="flex items-center gap-4 flex-1">
            <SearchIcon className={isSearching ? "w-8 h-8 text-primary animate-pulse" : "w-8 h-8 text-primary"} />
            <input 
              autoFocus
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for anything..."
              className="bg-transparent text-4xl font-bold w-full focus:outline-none placeholder:text-white/10"
            />
          </div>
          <button 
            onClick={onClose}
            className="p-4 hover:bg-white/5 rounded-full transition-colors"
          >
            <X className="w-8 h-8 text-gray-400" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!results ? (
            <motion.div 
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              <section>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Suggestions</h3>
                <div className="space-y-4">
                  {['Lofi Chill', 'Synthwave', 'Gaming Beats', 'Workout Hype'].map(s => (
                    <div 
                      key={s} 
                      onClick={() => setQuery(s)}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-primary/20 cursor-pointer transition-all border border-white/5"
                    >
                      <SearchIcon className="w-4 h-4 text-gray-500" />
                      <span className="font-bold">{s}</span>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              {results.tracks.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Tracks</h3>
                  <div className="space-y-2">
                    {results.tracks.map(track => (
                      <div 
                        key={track.id} 
                        onClick={() => handlePlay(track)}
                        className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer group transition-all"
                      >
                        <img src={track.albumArt} className="w-12 h-12 rounded-xl" alt="" />
                        <div className="flex-1">
                          <p className="font-bold group-hover:text-primary transition-colors">{track.title}</p>
                          <p className="text-xs text-gray-500">{track.artist}</p>
                        </div>
                        <Play className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {results.artists.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Artists</h3>
                  <div className="flex gap-6 overflow-x-auto pb-4 scroll-hide">
                    {results.artists.map(artist => (
                      <div key={artist.id} className="flex flex-col items-center gap-3 min-w-[100px] group cursor-pointer">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/5 group-hover:border-primary transition-all">
                          <img src={artist.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <p className="text-sm font-bold text-center">{artist.name}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
