# AI Advisor App

A category-based AI advisor that makes it easy for anyone to get expert help — no prompting skills needed.

---

## Project Structure

```
advisor-app/
├── frontend/   ← React app (deploy to Vercel)
└── backend/    ← Express API (deploy to Render or Railway)
```

---

## Step 1 — Get your Anthropic API Key

1. Go to https://console.anthropic.com
2. Sign up for a free account
3. Go to **API Keys** → click **Create Key**
4. Copy the key (starts with `sk-ant-...`)

---

## Step 2 — Run locally (for testing)

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Open .env and paste your API key:
# ANTHROPIC_API_KEY=sk-ant-your-key-here

npm run dev
# Runs on http://localhost:3001
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# .env already has: REACT_APP_API_URL=http://localhost:3001

npm start
# Opens http://localhost:3000
```

---

## Step 3 — Deploy the Backend (Render — free tier)

1. Go to https://render.com and sign up
2. Click **New → Web Service**
3. Connect your GitHub repo (push this project to GitHub first)
4. Set the **Root Directory** to `backend`
5. Set **Build Command**: `npm install`
6. Set **Start Command**: `node server.js`
7. Under **Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your key
8. Click **Deploy**
9. Copy your backend URL (looks like `https://your-app.onrender.com`)

---

## Step 4 — Deploy the Frontend (Vercel — free tier)

1. Go to https://vercel.com and sign up
2. Click **New Project** → import your GitHub repo
3. Set **Root Directory** to `frontend`
4. Under **Environment Variables**, add:
   - `REACT_APP_API_URL` = your Render backend URL (from Step 3)
5. Click **Deploy**
6. Your app is live!

---

## Step 5 — Add your donation link

In `frontend/src/components/Footer.js`, replace the Ko-fi link:

```jsx
<a href="https://ko-fi.com/YOUR_USERNAME" ...>
```

Or use GCash QR / PayMaya link — just swap the href.

---

## Adding more categories

Open `frontend/src/categories.js` and copy-paste any category block.
Change the `id`, `icon`, `color`, `bg`, `en`, `tl`, and `prompt` fields.

---

## Tech Stack

- Frontend: React 18
- Backend: Node.js + Express
- AI: Claude (Anthropic API)
- Deploy: Vercel (frontend) + Render (backend)
