"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Search, 
  Smile, 
  Sparkles, 
  Radio, 
  TrendingUp, 
  Heart, 
  History, 
  ListMusic,
  PlusCircle,
  Mic2,
  Disc,
  User,
  Podcast
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Explore", href: "/explore" },
  { icon: Smile, label: "Mood", href: "/mood" },
  { icon: Sparkles, label: "AI Recommend", href: "/ai-recommend" },
  { icon: Radio, label: "Radio", href: "/radio" },
];

const libraryItems = [
  { icon: TrendingUp, label: "Trending", href: "/trending" },
  { icon: Heart, label: "Favorites", href: "/favorites" },
  { icon: History, label: "History", href: "/history" },
  { icon: ListMusic, label: "Playlists", href: "/playlists" },
];

const collectionItems = [
  { icon: Heart, label: "Liked Songs", href: "/collection/tracks" },
  { icon: Disc, label: "Albums", href: "/collection/albums" },
  { icon: User, label: "Artists", href: "/collection/artists" },
  { icon: Podcast, label: "Podcasts", href: "/collection/podcasts" },
];

import { useUIStore } from "@/store/useUIStore";
import { X } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, closeSidebar } = useUIStore();

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeSidebar}
      />

      <aside className={cn(
        "fixed lg:sticky top-0 left-0 z-[70] w-64 h-screen flex flex-col bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 transition-transform duration-300 lg:translate-x-0 overflow-y-auto scroll-hide",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Mic2 className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              MoodBeats
            </h1>
          </div>
          <button 
            onClick={closeSidebar}
            className="p-2 lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

      <nav className="space-y-8">
        <div>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group",
                  pathname === item.href 
                    ? "bg-primary/20 text-white" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                  pathname === item.href ? "text-primary" : "text-gray-400"
                )} />
                <span className="font-medium">{item.label}</span>
                {pathname === item.href && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                )}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
            Library
          </h2>
          <div className="space-y-1">
            {libraryItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
            Your Library
          </h2>
          <div className="space-y-1">
            {collectionItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="mt-auto pt-10">
        <button className="flex items-center gap-4 px-4 py-4 w-full rounded-xl border border-white/5 hover:bg-white/5 transition-all group">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <PlusCircle className="w-5 h-5 text-gray-400 group-hover:text-primary" />
          </div>
          <span className="font-medium text-gray-400 group-hover:text-white">Create Playlist</span>
        </button>
      </div>
    </aside>
    </>
  );
}
