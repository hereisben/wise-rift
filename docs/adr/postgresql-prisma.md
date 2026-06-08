# ADR: PostgreSQL and Prisma

## Status

Accepted

## Date

2026-06-08

## Context

Wise Rift needs a database for product data, draft data, recommendation data, and patch-versioned game data.

The app needs to store:

- users
- champion pools
- draft sessions
- draft bans
- draft picks
- recommendation results
- item build suggestions
- matchup notes
- match results
- draft reviews
- AI explanations
- patches
- champion data
- champion patch stats
- champion skills
- item data
- item patch stats
- rune data
- summoner spell data
- scoring tags

Wise Rift also needs clear relationships between these records.

For example:

```txt id="t0jm6h"
User
→ Champion Pool
→ Draft Session
→ Draft Bans
→ Draft Picks
→ Recommendation Results
→ Match Result
→ Draft Review
```

Patch data also needs relationships:

```txt id="1oeruq"
Patch
→ Champion Data
→ Champion Patch Stats
→ Champion Skills
→ Item Data
→ Item Patch Stats
```

The system needs a database that can support structured relationships, stable queries, data integrity, and future growth.

Wise Rift also needs an ORM that works well with the NestJS backend API.

## Decision

Wise Rift will use PostgreSQL as the main relational database.

Wise Rift will use Prisma as the ORM for the NestJS backend API.

PostgreSQL will store the runtime application data.

Prisma will define the database schema, generate the TypeScript client, and manage database migrations.

Manual patch data will start as JSON files, then be validated and seeded into PostgreSQL.

## Main Rule

Wise Rift will follow this rule:

```txt id="4pdj94"
PostgreSQL stores app data.
Prisma manages database access.
Manual JSON files seed patch data.
```

The backend API should access PostgreSQL through Prisma.

The frontend should not access the database directly.

The Python recommendation service should not access the database directly during the MVP.

## Why PostgreSQL Is Used

### 1. Wise Rift has relational data

Wise Rift data has many relationships.

For example:

- one user can have many draft sessions
- one user can have many champion pool entries
- one draft session can have many bans
- one draft session can have many picks
- one draft session can have many recommendation results
- one draft session can have one match result
- one draft session can have one draft review
- one patch can have many champion patch stats
- one champion can have many skills
- one item can have many patch stats

PostgreSQL is a strong fit because it handles relational data well.

### 2. Draft sessions need stable history

Wise Rift should save draft history.

Old draft sessions should remain tied to the patch that was active when they were created.

Important rule:

```txt id="bp2u15"
DraftSession.patchId should not change after creation.
```

PostgreSQL can enforce relationships between draft sessions and patches.

This helps old draft reviews stay accurate.

### 3. Recommendations need structured storage

Wise Rift should store recommendation results.

A recommendation result may include:

- recommendation type
- target champion or item
- final score
- confidence level
- score breakdown
- reason codes
- risk notes
- created time

This data should be queryable later.

For example, the app may later show:

- draft history
- most recommended champions
- accepted recommendations
- ignored recommendations
- win/loss after recommendation
- draft review summaries

PostgreSQL supports these future needs better than plain files.

### 4. Patch data needs versioning

Wise Rift uses patch-versioned game data.

For example:

```txt id="cbcnl8"
Patch 6.1
→ Ahri stats for patch 6.1
→ Ahri skills for patch 6.1
→ Item stats for patch 6.1

Patch 6.2
→ Ahri stats for patch 6.2
→ Ahri skills for patch 6.2
→ Item stats for patch 6.2
```

PostgreSQL can store this data with clear patch relationships.

This supports patch-aware scoring.

### 5. PostgreSQL is common in real full-stack apps

Using PostgreSQL helps Wise Rift feel like a realistic software engineering project.

It is a strong choice for a portfolio project because it shows:

- relational schema design
- migrations
- indexes
- constraints
- seed data
- query planning
- backend integration
- production database direction

## Why Prisma Is Used

### 1. Prisma works well with TypeScript

Wise Rift uses a TypeScript backend API.

Prisma generates a typed database client.

This helps catch mistakes during development.

For example, if a field name changes in the schema, TypeScript can help catch broken code.

### 2. Prisma makes database access clearer

Prisma gives clean query syntax for common backend operations.

Example:

```ts id="b11w00"
const draftSession = await prisma.draftSession.findUnique({
  where: {
    id: draftSessionId,
  },
  include: {
    bans: true,
    picks: true,
    recommendations: true,
  },
});
```

This is easier to read than writing raw SQL for every query during the MVP.

### 3. Prisma supports migrations

Wise Rift data models will change during development.

Prisma migrations help track schema changes.

Example:

```bash id="askge2"
npx prisma migrate dev --name init
```

This gives the project a clear database history.

### 4. Prisma helps with schema documentation

The Prisma schema becomes a central place to describe the database model.

It can show:

- tables
- fields
- enums
- relationships
- unique constraints
- indexes
- default values

This helps keep the backend aligned with the architecture docs.

### 5. Prisma is good for MVP speed

Prisma helps move faster during the MVP.

It reduces boilerplate and keeps common database work simple.

The project can still use raw SQL later for advanced queries if needed.

## What PostgreSQL Owns

PostgreSQL should own runtime application data.

### User Data

PostgreSQL stores:

```txt id="m5x1zp"
User
Account settings
Auth-related user records
```

### Champion Pool Data

PostgreSQL stores:

```txt id="pywvhy"
ChampionPoolEntry
User champion comfort level
Preferred role
Favorite champions
```

### Draft Data

PostgreSQL stores:

```txt id="zmnqkz"
DraftSession
DraftBan
DraftPick
DraftState
```

### Recommendation Data

PostgreSQL stores:

```txt id="kpxkrv"
RecommendationResult
RecommendationScoreBreakdown
RecommendationReasonCode
ItemBuildSuggestion
TeamCompositionAnalysis
```

### Match and Review Data

PostgreSQL stores:

```txt id="mzchzz"
MatchResult
DraftReview
MatchupNote
```

### AI Explanation Data

PostgreSQL stores:

```txt id="yj1pvx"
AIExplanation
AIExplanationInputSnapshot
AIExplanationType
```

### Patch and Game Data

PostgreSQL stores seeded patch data:

```txt id="uxx6kh"
Patch
Champion
ChampionPatchStat
ChampionSkill
ChampionSkillEffect
Item
ItemPatchStat
Rune
RunePatchStat
SummonerSpell
SummonerSpellPatchStat
ScoringTag
MatchupTag
SynergyTag
```

## What PostgreSQL Does Not Own

PostgreSQL should not own everything.

### Scoring Logic

Scoring logic belongs to the Python recommendation service.

PostgreSQL stores scoring inputs and outputs.

It should not contain the main scoring formulas.

### AI Decision-Making

AI does not own decisions.

PostgreSQL can store AI explanations, but AI does not become the data source.

### Frontend UI State

Short-lived frontend UI state should stay in the frontend.

For example:

- open modal state
- selected tab
- local form field state
- temporary filter state

### Raw Source Patch Files

Manual JSON files are still useful as seed source files.

PostgreSQL stores the seeded runtime version.

The repo keeps the source JSON files for review and version control.

## Patch Data Direction

Wise Rift uses manually maintained patch data for the MVP.

Suggested flow:

```txt id="eu8duw"
Manual JSON files
→ validation script
→ seed script
→ PostgreSQL
→ Backend API
→ Recommendation service
→ Web and iOS clients
```

The JSON files should live in the repo.

Example:

```txt id="tpoclo"
data/patches/6.1/patch.json
data/patches/6.1/champions.json
data/patches/6.1/champion-skills.json
data/patches/6.1/items.json
data/patches/6.1/runes.json
data/patches/6.1/summoner-spells.json
```

PostgreSQL should store the validated and seeded version.

## Prisma Schema Direction

The first Prisma schema should focus on MVP entities.

Suggested first priority:

```txt id="2z0u3q"
User
Patch
Champion
ChampionPatchStat
ChampionSkill
Item
ItemPatchStat
ChampionPoolEntry
DraftSession
DraftBan
DraftPick
RecommendationResult
MatchResult
DraftReview
AIExplanation
```

Second priority:

```txt id="s2xfmu"
Rune
RunePatchStat
SummonerSpell
SummonerSpellPatchStat
ChampionBuildProfile
MatchupNote
TeamCompositionAnalysis
ItemBuildSuggestion
```

The schema should grow only when needed.

## Example Model Direction

Example draft session model direction:

```prisma id="bv1joa"
model DraftSession {
  id        String   @id @default(cuid())
  userId    String
  patchId   String
  role      Role
  status    DraftSessionStatus
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User     @relation(fields: [userId], references: [id])
  patch     Patch    @relation(fields: [patchId], references: [id])

  bans      DraftBan[]
  picks     DraftPick[]
  recommendations RecommendationResult[]
  matchResult MatchResult?
  draftReview DraftReview?

  @@index([userId])
  @@index([patchId])
}
```

Example recommendation result direction:

```prisma id="vwjjdd"
model RecommendationResult {
  id             String   @id @default(cuid())
  draftSessionId String
  type           RecommendationType
  targetType     RecommendationTargetType
  targetId       String
  finalScore     Float
  confidence     ConfidenceLevel
  scoreBreakdown Json
  reasonCodes    String[]
  riskNotes      String[]
  createdAt      DateTime @default(now())

  draftSession   DraftSession @relation(fields: [draftSessionId], references: [id])

  @@index([draftSessionId])
  @@index([type])
}
```

Example patch model direction:

```prisma id="snmkw8"
model Patch {
  id          String   @id
  version     String   @unique
  displayName String
  isActive    Boolean  @default(false)
  releaseDate DateTime?
  createdAt   DateTime @default(now())

  draftSessions DraftSession[]
  championStats ChampionPatchStat[]
  itemStats     ItemPatchStat[]
}
```

## JSON Fields

Some fields can use PostgreSQL JSON through Prisma `Json`.

Good examples:

- scoreBreakdown
- AI input snapshot
- champion skill effect details
- item passive details
- draft review summary sections
- flexible metadata

JSON fields should not replace core relational fields.

Use relational fields for important queryable data.

Use JSON fields for flexible structured details.

## Enum Direction

Prisma enums should be used for stable values.

Suggested enums:

```txt id="txw50y"
Role
DraftSessionStatus
DraftSide
PickTurnType
RecommendationType
RecommendationTargetType
ConfidenceLevel
DamageType
RangeType
DataQualityLevel
MatchResultOutcome
```

Enums help keep data valid and consistent.

## Index Direction

Indexes should be added where query patterns are clear.

Suggested indexes:

```txt id="14j7nb"
User.id
DraftSession.userId
DraftSession.patchId
DraftSession.createdAt
DraftBan.draftSessionId
DraftPick.draftSessionId
RecommendationResult.draftSessionId
RecommendationResult.type
Champion.slug
Item.slug
ChampionPatchStat.patchId
ChampionPatchStat.championId
ItemPatchStat.patchId
ItemPatchStat.itemId
```

Do not add too many indexes too early.

Start with useful MVP queries.

## Relationship With NestJS API

The NestJS API should be the only app that writes to PostgreSQL during the MVP.

The API should use Prisma to:

- create users
- update champion pools
- create draft sessions
- save bans
- save picks
- save recommendations
- save match results
- save draft reviews
- save AI explanations
- read patch data
- read champion data
- read item data

The API should expose clean REST routes to the frontend.

The frontend should never query PostgreSQL directly.

## Relationship With Python Recommendation Service

The Python recommendation service should not connect directly to PostgreSQL during the MVP.

The flow should be:

```txt id="zbd8q9"
NestJS API loads data from PostgreSQL
→ NestJS API builds scoring request
→ Python service calculates recommendation
→ Python service returns scoring result
→ NestJS API stores result in PostgreSQL
```

This keeps ownership simple.

PostgreSQL is accessed by the backend API.

The Python service receives only the data it needs.

## Relationship With AI Explanation Layer

AI explanations should be generated through the backend API.

The backend API should:

- load recommendation result
- build structured AI input
- call AI provider
- validate AI output
- store AI explanation in PostgreSQL
- return explanation to frontend

PostgreSQL stores the AI explanation result.

AI does not write to the database directly.

## Migration Direction

Prisma migrations should be used for schema changes.

Common workflow:

```bash id="acnk5e"
npx prisma format
npx prisma migrate dev --name init
npx prisma generate
```

For production later:

```bash id="ujzc72"
npx prisma migrate deploy
```

The project should avoid editing old migrations after they are shared.

During early solo MVP work, small adjustments are okay, but final history should stay clean before public release.

## Seed Direction

The project should have seed scripts for initial data.

Seed data can include:

- initial patch
- starter champion data
- starter champion skills
- starter item data
- starter item stats
- starter rune data
- starter summoner spell data
- scoring tags
- matchup tags

Seed flow:

```txt id="10h8fo"
Read JSON files
→ validate data
→ upsert records with Prisma
→ confirm active patch
```

Suggested command later:

```bash id="rv7hlk"
npm run db:seed
```

## Validation Direction

Patch data should be validated before seeding.

Validation should check:

- required fields
- unique IDs
- valid patch ID
- valid champion IDs
- valid item IDs
- valid enum values
- valid number fields
- valid data quality level
- valid tag values
- references point to existing records

The database should also enforce important constraints.

## Backup and Safety Direction

Production data should be backed up later.

For MVP local development, this is not urgent.

Future production direction:

- managed PostgreSQL
- automatic backups
- migration checks
- seed script protection
- no destructive reset in production
- environment-based database URL

## Environment Variables

The backend API should read the database URL from environment variables.

Example:

```txt id="5r7cu1"
DATABASE_URL="postgresql://user:password@localhost:5432/wise_rift"
```

The repo should include `.env.example`.

The real `.env` file should not be committed.

## Consequences

### Positive Consequences

PostgreSQL supports relational data well.

Prisma gives a typed database client.

The backend can move faster during MVP development.

Schema changes can be tracked with migrations.

Patch data can be seeded into a real database.

Draft history and recommendation history can be stored cleanly.

The project looks more realistic as a full-stack portfolio project.

### Negative Consequences

PostgreSQL requires setup.

Prisma adds another tool to learn.

Migrations can become messy if not managed well.

Some advanced PostgreSQL features may need raw SQL.

JSON fields can become messy if overused.

The schema can become too large if the MVP grows too fast.

### Risks

The main risks are:

- over-modeling too early
- too many tables before MVP needs them
- bad migration history
- unclear ownership between JSON seed files and database records
- duplicated game data fields
- using JSON fields for data that should be relational
- Python service needing data that the API does not send
- schema drift between docs and Prisma schema

## Risk Mitigation

Wise Rift should reduce these risks by using:

- MVP-first schema design
- small initial champion and item dataset
- clear Prisma migration names
- seed scripts
- validation scripts
- indexes only where needed
- relational fields for core data
- JSON fields only for flexible details
- docs updated when schema changes
- backend-only database access during MVP

The database schema should grow in steps.

Do not model every future feature before the MVP works.

## Alternatives Considered

### Alternative 1: Use MongoDB

Rejected for MVP.

MongoDB can store flexible documents, but Wise Rift has many relational entities.

Draft sessions, users, patches, picks, bans, and recommendations are easier to model with relational data.

### Alternative 2: Use SQLite only

Rejected for target architecture.

SQLite is simple for local development, but Wise Rift is planned as a SaaS-style web app.

PostgreSQL is a better production direction.

SQLite could still be used for small experiments, but not as the main architecture choice.

### Alternative 3: Use raw SQL without Prisma

Rejected for MVP speed.

Raw SQL gives full control, but it adds more boilerplate.

Prisma is faster for early development and gives useful TypeScript support.

Raw SQL can still be used later for special queries.

### Alternative 4: Store everything in JSON files

Rejected.

JSON files are useful for source patch data.

They are not enough for user accounts, draft history, recommendations, match results, AI explanations, and future analytics.

### Alternative 5: Let Python service own the database

Rejected for MVP.

The NestJS backend API should own the app workflow and database writes.

The Python service should focus on scoring.

This keeps the architecture clearer.

## Future Migration Path

PostgreSQL and Prisma are the right choices for MVP and early production direction.

Future improvements may include:

```txt id="ogox2v"
Basic Prisma schema
→ seed scripts
→ validation scripts
→ query optimization
→ stronger indexes
→ analytics tables
→ archived draft data
→ read replicas if needed
→ raw SQL for advanced reports
```

If the project grows, Wise Rift may add:

- audit logs
- recommendation feedback tables
- score experiment tables
- patch comparison tables
- admin data editor tables
- background job records

These can be added later.

## Final Decision

Wise Rift will use PostgreSQL as the main relational database.

Wise Rift will use Prisma as the ORM for the NestJS backend API.

Manual patch data will start as JSON files, then be validated and seeded into PostgreSQL.

The backend API will own database access during the MVP.

The Python recommendation service will receive structured data from the backend and return scoring results.

This keeps Wise Rift structured, testable, and realistic for a full-stack software engineering portfolio project.

## Related Documents

```txt id="dya1gd"
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
```
