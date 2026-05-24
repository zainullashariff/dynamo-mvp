# DynaMo MVP

DynaMo is a lightweight MVP I built for the YOptima AI-Forward Product Manager assignment.

The idea behind the project is simple:

Different ad creatives automatically activate depending on live weather conditions in different cities.

Instead of marketers manually switching campaigns every time the weather changes, the system updates campaign states automatically in real time.

The MVP currently supports:

- Weather-triggered campaign switching
- Active/paused line item states
- Audit logs
- Manual overrides
- A lightweight operational dashboard

The goal was not frontend polish.

I focused much more on:
- Operational visibility
- Explainability
- Reliability
- Trust in automation behavior

---

# Cities Included

- Mumbai
- Delhi
- Bangalore
- Chennai

---

# Campaign Logic

- Hot weather → activate "Beat the Heat"
- Rainy weather → activate "Rainy Day Pick Me Up"
- Normal weather → activate "Refresh Anytime"

---

# Stack Used

## Frontend
- HTML
- CSS
- Vanilla JavaScript

## Backend
- Node.js
- Express

## Database
- SQLite

## Deployment
- Render
- Netlify

## Weather API
- Open-Meteo

---

# Why I Built It This Way

I intentionally kept the stack lightweight because this was an MVP.

Instead of spending time on authentication, complex infrastructure, or frontend frameworks, I focused on:
- Automation workflows
- State visibility
- Explainability
- Operational reliability

I also wanted the dashboard to feel understandable for non-technical operators.

---

# Key Features

## Audit Logs

Every state transition is logged so operators can understand:
- What changed
- When it changed
- Why it changed

---

## Manual Overrides

Operators can temporarily override automation behavior for specific cities when needed.

---

## Lightweight Operational Dashboard

The dashboard shows:
- Active creatives
- Paused creatives
- Recent updates
- Reasoning behind state changes

---

# Challenges During Development

The main challenge was deployment.

SQLite binaries built locally on Windows caused issues when deploying to Linux on Render, so I had to rebuild dependencies and clear deployment caches before the backend worked correctly.

---

# Future Improvements

If I continued building this further, I would probably add:
- PostgreSQL instead of SQLite
- Configurable trigger systems
- Additional external triggers (AQI, sports, traffic)
- Smarter refresh intervals
- Websocket/live updates
- More flexible rule management

---

# Live Links

## Frontend
https://cheerful-biscuit-697d20.netlify.app/

## Backend
https://dynamo-backend-hnpe.onrender.com/

---

# Author

Zainulla Shariff