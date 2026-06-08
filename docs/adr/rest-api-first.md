# ADR: REST API First

## Status

Accepted

## Date

2026-06-08

## Context

Wise Rift has multiple clients and services.

The project includes:

- Next.js web app
- React Native Expo iOS app
- NestJS backend API
- PostgreSQL database
- Prisma ORM
- Python recommendation service
- AI explanation layer

The app needs to support a full draft workflow:

```txt id="qj3exv"
Choose Role
→ Set Champion Pool
→ Enter Picks and Bans
→ Get Ban Recommendation
→ Get Pick Recommendation
→ Get Item Build Suggestion
→ Save Match Result
→ Review Draft Performance
```

This workflow requires many backend operations.

For example:

- create account
- select active patch
- manage champion pool
- create draft session
- save bans
- save picks
- calculate recommendations
- save recommendation results
- generate AI explanations
- save match result
- create draft review
- load draft history

Wise Rift needs a clear way for the web app, mobile app, backend API, database, recommendation service, and AI layer to communicate.

The project should avoid direct frontend access to the database, recommendation service, or AI provider.

## Decision

Wise Rift will use a REST API first approach.

The NestJS backend API will be the main public API for the web app and iOS app.

The frontend clients will call the backend REST API.

The backend API will own orchestration between:

- frontend clients
- PostgreSQL database
- Prisma ORM
- Python recommendation service
- AI explanation layer

The Python recommendation service will expose internal service routes, but the frontend will not call those routes directly.

The AI provider will be called only by the backend API.

## Main Rule

Wise Rift will follow this rule:

```txt id="sycp9o"
Frontend calls the backend API.
Backend orchestrates the system.
Services stay behind the backend.
```

This keeps the system easier to secure, test, and maintain.

## Why REST API First Is Used

### 1. REST is clear for MVP development

REST routes are easy to understand.

Each route maps well to a product action.

For example:

```txt id="dql725"
POST /api/drafts
GET /api/drafts/:draftSessionId
POST /api/drafts/:draftSessionId/bans
POST /api/drafts/:draftSessionId/picks
POST /api/drafts/:draftSessionId/recommendations/recalculate
```

This makes the MVP easier to build and explain.

### 2. Web and mobile can share the same API

Wise Rift has a web app and an iOS app.

Both clients should use the same backend API.

This prevents duplicate backend logic.

Example:

```txt id="4jox1n"
Web app → NestJS REST API
Mobile app → NestJS REST API
```

The mobile app should not need a separate backend.

### 3. Backend owns orchestration

A recommendation request may need many steps.

Example:

```txt id="tg8fe5"
Frontend requests recommendation
→ Backend validates user access
→ Backend loads draft session
→ Backend loads patch data
→ Backend builds scoring request
→ Backend calls Python recommendation service
→ Backend stores recommendation result
→ Backend returns result to frontend
```

This orchestration belongs in the backend.

It should not be placed in the frontend.

### 4. Frontend should not access the database directly

The frontend should never query PostgreSQL directly.

If the frontend accesses the database directly, the app becomes harder to secure and maintain.

The backend should control:

- authentication
- authorization
- validation
- database queries
- data shaping
- error handling
- rate limits

### 5. Frontend should not call the recommendation service directly

The Python recommendation service is an internal service.

It should not be public-facing in the MVP.

The backend should prepare scoring input and call the service.

This keeps the recommendation service focused on scoring only.

### 6. Frontend should not call the AI provider directly

The AI provider should only be called by the backend.

This protects:

- API keys
- prompt rules
- structured input
- output validation
- cost control
- rate limits
- stored explanation records

The frontend should request an explanation from the backend.

The backend should decide how to call the AI provider.

### 7. REST supports simple testing

REST routes are easy to test with tools like:

- Postman
- Insomnia
- curl
- automated API tests
- frontend integration tests

This is useful for a portfolio project because the API behavior can be demonstrated clearly.

## API Boundary

The public API boundary should look like this:

```txt id="3qjln7"
Web App
Mobile App
   ↓
NestJS REST API
   ↓
PostgreSQL / Prisma
Python Recommendation Service
AI Explanation Layer
```

The frontend only talks to the NestJS REST API.

The backend talks to internal services.

## Main API Groups

Wise Rift should organize API routes by product area.

Suggested main route groups:

```txt id="ckkwra"
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

## Authentication Routes

Suggested routes:

```txt id="vcgjqy"
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

Authentication routes should handle user identity and session or token behavior.

## Patch Routes

Suggested routes:

```txt id="3m1wwm"
GET /api/patches
GET /api/patches/active
GET /api/patches/:patchId
```

Patch routes allow the app to load active patch data.

## Champion Routes

Suggested routes:

```txt id="59jltj"
GET /api/champions
GET /api/champions/:championId
GET /api/champions/:championId/patches/:patchId
```

Champion routes should return champion identity, role data, tags, and patch-specific data.

## Item Routes

Suggested routes:

```txt id="3ks6ce"
GET /api/items
GET /api/items/:itemId
GET /api/items/:itemId/patches/:patchId
```

Item routes should return item identity, item stats, item tags, and patch-specific item data.

## Champion Pool Routes

Suggested routes:

```txt id="7dr7q6"
GET /api/champion-pool
POST /api/champion-pool
PATCH /api/champion-pool/:championPoolEntryId
DELETE /api/champion-pool/:championPoolEntryId
```

Champion pool routes should be user-owned.

A user should only manage their own champion pool.

## Draft Session Routes

Suggested routes:

```txt id="y9z2rr"
GET /api/drafts
POST /api/drafts
GET /api/drafts/:draftSessionId
PATCH /api/drafts/:draftSessionId
DELETE /api/drafts/:draftSessionId
```

Draft session routes should manage the draft lifecycle.

A draft session should store the active patch ID when it is created.

Important rule:

```txt id="qz0ksd"
DraftSession.patchId should not change after creation.
```

## Draft Ban Routes

Suggested routes:

```txt id="n64iyy"
GET /api/drafts/:draftSessionId/bans
POST /api/drafts/:draftSessionId/bans
PATCH /api/drafts/:draftSessionId/bans/:draftBanId
DELETE /api/drafts/:draftSessionId/bans/:draftBanId
```

Ban routes should support the ban phase.

Ban recommendations can happen before the pick phase.

## Draft Pick Routes

Suggested routes:

```txt id="1wff5k"
GET /api/drafts/:draftSessionId/picks
POST /api/drafts/:draftSessionId/picks
PATCH /api/drafts/:draftSessionId/picks/:draftPickId
DELETE /api/drafts/:draftSessionId/picks/:draftPickId
```

Pick routes should support live draft updates.

Because picks happen in turns, the API should allow the draft board to update as team and enemy picks change.

## Recommendation Routes

Suggested routes:

```txt id="cankus"
GET /api/drafts/:draftSessionId/recommendations
POST /api/drafts/:draftSessionId/recommendations/recalculate
GET /api/drafts/:draftSessionId/recommendations/bans
GET /api/drafts/:draftSessionId/recommendations/picks
GET /api/drafts/:draftSessionId/recommendations/items
```

The backend should call the Python recommendation service when recalculation is needed.

The frontend should not call the Python service directly.

## Match Result Routes

Suggested routes:

```txt id="odmys8"
POST /api/drafts/:draftSessionId/match-result
GET /api/drafts/:draftSessionId/match-result
PATCH /api/drafts/:draftSessionId/match-result
```

Match result routes should let the user save whether the match was won or lost.

They can also store optional notes.

## Draft Review Routes

Suggested routes:

```txt id="lsruim"
GET /api/drafts/:draftSessionId/review
POST /api/drafts/:draftSessionId/review
```

Draft review routes should summarize the draft after the match.

The review can use saved recommendations, draft state, match result, and notes.

## AI Explanation Routes

Suggested routes:

```txt id="3l1hb6"
POST /api/ai/explanations
GET /api/ai/explanations/:aiExplanationId
POST /api/drafts/:draftSessionId/recommendations/:recommendationId/explanation
```

AI explanation routes should generate or load explanation text.

AI should not decide recommendations.

AI should only explain recommendation results.

## Standard Success Response

Wise Rift should use a consistent success response shape.

Example:

```json id="m5q1xz"
{
  "success": true,
  "message": "Draft session created successfully",
  "data": {
    "draftSessionId": "draft_001"
  }
}
```

Recommended shape:

```txt id="9nurhj"
success
message
data
meta
```

Use `meta` only when needed.

## Standard Error Response

Wise Rift should use a consistent error response shape.

Example:

```json id="v74qg4"
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

Recommended shape:

```txt id="9aw3mg"
success
message
errors
```

Errors should be clear and safe.

Do not expose sensitive internal details.

## Pagination Response

List routes should support pagination when needed.

Example:

```json id="4t0tpa"
{
  "success": true,
  "message": "Draft history loaded successfully",
  "data": [],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 45,
    "totalPages": 3
  }
}
```

Pagination should be used for:

- draft history
- recommendation history
- champion list if needed
- item list if needed

## Validation Rules

The backend API should validate request data before writing to the database.

Validation should cover:

- required fields
- valid enum values
- valid champion IDs
- valid item IDs
- valid draft session ID
- user ownership
- patch existence
- duplicate picks
- duplicate bans
- banned champion cannot be picked
- team size limits
- enemy team size limits

Example rule:

```txt id="yvtvon"
A champion cannot be picked if that champion is already banned in the same draft session.
```

## Authorization Rules

User-owned records should be protected.

A user should only access their own:

- champion pool
- draft sessions
- bans
- picks
- recommendations
- match results
- draft reviews
- AI explanations

Patch data, champion data, and item data can be read-only public data inside the app.

## Backend Orchestration Rules

The backend API should coordinate multi-step actions.

Example recommendation recalculation:

```txt id="3f2pnv"
POST /api/drafts/:draftSessionId/recommendations/recalculate
```

Backend steps:

```txt id="yn9nwa"
Validate user access
Load draft session
Load active patch for the draft
Load champion pool
Load team and enemy picks
Load bans
Load relevant game data
Build scoring request
Call Python recommendation service
Validate scoring response
Save recommendation result
Return result to frontend
```

This logic should not live in the frontend.

## Internal Service Routes

The Python recommendation service can have internal routes.

Example:

```txt id="2hwbnn"
POST /recommendations/bans
POST /recommendations/picks
POST /recommendations/team-composition
POST /recommendations/items
POST /recommendations/draft-review
GET /health
```

These routes are internal to the system.

The frontend should not call them.

## API Versioning Direction

The MVP can start without a URL version if the API is private and early.

Future production versions can use:

```txt id="5sa8l8"
/api/v1
```

Suggested future route shape:

```txt id="k1s5yr"
/api/v1/drafts
/api/v1/champion-pool
/api/v1/patches
```

Versioning can be added before public release if needed.

## REST Naming Rules

Routes should use nouns for resources.

Use plural names for collections.

Good:

```txt id="qc5fny"
/api/drafts
/api/champions
/api/items
/api/patches
```

Avoid action-heavy route names unless the action is not a simple resource operation.

Acceptable action route:

```txt id="xu06r2"
/api/drafts/:draftSessionId/recommendations/recalculate
```

This is acceptable because recalculation is a command.

## HTTP Status Code Direction

Suggested status codes:

```txt id="hzco7k"
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
500 Internal Server Error
503 Service Unavailable
```

Examples:

```txt id="m4bps0"
201 Created → draft session created
400 Bad Request → invalid request body
401 Unauthorized → user is not logged in
403 Forbidden → user does not own the draft
404 Not Found → draft session not found
409 Conflict → champion already picked or banned
503 Service Unavailable → recommendation service is down
```

## OpenAPI Direction

The backend can later generate an OpenAPI document.

This would help:

- document routes
- test endpoints
- share API contracts
- support frontend development
- support portfolio demo

OpenAPI is useful, but it does not need to block early MVP work.

## Relationship With Shared Types

REST API response shapes should align with shared TypeScript types.

Example shared type:

```ts id="w3e5re"
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: ApiError[];
  meta?: PaginationMeta;
};
```

The backend can return this shape.

The web and mobile apps can use it.

This reduces contract mismatch.

## Relationship With PostgreSQL and Prisma

The backend API should access PostgreSQL through Prisma.

The frontend should not access Prisma.

The Python recommendation service should not access Prisma during the MVP.

Flow:

```txt id="82hnn0"
Frontend
→ REST API
→ Prisma
→ PostgreSQL
```

## Relationship With Recommendation Service

The backend API should call the Python recommendation service.

Flow:

```txt id="5gmnj5"
Frontend
→ REST API
→ Python recommendation service
→ REST API
→ Frontend
```

The backend should store the result in PostgreSQL.

## Relationship With AI Explanation Layer

The backend API should call the AI provider.

Flow:

```txt id="rrbw6o"
Frontend
→ REST API
→ AI provider
→ REST API
→ Frontend
```

The backend should validate and store explanation output.

## Consequences

### Positive Consequences

REST API first gives Wise Rift a clear system boundary.

The web and mobile apps can share the same backend.

The backend can protect the database, recommendation service, and AI provider.

API routes are easy to test.

The product workflow maps clearly to resource routes.

The project is easier to explain in a portfolio case study.

### Negative Consequences

REST can require more route planning.

Some live draft interactions may need many requests.

The backend must handle orchestration carefully.

Response shapes must stay consistent.

REST may feel less flexible than GraphQL for complex nested data.

### Risks

The main risks are:

- route structure becomes inconsistent
- response shape changes without updating clients
- frontend duplicates backend logic
- backend routes become too large
- recommendation recalculation becomes slow
- mobile and web clients drift apart
- internal service routes become exposed by mistake

## Risk Mitigation

Wise Rift should reduce these risks by using:

- clear API design docs
- shared response types
- consistent response shape
- backend validation
- route-level authorization
- service-only internal routes
- API tests
- request and response examples
- clear frontend API client functions

The frontend should use small API client modules instead of calling `fetch` everywhere.

Example:

```txt id="b54q4d"
draftApi.createDraftSession()
draftApi.addPick()
recommendationApi.recalculate()
championPoolApi.updateEntry()
```

## Alternatives Considered

### Alternative 1: Frontend calls database directly

Rejected.

This would make security, validation, and ownership rules harder.

The backend should protect the database.

### Alternative 2: Frontend calls Python recommendation service directly

Rejected.

The recommendation service is internal.

The backend should prepare data, call the service, store the result, and return a clean response.

### Alternative 3: Frontend calls AI provider directly

Rejected.

This would expose API keys and make cost control harder.

The backend should control AI calls.

### Alternative 4: GraphQL first

Rejected for MVP.

GraphQL can be useful for complex clients, but it adds extra setup and schema design work.

REST is simpler for the first version.

### Alternative 5: tRPC first

Rejected for MVP architecture.

tRPC works well in TypeScript-only apps, but Wise Rift also has a Python recommendation service and React Native mobile app direction.

REST gives clearer service boundaries.

## Future Migration Path

REST API first is the right choice for MVP.

Future improvements may include:

```txt id="hdby5c"
REST API
→ OpenAPI docs
→ generated API client
→ API versioning
→ stronger contract tests
→ selective real-time updates
```

If live draft updates need more real-time behavior, Wise Rift can later add:

- WebSocket events
- Server-Sent Events
- polling
- background recalculation jobs

REST can still remain the main API style.

## Final Decision

Wise Rift will use a REST API first architecture.

The web app and iOS app will call the NestJS backend API.

The backend API will own orchestration, validation, authorization, persistence, recommendation service calls, and AI explanation calls.

The frontend will not call PostgreSQL, Prisma, the Python recommendation service, or the AI provider directly.

This keeps Wise Rift clear, secure, testable, and realistic for the MVP.

## Related Documents

```txt id="71npog"
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
```
