# ADR: Shared Types and API Contracts

## Status

Accepted

## Date

2026-06-08

## Context

Wise Rift has multiple apps and services that need to exchange structured data.

The project includes:

- Next.js web app
- React Native Expo iOS app
- NestJS backend API
- PostgreSQL database
- Prisma ORM
- Python recommendation service
- AI explanation layer

The web app and mobile app both need to use the same backend API.

The backend API needs to return stable response shapes.

The Python recommendation service needs clear request and response contracts with the backend API.

The AI explanation layer needs structured input from recommendation results.

Wise Rift also has many shared domain objects.

Examples:

- User
- Patch
- Champion
- Item
- ChampionPoolEntry
- DraftSession
- DraftBan
- DraftPick
- RecommendationResult
- ItemBuildSuggestion
- TeamCompositionAnalysis
- MatchResult
- DraftReview
- AIExplanation

If these data shapes are not managed carefully, the frontend, backend, mobile app, and services can drift apart.

For example:

```txt id="qc0nau"
Backend returns finalScore
Frontend expects score
Mobile expects recommendationScore
```

This kind of mismatch can create bugs.

Wise Rift needs a clear contract strategy.

## Decision

Wise Rift will use shared TypeScript types and stable API contracts.

The monorepo will include a shared types package.

Suggested package:

```txt id="q252av"
packages/shared-types
```

The web app, mobile app, and NestJS backend API can use shared TypeScript types from this package.

The Python recommendation service will not directly import TypeScript types, but it should follow the same documented contract through matching Pydantic schemas.

The API response shape should stay consistent across REST routes.

## Main Rule

Wise Rift will follow this rule:

```txt id="tky1s4"
Shared contracts first.
App-specific implementation second.
```

The API contract should be clear before each feature is implemented.

## Why Shared Types Are Needed

### 1. Web and mobile need the same data shape

Wise Rift has both a web app and an iOS app.

Both clients need to show:

- draft sessions
- champion pool
- picks and bans
- recommendations
- item builds
- team composition analysis
- draft reviews
- AI explanations

If web and mobile use different data shapes, the product becomes harder to maintain.

Shared types help both clients stay aligned.

### 2. Frontend and backend can drift apart

Without shared contracts, the backend may change a response and break the frontend.

Example problem:

```txt id="w5d62q"
Backend changes championId to championID.
Frontend still reads championId.
The UI breaks.
```

Shared types reduce this risk.

### 3. API routes need consistent response shapes

Wise Rift has many route groups:

```txt id="ldcfp9"
/api/auth
/api/patches
/api/champions
/api/items
/api/champion-pool
/api/drafts
/api/drafts/:draftSessionId/bans
/api/drafts/:draftSessionId/picks
/api/drafts/:draftSessionId/recommendations
/api/drafts/:draftSessionId/match-result
/api/drafts/:draftSessionId/review
/api/ai/explanations
```

Using one standard API response shape makes the frontend easier to build.

### 4. Recommendation results need strict contracts

Recommendation results are central to Wise Rift.

They include:

- rank
- target type
- target ID
- final score
- confidence
- reason codes
- score breakdown
- risk notes
- AI explanation

This data should not have unclear shapes.

The scoring engine, backend, frontend, and AI layer all depend on it.

### 5. Shared contracts improve portfolio quality

Shared types and contracts show stronger engineering practice.

They show that Wise Rift is not just a UI project.

The project has:

- domain modeling
- API design
- contract design
- service boundaries
- typed data flow
- frontend/backend alignment

This makes the project stronger for a software engineering portfolio.

## What Should Be Shared

The shared types package should include stable domain and API types.

### API Response Types

Shared API response types should include:

```txt id="g242bp"
ApiResponse
ApiError
PaginationMeta
PaginatedResponse
```

Example:

```ts id="ne6xzg"
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: ApiError[];
  meta?: PaginationMeta;
};

export type ApiError = {
  field?: string;
  message: string;
  code?: string;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};
```

### Shared Enum Types

Shared enums should include stable values used by many apps.

Examples:

```ts id="pj0aea"
export type Role = "TOP" | "JUNGLE" | "MID" | "ADC" | "SUPPORT";

export type DraftSessionStatus =
  | "CREATED"
  | "BAN_PHASE"
  | "LIVE_PICK_PHASE"
  | "COMPLETED"
  | "REVIEWED";

export type DraftSide = "TEAM" | "ENEMY";

export type RecommendationType = "BAN" | "PICK" | "TEAM_COMP" | "ITEM_BUILD";

export type ConfidenceLevel = "HIGH" | "MEDIUM" | "LOW";

export type DataQualityLevel =
  | "COMPLETE"
  | "PARTIAL"
  | "PLACEHOLDER"
  | "NEEDS_REVIEW";
```

### Draft Types

Shared draft types should include:

```txt id="vxlz2o"
DraftSession
DraftBan
DraftPick
DraftState
CreateDraftSessionRequest
UpdateDraftSessionRequest
CreateDraftPickRequest
CreateDraftBanRequest
```

Example:

```ts id="wh7wiw"
export type DraftSession = {
  draftSessionId: string;
  userId: string;
  patchId: string;
  role: Role;
  status: DraftSessionStatus;
  intendedChampionId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DraftPick = {
  draftPickId: string;
  draftSessionId: string;
  championId: string;
  side: DraftSide;
  pickOrder: number;
  role?: Role | null;
};
```

### Champion Pool Types

Shared champion pool types should include:

```txt id="ck9ktf"
ChampionPoolEntry
CreateChampionPoolEntryRequest
UpdateChampionPoolEntryRequest
```

Example:

```ts id="rtxckp"
export type ChampionPoolEntry = {
  championPoolEntryId: string;
  userId: string;
  championId: string;
  role: Role;
  comfortLevel: number;
  isFavorite: boolean;
  notes?: string | null;
};
```

### Patch and Game Data Types

Shared game data types should include:

```txt id="t2m94f"
Patch
Champion
ChampionPatchStat
ChampionSkill
Item
ItemPatchStat
Rune
SummonerSpell
```

Example:

```ts id="qwmbme"
export type Patch = {
  patchId: string;
  version: string;
  displayName: string;
  isActive: boolean;
  releaseDate?: string | null;
};

export type Champion = {
  championId: string;
  slug: string;
  displayName: string;
  roles: Role[];
  tags: string[];
  dataQuality: DataQualityLevel;
};
```

### Recommendation Types

Shared recommendation types should include:

```txt id="z84wgg"
RecommendationResult
RecommendationScoreBreakdown
RecommendationReasonCode
RecommendationTargetType
PickRecommendation
BanRecommendation
ItemBuildRecommendation
TeamCompositionAnalysis
```

Example:

```ts id="1grcyq"
export type RecommendationTargetType = "CHAMPION" | "ITEM" | "TEAM_COMP";

export type RecommendationResult = {
  recommendationId: string;
  draftSessionId: string;
  type: RecommendationType;
  targetType: RecommendationTargetType;
  targetId: string;
  displayName: string;
  rank: number;
  finalScore: number;
  confidence: ConfidenceLevel;
  reasonCodes: string[];
  scoreBreakdown: Record<string, number>;
  riskNotes: string[];
  createdAt: string;
};
```

### AI Explanation Types

Shared AI explanation types should include:

```txt id="6fkw1g"
AIExplanation
AIExplanationRequest
AIExplanationResponse
```

Example:

```ts id="vmincm"
export type AIExplanation = {
  aiExplanationId: string;
  draftSessionId: string;
  recommendationId: string;
  summary: string;
  explanation: string;
  riskNote?: string | null;
  confidenceNote?: string | null;
  createdAt: string;
};
```

## What Should Not Be Shared

Not all code should be shared.

### Backend Internal Types

Backend-only types should stay inside `apps/api`.

Examples:

```txt id="n9tbot"
Prisma service internals
Database repository helpers
Auth middleware internals
Controller-only helper types
Environment config types
```

### Frontend UI Types

Frontend-only UI types should stay inside the frontend apps.

Examples:

```txt id="nhncpk"
Modal state
Tab state
Form local state
Component props used only once
Animation state
UI filter state
```

### Python Internal Types

Python-only scoring types should stay inside the recommendation service.

Examples:

```txt id="qivkll"
internal scoring helper models
temporary scoring calculation objects
weight tuning helpers
pytest fixtures
```

### AI Prompt Internals

Prompt-building internals should stay in the backend API.

The shared package can define the public shape of `AIExplanation`, but not the full prompt logic.

## API Contract Direction

Each REST route should have clear request and response contracts.

Example route:

```txt id="ysh8ap"
POST /api/drafts
```

Request type:

```ts id="gr6jvs"
export type CreateDraftSessionRequest = {
  patchId: string;
  role: Role;
  intendedChampionId?: string | null;
};
```

Response type:

```ts id="c1760p"
export type CreateDraftSessionResponse = ApiResponse<DraftSession>;
```

Another example route:

```txt id="xwaxsb"
POST /api/drafts/:draftSessionId/recommendations/recalculate
```

Response type:

```ts id="uqz5q4"
export type RecalculateRecommendationsResponse = ApiResponse<{
  draftSessionId: string;
  recommendations: RecommendationResult[];
}>;
```

## Standard Response Shape

Wise Rift should use one response shape.

Success example:

```json id="i28ozx"
{
  "success": true,
  "message": "Draft session created successfully",
  "data": {
    "draftSessionId": "draft_001"
  }
}
```

Error example:

```json id="a9hqi3"
{
  "success": false,
  "message": "Invalid draft data",
  "errors": [
    {
      "field": "role",
      "message": "Role must be one of TOP, JUNGLE, MID, ADC, SUPPORT"
    }
  ]
}
```

This standard shape should be used across all API route groups.

## Frontend API Client Direction

The frontend should not call `fetch` everywhere.

Each frontend app should have API client modules.

Example:

```txt id="vdlo6q"
apps/web/src/api/draftApi.ts
apps/web/src/api/championPoolApi.ts
apps/web/src/api/recommendationApi.ts
apps/mobile/src/api/draftApi.ts
apps/mobile/src/api/recommendationApi.ts
```

Example API function:

```ts id="41equi"
export async function createDraftSession(
  body: CreateDraftSessionRequest,
): Promise<CreateDraftSessionResponse> {
  const response = await fetch("/api/drafts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.json();
}
```

The request and response types should come from `packages/shared-types`.

## Backend DTO Direction

The backend API can use DTOs or validation schemas.

These should match shared contract types.

Example:

```txt id="2a95i6"
CreateDraftSessionDto
UpdateDraftSessionDto
CreateDraftPickDto
CreateDraftBanDto
RecalculateRecommendationDto
```

The backend should validate input before writing to PostgreSQL.

The shared TypeScript types help the frontend know the expected shape.

Backend validation still matters because TypeScript does not protect runtime input.

## Python Service Contract Direction

The Python recommendation service cannot import TypeScript types directly.

Instead, it should use Pydantic schemas that match the documented contract.

Example Python schema:

```python id="18rl4o"
from pydantic import BaseModel
from typing import Literal

class DraftState(BaseModel):
    draftSessionId: str
    role: Literal["TOP", "JUNGLE", "MID", "ADC", "SUPPORT"]
    teamPicks: list[str]
    enemyPicks: list[str]
    bannedChampions: list[str]
    intendedChampionId: str | None = None

class RecommendationResult(BaseModel):
    rank: int
    targetType: Literal["CHAMPION", "ITEM", "TEAM_COMP"]
    targetId: str
    displayName: str
    finalScore: float
    confidence: Literal["HIGH", "MEDIUM", "LOW"]
    reasonCodes: list[str]
    scoreBreakdown: dict[str, float]
    riskNotes: list[str]
```

The TypeScript shared types and Python Pydantic schemas should stay aligned through docs and tests.

## Contract Testing Direction

Wise Rift should add contract tests later.

Contract tests should check:

- backend response shape
- frontend expected types
- recommendation service request shape
- recommendation service response shape
- AI explanation response shape
- error response shape

Example test:

```txt id="w05rhm"
Given a valid draft session
When POST /api/drafts/:draftSessionId/recommendations/recalculate is called
Then the response includes success, message, data, and recommendations
```

Another example:

```txt id="lzq4ho"
Given recommendation service returns finalScore
When backend stores the result
Then frontend receives finalScore, not score or recommendationScore
```

## Versioning Direction

The MVP can start with one version of shared types.

Future packages can use semantic versioning if needed.

Because this is a monorepo, early changes can happen together.

Future direction:

```txt id="kvp90g"
packages/shared-types v0
→ stable API contracts
→ OpenAPI docs
→ generated clients if needed
```

If the API becomes public later, stronger versioning is needed.

Possible route version:

```txt id="ry2g6t"
/api/v1
```

## Naming Rules

Wise Rift should use consistent names across contracts.

Use:

```txt id="s2gd7m"
patchId
championId
itemId
draftSessionId
recommendationId
finalScore
confidence
reasonCodes
scoreBreakdown
riskNotes
createdAt
updatedAt
```

Avoid mixing names like:

```txt id="rbj0b7"
championID
champion_id
score
recommendationScore
draftId
sessionId
```

Use camelCase in TypeScript and API JSON.

Python can use snake_case internally if needed, but API JSON should remain camelCase.

## Date Format Rule

API dates should use ISO strings.

Example:

```txt id="dbpp69"
2026-06-08T10:30:00.000Z
```

Frontend apps can format dates for display.

The backend should return stable machine-readable values.

## ID Rule

API contracts should use clear ID field names.

Use:

```txt id="kccs4s"
draftSessionId
championId
itemId
patchId
recommendationId
aiExplanationId
```

Avoid unclear names like:

```txt id="mdjgvr"
id
target
entity
ref
```

Inside database models, `id` is okay.

At the API boundary, specific names are clearer.

## Score Rule

Recommendation scores should use `finalScore`.

Breakdown values should live inside `scoreBreakdown`.

Example:

```json id="qoanv4"
{
  "finalScore": 84,
  "scoreBreakdown": {
    "matchupScore": 20,
    "teamSynergyScore": 16,
    "patchStrengthScore": 12
  }
}
```

Do not return multiple unclear score fields.

## Reason Code Rule

Reason codes should be uppercase strings.

Example:

```txt id="nlsxxk"
GOOD_MATCHUP
HIGH_COMFORT_PICK
ADDS_MAGIC_DAMAGE
COUNTERS_HEALING
LACKS_FRONTLINE
```

Reason codes should be stable because the frontend and AI explanation layer can use them.

## Package Structure Direction

Suggested shared types package:

```txt id="l0zxdo"
packages/shared-types/
  src/
    api/
      response.ts
      pagination.ts
      errors.ts

    domain/
      patch.ts
      champion.ts
      item.ts
      draft.ts
      champion-pool.ts
      recommendation.ts
      ai-explanation.ts

    enums/
      role.ts
      draft.ts
      recommendation.ts
      confidence.ts
      data-quality.ts

    index.ts

  package.json
  tsconfig.json
```

The package should export types from `src/index.ts`.

Example:

```ts id="vzju9d"
export * from "./api/response";
export * from "./api/pagination";
export * from "./api/errors";

export * from "./domain/draft";
export * from "./domain/champion";
export * from "./domain/item";
export * from "./domain/recommendation";
export * from "./domain/ai-explanation";

export * from "./enums/role";
export * from "./enums/confidence";
```

## Relationship With Prisma

Prisma models are database models.

Shared types are API/domain contracts.

They may look similar, but they are not always the same.

Example:

```txt id="xupus5"
Prisma DraftSession model may use id.
API DraftSession type may use draftSessionId.
```

The backend should map database records to API response types.

Do not expose Prisma models directly if the API needs a cleaner shape.

## Relationship With OpenAPI

OpenAPI can be added later.

It can help generate API docs and maybe API clients.

For MVP, shared TypeScript types are enough.

Future direction:

```txt id="j6n7ol"
Shared TypeScript types
→ OpenAPI docs
→ generated clients
→ contract tests
```

## Consequences

### Positive Consequences

Shared types reduce frontend and backend mismatch.

Web and mobile apps can use the same contracts.

API responses become easier to understand.

Recommendation results stay consistent.

The project becomes easier to refactor.

The architecture looks stronger and more professional.

### Negative Consequences

Shared types require discipline.

The shared package can become too large.

Some types may be shared too early.

Backend database models and API types may need mapping code.

Python schemas must still be kept aligned manually or through tests.

### Risks

The main risks are:

- shared package becomes a dumping ground
- frontend depends on backend internals
- API types expose too much database structure
- Python service contract drifts from TypeScript types
- names become inconsistent
- contract changes break web or mobile
- too much time spent designing types before MVP works

## Risk Mitigation

Wise Rift should reduce these risks by using:

- small shared package first
- only share stable types
- keep UI types inside frontend apps
- keep backend internals inside backend app
- keep Python internals inside recommendation service
- document API request and response examples
- write contract tests later
- update docs when response shapes change
- avoid exposing Prisma models directly

The shared types package should grow with the product.

Do not add every future type before it is needed.

## Alternatives Considered

### Alternative 1: No shared types

Rejected.

This would make frontend and backend drift more likely.

It would also make mobile support harder later.

### Alternative 2: Generate all types from Prisma

Rejected for API contracts.

Prisma models are database models.

The API should not always expose database shape directly.

Prisma-generated types can help backend code, but shared API types should be designed for the API boundary.

### Alternative 3: Use OpenAPI from the start

Partially rejected for MVP.

OpenAPI is useful, but it adds setup work.

The MVP can start with shared TypeScript types and clear docs.

OpenAPI can be added later.

### Alternative 4: Use tRPC

Rejected for MVP architecture.

tRPC is useful for TypeScript-only full-stack apps.

Wise Rift also has React Native and a Python recommendation service direction.

REST plus shared types gives clearer service boundaries.

### Alternative 5: Share all code between apps

Rejected.

Only stable contracts should be shared.

App-specific implementation should stay inside each app.

## Future Migration Path

Shared contracts can improve over time.

Possible path:

```txt id="6d0a75"
Shared TypeScript types
→ contract tests
→ OpenAPI documentation
→ generated API clients
→ stronger service schemas
→ API versioning
```

Future improvements may include:

- generated API client for web
- generated API client for mobile
- OpenAPI spec from NestJS
- schema validation with Zod
- contract tests between NestJS and Python service
- stricter reason code enum package
- shared API examples for docs

## Final Decision

Wise Rift will use shared TypeScript types and stable API contracts.

The shared types package will support the web app, mobile app, and NestJS backend API.

The Python recommendation service will use matching Pydantic schemas based on the same documented contracts.

The project will use consistent API response shapes, naming rules, reason codes, confidence levels, and recommendation result structures.

This keeps Wise Rift easier to build, test, refactor, and present as a full-stack software engineering project.

## Related Documents

```txt id="obhm7m"
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
```
