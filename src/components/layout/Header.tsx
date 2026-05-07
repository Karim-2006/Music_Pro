"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell, Crown, Command, Smile, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import MoodSelector from "../dashboard/MoodSelector";
import SearchOverlay from "./SearchOverlay";
import { AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/useUIStore";

export default function Header() {
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { toggleSidebar } = useUIStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="h-20 px-4 md:px-8 flex items-center justify-between sticky top-0 z-[100] bg-background/20 backdrop-blur-sm">
      <AnimatePresence>
        {showMoodSelector && <MoodSelector onClose={() => setShowMoodSelector(false)} />}
        {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}
      </AnimatePresence>

      <div className="flex-1 max-w-xl flex items-center gap-2 md:gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-3 lg:hidden hover:bg-white/5 rounded-2xl transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-400" />
        </button>

        <button 
          onClick={() => setShowMoodSelector(true)}
          className="p-3 bg-primary/20 border border-primary/30 rounded-2xl hover:bg-primary/30 transition-all group shrink-0"
          title="Change Mood"
        >
          <Smile className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
        </button>
        
        <div 
          onClick={() => setShowSearch(true)}
          className="relative group flex-1 cursor-text max-w-xs md:max-w-none"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 md:pr-16 text-gray-500 text-sm truncate">
            Search...
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gray-500">
            <Command className="w-3 h-3" /> K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6 ml-4">
        <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400/20 to-orange-500/20 border border-amber-500/20 rounded-full hover:from-amber-400/30 hover:to-orange-500/30 transition-all group">
          <Crown className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] md:text-xs font-bold text-amber-500 uppercase tracking-wider">Upgrade</span>
        </button>

        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5 md:w-6 h-6" />
          <span className="absolute top-1 md:top-2 right-1 md:right-2 w-3.5 h-3.5 md:w-4 h-4 bg-red-500 border-2 border-[#020617] rounded-full text-[7px] md:text-[8px] flex items-center justify-center font-bold text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-3 md:pl-4 md:border-l border-white/10">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold">Arjun Dev</p>
            <p className="text-[10px] text-gray-500 font-medium">Premium</p>
          </div>
          <div className="w-8 h-8 md:w-10 h-10 rounded-full border-2 border-primary/40 p-0.5 shrink-0">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun"
              alt="Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
