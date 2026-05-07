"use client";

import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import TrackList from "@/components/ui/TrackList";
import { MOCK_TRACKS } from "@/lib/mockData";

export default function HistoryPage() {
  // Mock history as a reversed list of some tracks
  const history = [...MOCK_TRACKS].reverse().slice(0, 6);
  
  return (
    <PageLayout>
      <TrackList 
        tracks={history} 
        title="Listening History" 
        description="Tracks you've recently experienced."
      />
    </PageLayout>
  );
}
