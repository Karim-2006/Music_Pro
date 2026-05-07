"use client";

import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { Track, Artist, Playlist } from "@/lib/mockData";
import { Play, Heart, MoreHorizontal, User, Loader2 } from "lucide-react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { getFeaturedArtists, getPlaylists, getTrendingTracks } from "@/lib/services";

export default function ExplorePage() {
  const { setCurrentTrack, setIsPlaying } = usePlayerStore();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [t, a, p] = await Promise.all([
        getTrendingTracks(),
        getFeaturedArtists(),
        getPlaylists()
      ]);
      setTracks(t);
      setArtists(a);
      setPlaylists(p);
      setLoading(false);
    }
    fetchData();
  }, []);
  
  const handlePlay = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-gray-500 font-medium animate-pulse">Exploring the musical universe...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-12">
        <section>
          <h1 className="text-4xl font-bold mb-8">Explore Music</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playlists.map((playlist, idx) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-6 group cursor-pointer hover:bg-white/10 transition-all overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] -z-10 group-hover:bg-primary/30 transition-all" />
                <div className="flex gap-4">
                  <img src={playlist.image} className="w-24 h-24 rounded-xl object-cover shadow-lg" alt={playlist.name} />
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{playlist.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{playlist.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Trending Artists</h2>
          <div className="flex gap-8 overflow-x-auto pb-4 scroll-hide">
            {artists.map((artist, idx) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center gap-4 min-w-[120px] group cursor-pointer"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary/50 transition-all relative">
                  <img src={artist.image} className="w-full h-full object-cover" alt={artist.name} />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <User className="text-white w-8 h-8" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm group-hover:text-primary transition-colors">{artist.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">{artist.followers} Followers</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">New Releases</h2>
          <div className="space-y-2">
            {tracks.map((track, idx) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 group cursor-pointer transition-all"
                onClick={() => handlePlay(track)}
              >
                <span className="text-sm font-bold text-gray-500 w-6">{idx + 1}</span>
                <img src={track.albumArt} className="w-12 h-12 rounded-lg" alt={track.title} />
                <div className="flex-1">
                  <p className="font-bold group-hover:text-primary transition-colors">{track.title}</p>
                  <p className="text-xs text-gray-500">{track.artist}</p>
                </div>
                <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-gray-500 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-primary rounded-full hover:scale-110 transition-all">
                    <Play className="w-4 h-4 fill-current text-white ml-0.5" />
                  </button>
                  <button className="text-gray-500 hover:text-white transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-xs text-gray-500 w-12 text-right">03:45</span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
