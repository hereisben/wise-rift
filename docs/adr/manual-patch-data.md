# ADR: Manual Patch Data for MVP

## Status

Accepted

## Date

2026-06-08

## Context

Wise Rift needs game data to give useful draft recommendations.

This data includes:

- champion names
- champion roles
- champion base stats
- champion skill details
- champion skill effects
- item names
- item stats
- item effects
- runes
- summoner spells
- matchup tags
- synergy tags
- team composition tags
- scoring tags

Wise Rift also needs this data to be patch-versioned.

Wild Rift changes over time.

A champion can receive a buff, nerf, rework, item change, or system change in a new patch.

Because of this, the app should not treat champion and item data as permanent.

For the MVP, Wise Rift does not need automatic data scraping.

The MVP needs a stable and clear source of truth that can support:

- ban recommendation
- pick recommendation
- team composition analysis
- item build suggestion
- matchup notes
- draft review
- AI explanation

The most important rule is:

```txt
Manual patch data is the source of truth.
AI should not invent champion numbers, item stats, or patch changes.
```
