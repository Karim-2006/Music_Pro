"use client";

import React from "react";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Shuffle, 
  Volume2, 
  Maximize2, 
  ListMusic,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/store/usePlayerStore";

import AudioVisualizer from "../ui/AudioVisualizer";

export default function PlayerBar() {
  const { currentTrack, isPlaying, setIsPlaying, volume, setVolume, progress } = usePlayerStore();

  if (!currentTrack) return null;

  return (
    <footer className="h-20 md:h-24 bg-black/60 backdrop-blur-2xl border-t border-white/10 px-4 md:px-6 flex items-center justify-between fixed bottom-16 lg:bottom-0 left-0 right-0 z-50">
      {/* Current Track Info */}
      <div className="flex items-center gap-3 md:gap-4 w-[40%] md:w-[30%]">
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg overflow-hidden relative group cursor-pointer shadow-lg shadow-black/40 shrink-0">
          <img 
            src={currentTrack.albumArt} 
            alt={currentTrack.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Maximize2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
        </div>
        <div className="min-w-0">
          <h4 className="text-xs md:text-sm font-bold text-white hover:underline cursor-pointer truncate">{currentTrack.title}</h4>
          <p className="text-[10px] md:text-xs text-gray-400 hover:text-white cursor-pointer transition-colors truncate">{currentTrack.artist}</p>
        </div>
        <button className="hidden sm:block ml-2 text-gray-500 hover:text-red-500 transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Controls & Progress */}
      <div className="flex flex-col items-center gap-1 md:gap-2 flex-1 max-w-2xl px-4">
        <div className="flex items-center gap-4 md:gap-6">
          <button className="hidden md:block text-gray-500 hover:text-primary transition-colors">
            <Shuffle className="w-4 h-4" />
          </button>
          <button className="text-gray-300 hover:text-white transition-colors">
            <SkipBack className="w-5 h-5 md:w-6 md:h-6 fill-current" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 md:w-6 md:h-6 text-black fill-current" />
            ) : (
              <Play className="w-5 h-5 md:w-6 md:h-6 text-black fill-current ml-0.5 md:ml-1" />
            )}
          </button>
          <button className="text-gray-300 hover:text-white transition-colors">
            <SkipForward className="w-5 h-5 md:w-6 md:h-6 fill-current" />
          </button>
          <button className="hidden md:block text-gray-500 hover:text-primary transition-colors">
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-3 w-full group">
          <span className="text-[10px] font-medium text-gray-500 w-8 text-right">01:24</span>
          <div className="h-1 flex-1 bg-white/10 rounded-full relative overflow-hidden cursor-pointer">
            <div 
              className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] font-medium text-gray-500 w-8">03:45</span>
        </div>
      </div>

      {/* Volume & Extra Tools */}
      <div className="flex items-center justify-end gap-2 md:gap-4 w-[20%] md:w-[30%]">
        {/* Animated Visualizer */}
        <div className="hidden md:block">
          <AudioVisualizer isPlaying={isPlaying} className="h-6 w-32 mr-4 opacity-60" barCount={24} />
        </div>
        
        <button className="hidden sm:block text-gray-400 hover:text-white transition-colors">
          <ListMusic className="w-5 h-5" />
        </button>
        <div className="hidden md:flex items-center gap-2 group w-24 md:w-32">
          <Volume2 className="w-5 h-5 text-gray-400 group-hover:text-white" />
          <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden cursor-pointer">
            <div 
              className="h-full bg-white/60 transition-colors group-hover:bg-primary" 
              style={{ width: `${volume * 100}%` }}
            />
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}

