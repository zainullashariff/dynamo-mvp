# DynaMo MVP

Context-aware advertising automation MVP built for the YOptima AI-Forward Product Manager assessment.

---

# Live Demo

Frontend Dashboard:
https://cheerful-biscuit-697d20.netlify.app/

Backend API:
https://dynamo-backend-hnpe.onrender.com

GitHub Repository:
https://github.com/zainullashariff/dynamo-mvp

---

# Problem Statement

CoolSip runs ads across multiple cities and wants creatives to automatically change based on real-world weather conditions.

This MVP enables:
- automatic ad activation/deactivation
- weather-aware creative selection
- visibility into active campaigns
- audit logging for trust
- manual override controls

---

# Features

## Weather-Based Automation

The system checks live weather conditions for:
- Mumbai
- Delhi
- Bangalore
- Chennai

Business rules:
- Hot (>=35°C) → "Beat the Heat"
- Rainy → "Rainy Day Pick Me Up"
- Normal → "Refresh Anytime"

---

## Dynamic Line Item Activation

Each city has:
- 3 creatives
- active/paused states
- bid + budget values
- reasoning metadata

The decision engine automatically activates the correct creative.

---

## Audit Logging

Every state transition is written into an audit log so operators can understand:
- what changed
- when it changed
- why it changed

---

## Manual Overrides

Operators can manually override automation for any city.

This acts as a safety mechanism for brand-sensitive situations.

---

# Tech Stack

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
- Render (backend)
- Netlify (frontend)

Weather API:
- Open-Meteo

---

# Architecture

Frontend Dashboard
↓
Express Backend API
↓
Decision Engine
↓
SQLite Database
↓
Weather API

---

# Design Priorities

The MVP prioritizes:
1. Trust
2. Visibility
3. Simplicity
4. Fast iteration speed

UI polish was intentionally deprioritized in favor of operational transparency and explainability.

---

# Future Improvements

- PostgreSQL migration
- Multi-trigger rule engine
- Retry + fallback weather providers
- Trigger prioritization
- Real-time websocket updates
- Better override workflows
- Rule-builder UI

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