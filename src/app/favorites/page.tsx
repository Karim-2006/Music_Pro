"use client";

import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import TrackList from "@/components/ui/TrackList";
import { MOCK_TRACKS, Track } from "@/lib/mockData";
import { Loader2, Heart } from "lucide-react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading favorites
    const timer = setTimeout(() => {
      setFavorites(MOCK_TRACKS.slice(0, 5));
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-gray-500 font-medium animate-pulse">Retrieving your favorite tracks...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {favorites.length > 0 ? (
        <TrackList 
          tracks={favorites} 
          title="Your Favorites" 
          description="Tracks you've liked and saved to your library."
        />
      ) : (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
            <Heart className="w-10 h-10 text-gray-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">No favorites yet</h2>
            <p className="text-gray-500 max-w-xs">Start liking tracks to see them here in your personal collection.</p>
          </div>
          <button className="cyber-button">Explore Music</button>
        </div>
      )}
    </PageLayout>
  );
}
