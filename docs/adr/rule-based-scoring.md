# ADR: Rule-Based Scoring for MVP

## Status

Accepted

## Date

2026-06-08

## Context

Wise Rift needs to recommend better draft decisions for Wild Rift players.

The app needs to support:

- ban recommendation
- pick recommendation
- team composition analysis
- item build suggestion
- matchup notes
- draft review
- AI-generated explanation

These features need a scoring system.

The scoring system should look at the current draft state and return clear recommendations.

Example inputs include:

- active patch
- player role
- champion pool
- intended champion
- team picks
- enemy picks
- banned champions
- champion tags
- skill tags
- matchup tags
- synergy tags
- item tags
- team composition needs

For the MVP, Wise Rift should not use machine learning to decide recommendations.

Wise Rift should also not let AI decide the final recommendation.

The core rule is:

```txt
Scoring engine decides.
AI explains.
User reviews.
```

The MVP needs a recommendation system that is simple, testable, explainable, and stable.

## Decision

Wise Rift will use deterministic rule-based scoring for the MVP.

The recommendation engine will calculate scores using clear rules, weights, tags, and patch-versioned game data.

The scoring system will decide the recommendation.

The AI layer will only explain the recommendation in simple words.

The AI layer will not choose the best ban, best pick, best item build, or best team composition.

The scoring engine should return:

- final score
- confidence level
- score breakdown
- reason codes
- recommendation rank
- explanation input for AI

## Main Rule

Wise Rift will follow this rule:

```txt
Same input should return the same output.
```

If the same draft state, patch data, champion pool, and scoring rules are used, the recommendation result should be the same every time.

This makes the system easier to test, debug, and explain.

## Why Rule-Based Scoring Is Used

### 1. It is easier to understand

Rule-based scoring is easier to follow than machine learning.

Each score can be broken into clear parts.

For example, a champion pick score can include:

```txt
matchup score
+ team synergy score
+ team composition score
+ champion pool comfort score
+ patch strength score
- risk penalty
```

This makes the recommendation easier to explain.

### 2. It is better for MVP scope

Machine learning would require a large amount of clean data.

Wise Rift does not have enough match history data at the MVP stage.

Using machine learning too early would add extra work without improving the first version enough.

The MVP should prove the product workflow first.

The MVP should answer this question:

```txt
Can a player use structured draft data to get clearer ban, pick, team composition, and item build guidance?
```

### 3. It works well with manual patch data

Wise Rift uses manually maintained patch data for the MVP.

Rule-based scoring fits this approach because the scoring engine can use known data fields.

For example:

- champion role
- damage type
- range type
- crowd control level
- mobility level
- scaling level
- early game strength
- late game strength
- item counter tags
- matchup tags
- synergy tags

The score can be calculated from the stored data.

The system does not need to guess hidden patterns.

### 4. It keeps AI out of decision-making

AI can sound confident even when it is wrong.

AI may also invent numbers, patch facts, matchup facts, or item values.

Wise Rift should not depend on AI for the actual recommendation.

The AI layer should only explain what the scoring engine already decided.

This keeps the app safer and easier to trust.

### 5. It is easier to test

Rule-based scoring can be tested with fixed inputs and expected outputs.

Example:

```txt
Given:
- user role is MID
- user champion pool includes Ahri and Akali
- enemy team has many squishy champions
- Akali is not banned
- active patch data is valid

Expected:
- Akali should receive higher assassin value
- score breakdown should include enemy squishy advantage
- reason codes should mention burst threat
```

This kind of test is harder if the AI decides the output.

### 6. It is better for portfolio quality

Rule-based scoring shows stronger software engineering skills.

It shows that the project has:

- clear input data
- scoring formulas
- reason codes
- deterministic behavior
- testable business logic
- separation between scoring and explanation
- patch-aware recommendations

This is more valuable than asking AI to make all decisions.

## Scoring Areas

The MVP scoring system should cover four main areas:

```txt
Ban Recommendation
Pick Recommendation
Team Composition Analysis
Item Build Suggestion
```

## Ban Recommendation Scoring

Ban recommendation should help the user decide what champion to ban before the pick phase.

### Ban Scoring Inputs

Ban scoring can use:

- active patch
- player role
- champion pool
- intended champion
- enemy common threats
- champion matchup tags
- champion counter tags
- champion difficulty to play against
- current meta strength
- user discomfort tags

### Ban Scoring Output

Each ban candidate should return:

- champion ID
- champion name
- final ban score
- confidence level
- reason codes
- score breakdown

### Example Ban Score Formula

```txt
banScore =
  matchupThreatScore
+ intendedChampionCounterScore
+ roleThreatScore
+ patchStrengthScore
+ userDiscomfortScore
- lowPickRiskPenalty
```

### Example Ban Reason Codes

```txt
COUNTERS_INTENDED_CHAMPION
HIGH_PATCH_STRENGTH
STRONG_INTO_PLAYER_ROLE
HARD_TO_ITEMIZE_AGAINST
HIGH_TEAMFIGHT_THREAT
USER_DISCOMFORT_PICK
```

## Pick Recommendation Scoring

Pick recommendation should help the user choose a champion during the live pick phase.

The pick phase is not linear.

Both teams pick champions in turns.

Because of this, pick recommendations should update when the draft board changes.

### Pick Scoring Inputs

Pick scoring can use:

- active patch
- player role
- champion pool
- team picks
- enemy picks
- banned champions
- intended champion
- champion comfort level
- matchup tags
- synergy tags
- team composition tags
- damage balance
- crowd control needs
- engage needs
- scaling needs

### Pick Scoring Output

Each pick candidate should return:

- champion ID
- champion name
- final pick score
- confidence level
- reason codes
- score breakdown
- risk notes

### Example Pick Score Formula

```txt
pickScore =
  championPoolComfortScore
+ matchupScore
+ teamSynergyScore
+ teamCompositionFitScore
+ patchStrengthScore
+ roleFitScore
- counterRiskPenalty
- teamWeaknessPenalty
```

### Example Pick Reason Codes

```txt
GOOD_MATCHUP
SAFE_PICK
STRONG_TEAM_SYNERGY
FITS_DAMAGE_BALANCE
ADDS_CROWD_CONTROL
ADDS_ENGAGE
GOOD_SCALING
HIGH_COMFORT_PICK
COUNTER_PICK_RISK
LOW_TEAM_SYNERGY
```

## Team Composition Scoring

Team composition scoring should help the user understand the team draft.

It should not only say which champion is best.

It should also explain what the team is missing.

### Team Composition Inputs

Team composition scoring can use:

- team picks
- enemy picks
- champion roles
- damage types
- crowd control tags
- engage tags
- disengage tags
- frontline tags
- poke tags
- burst tags
- scaling tags
- split push tags

### Team Composition Output

The team composition result should include:

- damage balance score
- crowd control score
- engage score
- frontline score
- scaling score
- early game score
- late game score
- teamfight score
- risk notes
- missing needs

### Example Team Composition Categories

```txt
Damage Balance
Crowd Control
Engage
Frontline
Peel
Scaling
Wave Clear
Teamfight
Pick Potential
Split Push
```

### Example Team Composition Reason Codes

```txt
LACKS_FRONTLINE
LACKS_ENGAGE
LACKS_MAGIC_DAMAGE
LACKS_PHYSICAL_DAMAGE
STRONG_TEAMFIGHT
STRONG_POKE
STRONG_SCALING
WEAK_EARLY_GAME
TOO_MANY_SQUISHY_CHAMPIONS
HIGH_CROWD_CONTROL
```

## Item Build Scoring

Item build scoring should suggest useful items based on the player champion and enemy draft.

The MVP does not need full combat simulation.

The MVP should use item tags, enemy team tags, and simple scoring rules.

### Item Build Inputs

Item build scoring can use:

- selected champion
- active patch
- enemy champions
- enemy damage type
- enemy healing level
- enemy shield level
- enemy tank level
- enemy crowd control level
- item stats
- item tags
- champion build profile
- matchup tags

### Item Build Output

The item build result should include:

- recommended item list
- item order
- situational items
- defensive item options
- anti-heal item options
- anti-shield item options
- magic resistance options
- armor options
- reason codes

### Example Item Score Formula

```txt
itemScore =
  championFitScore
+ enemyDamageCounterScore
+ enemyHealingCounterScore
+ enemyShieldCounterScore
+ enemyTankCounterScore
+ itemSynergyScore
- lowValuePenalty
```

### Example Item Reason Codes

```txt
COUNTERS_HEALING
COUNTERS_SHIELDS
GOOD_VS_TANKS
GOOD_VS_MAGIC_DAMAGE
GOOD_VS_PHYSICAL_DAMAGE
GOOD_FOR_BURST
GOOD_FOR_SCALING
CORE_ITEM
SITUATIONAL_DEFENSE
LOW_VALUE_THIS_GAME
```

## Confidence Levels

Each recommendation should include a confidence level.

Suggested confidence levels:

```txt
HIGH
MEDIUM
LOW
```

### HIGH

The recommendation has strong data support.

Example:

- champion is in user pool
- matchup data exists
- team composition need is clear
- active patch data is complete

### MEDIUM

The recommendation has enough support but some data is missing.

Example:

- champion data exists
- item tags exist
- matchup data is partial

### LOW

The recommendation has weak support.

Example:

- matchup data is missing
- champion data is incomplete
- item tags are placeholders
- draft state is too empty

## Score Breakdown

Every recommendation should include a score breakdown.

This helps the user understand why the result was chosen.

Example:

```json
{
  "championId": "akali",
  "finalScore": 82,
  "confidence": "HIGH",
  "scoreBreakdown": {
    "championPoolComfortScore": 18,
    "matchupScore": 22,
    "teamSynergyScore": 14,
    "teamCompositionFitScore": 16,
    "patchStrengthScore": 12,
    "counterRiskPenalty": -4
  },
  "reasonCodes": [
    "HIGH_COMFORT_PICK",
    "GOOD_MATCHUP",
    "FITS_DAMAGE_BALANCE",
    "COUNTER_PICK_RISK"
  ]
}
```

## Reason Codes

Reason codes are important because they connect scoring to explanation.

The scoring engine should return reason codes.

The AI layer can turn those reason codes into simple text.

Example:

```txt
GOOD_MATCHUP
FITS_DAMAGE_BALANCE
ADDS_CROWD_CONTROL
COUNTERS_HEALING
LACKS_FRONTLINE
```

The frontend can also show reason codes without using AI.

## AI Explanation Rule

AI should not calculate the recommendation.

AI should receive structured scoring results and explain them.

Example AI input:

```json
{
  "recommendationType": "PICK",
  "recommendedChampion": "Akali",
  "finalScore": 82,
  "confidence": "HIGH",
  "reasonCodes": ["HIGH_COMFORT_PICK", "GOOD_MATCHUP", "FITS_DAMAGE_BALANCE"],
  "scoreBreakdown": {
    "championPoolComfortScore": 18,
    "matchupScore": 22,
    "teamCompositionFitScore": 16
  }
}
```

Example AI output:

```txt
Akali is recommended because she is already in your champion pool, has a good matchup here, and helps your team add more burst damage. The pick still has some risk if the enemy saves a strong counter pick.
```

The AI output should be treated as explanation only.

It should not replace the scoring result.

## Patch-Aware Scoring

Scoring must use the patch attached to the draft session.

Example:

```txt
Draft Session A uses patch 6.1
Draft Session B uses patch 6.2
```

If a champion changes in patch 6.2, old draft sessions from patch 6.1 should still use patch 6.1 data.

This keeps old reviews accurate.

Important rule:

```txt
DraftSession.patchId should not change after creation.
```

## Live Draft Recalculation

Pick recommendations, team composition analysis, and item build suggestions should update during the live pick phase.

When the user updates team picks or enemy picks, Wise Rift should recalculate:

- pick recommendation
- team composition analysis
- item build suggestion
- risk notes

Example flow:

```txt
User enters enemy pick
→ Backend saves draft pick
→ Backend sends current draft state to recommendation service
→ Recommendation service recalculates scores
→ Backend stores recommendation result
→ Frontend shows updated recommendation
```

## Python Recommendation Service Direction

The scoring logic should live in the Python recommendation service.

Suggested early file structure:

```txt
apps/recommendation-service/
  app/
    main.py
    scoring/
      ban_scoring.py
      pick_scoring.py
      team_comp_scoring.py
      item_scoring.py
      confidence.py
      reason_codes.py
    schemas/
      draft.py
      recommendation.py
      game_data.py
    tests/
      test_ban_scoring.py
      test_pick_scoring.py
      test_team_comp_scoring.py
      test_item_scoring.py
```

The backend API should call this service when it needs recommendations.

The frontend should not calculate scoring logic directly.

## API Direction

The backend should expose recommendation routes.

Suggested routes:

```txt
GET /api/drafts/:draftSessionId/recommendations
POST /api/drafts/:draftSessionId/recommendations/recalculate
GET /api/drafts/:draftSessionId/recommendations/picks
GET /api/drafts/:draftSessionId/recommendations/bans
GET /api/drafts/:draftSessionId/recommendations/items
```

The backend should return structured scoring results.

The frontend can show:

- recommendation rank
- score
- confidence
- reasons
- score breakdown
- AI explanation if available

## Testing Strategy

Rule-based scoring should have tests.

Tests should cover:

- ban score calculation
- pick score calculation
- team composition scoring
- item scoring
- confidence levels
- reason codes
- missing data behavior
- banned champion exclusion
- champion pool filtering
- patch-specific data selection
- same input returns same output

Example test case:

```txt
Given Akali is banned
When pick recommendations are calculated
Then Akali should not appear as a valid pick recommendation
```

Example test case:

```txt
Given enemy team has high healing
When item build recommendation is calculated
Then anti-heal item options should receive higher score
```

## Consequences

### Positive Consequences

Rule-based scoring makes the MVP easier to build.

The system is easier to test.

The system is easier to debug.

The same input gives the same result.

The recommendation can be explained with score breakdowns and reason codes.

The app does not need a large dataset before the MVP works.

The AI layer becomes safer because it does not decide the answer.

### Negative Consequences

Rule-based scoring can be limited.

The system may miss patterns that real match data could reveal.

Scores may feel too simple at first.

The scoring quality depends on good rules and good manual data.

Weights may need many rounds of tuning.

### Risks

The main risks are:

- scoring weights may feel wrong
- data tags may be incomplete
- recommendations may be too generic
- item builds may miss special champion cases
- team composition scoring may oversimplify draft strategy

## Risk Mitigation

Wise Rift should reduce these risks by using:

- small MVP champion pool
- clear reason codes
- score breakdowns
- scoring tests
- manual review of recommendations
- data quality levels
- patch notes in data files
- feedback from real draft examples

The MVP should not claim that recommendations are perfect.

The app should present recommendations as decision support.

## Alternatives Considered

### Alternative 1: Let AI decide recommendations

Rejected.

AI can invent game facts and may produce inconsistent answers.

It is also harder to test and debug.

AI should explain the recommendation, not decide it.

### Alternative 2: Use machine learning from the start

Rejected for MVP.

Machine learning requires large, clean, trusted match data.

Wise Rift does not have that data at the beginning.

It would also make the system harder to explain.

### Alternative 3: Use only static tier lists

Rejected.

Static tier lists do not understand the user's champion pool, team picks, enemy picks, draft state, or item needs.

Wise Rift should give context-aware recommendations.

### Alternative 4: Use full combat simulation

Rejected for MVP.

Full combat simulation would require too much detail.

It would need exact damage formulas, cooldowns, ability levels, item timings, player behavior, positioning, and fight conditions.

This is too large for the MVP.

## Future Migration Path

Rule-based scoring is the best choice for MVP, but it can evolve later.

Possible future path:

```txt
Rule-based scoring
→ tuned weighted scoring
→ user feedback adjustment
→ match history support
→ statistical signals
→ hybrid scoring
→ machine learning experiments
```

### Future User Feedback

Wise Rift can later learn from user feedback.

Example:

```txt
User accepted recommendation
User ignored recommendation
User won match
User lost match
User rated recommendation helpful
```

This data can help tune scoring weights.

### Future Match History Support

If match history data becomes available, Wise Rift can add more signals.

Example:

- champion win rate
- role win rate
- matchup win rate
- item build success rate
- user personal win rate
- comfort score from past matches

These signals can improve scoring later.

### Future Hybrid Scoring

In the future, Wise Rift may combine:

- rule-based scoring
- patch data
- player preference data
- historical match data
- statistical signals

AI can still remain explanation-only unless there is a clear reason to change that decision.

## Final Decision

Wise Rift will use deterministic rule-based scoring for the MVP.

The scoring engine will decide ban recommendations, pick recommendations, team composition analysis, and item build suggestions.

The AI layer will explain the scoring result but will not create the recommendation.

This keeps Wise Rift simple, testable, explainable, and realistic for the first version.

## Related Documents

```txt
docs/architecture/system-architecture.md
docs/architecture/api-design.md
docs/architecture/data-model.md
docs/architecture/scoring.md
docs/architecture/patch-data.md
docs/architecture/game-data-model.md
docs/adr/manual-patch-data.md
```
