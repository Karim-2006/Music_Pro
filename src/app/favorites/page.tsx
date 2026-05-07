"use client";

import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import TrackList from "@/components/ui/TrackList";
import { MOCK_TRACKS } from "@/lib/mockData";

export default function FavoritesPage() {
  // Mock favorites as the first 4 tracks
  const favorites = MOCK_TRACKS.slice(0, 4);
  
  return (
    <PageLayout>
      <TrackList 
        tracks={favorites} 
        title="Your Favorites" 
        description="Tracks you've liked and saved to your library."
      />
    </PageLayout>
  );
}
