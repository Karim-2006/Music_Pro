"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Heart, MoreHorizontal, Clock } from "lucide-react";
import { Track } from "@/lib/mockData";
import { usePlayerStore } from "@/store/usePlayerStore";

interface TrackListProps {
  tracks: Track[];
  title: string;
  description?: string;
}

export default function TrackList({ tracks, title, description }: TrackListProps) {
  const { setCurrentTrack, setIsPlaying } = usePlayerStore();

  const handlePlay = (track: Track) => {
    setCurrentTrack({
      id: track.id,
      title: track.title,
      artist: track.artist,
      albumArt: track.albumArt,
      duration: track.duration,
      url: track.url
    });
    setIsPlaying(true);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">{title}</h1>
        {description && <p className="text-gray-400">{description}</p>}
      </div>

      <div className="glass-panel overflow-hidden border-white/5">
        <div className="grid grid-cols-[48px_1fr_1fr_120px_100px] gap-4 px-6 py-4 border-b border-white/5 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <span>#</span>
          <span>Title</span>
          <span>Album / Genre</span>
          <span className="text-center">Action</span>
          <span className="text-right flex items-center justify-end gap-2"><Clock className="w-4 h-4" /> Time</span>
        </div>

        <div className="divide-y divide-white/5">
          {tracks.map((track, idx) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="grid grid-cols-[48px_1fr_1fr_120px_100px] gap-4 px-6 py-4 items-center group hover:bg-white/5 transition-all cursor-pointer"
              onClick={() => handlePlay(track)}
            >
              <span className="text-sm font-bold text-gray-500">{idx + 1}</span>
              <div className="flex items-center gap-4">
                <img src={track.albumArt} className="w-10 h-10 rounded-lg shadow-lg" alt="" />
                <div className="flex flex-col">
                  <span className="font-bold group-hover:text-primary transition-colors truncate max-w-[200px]">{track.title}</span>
                  <span className="text-xs text-gray-500">{track.artist}</span>
                </div>
              </div>
              <span className="text-sm text-gray-400">{track.genre}</span>
              <div className="flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-gray-500 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="p-2 bg-primary/20 hover:bg-primary rounded-full transition-all group/play">
                  <Play className="w-3 h-3 fill-current text-primary group-hover/play:text-white" />
                </button>
                <button className="text-gray-500 hover:text-white transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-gray-500 text-right tabular-nums">03:45</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
