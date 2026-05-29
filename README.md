# Adviserly

A category-based AI advisor powered by Google Gemini (free!).

## Setup

### Get your FREE Gemini API Key
1. Go to https://aistudio.google.com
2. Sign in with Google
3. Click "Get API Key" → Create API key
4. Copy it

### Deploy Backend (Render.com - free)
1. Go to render.com → New Web Service
2. Connect your GitHub repo
3. Root Directory: advisor-app/backend
4. Build Command: npm install
5. Start Command: node server.js
6. Environment Variables: GEMINI_API_KEY = your key
7. Deploy!

### Deploy Frontend (Vercel - free)
1. Go to vercel.com → New Project
2. Import your GitHub repo
3. Root Directory: advisor-app/frontend
4. Environment Variables: REACT_APP_API_URL = your Render URL
5. Deploy!
