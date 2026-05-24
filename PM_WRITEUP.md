# DynaMo MVP — Product & Technical Write-Up

## Problem Understanding

CoolSip’s core problem is not simply weather detection — it is operational trust in automation.

The company wants advertising creatives to dynamically respond to real-world conditions across multiple cities. However, fully automated campaign systems can create anxiety for operators if changes happen invisibly or unpredictably.

Because of this, I designed DynaMo not just as an automation engine, but as a visibility-first operational dashboard that explains:
- what is running
- where it is running
- why it changed
- when it changed

This guided most product and technical decisions throughout the MVP.

---

# MVP Scope

The MVP focuses on proving the core automation workflow end-to-end:

1. Pull live weather data
2. Evaluate business rules
3. Activate/deactivate creatives
4. Persist state changes
5. Surface visibility to operators
6. Allow manual overrides

I intentionally deprioritized:
- authentication
- advanced UI polish
- multi-user workflows
- campaign editing interfaces
- distributed infrastructure

This allowed faster iteration on the highest-risk assumption:
> Can operators trust automated campaign switching?

---

# System Design

The architecture consists of four primary layers:

## Frontend Dashboard

The frontend provides:
- current line item visibility
- activation states
- reasoning metadata
- audit logs
- manual override controls

I chose a lightweight HTML/CSS/JavaScript frontend to optimize for implementation speed and deployment simplicity.

---

## Express Backend

The Node.js + Express backend exposes APIs for:
- fetching line items
- fetching audit logs
- manual overrides
- triggering automation updates

The backend also coordinates:
- weather ingestion
- rule evaluation
- database updates

---

## Decision Engine

The decision engine evaluates weather conditions against business rules.

Example logic:
- Hot weather → activate “Beat the Heat”
- Rainy weather → activate “Rainy Day Pick Me Up”
- Normal weather → activate “Refresh Anytime”

The engine updates:
- campaign state
- explanation reason
- audit logs

I intentionally kept the rule engine simple for the MVP to maximize explainability and reduce debugging complexity.

---

## SQLite Database

SQLite stores:
- line items
- activation state
- audit logs
- override status

I selected SQLite because:
- zero infrastructure overhead
- fast local iteration
- extremely lightweight deployment
- sufficient for MVP scale

For production scale I would migrate to PostgreSQL.

---

# Key Product Decisions

## Visibility Over UI Polish

I prioritized operational clarity over advanced visual design.

The core dashboard surfaces:
- active vs paused creatives
- explanation reasons
- audit history
- override controls

This directly addresses operator trust concerns.

---

## Audit Logging

Automation systems create anxiety when changes are invisible.

The audit log provides explainability by recording:
- what changed
- when it changed
- why it changed

This was one of the highest-priority features in the MVP.

---

## Manual Overrides

Automated systems should always provide human escape hatches.

The override functionality allows operators to temporarily disable automation for specific cities.

This becomes especially important during:
- brand-sensitive moments
- campaign launches
- unexpected weather anomalies
- business exceptions

---

## Real Weather Integration

I used the Open-Meteo API because it:
- requires no authentication
- has low setup friction
- supports rapid prototyping

This allowed faster iteration during MVP development.

---

# Tradeoffs & Constraints

## Why SQLite Instead of PostgreSQL?

I optimized for MVP speed and simplicity rather than production-grade scalability.

SQLite reduced:
- deployment complexity
- infrastructure management
- operational overhead

For a larger-scale system, PostgreSQL would provide:
- concurrency support
- stronger durability
- better scaling characteristics

---

## Why Polling Instead of Real-Time Streams?

The MVP currently checks weather periodically rather than using streaming updates.

This simplifies:
- infrastructure
- scheduling
- reliability

For production systems I would explore:
- adaptive polling
- event-based triggers
- queue-based architectures

---

# Edge Cases Considered

## Weather API Failure

Current behavior:
- retain previous campaign state

Future improvements:
- retry logic
- fallback weather providers
- stale data alerts

---

## Conflicting Triggers

Future versions may support multiple simultaneous triggers such as:
- weather
- AQI
- sports outcomes
- traffic
- local events

This would require:
- trigger prioritization
- weighted rules
- conflict resolution logic

---

## Operator Trust

A major operational risk is invisible automation.

The dashboard, audit logs, and override system were designed specifically to reduce operator anxiety and improve trust.

---

# Scaling Considerations

Naively scaling weather polling can become expensive quickly.

Example:

200 cities × polling every minute
= 288,000 weather requests/day

This creates:
- unnecessary API cost
- infrastructure waste
- redundant updates

A more scalable approach would include:
- 15-minute refresh windows
- caching weather results
- adaptive polling frequency
- regional grouping
- change-detection triggers

Stable weather conditions should be checked less frequently than rapidly changing conditions.

---

# Future Trigger Abstraction

The current MVP is weather-specific, but the architecture can evolve into a generalized trigger engine.

Instead of hardcoded weather rules:

```javascript
if temperature > 35
```

Future systems could support generic triggers:

| Trigger | Operator | Value |
|---|---|---|
| weather.temp | > | 35 |
| aqi | > | 200 |
| cricket.india_win | == | true |
| traffic.index | > | 80 |

This would transform DynaMo from a weather automation system into a broader context-aware campaign orchestration platform.

---

# Final Reflection

The most important realization during development was that the core product challenge was not weather detection itself.

The real challenge was designing automation that operators could trust.

Because of this, I intentionally prioritized:
- visibility
- explainability
- auditability
- override controls

over advanced UI polish or infrastructure complexity.

The MVP demonstrates the core workflow successfully while leaving clear paths for future scalability and trigger abstraction.