# Wise Rift - Patch Data Architecture

This document defines the first patch data strategy for **Wise Rift**.

The goal of this document is to explain how Wise Rift stores, updates, validates, seeds, and uses Wild Rift patch data.

Wise Rift depends on patch data because ban recommendations, pick recommendations, team composition analysis, and item build suggestions should be based on the correct game version.

The core rule is:

```txt
Manual patch data is the source of truth.
AI should not invent champion numbers, item stats, or patch changes.
```

---

# 1. Purpose

The purpose of this document is to define:

- patch data principles
- patch version rules
- champion data structure
- champion skill data structure
- item data structure
- item stat data structure
- seed data strategy
- manual update workflow
- validation rules
- scoring usage
- AI safety rules
- MVP boundary
- future patch data improvements

This document is not the final seed data.

It is the architecture guide for how patch data should be handled in the first MVP.

---

# 2. Patch Data Principles

Wise Rift should keep patch data clear, versioned, and easy to update.

## 2.1 Patch Data Is Source of Truth

Patch data controls game-related information.

Patch data includes:

```txt
champion stats
champion skills
champion roles
champion tags
champion strengths
champion weaknesses
item stats
item effects
item tags
item categories
counter tags
synergy tags
meta scores
```

Main rule:

```txt
The app should trust patch data, not AI guesses.
```

## 2.2 Manual Data First

For MVP, patch data will be maintained manually.

Reason:

```txt
Automatic patch scraping is out of scope for MVP.
```

This keeps the MVP realistic for one developer.

The user can manually update changed champions and items when a new patch comes out.

## 2.3 Patch-Versioned Data

Patch-specific values should be tied to a patch.

Example:

```txt
Akali in Patch 6.1
Akali in Patch 6.2
```

This matters because a champion can be buffed, nerfed, or changed between patches.

## 2.4 Old Drafts Must Stay Stable

Old draft sessions should keep using the patch they were created with.

Main rule:

```txt
DraftSession.patchId should not change after creation.
```

If the active patch changes later, old draft reviews should still use the old patch data.

## 2.5 AI Does Not Create Patch Data

AI can explain known patch data.

AI should not create or modify patch data.

Main rule:

```txt
AI explains.
Patch data decides.
Scoring engine calculates.
```

---

# 3. High-Level Patch Data Flow

## 3.1 Main Flow

```txt
Create Patch
→ Copy previous patch data
→ Update changed champions manually
→ Update changed items manually
→ Validate patch data
→ Seed database
→ Mark patch as active
→ Use active patch for new draft sessions
→ Keep old patch data for old draft sessions
```

## 3.2 Runtime Flow

```txt
User starts draft session
→ Backend loads active patch
→ DraftSession stores patchId
→ Backend loads champion and item data for that patch
→ Recommendation engine scores using that patch data
→ RecommendationResult stores patchId and input snapshot
→ DraftReview uses the same patch data later
```

---

# 4. Patch Data Storage Strategy

Wise Rift should store patch data in two places during MVP:

```txt
data files
PostgreSQL database
```

## 4.1 Data Files

Data files are useful for:

```txt
manual editing
reviewing changes
seed scripts
version control
pull request review
easy rollback
```

Recommended folder:

```txt
data/
├─ patches/
├─ champions/
├─ items/
└─ seed/
```

## 4.2 Database

Database records are useful for:

```txt
API queries
recommendation requests
draft history
patch-aware scoring
old draft review
```

Recommended database tables:

```txt
patches
champions
champion_patch_stats
champion_skills
items
item_patch_stats
```

## 4.3 Source of Truth During Development

For MVP development, the source of truth should be:

```txt
manual data files
```

Then seed scripts copy this data into PostgreSQL.

Recommended rule:

```txt
Edit data files first.
Run seed script.
Do not manually edit production database rows unless needed.
```

---

# 5. Folder Structure

Recommended patch data folder structure:

```txt
data/
├─ patches/
│  ├─ patch-6.1.json
│  └─ patch-6.2.json
│
├─ champions/
│  ├─ akali.json
│  ├─ ahri.json
│  ├─ orianna.json
│  ├─ viktor.json
│  └─ yasuo.json
│
├─ items/
│  ├─ ludens-echo.json
│  ├─ rabadons-deathcap.json
│  ├─ infinity-orb.json
│  ├─ void-staff.json
│  └─ stasis-enchant.json
│
└─ seed/
   ├─ seed-patches.ts
   ├─ seed-champions.ts
   ├─ seed-items.ts
   ├─ seed-matchups.ts
   └─ validate-patch-data.ts
```

---

# 6. Patch File Structure

## 6.1 Patch File Purpose

Patch files store patch-level metadata.

Example file:

```txt
data/patches/patch-6.1.json
```

## 6.2 Patch File Example

```json
{
  "version": "6.1",
  "name": "Patch 6.1",
  "notes": "Initial MVP patch data.",
  "isActive": true,
  "releasedAt": "2026-01-10T00:00:00.000Z"
}
```

## 6.3 Patch Fields

```txt
version
name
notes
isActive
releasedAt
```

## 6.4 Patch Rules

```txt
version is required
version must be unique
name is required
only one patch should be active
releasedAt is optional
notes are optional
```

---

# 7. Champion Data Structure

## 7.1 Champion File Purpose

Champion files store stable champion identity and patch-specific champion data.

Example file:

```txt
data/champions/akali.json
```

## 7.2 Champion File Example

```json
{
  "key": "akali",
  "name": "Akali",
  "title": "The Rogue Assassin",
  "roles": ["MID", "BARON"],
  "damageType": "MAGIC",
  "rangeType": "MELEE",
  "difficulty": "HIGH",
  "tags": ["ASSASSIN", "MOBILITY", "BURST", "SNOWBALL"],
  "strengths": ["backline threat", "skirmish", "outplay", "side lane pressure"],
  "weaknesses": [
    "crowd control",
    "early wave control",
    "true sight",
    "point-and-click lockdown"
  ],
  "patchStats": {
    "6.1": {
      "baseHealth": 650,
      "baseMana": null,
      "baseArmor": 35,
      "baseMagicResist": 38,
      "baseAttackDamage": 58,
      "baseAbilityPower": 0,
      "attackSpeed": null,
      "moveSpeed": null,
      "metaScore": 76,
      "scalingProfile": {
        "early": 55,
        "mid": 85,
        "late": 70
      },
      "laneProfile": {
        "lanePressure": 55,
        "waveClear": 45,
        "safety": 60,
        "roaming": 85
      },
      "teamFightProfile": {
        "engage": 45,
        "followUp": 80,
        "peel": 20,
        "backlineThreat": 90
      }
    }
  }
}
```

## 7.3 Stable Champion Fields

Stable champion fields:

```txt
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
```

These fields usually do not change often.

## 7.4 Patch-Specific Champion Fields

Patch-specific champion fields:

```txt
baseHealth
baseMana
baseArmor
baseMagicResist
baseAttackDamage
baseAbilityPower
attackSpeed
moveSpeed
metaScore
scalingProfile
laneProfile
teamFightProfile
```

These fields can change by patch.

## 7.5 Champion Data Rule

Stable data belongs to:

```txt
Champion
```

Patch-specific data belongs to:

```txt
ChampionPatchStat
```

---

# 8. Champion Skill Data Structure

## 8.1 Skill Data Purpose

Champion skill data helps the scoring engine understand what each champion can do.

Skill data should include:

```txt
damage
crowd control
mobility
shield
heal
poke
burst
engage
disengage
scaling
cooldown
range
```

## 8.2 Skill Data Example

```json
{
  "skills": {
    "6.1": [
      {
        "slot": "PASSIVE",
        "name": "Assassin's Mark",
        "description": "Akali marks enemy champions after damaging them with abilities.",
        "damageType": "MAGIC",
        "cooldown": null,
        "cost": null,
        "range": null,
        "scaling": {
          "abilityPower": true,
          "attackDamage": true
        },
        "effects": ["DAMAGE", "EMPOWERED_ATTACK"],
        "tags": ["BURST", "TRADE_PATTERN"]
      },
      {
        "slot": "Q",
        "name": "Five Point Strike",
        "description": "Akali throws kunai in a cone, dealing magic damage.",
        "damageType": "MAGIC",
        "cooldown": {
          "values": [1.5]
        },
        "cost": {
          "type": "ENERGY",
          "values": [120, 100, 80, 60]
        },
        "range": {
          "type": "CONE",
          "value": 500
        },
        "scaling": {
          "abilityPower": true,
          "attackDamage": true
        },
        "effects": ["DAMAGE", "SLOW"],
        "tags": ["POKE", "WAVE_CLEAR", "TRADE_PATTERN"]
      }
    ]
  }
}
```

## 8.3 Skill Fields

```txt
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
```

## 8.4 Skill Slot Enum

```txt
PASSIVE
Q
W
E
R
```

## 8.5 Skill Effects

Example skill effects:

```txt
DAMAGE
SLOW
ROOT
STUN
KNOCK_UP
CHARM
SILENCE
DASH
BLINK
SHIELD
HEAL
STEALTH
UNTARGETABLE
EXECUTE
EMPOWERED_ATTACK
```

## 8.6 Skill Tags

Example skill tags:

```txt
BURST
POKE
WAVE_CLEAR
MOBILITY
ENGAGE
DISENGAGE
PEEL
PICK_TOOL
TEAMFIGHT
SKIRMISH
SUSTAIN
SURVIVE_DIVE
```

## 8.7 Skill Data Rule

Skill data should be manually maintained by patch.

Main rule:

```txt
Do not let AI create skill numbers.
```

---

# 9. Item Data Structure

## 9.1 Item File Purpose

Item files store stable item identity and patch-specific item stats.

Example file:

```txt
data/items/void-staff.json
```

## 9.2 Item File Example

```json
{
  "key": "void-staff",
  "name": "Void Staff",
  "category": "MAGIC",
  "tags": ["MAGIC_PENETRATION", "ANTI_MAGIC_RESIST", "ANTI_TANK"],
  "goodAgainst": ["HIGH_MAGIC_RESIST", "TANKS", "BRUISERS"],
  "weakAgainst": ["SQUISHY_LOW_RESIST_TARGETS"],
  "patchStats": {
    "6.1": {
      "cost": 2800,
      "abilityPower": 90,
      "attackDamage": null,
      "armor": null,
      "magicResist": null,
      "health": null,
      "mana": null,
      "abilityHaste": null,
      "critRate": null,
      "attackSpeed": null,
      "armorPenetration": null,
      "magicPenetration": 40,
      "magicPenetrationType": "PERCENT",
      "antiHealValue": null,
      "shieldPower": null,
      "effectDescription": "Provides magic penetration against enemies with magic resist."
    }
  }
}
```

## 9.3 Stable Item Fields

Stable item fields:

```txt
key
name
category
tags
goodAgainst
weakAgainst
```

## 9.4 Patch-Specific Item Fields

Patch-specific item fields:

```txt
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
magicPenetrationType
antiHealValue
shieldPower
effectDescription
```

## 9.5 Item Data Rule

Stable data belongs to:

```txt
Item
```

Patch-specific data belongs to:

```txt
ItemPatchStat
```

---

# 10. Item Tags

Item tags help the scoring engine recommend situational items.

## 10.1 Damage Item Tags

```txt
BURST
DPS
POKE
SCALING
MAGIC_PENETRATION
ARMOR_PENETRATION
CRIT
ATTACK_SPEED
ON_HIT
```

## 10.2 Defensive Item Tags

```txt
ARMOR
MAGIC_RESIST
HEALTH
SHIELD
STASIS
ANTI_BURST
ANTI_DIVE
TENACITY
```

## 10.3 Utility Item Tags

```txt
ANTI_HEAL
ANTI_SHIELD
SLOW
SPEED
COOLDOWN
MANA
SUPPORT
VISION
```

## 10.4 Counter Tags

```txt
ANTI_TANK
ANTI_ASSASSIN
ANTI_MAGE
ANTI_MARKSMAN
ANTI_SUSTAIN
ANTI_CROWD_CONTROL
```

---

# 11. Champion Tags

Champion tags help ban, pick, matchup, and team composition scoring.

## 11.1 Class Tags

```txt
ASSASSIN
MAGE
MARKSMAN
TANK
BRUISER
SUPPORT
ENCHANTER
FIGHTER
CONTROLLER
```

## 11.2 Playstyle Tags

```txt
BURST
POKE
DPS
SUSTAIN
SCALING
SNOWBALL
SPLIT_PUSH
TEAMFIGHT
SKIRMISH
PICK
ROAM
WAVE_CLEAR
```

## 11.3 Utility Tags

```txt
CROWD_CONTROL
ENGAGE
DISENGAGE
PEEL
SHIELD
HEAL
MOBILITY
STEALTH
VISION
TRUE_DAMAGE
EXECUTE
```

## 11.4 Risk Tags

```txt
IMMOBILE
SQUISHY
WEAK_EARLY
WEAK_LATE
HARD_TO_PLAY
NEEDS_SNOWBALL
LOW_WAVE_CLEAR
VULNERABLE_TO_CC
```

---

# 12. Matchup Data Strategy

## 12.1 MVP Matchup Approach

The MVP should not start with a full champion matchup database.

Reason:

```txt
A full matchup database is too large for the first version.
```

Recommended MVP approach:

```txt
Use champion tags, skill tags, lane profiles, and user notes first.
```

## 12.2 Matchup Rule Examples

Example rules:

```txt
melee assassin into strong ranged poke = lower lane score
immobile mage into heavy dive = lower safety score
scaling mage into low pressure lane = higher lane score
high mobility champion into skill-shot mage = higher outplay score
```

## 12.3 Future Matchup Tables

Future versions can add:

```txt
ChampionMatchup
ChampionCounter
ChampionSynergy
```

These are not required in MVP.

---

# 13. Seed Data Strategy

## 13.1 Seed Data Purpose

Seed data helps the app start with enough data to test the MVP.

MVP seed data should include:

```txt
one active patch
small champion dataset
small item dataset
champion patch stats
champion skill tags
item patch stats
basic tag data
```

## 13.2 Recommended MVP Champion Dataset

Start with mid lane champions first.

Example starter set:

```txt
Akali
Ahri
Orianna
Viktor
Yasuo
Zed
Lux
Katarina
Twisted Fate
Annie
```

MVP note:

```txt
The exact champion list can change later.
The goal is to test the system, not cover every champion first.
```

## 13.3 Recommended MVP Item Dataset

Start with common mid lane items first.

Example starter set:

```txt
Luden's Echo
Rabadon's Deathcap
Infinity Orb
Void Staff
Morellonomicon
Awakened Soulstealer
Riftmaker
Crown of the Shattered Queen
Stasis Enchant
Quicksilver Enchant
```

MVP note:

```txt
The exact item list can change later.
The goal is to support basic mage, assassin, anti-heal, anti-tank, and survival recommendations.
```

## 13.4 Seed Script Flow

Recommended seed script flow:

```txt
Load patch JSON files
→ Upsert Patch records
→ Load champion JSON files
→ Upsert Champion records
→ Upsert ChampionPatchStat records
→ Upsert ChampionSkill records
→ Load item JSON files
→ Upsert Item records
→ Upsert ItemPatchStat records
→ Validate seeded data
```

## 13.5 Upsert Rule

Seed scripts should use upsert.

Reason:

```txt
Running seed scripts multiple times should not create duplicate data.
```

---

# 14. Validation Strategy

## 14.1 Validation Purpose

Patch data should be validated before it is used for scoring.

Bad patch data can create bad recommendations.

## 14.2 Patch Validation Rules

```txt
patch version is required
patch version must be unique
only one patch should be active
active patch must have champion data
active patch must have item data
```

## 14.3 Champion Validation Rules

```txt
champion key is required
champion name is required
champion key must be unique
champion must have at least one role
champion must have damage type
champion must have range type
champion must have patch stats for active patch
metaScore should be between 0 and 100
```

## 14.4 Skill Validation Rules

```txt
skill must have championId
skill must have patchId
skill must have slot
skill must have name
skill must have description
skill slot should be unique per champion and patch
skill tags should use allowed values
```

## 14.5 Item Validation Rules

```txt
item key is required
item name is required
item key must be unique
item category is required
item must have patch stats for active patch
item tags should use allowed values
```

## 14.6 Scoring Validation Rules

Before scoring, validate:

```txt
draft has patchId
patch exists
champion pool exists if required
banned champions exist in patch data
picked champions exist in patch data
items exist in patch data
selected champion exists in patch data
```

---

# 15. Patch Update Workflow

## 15.1 New Patch Workflow

When a new Wild Rift patch comes out:

```txt
Create new patch file
Copy previous patch champion stats
Copy previous patch item stats
Update changed champions manually
Update changed items manually
Update changed skill text if needed
Update meta scores if needed
Run patch data validation
Run seed script
Run scoring tests
Mark new patch as active
```

## 15.2 Example Patch Update

Example:

```txt
Patch 6.1 is active.
Patch 6.2 comes out.
Create patch-6.2.json.
Copy champion patch stats from 6.1 to 6.2.
Update Akali if changed.
Update Viktor if changed.
Update Void Staff if changed.
Run validation.
Activate Patch 6.2.
```

## 15.3 Patch Activation Rule

Activating a new patch should not edit old draft sessions.

Correct behavior:

```txt
New draft sessions use Patch 6.2.
Old draft sessions keep Patch 6.1.
```

Wrong behavior:

```txt
Old draft sessions silently switch to Patch 6.2.
```

---

# 16. Scoring Usage

## 16.1 Ban Scoring Usage

Ban scoring should use patch data for:

```txt
meta score
counter tags
lane pressure
teamfight threat
snowball risk
intended champion counter risk
```

## 16.2 Pick Scoring Usage

Pick scoring should use patch data for:

```txt
meta score
lane profile
scaling profile
teamfight profile
damage type
champion tags
skill tags
comfort score
```

## 16.3 Team Composition Usage

Team composition should use patch data for:

```txt
damage type
champion tags
crowd control tags
engage tags
frontline tags
poke tags
scaling profile
teamfight profile
```

## 16.4 Item Build Usage

Item build scoring should use patch data for:

```txt
item stats
item tags
item effects
enemy damage types
enemy sustain tags
enemy shield tags
enemy tank tags
selected champion tags
```

---

# 17. Recommendation History Rule

Recommendation results should store:

```txt
patchId
inputSnapshot
resultItems
scoreBreakdown
reasonCodes
confidence
createdAt
```

Reason:

```txt
The app should know what was recommended at the time of the draft.
```

Example:

```json
{
  "patchId": "patch_61",
  "inputSnapshot": {
    "role": "MID",
    "teamPicks": ["champion_malphite"],
    "enemyPicks": ["champion_yasuo"],
    "bans": ["champion_zed"]
  },
  "resultItems": [
    {
      "championId": "champion_orianna",
      "totalScore": 87
    }
  ]
}
```

---

# 18. AI Safety Rules

## 18.1 AI Can Explain Patch Data

AI can say:

```txt
Void Staff is suggested because the enemy team has high magic resist.
```

AI should not say:

```txt
Void Staff gives a specific stat unless that stat exists in patch data.
```

## 18.2 AI Input Should Be Limited

AI input should include:

```txt
safe champion names
safe item names
score breakdown
reason codes
draft context
known patch data
```

AI input should not include:

```txt
passwords
tokens
API keys
database URLs
private environment variables
unneeded user data
```

## 18.3 AI Cannot Fill Missing Data

If patch data is missing, AI should not fill it.

Correct behavior:

```txt
Return warning.
Lower confidence.
Ask for manual patch data update.
```

Wrong behavior:

```txt
Ask AI to guess the missing champion or item stats.
```

---

# 19. Data Quality Levels

Patch data can have quality levels to help confidence scoring.

## 19.1 Quality Level Enum

```txt
COMPLETE
PARTIAL
MINIMAL
MISSING
```

## 19.2 Quality Meaning

```txt
COMPLETE = stats, skills, tags, and profiles exist
PARTIAL = most data exists but some details are missing
MINIMAL = only basic champion or item tags exist
MISSING = cannot use safely
```

## 19.3 Confidence Impact

```txt
COMPLETE = normal confidence
PARTIAL = reduce confidence slightly
MINIMAL = reduce confidence strongly
MISSING = exclude or return warning
```

MVP note:

```txt
Quality level can be added later if needed.
For first MVP, validation warnings are enough.
```

---

# 20. Testing Strategy

## 20.1 Patch Data Tests

Test patch data files for:

```txt
valid JSON
required fields
unique keys
valid enum values
active patch exists
only one active patch
champions have active patch stats
items have active patch stats
skills have valid slots
```

## 20.2 Seed Script Tests

Test seed scripts for:

```txt
patches are created
champions are created
champion patch stats are created
champion skills are created
items are created
item patch stats are created
running seed twice does not duplicate records
```

## 20.3 Scoring Tests

Test scoring with patch data:

```txt
ban scorer can load patch data
pick scorer can load patch data
item scorer can load patch item data
missing champion data lowers confidence
missing item data excludes item
old draft uses old patchId
```

## 20.4 Manual Review Checklist

Before activating a patch, check:

```txt
active patch has correct version
starter champions have stats
starter champions have tags
starter champions have skill tags
starter items have stats
starter items have tags
scoring tests pass
seed script runs cleanly
```

---

# 21. MVP Boundary

## 21.1 Included in MVP

The MVP patch data system should include:

```txt
manual patch files
one active patch
small champion dataset
small item dataset
champion identity data
champion patch stats
champion skill tags
item identity data
item patch stats
seed scripts
validation script
patch-aware draft sessions
patch-aware recommendation results
```

## 21.2 Excluded from MVP

The MVP patch data system should not include:

```txt
automatic patch scraping
Riot API sync
full champion roster
full item database
admin patch editor UI
global matchup database
real win rate data
rank-based statistics
automatic balance detection
AI-generated patch data
```

---

# 22. Future Improvements

Future versions can add:

```txt
admin patch editor
patch diff viewer
champion matchup table
champion synergy table
item build templates
automatic patch note importer
Riot API integration
manual review workflow
data quality dashboard
patch rollback tools
```

These should come after the first working MVP.

---

# 23. Open Questions

## 23.1 Should Patch Data Live Only in Database?

Recommended MVP answer:

```txt
No.
Keep JSON data files plus database seed.
```

Reason:

```txt
JSON files are easier to edit, review, and version with Git.
Database is better for runtime queries.
```

## 23.2 Should Every Champion Need Full Skill Numbers?

Recommended MVP answer:

```txt
No.
Start with skill tags and short descriptions.
Add exact numbers later.
```

Reason:

```txt
Full skill numbers are time-consuming to maintain.
Tags are enough for first recommendation logic.
```

## 23.3 Should Patch Data Include Meta Scores?

Recommended MVP answer:

```txt
Yes, but manually.
```

Reason:

```txt
Meta score helps scoring before real match data exists.
```

## 23.4 Should Patch Data Be Editable From The App?

Recommended MVP answer:

```txt
No.
Use JSON files and seed scripts first.
```

Reason:

```txt
An admin UI would slow down MVP development.
```

---

# 24. Final Patch Data Summary

Wise Rift should use manual patch-versioned data for MVP.

The core patch data flow is:

```txt
JSON data files
→ validation script
→ seed script
→ PostgreSQL
→ API
→ recommendation engine
→ draft review
```

Patch data should support:

```txt
champions
champion patch stats
champion skills
items
item patch stats
scoring tags
recommendation reasons
```

The most important patch data rule is:

```txt
Manual patch data is the source of truth.
AI should not invent champion numbers, item stats, or patch changes.
```

The second most important rule is:

```txt
Old draft sessions must keep their original patchId.
```
