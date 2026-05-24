# DynaMo MVP — Product & Technical Write-Up

## Initial Thinking

At first, the assignment looked like a fairly straightforward “weather-triggered ad switching” problem.

But while building it, I realized the harder problem was actually trust.

If a system is automatically changing campaigns in different cities, operators need to clearly understand:
- What changed
- Why it changed
- Whether they can override it

That realization influenced most of the decisions I made in the MVP.

I ended up prioritizing visibility and explainability much more heavily than frontend polish.

---

# What I Built

The MVP does a few core things:

1. Pulls live weather data
2. Evaluates simple business rules
3. Activates or pauses creatives
4. Stores updates in a database
5. Displays campaign state in a dashboard
6. Allows manual overrides

The frontend is intentionally simple.

I wanted it to feel more like an operational control panel than a marketing website.

---

# Main Product Decisions

## Audit Logs

One of the first things I added was audit logging.

Without logs, automation can start feeling unpredictable very quickly.

The logs help answer:
- What changed
- When it changed
- Why it changed

Even in a small MVP, this felt important because trust is a major part of automation products.

---

## Manual Overrides

I didn’t want the system to feel fully uncontrollable.

So I added manual overrides for each city.

That way, operators can pause automation temporarily if needed.

This felt important because real-world campaigns often have exceptions that automation alone shouldn’t fully control.

---

## Simple Rules

I intentionally kept the decision engine simple.

For example:
- Hot weather → “Beat the Heat”
- Rainy weather → “Rainy Day Pick Me Up”
- Otherwise → “Refresh Anytime”

I avoided making the rules too dynamic too early because I wanted the behavior to stay easy to debug, explain, and reason about.

---

# Technical Choices

## Why Node.js?

My stronger programming background is actually in Python, but I chose Node.js here because:
- It simplified frontend/backend integration
- Deployment was relatively straightforward
- The application itself was lightweight

I also wanted to push myself a bit outside my comfort zone during the assignment.

---

## Why SQLite?

I chose SQLite mainly for speed and simplicity.

For an MVP, it reduced setup overhead significantly and made local iteration very fast.

If this became a larger system, I would move to PostgreSQL fairly quickly.

---

# Key Tradeoffs

## Simplicity vs Flexibility

I intentionally kept the rule engine simple and hardcoded instead of building a configurable trigger system.

While this limits flexibility, it made the MVP easier to debug, explain, and reason about within the assignment timeline.

---

## SQLite vs Production Databases

SQLite was fast to set up and ideal for rapid iteration, but it would not scale well for high write concurrency or distributed deployments.

For a production system, I would move to PostgreSQL.

---

## Polling vs Event-Driven Updates

The MVP uses periodic polling for weather updates because it was simpler to implement and operationally easier to reason about.

At larger scale, I would likely move toward queue-based or event-driven processing.

---

# Challenges During Development

The biggest technical issue I ran into was deployment.

SQLite binaries built locally on Windows caused issues when deploying to Linux on Render, so I had to rebuild dependencies properly and clear deployment caches before the backend worked correctly.

I also spent time refining how state updates and audit logs behaved so the dashboard stayed operationally consistent.

---

# Scaling Thoughts

One thing I thought about early was API cost scaling.

If weather checks happen every minute across hundreds of cities, the number of API requests grows very quickly.

For a production version, I would probably:
- Cache weather responses
- Poll less frequently during stable weather
- Group nearby cities
- Use adaptive refresh intervals

That would reduce unnecessary updates and infrastructure cost while still keeping data reasonably fresh.

---

# Future Direction

Right now the system is weather-specific.

But I think the more interesting long-term direction would be turning this into a more general trigger engine.

Instead of only weather, the system could eventually support:
- AQI
- Traffic
- Sports outcomes
- Local events
- Time-of-day triggers

At that point, the platform becomes less about weather automation and more about context-aware campaign orchestration.

---

# Final Thoughts

The biggest thing I learned while building this was that automation products are as much about operator confidence as they are about automation itself.

That’s why I prioritized:
- Visibility
- Audit logs
- Overrides
- Simplicity

over building a heavily polished UI or adding too many features too early.

Overall, I tried to approach the MVP less like a frontend exercise and more like an operational system that real teams would need to trust.