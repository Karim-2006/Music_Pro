"use client";

import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import TrackList from "@/components/ui/TrackList";
import { MOCK_TRACKS, Track } from "@/lib/mockData";
import { Loader2, Clock } from "lucide-react";

export default function HistoryPage() {
  const [history, setHistory] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading history
    const timer = setTimeout(() => {
      setHistory([...MOCK_TRACKS].reverse().slice(0, 8));
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-gray-500 font-medium animate-pulse">Reliving your musical journey...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {history.length > 0 ? (
        <TrackList 
          tracks={history} 
          title="Listening History" 
          description="Your recent musical journey on MoodBeats."
        />
      ) : (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
            <Clock className="w-10 h-10 text-gray-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Your history is empty</h2>
            <p className="text-gray-500 max-w-xs">Start listening to tracks and they'll appear here automatically.</p>
          </div>
          <button className="cyber-button">Start Listening</button>
        </div>
      )}
    </PageLayout>
  );
}
