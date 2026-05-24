# DynaMo MVP — Product & Technical Write-Up

## Initial Thinking

At first, this looked like a straightforward “weather-based ad switching” problem.

But while building it, I realized the harder part was actually trust.

If a system is automatically changing campaigns in different cities, operators need to clearly understand:
- what changed
- why it changed
- whether they can override it

That influenced most of the decisions I made in the MVP.

I ended up focusing more on visibility and explainability than frontend polish.

---

# What I Built

The MVP does a few main things:

1. Pulls live weather data
2. Evaluates simple business rules
3. Activates or pauses creatives
4. Stores updates in a database
5. Shows everything in a dashboard
6. Allows manual overrides

The frontend is intentionally simple. I wanted it to feel more like an operational control panel than a marketing website.

---

# Main Product Decisions

## Audit Logs

One of the first things I added was audit logging.

Without logs, automation can feel unpredictable very quickly.

The logs help answer:
- what changed
- when it changed
- why it changed

Even in a small MVP, I felt this was important because trust is a major part of automation products.

---

## Manual Overrides

I didn’t want the system to feel “fully uncontrollable.”

So I added manual overrides for each city.

That way, operators can pause automation temporarily if needed.

This felt important because real-world campaigns often have exceptions that automation alone shouldn’t control.

---

## Simple Rules

I intentionally kept the decision engine simple.

For example:
- hot weather → “Beat the Heat”
- rainy weather → “Rainy Day Pick Me Up”
- otherwise → “Refresh Anytime”

I avoided making the rules too dynamic too early because I wanted the behavior to stay easy to debug and explain.

---

# Technical Choices

## Why Node.js?

My stronger programming background is actually in Python, but I chose Node.js here because:
- it simplified frontend/backend integration
- deployment was straightforward
- the app itself was relatively lightweight

I also wanted to push myself a bit outside my comfort zone during the assignment.

---

## Why SQLite?

I chose SQLite mainly for speed and simplicity.

For an MVP, it reduced setup overhead significantly and made local iteration fast.

If this became a larger system, I would move to PostgreSQL pretty quickly.

---

# Challenges During Development

The biggest technical issue I ran into was deployment.

SQLite binaries built locally on Windows caused issues when deploying to Linux on Render. I had to rebuild dependencies properly and clear deployment caches before the backend worked correctly.

I also spent time refining how state updates and audit logs behaved so the dashboard stayed consistent.

---

# Scaling Thoughts

One thing I thought about was API cost scaling.

If weather checks happen every minute across hundreds of cities, the number of API requests grows very quickly.

For a production version, I would probably:
- cache weather responses
- poll less frequently during stable weather
- group nearby cities
- use adaptive refresh intervals

That would reduce unnecessary updates and infrastructure cost.

---

# Future Direction

Right now the system is weather-specific.

But I think the more interesting long-term direction would be turning this into a more general trigger engine.

Instead of only weather, the system could eventually support:
- AQI
- traffic
- sports outcomes
- local events
- time-of-day triggers

At that point, the platform becomes less about weather and more about context-aware campaign automation.

---

# Final Thoughts

The biggest thing I learned while building this was that automation products are as much about operator confidence as they are about automation itself.

That’s why I prioritized:
- visibility
- audit logs
- overrides
- simplicity

over building a very polished UI or adding too many features too early.