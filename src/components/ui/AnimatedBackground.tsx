"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMoodStore, MoodType } from "@/store/useMoodStore";

const moodGradients: Record<MoodType, string> = {
  'Chill': 'radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)',
  'Focus': 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
  'Happy': 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)',
  'Sad': 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
  'Romantic': 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.15) 0%, transparent 50%)',
  'Energetic': 'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)',
  'Night Drive': 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
  'Gaming': 'radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.15) 0%, transparent 50%)',
  'Workout': 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)',
  'Rainy Mood': 'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)',
};

export default function AnimatedBackground() {
  const { currentMood } = useMoodStore();

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMood}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{ background: moodGradients[currentMood] }}
        />
      </AnimatePresence>
      
      {/* Animated Floating Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, 150, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-blue/10 blur-[150px] rounded-full"
      />
    </div>
  );
}
