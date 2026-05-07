import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoodBeats | AI-Powered Mood Music & Personal Playlists",
  description: "Experience music that matches your soul. AI-generated playlists based on mood, weather, and activity. Your ultimate companion for focus, relaxation, and energy.",
  keywords: ["music", "AI", "mood", "playlists", "streaming", "lofi", "focus music", "workout music"],
  authors: [{ name: "Arjun" }],
  openGraph: {
    title: "MoodBeats | AI-Powered Mood Music",
    description: "Experience music that matches your soul. AI-generated playlists based on mood, weather, and activity.",
    url: "https://moodbeats.pro",
    siteName: "MoodBeats",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoodBeats | AI-Powered Mood Music",
    description: "Experience music that matches your soul. AI-generated playlists based on mood, weather, and activity.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MoodBeats",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#8B5CF6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} mesh-bg min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
