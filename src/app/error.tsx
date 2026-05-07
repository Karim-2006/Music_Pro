"use client";

import React, { useEffect } from "react";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-6 text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold text-primary">Oops!</h1>
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="text-gray-400 max-w-md mx-auto">
          We encountered an unexpected error while trying to play your music. Don't worry, your vibe is safe!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="cyber-button flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
        <Link
          href="/"
          className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-bold"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
      
      {process.env.NODE_ENV === "development" && (
        <pre className="mt-8 p-4 bg-black/40 rounded-xl text-left text-xs text-red-400 overflow-auto max-w-2xl">
          {error.message}
        </pre>
      )}
    </div>
  );
}
