"use client";

import React from "react";
import { motion } from "framer-motion";
import { useMoodStore, MoodType } from "@/store/useMoodStore";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const moods: { label: MoodType; icon: string; description: string; color: string }[] = [
  { label: "Chill", icon: "🍃", description: "Soft, relaxing beats to unwind", color: "from-teal-500 to-emerald-500" },
  { label: "Focus", icon: "🧠", description: "Deep concentration sounds", color: "from-purple-500 to-indigo-500" },
  { label: "Happy", icon: "😊", description: "Upbeat tracks to lift your spirit", color: "from-amber-500 to-yellow-500" },
  { label: "Sad", icon: "🌧️", description: "Melancholy tunes for deep feels", color: "from-blue-500 to-cyan-500" },
  { label: "Romantic", icon: "💖", description: "Sophisticated jazz and ballads", color: "from-rose-500 to-pink-500" },
  { label: "Energetic", icon: "⚡", description: "High-octane tracks for hype", color: "from-orange-500 to-red-500" },
  { label: "Gaming", icon: "🎮", description: "Intense beats for the win", color: "from-indigo-500 to-blue-500" },
  { label: "Workout", icon: "🏋️", description: "Powerful anthems for the gym", color: "from-red-500 to-orange-500" },
  { label: "Night Drive", icon: "🌃", description: "Cinematic synthwave for cruising", color: "from-violet-500 to-purple-500" },
  { label: "Rainy Mood", icon: "⛈️", description: "Nature sounds and piano", color: "from-sky-500 to-blue-600" },
];

export default function MoodSelector({ onClose }: { onClose: () => void }) {
  const { currentMood, setMood } = useMoodStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
    >
      <div className="glass-panel w-full max-w-4xl p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/20 blur-[100px] -z-10" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">How are you feeling?</h2>
          <p className="text-gray-400">Select a mood to transform your music experience</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {moods.map((mood) => (
            <motion.div
              key={mood.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setMood(mood.label);
                onClose();
              }}
              className={cn(
                "glass-card p-6 flex flex-col items-center text-center cursor-pointer border-none bg-gradient-to-br transition-all duration-500",
                currentMood === mood.label ? "ring-2 ring-primary bg-white/10" : "hover:bg-white/5",
                currentMood === mood.label ? mood.color.replace('from-', 'from-').replace('to-', 'to-').split(' ').map(c => c + '/30').join(' ') : "from-white/5 to-white/5"
              )}
            >
              <div className="text-4xl mb-4">{mood.icon}</div>
              <h3 className="font-bold mb-1">{mood.label}</h3>
              <p className="text-[10px] text-gray-500 leading-tight">{mood.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
