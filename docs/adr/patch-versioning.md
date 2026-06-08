# ADR: Patch Versioning

## Status

Accepted

## Date

2026-06-08

## Context

Wise Rift needs patch-versioned game data.

Wild Rift changes over time.

A new patch can change:

- champion base stats
- champion skill numbers
- champion skill effects
- item stats
- item effects
- rune values
- summoner spell values
- matchup strength
- champion tags
- item tags
- scoring weights
- team composition rules

Because of this, Wise Rift cannot treat game data as permanent.

A recommendation made during one patch may not be correct in a later patch.

For example:

```txt id="scdyqr"
Patch 6.1:
Ahri is strong into a matchup.

Patch 6.2:
Ahri receives a nerf.
The same matchup may now have a lower score.
```

Wise Rift also needs to save old draft sessions and draft reviews.

Old draft sessions should keep the patch that was active when the draft was created.

Important rule:

```txt id="3o6xkl"
DraftSession.patchId should not change after creation.
```

## Decision

Wise Rift will store game data by patch version.

Each draft session will store the patch ID used when the draft session was created.

Old patch data will stay available.

New patch data will be added as a new patch version instead of overwriting old patch data.

The recommendation engine will calculate scores using the patch ID attached to the draft session.

## Main Rule

Wise Rift will follow this rule:

```txt id="2qykf6"
A draft belongs to one patch.
A recommendation uses that draft's patch.
Old draft history should not change when a new patch is added.
```

This keeps recommendations and draft reviews stable over time.

## Why Patch Versioning Is Required

### 1. Wild Rift changes across patches

Champion and item balance changes over time.

A champion can become stronger, weaker, or different after a patch.

An item can receive stat changes or effect changes.

A rune or spell can also change.

If Wise Rift only stores one current version of game data, old recommendations can become inaccurate.

### 2. Draft reviews need historical accuracy

Wise Rift includes post-game draft review.

A draft review should explain the draft based on the patch used during that match.

Example:

```txt id="yjund7"
Draft Session A was played on patch 6.1.
Patch 6.2 is added later.
Draft Session A should still use patch 6.1 data.
```

Without patch versioning, the review could change after new patch data is added.

That would make old draft history less trustworthy.

### 3. Scoring needs stable inputs

Rule-based scoring should be deterministic.

Important rule:

```txt id="vp96d7"
Same input should return the same output.
```

Patch data is part of the input.

If the patch data changes, the scoring result can change.

By attaching a patch ID to each draft session, Wise Rift keeps scoring inputs stable.

### 4. Manual patch data needs a clear update workflow

Wise Rift uses manually maintained patch data for the MVP.

Patch versioning gives a clean workflow:

```txt id="f1v9mr"
Copy previous patch data
Create new patch folder
Update changed data
Validate data
Seed data
Set new patch as active
Keep old patch data
```

This makes manual maintenance safer.

### 5. AI explanation needs patch-safe input

AI should not invent patch data.

AI should only explain results from the scoring engine.

If AI explains a recommendation, it should receive the patch version and scoring result.

This helps prevent confusing explanations.

Example:

```txt id="j73gkx"
This recommendation is based on patch 6.1 data.
```

## Patch Data Ownership

Manual JSON files are the source files for patch data.

PostgreSQL stores the validated and seeded runtime version.

Suggested flow:

```txt id="cz4xje"
Manual JSON files
→ validation script
→ seed script
→ PostgreSQL
→ Backend API
→ Python recommendation service
→ Frontend clients
```

Manual JSON files should live in the repo.

PostgreSQL should store the validated version used by the app.

## Suggested Patch Folder Structure

Suggested structure:

```txt id="1key2i"
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

    6.2/
      patch.json
      champions.json
      champion-skills.json
      items.json
      runes.json
      summoner-spells.json
      matchups.json
      scoring-tags.json
```

Each patch folder should be self-contained enough to seed that patch.

## Patch Identity

Each patch should have a stable ID.

Example:

```json id="zpo86o"
{
  "patchId": "wild-rift-6.1",
  "version": "6.1",
  "displayName": "Wild Rift Patch 6.1",
  "isActive": true,
  "releaseDate": "2026-01-01"
}
```

The `patchId` should be used by draft sessions, patch stats, and recommendation input.

## Active Patch Rule

Wise Rift can have one active patch at a time for new draft sessions.

Example:

```txt id="cajkg2"
Patch 6.1 is active.
New draft sessions use patch 6.1.

Patch 6.2 is added and activated.
New draft sessions use patch 6.2.
Old draft sessions still use patch 6.1.
```

Only new draft sessions should use the new active patch.

Existing draft sessions should not be moved automatically.

## Draft Session Patch Rule

When a draft session is created, it must store `patchId`.

Example:

```json id="08og5y"
{
  "draftSessionId": "draft_001",
  "userId": "user_001",
  "patchId": "wild-rift-6.1",
  "role": "MID",
  "status": "BAN_PHASE"
}
```

After creation, `patchId` should not change.

This rule protects old recommendations and draft reviews.

## Recommendation Patch Rule

Every recommendation result should be traceable to the patch used during scoring.

Recommended fields:

```txt id="3g88i5"
recommendationId
draftSessionId
patchId
recommendationType
targetId
finalScore
confidence
scoreBreakdown
reasonCodes
createdAt
```

The recommendation should use the same `patchId` as the draft session.

## Game Data Patch Rule

Patch-specific values should be stored in patch-linked records.

Examples:

```txt id="cwqvjq"
ChampionPatchStat
ItemPatchStat
RunePatchStat
SummonerSpellPatchStat
```

Champion identity can be stable across patches.

Example stable champion data:

```txt id="z9eghg"
championId
slug
displayName
defaultRoles
```

Patch-specific champion data:

```txt id="6909la"
patchId
championId
baseHealth
baseMana
attackDamage
armor
magicResistance
attackSpeed
movementSpeed
dataQuality
```

This separates identity from balance values.

## Champion Skill Versioning

Champion skills may change by patch.

For MVP, Wise Rift can store champion skill data with patch awareness.

Suggested direction:

```txt id="xsgpkz"
Champion
→ ChampionSkill
→ ChampionSkillPatchDetail
```

Or simpler MVP direction:

```txt id="ggn9be"
ChampionSkill includes patchId
```

The first version can use the simpler model.

If skill history becomes complex later, it can be normalized more.

## Item Versioning

Item identity can be stable.

Example stable item data:

```txt id="h3ltuq"
itemId
slug
displayName
itemType
```

Patch-specific item data:

```txt id="2bhcbs"
patchId
itemId
price
stats
effects
tags
dataQuality
```

This allows item stats to change across patches without overwriting old versions.

## Rune and Summoner Spell Versioning

Runes and summoner spells can also change.

Suggested patch-specific records:

```txt id="7t9yps"
RunePatchStat
SummonerSpellPatchStat
```

The MVP can add these after champion and item patch data are working.

## Scoring Rule Versioning

Scoring rules may also change over time.

For MVP, scoring rules can start as code constants in the Python recommendation service.

Later, Wise Rift can version scoring weights by patch.

Example future structure:

```txt id="5pd9fk"
Patch
→ ScoringRuleSet
→ ScoringWeights
```

This can help explain why recommendations changed between patches.

MVP rule:

```txt id="pncnsc"
Patch game data must be versioned first.
Scoring rule versioning can come later.
```

## New Patch Workflow

When a new patch is released, Wise Rift should follow a safe update process.

Suggested workflow:

```txt id="5v8313"
1. Copy previous patch folder.
2. Rename folder to the new patch version.
3. Update patch.json.
4. Update changed champion data.
5. Update changed skill data.
6. Update changed item data.
7. Update changed rune and spell data if needed.
8. Update matchup and scoring tags if needed.
9. Mark incomplete data with data quality levels.
10. Run validation script.
11. Run seed script.
12. Set the new patch as active.
13. Test recommendation results.
```

## Old Patch Preservation Rule

Old patch data should not be overwritten.

If old patch data has a real mistake, it can be corrected.

But the correction should be intentional and documented.

Example:

```txt id="mcux2x"
Fix typo in patch 6.1 Ahri skill data.
Document correction in patch data changelog.
```

Avoid silently changing old patch data.

## Patch Changelog Direction

Each patch folder can include a changelog file later.

Suggested file:

```txt id="58qqpg"
data/patches/6.2/changelog.md
```

It can include:

- changed champions
- changed items
- changed runes
- changed spells
- changed tags
- missing data
- known issues
- validation notes

This helps manual maintenance.

## Data Quality Levels

Each patch data record should be able to show data quality.

Suggested levels:

```txt id="jlj2m3"
COMPLETE
PARTIAL
PLACEHOLDER
NEEDS_REVIEW
```

### COMPLETE

The data has been checked and is ready for scoring.

### PARTIAL

The data is usable for basic scoring, but some details are missing.

### PLACEHOLDER

The data is only for early testing.

It should not be trusted for real recommendation quality.

### NEEDS_REVIEW

The data may be wrong or outdated.

It should be reviewed before being used in serious scoring.

## Validation Rules

Patch data should be validated before seeding.

Validation should check:

- patch ID exists
- patch version is unique
- active patch is valid
- champion IDs are unique
- item IDs are unique
- referenced champions exist
- referenced items exist
- required fields exist
- enum values are valid
- numeric values are valid
- data quality levels are valid
- old draft patch IDs still point to existing patches

Example validation rules:

```txt id="e095ky"
Patch must have patchId.
Patch must have version.
ChampionPatchStat must have patchId.
ChampionPatchStat must have championId.
ItemPatchStat must have patchId.
ItemPatchStat must have itemId.
DraftSession.patchId must reference an existing patch.
```

## Database Direction

PostgreSQL should store patch data with clear relationships.

Suggested core models:

```txt id="njx1jj"
Patch
Champion
ChampionPatchStat
ChampionSkill
Item
ItemPatchStat
Rune
RunePatchStat
SummonerSpell
SummonerSpellPatchStat
DraftSession
RecommendationResult
```

Important relationships:

```txt id="hotls9"
DraftSession.patchId → Patch.id
ChampionPatchStat.patchId → Patch.id
ItemPatchStat.patchId → Patch.id
RecommendationResult.patchId → Patch.id
```

This helps ensure recommendations and draft sessions are tied to a valid patch.

## API Direction

The backend API should expose patch routes.

Suggested routes:

```txt id="no3ouq"
GET /api/patches
GET /api/patches/active
GET /api/patches/:patchId
```

Draft creation should use the active patch by default.

Example route:

```txt id="8m7hpa"
POST /api/drafts
```

If the user does not pass a patch ID, the backend can attach the active patch.

The backend should validate that the patch exists.

## Recommendation Service Direction

The Python recommendation service should receive the patch ID and patch-specific data from the backend.

Example scoring input:

```json id="9w3sr3"
{
  "requestType": "PICK_RECOMMENDATION",
  "activePatch": {
    "patchId": "wild-rift-6.1",
    "version": "6.1"
  },
  "draftState": {
    "draftSessionId": "draft_001",
    "patchId": "wild-rift-6.1",
    "role": "MID",
    "teamPicks": ["vi"],
    "enemyPicks": ["jinx"],
    "bannedChampions": ["yasuo"]
  },
  "gameData": {
    "champions": [],
    "items": [],
    "matchups": []
  }
}
```

The recommendation service should not guess which patch to use.

The backend should provide patch-specific input.

## AI Explanation Direction

AI explanations should include patch context when helpful.

Example:

```txt id="fg9585"
This recommendation is based on patch 6.1 data.
```

AI should not invent patch changes.

AI should not compare patches unless the backend provides comparison data.

## Frontend Direction

The frontend should show the active patch clearly.

For draft sessions, the UI can show:

```txt id="xe0xel"
Patch: 6.1
```

For old draft reviews, the UI should show the patch used by that draft.

This helps the user understand why old recommendations may differ from current recommendations.

## Consequences

### Positive Consequences

Patch versioning keeps old draft history accurate.

Recommendations become easier to trust.

The scoring engine has stable inputs.

Manual patch updates become safer.

The project supports real game balance changes.

Draft reviews remain tied to the right game state.

The architecture looks more realistic for a game-data project.

### Negative Consequences

Patch versioning adds complexity.

The database schema becomes larger.

Patch data maintenance takes more time.

Seed scripts become more important.

Validation becomes more important.

Some data may be duplicated across patch versions.

### Risks

The main risks are:

- too much duplicate data between patches
- manual data entry mistakes
- old patch data changed by accident
- draft sessions using the wrong patch
- recommendation results missing patch ID
- incomplete patch data reducing score quality
- active patch not updated correctly
- validation script missing important checks

## Risk Mitigation

Wise Rift should reduce these risks by using:

- patch folders
- validation scripts
- seed scripts
- data quality levels
- stable patch IDs
- clear active patch rule
- database foreign keys
- indexes on patch-related fields
- tests for draft patch behavior
- changelog notes for patch updates

The MVP should start with a small patch dataset.

Do not try to version every champion and item before the first draft workflow works.

## Testing Strategy

Patch versioning should have tests.

Tests should cover:

- draft session stores patch ID
- draft session patch ID does not change
- active patch is used for new drafts
- old drafts keep old patch ID
- recommendation uses draft patch ID
- champion patch stats load by patch ID
- item patch stats load by patch ID
- invalid patch ID is rejected
- inactive patch behavior is clear

Example test case:

```txt id="hyq8f7"
Given patch 6.1 is active
When a draft session is created
Then the draft session stores patchId wild-rift-6.1
```

Example test case:

```txt id="rrthsk"
Given draft session A uses patch 6.1
And patch 6.2 becomes active
When draft session A is reviewed
Then draft session A still uses patch 6.1 data
```

## Alternatives Considered

### Alternative 1: Store only the latest game data

Rejected.

This would make old draft sessions and reviews unstable.

Old recommendations could change after a new patch is added.

### Alternative 2: Update old draft sessions to the newest patch

Rejected.

A draft should be reviewed using the patch that existed when the draft happened.

Updating old drafts would damage historical accuracy.

### Alternative 3: Do not store patch data in the database

Rejected.

JSON files are useful as source files, but the app needs queryable runtime data.

PostgreSQL should store validated patch data for API and scoring use.

### Alternative 4: Fully automate patch updates from the start

Rejected for MVP.

Automatic patch scraping adds too much complexity early.

Manual patch data is better for the first version.

### Alternative 5: Version only champions, not items

Rejected.

Items are a major part of item build suggestions.

If item stats or effects change, item recommendations can change.

Items need patch-aware data too.

## Future Migration Path

Patch versioning can grow over time.

Possible path:

```txt id="ci5agr"
Manual patch folders
→ validation scripts
→ seed scripts
→ patch changelog files
→ admin patch editor
→ patch comparison view
→ semi-automated patch import
→ automatic patch sync if reliable
```

Future features may include:

- patch comparison page
- champion change history
- item change history
- scoring weight history
- recommendation difference by patch
- admin patch data editor
- patch data review checklist
- patch import preview

These can be added after the MVP draft workflow works.

## Final Decision

Wise Rift will use patch-versioned game data.

Each draft session will store the patch ID used when it was created.

Old draft sessions, recommendation results, and draft reviews will remain tied to their original patch.

New patch data will be added as new patch versions instead of overwriting old patch data.

The recommendation engine will score using the draft session's patch data.

This keeps Wise Rift accurate, testable, and trustworthy as Wild Rift changes over time.

## Related Documents

```txt id="07x31f"
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
```
