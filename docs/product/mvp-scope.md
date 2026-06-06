# MVP Scope

## Overview

This document defines the first MVP scope for **Wise Rift**.

Wise Rift is a single-user SaaS-style web and iOS application that helps Wild Rift players make better draft and item build decisions.

The MVP focuses on the core draft assistant workflow first. The goal is to build a usable decision-support system before adding advanced features such as all roles, all champions, automatic patch scraping, public matchup data, or full combat simulation.

The core draft workflow is:

```txt
Choose Role
→ Set Champion Pool
→ Enter Picks and Bans
→ Get Ban Recommendation
→ Get Pick Recommendation
→ Get Item Build Suggestion
→ Save Match Result
→ Review Draft Performance
```

Wise Rift is built for learning and portfolio purposes.

It is not affiliated with Riot Games.

---

## MVP Goal

The goal of the MVP is to help one Wild Rift player make better decisions during champion select.

The MVP should support this main workflow:

```txt
Create Account
→ Select Active Patch
→ Create Champion Pool
→ Start Draft Session
→ Choose Role
→ Choose Intended Champion
→ Get Ban Recommendations
→ Enter Team Picks
→ Enter Enemy Picks
→ Get Pick Recommendations
→ View Team Composition Analysis
→ Get Item Build Suggestions
→ Save Matchup Notes
→ Save Match Result
→ Review Draft Performance
```

In Wild Rift draft, the ban phase happens before the full pick phase.

Because of this, Wise Rift should give ban recommendations right after the user chooses a role and optional intended champion.

The intended champion can be selected or left blank.

If the user selects an intended champion, ban recommendations should consider champions that counter that pick.

If the user leaves the intended champion blank, ban recommendations should focus on meta threats, user discomfort history, role-based threats, and common difficult matchups.

---

## Target User

The first target user is a Wild Rift player who wants help during draft and item planning.

The MVP focuses on one player only.

Example users:

- Solo queue players
- Mid lane players
- Players with a small champion pool
- Players who want better ban decisions
- Players who want better pick decisions
- Players who want item build help
- Players who want to learn from matchup history
- Players who want clearer reasoning behind draft choices

The first version does not support team accounts or public draft rooms.

---

## Core Problem

Many Wild Rift players know what champions they enjoy, but they do not always know what champion is best for the current draft.

Common problems include:

- Not knowing what to ban
- Picking a champion that gets countered
- Ignoring team composition
- Building the same items every game
- Not adapting to enemy healing
- Not adapting to enemy shielding
- Not adapting to enemy crowd control
- Not adapting to enemy tankiness
- Forgetting difficult matchups
- Not learning from past draft mistakes

Wise Rift solves this by giving the user a structured draft workflow with recommendation logic and clear explanations.

---

## MVP Product Principle

The MVP should be small enough to build, but strong enough to demo.

The MVP should prioritize:

- Mid lane first
- Clear workflow over too many features
- Manual patch data over automatic scraping
- Rule-based scoring over vague AI answers
- Explainable recommendations over black-box decisions
- Useful draft logic over decorative UI
- Clean data modeling over quick hacks
- Web app first, then iOS companion app

The MVP should avoid:

- Supporting every role too early
- Supporting every champion too early
- Building full combat simulation too early
- Depending on Riot API
- Using AI as the source of truth
- Adding team accounts too early
- Adding public matchup database too early
- Adding advanced analytics too early

---

## Core User Flow

### 1. Create Account

The user creates an account to save champion pool, matchup notes, draft sessions, and match results.

The MVP should support simple authentication.

Example:

```txt
Email: ben@example.com
Name: Ben
Password: ********
```

---

### 2. Select Active Patch

The user works with one active patch dataset.

Patch data includes:

- Champions
- Champion stats
- Abilities
- Ability numbers
- Items
- Item stats
- Matchup rules
- Build rules
- Recommendation weights

The MVP uses manually maintained patch data.

This keeps the first version realistic and easier to control.

---

### 3. Create Champion Pool

The user creates a personal champion pool.

Each champion in the pool includes:

- Champion
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
Strengths: Burst damage, mobility, backline access
Weaknesses: Hard crowd control, point-click lockdown, early wave control
Notes: Avoid blind picking into heavy crowd control comps
```

The recommendation engine should consider user comfort.

A champion that is strong in the meta should not always be recommended if the user is uncomfortable playing it.

---

### 4. Start Draft Session

The user starts a draft session.

A draft session stores:

- Active patch
- User role
- Intended champion
- My team picks
- Enemy team picks
- My team bans
- Enemy team bans
- Available champions
- Draft phase
- Result after game

Example:

```txt
Role: Mid
Intended Champion: Akali

My Team:
Lee Sin, Jinx, Lulu

Enemy Team:
Orianna, Jarvan, Malphite
```

---

### 5. Get Ban Recommendations

The app recommends bans based on the current draft state.

Ban recommendations should consider:

- Meta threat
- User discomfort
- Counter threat
- Team weakness
- Enemy likely picks
- Patch-specific champion strength

Example:

```txt
Recommended Ban: Galio

Reason:
Galio can punish Akali's engage pattern, adds reliable crowd control, and works well with enemy engage champions.
```

The MVP should return a ranked list of recommended bans.

Example:

```txt
1. Galio
2. Lissandra
3. Vex
```

---

### 6. Get Pick Recommendations

The app recommends picks based on the user's champion pool and the current draft.

Pick recommendations should consider:

- User comfort
- Lane matchup
- Team composition fit
- Enemy threat safety
- Meta score
- Item build fit

Example:

```txt
Recommended Pick: Viktor

Reason:
Viktor gives safer scaling, strong wave clear, AP damage, and better teamfight spacing against Jarvan and Malphite engage.
```

The MVP should not recommend champions outside the user's pool unless the user enables that option later.

---

### 7. Analyze Team Composition

The app analyzes both teams.

The team composition analyzer checks:

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
- Strong objective damage

Weaknesses:
- Low engage
- Weak early mid pressure
- Vulnerable to hard dive
```

The MVP should keep this scoring simple and explainable.

---

### 8. Get Item Build Suggestions

The app recommends item builds based on the user's champion and enemy team.

Item recommendations should consider:

- User champion
- Lane opponent
- Enemy damage profile
- Enemy healing
- Enemy shielding
- Enemy crowd control
- Enemy tankiness
- Enemy armor
- Enemy magic resistance
- Game phase
- Patch-specific item data

Example:

```txt
Champion:
Viktor

Enemy Team:
Mundo, Soraka, Malphite, Draven, Taliyah

Recommended Item Focus:
- Magic penetration
- Anti-heal
- Stasis enchant
- Damage against high HP targets

Reason:
The enemy team has strong healing, high HP frontline, and hard engage. Viktor needs damage that scales into tanks while protecting himself from engage.
```

The MVP item engine should start with rule-based recommendations.

---

### 9. Save Matchup Notes

The user can save notes from real games.

Example:

```txt
Akali vs Orianna

Notes:
- Do not trade before level 3
- Avoid getting poked before level 5
- Look for all-in after Orianna uses ball cooldown
- Buy defensive boots if enemy jungle has strong gank setup
```

These notes should influence future recommendations later.

For MVP, matchup notes can be saved and displayed first.

---

### 10. Save Match Result

After a match, the user can save the result.

A saved result includes:

- Draft session
- User champion
- Enemy lane champion
- Win or loss
- Short review
- Main draft problem
- Notes for next time

Example:

```txt
Result: Loss

Main Problem:
No engage and weak early pressure

User Note:
Akali was playable, but enemy team had too much crowd control.
```

---

### 11. Review Draft Performance

The app can generate a post-game draft review.

The review should explain:

- Why the draft was good or bad
- Whether the pick made sense
- What the team composition lacked
- What item choices were important
- What the user can learn for next time

Example:

```txt
Your team had strong scaling but lacked reliable engage. Akali was playable, but the enemy team had too much crowd control and frontline. A safer mage pick like Viktor may have created better wave control and teamfight spacing.
```

The generated review is a draft.

The user should be able to edit or ignore it.

---

## Included Features

The MVP includes the following features.

---

### Authentication

The user can:

- Sign up
- Log in
- Log out
- Access only their own data

Authentication should be simple for MVP.

Planned auth approach:

- Email and password
- Password hashing
- JWT or secure session-based auth
- Protected API routes

---

### Patch Management

The app stores patch-versioned data.

The MVP should support:

- Create patch record
- Mark one patch as active
- Store champion stats by patch
- Store ability numbers by patch
- Store item stats by patch
- Store matchup rules by patch
- Store build rules by patch

Patch data is manually maintained.

The MVP does not need an admin dashboard yet.

Seed files are enough for the first version.

---

### Champion Data

The app stores basic champion data.

A champion includes:

- Name
- Slug
- Roles
- Damage profile
- Tags
- Difficulty
- Strengths
- Weaknesses

The MVP should start with a small champion dataset.

Suggested first champions:

```txt
Akali
Viktor
Ahri
Yasuo
Orianna
Taliyah
Galio
Malphite
Jarvan
Draven
Soraka
Mundo
Lulu
Jinx
Lee Sin
```

This is enough to demo draft recommendations.

---

### Ability Data

The app stores ability data for each champion.

An ability includes:

- Champion
- Key
- Name
- Description
- Damage type
- Crowd control type
- Target type
- Range
- Tags
- Cooldown by level
- Base damage by level
- Scaling ratio
- Scaling stat
- Cost

For MVP, ability data can be partial.

The first version should focus on important tags and numbers that affect recommendations.

Example tags:

```txt
dash
burst
poke
shield
heal
stun
knockup
slow
waveclear
execute
engage
disengage
```

---

### Item Data

The app stores item data.

An item includes:

- Name
- Slug
- Category
- Cost
- Stats
- Passive description
- Passive tags
- Counter tags
- Active status by patch

The MVP should start with a small item dataset.

Item tags should support recommendation logic.

Example counter tags:

```txt
healing
shielding
high_hp
armor
magic_resist
burst_damage
crowd_control
tank
squishy
```

---

### Champion Pool

The user can:

- Add champion to pool
- Remove champion from pool
- Set role
- Set comfort score
- Add notes
- View champion pool
- Edit champion pool entry

A champion pool entry includes:

- User
- Champion
- Role
- Comfort score
- Notes
- Created date
- Updated date

---

### Draft Session

The user can:

- Create draft session
- Select role
- Select intended champion
- Enter my team picks
- Enter enemy team picks
- Enter my team bans
- Enter enemy team bans
- Update draft state
- Analyze draft
- Save result

The draft session is the main object for recommendations.

---

### Ban Recommendation

The app can generate ban recommendations.

Ban recommendation uses this formula:

```txt
banScore =
  metaThreatScore * 0.25
+ userDiscomfortScore * 0.25
+ counterThreatScore * 0.25
+ teamWeaknessExploitScore * 0.15
+ enemyLikelyPickScore * 0.10
```

The MVP should return:

- Recommended champion
- Score
- Reason
- Main score factors

Example response:

```txt
Champion: Galio
Score: 87
Reason: Galio has strong crowd control and can punish Akali's engage pattern.
```

---

### Pick Recommendation

The app can generate pick recommendations.

Pick recommendation uses this formula:

```txt
pickScore =
  userComfortScore * 0.25
+ laneMatchupScore * 0.25
+ teamCompFitScore * 0.20
+ enemyThreatSafetyScore * 0.15
+ metaScore * 0.10
+ itemBuildFitScore * 0.05
```

The MVP should return:

- Recommended champion
- Score
- Reason
- Lane matchup risk
- Team composition fit
- Main tradeoff

---

### Team Composition Analyzer

The app can calculate a simple team composition score.

Team composition score uses this formula:

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

The MVP should return:

- Overall score
- Strengths
- Weaknesses
- Missing team needs
- Enemy threat summary

---

### Item Build Recommendation

The app can recommend item focus and item choices.

Item recommendation uses this formula:

```txt
itemScore =
  championSynergyScore * 0.30
+ enemyCounterScore * 0.30
+ laneMatchupScore * 0.15
+ teamNeedScore * 0.15
+ gamePhaseScore * 0.10
```

The MVP should return:

- Core item suggestions
- Situational item suggestions
- Defensive item suggestions
- Enchant suggestion
- Reason for each item

The MVP should support simple rules first:

```txt
Enemy has healing → recommend anti-heal
Enemy has shields → recommend anti-shield
Enemy has tanks → recommend penetration or high HP damage
Enemy has hard engage → recommend Stasis or defensive option
Enemy has burst AD → recommend armor or survivability
Enemy has burst AP → recommend magic resistance or survivability
```

---

### Matchup Notes

The user can:

- Create matchup note
- Edit matchup note
- Delete matchup note
- View matchup notes by champion
- View matchup notes by enemy champion
- Save result with note

A matchup note includes:

- User
- Champion
- Enemy champion
- Role
- Note
- Result
- Created date
- Updated date

---

### Draft Analysis History

The user can view past draft analyses.

A draft analysis includes:

- Draft session
- Recommended bans
- Recommended picks
- Team composition score
- Enemy threat score
- Item recommendations
- Explanation
- Created date

The MVP does not need advanced analytics.

A simple history page is enough.

---

### AI Explanation Layer

AI is used to explain recommendations in plain language.

AI can generate:

- Ban explanation
- Pick explanation
- Item build explanation
- Matchup summary
- Post-game draft review
- User-friendly tradeoff explanation

Important rule:

```txt
The scoring engine decides the recommendation.
AI explains the recommendation.
```

AI is not the source of truth for champion stats, skill numbers, item stats, or matchup rules.

---

## Excluded Features

The following features are not included in the MVP.

---

### All Champions

Not included:

- Full champion database
- Full ability database for every champion
- Full matchup database for every champion pair

Reason:

The first version should prove the workflow with a small but useful dataset.

---

### All Roles

Not included:

- Baron lane support
- Jungle support
- Dragon lane support
- Support role support
- Role-specific logic for every lane

Reason:

The MVP focuses on mid lane first.

---

### Riot API Sync

Not included:

- Automatic match history import
- Live ranked data
- Riot account linking
- Riot API sync
- Real-time meta data from Riot

Reason:

The first version uses manually maintained patch data.

---

### Automatic Patch Scraping

Not included:

- Scraping patch notes
- Auto-updating champion stats
- Auto-updating item stats
- Auto-generating rules from patch notes

Reason:

Manual patch data is safer and easier for MVP.

---

### Full Combat Simulation

Not included:

- Full combo damage simulation
- Cooldown window simulation
- Item passive simulation
- Shield and healing simulation
- Multiple target fight simulation
- Fight duration simulation

Reason:

The MVP should focus on draft and rule-based recommendations first.

---

### Team Accounts

Not included:

- Team workspace
- Shared champion pools
- Team draft room
- Coach account
- Multi-user collaboration
- Role-based access control

Reason:

The first version is single-user only.

---

### Public Matchup Database

Not included:

- Public matchup voting
- Community notes
- Public champion discussion
- Shared matchup guide pages

Reason:

The MVP should focus on private user data first.

---

### Advanced Analytics

Not included:

- Win rate by champion
- Win rate by matchup
- Recommendation accuracy charts
- Draft performance trends
- Patch comparison charts

Reason:

Analytics are useful later, but not needed for the first working version.

---

### Full Mobile App

Not included in the first web MVP:

- Complete iOS app
- App Store release
- Push notifications
- Offline support
- Native mobile-only features

Reason:

The web app and backend should be stable first.

The iOS app can start as a quick draft companion after the core workflow works.

---

## MVP Success Criteria

The MVP is successful when the user can complete this full flow:

```txt
1. Create an account
2. Select the active patch
3. Create a champion pool
4. Start a draft session
5. Select role: Mid
6. Select intended champion
7. Enter team picks
8. Enter enemy picks
9. Get ban recommendations
10. Get pick recommendations
11. View team composition analysis
12. View item build suggestions
13. Save matchup note
14. Save match result
15. View post-game draft review
```

Functional success criteria:

- User can sign up and log in
- User can manage their champion pool
- User can start and update a draft session
- User can enter team and enemy picks
- User can get ban recommendations
- User can get pick recommendations
- User can view team composition score
- User can view item build suggestions
- User can save matchup notes
- User can save match results
- User can view draft history
- AI explanations are saved as draft text
- User can understand why a recommendation was made

Engineering success criteria:

- Frontend uses TypeScript
- Backend uses TypeScript
- API uses DTOs and validation
- Database schema supports patch-versioned data
- Recommendation logic is separated from API logic
- Python scoring service can calculate scores
- AI explanation layer is separated from scoring logic
- User input is validated
- Protected routes are implemented
- Loading and error states are handled
- Basic tests exist for scoring formulas
- Project can be deployed and demoed

Portfolio success criteria:

- The demo shows a complete draft assistant workflow
- README explains the project clearly
- Docs explain MVP scope and architecture
- Demo video shows the main user flow
- Resume bullets can describe real engineering work
- The project looks stronger than a basic CRUD app

---

## MVP Demo Flow

The MVP demo should follow this sequence:

```txt
1. Log in
2. Select active patch
3. Add champions to champion pool
4. Set comfort scores
5. Start draft session
6. Choose role: Mid
7. Choose intended champion: Akali
8. Enter my team picks
9. Enter enemy team picks
10. Get recommended bans
11. Get recommended picks
12. View team composition analysis
13. View item build recommendation
14. Save matchup note
15. Save match result
16. View post-game draft review
```

This demo should make the project easy to explain in interviews.

---

## MVP Data Models

The MVP should include these main models:

```txt
User
Patch
Champion
ChampionPatchStats
Ability
AbilityPatchNumbers
Item
ItemPatchStats
UserChampion
MatchupRule
BuildRule
DraftSession
DraftAnalysis
MatchupNote
```

Detailed schema will be defined in:

```txt
docs/data-model.md
```

---

## MVP API Areas

The MVP backend should include these API areas:

```txt
Auth
Patches
Champions
Items
Champion Pool
Draft Sessions
Draft Analysis
Matchup Notes
AI Explanations
```

Detailed API design will be defined in:

```txt
docs/api-design.md
```

---

## MVP AI Features

The MVP includes AI support, but AI should stay focused.

Included AI features:

- Explain ban recommendations
- Explain pick recommendations
- Explain item build suggestions
- Summarize matchup notes
- Generate post-game draft review
- Explain draft tradeoffs in plain language

Excluded AI features:

- Full game chatbot
- RAG champion knowledge search
- AI-generated patch data
- AI-generated champion numbers
- AI-generated item stats
- AI automatic decision-making
- AI automatic patch updates
- AI combat simulation

Important rule:

```txt
AI can explain, summarize, and rewrite.
The scoring engine must decide.
The user must review and trust the data source.
```

---

## Phase 1 Deliverables

Phase 1 should deliver the foundation of the product.

Included:

- Monorepo setup
- Next.js web app setup
- NestJS API setup
- PostgreSQL and Prisma setup
- Basic auth
- Basic dashboard
- Shared TypeScript config
- Basic linting and formatting

Phase 1 does not include the recommendation engine yet.

---

## Phase 2 Deliverables

Phase 2 should deliver patch and champion data.

Included:

- Patch model
- Champion model
- Champion patch stats model
- Ability model
- Ability patch numbers model
- Item model
- Item patch stats model
- Manual JSON seed files
- Seed script
- First small champion dataset
- First small item dataset

---

## Phase 3 Deliverables

Phase 3 should deliver champion pool and matchup notes.

Included:

- Champion pool CRUD
- Comfort score
- Champion notes
- Matchup note CRUD
- Role-specific champion settings
- Basic champion detail page

---

## Phase 4 Deliverables

Phase 4 should deliver draft sessions.

Included:

- Draft session CRUD
- Team pick input
- Enemy pick input
- Ban input
- Intended champion selection
- Draft state update
- Draft history page

---

## Phase 5 Deliverables

Phase 5 should deliver the recommendation engine.

Included:

- Python FastAPI scoring service
- Ban score calculation
- Pick score calculation
- Team composition score calculation
- Item recommendation rules
- API integration with scoring service
- Draft analysis result storage

---

## Phase 6 Deliverables

Phase 6 should deliver AI explanations.

Included:

- AI explanation service
- Ban explanation generation
- Pick explanation generation
- Item build explanation generation
- Post-game draft review generation
- Structured JSON prompts
- AI output validation
- AI result saved with draft analysis

---

## Phase 7 Deliverables

Phase 7 should deliver testing and polish.

Included:

- Unit tests for scoring formulas
- API tests
- E2E tests for main draft flow
- Loading states
- Error states
- Empty states
- Responsive UI polish
- Demo data
- Demo video

---

## Phase 8 Deliverables

Phase 8 should deliver the iOS companion app.

Included:

- Expo app setup
- Mobile authentication
- Champion pool view
- Quick draft screen
- Ban recommendation screen
- Pick recommendation screen
- Item build screen
- Matchup note form
- Post-game review screen

The iOS app should stay focused on quick draft usage.

---

## Open Questions

These questions should be answered before or during implementation.

### Product Questions

- Should the MVP recommend only champions from the user's champion pool?
- Should the user be allowed to ask for recommendations outside their pool?
- How many champions should be included in the first seed dataset?
- Should item recommendations return full builds or item focus first?
- Should the app support only ranked draft style first?
- Should the post-game review be required or optional?

### Technical Questions

- Should auth use JWT or HTTP-only cookies?
- Should Prisma live inside the API app or a shared database package?
- Should the Python recommendation service read from the database directly or receive normalized data from the API?
- Should AI explanations be generated synchronously first?
- Should Redis and BullMQ be added in MVP or later?
- Should shared DTOs live in `packages/shared`?
- Should patch data be stored as JSON seed files first, then imported into PostgreSQL?

### UX Questions

- Should Quick Draft be one screen or step-by-step?
- Should champion selection use search, cards, or dropdowns?
- Should item recommendations show full item paths or grouped reasons?
- Should explanations be short by default with an expand option?
- Should team composition score use numbers, labels, or both?
- Should matchup notes appear during draft automatically?

---

## Risks

### Scope Risk

Wise Rift has many possible features. The MVP may become too large if all champions, all roles, mobile, and advanced simulation are added too early.

Mitigation:

- Focus on mid lane first
- Use a small champion dataset
- Build one workflow at a time
- Keep iOS after the web workflow works
- Save advanced simulation for later

---

### Data Risk

Champion stats, ability numbers, item stats, and patch changes require manual updates.

Mitigation:

- Keep the first dataset small
- Use patch-versioned seed files
- Copy old patch data forward
- Update only changed champions, items, and rules
- Track data source notes manually

---

### Recommendation Risk

Recommendations may feel wrong if scoring weights are weak or matchup rules are incomplete.

Mitigation:

- Keep scoring explainable
- Show score factors
- Let user save notes
- Adjust weights based on user feedback
- Start with simple rules before complex formulas

---

### AI Risk

AI output may be vague, incorrect, or too confident.

Mitigation:

- Use AI only for explanations
- Keep scoring separate from AI
- Use structured prompts
- Validate AI output
- Show AI output as draft text
- Keep champion numbers outside AI control

---

### Architecture Risk

The system may become too complex because it includes web, mobile, API, Python service, database, and AI layer.

Mitigation:

- Build web and API first
- Add Python scoring service after data models are stable
- Add AI layer after scoring works
- Add iOS after core workflow works
- Keep clear service boundaries

---

### Time Risk

The project may take too long if every feature is built deeply.

Mitigation:

- Build demo-ready versions first
- Use small seed data
- Avoid advanced UI early
- Ship small phases
- Write docs before coding

---

## Final MVP Boundary

The MVP is not a full esports coaching platform.

The MVP is not a complete Wild Rift statistics platform.

The MVP is not a public matchup database.

The MVP is not an automatic patch data scraper.

The MVP is a focused draft decision-support assistant for one Wild Rift player.

The first version should prove this core idea:

```txt
A Wild Rift player can use one structured workflow to make clearer ban, pick, and item build decisions during draft.
```
