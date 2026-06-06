# Wise Rift - System Architecture

This document defines the first system architecture for **Wise Rift**.

The goal of this document is to explain how the web app, iOS app, backend API, PostgreSQL database, Python recommendation service, patch data system, and AI explanation layer work together.

Wise Rift helps Wild Rift players make better draft decisions.

The core draft workflow is:

```txt
Choose Role
→ Set Champion Pool
→ Enter Picks and Bans
→ Get Ban Recommendation
→ Get Pick Recommendation
→ View Team Composition Analysis
→ View Item Build Suggestion
→ Save Match Result
→ Review Draft Performance
```

The system should support this main workflow:

```txt
Create Account
→ Select Active Patch
→ Create Champion Pool
→ Start Draft Session
→ Choose Role
→ Choose Intended Champion or Leave It Blank
→ Get Ban Recommendations
→ Enter Bans
→ Start Live Pick Phase
→ Update Team and Enemy Picks as Draft Changes
→ View Live Pick Recommendations
→ View Live Team Composition Analysis
→ View Live Item Build Suggestions
→ Save Matchup Notes
→ Save Match Result
→ Review Draft Performance
```

---

# 1. Purpose

The purpose of this document is to define:

- system overview
- high-level architecture
- web app architecture
- iOS app architecture
- backend API architecture
- database architecture
- patch data architecture
- Python recommendation service architecture
- AI explanation architecture
- authentication architecture
- live draft request flow
- recommendation flow
- item build flow
- folder structure
- MVP boundary
- implementation order

This document is not final production infrastructure.

It is the architecture guide for the first working version of Wise Rift.

---

# 2. Architecture Goals

Wise Rift should be built as a realistic full-stack and mobile project.

The system should be:

- clear
- modular
- easy to test
- easy to explain in interviews
- easy to update when a new patch comes out
- realistic enough for a portfolio project
- simple enough for one developer to build

Main rule:

```txt
Build a real recommendation system, but do not over-engineer the MVP.
```

Wise Rift should prove this idea:

```txt
A Wild Rift player can enter draft information and receive useful ban, pick, team composition, and item build recommendations with clear reasoning.
```

---

# 3. High-Level System Overview

## 3.1 Main Parts

Wise Rift has these main system parts:

```txt
Web App
iOS App
Backend API
PostgreSQL Database
Prisma ORM
Python Recommendation Service
Patch Data System
AI Explanation Layer
Authentication Layer
Draft History System
Deployment Platform
```

## 3.2 High-Level Diagram

```txt
User
 │
 ├──────────────────────────────┐
 │                              │
 ▼                              ▼
Web App                      iOS App
Next.js + React              React Native + Expo
 │                              │
 └──────────────┬───────────────┘
                │
                │ HTTP API Requests
                ▼
Backend API
NestJS + TypeScript
 │
 ├── Auth Module
 ├── User Module
 ├── Patch Module
 ├── Champion Module
 ├── Item Module
 ├── Champion Pool Module
 ├── Draft Session Module
 ├── Ban Recommendation Module
 ├── Pick Recommendation Module
 ├── Team Composition Module
 ├── Item Build Module
 ├── Matchup Notes Module
 ├── Match Result Module
 ├── Draft Review Module
 └── AI Explanation Module
 │
 │ Prisma ORM
 ▼
PostgreSQL Database
 │
 ├── users
 ├── patches
 ├── champions
 ├── champion_patch_stats
 ├── champion_skills
 ├── items
 ├── item_patch_stats
 ├── champion_pools
 ├── champion_pool_entries
 ├── draft_sessions
 ├── draft_bans
 ├── draft_picks
 ├── recommendation_results
 ├── item_build_recommendations
 ├── matchup_notes
 ├── match_results
 └── draft_reviews

Backend API
 │
 ├── Python Recommendation Service
 │   ├── Ban scoring
 │   ├── Pick scoring
 │   ├── Team composition scoring
 │   └── Item build scoring
 │
 └── AI Provider
     └── Explains recommendation results
```

---

# 4. Recommended Tech Stack

## 4.1 Web App

Recommended web app stack:

```txt
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
React Hook Form
Zod
TanStack Query
```

Purpose:

```txt
Build a clean dashboard and live draft interface for desktop users.
```

## 4.2 iOS App

Recommended iOS app stack:

```txt
React Native
Expo
TypeScript
React Navigation
TanStack Query
Zod
```

Purpose:

```txt
Build a quick mobile draft companion for checking recommendations during champion select.
```

## 4.3 Backend API

Recommended backend stack:

```txt
NestJS
TypeScript
Prisma
PostgreSQL
Zod or class-validator
JWT or cookie-based auth
```

Purpose:

```txt
Build the main REST API for users, patch data, champion pools, draft sessions, recommendations, and draft reviews.
```

## 4.4 Database

Recommended database:

```txt
PostgreSQL
```

Purpose:

```txt
Store users, patch-versioned game data, champion pools, draft sessions, recommendations, match results, and draft review history.
```

## 4.5 ORM

Recommended ORM:

```txt
Prisma
```

Purpose:

```txt
Define schema, run migrations, query database, and keep TypeScript types clean.
```

## 4.6 Recommendation Service

Recommended recommendation stack:

```txt
Python
FastAPI
Pydantic
Rule-based scoring
```

Purpose:

```txt
Keep recommendation logic separate from the main backend API.
```

The Python service should handle:

```txt
Ban recommendation
Pick recommendation
Team composition scoring
Item build recommendation
Counter logic
Patch-based score calculation
```

## 4.7 AI Layer

Recommended AI layer:

```txt
AI service wrapper inside backend API
```

Purpose:

```txt
Explain recommendations in simple language after the scoring engine has already made the decision.
```

Important rule:

```txt
The scoring engine decides.
AI explains.
```

## 4.8 Deployment

Recommended deployment options:

```txt
Web App: Vercel
Backend API: Railway, Render, Fly.io, or Koyeb
Python Recommendation Service: Railway, Render, Fly.io, or Koyeb
Database: Neon, Supabase, Railway Postgres, or Render Postgres
iOS App: Expo Application Services later
```

---

# 5. Monorepo Architecture

Wise Rift should use a monorepo.

Reason:

```txt
The project has a web app, mobile app, backend API, Python service, shared types, patch data, and docs.
```

## 5.1 Planned Monorepo Structure

```txt
wise-rift/
├─ apps/
│  ├─ web/
│  │  ├─ app/
│  │  ├─ components/
│  │  ├─ features/
│  │  ├─ hooks/
│  │  ├─ lib/
│  │  └─ package.json
│  │
│  ├─ mobile/
│  │  ├─ app/
│  │  ├─ components/
│  │  ├─ features/
│  │  ├─ hooks/
│  │  ├─ lib/
│  │  └─ package.json
│  │
│  └─ api/
│     ├─ src/
│     │  ├─ config/
│     │  ├─ modules/
│     │  ├─ common/
│     │  ├─ prisma/
│     │  ├─ app.module.ts
│     │  └─ main.ts
│     ├─ prisma/
│     │  ├─ schema.prisma
│     │  └─ migrations/
│     └─ package.json
│
├─ services/
│  └─ recommendation-engine/
│     ├─ app/
│     │  ├─ api/
│     │  ├─ core/
│     │  ├─ models/
│     │  ├─ scoring/
│     │  ├─ schemas/
│     │  └─ main.py
│     ├─ tests/
│     └─ pyproject.toml
│
├─ packages/
│  ├─ shared/
│  │  ├─ src/
│  │  │  ├─ types/
│  │  │  ├─ constants/
│  │  │  └─ schemas/
│  │  └─ package.json
│  │
│  └─ config/
│     ├─ eslint/
│     ├─ prettier/
│     └─ tsconfig/
│
├─ data/
│  ├─ patches/
│  ├─ champions/
│  ├─ items/
│  └─ seed/
│
├─ docs/
│  ├─ product/
│  ├─ architecture/
│  ├─ data/
│  ├─ scoring/
│  └─ adr/
│
├─ README.md
├─ PROGRESS.md
├─ package.json
└─ pnpm-workspace.yaml
```

## 5.2 Why Monorepo

A monorepo helps with:

- shared TypeScript types
- shared validation schemas
- clean full-stack workflow
- web and mobile app support
- easier documentation
- easier local development
- better portfolio structure

Main rule:

```txt
Keep shared code in packages/shared.
Keep app-specific code inside apps.
Keep recommendation logic inside services/recommendation-engine.
Keep patch data inside data.
```

---

# 6. Web App Architecture

## 6.1 Web App Role

The web app is responsible for:

- rendering the main dashboard
- handling forms
- managing champion pool setup
- showing live draft board
- showing ban recommendations
- showing pick recommendations
- showing team composition analysis
- showing item build suggestions
- showing match history
- showing draft performance review
- calling backend APIs

The web app should not be responsible for:

- database access
- secret API keys
- final authorization decisions
- direct AI provider calls
- direct recommendation scoring logic

## 6.2 Web App Main Areas

```txt
Auth
Dashboard
Patch Selection
Champion Pool
Draft Session
Ban Recommendation
Live Pick Phase
Team Composition Analysis
Item Build Suggestions
Matchup Notes
Match Result
Draft Review
Settings
```

## 6.3 Web App Route Plan

Recommended Next.js routes:

```txt
/
 /login
 /register
 /dashboard
 /patches
 /champion-pool
 /drafts
 /drafts/new
 /drafts/[draftSessionId]
 /drafts/[draftSessionId]/review
 /history
 /settings
```

## 6.4 Web App Feature Folder Structure

Recommended web feature structure:

```txt
apps/web/features/
├─ auth/
├─ dashboard/
├─ patches/
├─ champion-pool/
├─ drafts/
├─ recommendations/
├─ team-composition/
├─ item-builds/
├─ matchup-notes/
├─ draft-review/
└─ settings/
```

Each feature folder can contain:

```txt
components/
hooks/
api.ts
types.ts
schemas.ts
utils.ts
```

Example:

```txt
features/drafts/
├─ components/
│  ├─ DraftBoard.tsx
│  ├─ BanPanel.tsx
│  ├─ PickSlot.tsx
│  ├─ TeamPickList.tsx
│  ├─ EnemyPickList.tsx
│  └─ DraftPhaseBadge.tsx
├─ hooks/
│  ├─ useDraftSession.ts
│  ├─ useDraftPicks.ts
│  └─ useDraftRecommendations.ts
├─ api.ts
├─ schemas.ts
└─ types.ts
```

## 6.5 Web State Management

Recommended frontend data approach:

```txt
TanStack Query for server state
React state for local UI state
React Hook Form for forms
Zod for validation
```

Use TanStack Query for:

```txt
loading champion pool
loading active patch
loading draft session
loading recommendations
saving picks and bans
loading item suggestions
loading draft review
```

Use local React state for:

```txt
selected role
selected intended champion
open panels
tabs
modals
temporary draft board UI
```

---

# 7. iOS App Architecture

## 7.1 iOS App Role

The iOS app is a quick draft companion.

It is responsible for:

- showing active patch
- showing champion pool
- starting draft session
- entering picks and bans
- showing quick ban recommendations
- showing quick pick recommendations
- showing quick item build suggestions
- saving match result

The iOS app should be simpler than the web app for MVP.

## 7.2 iOS MVP Screens

Recommended iOS screens:

```txt
Login
Dashboard
Champion Pool
New Draft
Draft Board
Recommendation Detail
Item Build
Match Result
Draft Review
Settings
```

## 7.3 iOS Folder Structure

```txt
apps/mobile/
├─ app/
│  ├─ index.tsx
│  ├─ login.tsx
│  ├─ dashboard.tsx
│  ├─ champion-pool.tsx
│  ├─ drafts/
│  │  ├─ new.tsx
│  │  ├─ [draftSessionId].tsx
│  │  └─ review.tsx
│  └─ settings.tsx
│
├─ components/
│  ├─ DraftBoard.tsx
│  ├─ ChampionCard.tsx
│  ├─ RecommendationCard.tsx
│  └─ ItemBuildCard.tsx
│
├─ features/
│  ├─ auth/
│  ├─ champion-pool/
│  ├─ drafts/
│  ├─ recommendations/
│  └─ settings/
│
├─ hooks/
├─ lib/
└─ package.json
```

## 7.4 iOS MVP Boundary

The iOS app should not include every web feature at first.

MVP iOS should focus on:

```txt
Fast draft entry
Fast recommendation view
Fast item suggestion view
Save match result
```

Advanced analytics can stay web-only first.

---

# 8. Backend API Architecture

## 8.1 Backend API Role

The backend API is responsible for:

- authentication
- authorization
- request validation
- business rules
- database access
- patch data access
- draft session management
- recommendation request handling
- AI explanation request handling
- API response formatting
- error handling

Main rule:

```txt
The frontend can ask.
The backend decides.
The recommendation service scores.
The AI explains.
```

## 8.2 Backend Layer Structure

Recommended backend layers:

```txt
Controllers
→ Services
→ Prisma Client
→ Database
```

For recommendation requests:

```txt
Controller
→ Service
→ Recommendation Client
→ Python Recommendation Service
```

For AI explanations:

```txt
Controller
→ Service
→ AI Explanation Service
→ AI Provider
```

## 8.3 NestJS Module Plan

Recommended backend modules:

```txt
AuthModule
UsersModule
PatchesModule
ChampionsModule
ItemsModule
ChampionPoolsModule
DraftSessionsModule
DraftBansModule
DraftPicksModule
RecommendationsModule
TeamCompositionModule
ItemBuildsModule
MatchupNotesModule
MatchResultsModule
DraftReviewsModule
AiExplanationsModule
```

## 8.4 Backend Folder Structure

```txt
apps/api/src/
├─ config/
│  ├─ env.ts
│  ├─ cors.ts
│  └─ app.config.ts
│
├─ common/
│  ├─ decorators/
│  ├─ filters/
│  ├─ guards/
│  ├─ interceptors/
│  ├─ pipes/
│  └─ utils/
│
├─ prisma/
│  ├─ prisma.module.ts
│  └─ prisma.service.ts
│
├─ modules/
│  ├─ auth/
│  │  ├─ auth.controller.ts
│  │  ├─ auth.service.ts
│  │  ├─ auth.module.ts
│  │  ├─ dto/
│  │  └─ strategies/
│  │
│  ├─ users/
│  ├─ patches/
│  ├─ champions/
│  ├─ items/
│  ├─ champion-pools/
│  ├─ draft-sessions/
│  ├─ draft-bans/
│  ├─ draft-picks/
│  ├─ recommendations/
│  ├─ team-composition/
│  ├─ item-builds/
│  ├─ matchup-notes/
│  ├─ match-results/
│  ├─ draft-reviews/
│  └─ ai-explanations/
│
├─ app.module.ts
└─ main.ts
```

## 8.5 API Route Plan

Recommended REST API routes:

```txt
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/patches
GET    /api/patches/active
POST   /api/patches

GET    /api/champions
GET    /api/champions/:championId
GET    /api/items
GET    /api/items/:itemId

GET    /api/champion-pool
POST   /api/champion-pool
PATCH  /api/champion-pool/:entryId
DELETE /api/champion-pool/:entryId

POST   /api/drafts
GET    /api/drafts
GET    /api/drafts/:draftSessionId
PATCH  /api/drafts/:draftSessionId
DELETE /api/drafts/:draftSessionId

POST   /api/drafts/:draftSessionId/bans
POST   /api/drafts/:draftSessionId/picks
PATCH  /api/drafts/:draftSessionId/picks/:pickId
DELETE /api/drafts/:draftSessionId/picks/:pickId

POST   /api/drafts/:draftSessionId/recommendations/bans
POST   /api/drafts/:draftSessionId/recommendations/picks
POST   /api/drafts/:draftSessionId/recommendations/team-composition
POST   /api/drafts/:draftSessionId/recommendations/item-builds

POST   /api/drafts/:draftSessionId/matchup-notes
POST   /api/drafts/:draftSessionId/match-result
GET    /api/drafts/:draftSessionId/review
```

---

# 9. Database Architecture

## 9.1 Database Role

The database stores the source-of-truth records for the app.

Main database:

```txt
PostgreSQL
```

ORM:

```txt
Prisma
```

## 9.2 Main Tables

MVP tables:

```txt
users
patches
champions
champion_patch_stats
champion_skills
items
item_patch_stats
champion_pools
champion_pool_entries
draft_sessions
draft_bans
draft_picks
recommendation_results
item_build_recommendations
matchup_notes
match_results
draft_reviews
ai_explanations
```

## 9.3 Database Relationship Pattern

Main ownership pattern:

```txt
User
├─ ChampionPool
│  └─ ChampionPoolEntry
│
└─ DraftSession
   ├─ DraftBan
   ├─ DraftPick
   ├─ RecommendationResult
   ├─ ItemBuildRecommendation
   ├─ MatchupNote
   ├─ MatchResult
   ├─ DraftReview
   └─ AIExplanation
```

Patch data pattern:

```txt
Patch
├─ ChampionPatchStat
│  └─ Champion
│
├─ ChampionSkill
│  └─ Champion
│
└─ ItemPatchStat
   └─ Item
```

## 9.4 Database Access Rule

Every private user record should include:

```txt
userId
```

Every draft-related record should include:

```txt
draftSessionId
```

Most draft records should also be traceable back to:

```txt
userId
activePatchId
```

Reason:

```txt
Recommendations must be tied to the patch version used during the draft.
```

## 9.5 Patch Version Rule

Patch data should never be silently overwritten.

When a new Wild Rift patch comes out:

```txt
Create new patch
Copy old champion and item data
Update changed champions and items manually
Mark the new patch as active
Keep old patch data for old draft reviews
```

Main rule:

```txt
Old draft sessions should keep using the patch data they were created with.
```

## 9.6 JSON Field Rule

For MVP, some flexible scoring fields can use JSON.

Examples:

```txt
tags
damageProfile
scalingProfile
teamFightProfile
laneProfile
counterTags
synergyTags
recommendationReasons
scoreBreakdown
buildSteps
```

Reason:

```txt
This keeps the first schema flexible while the scoring system is still changing.
```

Future improvement:

```txt
Move JSON fields into normalized tables if advanced filtering is needed.
```

---

# 10. Patch Data Architecture

## 10.1 Patch Data Role

Patch data is the source of truth for game information.

Patch data includes:

```txt
champion stats
champion skills
champion role tags
champion matchup tags
item stats
item effects
item categories
counter relationships
synergy relationships
```

## 10.2 Manual Patch Data Rule

For MVP, patch data is maintained manually.

Reason:

```txt
Automatic patch scraping is out of scope for MVP.
```

Main rule:

```txt
Manual patch data is the source of truth.
AI should not invent champion numbers, item stats, or patch changes.
```

## 10.3 Patch Data Folder Structure

```txt
data/
├─ patches/
│  ├─ patch-6.1.json
│  └─ patch-6.2.json
│
├─ champions/
│  ├─ ahri.json
│  ├─ akali.json
│  ├─ viktor.json
│  └─ yasuo.json
│
├─ items/
│  ├─ infinity-orb.json
│  ├─ rabadons-deathcap.json
│  ├─ void-staff.json
│  └─ stasis-enchant.json
│
└─ seed/
   ├─ seed-patches.ts
   ├─ seed-champions.ts
   ├─ seed-items.ts
   └─ seed-matchups.ts
```

## 10.4 Champion Data Example

```json
{
  "key": "akali",
  "name": "Akali",
  "roles": ["mid", "baron"],
  "damageType": "magic",
  "rangeType": "melee",
  "difficulty": "high",
  "tags": ["assassin", "mobility", "burst", "snowball"],
  "strengths": ["backline threat", "skirmish", "outplay"],
  "weaknesses": ["crowd control", "early wave control", "true sight"],
  "patchStats": {
    "patch": "6.1",
    "baseHealth": 650,
    "baseArmor": 35,
    "baseMagicResist": 38
  }
}
```

## 10.5 Item Data Example

```json
{
  "key": "void-staff",
  "name": "Void Staff",
  "category": "magic",
  "tags": ["magic-penetration", "anti-magic-resist"],
  "patchStats": {
    "patch": "6.1",
    "abilityPower": 90,
    "magicPenetrationPercent": 40
  },
  "goodAgainst": ["high-magic-resist", "tanks", "bruisers"]
}
```

---

# 11. Python Recommendation Service Architecture

## 11.1 Recommendation Service Role

The Python recommendation service handles scoring logic.

It should score:

```txt
Ban recommendations
Pick recommendations
Team composition analysis
Item build suggestions
```

The recommendation service should not handle:

```txt
authentication
user accounts
database writes
AI explanations
frontend rendering
```

## 11.2 Recommendation Service Folder Structure

```txt
services/recommendation-engine/
├─ app/
│  ├─ api/
│  │  ├─ ban_routes.py
│  │  ├─ pick_routes.py
│  │  ├─ composition_routes.py
│  │  └─ item_routes.py
│  │
│  ├─ core/
│  │  ├─ config.py
│  │  └─ errors.py
│  │
│  ├─ models/
│  │  ├─ champion.py
│  │  ├─ item.py
│  │  ├─ draft.py
│  │  └─ recommendation.py
│  │
│  ├─ schemas/
│  │  ├─ ban_schema.py
│  │  ├─ pick_schema.py
│  │  ├─ composition_schema.py
│  │  └─ item_schema.py
│  │
│  ├─ scoring/
│  │  ├─ ban_scorer.py
│  │  ├─ pick_scorer.py
│  │  ├─ composition_scorer.py
│  │  ├─ item_scorer.py
│  │  ├─ matchup_rules.py
│  │  ├─ synergy_rules.py
│  │  └─ score_utils.py
│  │
│  └─ main.py
│
├─ tests/
│  ├─ test_ban_scorer.py
│  ├─ test_pick_scorer.py
│  ├─ test_composition_scorer.py
│  └─ test_item_scorer.py
│
└─ pyproject.toml
```

## 11.3 Recommendation Input Rule

The backend API should send clean data to the recommendation service.

The recommendation service should receive:

```txt
active patch data
user role
user champion pool
intended champion if selected
team picks
enemy picks
current bans
available champions
available items
```

## 11.4 Recommendation Output Rule

The recommendation service should return:

```txt
ranked recommendations
score
score breakdown
reason codes
warnings
confidence level
```

Example output:

```json
{
  "recommendations": [
    {
      "championKey": "orianna",
      "totalScore": 87,
      "confidence": "HIGH",
      "reasonCodes": ["SAFE_LANE", "GOOD_TEAMFIGHT", "MATCHES_TEAM_NEED"],
      "scoreBreakdown": {
        "laneScore": 20,
        "teamCompScore": 25,
        "enemyCounterScore": 18,
        "comfortScore": 14,
        "metaScore": 10
      }
    }
  ]
}
```

## 11.5 Scoring Rule

The scoring engine should be deterministic.

Same input should return same output.

Main rule:

```txt
Recommendations should be explainable and testable.
```

---

# 12. Ban Recommendation Architecture

## 12.1 Ban Recommendation Role

Ban recommendation helps the user decide which enemy champion to ban before the pick phase.

Ban recommendation can use:

```txt
current patch strength
champion pool weakness
intended champion weakness
role matchup risk
enemy counter threat
difficulty to play against
team composition risk
```

## 12.2 Ban Recommendation Flow

```txt
User selects role
→ User chooses intended champion or leaves it blank
→ Backend loads active patch data
→ Backend loads user's champion pool
→ Backend sends data to recommendation service
→ Recommendation service scores ban targets
→ Backend saves recommendation result
→ AI explains top recommendations
→ Frontend shows ban list
```

## 12.3 Ban Scoring Factors

Possible scoring factors:

```txt
meta strength
counter threat
champion pool threat
intended champion counter
lane pressure
snowball risk
teamfight threat
ban value
```

## 12.4 Ban Recommendation Rule

Ban recommendations happen before the live pick phase.

Main rule:

```txt
Ban recommendation should help reduce risk before the draft starts.
```

---

# 13. Live Pick Recommendation Architecture

## 13.1 Live Pick Phase Role

The live pick phase is the most important workflow in Wise Rift.

The app should update recommendations when:

```txt
my team picks a champion
enemy team picks a champion
a pick is changed
a pick is removed
draft phase changes
```

## 13.2 Live Pick Flow

```txt
User starts live pick phase
→ User enters or updates team picks
→ User enters or updates enemy picks
→ Frontend sends updated draft state
→ Backend validates draft state
→ Backend loads active patch data
→ Backend sends data to recommendation service
→ Recommendation service scores available picks
→ Backend saves recommendation result
→ AI explains top picks
→ Frontend updates recommendation panel
```

## 13.3 Pick Scoring Factors

Possible scoring factors:

```txt
lane matchup
team synergy
enemy counter value
damage balance
crowd control need
frontline need
scaling need
comfort score
meta strength
champion availability
```

## 13.4 Live Draft Rule

The pick phase is not linear.

Wrong model:

```txt
Enter Team Picks
→ Enter Enemy Picks
→ Get Pick Recommendations
```

Correct model:

```txt
Start Live Pick Phase
→ Update Team and Enemy Picks as Draft Changes
→ Recalculate Pick Recommendations
→ Recalculate Team Composition Analysis
→ Recalculate Item Build Suggestions
→ Continue Until Draft Is Complete
```

---

# 14. Team Composition Architecture

## 14.1 Team Composition Role

Team composition analysis helps the user understand what their team has and what their team lacks.

The system should analyze:

```txt
damage balance
frontline
crowd control
engage
disengage
poke
burst
sustain
scaling
split push
teamfight strength
```

## 14.2 Team Composition Flow

```txt
Draft state changes
→ Backend sends team picks and enemy picks to recommendation service
→ Recommendation service calculates composition profile
→ Backend saves composition result
→ Frontend shows strengths, weaknesses, and warnings
```

## 14.3 Composition Output Example

```json
{
  "teamStrengths": ["strong teamfight", "good magic damage", "strong engage"],
  "teamWeaknesses": ["low physical damage", "weak early wave control"],
  "warnings": [
    "Enemy team has strong dive threat",
    "Your team may need anti-heal"
  ],
  "scores": {
    "damageBalance": 65,
    "crowdControl": 80,
    "frontline": 55,
    "scaling": 72
  }
}
```

---

# 15. Item Build Architecture

## 15.1 Item Build Role

Item build recommendation helps the user choose better items based on:

```txt
selected champion
enemy team
team composition
enemy damage type
enemy healing
enemy shields
enemy tankiness
enemy crowd control
game plan
```

## 15.2 Item Build Flow

```txt
User selects or locks champion
→ Enemy picks are updated
→ Backend loads champion and item patch data
→ Backend sends data to recommendation service
→ Recommendation service scores item build
→ Backend saves item build recommendation
→ AI explains why the items are suggested
→ Frontend shows core items, situational items, and warnings
```

## 15.3 Item Build Output

Item build output should include:

```txt
core items
situational items
boots
enchant
anti-heal option
anti-shield option
anti-tank option
defensive option
reasoning
```

Example:

```json
{
  "championKey": "viktor",
  "coreItems": ["ludens-echo", "rabadons-deathcap", "infinity-orb"],
  "situationalItems": [
    {
      "itemKey": "void-staff",
      "reason": "Enemy team has high magic resist and tanks."
    },
    {
      "itemKey": "stasis-enchant",
      "reason": "Enemy team has strong dive and burst."
    }
  ],
  "warnings": ["Consider anti-heal if enemy sustain becomes a problem."]
}
```

## 15.4 Item Build Rule

Item build recommendation should be based on patch item data.

Main rule:

```txt
AI can explain items, but it should not invent item stats.
```

---

# 16. AI Explanation Architecture

## 16.1 AI Layer Role

The AI layer explains recommendation results in plain language.

AI supports:

```txt
Ban explanation
Pick explanation
Team composition explanation
Item build explanation
Draft review summary
```

## 16.2 AI Should Be Backend-Only

The frontend and mobile app should not call the AI provider directly.

Reason:

```txt
AI API keys must stay private.
AI prompts should be controlled by backend services.
AI output should be based on scoring results.
```

## 16.3 AI Explanation Flow

```txt
Recommendation service returns scored result
→ Backend saves scored result
→ Backend builds AI explanation input
→ Backend sends only safe data to AI provider
→ AI returns plain-language explanation
→ Backend saves explanation
→ Frontend displays explanation beside score breakdown
```

## 16.4 AI Input Rule

AI input should include:

```txt
recommendation result
score breakdown
reason codes
draft context
safe champion names
safe item names
```

AI input should not include:

```txt
API keys
passwords
tokens
database URLs
private environment variables
unneeded user data
```

## 16.5 AI Output Rule

AI output should be short and reviewable.

Main rule:

```txt
AI explains the result.
AI does not decide the result.
```

## 16.6 AI Explanation Example

```txt
Orianna is recommended because she gives your team safer wave control and stronger teamfight setup. Your team already has engage, so Orianna can follow up well with her ultimate. She also avoids the main risk from the enemy mid pick better than your other available champions.
```

---

# 17. Authentication Architecture

## 17.1 Auth Goal

Authentication should answer:

```txt
Who is the current user?
```

Authorization should answer:

```txt
Can this user access this record?
```

## 17.2 MVP Auth Options

Recommended option:

```txt
JWT access token + HTTP-only refresh cookie
```

Simpler option:

```txt
Session cookie
```

Either option is fine for MVP if implemented securely.

## 17.3 Auth Flow

```txt
User submits email and password
→ Backend validates credentials
→ Backend creates token or session
→ Web app or mobile app stores auth state
→ Client sends authenticated requests
→ Backend verifies current user
→ Backend returns private data
```

## 17.4 Protected Route Flow

```txt
Request hits protected route
→ auth guard runs
→ token or session is verified
→ currentUser is attached to request
→ controller calls service
→ service checks record ownership
→ response is returned
```

## 17.5 Password Rule

Passwords must never be stored as plain text.

Recommended hashing:

```txt
bcrypt
argon2
```

Store only:

```txt
passwordHash
```

## 17.6 Authorization Rule

Main rule:

```txt
record.userId === currentUser.id
```

For draft child records:

```txt
record.draftSession.userId === currentUser.id
```

---

# 18. Request Flow Architecture

## 18.1 Normal Draft Session Flow

Example:

```txt
Create Draft Session
```

Flow:

```txt
Frontend form submit
→ POST /api/drafts
→ auth guard
→ validate request body
→ draftSessionService.createDraftSession
→ load active patch
→ create draft session with patchId
→ return draft session
→ frontend opens draft board
```

## 18.2 Ban Recommendation Flow

Example:

```txt
Get Ban Recommendation
```

Flow:

```txt
User clicks Get Ban Recommendations
→ POST /api/drafts/:draftSessionId/recommendations/bans
→ auth guard
→ validate draft ownership
→ load active patch data
→ load user's champion pool
→ send request to Python recommendation service
→ receive scored ban list
→ save RecommendationResult
→ generate AI explanation
→ return recommendations to frontend
```

## 18.3 Live Pick Update Flow

Example:

```txt
Enemy team picks Yasuo
```

Flow:

```txt
User adds Yasuo to enemy picks
→ POST /api/drafts/:draftSessionId/picks
→ auth guard
→ validate draft ownership
→ validate champion exists in active patch
→ save enemy pick
→ trigger recommendation recalculation
→ return updated draft state and recommendations
```

## 18.4 Pick Recommendation Flow

Example:

```txt
Get Pick Recommendation
```

Flow:

```txt
Draft state changes
→ Frontend calls recommendation endpoint
→ Backend validates draft session
→ Backend loads patch data, champion pool, picks, and bans
→ Backend sends structured input to Python service
→ Python service scores available champions
→ Backend saves RecommendationResult
→ Backend creates AI explanation
→ Frontend displays ranked pick list
```

## 18.5 Item Build Flow

Example:

```txt
Get Item Build Suggestion
```

Flow:

```txt
User selects champion
→ Enemy picks are available
→ Frontend calls item build endpoint
→ Backend validates draft ownership
→ Backend loads champion data and item data
→ Backend sends context to Python service
→ Python service scores items
→ Backend saves ItemBuildRecommendation
→ AI explains item choices
→ Frontend displays build path
```

## 18.6 Match Result Flow

Example:

```txt
Save Match Result
```

Flow:

```txt
User finishes match
→ User enters win or loss
→ User can add notes
→ POST /api/drafts/:draftSessionId/match-result
→ Backend validates ownership
→ Backend saves match result
→ Backend creates draft review summary
→ Frontend shows draft performance review
```

---

# 19. Environment Variables

## 19.1 Backend API Environment Variables

Recommended backend variables:

```txt
NODE_ENV
PORT
DATABASE_URL
JWT_ACCESS_SECRET
JWT_REFRESH_SECRET
CLIENT_WEB_URL
CLIENT_MOBILE_URL
CORS_ORIGIN
RECOMMENDATION_SERVICE_URL
AI_API_KEY
AI_MODEL
```

## 19.2 Web App Environment Variables

Recommended web variables:

```txt
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_APP_NAME
NEXT_PUBLIC_APP_ENV
```

## 19.3 Mobile App Environment Variables

Recommended mobile variables:

```txt
EXPO_PUBLIC_API_URL
EXPO_PUBLIC_APP_NAME
EXPO_PUBLIC_APP_ENV
```

## 19.4 Recommendation Service Environment Variables

Recommended Python service variables:

```txt
APP_ENV
PORT
API_SECRET
LOG_LEVEL
```

## 19.5 Environment Rules

Never commit real secret values.

Use:

```txt
.env.example
```

Do not commit:

```txt
.env
.env.local
.env.production
```

---

# 20. Deployment Architecture

## 20.1 MVP Deployment Plan

Recommended MVP deployment:

```txt
Web App: Vercel
Backend API: Railway, Render, Fly.io, or Koyeb
Python Recommendation Service: Railway, Render, Fly.io, or Koyeb
Database: Neon, Supabase, Railway Postgres, or Render Postgres
Mobile App: Expo later
```

## 20.2 Deployment Diagram

```txt
User Browser
 │
 ▼
Vercel
Next.js Web App
 │
 ▼
Backend API Host
NestJS API
 │
 ├── PostgreSQL Host
 ├── Python Recommendation Service
 └── AI Provider

iOS App
 │
 ▼
Backend API Host
```

## 20.3 Web Deployment

Web app needs:

```txt
NEXT_PUBLIC_API_URL
```

The web app should call backend API through that URL.

## 20.4 Backend Deployment

Backend needs:

```txt
DATABASE_URL
JWT secrets
AI API key
CORS origin
Recommendation service URL
```

## 20.5 Recommendation Service Deployment

Recommendation service needs:

```txt
API secret
Allowed backend origin
Logging config
```

## 20.6 CORS Rule

Backend should allow requests only from approved frontend origins.

Example:

```txt
http://localhost:3000
https://wise-rift.vercel.app
```

The Python recommendation service should only accept requests from the backend API.

---

# 21. Error Handling Architecture

## 21.1 Standard Error Shape

All API errors should use this shape:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Champion is already picked or banned",
    "details": {}
  }
}
```

## 21.2 Error Handling Rule

Backend should use central error handling.

Purpose:

```txt
Catch errors
Format errors
Hide sensitive details
Return correct status codes
```

## 21.3 Common Error Codes

```txt
VALIDATION_ERROR
AUTH_REQUIRED
INVALID_CREDENTIALS
FORBIDDEN
NOT_FOUND
CONFLICT
RATE_LIMITED
PATCH_NOT_FOUND
CHAMPION_NOT_FOUND
ITEM_NOT_FOUND
DRAFT_NOT_FOUND
CHAMPION_ALREADY_PICKED
CHAMPION_ALREADY_BANNED
RECOMMENDATION_FAILED
AI_EXPLANATION_FAILED
INTERNAL_SERVER_ERROR
```

## 21.4 Logging Rule

Log useful backend errors.

Do not log secrets.

Do not return stack traces to users in production.

---

# 22. Testing Architecture

## 22.1 Web App Tests

Web app should test:

```txt
forms
validation
important UI states
draft board updates
recommendation cards
API hooks
page rendering
```

Recommended tools:

```txt
Vitest
React Testing Library
Playwright later
```

## 22.2 Mobile App Tests

Mobile app should test:

```txt
screen rendering
draft input flow
recommendation display
form validation
API hooks
```

Recommended tools:

```txt
Jest
React Native Testing Library
Expo testing tools
```

## 22.3 Backend API Tests

Backend should test:

```txt
auth routes
patch routes
champion pool routes
draft session routes
draft pick routes
draft ban routes
recommendation endpoints
authorization rules
validation rules
```

Recommended tools:

```txt
Jest
Supertest
Prisma test database
```

## 22.4 Recommendation Service Tests

Recommendation service should test:

```txt
ban scorer
pick scorer
team composition scorer
item scorer
matchup rules
synergy rules
score breakdown output
```

Recommended tools:

```txt
pytest
FastAPI TestClient
```

## 22.5 Important Test Areas

```txt
User cannot access another user's draft session
Champion cannot be picked twice
Champion cannot be picked if banned
Draft session keeps its original patchId
Old draft review does not change when active patch changes
Recommendation output is deterministic
AI explanation does not change score result
Item build uses patch item data
Invalid draft state is rejected
```

## 22.6 Manual Testing

Manual testing should cover the main demo flow:

```txt
Register
Select active patch
Create champion pool
Start draft session
Choose mid lane
Choose intended champion or leave blank
Get ban recommendations
Enter bans
Start live pick phase
Enter team and enemy picks
View live pick recommendations
View team composition analysis
View item build suggestions
Save match result
Review draft performance
```

---

# 23. Security Architecture

## 23.1 Security Goals

The MVP should protect:

```txt
user accounts
draft history
champion pool data
AI API keys
database connection
private environment variables
recommendation service endpoint
```

## 23.2 Main Security Rules

```txt
Hash passwords
Validate all input
Check ownership on every private record
Use safe CORS settings
Rate limit auth and AI routes
Do not expose secrets to frontend
Do not send secrets to AI provider
Do not allow frontend to call Python service directly
Use HTTPS in production
```

## 23.3 Authorization Rule

Never trust IDs from the frontend.

Example:

```txt
draftSessionId from URL is not proof of access.
The backend must verify draftSession.userId.
```

## 23.4 AI Security Rule

Do not send sensitive data into AI prompts.

AI prompts should include only needed recommendation context.

## 23.5 Recommendation Service Security Rule

The recommendation service should only accept requests from the backend API.

Recommended rule:

```txt
Backend API signs internal request
Python service validates internal API secret
```

---

# 24. Observability and Logging

## 24.1 MVP Logging

The backend should log:

```txt
server start
database connection issues
auth failures
API errors
recommendation service failures
AI explanation failures
invalid draft states
```

The Python service should log:

```txt
service start
scoring errors
invalid recommendation input
slow scoring requests
```

## 24.2 Do Not Log

Do not log:

```txt
passwords
tokens
API keys
database URLs
private user secrets
full AI prompts if they contain sensitive data
```

## 24.3 Future Observability

Future options:

```txt
Sentry
Logtail
Axiom
PostHog
OpenTelemetry
```

These are not required in MVP.

---

# 25. Performance Architecture

## 25.1 MVP Performance Goals

The MVP should be fast enough for one user.

Main goals:

```txt
Fast draft board updates
Fast recommendation response
Fast champion pool loading
Fast item suggestion loading
Reasonable API response times
Simple pagination for draft history
```

## 25.2 Live Draft Performance Rule

Live draft recommendations should feel quick.

Recommended target:

```txt
Return recommendation results in less than 1 second for MVP dataset.
```

If AI explanation takes longer:

```txt
Show scoring result first.
Load AI explanation after.
```

## 25.3 Pagination Rule

List routes should use pagination.

Default:

```txt
page = 1
limit = 20
```

Max:

```txt
limit = 100
```

## 25.4 Database Indexing

Add indexes for common filters:

```txt
userId
patchId
draftSessionId
championId
itemId
role
status
createdAt
```

---

# 26. MVP System Boundary

## 26.1 Included in MVP

The MVP system should include:

```txt
Web app
Basic iOS app
Backend API
PostgreSQL database
Prisma ORM
Authentication
Active patch selection
Manual patch data
Champion data
Item data
Champion pool
Draft session
Ban entry
Pick entry
Ban recommendation
Pick recommendation
Team composition analysis
Item build suggestion
AI explanation
Match result
Draft review
Draft history
```

## 26.2 Excluded from MVP

The MVP system should not include:

```txt
All champions
All roles
Automatic patch scraping
Riot API integration
Ranked match history import
Live in-game data
Team accounts
Public matchmaking
Billing
Advanced combat simulation
Full esports coaching platform
Real-time multiplayer draft rooms
Advanced analytics dashboard
```

---

# 27. Implementation Order

## 27.1 Phase 1 - Monorepo Setup

Create the base project structure:

```txt
apps/web
apps/mobile
apps/api
services/recommendation-engine
packages/shared
data
docs
```

Add:

```txt
TypeScript
ESLint
Prettier
pnpm workspace
basic README scripts
```

## 27.2 Phase 2 - Backend Foundation

Build:

```txt
NestJS app
health route
error handler
env config
Prisma setup
database connection
```

## 27.3 Phase 3 - Database Schema

Build initial Prisma models:

```txt
User
Patch
Champion
ChampionPatchStat
ChampionSkill
Item
ItemPatchStat
ChampionPool
ChampionPoolEntry
DraftSession
DraftBan
DraftPick
RecommendationResult
ItemBuildRecommendation
MatchResult
DraftReview
AIExplanation
```

## 27.4 Phase 4 - Patch Data Seed

Build:

```txt
small patch dataset
small champion dataset
small item dataset
seed script
active patch setup
```

Start with:

```txt
mid lane champions only
small item dataset
simple matchup tags
simple synergy tags
```

## 27.5 Phase 5 - Authentication

Build:

```txt
register
login
logout
get current user
auth guard
password hashing
protected route test
```

## 27.6 Phase 6 - Champion Pool

Build:

```txt
champion pool CRUD
add champion to pool
remove champion from pool
set comfort level
set preferred role
```

## 27.7 Phase 7 - Draft Session Core

Build:

```txt
create draft session
select role
select intended champion or leave blank
enter bans
enter team picks
enter enemy picks
update draft state
```

## 27.8 Phase 8 - Recommendation Engine Foundation

Build Python service:

```txt
FastAPI app
health route
ban scoring endpoint
pick scoring endpoint
composition scoring endpoint
item scoring endpoint
basic pytest setup
```

## 27.9 Phase 9 - Ban and Pick Recommendations

Build:

```txt
ban recommendation API
pick recommendation API
score breakdown
reason codes
recommendation result saving
frontend recommendation cards
```

## 27.10 Phase 10 - Team Composition and Item Builds

Build:

```txt
team composition analysis
item build suggestion
composition warnings
situational item logic
frontend panels
```

## 27.11 Phase 11 - AI Explanation Layer

Build:

```txt
AI explanation service
ban explanation
pick explanation
item build explanation
draft review explanation
safe prompt formatting
```

## 27.12 Phase 12 - Match Result and Draft Review

Build:

```txt
save match result
save notes
draft performance review
draft history page
review detail page
```

## 27.13 Phase 13 - iOS Companion App

Build:

```txt
Expo app setup
login screen
dashboard screen
champion pool screen
draft board screen
recommendation screen
item build screen
match result screen
```

## 27.14 Phase 14 - Polish and Deployment

Build:

```txt
API tests
recommendation tests
frontend polish
mobile polish
seed data polish
deployment setup
production environment variables
portfolio case study
```

---

# 28. Architecture Decisions to Write Later

Create ADR files for important decisions.

Recommended ADRs:

```txt
docs/adr/single-user-saas.md
docs/adr/monorepo.md
docs/adr/rest-api.md
docs/adr/postgresql-prisma.md
docs/adr/python-recommendation-service.md
docs/adr/manual-patch-data.md
docs/adr/ai-explanation-only.md
docs/adr/live-draft-board.md
```

The next recommended ADR is:

```txt
docs/adr/manual-patch-data.md
```

Reason:

The MVP depends on manually maintained patch data.

This decision affects:

```txt
database design
seed data
recommendation accuracy
old draft reviews
future patch updates
```

---

# 29. Risks

## 29.1 Scope Risk

Risk:

```txt
The project can become too large because Wild Rift has many champions, items, roles, and matchups.
```

Mitigation:

```txt
Start with mid lane only.
Use a small champion dataset.
Use a small item dataset.
Build one complete draft workflow first.
```

## 29.2 Patch Data Risk

Risk:

```txt
Manual patch data can become outdated.
```

Mitigation:

```txt
Keep data patch-versioned.
Update only the active patch.
Keep old patch data for draft history.
Document every manual patch update.
```

## 29.3 Recommendation Complexity Risk

Risk:

```txt
Recommendation logic can become hard to understand.
```

Mitigation:

```txt
Use simple scoring rules first.
Return score breakdowns.
Write unit tests for every scorer.
Keep AI separate from scoring.
```

## 29.4 AI Reliability Risk

Risk:

```txt
AI may explain something incorrectly or invent details.
```

Mitigation:

```txt
Only send scoring results and known patch data.
Do not let AI decide recommendations.
Do not let AI invent item stats or champion numbers.
Show score breakdown beside AI explanation.
```

## 29.5 Live Draft UX Risk

Risk:

```txt
The live draft board can feel confusing if updates are not clear.
```

Mitigation:

```txt
Use simple pick slots.
Show team and enemy picks side by side.
Recalculate recommendations after each change.
Show loading and empty states clearly.
```

## 29.6 Deployment Risk

Risk:

```txt
The project has multiple services: web, API, Python service, database, and later mobile.
```

Mitigation:

```txt
Start local first.
Deploy web and API after the core backend works.
Deploy Python service after scoring endpoints work.
Keep .env.example updated.
```

---

# 30. Final System Architecture Summary

Wise Rift should use a modular full-stack architecture:

```txt
Next.js Web App
React Native iOS App
NestJS Backend API
Prisma ORM
PostgreSQL Database
Python Recommendation Service
AI Explanation Layer
```

The app should be draft-centered:

```txt
User
→ Champion Pool
→ Draft Session
→ Bans
→ Picks
→ Recommendations
→ Item Builds
→ Match Result
→ Draft Review
```

Patch data should be the source of truth:

```txt
Patch
→ Champion Data
→ Item Data
→ Scoring Rules
→ Recommendation Results
```

AI should support the workflow, but not control it:

```txt
Scoring engine decides.
AI explains.
User reviews.
```
