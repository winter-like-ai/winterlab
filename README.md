# WinterLab

WinterLab is a personal laboratory and blog portal, crafted with a dark, winter-themed aesthetic. It features an interactive Vue 3 frontend and an Express-based API backend.

## ✨ Features

- **Interactive Frontend**: Built with Vue 3, Vite, and Tailwind CSS, featuring subtle, elegant animations and a "winter" aesthetic. Includes interactive Three.js components (`CyberParticles`).
- **Real-time Stock Monitor API**: An integrated Express server (`server.js`) that fetches real-time financial data (CSI 300, NASDAQ 100) using `yahoo-finance2`.
- **ArXiv CS Papers Fetcher**: Serves the latest Computer Science papers (AI, CV, Machine Learning) directly from the ArXiv API.
- **雀宝分析助手 (Riichi Mahjong Analyzer)**: A standalone tool integrated inside the lab, accessible via `ppt.html`, for analyzing Riichi Mahjong game statistics and strategies.

##  Project Setup

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
npm install
```

### Development

Run the frontend and backend concurrently for development.

Start the Vite development server for the Vue frontend:

```bash
npm run dev
```

Start the Express API server (runs on port 3001):

```bash
npm run start
```

### Production Build

To build the project for production:

```bash
npm run build
```

The build process outputs static files into the `dist` directory. The `server.js` serves these static files alongside the API endpoints in a production environment.

##  Deployment

Refer to [`DEPLOY.md`](./DEPLOY.md) for detailed instructions on how to deploy this application to a Linux server with Nginx.

## ️ Technologies Used

- **Frontend**: Vue 3, Vite, Vue Router, Tailwind CSS, Three.js
- **Backend / API**: Express.js, yahoo-finance2, fast-xml-parser, cors
