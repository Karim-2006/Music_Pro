"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import PlayerBar from "@/components/layout/PlayerBar";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Home, Search, Smile, Sparkles, ListMusic } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#020617] text-white overflow-x-hidden">
      <AnimatedBackground />
      <Sidebar />
      <div className="flex-1 flex flex-col relative pb-32 md:pb-24 min-w-0">
        <Header />
        <main className="flex-1 px-4 md:px-8 py-6 overflow-y-auto scroll-hide">
          {children}
        </main>
      </div>
      <PlayerBar />
      
      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-xl border-t border-white/10 z-[60] flex items-center justify-around px-2 pb-safe">
        <MobileNavItem icon={Home} label="Home" href="/" />
        <MobileNavItem icon={Search} label="Explore" href="/explore" />
        <MobileNavItem icon={Smile} label="Mood" href="/mood" />
        <MobileNavItem icon={Sparkles} label="AI" href="/ai-recommend" />
        <MobileNavItem icon={ListMusic} label="Library" href="/playlists" />
      </nav>
    </div>
  );
}

function MobileNavItem({ icon: Icon, label, href }: { icon: any, label: string, href: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href} 
      className={cn(
        "flex flex-col items-center gap-1 p-2 transition-colors",
        isActive ? "text-primary" : "text-gray-500 hover:text-white"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
    </Link>
  );
}
