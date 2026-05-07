import React from "react";
import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-6 text-center space-y-8">
      <div className="relative">
        <h1 className="text-[12rem] font-black text-white/5 select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl font-bold">Lost in the Melody?</h2>
        </div>
      </div>
      
      <p className="text-gray-400 max-w-md mx-auto">
        The page you're looking for seems to have faded out. Let's get you back to the main stage.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="cyber-button flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
        <Link
          href="/explore"
          className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-bold"
        >
          <Search className="w-5 h-5" />
          Explore Music
        </Link>
      </div>
    </div>
  );
}
