"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudRain, Clock, Smile, Headset, Play, MoreHorizontal, TrendingUp, TrendingDown, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMoodStore, MoodType } from "@/store/useMoodStore";
import { getAIRecommendation, Recommendation, getMoodInsight, getTrendingTracks, initializeLibrary } from "@/lib/services";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Track } from "@/lib/mockData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const moods: { label: MoodType; listeners: string; icon: string; color: string }[] = [
  { label: "Chill", listeners: "12.5K", icon: "🍃", color: "from-teal-500/20 to-emerald-500/20" },
  { label: "Focus", listeners: "9.8K", icon: "🧠", color: "from-purple-500/20 to-indigo-500/20" },
  { label: "Happy", listeners: "15.2K", icon: "😊", color: "from-amber-500/20 to-yellow-500/20" },
  { label: "Sad", listeners: "7.1K", icon: "🌧️", color: "from-blue-500/20 to-cyan-500/20" },
  { label: "Romantic", listeners: "8.7K", icon: "💖", color: "from-rose-500/20 to-pink-500/20" },
  { label: "Energetic", listeners: "10.3K", icon: "⚡", color: "from-orange-500/20 to-red-500/20" },
  { label: "Gaming", listeners: "6.4K", icon: "🎮", color: "from-indigo-500/20 to-blue-500/20" },
  { label: "Workout", listeners: "11.2K", icon: "🏋️", color: "from-red-500/20 to-orange-500/20" },
];

export default function Dashboard() {
  const { currentMood, currentActivity, weather, setMood } = useMoodStore();
  const { setCurrentTrack, setIsPlaying } = usePlayerStore();
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [insight, setInsight] = useState("");
  const [trendingTracks, setTrendingTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await initializeLibrary();
      const [rec, trending] = await Promise.all([
        getAIRecommendation(currentMood, currentActivity),
        getTrendingTracks()
      ]);
      setRecommendation(rec);
      setTrendingTracks(trending.slice(0, 5));
      setInsight(getMoodInsight(currentMood, currentActivity));
      setIsLoading(false);
    }
    fetchData();
  }, [currentMood, currentActivity]);

  const stats = [
    { icon: CloudRain, label: "Weather", value: `${weather.temp}°C`, sub: weather.location, color: "text-blue-400", bg: "bg-blue-400/10" },
    { icon: Clock, label: "Time", value: "07:45 PM", sub: "Evening", color: "text-orange-400", bg: "bg-orange-400/10" },
    { icon: Smile, label: "Your Mood", value: currentMood, sub: "Relaxed", color: "text-purple-400", bg: "bg-purple-400/10" },
    { icon: Headset, label: "Activity", value: currentActivity, sub: "Listening Time", color: "text-cyan-400", bg: "bg-cyan-400/10" },
  ];

  const handlePlayRecommendation = () => {
    if (recommendation) {
      setCurrentTrack({
        id: recommendation.id,
        title: recommendation.title,
        artist: recommendation.artist,
        albumArt: recommendation.albumArt,
        duration: 225,
        url: "",
        genre: recommendation.tags[0] || "Unknown",
        mood: recommendation.tags.slice(0, 2),
        language: "English",
        popularity: 80
      });
      setIsPlaying(true);
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row gap-8"
    >
      {/* Left Main Content */}
      <div className="flex-1 space-y-6 md:space-y-10">
        {/* Welcome Section */}
        <motion.section variants={itemVariants}>
          <h2 className="text-2xl md:text-3xl font-bold mb-1">Good Evening, Arjun 👋</h2>
          <p className="text-sm md:text-base text-gray-500">Let's match your mood with perfect music</p>
        </motion.section>

        {/* Stats/Context Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.label} 
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card p-3 md:p-5 flex items-center gap-3 md:gap-4 group cursor-pointer"
            >
              <div className={cn("w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg)}>
                <stat.icon className={cn("w-5 h-5 md:w-6 md:h-6", stat.color)} />
              </div>
              <div className="min-w-0">
                <p className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest truncate">{stat.label}</p>
                <p className="text-sm md:text-lg font-bold truncate">{stat.value}</p>
                <p className="text-[8px] md:text-[10px] text-gray-500 truncate">{stat.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Recommendation Banner */}
        <motion.section 
          variants={itemVariants}
          className="relative overflow-hidden rounded-2xl md:rounded-3xl glass-panel p-4 md:p-8 group min-h-[200px] md:min-h-[300px] flex items-center"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-xs md:text-sm text-gray-500 font-medium animate-pulse">Generating your mix...</p>
              </motion.div>
            ) : recommendation && (
              <motion.div 
                key="recommendation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full"
              >
                <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent -z-10" />
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl relative group-hover:scale-105 transition-transform duration-500 shrink-0">
                  <img src={recommendation.albumArt} alt={recommendation.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={handlePlayRecommendation}>
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center"
                    >
                      <Play className="text-black fill-current ml-0.5 md:ml-1 w-5 h-5 md:w-6 md:h-6" />
                    </motion.div>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2 md:mb-3">
                    <span className="px-2 py-0.5 bg-primary/20 border border-primary/30 rounded text-[8px] md:text-[10px] font-bold text-primary uppercase tracking-widest">AI Recommended</span>
                    <div className="hidden sm:flex gap-1">
                      {recommendation.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[8px] md:text-[9px] text-gray-400 font-medium">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">{recommendation.title}</h3>
                  <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6 max-w-md line-clamp-2 md:line-clamp-none">{recommendation.description}</p>
                  <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="cyber-button flex items-center gap-2 py-2 px-4 text-xs md:text-sm" 
                      onClick={handlePlayRecommendation}
                    >
                      <Play className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                      Play Now
                    </motion.button>
                    <button className="p-2 md:p-2.5 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                      <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Small Playlist Preview */}
                <div className="hidden xl:block w-64 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group/item"
                    >
                      <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${recommendation.id + i}`} className="w-10 h-10 rounded-lg" />
                      <div className="flex-1">
                        <p className="text-xs font-bold truncate group-hover/item:text-primary transition-colors">Track {i}</p>
                        <p className="text-[10px] text-gray-500">{recommendation.artist}</p>
                      </div>
                      <span className="text-[10px] text-gray-500">03:45</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Live Trending Section */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Live Trending
            </h3>
            <button className="text-xs text-primary font-bold uppercase tracking-wider hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendingTracks.map((track, idx) => (
              <motion.div 
                key={track.id}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-3 rounded-2xl glass-card hover:bg-white/5 transition-all group cursor-pointer"
                onClick={() => {
                  setCurrentTrack(track);
                  setIsPlaying(true);
                }}
              >
                <div className="relative shrink-0">
                  <img src={track.albumArt} className="w-12 h-12 rounded-xl object-cover" alt={track.title} />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate group-hover:text-primary transition-colors">{track.title}</p>
                  <p className="text-xs text-gray-500 truncate">{track.artist}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold text-gray-400">#{(idx + 1).toString().padStart(2, '0')}</span>
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Popular Moods */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold">Popular Moods</h3>
            <button className="text-xs font-bold text-primary hover:underline">View all</button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
            {moods.map((mood) => (
              <motion.div 
                key={mood.label} 
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMood(mood.label)}
                className={cn(
                  "glass-card p-3 md:p-4 text-center group cursor-pointer border-none bg-gradient-to-b transition-all duration-300", 
                  mood.color,
                  currentMood === mood.label ? "ring-2 ring-primary scale-105" : ""
                )}
              >
                <div className="text-xl md:text-3xl mb-2 md:mb-3 group-hover:scale-125 transition-transform duration-300">{mood.icon}</div>
                <p className="text-[10px] md:text-sm font-bold mb-1 truncate">{mood.label}</p>
                <p className="text-[8px] md:text-[10px] text-gray-500 font-medium truncate">{mood.listeners}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Right Sidebar - Contextual Info */}
      <motion.div variants={itemVariants} className="w-full lg:w-80 space-y-6 md:space-y-8">
        {/* Now Playing Widget */}
        <div className="glass-panel p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm md:text-base">Now Playing</h4>
            <div className="flex gap-2">
              <Heart className="w-4 h-4 text-gray-500 hover:text-red-500 cursor-pointer" />
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </div>
          </div>
          <div className="aspect-video lg:aspect-square rounded-xl md:rounded-2xl overflow-hidden relative group">
             <img src={recommendation?.albumArt || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop"} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 md:p-6">
                <div className="flex items-center justify-center mb-2 md:mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-primary/40 border-t-primary rounded-full animate-spin" />
                </div>
             </div>
          </div>
          <div className="text-center">
            <h5 className="text-base md:text-lg font-bold truncate">{recommendation?.title || "Midnight Raindrops"}</h5>
            <p className="text-xs md:text-sm text-gray-500 truncate">{recommendation?.artist || "LoFi Girl"}</p>
          </div>
        </div>

        {/* AI Mood Insight */}
        <div className="glass-panel p-6 bg-primary/5 border-primary/20 min-h-[200px]">
          <h4 className="text-sm font-bold text-primary flex items-center gap-2 mb-4 uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> AI Mood Insight
          </h4>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="insight-loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2 animate-pulse"
              >
                <div className="h-4 bg-white/5 rounded w-full" />
                <div className="h-4 bg-white/5 rounded w-3/4" />
              </motion.div>
            ) : (
              <motion.p 
                key="insight-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-gray-300 leading-relaxed mb-4"
              >
                {insight}
              </motion.p>
            )}
          </AnimatePresence>
          <div className="h-12 flex items-end gap-1">
             {[...Array(20)].map((_, i) => (
               <motion.div 
                 key={i} 
                 animate={{ height: ["20%", "100%", "20%"] }}
                 transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: i * 0.1 }}
                 className="flex-1 bg-primary/30 rounded-full"
               />
             ))}
          </div>
        </div>

        {/* Trending Now */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold">Trending Now</h4>
            <button className="text-[10px] font-bold text-primary uppercase tracking-widest">View all</button>
          </div>
          <div className="space-y-4">
            {trendingTracks.slice(0, 3).map((track, idx) => (
              <motion.div 
                key={track.id} 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 group cursor-pointer"
                onClick={() => {
                  setCurrentTrack(track);
                  setIsPlaying(true);
                }}
              >
                <span className="text-sm font-bold text-gray-600 w-4">{idx + 1}</span>
                <img src={track.albumArt} className="w-10 h-10 rounded-lg" />
                <div className="flex-1">
                  <p className="text-xs font-bold group-hover:text-primary transition-colors truncate">{track.title}</p>
                  <p className="text-[10px] text-gray-500">{track.artist}</p>
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
