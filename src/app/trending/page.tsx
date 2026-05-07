"use client";

import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import TrackList from "@/components/ui/TrackList";
import { MOCK_TRACKS } from "@/lib/mockData";

export default function TrendingPage() {
  return (
    <PageLayout>
      <TrackList 
        tracks={MOCK_TRACKS.slice(0, 8)} 
        title="Trending Now" 
        description="The most played tracks on MoodBeats this week."
      />
    </PageLayout>
  );
}
