"use client";

import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useMoodStore } from "@/store/useMoodStore";
import { getAIRecommendation, Recommendation, getMoodInsight } from "@/lib/services";
import { Sparkles, Play, RefreshCw, BrainCircuit, Share2, Heart } from "lucide-react";
import { usePlayerStore } from "@/store/usePlayerStore";

export default function AIRecommendPage() {
  const { currentMood, currentActivity } = useMoodStore();
  const { setCurrentTrack, setIsPlaying } = usePlayerStore();
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [insight, setInsight] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const rec = await getAIRecommendation(currentMood, currentActivity);
    setRecommendation(rec);
    setInsight(getMoodInsight(currentMood, currentActivity));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentMood, currentActivity]);

  const handlePlay = () => {
    if (recommendation) {
      setCurrentTrack({
        id: recommendation.id,
        title: recommendation.title,
        artist: recommendation.artist,
        albumArt: recommendation.albumArt,
        duration: 225,
        url: ""
      });
      setIsPlaying(true);
    }
  };

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto space-y-12 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-primary">
              <Sparkles className="w-6 h-6" />
              <span className="text-sm font-bold uppercase tracking-[0.2em]">Personalized AI Engine</span>
            </div>
            <h1 className="text-4xl font-bold">Smart Recommendations</h1>
            <p className="text-gray-400">Deep analysis of your current vibe and activity.</p>
          </div>
          <button 
            onClick={fetchData}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-sm font-bold"
          >
            <RefreshCw className={isLoading ? "animate-spin w-4 h-4" : "w-4 h-4"} />
            Refresh Analysis
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 glass-panel p-10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -z-10 group-hover:bg-primary/30 transition-all" />
            
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-[400px] flex flex-col items-center justify-center space-y-6"
                >
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <BrainCircuit className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <p className="text-gray-500 font-medium tracking-wide">AI is analyzing your musical patterns...</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col md:flex-row gap-10">
                    <div className="w-full md:w-64 aspect-square rounded-3xl overflow-hidden shadow-2xl relative group/img">
                      <img src={recommendation?.albumArt} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" alt="" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                         <Play className="w-16 h-16 fill-current text-white" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-6">
                      <div className="space-y-2">
                        <h2 className="text-4xl font-bold">{recommendation?.title}</h2>
                        <p className="text-xl text-primary font-medium">{recommendation?.artist}</p>
                      </div>
                      <p className="text-gray-400 text-lg leading-relaxed">
                        {recommendation?.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {recommendation?.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">#{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 pt-4">
                        <button onClick={handlePlay} className="cyber-button flex items-center gap-2">
                          <Play className="w-4 h-4 fill-current" />
                          Start Experience
                        </button>
                        <button className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-all">
                          <Heart className="w-5 h-5" />
                        </button>
                        <button className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-all">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Analysis Sidebar */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-8 space-y-6"
            >
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-primary" /> Mood Insight
              </h3>
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="h-4 bg-white/5 rounded w-full" />
                    <div className="h-4 bg-white/5 rounded w-5/6" />
                  </div>
                ) : (
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {insight}
                  </p>
                )}
              </AnimatePresence>
              <div className="space-y-4 pt-4">
                 <div className="space-y-2">
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-500">
                     <span>Mood Match</span>
                     <span className="text-primary">94%</span>
                   </div>
                   <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "94%" }}
                      className="h-full bg-primary"
                    />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-500">
                     <span>Activity Sync</span>
                     <span className="text-neon-blue">82%</span>
                   </div>
                   <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "82%" }}
                      className="h-full bg-neon-blue"
                    />
                   </div>
                 </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-8"
            >
               <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Visual Environment</h3>
               <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                    <p className="text-[10px] font-bold text-primary uppercase mb-1">Theme</p>
                    <p className="font-bold text-xs">{currentMood} Neon</p>
                 </div>
                 <div className="p-4 rounded-2xl bg-neon-blue/10 border border-neon-blue/20 text-center">
                    <p className="text-[10px] font-bold text-neon-blue uppercase mb-1">Visualizer</p>
                    <p className="font-bold text-xs">Dynamic Wave</p>
                 </div>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
