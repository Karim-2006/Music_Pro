"use client";

import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { MOCK_PLAYLISTS } from "@/lib/mockData";
import { Plus, ListMusic, Play } from "lucide-react";

export default function PlaylistsPage() {
  return (
    <PageLayout>
      <div className="space-y-12 py-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Your Playlists</h1>
            <p className="text-gray-400">Manage and explore your custom music collections.</p>
          </div>
          <button className="cyber-button flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_PLAYLISTS.map((playlist, idx) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-square rounded-3xl overflow-hidden mb-4 relative shadow-2xl">
                <img 
                  src={playlist.image} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={playlist.name} 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <Play className="w-8 h-8 fill-current text-white ml-1" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{playlist.name}</h3>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <ListMusic className="w-4 h-4" />
                <span>{playlist.tracks.length} Tracks</span>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: MOCK_PLAYLISTS.length * 0.1 }}
            className="aspect-square rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-white/5 transition-all cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all">
              <Plus className="w-8 h-8 text-gray-500 group-hover:text-primary" />
            </div>
            <span className="text-gray-500 font-bold group-hover:text-white transition-colors">Create Playlist</span>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}
