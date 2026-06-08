# ADR: Python Recommendation Service

## Status

Accepted

## Date

2026-06-08

## Context

Wise Rift needs a recommendation engine for Wild Rift draft decisions.

The recommendation system needs to support:

- ban recommendation
- pick recommendation
- team composition analysis
- item build suggestion
- matchup risk notes
- confidence levels
- reason codes
- score breakdowns

Wise Rift also needs the scoring system to be:

- deterministic
- testable
- patch-aware
- easy to debug
- separate from AI explanation
- separate from frontend display logic

The core rule is:

```txt
Scoring engine decides.
AI explains.
User reviews.
```

The backend API handles product workflow and persistence.

The recommendation system handles scoring.

These two responsibilities are related, but they are not the same.

Because of this, Wise Rift needs to decide where the scoring logic should live.

## Decision

Wise Rift will use a separate Python recommendation service for MVP scoring logic.

The service will be built with:

```txt
Python
FastAPI
Pydantic
Pytest
```

The service will calculate:

- ban scores
- pick scores
- team composition scores
- item build scores
- confidence levels
- reason codes
- score breakdowns

The NestJS backend API will call the Python recommendation service when recommendations need to be calculated.

The frontend will not calculate recommendation scores.

The AI layer will not calculate recommendation scores.

## Main Rule

Wise Rift will follow this rule:

```txt
Backend owns workflow.
Recommendation service owns scoring.
Frontend owns display.
AI owns explanation.
```

Each layer should have a clear responsibility.

## Why Use a Separate Python Service

### 1. Scoring logic deserves its own boundary

Recommendation scoring is one of the most important parts of Wise Rift.

It should not be mixed with route handlers, database queries, UI code, or AI prompt logic.

A separate service makes the scoring system easier to isolate.

For example:

```txt
NestJS API:
- create draft session
- save picks and bans
- load patch data
- save recommendation result

Python recommendation service:
- calculate ban score
- calculate pick score
- calculate team composition score
- calculate item score
- return reason codes
```

This keeps the project easier to understand.

### 2. Python is good for scoring and future analysis

The MVP uses rule-based scoring first.

Later, Wise Rift may add:

- data analysis
- score tuning
- match history signals
- user feedback scoring
- statistical experiments
- hybrid recommendation logic
- machine learning experiments

Python is a strong fit for this direction.

The MVP does not need machine learning, but Python gives the project room to grow.

### 3. The backend API stays focused

The NestJS backend API should focus on product workflow.

It should handle:

- authentication
- authorization
- user data
- champion pool
- draft sessions
- draft picks
- draft bans
- match results
- draft reviews
- recommendation storage
- AI explanation requests
- database access

If all scoring logic is placed inside the API app, the API can become too large too early.

A separate service keeps scoring logic clean.

### 4. Frontend should not own scoring

The web app and iOS app should not calculate recommendation scores.

If scoring logic lives in the frontend, there are problems:

- web and mobile may calculate different results
- users may see inconsistent recommendations
- scoring logic becomes harder to protect
- scoring logic becomes harder to test in one place
- frontend code becomes too complex

The frontend should only display the result.

### 5. AI should not own scoring

AI can explain scoring results.

AI should not decide the result.

The Python service gives Wise Rift a trusted scoring layer before AI explanation happens.

The AI layer receives structured results from the scoring engine.

It does not create the recommendation.

### 6. Testing is easier

A Python service can have focused scoring tests.

Example tests:

```txt
test_ban_scoring.py
test_pick_scoring.py
test_team_comp_scoring.py
test_item_scoring.py
test_confidence.py
test_reason_codes.py
```

Each test can pass a fixed draft state and expect a fixed output.

This supports the key rule:

```txt
Same input should return the same output.
```

## Service Responsibilities

The Python recommendation service should own:

- scoring formulas
- scoring weights
- scoring categories
- confidence calculation
- reason code generation
- recommendation ranking
- score breakdown generation
- missing data behavior
- patch-aware scoring behavior
- scoring tests

The service should not own:

- user accounts
- login
- sessions
- draft history storage
- database writes
- AI provider calls
- frontend UI state
- payment or subscription logic

## Backend API Responsibilities

The NestJS backend API should own:

- authentication
- authorization
- draft session lifecycle
- champion pool storage
- draft pick storage
- draft ban storage
- patch data loading
- recommendation request orchestration
- recommendation result storage
- AI explanation request control
- API response formatting

The backend API should act as the bridge between clients and the recommendation service.

## Frontend Responsibilities

The web app and mobile app should own:

- draft board UI
- champion selection UI
- ban recommendation display
- pick recommendation display
- team composition display
- item build display
- draft review display
- user actions

The frontend should not contain duplicate scoring formulas.

The frontend can show:

- final score
- confidence
- rank
- reason codes
- score breakdown
- AI explanation

## AI Layer Responsibilities

The AI layer should own:

- plain-language explanation
- recommendation summaries
- risk explanation
- draft review summaries
- beginner-friendly wording

The AI layer should not own:

- final recommendation choice
- scoring formulas
- champion data
- item data
- patch data
- matchup facts

## Service Input

The Python service should receive structured JSON input from the backend API.

Example pick recommendation input:

```json
{
  "requestType": "PICK_RECOMMENDATION",
  "activePatch": {
    "patchId": "wild-rift-6.1",
    "version": "6.1"
  },
  "draftState": {
    "draftSessionId": "draft_001",
    "role": "MID",
    "teamPicks": ["vi", "malphite"],
    "enemyPicks": ["jinx", "milio"],
    "bannedChampions": ["yasuo", "zed"],
    "intendedChampion": "ahri"
  },
  "championPool": [
    {
      "championId": "ahri",
      "comfortLevel": 5
    },
    {
      "championId": "akali",
      "comfortLevel": 4
    }
  ],
  "gameData": {
    "champions": [],
    "items": [],
    "matchups": [],
    "scoringRules": []
  }
}
```

The backend should prepare this input.

The recommendation service should not need to query user data directly in the MVP.

## Service Output

The Python service should return structured scoring results.

Example output:

```json
{
  "requestType": "PICK_RECOMMENDATION",
  "draftSessionId": "draft_001",
  "recommendations": [
    {
      "rank": 1,
      "targetType": "CHAMPION",
      "targetId": "ahri",
      "displayName": "Ahri",
      "finalScore": 84,
      "confidence": "HIGH",
      "scoreBreakdown": {
        "championPoolComfortScore": 18,
        "matchupScore": 20,
        "teamSynergyScore": 16,
        "teamCompositionFitScore": 18,
        "patchStrengthScore": 12,
        "counterRiskPenalty": -4
      },
      "reasonCodes": [
        "HIGH_COMFORT_PICK",
        "GOOD_MATCHUP",
        "ADDS_MAGIC_DAMAGE",
        "GOOD_PICK_POTENTIAL",
        "COUNTER_PICK_RISK"
      ],
      "riskNotes": ["Enemy team still has room to counter pick mid lane."]
    }
  ]
}
```

The backend can store this result and return it to the frontend.

## Main API Contract

The backend API should call the recommendation service through HTTP.

Suggested internal routes:

```txt
POST /recommendations/bans
POST /recommendations/picks
POST /recommendations/team-composition
POST /recommendations/items
POST /recommendations/draft-review
```

These routes are internal service routes.

They are not meant to be called directly by the frontend.

## Backend-to-Service Flow

Suggested flow for live pick recommendation:

```txt
User updates draft pick
→ Frontend sends update to NestJS API
→ NestJS API validates and saves draft pick
→ NestJS API loads current draft state
→ NestJS API loads patch data
→ NestJS API builds recommendation input
→ NestJS API calls Python recommendation service
→ Python service calculates scores
→ Python service returns structured results
→ NestJS API stores recommendation result
→ Frontend receives updated recommendation
```

## Suggested Folder Structure

Suggested Python service structure:

```txt
apps/recommendation-service/
  app/
    main.py

    api/
      routes.py
      health.py
      recommendations.py

    schemas/
      draft.py
      champion.py
      item.py
      game_data.py
      recommendation.py
      scoring.py

    scoring/
      ban_scoring.py
      pick_scoring.py
      team_comp_scoring.py
      item_scoring.py
      confidence.py
      reason_codes.py
      weights.py

    services/
      recommendation_service.py

    utils/
      normalization.py
      validation.py

  tests/
    test_health.py
    test_ban_scoring.py
    test_pick_scoring.py
    test_team_comp_scoring.py
    test_item_scoring.py
    test_confidence.py
    test_reason_codes.py

  pyproject.toml
  README.md
```

## Health Check

The service should include a simple health route.

Example:

```txt
GET /health
```

Example response:

```json
{
  "success": true,
  "message": "Recommendation service is running"
}
```

This helps local development and deployment checks.

## Scoring Modules

### Ban Scoring

File:

```txt
app/scoring/ban_scoring.py
```

Responsible for:

- ban candidate ranking
- matchup threat score
- intended champion counter score
- role threat score
- patch strength score
- user discomfort score
- reason codes

### Pick Scoring

File:

```txt
app/scoring/pick_scoring.py
```

Responsible for:

- pick candidate ranking
- champion pool comfort score
- matchup score
- team synergy score
- team composition fit score
- patch strength score
- counter risk penalty
- reason codes

### Team Composition Scoring

File:

```txt
app/scoring/team_comp_scoring.py
```

Responsible for:

- damage balance score
- crowd control score
- engage score
- frontline score
- scaling score
- teamfight score
- missing needs
- risk notes

### Item Scoring

File:

```txt
app/scoring/item_scoring.py
```

Responsible for:

- item ranking
- core item suggestions
- situational item suggestions
- anti-heal item suggestions
- anti-shield item suggestions
- armor item suggestions
- magic resistance item suggestions
- reason codes

### Confidence Calculation

File:

```txt
app/scoring/confidence.py
```

Responsible for:

- HIGH confidence
- MEDIUM confidence
- LOW confidence
- missing data penalties
- data quality checks

### Reason Codes

File:

```txt
app/scoring/reason_codes.py
```

Responsible for shared reason code constants.

Example:

```txt
GOOD_MATCHUP
HIGH_COMFORT_PICK
ADDS_MAGIC_DAMAGE
LACKS_FRONTLINE
COUNTERS_HEALING
COUNTER_PICK_RISK
```

## Pydantic Schema Direction

The service should use Pydantic schemas for request and response validation.

Example schema direction:

```python
from pydantic import BaseModel
from typing import Literal

class DraftState(BaseModel):
    draftSessionId: str
    role: Literal["TOP", "JUNGLE", "MID", "ADC", "SUPPORT"]
    teamPicks: list[str]
    enemyPicks: list[str]
    bannedChampions: list[str]
    intendedChampion: str | None = None

class RecommendationResult(BaseModel):
    rank: int
    targetType: Literal["CHAMPION", "ITEM", "TEAM_COMP"]
    targetId: str
    displayName: str
    finalScore: float
    confidence: Literal["HIGH", "MEDIUM", "LOW"]
    scoreBreakdown: dict[str, float]
    reasonCodes: list[str]
    riskNotes: list[str]
```

Pydantic helps catch bad input before scoring runs.

## Data Access Direction

For the MVP, the Python service should not connect directly to PostgreSQL.

The backend API should load data and send the needed input to the recommendation service.

This keeps data ownership simpler.

MVP direction:

```txt
Backend API loads data.
Recommendation service scores data.
Backend API stores result.
```

Future versions can revisit this if needed.

## Error Handling

The recommendation service should return clear errors.

Example error response:

```json
{
  "success": false,
  "message": "Invalid recommendation request",
  "errors": [
    {
      "field": "draftState.role",
      "message": "Role must be one of TOP, JUNGLE, MID, ADC, SUPPORT"
    }
  ]
}
```

The backend API should handle service errors safely.

If the recommendation service fails, the backend can return a friendly error to the frontend.

## Fallback Behavior

If the recommendation service is unavailable, Wise Rift should not pretend that a recommendation exists.

The backend should return a clear message.

Example:

```json
{
  "success": false,
  "message": "Recommendation service is unavailable. Please try again later."
}
```

For draft history, previously stored recommendations can still be shown.

## Testing Strategy

The Python service should have focused unit tests.

Tests should cover:

- health route
- input schema validation
- ban scoring
- pick scoring
- team composition scoring
- item scoring
- confidence calculation
- reason code generation
- banned champion exclusion
- champion pool filtering
- missing data behavior
- patch-aware scoring
- same input returns same output

Example test case:

```txt
Given Akali is banned
When pick recommendations are calculated
Then Akali should not appear in valid pick results
```

Example test case:

```txt
Given enemy team has high healing
When item recommendations are calculated
Then anti-heal items should receive higher score
```

## Local Development Direction

The recommendation service should be runnable by itself.

Example commands:

```bash
cd apps/recommendation-service
uvicorn app.main:app --reload --port 8001
```

Possible monorepo command later:

```bash
npm run dev:recommendation
```

The backend API should read the service URL from environment variables.

Example:

```txt
RECOMMENDATION_SERVICE_URL=http://localhost:8001
```

## Deployment Direction

The recommendation service can deploy separately from the backend API.

Suggested deployment direction:

```txt
apps/api → backend service host
apps/recommendation-service → separate Python service host
```

Possible hosting options:

```txt
Render
Railway
Fly.io
Koyeb
```

The exact provider can be decided later.

## Performance Direction

The MVP recommendation service does not need heavy optimization.

The first goal is correctness and clarity.

Still, the service should avoid slow behavior.

Basic rules:

- keep request payloads reasonable
- avoid repeated expensive loops
- cache stable data later if needed
- return only needed fields
- keep scoring deterministic

If performance becomes a problem later, the service can add caching or precomputed scoring data.

## Security Direction

The recommendation service should not be public-facing if possible.

The frontend should not call it directly.

The backend API should call it internally.

Security rules:

```txt
Frontend → Backend API only
Backend API → Recommendation service
Recommendation service → Backend API response
```

The service should not expose sensitive user data.

It should only receive the data needed to calculate recommendations.

## Consequences

### Positive Consequences

The scoring logic stays isolated.

The backend API stays cleaner.

The frontend stays simpler.

The AI layer stays separate from decision-making.

The scoring system becomes easier to test.

Python gives the project a good path for future data analysis.

The service boundary makes the architecture look more realistic.

### Negative Consequences

A separate service adds complexity.

Local development needs one more process.

Deployment needs one more service.

The backend must handle service failures.

Data contracts between NestJS and Python must stay aligned.

Debugging may involve more than one app.

### Risks

The main risks are:

- service contract mismatch
- duplicated types between TypeScript and Python
- slower local setup
- extra deployment cost
- HTTP latency between API and recommendation service
- scoring input becoming too large
- service boundary being too much for early MVP

## Risk Mitigation

Wise Rift should reduce these risks by using:

- simple service routes
- clear request and response schemas
- shared API docs
- small MVP scoring scope
- focused tests
- backend fallback behavior
- environment-based service URL
- clear local setup commands
- no direct database access from Python service in MVP

The service should start small.

It should not become over-engineered before the first recommendation flow works.

## Alternatives Considered

### Alternative 1: Put scoring inside the frontend

Rejected.

The frontend should not own scoring logic.

This would create duplicate logic between web and mobile.

It would also make recommendations easier to manipulate and harder to test in one trusted place.

### Alternative 2: Put scoring directly inside NestJS API

Partially rejected for long-term architecture.

This would be simpler at the very beginning.

However, scoring may become large and specialized.

Keeping it separate makes the system cleaner and gives more room for future analysis.

If MVP setup becomes too slow, a temporary NestJS scoring module could be used first, but the target architecture remains a Python recommendation service.

### Alternative 3: Let AI decide recommendations

Rejected.

AI can invent facts and may return inconsistent results.

AI should explain scoring results only.

### Alternative 4: Use machine learning service from the start

Rejected.

Wise Rift does not have enough clean data for machine learning at the MVP stage.

Rule-based scoring is more realistic and easier to test first.

## Future Migration Path

The Python recommendation service can evolve over time.

Possible path:

```txt
Basic rule-based scoring
→ weighted rule tuning
→ user feedback scoring
→ stored scoring experiments
→ match history signals
→ statistical signals
→ hybrid recommendation engine
→ machine learning experiments
```

Future features may include:

- score weight dashboard
- scoring experiment logs
- recommendation feedback tracking
- personalized comfort scoring
- matchup performance analysis
- patch-to-patch score comparison
- draft simulation tools

These can be added later without changing the main frontend and backend architecture too much.

## Final Decision

Wise Rift will use a separate Python recommendation service for MVP scoring logic.

The service will calculate ban recommendations, pick recommendations, team composition analysis, item build suggestions, confidence levels, reason codes, and score breakdowns.

The NestJS backend API will own workflow and persistence.

The frontend will display the results.

The AI layer will explain the results.

This keeps the system clean, testable, and easier to expand later.

## Related Documents

```txt
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
```
