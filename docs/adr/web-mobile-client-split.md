# ADR: Web and Mobile Client Split

## Status

Accepted

## Date

2026-06-08

## Context

Wise Rift is planned as a SaaS-style draft assistant for Wild Rift players.

The project includes:

- Next.js web app
- React Native Expo iOS app
- NestJS backend API
- PostgreSQL database
- Python recommendation service
- AI explanation layer

Wise Rift needs to support a full draft workflow:

```txt id="7ov0i4"
Choose Role
→ Set Champion Pool
→ Enter Picks and Bans
→ Get Ban Recommendation
→ Get Pick Recommendation
→ Get Item Build Suggestion
→ Save Match Result
→ Review Draft Performance
```

This workflow can be large.

The web app has more space for full screens, tables, forms, draft boards, score breakdowns, and history views.

The mobile app has less screen space but is useful for quick access during draft.

Wise Rift needs to decide how to split responsibilities between the web app and the mobile app.

## Decision

Wise Rift will use the web app as the primary full workflow client.

Wise Rift will use the iOS mobile app as a companion quick-draft client.

The web app will support the complete product workflow.

The mobile app will focus on the most useful quick actions during draft.

Both clients will use the same NestJS REST API.

Both clients will use shared TypeScript types where possible.

The mobile app should not duplicate complex scoring logic, backend workflow logic, or database access.

## Main Rule

Wise Rift will follow this rule:

```txt id="nycahj"
Web app owns the full workflow.
Mobile app owns quick draft support.
Backend owns the source of truth.
```

The web app and mobile app should feel connected, but they do not need to have identical features in the MVP.

## Why Web App Is the Primary Client

### 1. The full workflow needs more screen space

Wise Rift has many complex screens.

Examples:

- champion pool setup
- draft session setup
- live draft board
- ban recommendation list
- pick recommendation list
- team composition analysis
- item build suggestion
- score breakdown
- reason codes
- draft history
- draft review
- patch data views

These screens are easier to design and use on the web first.

### 2. Web is better for MVP development speed

The web app is faster to build and test during early development.

It is easier to:

- create forms
- test API calls
- debug UI state
- inspect network requests
- show tables and cards
- build admin-like views
- create portfolio screenshots

This makes the web app the best primary MVP client.

### 3. Web is better for portfolio presentation

Wise Rift is also a portfolio project.

The web app can show the full engineering story better.

It can show:

- product workflow
- system behavior
- recommendation results
- draft review
- score breakdowns
- AI explanations
- case study screenshots

The web app should be the main demo experience.

### 4. Web can support future admin/data tools

Wise Rift uses manually maintained patch data.

Later, the web app can support admin-style tools for:

- viewing patch data
- checking champion data
- checking item data
- reviewing data quality
- editing matchup tags
- comparing patches

These tools are better suited for web than mobile.

## Why Mobile App Is a Companion Client

### 1. Mobile is useful during draft

Wild Rift players may want quick help while drafting.

A mobile app can be useful for:

- seeing recommended bans
- seeing recommended picks
- checking item suggestions
- checking team composition warnings
- reviewing quick matchup notes

This does not require the full desktop workflow.

### 2. Mobile should stay focused

The mobile app should not try to copy every web screen in the MVP.

A focused mobile app is easier to build.

It should help with the most important in-game draft needs.

### 3. Mobile has limited space

Mobile screens are smaller.

Complex tables, long score breakdowns, and full data management screens can feel crowded.

The mobile app should show summarized guidance.

### 4. Mobile can become stronger later

The first iOS app can start simple.

Later, it can add more features if the web workflow is stable.

## Web App Responsibilities

The web app should own the full product workflow.

Path:

```txt id="k1nitc"
apps/web
```

Suggested stack:

```txt id="0ibd0w"
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
```

The web app should handle:

- authentication screens
- account setup
- active patch display
- champion pool management
- draft session creation
- intended champion selection
- ban recommendation view
- ban entry
- live pick phase draft board
- team and enemy pick entry
- pick recommendation view
- team composition analysis view
- item build suggestion view
- matchup notes
- match result entry
- draft review page
- draft history page
- detailed score breakdown views
- AI explanation display
- portfolio demo flow

## Mobile App Responsibilities

The mobile app should focus on quick draft support.

Path:

```txt id="b4tjb0"
apps/mobile
```

Suggested stack:

```txt id="so0j88"
React Native
Expo
TypeScript
```

The mobile app should handle:

- login
- active patch display
- champion pool summary
- start or open draft session
- choose role
- quick ban recommendation view
- quick pick recommendation view
- quick item build suggestion view
- team composition warning summary
- quick draft review summary

The mobile app should avoid heavy data management during the MVP.

## Shared Responsibilities

Both clients can share these concepts:

- user session
- active patch
- champion pool data
- draft session data
- draft bans
- draft picks
- recommendation results
- item build suggestions
- AI explanations
- draft review summaries

Both clients should use the backend API as the source of truth.

Both clients should use shared TypeScript types where possible.

## What Both Clients Should Share

The web and mobile apps should share stable contracts.

Suggested shared package:

```txt id="3kchjj"
packages/shared-types
```

Shared types should include:

- API response types
- draft session types
- champion pool types
- recommendation result types
- patch types
- champion types
- item types
- AI explanation types
- enum values

Example:

```txt id="b7akfi"
Role
DraftSessionStatus
DraftSide
RecommendationType
ConfidenceLevel
DataQualityLevel
```

## What Should Not Be Shared

The clients should not share everything.

### Web-only UI code

Web-specific components should stay in the web app.

Examples:

```txt id="3uxuuq"
desktop draft board layout
large data table
web modal components
web navigation sidebar
admin-like patch data screens
```

### Mobile-only UI code

Mobile-specific components should stay in the mobile app.

Examples:

```txt id="pjku8s"
mobile navigation stack
bottom tabs
swipe gestures
compact recommendation cards
mobile safe area layout
```

### Scoring logic

Scoring logic should not be shared with clients.

The Python recommendation service owns scoring.

### Database logic

Database logic should not be shared with clients.

The NestJS backend API owns database access through Prisma.

### AI provider logic

AI provider calls should not be shared with clients.

The backend API controls AI requests.

## API Usage Rule

Both clients should call the NestJS REST API.

The clients should not call:

- PostgreSQL directly
- Prisma directly
- Python recommendation service directly
- AI provider directly

Main flow:

```txt id="aat4c3"
Web App
Mobile App
   ↓
NestJS REST API
   ↓
PostgreSQL
Python Recommendation Service
AI Explanation Layer
```

## Web Client API Modules

The web app should use API client modules.

Suggested structure:

```txt id="8cfybi"
apps/web/src/api/
  authApi.ts
  patchApi.ts
  championApi.ts
  championPoolApi.ts
  draftApi.ts
  recommendationApi.ts
  aiExplanationApi.ts
```

The web UI should call these modules instead of calling `fetch` everywhere.

## Mobile Client API Modules

The mobile app should use similar API client modules.

Suggested structure:

```txt id="f5vwzl"
apps/mobile/src/api/
  authApi.ts
  patchApi.ts
  championPoolApi.ts
  draftApi.ts
  recommendationApi.ts
  aiExplanationApi.ts
```

The mobile app can reuse request and response types from `packages/shared-types`.

## MVP Feature Split

### Web MVP

The web MVP should include:

```txt id="ov1voy"
Account flow
Champion pool setup
Create draft session
Choose role
Choose intended champion or leave blank
Get ban recommendation
Enter bans
Start live pick phase
Enter team and enemy picks
View live pick recommendations
View team composition analysis
View item build suggestions
Save match result
Review draft performance
```

### Mobile MVP

The mobile MVP should include:

```txt id="xj9wwa"
Login
View active patch
Open champion pool summary
Start or open draft session
Choose role
View quick ban recommendations
View quick pick recommendations
View quick item build suggestions
View team composition warning summary
View draft review summary
```

The mobile MVP can skip advanced management screens.

## Screen Priority

### Web Screen Priority

First web screens:

```txt id="n2gi1n"
Dashboard
Champion Pool
Create Draft
Live Draft Board
Recommendations
Item Build Suggestions
Draft Review
Draft History
```

### Mobile Screen Priority

First mobile screens:

```txt id="35ugjs"
Login
Home
Quick Draft
Recommendation Summary
Item Build Summary
Draft Review Summary
```

## Draft Workflow Split

The web app should support the complete draft flow.

Example:

```txt id="1hqvp9"
Create draft
→ configure role and intended champion
→ get ban recommendation
→ enter bans
→ enter live picks
→ recalculate recommendations
→ view team composition
→ view item build
→ save result
→ review draft
```

The mobile app should support a compact flow.

Example:

```txt id="y20kvm"
Open draft
→ update pick or ban
→ view top recommendation
→ view quick reason
→ view item suggestion
```

## Recommendation Display Split

### Web Recommendation Display

The web app can show detailed recommendation data.

Examples:

- top recommended pick
- ranked list
- score breakdown
- confidence
- reason codes
- AI explanation
- risk notes
- matchup notes
- team composition chart or cards

### Mobile Recommendation Display

The mobile app should show compact recommendation data.

Examples:

- top recommendation
- top 3 options
- confidence
- 2 to 3 key reasons
- short risk note
- compact item build list

Mobile should avoid overwhelming the user.

## Team Composition Display Split

### Web Team Composition View

The web app can show detailed team composition analysis.

Examples:

- damage balance
- crowd control
- engage
- frontline
- scaling
- poke
- teamfight
- missing needs
- risk notes

### Mobile Team Composition View

The mobile app should show a summary.

Examples:

```txt id="vdivop"
Your team lacks frontline.
Your team has strong magic damage.
Enemy team has high healing.
Consider anti-heal items.
```

## Item Build Display Split

### Web Item Build View

The web app can show:

- core item list
- situational item list
- defensive item list
- anti-heal item options
- anti-shield item options
- score breakdown
- item reason codes
- enemy draft context

### Mobile Item Build View

The mobile app can show:

- top recommended build
- situational item alert
- enemy threat reason
- quick item order

Example:

```txt id="5j7gy4"
Core: Luden's Echo, Infinity Orb
Situational: anti-heal item if enemy healing stays high
Defense: magic resistance option if enemy AP grows
```

## Draft Review Split

### Web Draft Review

The web app can show a full review.

Examples:

- draft timeline
- picks and bans
- recommendation history
- final team composition
- saved match result
- what went well
- what was risky
- future notes

### Mobile Draft Review

The mobile app can show a summary.

Examples:

- match result
- best recommendation
- main draft risk
- one improvement note

## Offline Behavior

The MVP does not need full offline support.

Mobile can later cache:

- active patch
- champion pool summary
- recent draft sessions
- latest recommendation results

For MVP, the mobile app can require internet access.

## Notification Direction

Mobile notifications are out of scope for MVP.

Future mobile notifications could include:

- patch update reminders
- draft review reminders
- champion pool update reminders
- recommendation feedback reminders

This should be considered later, not during MVP.

## Design Direction

The web and mobile apps should share product language.

Examples:

```txt id="9z1rmt"
Ban Recommendation
Pick Recommendation
Team Composition
Item Build Suggestion
Draft Review
Confidence
Reason Codes
```

The UI layout can differ by platform.

The wording should stay consistent.

## State Management Direction

The web app and mobile app can choose their own UI state management.

MVP direction:

```txt id="vpdn9e"
Use local React state first.
Use server data from API.
Add stronger state management later only if needed.
```

Avoid adding too many state libraries early.

## Authentication Direction

Both clients should use the same backend auth system.

The exact auth method can be decided later.

Possible direction:

```txt id="9qs38x"
Backend-issued session or token
Web stores session safely
Mobile stores token securely
```

The frontend should not manage auth rules by itself.

The backend should enforce access control.

## Testing Direction

The web app should have tests for:

- champion pool flow
- draft creation
- ban entry
- pick entry
- recommendation display
- draft review display

The mobile app should have tests for:

- login flow
- quick draft screen
- recommendation summary
- item build summary

Shared types should be type-checked across both clients.

## Deployment Direction

Suggested deployment direction:

```txt id="9eo2tt"
apps/web → Vercel
apps/mobile → Expo/EAS
apps/api → backend host
apps/recommendation-service → Python service host
```

The web app and mobile app can deploy separately even though they live in the same monorepo.

## Consequences

### Positive Consequences

The web app can deliver the full MVP faster.

The mobile app stays focused and easier to build.

Both clients can share the same backend API.

The user experience fits each platform better.

The project shows web and mobile engineering skills.

The portfolio story becomes stronger.

### Negative Consequences

Maintaining two clients takes more work.

Some UI logic may be duplicated.

Design consistency requires discipline.

Mobile features may lag behind web features.

Testing becomes larger.

Shared types must stay stable.

### Risks

The main risks are:

- mobile scope becomes too large
- web and mobile UX drift too far apart
- duplicated API logic
- duplicated UI logic
- mobile app blocks web MVP progress
- shared package grows too fast
- mobile app tries to copy complex desktop screens

## Risk Mitigation

Wise Rift should reduce these risks by using:

- web-first MVP
- focused mobile companion scope
- shared API contracts
- shared TypeScript types
- separate UI components per platform
- same backend API
- clear feature priority
- simple mobile screens first

The mobile app should not block the web MVP.

## Alternatives Considered

### Alternative 1: Build web app only

Partially rejected.

Building web only would be faster.

However, Wise Rift is planned to include an iOS companion app.

The mobile app adds portfolio value and fits the draft assistant use case.

The MVP can still build web first and mobile after the core flow works.

### Alternative 2: Build mobile app first

Rejected.

The full workflow is easier to design and test on web first.

Mobile should come after the backend and core draft flow are stable.

### Alternative 3: Make web and mobile feature-identical

Rejected for MVP.

The mobile app should not copy every web feature.

It should focus on quick draft support.

### Alternative 4: Use one shared cross-platform UI codebase

Rejected for MVP.

Sharing all UI code across web and mobile can add complexity.

It is better to share contracts and product logic, not full UI.

### Alternative 5: Let mobile call recommendation service directly

Rejected.

Both clients should call the backend API.

The backend should own orchestration and security.

## Future Migration Path

The web and mobile split can grow over time.

Possible path:

```txt id="2nfyf0"
Web full workflow MVP
→ Mobile quick draft MVP
→ Shared API client helpers
→ Mobile draft review improvements
→ Mobile push notifications
→ Mobile offline cache
→ More shared design tokens
```

Future mobile features may include:

- offline champion pool cache
- recent draft cache
- push notification for patch updates
- quick champion matchup lookup
- saved item build notes
- voice-friendly or one-hand draft mode

Future web features may include:

- patch data editor
- recommendation tuning dashboard
- draft analytics
- champion pool analytics
- patch comparison tools

## Final Decision

Wise Rift will use the web app as the primary full workflow client.

Wise Rift will use the iOS mobile app as a companion quick-draft client.

Both clients will use the same NestJS REST API.

Both clients can share stable TypeScript contracts.

The web app will handle complex workflows and detailed views.

The mobile app will focus on quick guidance during draft.

This keeps the MVP realistic while still supporting Wise Rift as a web and mobile portfolio project.

## Related Documents

```txt id="6gd8gi"
docs/architecture/system-architecture.md
docs/architecture/api-design.md
docs/architecture/data-model.md
docs/architecture/scoring.md
docs/architecture/patch-data.md
docs/architecture/game-data-model.md
docs/adr/manual-patch-data.md
docs/adr/rule-based-scoring.md
docs/adr/ai-explanation-layer.md
docs/adr/monorepo-architecture.md
docs/adr/python-recommendation-service.md
docs/adr/postgresql-prisma.md
docs/adr/rest-api-first.md
docs/adr/shared-types-contracts.md
docs/adr/patch-versioning.md
```
