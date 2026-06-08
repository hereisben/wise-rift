# ADR: Monorepo Architecture

## Status

Accepted

## Date

2026-06-08

## Context

Wise Rift is planned as a multi-part software project.

The project includes:

- Next.js web app
- React Native Expo iOS app
- NestJS backend API
- Python recommendation service
- PostgreSQL database
- Prisma ORM
- AI explanation layer
- shared TypeScript types
- patch-versioned game data
- documentation
- tests

Wise Rift is not just a simple frontend app.

It has multiple apps and services that need to work together.

The main product workflow is:

```txt id="tvv2yf"
Choose Role
→ Set Champion Pool
→ Enter Picks and Bans
→ Get Ban Recommendation
→ Get Pick Recommendation
→ Get Item Build Suggestion
→ Save Match Result
→ Review Draft Performance
```

This workflow touches many parts of the system.

For example:

- the web app shows the draft board
- the iOS app shows quick draft guidance
- the backend API stores draft sessions
- PostgreSQL stores users, drafts, patch data, and recommendation results
- the Python service calculates scores
- the AI layer explains the scoring result
- shared types keep API contracts consistent
- docs explain product and architecture decisions

Because these parts are closely related, Wise Rift needs a repo structure that keeps them organized and easy to develop together.

## Decision

Wise Rift will use a monorepo architecture.

The web app, iOS app, backend API, recommendation service, shared packages, game data files, and documentation will live in one repository.

The monorepo will help the project move faster during the MVP stage.

It will also make it easier to keep product docs, API contracts, data models, scoring logic, and client apps aligned.

## Main Rule

Wise Rift will follow this rule:

```txt id="dg0i9r"
One product.
One repo.
Clear app and package boundaries.
```

The monorepo should not mean messy code.

Each app and package should have a clear responsibility.

## Why Monorepo Is Used

### 1. Wise Rift has many connected parts

Wise Rift has several apps and services, but they all support one product.

The web app, mobile app, backend API, recommendation service, and data files are connected through the same workflow.

For example, a draft recommendation requires:

```txt id="f97myn"
Frontend draft state
→ Backend draft session
→ Stored patch data
→ Recommendation service scoring
→ Stored recommendation result
→ AI explanation
→ Frontend display
```

Keeping these parts in one repo makes it easier to understand the full system.

### 2. Shared types are easier to manage

The web app, iOS app, and backend API should agree on data shapes.

For example:

- DraftSession
- Champion
- ChampionPoolEntry
- DraftPick
- DraftBan
- RecommendationResult
- ItemBuildSuggestion
- AIExplanation

If these types live in separate repos, they can drift apart.

A monorepo makes it easier to create a shared package for common TypeScript types.

Example:

```txt id="1vi7gd"
packages/shared-types
```

The frontend and backend can both use this package.

### 3. API contracts stay easier to update

Wise Rift will grow through many API changes.

For example, recommendation responses may change as the scoring system becomes more detailed.

A monorepo makes it easier to update:

- backend route response
- shared type
- web UI
- mobile UI
- tests
- docs

in the same branch and commit.

This reduces mismatch between frontend and backend.

### 4. Documentation stays close to code

Wise Rift is a portfolio project.

The docs are important.

They explain the product thinking and engineering choices.

A monorepo keeps these docs close to the real implementation.

Example docs include:

```txt id="3a7q9q"
docs/product/mvp-scope.md
docs/product/product-requirements.md
docs/product/user-flow.md
docs/architecture/system-architecture.md
docs/architecture/api-design.md
docs/architecture/data-model.md
docs/architecture/scoring.md
docs/architecture/patch-data.md
docs/architecture/game-data-model.md
docs/adr/manual-patch-data.md
docs/adr/rule-based-scoring.md
docs/adr/ai-explanation-layer.md
```

This helps the project tell a stronger story in a portfolio case study.

### 5. Patch data can live beside validation and seed logic

Wise Rift uses manually maintained patch data for the MVP.

The data files should live in the repo so they can be reviewed, versioned, and changed through Git.

Example:

```txt id="p0g7fq"
data/patches/6.1/champions.json
data/patches/6.1/items.json
data/patches/6.1/runes.json
data/patches/6.1/summoner-spells.json
```

The validation scripts, seed scripts, and backend schema can live in the same repo.

This makes patch updates easier to track.

### 6. MVP development is faster

For a solo developer or small team, a monorepo is simpler.

It avoids the overhead of managing many repositories.

It also makes local development easier because the full system can be cloned at once.

The project can use one root README, one progress log, one docs folder, and one shared development plan.

## Suggested Repository Structure

Suggested first monorepo structure:

```txt id="ll72i1"
wise-rift/
  apps/
    web/
    mobile/
    api/
    recommendation-service/

  packages/
    shared-types/
    shared-config/
    ui/

  data/
    patches/
      6.1/
        patch.json
        champions.json
        champion-skills.json
        items.json
        runes.json
        summoner-spells.json
        matchups.json
        scoring-tags.json

  docs/
    product/
      mvp-scope.md
      product-requirements.md
      user-flow.md

    architecture/
      system-architecture.md
      api-design.md
      data-model.md
      scoring.md
      patch-data.md
      game-data-model.md

    adr/
      manual-patch-data.md
      rule-based-scoring.md
      ai-explanation-layer.md
      monorepo-architecture.md

  scripts/
    validate-patch-data/
    seed-patch-data/

  tests/
    e2e/

  README.md
  PROGRESS.md
  package.json
```

## App Responsibilities

### Web App

Path:

```txt id="sn0ywq"
apps/web
```

The web app should handle:

- account screens
- champion pool management
- draft session flow
- live draft board
- ban recommendation display
- pick recommendation display
- team composition analysis display
- item build suggestion display
- draft history
- draft review page

Suggested stack:

```txt id="8pu2jb"
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
```

### Mobile App

Path:

```txt id="qe88h6"
apps/mobile
```

The mobile app should handle:

- quick draft view
- champion pool view
- recommendation summary
- item build summary
- draft review summary

Suggested stack:

```txt id="ly64ch"
React Native
Expo
TypeScript
```

The mobile app should not duplicate backend logic.

It should use the backend API.

### Backend API

Path:

```txt id="4a1c6e"
apps/api
```

The backend API should handle:

- authentication
- authorization
- user data
- champion pool
- draft sessions
- draft bans
- draft picks
- recommendation records
- item build records
- match results
- draft reviews
- AI explanation requests
- PostgreSQL access through Prisma
- calls to the Python recommendation service

Suggested stack:

```txt id="3tse4v"
NestJS
TypeScript
Prisma
PostgreSQL
```

### Recommendation Service

Path:

```txt id="q0xtpc"
apps/recommendation-service
```

The recommendation service should handle:

- ban scoring
- pick scoring
- team composition scoring
- item build scoring
- confidence calculation
- reason code generation
- score breakdown generation

Suggested stack:

```txt id="l4ounj"
Python
FastAPI
Pydantic
Pytest
```

The recommendation service should not own user accounts or draft history.

It should receive structured input and return structured scoring output.

### Shared Types

Path:

```txt id="hx42q1"
packages/shared-types
```

Shared types should include:

- API request types
- API response types
- draft session types
- recommendation result types
- champion data types
- item data types
- enum values
- reason code types
- confidence types

Example:

```txt id="tn5tzl"
DraftSession
DraftPick
DraftBan
RecommendationResult
RecommendationType
ConfidenceLevel
ReasonCode
PatchVersion
```

### Shared Config

Path:

```txt id="uqsrav"
packages/shared-config
```

Shared config can include:

- TypeScript config
- ESLint config
- Prettier config
- shared test config

This helps keep apps consistent.

### Shared UI

Path:

```txt id="em4l5f"
packages/ui
```

This package can be added later.

It can include reusable web UI components.

The MVP can start without it if needed.

## Data Ownership

The monorepo should keep clear data ownership.

### PostgreSQL owns app runtime data

PostgreSQL should store:

- users
- champion pools
- draft sessions
- draft bans
- draft picks
- recommendation results
- item build results
- matchup notes
- match results
- draft reviews
- AI explanations

### JSON files own patch seed data

JSON files should store manually maintained patch data.

Example:

```txt id="jkfzux"
data/patches/6.1/champions.json
data/patches/6.1/items.json
```

### Recommendation service owns scoring logic

The Python service should own:

- formulas
- score weights
- reason code generation
- confidence rules

### Backend API owns business workflow

The backend API should own:

- auth
- draft lifecycle
- data validation
- route structure
- database persistence
- AI request control
- recommendation service calls

### Frontends own presentation

The web and mobile apps should own:

- screens
- forms
- UI state
- user interactions
- displaying recommendations

They should not own scoring decisions.

## Shared Contract Direction

Wise Rift should use shared contracts to keep apps aligned.

Example response type:

```ts id="f7e53q"
export type RecommendationResult = {
  recommendationId: string;
  draftSessionId: string;
  type: "BAN" | "PICK" | "TEAM_COMP" | "ITEM_BUILD";
  targetId: string;
  finalScore: number;
  confidence: "HIGH" | "MEDIUM" | "LOW";
  reasonCodes: string[];
  scoreBreakdown: Record<string, number>;
  createdAt: string;
};
```

The backend can return this shape.

The web and mobile apps can display this shape.

Tests can also use this shape.

## Development Workflow

A normal feature branch can update multiple parts of the monorepo.

Example:

```txt id="pnzuv9"
Feature: live pick recommendation

Update:
- apps/api
- apps/recommendation-service
- packages/shared-types
- apps/web
- docs/architecture/api-design.md
- docs/architecture/scoring.md
```

This is a benefit of monorepo.

The full feature can be reviewed together.

## Branch Strategy

Branches should describe the work area.

Examples:

```txt id="sa6kc3"
docs/adr-monorepo-architecture
docs/api-design
docs/scoring-system
setup/monorepo
setup/api-app
setup/web-app
setup/recommendation-service
feature/champion-pool
feature/draft-session
feature/pick-recommendation
```

For the current ADR:

```txt id="qtmkwb"
docs/adr-monorepo-architecture
```

## Commit Strategy

Commits should be clear and scoped.

Examples:

```txt id="0eaner"
docs: add monorepo architecture ADR
setup: add initial monorepo structure
setup: add Next.js web app
setup: add NestJS API app
setup: add Python recommendation service
feat: add champion pool API
feat: add draft session API
```

## Local Development Direction

The monorepo should support running multiple apps locally.

Possible commands:

```bash id="yo6r6h"
npm run dev:web
npm run dev:mobile
npm run dev:api
npm run dev:recommendation
npm run dev
```

A later root `dev` command can run the main services together.

Example:

```txt id="4h2cuk"
Web app
Backend API
Recommendation service
Database
```

The MVP can start simple and improve local scripts over time.

## Testing Direction

The monorepo should support tests across the whole project.

Suggested test areas:

```txt id="221jw2"
apps/web tests
apps/mobile tests
apps/api tests
apps/recommendation-service tests
packages/shared-types type checks
patch data validation tests
end-to-end tests
```

Possible commands:

```bash id="a5cal9"
npm run test
npm run test:web
npm run test:api
npm run test:e2e
```

Python tests may use a separate command:

```bash id="01iemc"
cd apps/recommendation-service
pytest
```

## CI Direction

GitHub Actions can run checks for the whole monorepo.

Suggested CI checks:

```txt id="1pss3u"
install dependencies
type check
lint
unit tests
patch data validation
API tests
recommendation service tests
build web app
```

CI can become stricter after the app setup is complete.

## Deployment Direction

Even though the code lives in one repo, each app can deploy separately.

Suggested deployment direction:

```txt id="ercxzh"
apps/web → Vercel
apps/mobile → Expo/EAS
apps/api → Render, Railway, Fly.io, or similar
apps/recommendation-service → Render, Railway, Fly.io, or similar
PostgreSQL → Supabase, Neon, Railway, or managed Postgres
```

The monorepo does not force one deployment unit.

It only keeps source code in one place.

## Consequences

### Positive Consequences

The monorepo keeps the project easier to manage.

The web app, mobile app, API, recommendation service, docs, and data can evolve together.

Shared types reduce frontend and backend mismatch.

Docs stay close to code.

Patch data changes can be reviewed with seed and validation logic.

Feature branches can include full-stack changes.

The project is easier to present as one portfolio case study.

### Negative Consequences

The repo can become large.

Tooling can become harder as more apps are added.

Install time may grow.

CI may become slower.

Boundaries can become messy if apps import from each other incorrectly.

The Python service may need separate environment handling.

### Risks

The main risks are:

- unclear app boundaries
- too many shared packages too early
- frontend depending on backend internals
- backend depending on frontend code
- Python and TypeScript tooling conflicts
- slow CI
- large repo structure before MVP needs it

## Risk Mitigation

Wise Rift should reduce these risks by using:

- clear folder boundaries
- small shared packages
- shared types only when useful
- no direct frontend import from backend internals
- no duplicated scoring logic in frontend
- clear README setup instructions
- scoped branch names
- scoped commit messages
- CI checks by app

The monorepo should start simple.

The project should not add too much tooling before needed.

## Import Boundary Rules

Wise Rift should follow these import rules:

```txt id="272y5d"
apps/web can import from packages/shared-types
apps/mobile can import from packages/shared-types
apps/api can import from packages/shared-types
apps/api can call apps/recommendation-service through HTTP
apps/web cannot import apps/api source files
apps/mobile cannot import apps/api source files
apps/web cannot import apps/recommendation-service source files
apps/mobile cannot import apps/recommendation-service source files
```

The backend API should be the bridge between clients and the recommendation service.

## Alternatives Considered

### Alternative 1: Use separate repositories for each app

Rejected for MVP.

Separate repos would add more overhead.

It would make shared types, docs, and coordinated changes harder.

This may be useful later if the project becomes larger.

### Alternative 2: Put everything in one app folder

Rejected.

Wise Rift has different runtime targets.

The web app, mobile app, API, and recommendation service should have separate folders.

Putting everything in one app folder would become messy.

### Alternative 3: Build only a web app first without monorepo

Partially rejected.

The MVP can start with the web app first, but the repo should still be shaped for future mobile, API, and recommendation service work.

A monorepo gives the project room to grow.

### Alternative 4: Use only one backend service and skip Python

Rejected for architecture direction.

The recommendation system may benefit from Python because scoring, future analysis, and possible data experiments are easier there.

The backend API should focus on product workflow and persistence.

The Python service should focus on scoring.

## Future Migration Path

The monorepo is the right choice for MVP and early portfolio development.

If Wise Rift grows much larger, some services could be split later.

Possible future path:

```txt id="zvd14g"
Single monorepo
→ stronger package boundaries
→ app-specific CI
→ service-specific deployment pipelines
→ optional repo split if team size grows
```

A repo split should only happen if there is a clear reason.

Examples:

- separate teams own different services
- CI becomes too slow
- deployment needs become too different
- access control becomes important
- the recommendation service becomes a standalone product

Until then, monorepo is simpler.

## Final Decision

Wise Rift will use a monorepo architecture.

The repository will contain:

- web app
- mobile app
- backend API
- Python recommendation service
- shared packages
- patch data
- scripts
- tests
- documentation

This keeps the MVP easier to build, easier to document, easier to test, and easier to present as one complete software engineering project.

## Related Documents

```txt id="b4cv4o"
docs/architecture/system-architecture.md
docs/architecture/api-design.md
docs/architecture/data-model.md
docs/architecture/scoring.md
docs/architecture/patch-data.md
docs/architecture/game-data-model.md
docs/adr/manual-patch-data.md
docs/adr/rule-based-scoring.md
docs/adr/ai-explanation-layer.md
```
