# Wise Rift - Scoring System Architecture

This document defines the first scoring system for **Wise Rift**.

The goal of this document is to explain how Wise Rift calculates ban recommendations, pick recommendations, team composition analysis, and item build suggestions.

Wise Rift helps Wild Rift players make better draft decisions.

The scoring system should support this main workflow:

```txt
Choose Role
→ Set Champion Pool
→ Enter Picks and Bans
→ Get Ban Recommendation
→ Get Pick Recommendation
→ View Team Composition Analysis
→ View Item Build Suggestion
→ Save Match Result
→ Review Draft Performance
```

---

# 1. Purpose

The purpose of this document is to define:

- scoring principles
- scoring inputs
- scoring outputs
- ban scoring
- pick scoring
- team composition scoring
- item build scoring
- confidence levels
- reason codes
- score breakdowns
- patch data rules
- AI explanation rules
- testing strategy
- MVP boundary

This document is not final production scoring logic.

It is the architecture guide for the first rule-based recommendation engine.

---

# 2. Scoring Principles

Wise Rift should use a rule-based scoring system first.

The scoring system should be:

- clear
- deterministic
- explainable
- testable
- patch-aware
- easy to update
- simple enough for MVP

Main rule:

```txt
Same input should return the same output.
```

Another important rule:

```txt
Scoring engine decides.
AI explains.
User reviews.
```

AI should not decide scores.

AI should only explain the score result in simple language.

---

# 3. Why Rule-Based Scoring First

The MVP should not start with machine learning.

Reason:

```txt
The project does not have enough real match data yet.
```

Rule-based scoring is better for MVP because:

- easier to build
- easier to debug
- easier to test
- easier to explain in interviews
- easier to update manually by patch
- safer than letting AI guess champion strength

Future versions can use analytics or machine learning later.

---

# 4. High-Level Scoring Flow

## 4.1 Main Flow

```txt
Frontend or mobile app sends draft state
→ Backend validates user and draft ownership
→ Backend loads patch data
→ Backend loads champion pool
→ Backend sends structured input to Python recommendation service
→ Python service calculates scores
→ Python service returns ranked results
→ Backend stores recommendation result
→ AI explanation layer explains the result
→ Frontend displays scores, reasons, and explanation
```

## 4.2 Scoring System Boundary

The Python recommendation service should calculate:

```txt
ban scores
pick scores
team composition scores
item build scores
reason codes
confidence levels
score breakdowns
```

The Python service should not handle:

```txt
authentication
authorization
database writes
AI provider calls
frontend rendering
mobile rendering
```

---

# 5. Scoring Inputs

## 5.1 Shared Input

Most scoring functions should receive the same base context.

```txt
userId
draftSessionId
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

## 5.2 Champion Data Input

Champion scoring should use:

```txt
champion identity data
champion roles
damage type
range type
difficulty
tags
strengths
weaknesses
patch stats
skill tags
meta score
lane profile
scaling profile
team fight profile
```

## 5.3 Item Data Input

Item scoring should use:

```txt
item identity data
item category
item tags
patch item stats
good against tags
weak against tags
cost
damage stats
defensive stats
effect description
```

## 5.4 Draft State Input

Draft state should include:

```txt
selected role
intended champion
team bans
enemy bans
my team picks
enemy team picks
user pick if selected
draft phase
```

## 5.5 User Preference Input

User preference can include:

```txt
champion pool
comfort level
preferred role
avoid champions
preferred play style
user notes
```

MVP note:

```txt
User preference should help scoring, but it should not override basic draft rules.
```

---

# 6. Scoring Outputs

## 6.1 Standard Scoring Output

Each scoring endpoint should return:

```txt
recommendation type
ranked items
total score
confidence
reason codes
score breakdown
warnings
input snapshot
```

Example:

```json
{
  "type": "PICK",
  "items": [
    {
      "championId": "champion_orianna",
      "championName": "Orianna",
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
  ],
  "warnings": []
}
```

## 6.2 Score Range

All main recommendation scores should use a 0 to 100 scale.

```txt
0 = terrible fit
50 = acceptable
100 = excellent fit
```

MVP rule:

```txt
Keep all final scores between 0 and 100.
```

## 6.3 Score Clamping

If scoring formulas go below 0 or above 100, clamp the result.

```txt
finalScore = max(0, min(100, rawScore))
```

---

# 7. Confidence Levels

Confidence explains how strong the recommendation is.

## 7.1 Confidence Enum

```txt
LOW
MEDIUM
HIGH
UNKNOWN
```

## 7.2 Confidence Rules

Recommended confidence rules:

```txt
HIGH = score is 80 or higher and no major warning exists
MEDIUM = score is 60 to 79
LOW = score is below 60 or has major warnings
UNKNOWN = missing data
```

## 7.3 Confidence Should Consider Data Quality

Confidence should go down when:

```txt
patch data is incomplete
champion pool is empty
enemy picks are unknown
item data is missing
champion matchup data is weak
```

Example:

```txt
A champion can have a high score, but medium confidence if enemy draft data is missing.
```

---

# 8. Reason Codes

Reason codes explain why a score was given.

They should be machine-readable.

AI can use reason codes to create natural explanations.

## 8.1 Ban Reason Codes

```txt
HIGH_META_THREAT
COUNTERS_USER_POOL
COUNTERS_INTENDED_CHAMPION
HIGH_SNOWBALL_RISK
HIGH_LANE_PRESSURE
HIGH_TEAMFIGHT_THREAT
DIFFICULT_TO_PLAY_AGAINST
REMOVES_COMMON_COUNTER
```

## 8.2 Pick Reason Codes

```txt
SAFE_LANE
GOOD_TEAMFIGHT
MATCHES_TEAM_NEED
COUNTERS_ENEMY_PICK
GOOD_WITH_TEAM_COMP
COMFORT_PICK
GOOD_DAMAGE_BALANCE
GOOD_SCALING
STRONG_META_PICK
LOW_RISK_PICK
```

## 8.3 Team Composition Reason Codes

```txt
GOOD_DAMAGE_BALANCE
LOW_DAMAGE_BALANCE
HAS_FRONTLINE
LACKS_FRONTLINE
HAS_ENGAGE
LACKS_ENGAGE
HAS_CROWD_CONTROL
LACKS_CROWD_CONTROL
GOOD_SCALING
WEAK_EARLY_GAME
STRONG_TEAMFIGHT
WEAK_SIDE_LANE
```

## 8.4 Item Build Reason Codes

```txt
ANTI_HEAL_NEEDED
ANTI_SHIELD_NEEDED
ANTI_TANK_NEEDED
MAGIC_RESIST_NEEDED
ARMOR_NEEDED
STASIS_RECOMMENDED
BURST_DAMAGE_NEEDED
SURVIVE_DIVE
CORE_CHAMPION_SYNERGY
ENEMY_HAS_HIGH_SUSTAIN
ENEMY_HAS_HIGH_CC
```

---

# 9. Ban Scoring

## 9.1 Ban Scoring Goal

Ban scoring helps the user decide which enemy champion to ban before the pick phase.

Ban recommendation should reduce draft risk.

## 9.2 Ban Scoring Inputs

Ban scoring should use:

```txt
active patch
selected role
intended champion if selected
champion pool
enemy threat champions
current bans
available champions
extra user context
```

## 9.3 Ban Score Formula

Recommended MVP formula:

```txt
banScore =
  metaThreatScore
+ counterPoolScore
+ intendedChampionCounterScore
+ lanePressureScore
+ snowballRiskScore
+ teamfightThreatScore
+ userDiscomfortScore
```

Then clamp:

```txt
banScore = clamp(banScore, 0, 100)
```

## 9.4 Ban Score Weights

Recommended MVP weights:

```txt
metaThreatScore: 20
counterPoolScore: 20
intendedChampionCounterScore: 20
lanePressureScore: 15
snowballRiskScore: 10
teamfightThreatScore: 10
userDiscomfortScore: 5
```

Total:

```txt
100
```

## 9.5 Ban Score Breakdown

Example:

```json
{
  "metaThreatScore": 18,
  "counterPoolScore": 16,
  "intendedChampionCounterScore": 20,
  "lanePressureScore": 12,
  "snowballRiskScore": 8,
  "teamfightThreatScore": 9,
  "userDiscomfortScore": 5
}
```

## 9.6 Ban Filtering Rules

Do not recommend a champion if:

```txt
champion is already banned
champion does not exist in patch data
champion is disabled or archived
```

## 9.7 Ban Recommendation Output

Ban recommendation should return:

```txt
top ban targets
total score
score breakdown
reason codes
confidence
plain warning if needed
```

Example:

```json
{
  "championId": "champion_yasuo",
  "championName": "Yasuo",
  "totalScore": 88,
  "confidence": "HIGH",
  "reasonCodes": [
    "HIGH_META_THREAT",
    "COUNTERS_USER_POOL",
    "HIGH_SNOWBALL_RISK"
  ],
  "scoreBreakdown": {
    "metaThreatScore": 18,
    "counterPoolScore": 16,
    "intendedChampionCounterScore": 20,
    "lanePressureScore": 12,
    "snowballRiskScore": 8,
    "teamfightThreatScore": 9,
    "userDiscomfortScore": 5
  }
}
```

---

# 10. Pick Scoring

## 10.1 Pick Scoring Goal

Pick scoring helps the user choose a champion during the live pick phase.

Pick recommendation should consider both teams.

## 10.2 Pick Scoring Inputs

Pick scoring should use:

```txt
active patch
selected role
champion pool
current bans
my team picks
enemy picks
available champions
user comfort level
team composition needs
enemy threats
extra user context
```

## 10.3 Pick Score Formula

Recommended MVP formula:

```txt
pickScore =
  laneScore
+ teamCompScore
+ enemyCounterScore
+ comfortScore
+ metaScore
+ damageBalanceScore
+ riskScore
```

Then clamp:

```txt
pickScore = clamp(pickScore, 0, 100)
```

## 10.4 Pick Score Weights

Recommended MVP weights:

```txt
laneScore: 20
teamCompScore: 20
enemyCounterScore: 20
comfortScore: 15
metaScore: 10
damageBalanceScore: 10
riskScore: 5
```

Total:

```txt
100
```

## 10.5 Pick Score Breakdown

Example:

```json
{
  "laneScore": 18,
  "teamCompScore": 19,
  "enemyCounterScore": 16,
  "comfortScore": 15,
  "metaScore": 8,
  "damageBalanceScore": 7,
  "riskScore": 4
}
```

## 10.6 Pick Filtering Rules

Do not recommend a champion if:

```txt
champion is already picked
champion is already banned
champion does not fit selected role
champion does not exist in patch data
champion is disabled or archived
```

Optional MVP filter:

```txt
only recommend champions from user champion pool
```

This can be controlled by:

```txt
onlyFromChampionPool = true
```

## 10.7 Comfort Score Rule

Comfort score should come from `ChampionPoolEntry.comfortLevel`.

Recommended mapping:

```txt
comfortLevel 5 = 15 points
comfortLevel 4 = 12 points
comfortLevel 3 = 9 points
comfortLevel 2 = 5 points
comfortLevel 1 = 2 points
not in pool = 0 points
```

## 10.8 Pick Recommendation Output

Pick recommendation should return:

```txt
ranked champions
total score
score breakdown
reason codes
confidence
warnings
```

Example:

```json
{
  "championId": "champion_orianna",
  "championName": "Orianna",
  "totalScore": 87,
  "confidence": "HIGH",
  "reasonCodes": ["SAFE_LANE", "GOOD_TEAMFIGHT", "MATCHES_TEAM_NEED"],
  "scoreBreakdown": {
    "laneScore": 18,
    "teamCompScore": 19,
    "enemyCounterScore": 16,
    "comfortScore": 15,
    "metaScore": 8,
    "damageBalanceScore": 7,
    "riskScore": 4
  }
}
```

---

# 11. Team Composition Scoring

## 11.1 Team Composition Goal

Team composition scoring helps the user understand team strengths and weaknesses.

The system should not only say who to pick.

It should also explain what the team needs.

## 11.2 Team Composition Inputs

Team composition should use:

```txt
my team picks
enemy team picks
champion tags
damage types
role tags
teamfight profiles
scaling profiles
crowd control tags
engage tags
frontline tags
poke tags
sustain tags
```

## 11.3 Composition Categories

The MVP should score these categories:

```txt
damage balance
frontline
crowd control
engage
disengage
poke
burst
sustain
scaling
teamfight
side lane
```

## 11.4 Composition Score Range

Each category should be scored from 0 to 100.

```txt
0 = missing or very weak
50 = acceptable
100 = very strong
```

## 11.5 Main Composition Output

Example:

```json
{
  "scores": {
    "damageBalance": 65,
    "frontline": 55,
    "crowdControl": 80,
    "engage": 75,
    "disengage": 45,
    "poke": 60,
    "burst": 70,
    "sustain": 35,
    "scaling": 72,
    "teamfight": 82,
    "sideLane": 40
  },
  "teamStrengths": ["strong teamfight", "good crowd control", "good engage"],
  "teamWeaknesses": ["low sustain", "weak side lane pressure"],
  "warnings": [
    "Your team may need anti-heal if enemy sustain grows.",
    "Your team may lack physical damage."
  ]
}
```

## 11.6 Damage Balance Rule

Damage balance should consider physical, magic, and true damage.

Example:

```txt
Too much magic damage can make enemy magic resist more valuable.
Too much physical damage can make enemy armor more valuable.
Mixed damage is usually harder to itemize against.
```

Recommended scoring idea:

```txt
balanced physical and magic damage = higher score
single damage type only = lower score
```

## 11.7 Frontline Rule

Frontline score should increase when team has:

```txt
tank
bruiser
engage support
durable jungle
durable baron laner
```

Frontline score should decrease when team has:

```txt
too many squishy champions
no reliable engage
no durable champion
```

## 11.8 Crowd Control Rule

Crowd control score should increase with:

```txt
stun
root
knock-up
slow
charm
silence
displacement
reliable engage ultimate
```

Crowd control score should consider reliability.

Example:

```txt
Point-and-click crowd control is more reliable than hard skill shots.
```

## 11.9 Team Composition Result Usage

Team composition result should affect pick recommendation.

Example:

```txt
If team lacks frontline, champions with frontline tags should gain pick score.
If team lacks magic damage, magic damage champions should gain pick score.
If team lacks crowd control, CC champions should gain pick score.
```

---

# 12. Item Build Scoring

## 12.1 Item Build Goal

Item build scoring helps the user choose better items based on the selected champion and enemy team.

Item recommendations should respond to the draft.

## 12.2 Item Build Inputs

Item build scoring should use:

```txt
selected champion
champion tags
champion damage type
champion scaling
enemy picks
enemy damage types
enemy sustain
enemy shields
enemy tankiness
enemy crowd control
team composition
patch item data
game plan
```

## 12.3 Item Build Score Formula

Recommended MVP formula:

```txt
itemScore =
  championSynergyScore
+ enemyCounterScore
+ teamNeedScore
+ survivalScore
+ costEfficiencyScore
```

Then clamp:

```txt
itemScore = clamp(itemScore, 0, 100)
```

## 12.4 Item Build Score Weights

Recommended MVP weights:

```txt
championSynergyScore: 30
enemyCounterScore: 30
teamNeedScore: 15
survivalScore: 15
costEfficiencyScore: 10
```

Total:

```txt
100
```

## 12.5 Item Build Output

Item build recommendation should return:

```txt
core items
situational items
boots
enchant
warnings
score breakdown
reason codes
```

Example:

```json
{
  "championId": "champion_viktor",
  "coreItems": [
    {
      "itemId": "item_ludens_echo",
      "name": "Luden's Echo",
      "orderIndex": 1
    },
    {
      "itemId": "item_rabadons_deathcap",
      "name": "Rabadon's Deathcap",
      "orderIndex": 2
    }
  ],
  "situationalItems": [
    {
      "itemId": "item_void_staff",
      "name": "Void Staff",
      "reason": "Enemy team has high magic resist and tanks."
    },
    {
      "itemId": "item_stasis_enchant",
      "name": "Stasis Enchant",
      "reason": "Enemy team has strong dive and burst."
    }
  ],
  "warnings": ["Consider anti-heal if enemy sustain becomes a problem."],
  "scoreBreakdown": {
    "championSynergyScore": 28,
    "enemyCounterScore": 24,
    "teamNeedScore": 12,
    "survivalScore": 13,
    "costEfficiencyScore": 8
  }
}
```

## 12.6 Anti-Heal Rule

Recommend anti-heal when enemy team has high healing or sustain.

Enemy sustain examples:

```txt
healing champion
lifesteal champion
support sustain
self-healing tank
multiple healing effects
```

Reason code:

```txt
ANTI_HEAL_NEEDED
```

## 12.7 Anti-Shield Rule

Recommend anti-shield when enemy team has many shields.

Enemy shield examples:

```txt
shield support
shield mage
shield item abuse
team-wide shielding
```

Reason code:

```txt
ANTI_SHIELD_NEEDED
```

## 12.8 Anti-Tank Rule

Recommend anti-tank items when enemy team has:

```txt
multiple tanks
high health
high armor
high magic resist
frontline-heavy team
```

Reason code:

```txt
ANTI_TANK_NEEDED
```

## 12.9 Survival Rule

Recommend defensive options when enemy team has:

```txt
strong dive
strong burst
assassin threat
hard crowd control
long-range engage
```

Possible outputs:

```txt
Stasis Enchant
defensive boots
resist item
shield item
health item
```

---

# 13. Matchup Scoring

## 13.1 Matchup Scoring Goal

Matchup scoring helps judge lane safety and counter value.

MVP does not need a full matchup database.

It can start with tags and rules.

## 13.2 Matchup Inputs

Matchup scoring should use:

```txt
my champion tags
enemy champion tags
range type
damage type
lane profile
skill tags
crowd control tags
mobility tags
user notes
```

## 13.3 Matchup Score Range

```txt
0 = very bad matchup
50 = playable
100 = very good matchup
```

## 13.4 Matchup Rule Examples

Example rules:

```txt
melee assassin into strong ranged poke = lower lane score
immobile mage into heavy dive = lower safety score
scaling mage with wave clear into low pressure lane = higher lane score
high mobility champion into skill-shot mage = higher outplay score
```

## 13.5 Future Matchup Table

A future version can add:

```txt
ChampionMatchup
ChampionCounter
ChampionSynergy
```

MVP rule:

```txt
Use tag-based matchup scoring first.
```

---

# 14. Patch Data Rules

## 14.1 Patch-Aware Scoring

All scoring must use the draft session patch.

Main rule:

```txt
Use DraftSession.patchId.
Do not use current active patch for old drafts.
```

## 14.2 Missing Patch Data

If patch data is missing, return a warning.

Example:

```json
{
  "warning": "Patch data is incomplete for this champion.",
  "confidence": "LOW"
}
```

## 14.3 Manual Data Rule

For MVP, patch data is manually maintained.

```txt
Champion stats, item stats, and skill values should come from manual patch data.
```

AI should not fill missing patch stats.

## 14.4 Patch Update Rule

When a new patch is added:

```txt
copy previous patch data
update changed champions
update changed items
review scoring weights if needed
mark patch as active
```

---

# 15. Live Draft Recalculation

## 15.1 Live Draft Rule

The pick phase is not linear.

Correct model:

```txt
Start Live Pick Phase
→ Update Team and Enemy Picks as Draft Changes
→ Recalculate Pick Recommendations
→ Recalculate Team Composition Analysis
→ Recalculate Item Build Suggestions
→ Continue Until Draft Is Complete
```

## 15.2 Recalculation Triggers

Recalculate when:

```txt
a team pick is added
an enemy pick is added
a pick is updated
a pick is removed
a ban is added
a ban is removed
user selected champion changes
```

## 15.3 Recalculation Output

After each recalculation, the app should be able to show:

```txt
updated pick recommendations
updated team composition analysis
updated item build suggestions
updated warnings
```

## 15.4 Performance Rule

For MVP dataset, recalculation should be fast.

Recommended target:

```txt
Return scoring results in less than 1 second.
```

If AI explanation takes longer:

```txt
Show score result first.
Load AI explanation after.
```

---

# 16. Score Breakdown Rules

## 16.1 Why Score Breakdown Matters

Score breakdown helps users trust recommendations.

It also helps with testing and debugging.

Main rule:

```txt
Never return only a final score.
Always return a score breakdown.
```

## 16.2 Score Breakdown Requirements

Each recommendation should include:

```txt
main score categories
points for each category
reason codes
warnings
confidence
```

## 16.3 Example Breakdown

```json
{
  "totalScore": 87,
  "confidence": "HIGH",
  "scoreBreakdown": {
    "laneScore": 18,
    "teamCompScore": 19,
    "enemyCounterScore": 16,
    "comfortScore": 15,
    "metaScore": 8,
    "damageBalanceScore": 7,
    "riskScore": 4
  },
  "reasonCodes": ["SAFE_LANE", "GOOD_TEAMFIGHT", "MATCHES_TEAM_NEED"]
}
```

---

# 17. AI Explanation Rules

## 17.1 AI Role

AI should explain the scoring result in plain language.

AI should not calculate or change the score.

## 17.2 AI Input

AI input should include:

```txt
recommendation type
top recommendations
score breakdown
reason codes
draft context
safe champion names
safe item names
warnings
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

## 17.3 AI Output

AI output should be short and useful.

Example:

```txt
Orianna is recommended because she gives your team safer wave control and strong teamfight setup. Your team already has engage, so Orianna can follow up well. She is also safer than your other available picks into the enemy draft.
```

## 17.4 AI Safety Rule

Main rule:

```txt
AI explains known scoring data.
AI does not invent champion stats.
AI does not invent item stats.
AI does not invent patch changes.
```

---

# 18. Testing Strategy

## 18.1 Unit Tests

The Python recommendation service should test:

```txt
ban scorer
pick scorer
composition scorer
item scorer
matchup rules
score utility functions
confidence calculation
reason code generation
```

## 18.2 Important Ban Tests

```txt
banned champion is excluded
already picked champion is excluded
high meta threat receives higher score
intended champion counter receives higher score
missing patch data lowers confidence
```

## 18.3 Important Pick Tests

```txt
banned champion is excluded
already picked champion is excluded
champion outside selected role is excluded
comfort pick receives comfort score
team need changes score
enemy counter value changes score
same input returns same output
```

## 18.4 Important Composition Tests

```txt
team with mixed damage gets better damage balance score
team with no frontline gets frontline warning
team with many crowd control tags gets high crowd control score
enemy dive threat creates warning
```

## 18.5 Important Item Tests

```txt
anti-heal item is recommended into high sustain
anti-tank item is recommended into tank-heavy enemy team
stasis is recommended into heavy dive
item missing from patch data is excluded
AI explanation does not change item score
```

## 18.6 Snapshot Tests

Use snapshot-style tests for sample drafts.

Example:

```txt
Given fixed draft input
When scorer runs
Then output ranking should match expected result
```

This helps catch scoring changes.

---

# 19. Python Service File Plan

Recommended folder structure:

```txt
services/recommendation-engine/
├─ app/
│  ├─ api/
│  │  ├─ ban_routes.py
│  │  ├─ pick_routes.py
│  │  ├─ composition_routes.py
│  │  └─ item_routes.py
│  │
│  ├─ core/
│  │  ├─ config.py
│  │  ├─ errors.py
│  │  └─ constants.py
│  │
│  ├─ models/
│  │  ├─ champion.py
│  │  ├─ item.py
│  │  ├─ draft.py
│  │  └─ recommendation.py
│  │
│  ├─ schemas/
│  │  ├─ ban_schema.py
│  │  ├─ pick_schema.py
│  │  ├─ composition_schema.py
│  │  └─ item_schema.py
│  │
│  ├─ scoring/
│  │  ├─ ban_scorer.py
│  │  ├─ pick_scorer.py
│  │  ├─ composition_scorer.py
│  │  ├─ item_scorer.py
│  │  ├─ matchup_rules.py
│  │  ├─ synergy_rules.py
│  │  ├─ reason_codes.py
│  │  ├─ confidence.py
│  │  └─ score_utils.py
│  │
│  └─ main.py
│
├─ tests/
│  ├─ test_ban_scorer.py
│  ├─ test_pick_scorer.py
│  ├─ test_composition_scorer.py
│  ├─ test_item_scorer.py
│  └─ test_score_utils.py
│
└─ pyproject.toml
```

---

# 20. MVP Boundary

## 20.1 Included in MVP

The MVP scoring system should include:

```txt
ban scoring
pick scoring
team composition scoring
item build scoring
tag-based matchup scoring
comfort score
meta score
score breakdown
reason codes
confidence level
warnings
patch-aware data
AI explanation support
```

## 20.2 Excluded from MVP

The MVP scoring system should not include:

```txt
machine learning
Riot API stats
automatic patch scraping
full combat simulation
exact damage calculator
real-time in-game data
global win rate model
rank-specific matchup statistics
team-level opponent history
advanced item DPS simulation
```

---

# 21. Future Scoring Improvements

Future versions can add:

```txt
real matchup database
champion synergy table
champion counter table
rank-based weights
role-specific score weights
player performance history
match history import
more detailed item simulation
damage calculator
patch trend analysis
machine learning model
```

These should come after the MVP works.

---

# 22. Open Questions

## 22.1 Should Scoring Weights Be Stored in Database?

Recommended MVP answer:

```txt
No.
Keep scoring weights in Python constants first.
```

Future improvement:

```txt
Move scoring weights into database or config files if tuning becomes frequent.
```

## 22.2 Should AI Help Tune Scores?

Recommended MVP answer:

```txt
No.
AI should explain scores, not tune them.
```

Future improvement:

```txt
Use AI to suggest human-reviewed scoring rule changes, but never apply them automatically.
```

## 22.3 Should Item Builds Be Champion-Specific?

Recommended MVP answer:

```txt
Yes, but keep it simple.
Use champion tags and item tags first.
```

Future improvement:

```txt
Add champion-specific build templates later.
```

## 22.4 Should The App Recommend Champions Outside The User Pool?

Recommended MVP answer:

```txt
Default to champion pool only.
Allow an option to show all possible champions later.
```

Reason:

```txt
A realistic pick recommendation should consider what the user can actually play.
```

---

# 23. Final Scoring Summary

Wise Rift should use a deterministic rule-based scoring system.

The first scoring system should support:

```txt
Ban Recommendation
Pick Recommendation
Team Composition Analysis
Item Build Suggestion
```

The main scoring rule is:

```txt
Scoring engine decides.
AI explains.
User reviews.
```

The scoring system should return:

```txt
ranked result
total score
score breakdown
reason codes
confidence
warnings
```

The system should stay patch-aware:

```txt
DraftSession.patchId
→ ChampionPatchStat
→ ChampionSkill
→ ItemPatchStat
→ RecommendationResult
```
