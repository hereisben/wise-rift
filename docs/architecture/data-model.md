# Wise Rift - Data Model Architecture

This document defines the first shared data model for **Wise Rift**.

The goal of this document is to connect all product modules into one clear backend data structure before writing the Prisma schema and implementation.

Wise Rift helps Wild Rift players make better draft decisions.

The data model should support this full workflow:

```txt id="x9rbui"
User
→ Active Patch
→ Champion Pool
→ Draft Session
→ Bans
→ Picks
→ Recommendations
→ Team Composition Analysis
→ Item Build Suggestions
→ Matchup Notes
→ Match Result
→ Draft Review
```

---

# 1. Purpose

The purpose of this document is to define:

- main data entities
- entity relationships
- important fields
- status enums
- role enums
- draft lifecycle rules
- patch data rules
- recommendation tracking rules
- ownership rules
- soft delete rules
- AI explanation rules
- future database direction

This document is not the final database schema yet.

It is the architecture guide for the first Prisma and PostgreSQL schema.

---

# 2. Data Model Principles

Wise Rift should keep the data model clear, practical, and easy to build.

## 2.1 Single-User First

The MVP is designed for one user account.

There are no team workspaces in MVP.

Each major user-created record belongs to one user.

```txt id="ylm277"
User owns Champion Pool.
User owns Draft Sessions.
Draft Sessions own most draft records.
```

Future team support should be possible, but it should not make the MVP complex.

## 2.2 Draft-Centered Workflow

Most gameplay records should connect to a draft session.

A draft session is the main container for one draft.

```txt id="m6u9j8"
DraftSession
├─ DraftBans
├─ DraftPicks
├─ RecommendationResults
├─ ItemBuildRecommendations
├─ MatchupNotes
├─ MatchResult
└─ DraftReview
```

## 2.3 Patch Data Is Source of Truth

Patch data should control champion and item numbers.

Main rule:

```txt id="ge0f5b"
Manual patch data is the source of truth.
AI should not invent champion numbers, item stats, or patch changes.
```

A draft session should always keep the patch it was created with.

This matters because old draft reviews should not change when a new patch becomes active.

## 2.4 Scoring Engine Decides

Recommendations should come from scoring logic.

AI should only explain the scoring result.

Main rule:

```txt id="c6uew3"
Scoring engine decides.
AI explains.
User reviews.
```

## 2.5 Traceability

Records should link together when possible.

Example:

```txt id="t18ucl"
Draft Session
→ Bans and Picks
→ Recommendation Results
→ Match Result
→ Draft Review
```

This helps the user understand what was recommended at the time and whether the draft worked.

## 2.6 Soft Delete Where Useful

Most user-created records should support soft delete.

This avoids accidental data loss.

Recommended soft delete fields:

```txt id="g8a8a9"
deletedAt
archivedAt
```

For MVP, hard delete can be allowed only for simple draft child records if needed.

---

# 3. Main Entities

The main MVP entities are:

```txt id="z3ib05"
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
MatchupNote
MatchResult
DraftReview
AIExplanation
```

Future entities may include:

```txt id="ny2qzi"
Workspace
TeamMember
RiotAccount
MatchHistoryImport
PatchChangeLog
ChampionMatchup
ItemBuildTemplate
Notification
MobileSession
```

These are not part of MVP.

---

# 4. Entity Relationship Overview

## 4.1 High-Level User Relationship Diagram

```txt id="u317pl"
User
├─ ChampionPool
│  └─ ChampionPoolEntry
│
├─ DraftSession
│  ├─ DraftBan
│  ├─ DraftPick
│  ├─ RecommendationResult
│  ├─ ItemBuildRecommendation
│  ├─ MatchupNote
│  ├─ MatchResult
│  ├─ DraftReview
│  └─ AIExplanation
│
└─ MatchupNote
```

## 4.2 Patch Data Relationship Diagram

```txt id="03t7cz"
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

## 4.3 Draft Source Linking Diagram

```txt id="9a56z5"
DraftSession
   ↓ owns
DraftBan + DraftPick

DraftBan + DraftPick + ChampionPool + PatchData
   ↓ used by
RecommendationResult

DraftPick + Enemy Picks + Item Data
   ↓ used by
ItemBuildRecommendation

DraftSession + MatchResult + RecommendationResult
   ↓ used by
DraftReview
```

---

# 5. User Model

## 5.1 Purpose

The `User` model stores account-level data.

In MVP, each user manages their own champion pool, draft sessions, and draft history.

## 5.2 Fields

```txt id="a6buu4"
id
name
email
passwordHash
avatarUrl
createdAt
updatedAt
deletedAt
```

## 5.3 Field Notes

| Field        | Type     | Required | Notes                  |
| ------------ | -------- | -------: | ---------------------- |
| id           | UUID     |      Yes | Primary key            |
| name         | String   |       No | Display name           |
| email        | String   |      Yes | Unique login email     |
| passwordHash | String   |      Yes | Hashed password only   |
| avatarUrl    | String   |       No | Optional profile image |
| createdAt    | DateTime |      Yes | Created timestamp      |
| updatedAt    | DateTime |      Yes | Updated timestamp      |
| deletedAt    | DateTime |       No | Soft delete support    |

## 5.4 Relationships

```txt id="mbntg3"
User has one ChampionPool.
User has many DraftSessions.
User has many MatchupNotes.
User has many AIExplanations.
```

---

# 6. Patch Model

## 6.1 Purpose

The `Patch` model stores a Wild Rift patch version.

Patch data controls which champion and item numbers are used during recommendations.

Examples:

```txt id="o83wpf"
Patch 6.1
Patch 6.2
Patch 6.3
```

## 6.2 Fields

```txt id="ht6vkh"
id
version
name
notes
isActive
releasedAt
createdAt
updatedAt
archivedAt
deletedAt
```

## 6.3 Field Notes

| Field      | Type     | Required | Notes                       |
| ---------- | -------- | -------: | --------------------------- |
| id         | UUID     |      Yes | Primary key                 |
| version    | String   |      Yes | Patch version, example: 6.1 |
| name       | String   |      Yes | Display name                |
| notes      | Text     |       No | Manual patch notes          |
| isActive   | Boolean  |      Yes | Current active patch        |
| releasedAt | DateTime |       No | Patch release date          |
| createdAt  | DateTime |      Yes | Created timestamp           |
| updatedAt  | DateTime |      Yes | Updated timestamp           |
| archivedAt | DateTime |       No | Archive timestamp           |
| deletedAt  | DateTime |       No | Soft delete timestamp       |

## 6.4 Relationships

```txt id="sygzyt"
Patch has many ChampionPatchStats.
Patch has many ChampionSkills.
Patch has many ItemPatchStats.
Patch has many DraftSessions.
Patch has many RecommendationResults.
```

## 6.5 Patch Rule

Only one patch should be active at a time.

When a new patch becomes active:

```txt id="jhs1sy"
Set old active patch to inactive.
Set new patch to active.
Do not update old draft sessions.
```

Main rule:

```txt id="mlr4z0"
Old draft sessions should keep their original patchId.
```

---

# 7. Champion Model

## 7.1 Purpose

The `Champion` model stores stable champion identity data.

Patch-specific values should not live directly on this model.

## 7.2 Fields

```txt id="f2h1p8"
id
key
name
title
roles
damageType
rangeType
difficulty
tags
strengths
weaknesses
createdAt
updatedAt
archivedAt
deletedAt
```

## 7.3 Field Notes

| Field      | Type             | Required | Notes                            |
| ---------- | ---------------- | -------: | -------------------------------- |
| id         | UUID             |      Yes | Primary key                      |
| key        | String           |      Yes | Unique slug, example: akali      |
| name       | String           |      Yes | Champion name                    |
| title      | String           |       No | Champion title                   |
| roles      | String[] or JSON |      Yes | MID, JUNGLE, DRAGON, etc.        |
| damageType | DamageType       |      Yes | Physical, magic, mixed, true     |
| rangeType  | RangeType        |      Yes | Melee or ranged                  |
| difficulty | Difficulty       |      Yes | Low, medium, high                |
| tags       | String[] or JSON |       No | Assassin, mage, tank, poke, etc. |
| strengths  | String[] or JSON |       No | What champion is good at         |
| weaknesses | String[] or JSON |       No | What champion struggles against  |
| createdAt  | DateTime         |      Yes | Created timestamp                |
| updatedAt  | DateTime         |      Yes | Updated timestamp                |
| archivedAt | DateTime         |       No | Archive timestamp                |
| deletedAt  | DateTime         |       No | Soft delete timestamp            |

## 7.4 Relationships

```txt id="k70vh2"
Champion has many ChampionPatchStats.
Champion has many ChampionSkills.
Champion has many ChampionPoolEntries.
Champion has many DraftBans.
Champion has many DraftPicks.
Champion has many MatchupNotes as myChampion.
Champion has many MatchupNotes as enemyChampion.
```

## 7.5 Champion Rule

Stable identity data belongs to `Champion`.

Patch-specific numbers belong to `ChampionPatchStat`.

---

# 8. ChampionPatchStat Model

## 8.1 Purpose

The `ChampionPatchStat` model stores champion numbers for a specific patch.

This allows old drafts to stay accurate.

## 8.2 Fields

```txt id="byrskb"
id
championId
patchId
baseHealth
baseMana
baseArmor
baseMagicResist
baseAttackDamage
baseAbilityPower
attackSpeed
moveSpeed
scalingProfile
laneProfile
teamFightProfile
metaScore
createdAt
updatedAt
```

## 8.3 Field Notes

| Field            | Type     | Required | Notes                            |
| ---------------- | -------- | -------: | -------------------------------- |
| id               | UUID     |      Yes | Primary key                      |
| championId       | UUID     |      Yes | Related champion                 |
| patchId          | UUID     |      Yes | Related patch                    |
| baseHealth       | Float    |       No | Patch-specific health            |
| baseMana         | Float    |       No | Patch-specific mana              |
| baseArmor        | Float    |       No | Patch-specific armor             |
| baseMagicResist  | Float    |       No | Patch-specific magic resist      |
| baseAttackDamage | Float    |       No | Patch-specific attack damage     |
| baseAbilityPower | Float    |       No | Patch-specific ability power     |
| attackSpeed      | Float    |       No | Patch-specific attack speed      |
| moveSpeed        | Float    |       No | Patch-specific movement speed    |
| scalingProfile   | JSON     |       No | Early, mid, late game profile    |
| laneProfile      | JSON     |       No | Lane pressure and safety profile |
| teamFightProfile | JSON     |       No | Engage, follow-up, peel, etc.    |
| metaScore        | Integer  |       No | Manual patch meta score          |
| createdAt        | DateTime |      Yes | Created timestamp                |
| updatedAt        | DateTime |      Yes | Updated timestamp                |

## 8.4 Relationships

```txt id="gj6pyy"
ChampionPatchStat belongs to Champion.
ChampionPatchStat belongs to Patch.
```

## 8.5 Unique Rule

A champion should have only one patch stat record per patch.

```txt id="jnefwk"
unique(championId, patchId)
```

---

# 9. ChampionSkill Model

## 9.1 Purpose

The `ChampionSkill` model stores champion ability details for a patch.

Skill data can change between patches.

## 9.2 Fields

```txt id="bcwpwa"
id
championId
patchId
slot
name
description
damageType
cooldown
cost
range
scaling
effects
tags
createdAt
updatedAt
```

## 9.3 Field Notes

| Field       | Type       | Required | Notes                                |
| ----------- | ---------- | -------: | ------------------------------------ |
| id          | UUID       |      Yes | Primary key                          |
| championId  | UUID       |      Yes | Related champion                     |
| patchId     | UUID       |      Yes | Related patch                        |
| slot        | SkillSlot  |      Yes | PASSIVE, Q, W, E, R                  |
| name        | String     |      Yes | Skill name                           |
| description | Text       |      Yes | Manual skill description             |
| damageType  | DamageType |       No | Physical, magic, mixed, true         |
| cooldown    | JSON       |       No | Cooldown by level                    |
| cost        | JSON       |       No | Mana or energy cost                  |
| range       | JSON       |       No | Skill range                          |
| scaling     | JSON       |       No | Scaling values                       |
| effects     | JSON       |       No | Slow, stun, shield, heal, dash, etc. |
| tags        | JSON       |       No | Burst, poke, mobility, crowd control |
| createdAt   | DateTime   |      Yes | Created timestamp                    |
| updatedAt   | DateTime   |      Yes | Updated timestamp                    |

## 9.4 Skill Slot Enum

```txt id="kz6v6q"
PASSIVE
Q
W
E
R
```

## 9.5 Relationships

```txt id="i8g20s"
ChampionSkill belongs to Champion.
ChampionSkill belongs to Patch.
```

## 9.6 Skill Rule

AI should not create skill values.

Skill data should come from manually maintained patch data.

---

# 10. Item Model

## 10.1 Purpose

The `Item` model stores stable item identity data.

Patch-specific item numbers should live in `ItemPatchStat`.

## 10.2 Fields

```txt id="zgg8s7"
id
key
name
category
tags
goodAgainst
weakAgainst
createdAt
updatedAt
archivedAt
deletedAt
```

## 10.3 Field Notes

| Field       | Type             | Required | Notes                             |
| ----------- | ---------------- | -------: | --------------------------------- |
| id          | UUID             |      Yes | Primary key                       |
| key         | String           |      Yes | Unique slug, example: void-staff  |
| name        | String           |      Yes | Item name                         |
| category    | ItemCategory     |      Yes | Magic, physical, defense, boots   |
| tags        | String[] or JSON |       No | Anti-heal, anti-tank, burst, etc. |
| goodAgainst | String[] or JSON |       No | Enemy situations this item helps  |
| weakAgainst | String[] or JSON |       No | Situations where item is weaker   |
| createdAt   | DateTime         |      Yes | Created timestamp                 |
| updatedAt   | DateTime         |      Yes | Updated timestamp                 |
| archivedAt  | DateTime         |       No | Archive timestamp                 |
| deletedAt   | DateTime         |       No | Soft delete timestamp             |

## 10.4 Relationships

```txt id="q0mvle"
Item has many ItemPatchStats.
Item can appear in many ItemBuildRecommendations.
```

---

# 11. ItemPatchStat Model

## 11.1 Purpose

The `ItemPatchStat` model stores item stats for a specific patch.

This helps item build recommendations stay patch-aware.

## 11.2 Fields

```txt id="aonw4c"
id
itemId
patchId
cost
abilityPower
attackDamage
armor
magicResist
health
mana
abilityHaste
critRate
attackSpeed
armorPenetration
magicPenetration
antiHealValue
shieldPower
effectDescription
createdAt
updatedAt
```

## 11.3 Field Notes

| Field             | Type     | Required | Notes                             |
| ----------------- | -------- | -------: | --------------------------------- |
| id                | UUID     |      Yes | Primary key                       |
| itemId            | UUID     |      Yes | Related item                      |
| patchId           | UUID     |      Yes | Related patch                     |
| cost              | Integer  |       No | Item cost                         |
| abilityPower      | Float    |       No | Ability power                     |
| attackDamage      | Float    |       No | Attack damage                     |
| armor             | Float    |       No | Armor                             |
| magicResist       | Float    |       No | Magic resist                      |
| health            | Float    |       No | Health                            |
| mana              | Float    |       No | Mana                              |
| abilityHaste      | Float    |       No | Ability haste                     |
| critRate          | Float    |       No | Critical rate                     |
| attackSpeed       | Float    |       No | Attack speed                      |
| armorPenetration  | Float    |       No | Armor penetration                 |
| magicPenetration  | Float    |       No | Magic penetration                 |
| antiHealValue     | Float    |       No | Anti-heal strength if relevant    |
| shieldPower       | Float    |       No | Shield or heal effect if relevant |
| effectDescription | Text     |       No | Manual item effect description    |
| createdAt         | DateTime |      Yes | Created timestamp                 |
| updatedAt         | DateTime |      Yes | Updated timestamp                 |

## 11.4 Relationships

```txt id="9qlywf"
ItemPatchStat belongs to Item.
ItemPatchStat belongs to Patch.
```

## 11.5 Unique Rule

An item should have only one patch stat record per patch.

```txt id="v7fh84"
unique(itemId, patchId)
```

---

# 12. ChampionPool Model

## 12.1 Purpose

The `ChampionPool` model stores a user's playable champions.

In MVP, each user should have one champion pool.

## 12.2 Fields

```txt id="kfz2fu"
id
userId
name
createdAt
updatedAt
deletedAt
```

## 12.3 Field Notes

| Field     | Type     | Required | Notes                 |
| --------- | -------- | -------: | --------------------- |
| id        | UUID     |      Yes | Primary key           |
| userId    | UUID     |      Yes | Owner user            |
| name      | String   |       No | Optional pool name    |
| createdAt | DateTime |      Yes | Created timestamp     |
| updatedAt | DateTime |      Yes | Updated timestamp     |
| deletedAt | DateTime |       No | Soft delete timestamp |

## 12.4 Relationships

```txt id="1pi344"
ChampionPool belongs to User.
ChampionPool has many ChampionPoolEntries.
```

## 12.5 Unique Rule

A user should only have one default champion pool in MVP.

```txt id="tu1f5n"
unique(userId)
```

---

# 13. ChampionPoolEntry Model

## 13.1 Purpose

The `ChampionPoolEntry` model stores one champion inside the user's champion pool.

It tracks comfort level and role preference.

## 13.2 Fields

```txt id="tt4q7q"
id
championPoolId
userId
championId
preferredRole
comfortLevel
notes
createdAt
updatedAt
deletedAt
```

## 13.3 Field Notes

| Field          | Type     | Required | Notes                            |
| -------------- | -------- | -------: | -------------------------------- |
| id             | UUID     |      Yes | Primary key                      |
| championPoolId | UUID     |      Yes | Parent champion pool             |
| userId         | UUID     |      Yes | Owner user                       |
| championId     | UUID     |      Yes | Related champion                 |
| preferredRole  | GameRole |      Yes | Role user plays this champion in |
| comfortLevel   | Integer  |      Yes | 1 to 5 comfort score             |
| notes          | Text     |       No | User notes about this champion   |
| createdAt      | DateTime |      Yes | Created timestamp                |
| updatedAt      | DateTime |      Yes | Updated timestamp                |
| deletedAt      | DateTime |       No | Soft delete timestamp            |

## 13.4 Relationships

```txt id="0d2ubd"
ChampionPoolEntry belongs to ChampionPool.
ChampionPoolEntry belongs to User.
ChampionPoolEntry belongs to Champion.
```

## 13.5 Unique Rule

The same champion should not be added twice for the same role.

```txt id="0l6t4h"
unique(userId, championId, preferredRole)
```

## 13.6 Comfort Rule

Comfort level should be between 1 and 5.

```txt id="67hg4q"
1 = low comfort
5 = high comfort
```

---

# 14. DraftSession Model

## 14.1 Purpose

The `DraftSession` model stores one draft workflow.

It connects role choice, intended champion, bans, picks, recommendations, item builds, match result, and draft review.

## 14.2 Fields

```txt id="6tcuyy"
id
userId
patchId
role
intendedChampionId
phase
status
queueType
notes
startedAt
completedAt
archivedAt
createdAt
updatedAt
deletedAt
```

## 14.3 Field Notes

| Field              | Type        | Required | Notes                             |
| ------------------ | ----------- | -------: | --------------------------------- |
| id                 | UUID        |      Yes | Primary key                       |
| userId             | UUID        |      Yes | Owner user                        |
| patchId            | UUID        |      Yes | Patch used for this draft         |
| role               | GameRole    |      Yes | User selected role                |
| intendedChampionId | UUID        |       No | Optional intended champion        |
| phase              | DraftPhase  |      Yes | Current draft phase               |
| status             | DraftStatus |      Yes | Active, completed, archived, etc. |
| queueType          | QueueType   |       No | Ranked, normal, custom, etc.      |
| notes              | Text        |       No | General draft notes               |
| startedAt          | DateTime    |       No | Draft start timestamp             |
| completedAt        | DateTime    |       No | Draft completion timestamp        |
| archivedAt         | DateTime    |       No | Archive timestamp                 |
| createdAt          | DateTime    |      Yes | Created timestamp                 |
| updatedAt          | DateTime    |      Yes | Updated timestamp                 |
| deletedAt          | DateTime    |       No | Soft delete timestamp             |

## 14.4 Draft Phase Enum

```txt id="c8magq"
SETUP
BAN_PREP
BAN_ENTRY
LIVE_PICK
COMPLETED
REVIEW
ARCHIVED
```

## 14.5 Draft Status Enum

```txt id="gmgfhm"
ACTIVE
COMPLETED
ARCHIVED
DELETED
```

## 14.6 Queue Type Enum

```txt id="cas4kz"
RANKED
NORMAL
CUSTOM
SCRIM
UNKNOWN
```

## 14.7 Relationships

```txt id="95k88v"
DraftSession belongs to User.
DraftSession belongs to Patch.
DraftSession can reference intended Champion.
DraftSession has many DraftBans.
DraftSession has many DraftPicks.
DraftSession has many RecommendationResults.
DraftSession has many ItemBuildRecommendations.
DraftSession has many MatchupNotes.
DraftSession has one MatchResult.
DraftSession has one DraftReview.
DraftSession has many AIExplanations.
```

## 14.8 Draft Patch Rule

A draft session must keep the patch used at creation time.

```txt id="f99uqu"
DraftSession.patchId should not change after creation.
```

---

# 15. DraftBan Model

## 15.1 Purpose

The `DraftBan` model stores banned champions in a draft session.

## 15.2 Fields

```txt id="9eiazs"
id
draftSessionId
userId
championId
teamSide
orderIndex
reason
createdAt
updatedAt
deletedAt
```

## 15.3 Field Notes

| Field          | Type     | Required | Notes                      |
| -------------- | -------- | -------: | -------------------------- |
| id             | UUID     |      Yes | Primary key                |
| draftSessionId | UUID     |      Yes | Parent draft session       |
| userId         | UUID     |      Yes | Owner user                 |
| championId     | UUID     |      Yes | Banned champion            |
| teamSide       | TeamSide |      Yes | MY_TEAM, ENEMY, or UNKNOWN |
| orderIndex     | Integer  |       No | Ban order                  |
| reason         | Text     |       No | Optional user note         |
| createdAt      | DateTime |      Yes | Created timestamp          |
| updatedAt      | DateTime |      Yes | Updated timestamp          |
| deletedAt      | DateTime |       No | Soft delete timestamp      |

## 15.4 Relationships

```txt id="oo4wdq"
DraftBan belongs to DraftSession.
DraftBan belongs to User.
DraftBan belongs to Champion.
```

## 15.5 Ban Rule

A champion cannot be banned twice in the same draft.

```txt id="sshfw8"
unique(draftSessionId, championId)
```

A champion cannot be banned if it has already been picked in the same draft.

---

# 16. DraftPick Model

## 16.1 Purpose

The `DraftPick` model stores champions picked by both teams.

The pick phase is live and can update after every pick.

## 16.2 Fields

```txt id="8bnvs6"
id
draftSessionId
userId
championId
teamSide
role
playerSlot
orderIndex
isUserPick
createdAt
updatedAt
deletedAt
```

## 16.3 Field Notes

| Field          | Type     | Required | Notes                               |
| -------------- | -------- | -------: | ----------------------------------- |
| id             | UUID     |      Yes | Primary key                         |
| draftSessionId | UUID     |      Yes | Parent draft session                |
| userId         | UUID     |      Yes | Owner user                          |
| championId     | UUID     |      Yes | Picked champion                     |
| teamSide       | TeamSide |      Yes | MY_TEAM or ENEMY                    |
| role           | GameRole |       No | Role for this pick                  |
| playerSlot     | Integer  |       No | Slot 1 to 5                         |
| orderIndex     | Integer  |       No | Pick order                          |
| isUserPick     | Boolean  |      Yes | True if this is the user's champion |
| createdAt      | DateTime |      Yes | Created timestamp                   |
| updatedAt      | DateTime |      Yes | Updated timestamp                   |
| deletedAt      | DateTime |       No | Soft delete timestamp               |

## 16.4 Relationships

```txt id="opuwgr"
DraftPick belongs to DraftSession.
DraftPick belongs to User.
DraftPick belongs to Champion.
```

## 16.5 Pick Rule

A champion cannot be picked twice in the same draft.

```txt id="81womx"
unique(draftSessionId, championId)
```

A champion cannot be picked if it has already been banned in the same draft.

Only one pick should be marked as the user's pick.

```txt id="8ccvec"
Only one DraftPick should have isUserPick = true for each DraftSession.
```

---

# 17. RecommendationResult Model

## 17.1 Purpose

The `RecommendationResult` model stores results from the scoring engine.

This model tracks what the app recommended during the draft.

Examples:

```txt id="5mmgz8"
Ban recommendation
Pick recommendation
Team composition analysis
```

## 17.2 Fields

```txt id="qd6axa"
id
draftSessionId
userId
patchId
type
status
inputSnapshot
resultItems
scoreBreakdown
reasonCodes
confidence
aiExplanationId
createdAt
updatedAt
deletedAt
```

## 17.3 Field Notes

| Field           | Type                 | Required | Notes                         |
| --------------- | -------------------- | -------: | ----------------------------- |
| id              | UUID                 |      Yes | Primary key                   |
| draftSessionId  | UUID                 |      Yes | Parent draft session          |
| userId          | UUID                 |      Yes | Owner user                    |
| patchId         | UUID                 |      Yes | Patch used for recommendation |
| type            | RecommendationType   |      Yes | BAN, PICK, TEAM_COMPOSITION   |
| status          | RecommendationStatus |      Yes | Succeeded, failed, etc.       |
| inputSnapshot   | JSON                 |      Yes | Draft state used for scoring  |
| resultItems     | JSON                 |      Yes | Ranked recommendation output  |
| scoreBreakdown  | JSON                 |       No | Score details                 |
| reasonCodes     | JSON                 |       No | Machine-readable reason codes |
| confidence      | ConfidenceLevel      |       No | Low, medium, high             |
| aiExplanationId | UUID                 |       No | Optional AI explanation       |
| createdAt       | DateTime             |      Yes | Created timestamp             |
| updatedAt       | DateTime             |      Yes | Updated timestamp             |
| deletedAt       | DateTime             |       No | Soft delete timestamp         |

## 17.4 Recommendation Type Enum

```txt id="mm1riw"
BAN
PICK
TEAM_COMPOSITION
```

## 17.5 Recommendation Status Enum

```txt id="j8hh0j"
QUEUED
RUNNING
SUCCEEDED
FAILED
CANCELED
```

## 17.6 Relationships

```txt id="qj9238"
RecommendationResult belongs to DraftSession.
RecommendationResult belongs to User.
RecommendationResult belongs to Patch.
RecommendationResult can have one AIExplanation.
```

## 17.7 Recommendation Storage Rule

Recommendation results should be stored with an input snapshot.

Reason:

```txt id="uo6soq"
The app should remember what the draft looked like when the recommendation was generated.
```

---

# 18. ItemBuildRecommendation Model

## 18.1 Purpose

The `ItemBuildRecommendation` model stores item build suggestions for the user's selected champion.

Item builds depend on:

```txt id="dlsvrx"
selected champion
enemy picks
team picks
patch item data
game plan
```

## 18.2 Fields

```txt id="ujqfvw"
id
draftSessionId
userId
patchId
championId
gamePlan
coreItems
situationalItems
boots
enchant
warnings
scoreBreakdown
reasonCodes
aiExplanationId
createdAt
updatedAt
deletedAt
```

## 18.3 Field Notes

| Field            | Type     | Required | Notes                               |
| ---------------- | -------- | -------: | ----------------------------------- |
| id               | UUID     |      Yes | Primary key                         |
| draftSessionId   | UUID     |      Yes | Parent draft session                |
| userId           | UUID     |      Yes | Owner user                          |
| patchId          | UUID     |      Yes | Patch used for item data            |
| championId       | UUID     |      Yes | Champion receiving the build        |
| gamePlan         | GamePlan |       No | Standard, anti-tank, safe, burst    |
| coreItems        | JSON     |      Yes | Main item list                      |
| situationalItems | JSON     |       No | Conditional item options            |
| boots            | JSON     |       No | Boots recommendation                |
| enchant          | JSON     |       No | Enchant recommendation              |
| warnings         | JSON     |       No | Anti-heal, anti-shield, CC warnings |
| scoreBreakdown   | JSON     |       No | Item scoring details                |
| reasonCodes      | JSON     |       No | Machine-readable reason codes       |
| aiExplanationId  | UUID     |       No | Optional AI explanation             |
| createdAt        | DateTime |      Yes | Created timestamp                   |
| updatedAt        | DateTime |      Yes | Updated timestamp                   |
| deletedAt        | DateTime |       No | Soft delete timestamp               |

## 18.4 Game Plan Enum

```txt id="ruv7iq"
STANDARD
BURST
SAFE
ANTI_TANK
ANTI_HEAL
ANTI_SHIELD
SURVIVE_DIVE
SCALING
UNKNOWN
```

## 18.5 Relationships

```txt id="d0qsw9"
ItemBuildRecommendation belongs to DraftSession.
ItemBuildRecommendation belongs to User.
ItemBuildRecommendation belongs to Patch.
ItemBuildRecommendation belongs to Champion.
ItemBuildRecommendation can have one AIExplanation.
```

## 18.6 Item Build Rule

Item build recommendations should use patch item data.

Main rule:

```txt id="dv8j1u"
AI can explain items, but it should not invent item stats.
```

---

# 19. MatchupNote Model

## 19.1 Purpose

The `MatchupNote` model stores user notes about specific champion matchups.

A matchup note can be global or linked to a draft session.

## 19.2 Fields

```txt id="kl7wz1"
id
userId
draftSessionId
myChampionId
enemyChampionId
role
title
notes
createdAt
updatedAt
archivedAt
deletedAt
```

## 19.3 Field Notes

| Field           | Type     | Required | Notes                  |
| --------------- | -------- | -------: | ---------------------- |
| id              | UUID     |      Yes | Primary key            |
| userId          | UUID     |      Yes | Owner user             |
| draftSessionId  | UUID     |       No | Optional related draft |
| myChampionId    | UUID     |      Yes | User's champion        |
| enemyChampionId | UUID     |      Yes | Enemy champion         |
| role            | GameRole |      Yes | Role for this matchup  |
| title           | String   |      Yes | Note title             |
| notes           | Text     |      Yes | User's matchup notes   |
| createdAt       | DateTime |      Yes | Created timestamp      |
| updatedAt       | DateTime |      Yes | Updated timestamp      |
| archivedAt      | DateTime |       No | Archive timestamp      |
| deletedAt       | DateTime |       No | Soft delete timestamp  |

## 19.4 Relationships

```txt id="m5ei25"
MatchupNote belongs to User.
MatchupNote can belong to DraftSession.
MatchupNote references my Champion.
MatchupNote references enemy Champion.
```

## 19.5 Matchup Note Rule

A matchup note should be reusable across drafts.

Draft-linked notes are useful for post-game review.

---

# 20. MatchResult Model

## 20.1 Purpose

The `MatchResult` model stores the final result after a draft.

This lets the app compare recommendations against outcomes.

## 20.2 Fields

```txt id="sadj7s"
id
draftSessionId
userId
result
myChampionId
kills
deaths
assists
notes
createdAt
updatedAt
deletedAt
```

## 20.3 Field Notes

| Field          | Type        | Required | Notes                    |
| -------------- | ----------- | -------: | ------------------------ |
| id             | UUID        |      Yes | Primary key              |
| draftSessionId | UUID        |      Yes | Related draft session    |
| userId         | UUID        |      Yes | Owner user               |
| result         | MatchResult |      Yes | Win, loss, or unknown    |
| myChampionId   | UUID        |       No | Champion actually played |
| kills          | Integer     |       No | Optional kill count      |
| deaths         | Integer     |       No | Optional death count     |
| assists        | Integer     |       No | Optional assist count    |
| notes          | Text        |       No | User notes after match   |
| createdAt      | DateTime    |      Yes | Created timestamp        |
| updatedAt      | DateTime    |      Yes | Updated timestamp        |
| deletedAt      | DateTime    |       No | Soft delete timestamp    |

## 20.4 Match Result Enum

```txt id="av98nk"
WIN
LOSS
UNKNOWN
```

## 20.5 Relationships

```txt id="pi3ryh"
MatchResult belongs to DraftSession.
MatchResult belongs to User.
MatchResult can reference Champion.
```

## 20.6 Unique Rule

One draft session should only have one match result.

```txt id="rng8iy"
unique(draftSessionId)
```

---

# 21. DraftReview Model

## 21.1 Purpose

The `DraftReview` model stores post-game draft analysis.

It summarizes:

```txt id="i9hlo2"
what was recommended
what the user picked
what items were suggested
what happened in the match
what can improve next time
```

## 21.2 Fields

```txt id="thg7tm"
id
draftSessionId
userId
summary
whatWentWell
whatToImprove
recommendationAccuracy
aiSummary
createdAt
updatedAt
deletedAt
```

## 21.3 Field Notes

| Field                  | Type     | Required | Notes                             |
| ---------------------- | -------- | -------: | --------------------------------- |
| id                     | UUID     |      Yes | Primary key                       |
| draftSessionId         | UUID     |      Yes | Related draft session             |
| userId                 | UUID     |      Yes | Owner user                        |
| summary                | JSON     |      Yes | Draft result summary              |
| whatWentWell           | JSON     |       No | Positive draft notes              |
| whatToImprove          | JSON     |       No | Improvement notes                 |
| recommendationAccuracy | JSON     |       No | Whether user followed suggestions |
| aiSummary              | Text     |       No | Optional AI-generated summary     |
| createdAt              | DateTime |      Yes | Created timestamp                 |
| updatedAt              | DateTime |      Yes | Updated timestamp                 |
| deletedAt              | DateTime |       No | Soft delete timestamp             |

## 21.4 Relationships

```txt id="ysrbhs"
DraftReview belongs to DraftSession.
DraftReview belongs to User.
```

## 21.5 Review Rule

A full draft review should require a match result.

Recommended rule:

```txt id="vqhgga"
DraftSession should be completed.
MatchResult should exist.
Recommendation history should be used if available.
```

---

# 22. AIExplanation Model

## 22.1 Purpose

The `AIExplanation` model stores AI-generated explanations for recommendations and draft reviews.

AI explanations are support content.

They are not the source of truth.

## 22.2 Fields

```txt id="yf096b"
id
userId
draftSessionId
sourceType
sourceId
style
language
input
summary
createdAt
updatedAt
deletedAt
```

## 22.3 Field Notes

| Field          | Type                | Required | Notes                            |
| -------------- | ------------------- | -------: | -------------------------------- |
| id             | UUID                |      Yes | Primary key                      |
| userId         | UUID                |      Yes | Owner user                       |
| draftSessionId | UUID                |       No | Optional related draft           |
| sourceType     | AIExplanationSource |      Yes | What this explanation belongs to |
| sourceId       | UUID                |      Yes | Source record ID                 |
| style          | ExplanationStyle    |       No | Short, detailed, coaching        |
| language       | String              |       No | Example: en, vi                  |
| input          | JSON                |      Yes | Safe input sent to AI            |
| summary        | Text                |      Yes | AI explanation text              |
| createdAt      | DateTime            |      Yes | Created timestamp                |
| updatedAt      | DateTime            |      Yes | Updated timestamp                |
| deletedAt      | DateTime            |       No | Soft delete timestamp            |

## 22.4 AI Explanation Source Enum

```txt id="1r0ag9"
RECOMMENDATION_RESULT
ITEM_BUILD_RECOMMENDATION
DRAFT_REVIEW
MANUAL
```

## 22.5 Explanation Style Enum

```txt id="gdaqmm"
SHORT
DETAILED
COACHING
BEGINNER_FRIENDLY
```

## 22.6 Relationships

```txt id="9ok2zb"
AIExplanation belongs to User.
AIExplanation can belong to DraftSession.
AIExplanation can explain RecommendationResult.
AIExplanation can explain ItemBuildRecommendation.
AIExplanation can explain DraftReview.
```

## 22.7 AI Explanation Rule

AI explanation should not change the recommendation score.

Main rule:

```txt id="zjl6x5"
AI explains the result.
AI does not decide the result.
```

---

# 23. Shared Enums

Some enums are used across multiple models.

## 23.1 GameRole

```txt id="5rklw3"
BARON
JUNGLE
MID
DRAGON
SUPPORT
UNKNOWN
```

Used by:

```txt id="zz9d8p"
Champion
ChampionPoolEntry
DraftSession
DraftPick
MatchupNote
```

## 23.2 TeamSide

```txt id="8d9kpm"
MY_TEAM
ENEMY
UNKNOWN
```

Used by:

```txt id="geqxz4"
DraftBan
DraftPick
```

## 23.3 DamageType

```txt id="85oapm"
PHYSICAL
MAGIC
MIXED
TRUE_DAMAGE
UTILITY
UNKNOWN
```

Used by:

```txt id="3wbphb"
Champion
ChampionSkill
```

## 23.4 RangeType

```txt id="5lz66u"
MELEE
RANGED
HYBRID
UNKNOWN
```

Used by:

```txt id="s4t127"
Champion
```

## 23.5 Difficulty

```txt id="mjxigf"
LOW
MEDIUM
HIGH
VERY_HIGH
UNKNOWN
```

Used by:

```txt id="ifzcyc"
Champion
```

## 23.6 ItemCategory

```txt id="dass82"
PHYSICAL
MAGIC
DEFENSE
BOOTS
ENCHANT
SUPPORT
JUNGLE
UTILITY
UNKNOWN
```

Used by:

```txt id="5zt08j"
Item
```

## 23.7 ConfidenceLevel

```txt id="1fapja"
LOW
MEDIUM
HIGH
UNKNOWN
```

Used by:

```txt id="qfezpg"
RecommendationResult
```

---

# 24. Relationship Rules

## 24.1 User Ownership

Every user-created record should include `userId`.

This makes authorization simple.

```txt id="ois9dq"
Record.userId must match the logged-in user.
```

User-owned records include:

```txt id="of8e19"
ChampionPool
ChampionPoolEntry
DraftSession
DraftBan
DraftPick
RecommendationResult
ItemBuildRecommendation
MatchupNote
MatchResult
DraftReview
AIExplanation
```

## 24.2 Patch Data Ownership

Patch data is not owned by a normal user.

Patch data belongs to the system.

Patch data includes:

```txt id="m36tb3"
Patch
Champion
ChampionPatchStat
ChampionSkill
Item
ItemPatchStat
```

## 24.3 Draft Child Records

Most draft-related records must belong to a draft session.

Required draft relationship:

```txt id="gxjkcu"
DraftBan.draftSessionId
DraftPick.draftSessionId
RecommendationResult.draftSessionId
ItemBuildRecommendation.draftSessionId
MatchResult.draftSessionId
DraftReview.draftSessionId
```

Optional draft relationship:

```txt id="t8cv7f"
MatchupNote.draftSessionId
AIExplanation.draftSessionId
```

## 24.4 Deleting a Draft Session

For MVP, deleting a draft session should soft delete the draft.

Recommended behavior:

```txt id="ev0gyy"
Set DraftSession.deletedAt.
Hide draft from normal views.
Keep child records for possible restore.
```

Do not hard delete child records by default.

## 24.5 Archiving

Archiving is different from deleting.

```txt id="m0gfoz"
Archive = keep the record, but remove it from active workflow.
Delete = remove it from normal use.
```

---

# 25. Lifecycle Summary

## 25.1 Draft Session Lifecycle

```txt id="qsitt0"
SETUP
→ BAN_PREP
→ BAN_ENTRY
→ LIVE_PICK
→ COMPLETED
→ REVIEW
```

Additional phase:

```txt id="zhc64r"
ARCHIVED
```

## 25.2 Draft Status Lifecycle

```txt id="ppz3sq"
ACTIVE
→ COMPLETED
```

Additional statuses:

```txt id="g0a6pn"
ARCHIVED
DELETED
```

## 25.3 Recommendation Lifecycle

```txt id="ps7rgi"
QUEUED
→ RUNNING
→ SUCCEEDED
```

or

```txt id="qbp9f3"
QUEUED
→ RUNNING
→ FAILED
```

Additional status:

```txt id="1400nw"
CANCELED
```

## 25.4 Match Result Lifecycle

```txt id="u62wu1"
UNKNOWN
→ WIN
```

or

```txt id="ia845t"
UNKNOWN
→ LOSS
```

## 25.5 Draft Review Lifecycle

```txt id="kszqgo"
Draft completed
→ Match result saved
→ Review generated
→ Review updated if user adds notes
```

---

# 26. MVP Database Tables

The first database version should include these tables:

```txt id="9cnxwv"
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

---

# 27. Suggested Prisma Model Names

Recommended Prisma model names:

```txt id="kb1zdh"
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
MatchupNote
MatchResult
DraftReview
AIExplanation
```

Recommended enum names:

```txt id="f0ggxm"
GameRole
TeamSide
DamageType
RangeType
Difficulty
ItemCategory
DraftPhase
DraftStatus
QueueType
RecommendationType
RecommendationStatus
ConfidenceLevel
GamePlan
MatchResultType
AIExplanationSource
ExplanationStyle
SkillSlot
```

---

# 28. Suggested Indexes

Indexes should support common queries.

## 28.1 User Queries

```txt id="l68dqt"
users.email unique
```

## 28.2 Patch Data Queries

```txt id="n6sjcd"
patches.version unique
patches.isActive

champions.key unique
champions.name
champions.roles

champion_patch_stats.championId
champion_patch_stats.patchId
champion_patch_stats unique(championId, patchId)

champion_skills.championId
champion_skills.patchId
champion_skills unique(championId, patchId, slot)

items.key unique
items.name
items.category

item_patch_stats.itemId
item_patch_stats.patchId
item_patch_stats unique(itemId, patchId)
```

## 28.3 Champion Pool Queries

```txt id="3tyrcx"
champion_pools.userId unique

champion_pool_entries.userId
champion_pool_entries.championPoolId
champion_pool_entries.championId
champion_pool_entries.preferredRole
champion_pool_entries unique(userId, championId, preferredRole)
```

## 28.4 Draft Queries

```txt id="f14jeo"
draft_sessions.userId
draft_sessions.patchId
draft_sessions.role
draft_sessions.phase
draft_sessions.status
draft_sessions.createdAt

draft_bans.draftSessionId
draft_bans.userId
draft_bans.championId
draft_bans unique(draftSessionId, championId)

draft_picks.draftSessionId
draft_picks.userId
draft_picks.championId
draft_picks.teamSide
draft_picks.role
draft_picks unique(draftSessionId, championId)
```

## 28.5 Recommendation Queries

```txt id="3y803h"
recommendation_results.userId
recommendation_results.draftSessionId
recommendation_results.patchId
recommendation_results.type
recommendation_results.status
recommendation_results.createdAt

item_build_recommendations.userId
item_build_recommendations.draftSessionId
item_build_recommendations.patchId
item_build_recommendations.championId
item_build_recommendations.createdAt
```

## 28.6 Review and Notes Queries

```txt id="lut6m2"
matchup_notes.userId
matchup_notes.draftSessionId
matchup_notes.myChampionId
matchup_notes.enemyChampionId
matchup_notes.role

match_results.userId
match_results.draftSessionId unique
match_results.result

draft_reviews.userId
draft_reviews.draftSessionId unique

ai_explanations.userId
ai_explanations.draftSessionId
ai_explanations.sourceType
ai_explanations.sourceId
```

---

# 29. Authorization Rules

In MVP, authorization should be simple.

## 29.1 Main Rule

A logged-in user can only access records where:

```txt id="50nkxm"
record.userId === currentUser.id
```

## 29.2 Draft Child Rule

For draft child records, also check:

```txt id="c5y5j7"
record.draftSession.userId === currentUser.id
```

## 29.3 Champion Pool Rule

The user can only access champion pool entries if:

```txt id="mft2vu"
championPool.userId === currentUser.id
```

## 29.4 Recommendation Rule

The user can only view recommendation results if:

```txt id="fb41tx"
recommendationResult.userId === currentUser.id
```

## 29.5 AI Explanation Rule

The user can only view AI explanations if:

```txt id="g3fnv0"
aiExplanation.userId === currentUser.id
```

## 29.6 Patch Data Rule

Normal users can read patch data.

Normal users should not update patch data in MVP.

---

# 30. Patch Data Rules

Patch data should be manually maintained in MVP.

## 30.1 Patch Creation Rule

When creating a new patch:

```txt id="0qi8f0"
Create Patch record.
Copy champion patch stats from previous patch.
Copy item patch stats from previous patch.
Update changed values manually.
Mark new patch active only after data is reviewed.
```

## 30.2 Old Draft Rule

Old drafts should not change when active patch changes.

```txt id="3nrqbh"
DraftSession.patchId should point to the patch used at draft creation time.
```

## 30.3 Champion Data Rule

Champion identity data can stay stable.

Patch-specific values should go into:

```txt id="iqoc27"
ChampionPatchStat
ChampionSkill
```

## 30.4 Item Data Rule

Item identity data can stay stable.

Patch-specific values should go into:

```txt id="8g4dgx"
ItemPatchStat
```

---

# 31. Recommendation Data Rules

Recommendation features should use structured input and output.

## 31.1 Recommendation Input

Recommendation input should include:

```txt id="sya643"
draftSessionId
userId
patchId
role
intendedChampionId
championPool
currentBans
teamPicks
enemyPicks
availableChampions
availableItems
extraContext
```

## 31.2 Recommendation Output

Recommendation output should be stored as JSON.

Example:

```json id="j9e3l3"
{
  "items": [
    {
      "championId": "champion_orianna",
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

## 31.3 Recommendation Safety Rule

Recommendation output should be explainable.

```txt id="c1k8dx"
Each recommendation should include score, score breakdown, reason codes, and confidence.
```

## 31.4 Recommendation History Rule

Recommendation results should be saved.

Reason:

```txt id="c74zsi"
Draft review should know what the app recommended during draft.
```

---

# 32. AI Data Rules

AI features should use structured input and output.

## 32.1 AI Input

AI input should include:

```txt id="trq8pd"
recommendation result
score breakdown
reason codes
safe draft context
safe champion names
safe item names
```

AI input should not include:

```txt id="slo39j"
passwords
tokens
API keys
database URLs
private environment variables
unneeded user data
```

## 32.2 AI Output

AI output should be stored as text or JSON.

Example:

```json id="9bdi3q"
{
  "summary": "Orianna is recommended because she gives your team safe wave control and strong teamfight setup.",
  "warnings": ["Enemy team still has strong dive threat."]
}
```

## 32.3 AI Safety Rule

AI output should not be trusted as source-of-truth game data.

```txt id="thpznf"
AI output explains known data.
AI output does not create patch data.
AI output does not change recommendation scores.
```

---

# 33. Open Questions

These questions should be answered before final schema implementation.

## 33.1 JSON vs Child Tables

Some fields can be stored as JSON first.

Examples:

```txt id="lqpnrl"
tags
strengths
weaknesses
scalingProfile
laneProfile
teamFightProfile
scoreBreakdown
reasonCodes
coreItems
situationalItems
warnings
recommendationAccuracy
```

Recommended MVP answer:

```txt id="kl8r21"
Use JSON for flexible scoring and list-style fields in MVP.
Create child tables later only if filtering or reporting needs increase.
```

## 33.2 Item Build Structure

Should item builds store item IDs in JSON or use a child table?

Recommended MVP answer:

```txt id="xsg7av"
Store coreItems and situationalItems as JSON first.
Move to ItemBuildItem table later if build analytics becomes important.
```

## 33.3 Champion Matchup Data

Should champion matchup rules be a full table?

Recommended MVP answer:

```txt id="3nhbf5"
Use champion tags, counter tags, and scoring rules first.
Create ChampionMatchup table later if matchup data grows.
```

## 33.4 Patch Data Editing

Should patch data be editable in the app?

Recommended MVP answer:

```txt id="fd8ten"
No admin UI at first.
Use seed files and manual data files for MVP.
```

## 33.5 Activity Logs

Should Wise Rift include activity logs?

Recommended MVP answer:

```txt id="zhdjj7"
Not required for first MVP.
Draft history and review records are more useful first.
```

---

# 34. Future Data Model Ideas

These are not part of MVP.

## 34.1 Workspace and Team Support

Future models:

```txt id="300d2v"
Workspace
WorkspaceMember
Role
Invitation
```

## 34.2 Riot API Integration

Future models:

```txt id="u883n0"
RiotAccount
RiotMatch
RiotMatchParticipant
ImportedMatchHistory
```

## 34.3 Champion Matchup Database

Future models:

```txt id="ajxotn"
ChampionMatchup
ChampionSynergy
ChampionCounter
```

## 34.4 Item Build Templates

Future models:

```txt id="45ryjj"
ItemBuildTemplate
ItemBuildTemplateItem
```

## 34.5 Patch Change Log

Future models:

```txt id="lyng7c"
PatchChangeLog
ChampionPatchChange
ItemPatchChange
```

## 34.6 Notifications

Future model:

```txt id="0hst9t"
Notification
```

---

# 35. MVP Boundary

The MVP data model should support:

- one user account
- active patch loading
- manual patch data
- champion data
- champion patch stats
- champion skill data
- item data
- item patch stats
- champion pool
- draft session
- draft bans
- draft picks
- ban recommendations
- pick recommendations
- team composition analysis
- item build recommendations
- matchup notes
- match result
- draft review
- AI explanations

The MVP data model should not support yet:

- teams
- billing
- Riot API sync
- automatic patch scraping
- ranked match history import
- public draft rooms
- live in-game data
- advanced combat simulation
- full analytics dashboard
- mobile offline sync
- complex role permissions

---

# 36. Final Data Model Summary

The first Wise Rift data model is centered around draft sessions.

```txt id="ltphzi"
User
→ Champion Pool
→ Draft Session
→ Bans
→ Picks
→ Recommendations
→ Match Result
→ Draft Review
```

Patch data sits beside the draft workflow:

```txt id="jtdvn5"
Patch
→ Champion Data
→ Item Data
→ Scoring Rules
```

AI and recommendation support records sit around this workflow:

```txt id="5v13l0"
RecommendationResult
ItemBuildRecommendation
AIExplanation
MatchupNote
```

This data model supports the full Wise Rift loop:

```txt id="glf1zb"
Prepare
→ Draft
→ Recommend
→ Build
→ Review
→ Improve
```
