"use client";

import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import TrackList from "@/components/ui/TrackList";
import { getTrendingTracks } from "@/lib/services";
import { Track } from "@/lib/mockData";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function TrendingPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      setLoading(true);
      const t = await getTrendingTracks();
      setTracks(t);
      setLoading(false);
    }
    fetchTracks();
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-gray-500 font-medium animate-pulse">Fetching the hottest tracks...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <TrackList 
        tracks={tracks} 
        title="Trending Now" 
        description="The most played tracks on MoodBeats this week."
      />
    </PageLayout>
  );
}
