"use client";

import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { useMoodStore, MoodType } from "@/store/useMoodStore";
import { cn } from "@/lib/utils";

const moods: { label: MoodType; icon: string; description: string; color: string; bg: string }[] = [
  { label: "Chill", icon: "🍃", description: "Soft, relaxing beats to unwind", color: "from-teal-500 to-emerald-500", bg: "bg-teal-500/10" },
  { label: "Focus", icon: "🧠", description: "Deep concentration sounds", color: "from-purple-500 to-indigo-500", bg: "bg-purple-500/10" },
  { label: "Happy", icon: "😊", description: "Upbeat tracks to lift your spirit", color: "from-amber-500 to-yellow-500", bg: "bg-amber-500/10" },
  { label: "Sad", icon: "🌧️", description: "Melancholy tunes for deep feels", color: "from-blue-500 to-cyan-500", bg: "bg-blue-500/10" },
  { label: "Romantic", icon: "💖", description: "Sophisticated jazz and ballads", color: "from-rose-500 to-pink-500", bg: "bg-rose-500/10" },
  { label: "Energetic", icon: "⚡", description: "High-octane tracks for hype", color: "from-orange-500 to-red-500", bg: "bg-orange-500/10" },
  { label: "Gaming", icon: "🎮", description: "Intense beats for the win", color: "from-indigo-500 to-blue-500", bg: "bg-indigo-500/10" },
  { label: "Workout", icon: "🏋️", description: "Powerful anthems for the gym", color: "from-red-500 to-orange-500", bg: "bg-red-500/10" },
  { label: "Night Drive", icon: "🌃", description: "Cinematic synthwave for cruising", color: "from-violet-500 to-purple-500", bg: "bg-violet-500/10" },
  { label: "Rainy Mood", icon: "⛈️", description: "Nature sounds and piano", color: "from-sky-500 to-blue-600", bg: "bg-sky-500/10" },
];

export default function MoodPage() {
  const { currentMood, setMood } = useMoodStore();

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto space-y-12 py-8">
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold tracking-tight"
          >
            How are you feeling today?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Select a mood to transform your music experience and visual environment.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {moods.map((mood, idx) => (
            <motion.div
              key={mood.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMood(mood.label)}
              className={cn(
                "glass-panel p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-500 border-none relative overflow-hidden group",
                currentMood === mood.label ? "ring-2 ring-primary bg-white/10" : "hover:bg-white/5",
                mood.bg
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))` }} />
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">{mood.icon}</div>
              <h3 className="text-xl font-bold mb-2">{mood.label}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{mood.description}</p>
              
              {currentMood === mood.label && (
                <motion.div 
                  layoutId="active-mood"
                  className="absolute bottom-4 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                />
              )}
            </motion.div>
          ))}
        </div>

        <section className="glass-panel p-10 bg-primary/5 border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -z-10" />
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold">Current Vibe: <span className="text-primary">{currentMood}</span></h2>
              <p className="text-gray-400 leading-relaxed">
                Your entire experience—including music recommendations, background animations, and UI highlights—is now tuned to <strong>{currentMood}</strong>.
              </p>
              <div className="flex gap-4">
                <button className="cyber-button">Start Listening</button>
                <button className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all">Customize Theme</button>
              </div>
            </div>
            <div className="w-48 h-48 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 relative">
               <div className="text-7xl animate-bounce">
                 {moods.find(m => m.label === currentMood)?.icon}
               </div>
               <div className="absolute -inset-4 bg-primary/20 blur-2xl -z-10 animate-pulse" />
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
