# DynaMo MVP

DynaMo is a small MVP I built for the YOptima AI-Forward Product Manager assignment.

The idea is simple:
different ad creatives automatically activate depending on the weather in different cities.

The system checks live weather data and updates campaign states in real time while also showing operators:
- what is active
- what changed
- why it changed

I focused more on making the system understandable and reliable than making the UI visually polished.

---

# Live Links

Frontend Dashboard:
https://cheerful-biscuit-697d20.netlify.app/

Backend API:
https://dynamo-backend-hnpe.onrender.com

GitHub Repo:
https://github.com/zainullashariff/dynamo-mvp

---

# What The MVP Does

The app currently supports:
- weather-based campaign switching
- active/paused line item states
- audit logs
- manual overrides
- a simple live dashboard

Cities included:
- Mumbai
- Delhi
- Bangalore
- Chennai

Business logic:
- Hot weather → activate "Beat the Heat"
- Rainy weather → activate "Rainy Day Pick Me Up"
- Normal weather → activate "Refresh Anytime"

---

# Stack Used

Frontend:
- HTML
- CSS
- Vanilla JavaScript

Backend:
- Node.js
- Express

Database:
- SQLite

Deployment:
- Render
- Netlify

Weather API:
- Open-Meteo

---

# Why I Built It This Way

I intentionally kept the stack lightweight because this was an MVP.

Instead of spending time on authentication, frontend frameworks, or complex infrastructure, I focused on:
- the automation workflow
- visibility into decisions
- explainability
- reliability

I also wanted the dashboard to feel easy to understand for a non-technical operator.

---

# Things I Would Improve Next

If I had more time, I would probably add:
- PostgreSQL instead of SQLite
- retry/fallback weather APIs
- better override workflows
- support for multiple trigger types
- a more flexible rules engine
- websocket/live updates

---

# Local Setup

## Backend

```bash
cd backend
npm install
node server.js
```

## Frontend

Open:
frontend/index.html

---

# Author

Zainulla Shariff