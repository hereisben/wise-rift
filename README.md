# Wise Rift

**Wise Rift** is a single-user SaaS-style web and iOS application that helps Wild Rift players make better ban, pick, and item build decisions.

The app works as a draft decision-support tool. It uses patch-versioned champion data, matchup rules, user comfort history, team composition scoring, and AI-generated explanations to recommend bans, picks, and item builds during the draft phase.

> This project is built for learning and portfolio purposes. It is not affiliated with Riot Games.

---

## Project Summary

Wise Rift helps a player answer four key questions during a Wild Rift draft:

```txt
1. Which champions should I ban?
2. Which champion should I pick?
3. Is my team composition balanced?
4. Which items should I build against the enemy team?
```

The app is designed around a real Wild Rift draft workflow.

In Wild Rift draft, the ban phase happens before the full pick phase. Because of this, Wise Rift gives ban recommendations right after the user selects a role and optional intended champion.

After the ban phase, both teams pick champions in turns. Because of this, Wise Rift should update pick recommendations, team composition analysis, and item build suggestions as the draft changes.

The core workflow is:

```txt
Choose role
→ Choose intended champion or leave it blank
→ Get ban recommendations
→ Enter bans
→ Start pick phase
→ Update team and enemy picks as draft changes
→ View live pick recommendations
→ View live team composition analysis
→ View live item build suggestions
→ Save match result
→ Review draft performance
```

---

## Why I Built This

Many players know what champion they like, but they do not always know what champion is best for the current draft.

Common problems include:

- Not knowing what to ban
- Picking a champion that gets countered
- Ignoring team composition
- Building the same items every game
- Not adapting items to enemy healing, shielding, crowd control, or damage type
- Forgetting difficult matchups
- Not learning from past draft mistakes

Wise Rift is built to practice software engineering skills through a real domain that I understand and enjoy.

This project focuses on:

- Domain modeling
- Rule-based recommendation systems
- Patch-versioned data
- REST API design
- Web and mobile clients
- Python scoring logic
- AI-assisted explanations
- Real user feedback loops

---

## Target User

The first target user is a Wild Rift player who wants help during draft and item planning.

Example users:

- Solo queue players
- Mid lane players
- Players with a small champion pool
- Players who want to understand counter picks
- Players who want better item recommendations
- Small teams who want a simple draft assistant

The first version focuses on a **single user** and does not include team accounts or public matchmaking features.

---

## Product Scope

### In Scope for MVP

The first MVP focuses on:

- Mid lane only
- A small manually maintained champion dataset
- A small manually maintained item dataset
- Patch-versioned data
- Champion pool management
- Ban recommendation before the pick phase
- Live pick recommendation during the pick phase
- Live team composition scoring during the pick phase
- Live item build recommendation when enemy picks change
- AI-generated explanation
- Matchup notes
- Post-game draft review
- iOS quick draft view

### Out of Scope for MVP

The first MVP does not include:

- All champions
- All roles
- Real-time Riot API sync
- Automatic patch scraping
- Ranked match history import
- Team accounts
- Live match data
- Guaranteed optimal recommendation
- Advanced combat simulation
- Public matchup database

---

## Design Decision: Manual Patch Data

Wise Rift uses manually maintained patch data for the MVP.

This means champion stats, skill numbers, item stats, matchup rules, and build rules are entered and updated manually for each patch.

This is intentional.

Manual patch data keeps the MVP realistic and allows the project to focus on:

- Clean data modeling
- Patch versioning
- Recommendation logic
- Explainable scoring
- Item build rules
- Draft workflow

When a new patch is released, a new patch dataset can be created by copying the previous patch data and updating only the changed champions, skills, items, and rules.

Example patch data flow:

```txt
Patch 1
├─ champions
├─ abilities
├─ items
├─ matchup rules
├─ ban rules
└─ build rules

Patch 2
├─ copied from Patch 1
├─ updated champion changes
├─ updated item changes
├─ updated matchup rules
└─ updated recommendation weights
```

---

## Core Features

## 1. Champion Pool

The user can create a personal champion pool.

Each champion in the user pool includes:

- Champion name
- Role
- Comfort score
- Notes
- Preferred playstyle
- Difficult matchups
- Favorite item paths

Example:

```txt
Champion: Akali
Role: Mid
Comfort Score: 8/10
Strengths: burst damage, mobility, backline access
Weaknesses: hard CC, point-click lockdown, early wave control
Notes: Avoid blind picking into heavy CC comps
```

This helps the recommendation engine avoid suggesting champions that are strong in theory but uncomfortable for the user.

---

## 2. Ban Recommendation

The app recommends bans right after the user selects a role and optional intended champion.

This is important because Wild Rift draft starts with the ban phase before the full pick phase.

The intended champion can be selected or left blank.

If the user selects an intended champion, ban recommendations should consider champions that counter that pick.

If the user leaves the intended champion blank, ban recommendations should focus on meta threats, user discomfort history, role-based threats, and common difficult matchups.

The app recommends bans based on several factors:

- Current meta threat
- User discomfort history
- Counter threat against the user's intended pick
- Enemy team composition if known
- Team weakness if known
- Likely enemy picks
- Patch-specific champion strength

Example:

```txt
User role: Mid
User intended pick: Akali

Recommended ban:
Galio

Reason:
Galio can punish Akali's engage pattern, adds reliable crowd control, and works well against melee AP assassins.
```

### Ban Score Formula

The MVP uses a rule-based scoring formula:

```txt
banScore =
  metaThreatScore * 0.25
+ userDiscomfortScore * 0.25
+ counterThreatScore * 0.25
+ teamWeaknessExploitScore * 0.15
+ enemyLikelyPickScore * 0.10
```

The weights can be adjusted later based on real user feedback.

---

## 3. Live Draft Recommendation

The recommendation updates as the draft changes.

The user can enter or update:

- My role
- My intended champion
- My team bans
- Enemy team bans
- My team picks
- Enemy team picks
- My final champion
- Available champions

The draft flow should support two main recommendation moments:

```txt
Before bans:
Choose role
→ Choose intended champion or leave it blank
→ Get ban recommendations

During pick phase:
Start pick phase
→ Update team and enemy picks as draft changes
→ Recalculate pick recommendations
→ Recalculate team composition analysis
→ Recalculate item build suggestions
→ Continue until draft is complete
```

The pick phase is not a one-time linear step.

Both teams pick champions in turns. Because of this, Wise Rift should update recommendations after each draft state change instead of waiting until all picks are entered.

After each update, the app recalculates:

- Best picks
- Team composition score
- Enemy threat score
- Lane matchup risk
- Damage balance
- Crowd control balance
- Item build suggestions when enemy picks change

Example draft flow:

```txt
My team:
Lee Sin, Jinx, Lulu

Enemy team:
Orianna, Jarvan, Malphite

My role:
Mid

Available champions:
Akali, Viktor, Ahri, Yasuo

Recommended pick:
Viktor

Reason:
Viktor gives safer scaling, strong wave clear, AP damage, and better teamfight spacing against Jarvan and Malphite engage.
```

---

## 4. Team Composition Analyzer

Wise Rift analyzes both teams during the pick phase.

The analysis should update when team picks or enemy picks change.

The app checks:

- AD damage
- AP damage
- True damage
- Frontline
- Engage
- Disengage
- Crowd control
- Mobility
- Wave clear
- Scaling
- Objective control
- Healing
- Shielding
- Anti-tank pressure

Example output:

```txt
Team Composition Score: 72/100

Strengths:
- Strong late game
- Good backline protection
- Strong objective DPS

Weaknesses:
- Low engage
- Weak early mid pressure
- Vulnerable to hard dive
```

---

## 5. Item Build Recommendation

The app recommends item builds based on the user's champion and the enemy team.

Item suggestions can update during the pick phase as enemy picks change.

The app recommends item builds based on:

- User champion
- Lane opponent
- Enemy team damage profile
- Enemy healing
- Enemy shielding
- Enemy crowd control
- Enemy tankiness
- Enemy armor and magic resistance
- Game phase
- Patch-specific item data

Example:

```txt
Champion:
Viktor

Enemy team:
Mundo, Soraka, Malphite, Draven, Taliyah

Recommended item focus:
- Magic penetration
- Anti-heal
- Stasis enchant
- Damage over time against high HP targets

Reason:
The enemy team has strong healing, high HP frontline, and hard engage. Viktor needs damage that scales into tanks while protecting himself from engage.
```

### Item Recommendation Levels

The item engine is built in phases.

### Level 1: Rule-Based Recommendation

```txt
Enemy has healing → recommend anti-heal
Enemy has shields → recommend anti-shield
Enemy has tanks → recommend penetration or max HP damage
Enemy has hard engage → recommend Stasis or defensive options
Enemy has burst AD → recommend armor or survivability
Enemy has burst AP → recommend magic resistance or survivability
```

### Level 2: Stat-Based Recommendation

The app can estimate effective damage using a simple resistance formula:

```txt
effectiveDamage = rawDamage * 100 / (100 + resistance)
```

This helps compare damage output against armor or magic resistance.

### Level 3: Advanced Simulation

Advanced combat simulation is not part of the MVP.

Possible future work:

- Full combo damage
- Cooldown windows
- Item passive effects
- Shield and healing estimation
- Multiple target scenarios
- Fight duration simulation

---

## 6. Matchup Notes

The user can save matchup notes from real games.

Example:

```txt
Akali vs Orianna

Notes:
- Do not trade before level 3
- Avoid getting poked before level 5
- Look for all-in after Orianna uses ball cooldown
- Buy defensive boots if enemy jungle has strong gank setup
```

These notes can influence future recommendations.

---

## 7. Post-Game Draft Review

After a match, the user can save the result and add a short review.

The app can generate a draft summary.

Example:

```txt
Result:
Loss

Main problem:
No engage and weak early pressure

AI draft review:
Your team had strong scaling but lacked reliable engage. Akali was playable, but the enemy team had too much crowd control and frontline. A safer mage pick like Viktor or Orianna may have created better wave control and teamfight spacing.
```

This creates a feedback loop so the user can improve over time.

---

## 8. AI Explanation

AI is used to explain recommendations in plain language.

The scoring engine decides the recommendation.

The AI explains the reasoning.

AI is used for:

- Ban explanation
- Pick explanation
- Item build explanation
- Matchup summary
- Post-game draft review
- User-friendly tradeoff explanation

AI is not the source of truth for champion numbers.

Champion stats, ability numbers, item stats, and rules come from the manually maintained patch dataset.

Important rule:

```txt
The scoring engine decides.
AI explains.
The user reviews.
```

---

## Tech Stack

## Web App

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query
- Zustand

## iOS App

- React Native
- Expo
- TypeScript
- Expo Router
- NativeWind
- Expo SecureStore

## Backend API

- NestJS
- TypeScript
- REST API
- Prisma
- PostgreSQL

## Recommendation Engine

- Python
- FastAPI
- Rule-based scoring
- Patch-based champion data
- Item build rules

## AI Service

- LLM API
- Structured JSON prompts
- Explanation generation
- Post-game review generation

## Background Jobs

- Redis
- BullMQ

## Testing

- Vitest
- React Testing Library
- Playwright
- Postman
- GitHub Actions

## Deployment

- Vercel for web
- Railway, Render, or Koyeb for backend
- Hosted PostgreSQL database
- Expo for iOS development builds

---

## System Architecture

```txt
┌──────────────────────┐
│      Web App          │
│ Next.js + React       │
└──────────┬───────────┘
           │
           │ REST API
           │
┌──────────▼───────────┐
│      API Server       │
│ NestJS + TypeScript   │
└──────────┬───────────┘
           │
           │ Prisma
           │
┌──────────▼───────────┐
│     PostgreSQL        │
│ Patch + User Data     │
└──────────┬───────────┘
           │
           │ Scoring Request
           │
┌──────────▼───────────┐
│ Recommendation Engine │
│ Python + FastAPI      │
└──────────┬───────────┘
           │
           │ Explanation Request
           │
┌──────────▼───────────┐
│      AI Service       │
│ LLM Explanation Layer │
└──────────────────────┘


┌──────────────────────┐
│      iOS App          │
│ React Native + Expo   │
└──────────┬───────────┘
           │
           │ REST API
           ▼
     Same API Server
```

---

## Data Flow

Example ban recommendation flow:

```txt
1. User starts a draft session
2. User selects role
3. User selects intended champion or leaves it blank
4. Web or iOS app sends early draft state to the API
5. API loads active patch data from PostgreSQL
6. API sends normalized draft data to Python scoring service
7. Python service calculates ban scores
8. API saves the ban analysis result
9. AI service generates a human-readable explanation
10. Client displays recommended bans
```

Example live pick recommendation flow:

```txt
1. User enters or updates team and enemy picks during the pick phase
2. Web or iOS app sends the updated draft state to the API
3. API loads active patch data from PostgreSQL
4. API sends normalized draft data to Python scoring service
5. Python service recalculates pick scores, team composition score, and item suggestions
6. API saves the updated draft analysis result
7. AI service generates or refreshes human-readable explanations when needed
8. Client displays updated pick recommendations, team composition analysis, and item suggestions
```

---

## Main Data Models

## User

```txt
id
email
name
passwordHash
createdAt
updatedAt
```

## Patch

```txt
id
version
releasedAt
notesUrl
isActive
createdAt
updatedAt
```

## Champion

```txt
id
name
slug
roles
damageProfile
tags
difficulty
createdAt
updatedAt
```

## ChampionPatchStats

```txt
id
championId
patchId
baseHp
baseArmor
baseMagicResist
baseAttackDamage
attackRange
moveSpeed
metaScore
createdAt
updatedAt
```

## Ability

```txt
id
championId
key
name
description
damageType
ccType
targetType
range
tags
createdAt
updatedAt
```

## AbilityPatchNumbers

```txt
id
abilityId
patchId
cooldownByLevel
baseDamageByLevel
scalingRatio
scalingStat
manaCost
energyCost
createdAt
updatedAt
```

## Item

```txt
id
name
slug
category
stats
passiveTags
counterTags
createdAt
updatedAt
```

## ItemPatchStats

```txt
id
itemId
patchId
cost
stats
passiveDescription
isActive
createdAt
updatedAt
```

## UserChampion

```txt
id
userId
championId
role
comfortScore
notes
createdAt
updatedAt
```

## MatchupRule

```txt
id
patchId
championId
enemyChampionId
role
difficultyScore
counterScore
reason
createdAt
updatedAt
```

## BuildRule

```txt
id
patchId
championId
enemyTag
recommendedItemId
priority
reason
createdAt
updatedAt
```

## DraftSession

```txt
id
userId
patchId
role
intendedChampionId
myTeamPicks
enemyTeamPicks
myTeamBans
enemyTeamBans
phase
result
createdAt
updatedAt
```

## DraftAnalysis

```txt
id
draftSessionId
recommendedBans
recommendedPicks
teamCompScore
enemyThreatScore
itemRecommendations
explanation
createdAt
updatedAt
```

## MatchupNote

```txt
id
userId
championId
enemyChampionId
role
note
result
createdAt
updatedAt
```

---

## Sample Patch Data

Patch data is manually maintained in JSON seed files before being imported into PostgreSQL.

Example folder structure:

```txt
apps/api/prisma/seed-data/
├─ patches/
│  └─ patch-current.json
├─ champions/
│  ├─ akali.json
│  ├─ viktor.json
│  └─ ahri.json
├─ items/
│  └─ items-current.json
├─ rules/
│  ├─ matchup-rules-current.json
│  ├─ ban-rules-current.json
│  └─ build-rules-current.json
```

Example champion data:

```json
{
  "patch": "current",
  "champion": "Akali",
  "roles": ["mid", "baron"],
  "damageProfile": {
    "physical": 10,
    "magic": 85,
    "trueDamage": 5
  },
  "tags": ["assassin", "dash", "burst", "energy"],
  "strengths": ["burst damage", "mobility", "backline access"],
  "weaknesses": ["hard CC", "point-click lockdown", "early wave control"],
  "baseStats": {
    "hp": 650,
    "armor": 35,
    "magicResist": 38,
    "attackDamage": 62,
    "moveSpeed": 345
  }
}
```

Example ability data:

```json
{
  "champion": "Akali",
  "patch": "current",
  "abilities": [
    {
      "key": "Q",
      "name": "Five Point Strike",
      "damageType": "magic",
      "tags": ["poke", "slow", "waveclear"],
      "cooldownByLevel": [1.5, 1.5, 1.5, 1.5],
      "baseDamageByLevel": [35, 60, 85, 110],
      "scaling": [
        {
          "stat": "ap",
          "ratio": 0.65
        }
      ]
    }
  ]
}
```

Example item data:

```json
{
  "patch": "current",
  "items": [
    {
      "name": "Example Magic Penetration Item",
      "category": "magic",
      "stats": {
        "abilityPower": 80,
        "magicPenetration": 15
      },
      "counterTags": ["magic_resist", "tank"],
      "passiveTags": ["burst", "penetration"]
    }
  ]
}
```

---

## Recommendation Scoring

## Pick Score

```txt
pickScore =
  userComfortScore * 0.25
+ laneMatchupScore * 0.25
+ teamCompFitScore * 0.20
+ enemyThreatSafetyScore * 0.15
+ metaScore * 0.10
+ itemBuildFitScore * 0.05
```

## Ban Score

```txt
banScore =
  metaThreatScore * 0.25
+ userDiscomfortScore * 0.25
+ counterThreatScore * 0.25
+ teamWeaknessExploitScore * 0.15
+ enemyLikelyPickScore * 0.10
```

## Team Composition Score

```txt
teamCompScore =
  damageBalanceScore * 0.20
+ frontlineScore * 0.15
+ engageScore * 0.15
+ crowdControlScore * 0.15
+ waveClearScore * 0.10
+ scalingScore * 0.10
+ objectiveControlScore * 0.10
+ survivabilityScore * 0.05
```

## Item Recommendation Score

```txt
itemScore =
  championSynergyScore * 0.30
+ enemyCounterScore * 0.30
+ laneMatchupScore * 0.15
+ teamNeedScore * 0.15
+ gamePhaseScore * 0.10
```

---

## API Examples

## Create Draft Session

```http
POST /api/draft-sessions
Content-Type: application/json

{
  "patchId": "patch_current",
  "role": "mid",
  "intendedChampionId": "akali",
  "myTeamPicks": [],
  "enemyTeamPicks": [],
  "myTeamBans": [],
  "enemyTeamBans": []
}
```

## Get Ban Recommendations

```http
POST /api/draft-sessions/:id/recommend-bans
Content-Type: application/json

{
  "role": "mid",
  "intendedChampionId": "akali",
  "availableChampions": ["akali", "viktor", "ahri", "yasuo", "galio", "orianna"]
}
```

Example response:

```json
{
  "recommendedBans": [
    {
      "champion": "galio",
      "score": 87,
      "reason": "Galio adds reliable crowd control and counters Akali's engage pattern."
    }
  ]
}
```

## Analyze Draft

```http
POST /api/draft-sessions/:id/analyze
Content-Type: application/json

{
  "myTeamPicks": ["lee_sin", "jinx", "lulu"],
  "enemyTeamPicks": ["orianna", "jarvan", "malphite"],
  "availableChampions": ["akali", "viktor", "ahri", "yasuo"]
}
```

Example response:

```json
{
  "recommendedPicks": [
    {
      "champion": "viktor",
      "score": 82,
      "reason": "Viktor gives safer scaling, wave clear, and better spacing against engage."
    }
  ],
  "teamCompAnalysis": {
    "score": 72,
    "strengths": ["late game scaling", "backline protection"],
    "weaknesses": ["low engage", "weak early pressure"]
  },
  "itemRecommendations": [
    {
      "item": "example_magic_penetration_item",
      "priority": "core",
      "reason": "Enemy team has high magic resistance and frontline threat."
    }
  ]
}
```

## Update Draft During Pick Phase

```http
PATCH /api/draft-sessions/:id
Content-Type: application/json

{
  "myTeamPicks": ["lee_sin", "jinx"],
  "enemyTeamPicks": ["orianna", "jarvan"],
  "myTeamBans": ["galio"],
  "enemyTeamBans": ["yasuo"]
}
```

## Save Matchup Note

```http
POST /api/matchup-notes
Content-Type: application/json

{
  "championId": "akali",
  "enemyChampionId": "orianna",
  "role": "mid",
  "note": "Avoid early poke and look for all-in after level 5.",
  "result": "win"
}
```

---

## iOS App Scope

The iOS app is a quick draft companion.

It is designed for fast use during champion select.

### iOS MVP Screens

```txt
Login
Champion Pool
Quick Draft
Ban Recommendation
Pick Recommendation
Team Composition
Item Build
Matchup Notes
Post-Game Review
Settings
```

### iOS MVP Actions

```txt
Select role
Select intended champion or leave it blank
View recommended bans
Enter bans
Start pick phase
Update team and enemy picks as draft changes
View live recommended picks
View live team composition analysis
View live item build suggestions
Save matchup note
Save game result
```

---

## Development Roadmap

## Phase 1: Project Setup

- Set up monorepo
- Set up Next.js web app
- Set up NestJS API
- Set up PostgreSQL
- Set up Prisma
- Set up base data models
- Add seed data for first patch

## Phase 2: Champion and Patch Data

- Add Patch model
- Add Champion model
- Add ChampionPatchStats model
- Add Ability model
- Add AbilityPatchNumbers model
- Add Item model
- Add ItemPatchStats model
- Create manual JSON seed data
- Import seed data into database

## Phase 3: User Champion Pool

- Add authentication
- Add user champion pool
- Add comfort score
- Add notes
- Add role-specific champion settings

## Phase 4: Draft Engine MVP

- Create draft session
- Add intended champion selection
- Add early ban recommendation
- Add ban input
- Add live pick phase
- Add team pick updates
- Add enemy pick updates
- Build Python scoring service
- Return recommended bans
- Return live recommended picks
- Return live team composition score
- Return live item build suggestions

## Phase 5: Item Build Engine

- Add item build rules
- Add enemy composition analysis
- Add anti-heal, anti-shield, penetration, and defense rules
- Recommend item paths
- Explain why each item is suggested
- Update item suggestions as enemy picks change

## Phase 6: AI Explanation Layer

- Add AI explanation service
- Generate ban explanations
- Generate pick explanations
- Generate item build explanations
- Generate post-game draft reviews
- Keep AI output separate from scoring source of truth

## Phase 7: iOS App

- Set up Expo app
- Add login
- Add champion pool view
- Add quick draft screen
- Add live recommendation screens
- Add matchup note form

## Phase 8: Testing and Polish

- Add unit tests for scoring formulas
- Add API tests
- Add E2E tests for main draft flow
- Add loading and error states
- Add responsive UI polish
- Add README case study
- Record demo video

---

## Testing Strategy

## Unit Tests

Used for:

- Ban score calculation
- Pick score calculation
- Team composition score
- Item recommendation rules
- Damage estimation helpers
- Patch data validation

## API Tests

Used for:

- Champion data endpoints
- Draft session creation
- Ban recommendation endpoint
- Draft update endpoint
- Draft analysis endpoint
- Matchup note creation
- User champion pool updates

## E2E Tests

Used for main user flow:

```txt
Login
Create champion pool
Start draft session
Choose role
Choose intended champion
Get ban recommendations
Enter bans
Start pick phase
Update team and enemy picks as draft changes
View live pick recommendations
View live team composition analysis
View live item build suggestions
Save matchup note
Save result
```

## Manual Testing

Used for:

- Draft recommendation quality
- Ban recommendation timing
- Live pick phase behavior
- iOS quick draft flow
- Item recommendation explanation
- Patch data updates
- Real user feedback

---

## Engineering Goals

This project is designed to practice real software engineering skills.

Key goals:

- Build a useful product from a real domain
- Design patch-versioned data models
- Build explainable recommendation logic
- Separate scoring logic from AI explanation
- Support both web and iOS clients
- Use TypeScript across frontend and backend
- Use Python for recommendation logic
- Use PostgreSQL for structured relational data
- Write tests for important scoring rules
- Keep MVP scope realistic and shippable

---

## What Makes This Project Different

Wise Rift is not only a game helper app.

It is a decision-support system that combines:

- User preference data
- Patch-specific champion data
- Skill and item numbers
- Matchup rules
- Team composition analysis
- Item counter rules
- AI explanation
- Post-game learning

The goal is not to guarantee the perfect pick.

The goal is to help the player make a better decision with clearer reasoning.

---

## Future Improvements

Possible future features:

- Support all roles
- Support all champions
- Advanced damage calculator
- Full combo simulation
- More detailed item passive logic
- User match history
- Team draft mode
- Public matchup database
- GitHub-style patch change log
- Admin panel for patch data editing
- Data import tools
- RAG-based champion knowledge search
- Community feedback on matchup rules
- Push notifications for patch updates

---

## Project Status

Current status:

```txt
Planning phase
```

Next step:

```txt
Align product docs with the live pick phase workflow.
```

---

## Planned Monorepo Structure

```txt
wise-rift/
├─ apps/
│  ├─ web/                 # Next.js web app
│  ├─ mobile/              # Expo React Native app
│  └─ api/                 # NestJS API server
│
├─ services/
│  └─ recommendation/      # Python FastAPI scoring service
│
├─ packages/
│  ├─ database/            # Prisma schema and database client
│  ├─ shared/              # Shared types and constants
│  └─ config/              # Shared config files
│
├─ docs/
│  ├─ product/
│  │  ├─ mvp-scope.md
│  │  ├─ product-requirements.md
│  │  └─ user-flow.md
│  │
│  ├─ architecture/
│  │  ├─ system-architecture.md
│  │  ├─ data-model.md
│  │  └─ api-design.md
│  │
│  ├─ modules/
│  │  ├─ champion-pool.md
│  │  ├─ draft-session.md
│  │  ├─ recommendation-engine.md
│  │  ├─ item-build-engine.md
│  │  ├─ patch-data.md
│  │  └─ ai-explanation.md
│  │
│  └─ adr/
│     ├─ 0001-use-manual-patch-data.md
│     ├─ 0002-separate-scoring-from-ai.md
│     └─ 0003-use-python-for-recommendation-engine.md
│
├─ README.md
├─ PROGRESS.md
└─ package.json
```

---

## Local Development

## Prerequisites

Install:

- Node.js
- pnpm
- Python
- PostgreSQL
- Git
- Expo CLI

## Clone Repository

```bash
git clone https://github.com/your-username/wise-rift.git
cd wise-rift
```

## Install JavaScript Dependencies

```bash
pnpm install
```

## Install Python Dependencies

```bash
cd services/recommendation
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Environment Variables

Create `.env` files for the apps that need them.

Example:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/wise_rift"
JWT_SECRET="your_jwt_secret"
RECOMMENDATION_SERVICE_URL="http://localhost:8000"
LLM_API_KEY="your_llm_api_key"
```

## Run Database Migrations

```bash
pnpm prisma migrate dev
```

## Seed Patch Data

```bash
pnpm db:seed
```

## Start Web App

```bash
pnpm dev:web
```

## Start API Server

```bash
pnpm dev:api
```

## Start Recommendation Service

```bash
cd services/recommendation
uvicorn main:app --reload --port 8000
```

## Start iOS App

```bash
pnpm dev:mobile
```

---

## Demo Flow

A good demo flow for this project:

```txt
1. Log in
2. Set champion pool
3. Choose role: Mid
4. Choose intended champion: Akali
5. Get recommended bans
6. Enter bans
7. Start pick phase
8. Update team and enemy picks as draft changes
9. View live pick recommendations
10. View live team composition analysis
11. View live item build recommendation
12. Save post-game result
13. Add matchup note
```

---

## Portfolio Case Study Plan

The final portfolio case study should explain:

- The problem
- Why this project was built
- Target users
- MVP scope
- Patch data strategy
- Data model
- Recommendation scoring
- AI explanation design
- Web and iOS architecture
- Testing strategy
- Technical challenges
- What was learned
- Future improvements

---

## Disclaimer

Wise Rift is a fan-made learning project.

It is not affiliated with Riot Games.

All game-related names belong to their respective owners.

The recommendation engine provides decision support only and does not guarantee match results.

---

## Author

**Ben Nguyen**

- Portfolio: https://hereisben.dev
- LinkedIn: https://linkedin.com/in/here-is-ben
- Email: [hi.imben.nguyen@gmail.com](mailto:hi.imben.nguyen@gmail.com)
