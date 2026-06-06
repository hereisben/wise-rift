# Wise Rift - Game Data Model Architecture

This document defines the detailed game data model for **Wise Rift**.

The goal of this document is to explain what game data Wise Rift needs for champions, champion stats, skills, items, runes, summoner spells, builds, matchup tags, and scoring tags.

Wise Rift needs structured game data because the recommendation engine should not guess.

The core rule is:

```txt
Manual patch data is the source of truth.
AI should not invent champion numbers, item stats, rune effects, spell values, or patch changes.
```

---

# 1. Purpose

The purpose of this document is to define:

- champion identity data
- champion patch stats
- champion skill data
- champion skill effects
- item data
- item patch stats
- rune data
- summoner spell data
- champion build data
- matchup tags
- synergy tags
- team composition tags
- scoring tags
- validation rules
- MVP boundary
- future game data improvements

This document is not the final database schema.

It is the game data architecture guide for the first MVP.

---

# 2. Game Data Principles

Wise Rift should keep game data structured, patch-aware, and easy to update.

## 2.1 Game Data Must Be Patch-Aware

Champion numbers, item numbers, rune values, and spell values can change by patch.

Main rule:

```txt
Patch-specific values should be linked to a patch.
```

Example:

```txt
Akali in Patch 6.1
Akali in Patch 6.2
Void Staff in Patch 6.1
Void Staff in Patch 6.2
```

## 2.2 Stable Data and Patch Data Should Be Separate

Stable data changes less often.

Patch data changes more often.

Example:

```txt
Champion name = stable data
Champion base armor = patch data
Item name = stable data
Item ability power = patch data
Rune name = stable data
Rune effect value = patch data
```

## 2.3 Tags Are Important for MVP

The MVP will not have a full combat simulator.

Because of that, tags are important.

Tags help the scoring engine understand:

```txt
what a champion does
what an item counters
what a rune supports
what a spell helps with
what a team composition lacks
```

## 2.4 Exact Numbers Can Be Added Gradually

The first MVP does not need every exact value for every champion.

The MVP should start with:

```txt
small champion dataset
small item dataset
small rune dataset
small spell dataset
useful tags
basic patch stats
basic skill descriptions
```

Then more exact values can be added later.

## 2.5 AI Does Not Own Game Data

AI can explain known data.

AI should not create or modify game data.

Main rule:

```txt
AI explains known game data.
AI does not invent game data.
```

---

# 3. High-Level Game Data Overview

Wise Rift game data includes:

```txt
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
ChampionBuildProfile
ChampionMatchupTag
ChampionSynergyTag
```

MVP data flow:

```txt
Game data files
→ validation script
→ seed script
→ PostgreSQL
→ Backend API
→ Python recommendation service
→ Web and mobile UI
```

---

# 4. Recommended Game Data Folder Structure

Recommended folder structure:

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
│  ├─ void-staff.json
│  └─ stasis-enchant.json
│
├─ runes/
│  ├─ electrocute.json
│  ├─ conqueror.json
│  ├─ first-strike.json
│  └─ phase-rush.json
│
├─ summoner-spells/
│  ├─ flash.json
│  ├─ ignite.json
│  ├─ exhaust.json
│  └─ barrier.json
│
├─ builds/
│  ├─ akali-mid.json
│  ├─ ahri-mid.json
│  └─ viktor-mid.json
│
└─ seed/
   ├─ seed-patches.ts
   ├─ seed-champions.ts
   ├─ seed-items.ts
   ├─ seed-runes.ts
   ├─ seed-summoner-spells.ts
   ├─ seed-builds.ts
   └─ validate-game-data.ts
```

---

# 5. Champion Identity Data

## 5.1 Purpose

Champion identity data stores stable champion information.

This data does not usually change every patch.

## 5.2 Champion Fields

```txt
key
name
title
roles
damageType
rangeType
difficulty
resourceType
classTags
playstyleTags
utilityTags
riskTags
strengths
weaknesses
```

## 5.3 Champion Example

```json
{
  "key": "akali",
  "name": "Akali",
  "title": "The Rogue Assassin",
  "roles": ["MID", "BARON"],
  "damageType": "MAGIC",
  "rangeType": "MELEE",
  "difficulty": "HIGH",
  "resourceType": "ENERGY",
  "classTags": ["ASSASSIN"],
  "playstyleTags": ["BURST", "SNOWBALL", "SKIRMISH", "ROAM"],
  "utilityTags": ["MOBILITY", "STEALTH", "EXECUTE"],
  "riskTags": ["HARD_TO_PLAY", "VULNERABLE_TO_CC", "LOW_WAVE_CLEAR"],
  "strengths": ["backline threat", "strong skirmish", "high outplay potential"],
  "weaknesses": [
    "crowd control",
    "early wave control",
    "point-and-click lockdown"
  ]
}
```

## 5.4 Champion Identity Rules

```txt
key is required
key must be unique
name is required
at least one role is required
damageType is required
rangeType is required
difficulty is required
tags should use approved tag values
```

---

# 6. Champion Patch Stats

## 6.1 Purpose

Champion patch stats store numbers and profiles for a specific patch.

This lets old draft sessions stay accurate.

## 6.2 Champion Patch Stat Fields

```txt
patchVersion
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
dataQuality
```

## 6.3 Champion Patch Stat Example

```json
{
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
      },
      "dataQuality": "PARTIAL"
    }
  }
}
```

## 6.4 Profile Score Range

Profile scores should use a 0 to 100 range.

```txt
0 = very weak
50 = average
100 = very strong
```

## 6.5 Champion Patch Stat Rules

```txt
patchVersion is required
metaScore should be 0 to 100
profile scores should be 0 to 100
missing exact numbers are allowed in MVP
missing core tags should lower data quality
```

---

# 7. Champion Skill Data

## 7.1 Purpose

Champion skill data explains what each ability does.

This helps the scoring engine understand:

```txt
damage
crowd control
mobility
poke
burst
engage
disengage
peel
wave clear
survivability
```

## 7.2 Skill Fields

```txt
slot
name
description
damageType
targetType
cooldown
cost
range
scaling
effects
tags
dataQuality
```

## 7.3 Skill Slot Enum

```txt
PASSIVE
Q
W
E
R
```

## 7.4 Skill Example

```json
{
  "skills": {
    "6.1": [
      {
        "slot": "Q",
        "name": "Five Point Strike",
        "description": "Akali throws kunai in a cone, dealing magic damage.",
        "damageType": "MAGIC",
        "targetType": "AREA",
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
        "tags": ["POKE", "WAVE_CLEAR", "TRADE_PATTERN"],
        "dataQuality": "PARTIAL"
      }
    ]
  }
}
```

## 7.5 Skill Effects

Approved skill effects:

```txt
DAMAGE
SLOW
ROOT
STUN
KNOCK_UP
KNOCK_BACK
CHARM
SILENCE
FEAR
TAUNT
DASH
BLINK
SPEED_UP
SHIELD
HEAL
STEALTH
UNTARGETABLE
INVULNERABLE
EXECUTE
EMPOWERED_ATTACK
TRUE_DAMAGE
VISION
ZONE_CONTROL
```

## 7.6 Skill Tags

Approved skill tags:

```txt
BURST
POKE
DPS
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
TRADE_PATTERN
ALL_IN
RESET
SCALING
```

## 7.7 Skill Data Rules

```txt
each champion should have one passive
each champion should have Q, W, E, and R
skill slot should be unique per champion and patch
skill name is required
skill description is required
skill tags should use approved values
exact cooldown and scaling can be partial in MVP
```

---

# 8. Item Identity Data

## 8.1 Purpose

Item identity data stores stable item information.

Patch-specific item stats should live in item patch stats.

## 8.2 Item Fields

```txt
key
name
category
tags
goodAgainst
weakAgainst
buildsFrom
buildsInto
```

## 8.3 Item Example

```json
{
  "key": "void-staff",
  "name": "Void Staff",
  "category": "MAGIC",
  "tags": ["MAGIC_PENETRATION", "ANTI_MAGIC_RESIST", "ANTI_TANK"],
  "goodAgainst": ["HIGH_MAGIC_RESIST", "TANKS", "BRUISERS"],
  "weakAgainst": ["SQUISHY_LOW_RESIST_TARGETS"],
  "buildsFrom": [],
  "buildsInto": []
}
```

## 8.4 Item Category Enum

```txt
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

## 8.5 Item Identity Rules

```txt
key is required
key must be unique
name is required
category is required
tags should use approved values
```

---

# 9. Item Patch Stats

## 9.1 Purpose

Item patch stats store item values for a specific patch.

Item build recommendation should always use the draft patch.

## 9.2 Item Patch Stat Fields

```txt
patchVersion
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
armorPenetrationType
magicPenetrationType
antiHealValue
shieldPower
effectDescription
dataQuality
```

## 9.3 Item Patch Stat Example

```json
{
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
      "effectDescription": "Provides magic penetration against enemies with magic resist.",
      "dataQuality": "PARTIAL"
    }
  }
}
```

## 9.4 Penetration Type Enum

```txt
FLAT
PERCENT
UNKNOWN
```

## 9.5 Item Patch Stat Rules

```txt
patchVersion is required
item should have patch stats for active patch
cost is recommended
effectDescription is recommended
item tags should match item effect
exact numbers can be partial in MVP
```

---

# 10. Rune Data

## 10.1 Purpose

Rune data stores rune identity, rune effects, and patch-specific values.

Runes affect champion build recommendations.

For MVP, rune data can be simple.

## 10.2 Rune Identity Fields

```txt
key
name
category
tree
tags
goodFor
badFor
```

## 10.3 Rune Patch Fields

```txt
patchVersion
effectDescription
cooldown
damageValue
healingValue
shieldValue
adaptiveStats
scaling
dataQuality
```

## 10.4 Rune Example

```json
{
  "key": "electrocute",
  "name": "Electrocute",
  "category": "KEYSTONE",
  "tree": "DOMINATION",
  "tags": ["BURST", "TRADE_PATTERN", "ASSASSIN"],
  "goodFor": ["BURST_CHAMPIONS", "SHORT_TRADES", "KILL_PRESSURE"],
  "badFor": ["LONG_FIGHTS", "PURE_SCALING"],
  "patchStats": {
    "6.1": {
      "effectDescription": "Hitting an enemy champion with separate attacks or abilities triggers bonus damage.",
      "cooldown": null,
      "damageValue": null,
      "healingValue": null,
      "shieldValue": null,
      "adaptiveStats": null,
      "scaling": {
        "attackDamage": true,
        "abilityPower": true
      },
      "dataQuality": "MINIMAL"
    }
  }
}
```

## 10.5 Rune Category Enum

```txt
KEYSTONE
PRIMARY
SECONDARY
MINOR
UNKNOWN
```

## 10.6 Rune Tree Enum

```txt
DOMINATION
PRECISION
RESOLVE
INSPIRATION
UNKNOWN
```

MVP note:

```txt
Rune tree names can be adjusted later to match Wild Rift's current rune system.
```

## 10.7 Rune Rules

```txt
key is required
name is required
category is required
tags should use approved values
patch stats should exist for active patch
exact numbers are optional in MVP
```

---

# 11. Summoner Spell Data

## 11.1 Purpose

Summoner spell data stores spell identity and patch-specific values.

Spells affect safety, lane pressure, all-in power, and survival.

## 11.2 Summoner Spell Identity Fields

```txt
key
name
tags
goodFor
badFor
```

## 11.3 Summoner Spell Patch Fields

```txt
patchVersion
cooldown
effectDescription
range
duration
damageValue
shieldValue
healValue
dataQuality
```

## 11.4 Summoner Spell Example

```json
{
  "key": "ignite",
  "name": "Ignite",
  "tags": ["KILL_PRESSURE", "ANTI_HEAL", "LANE_PRESSURE"],
  "goodFor": ["ASSASSINS", "BURST_CHAMPIONS", "AGGRESSIVE_LANING"],
  "badFor": ["SAFE_SCALING", "LOW_KILL_PRESSURE_LANES"],
  "patchStats": {
    "6.1": {
      "cooldown": null,
      "effectDescription": "Deals true damage over time and reduces healing.",
      "range": null,
      "duration": null,
      "damageValue": null,
      "shieldValue": null,
      "healValue": null,
      "dataQuality": "MINIMAL"
    }
  }
}
```

## 11.5 Recommended MVP Spells

Start with common spells:

```txt
Flash
Ignite
Exhaust
Barrier
Heal
Ghost
Smite
```

## 11.6 Summoner Spell Rules

```txt
key is required
name is required
tags should use approved values
patch stats should exist for active patch
exact values are optional in MVP
```

---

# 12. Champion Build Profile

## 12.1 Purpose

Champion build profile stores recommended build patterns for a champion.

This helps item, rune, and spell recommendation.

A build profile should be patch-aware and role-aware.

## 12.2 Build Profile Fields

```txt
championKey
role
patchVersion
coreItemKeys
situationalItemKeys
recommendedRuneKeys
recommendedSpellKeys
playstyle
buildTags
notes
dataQuality
```

## 12.3 Build Profile Example

```json
{
  "championKey": "akali",
  "role": "MID",
  "patchVersion": "6.1",
  "coreItemKeys": ["riftmaker", "infinity-orb", "rabadons-deathcap"],
  "situationalItemKeys": ["void-staff", "stasis-enchant", "morellonomicon"],
  "recommendedRuneKeys": ["electrocute", "conqueror"],
  "recommendedSpellKeys": ["flash", "ignite"],
  "playstyle": "BURST_ASSASSIN",
  "buildTags": ["BURST", "SNOWBALL", "MAGIC_DAMAGE", "BACKLINE_THREAT"],
  "notes": "Use burst setup into squishy teams. Use sustain setup into longer fights.",
  "dataQuality": "MINIMAL"
}
```

## 12.4 Build Profile Rules

```txt
championKey is required
role is required
patchVersion is required
coreItemKeys should reference valid items
situationalItemKeys should reference valid items
recommendedRuneKeys should reference valid runes
recommendedSpellKeys should reference valid spells
```

---

# 13. Matchup Tags

## 13.1 Purpose

Matchup tags help the scoring engine reason about champion interactions without a full matchup database.

## 13.2 Matchup Risk Tags

```txt
WEAK_INTO_POKE
WEAK_INTO_BURST
WEAK_INTO_DIVE
WEAK_INTO_CC
WEAK_INTO_RANGE
WEAK_INTO_SUSTAIN
WEAK_INTO_WAVE_CLEAR
WEAK_INTO_TANKS
WEAK_INTO_MOBILITY
```

## 13.3 Matchup Strength Tags

```txt
GOOD_INTO_MELEE
GOOD_INTO_IMMOBILE
GOOD_INTO_SQUISHY
GOOD_INTO_LOW_CC
GOOD_INTO_LOW_MOBILITY
GOOD_INTO_SCALING
GOOD_INTO_LOW_RANGE
GOOD_INTO_DIVE
```

## 13.4 Matchup Rule Example

```txt
If user champion has WEAK_INTO_POKE
and enemy champion has POKE,
then laneScore should decrease.
```

Another example:

```txt
If user champion has GOOD_INTO_IMMOBILE
and enemy champion has IMMOBILE,
then laneScore should increase.
```

---

# 14. Synergy Tags

## 14.1 Purpose

Synergy tags help the scoring engine understand team fit.

## 14.2 Champion Synergy Tags

```txt
GOOD_WITH_ENGAGE
GOOD_WITH_DIVE
GOOD_WITH_FRONTLINE
GOOD_WITH_POKE
GOOD_WITH_PEEL
GOOD_WITH_WOMBO_COMBO
GOOD_WITH_SPLIT_PUSH
GOOD_WITH_SCALING_COMP
```

## 14.3 Team Need Tags

```txt
NEEDS_FRONTLINE
NEEDS_ENGAGE
NEEDS_PEEL
NEEDS_MAGIC_DAMAGE
NEEDS_PHYSICAL_DAMAGE
NEEDS_CROWD_CONTROL
NEEDS_WAVE_CLEAR
NEEDS_ANTI_HEAL
NEEDS_SCALING
```

## 14.4 Synergy Rule Example

```txt
If team has Malphite and champion has GOOD_WITH_ENGAGE,
then pickScore should increase.
```

Another example:

```txt
If team lacks magic damage and champion deals magic damage,
then pickScore should increase.
```

---

# 15. Team Composition Tags

## 15.1 Purpose

Team composition tags help summarize what a team can do.

## 15.2 Core Composition Tags

```txt
FRONTLINE
ENGAGE
DISENGAGE
PEEL
POKE
BURST
DPS
SUSTAIN
SCALING
SPLIT_PUSH
TEAMFIGHT
PICK_COMP
DIVE_COMP
WOMBO_COMBO
```

## 15.3 Damage Profile Tags

```txt
PHYSICAL_DAMAGE
MAGIC_DAMAGE
MIXED_DAMAGE
TRUE_DAMAGE
LOW_DAMAGE
HIGH_BURST
HIGH_DPS
```

## 15.4 Risk Composition Tags

```txt
LOW_FRONTLINE
LOW_CC
LOW_DAMAGE_BALANCE
LOW_WAVE_CLEAR
LOW_SCALING
TOO_SQUISHY
TOO_MUCH_MAGIC_DAMAGE
TOO_MUCH_PHYSICAL_DAMAGE
```

## 15.5 Team Composition Rule Example

```txt
If team has too much magic damage,
then recommend physical damage champions higher.
```

Another example:

```txt
If team has no frontline,
then recommend tank or bruiser champions higher.
```

---

# 16. Scoring Tags

## 16.1 Purpose

Scoring tags are reusable labels used by the recommendation engine.

They should be shared across champion, item, rune, spell, and build data.

## 16.2 Offensive Tags

```txt
BURST
DPS
POKE
ALL_IN
KILL_PRESSURE
EXECUTE
SCALING_DAMAGE
TRUE_DAMAGE
ARMOR_PENETRATION
MAGIC_PENETRATION
```

## 16.3 Defensive Tags

```txt
SURVIVE_DIVE
ANTI_BURST
ARMOR
MAGIC_RESIST
HEALTH
SHIELD
HEAL
STASIS
TENACITY
```

## 16.4 Utility Tags

```txt
CROWD_CONTROL
ENGAGE
DISENGAGE
PEEL
WAVE_CLEAR
ROAM
VISION
SPEED_UP
SLOW
ZONE_CONTROL
```

## 16.5 Counter Tags

```txt
ANTI_HEAL
ANTI_SHIELD
ANTI_TANK
ANTI_ASSASSIN
ANTI_MAGE
ANTI_MARKSMAN
ANTI_CROWD_CONTROL
ANTI_DIVE
```

## 16.6 Risk Tags

```txt
IMMOBILE
SQUISHY
WEAK_EARLY
WEAK_LATE
NEEDS_SNOWBALL
LOW_WAVE_CLEAR
LOW_RANGE
VULNERABLE_TO_CC
HARD_TO_PLAY
```

---

# 17. Data Quality Levels

## 17.1 Purpose

Data quality helps the recommendation engine know how much it can trust the data.

## 17.2 Data Quality Enum

```txt
COMPLETE
PARTIAL
MINIMAL
MISSING
```

## 17.3 Data Quality Meaning

```txt
COMPLETE = exact values, tags, descriptions, and profiles exist
PARTIAL = most data exists, but some exact values are missing
MINIMAL = only basic tags and descriptions exist
MISSING = data cannot be used safely
```

## 17.4 Confidence Impact

```txt
COMPLETE = normal confidence
PARTIAL = reduce confidence slightly
MINIMAL = reduce confidence strongly
MISSING = exclude or return warning
```

MVP note:

```txt
Most MVP data can start as PARTIAL or MINIMAL.
```

---

# 18. Validation Rules

## 18.1 General Validation Rules

```txt
all JSON files must be valid
all keys must be unique
all references must point to valid records
all enum values must be approved
active patch must exist
only one patch can be active
```

## 18.2 Champion Validation Rules

```txt
champion key is required
champion name is required
champion roles are required
champion damage type is required
champion range type is required
champion patch stats should exist for active patch
champion skill data should exist for active patch if included
```

## 18.3 Skill Validation Rules

```txt
skill slot is required
skill name is required
skill description is required
skill slot must be unique per champion and patch
skill effects must use approved values
skill tags must use approved values
```

## 18.4 Item Validation Rules

```txt
item key is required
item name is required
item category is required
item patch stats should exist for active patch
item tags must use approved values
```

## 18.5 Rune Validation Rules

```txt
rune key is required
rune name is required
rune category is required
rune patch stats should exist for active patch
rune tags must use approved values
```

## 18.6 Summoner Spell Validation Rules

```txt
spell key is required
spell name is required
spell patch stats should exist for active patch
spell tags must use approved values
```

## 18.7 Build Profile Validation Rules

```txt
championKey must reference valid champion
role must be valid
patchVersion must reference valid patch
coreItemKeys must reference valid items
situationalItemKeys must reference valid items
recommendedRuneKeys must reference valid runes
recommendedSpellKeys must reference valid spells
```

---

# 19. MVP Game Data Boundary

## 19.1 Included in MVP

The MVP game data model should include:

```txt
small champion dataset
small item dataset
small rune dataset
small summoner spell dataset
champion identity data
champion patch stats
basic champion skill data
item identity data
item patch stats
rune identity data
basic rune patch stats
summoner spell identity data
basic spell patch stats
champion build profiles
champion tags
item tags
rune tags
spell tags
team composition tags
scoring tags
validation script
seed script
```

## 19.2 Excluded from MVP

The MVP game data model should not include:

```txt
full champion roster
full item database
full rune database
exact skill numbers for every champion
exact rune values for every rune
exact spell values for every spell
full combat simulation
automatic patch scraping
Riot API sync
rank-based statistics
global matchup database
machine learning data
```

---

# 20. Recommended MVP Starter Data

## 20.1 Starter Champions

Start with mid lane champions first.

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

## 20.2 Starter Items

Start with common mid lane items first.

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

## 20.3 Starter Runes

Start with common mid lane rune choices.

```txt
Electrocute
Conqueror
First Strike
Phase Rush
Fleet Footwork
Aery
Bone Plating
Second Wind
Hunter - Genius
Sweet Tooth
```

MVP note:

```txt
Rune names can be adjusted later to match the current Wild Rift rune system.
```

## 20.4 Starter Summoner Spells

Start with common spells.

```txt
Flash
Ignite
Exhaust
Barrier
Heal
Ghost
Smite
```

---

# 21. How Game Data Supports Scoring

## 21.1 Ban Recommendation

Ban scoring uses:

```txt
champion meta score
champion tags
matchup risk tags
counter tags
user discomfort notes
intended champion weakness tags
```

## 21.2 Pick Recommendation

Pick scoring uses:

```txt
champion role
champion comfort level
champion lane profile
champion teamfight profile
champion damage type
team need tags
enemy threat tags
champion pool data
```

## 21.3 Team Composition Analysis

Team composition scoring uses:

```txt
team champion tags
damage profiles
frontline tags
engage tags
crowd control tags
scaling profiles
risk tags
```

## 21.4 Item Build Recommendation

Item build scoring uses:

```txt
selected champion tags
item tags
item patch stats
enemy damage profile
enemy sustain tags
enemy shield tags
enemy tank tags
enemy dive tags
```

## 21.5 Rune Recommendation

Rune recommendation can use:

```txt
champion playstyle
champion damage pattern
lane matchup
enemy team threat
user playstyle preference
```

MVP note:

```txt
Rune recommendation can be added after item build recommendation works.
```

## 21.6 Summoner Spell Recommendation

Spell recommendation can use:

```txt
champion playstyle
lane kill pressure
enemy crowd control
enemy burst
enemy dive
need for safety
need for aggression
```

MVP note:

```txt
Spell recommendation can be added after pick and item build recommendation works.
```

---

# 22. API Usage

The backend can expose game data through these APIs:

```txt
GET /api/patches
GET /api/patches/active
GET /api/champions
GET /api/champions/:championId
GET /api/items
GET /api/items/:itemId
GET /api/runes
GET /api/runes/:runeId
GET /api/summoner-spells
GET /api/summoner-spells/:spellId
```

MVP note:

```txt
Rune and summoner spell APIs can be added after the first draft recommendation flow works.
```

---

# 23. Database Direction

The first Prisma schema can include:

```txt
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
ChampionBuildProfile
```

MVP simplification:

```txt
Rune, RunePatchStat, SummonerSpell, and SummonerSpellPatchStat can be added after champion, item, and draft flow are stable.
```

Recommended first priority:

```txt
Patch
Champion
ChampionPatchStat
ChampionSkill
Item
ItemPatchStat
```

Recommended second priority:

```txt
Rune
RunePatchStat
SummonerSpell
SummonerSpellPatchStat
ChampionBuildProfile
```

---

# 24. Future Improvements

Future versions can add:

```txt
complete champion roster
complete item database
complete rune database
complete spell database
champion matchup table
champion synergy table
item build template table
rune recommendation engine
spell recommendation engine
patch diff viewer
admin game data editor
Riot API integration
automatic patch importer
damage simulation
rank-based data
player-specific performance stats
```

These should come after the MVP works.

---

# 25. Open Questions

## 25.1 Should Runes and Spells Be in MVP?

Recommended answer:

```txt
Document them now.
Implement them after core draft and item recommendation work.
```

Reason:

```txt
Runes and spells matter, but they should not block the first MVP.
```

## 25.2 Should Exact Skill Numbers Be Required?

Recommended answer:

```txt
No.
Start with descriptions, effects, and tags.
Add exact values over time.
```

Reason:

```txt
Skill tags are enough for first scoring logic.
```

## 25.3 Should Champion Builds Be Stored as JSON?

Recommended answer:

```txt
Yes for MVP.
```

Reason:

```txt
Build profiles may change often.
JSON is flexible while the product is still changing.
```

Future improvement:

```txt
Move build items, runes, and spells into child tables if analytics becomes important.
```

## 25.4 Should Game Data Be Editable in the UI?

Recommended answer:

```txt
No for MVP.
```

Reason:

```txt
Manual JSON files and seed scripts are faster for first development.
```

---

# 26. Final Game Data Model Summary

Wise Rift game data should be patch-aware and manually maintained.

The main data groups are:

```txt
Champion data
Champion stats
Champion skills
Item data
Item stats
Rune data
Summoner spell data
Champion build profiles
Scoring tags
```

The most important rule is:

```txt
Manual patch data is the source of truth.
AI should not invent game data.
```

The first MVP should implement:

```txt
Patch
Champion
ChampionPatchStat
ChampionSkill
Item
ItemPatchStat
```

The next layer can add:

```txt
Rune
RunePatchStat
SummonerSpell
SummonerSpellPatchStat
ChampionBuildProfile
```
