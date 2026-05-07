# MoodBeats 🎧 AI-Powered Mood Music

MoodBeats is a futuristic, immersive music recommendation app that uses AI to match your music with your current mood, activity, weather, and time of day.

## 🚀 Features

- **AI Recommendations**: Get personalized playlists based on your environment.
- **Mood Selector**: 10+ distinct moods with adaptive visuals.
- **Dynamic Visuals**: Real-time audio visualizers and mood-synced background gradients.
- **Premium UI**: Glassmorphism, neon cyberpunk aesthetic, and cinematic animations.
- **PWA Ready**: Fully configured Progressive Web App with offline caching, background sync, and installable mobile interface.

## 📱 PWA Support

The app is fully PWA ready. To test the PWA features:
1. Build the project: `npm run build`
2. Start the project: `npm run start`
3. Open in a mobile browser or Chrome and click "Install" or "Add to Home Screen".

Features included:
- Offline page caching
- Mobile-optimized manifest
- Apple Web App support
- Service Worker registration via `@ducanh2912/next-pwa`

## 🐳 Running with Docker

The project is fully containerized and configured to run on port **3004**.

### Prerequisites
- Docker installed
- Docker Compose installed

### Execution Steps

1. **Build and Start the container**:
   ```bash
   docker-compose up --build -d
   ```

2. **Access the application**:
   Open your browser and navigate to `http://localhost:3004`

3. **Stop the container**:
   ```bash
   docker-compose down
   ```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **Deployment**: Docker, Standalone Node.js output

## 📦 Development

To run the project locally without Docker:

```bash
npm install
npm run dev
```

The dev server will start at `http://localhost:3000`.
