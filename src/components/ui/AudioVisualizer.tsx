"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AudioVisualizerProps {
  isPlaying: boolean;
  className?: string;
  barCount?: number;
}

export default function AudioVisualizer({ isPlaying, className, barCount = 40 }: AudioVisualizerProps) {
  return (
    <div className={cn("flex items-end gap-[2px] h-full", className)}>
      {[...Array(barCount)].map((_, i) => (
        <motion.div
          key={i}
          className="w-full bg-primary rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"
          initial={{ height: "4px" }}
          animate={{
            height: isPlaying 
              ? [`${Math.random() * 20 + 10}%`, `${Math.random() * 80 + 20}%`, `${Math.random() * 40 + 10}%`] 
              : "4px"
          }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.02
          }}
        />
      ))}
    </div>
  );
}
