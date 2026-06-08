# ADR: AI Explanation Layer

## Status

Accepted

## Date

2026-06-08

## Context

Wise Rift needs to help Wild Rift players understand draft recommendations.

The app gives support for:

- ban recommendation
- pick recommendation
- team composition analysis
- item build suggestion
- matchup notes
- post-game draft review

The recommendation result can include many technical details.

For example:

- final score
- confidence level
- score breakdown
- reason codes
- matchup tags
- synergy tags
- item counter tags
- team composition risks

This information is useful, but it can feel too complex for the user.

Wise Rift needs a way to explain recommendations in simple language.

At the same time, Wise Rift should not allow AI to become the source of truth.

AI can make mistakes.

AI can sound confident even when the answer is wrong.

AI can invent champion numbers, item stats, matchup facts, or patch changes.

Because of this, Wise Rift needs a strict AI boundary.

The core rule is:

```txt
Scoring engine decides.
AI explains.
User reviews.
```

## Decision

Wise Rift will use AI as an explanation layer only.

AI will explain recommendation results from the scoring engine.

AI will not decide the final recommendation.

AI will not create or change champion data, item data, rune data, summoner spell data, matchup data, patch data, or scoring rules.

The scoring engine remains the source of recommendation decisions.

Manual patch data remains the source of game data.

The user remains responsible for reviewing the suggestion.

## Main Rule

Wise Rift will follow this rule:

```txt
AI explains the result.
AI does not create the result.
```

The AI layer can receive structured scoring data and turn it into plain language.

The AI layer cannot replace the scoring engine.

## Why AI Is Explanation-Only

### 1. AI should not invent game data

Wise Rift depends on patch-versioned game data.

This includes:

- champion stats
- champion skill details
- item stats
- item effects
- rune stats
- summoner spell stats
- matchup tags
- synergy tags
- scoring tags

AI should not invent or guess these values.

If AI creates fake data, the recommendation becomes unreliable.

For example, AI should not say:

```txt
This item gives 60 magic resistance.
```

unless that value exists in the stored patch data.

### 2. AI output is not deterministic enough

The scoring engine should return the same result when the same input is used.

AI output can change even when the input is similar.

This makes AI bad as the decision-maker for the MVP.

Wise Rift needs stable recommendation behavior.

Important rule:

```txt
Same input should return the same scoring output.
```

AI can write the explanation in different words, but the recommendation result should stay the same.

### 3. AI is harder to test as a decision engine

Rule-based scoring can be tested with fixed inputs and expected outputs.

For example:

```txt
Given enemy team has high healing
When item recommendation is calculated
Then anti-heal item options should receive higher score
```

This is easy to test.

If AI decides the item build directly, the result becomes harder to test and debug.

### 4. AI works better as a translator

AI is useful for turning structured technical data into simple explanation.

For example, the scoring engine may return:

```txt
GOOD_MATCHUP
HIGH_COMFORT_PICK
FITS_DAMAGE_BALANCE
COUNTER_PICK_RISK
```

AI can explain this as:

```txt
Akali is a strong option here because she is already in your champion pool, has a good matchup, and helps your team add burst damage. The pick still has some risk if the enemy saves a strong counter pick.
```

This is the right use of AI for the MVP.

### 5. It protects user trust

The user should know why a recommendation was made.

If AI gives a recommendation without score breakdown or reason codes, the user has to trust a black box.

Wise Rift should avoid that.

The app should show:

- recommendation rank
- score
- confidence
- reason codes
- score breakdown
- AI explanation

AI explanation should support the scoring result, not hide it.

## What AI Can Do

AI can help with explanation tasks.

Allowed AI tasks include:

- explain why a champion is recommended
- explain why a champion is risky
- explain why a ban is suggested
- explain what the team composition lacks
- explain why an item is useful
- summarize matchup notes
- summarize draft review results
- turn reason codes into simple language
- make explanations easier for new players
- explain tradeoffs in a calm tone

Example allowed AI output:

```txt
Ahri is recommended because she gives your team safer engage, good pick potential, and magic damage. The score is not perfect because the enemy team has strong crowd control, so you still need to play around positioning.
```

## What AI Cannot Do

AI cannot be used as the source of truth.

AI cannot:

- choose the final recommended ban
- choose the final recommended pick
- choose the final item build
- modify scoring results
- invent champion stats
- invent item stats
- invent rune values
- invent summoner spell values
- invent patch changes
- invent matchup facts
- override confidence level
- hide score breakdown
- create fake reason codes
- create fake data sources
- claim a recommendation is guaranteed to win

AI should not say:

```txt
This pick will win the game.
```

Instead, AI can say:

```txt
This pick looks useful based on the current draft data, but the user should still review the matchup and playstyle.
```

## AI Input Format

The AI layer should receive structured data from the backend.

It should not receive a vague prompt only.

Example input:

```json
{
  "recommendationType": "PICK",
  "activePatch": {
    "patchId": "wild-rift-6.1",
    "version": "6.1"
  },
  "draftState": {
    "role": "MID",
    "teamPicks": ["vi", "malphite"],
    "enemyPicks": ["jinx", "milio"],
    "bannedChampions": ["yasuo", "zed"]
  },
  "recommendation": {
    "championId": "ahri",
    "displayName": "Ahri",
    "finalScore": 84,
    "confidence": "HIGH",
    "rank": 1,
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
    ]
  }
}
```

The AI should explain only from this data.

## AI Output Format

The AI output should be simple and structured.

Suggested response shape:

```json
{
  "summary": "Ahri is the top recommendation for this draft.",
  "explanation": "Ahri is recommended because she is already in your champion pool, gives your team magic damage, and adds strong pick potential. She also fits well with Vi and Malphite because they can start fights and help Ahri follow up.",
  "riskNote": "The main risk is counter-pick pressure. If the enemy saves a strong mid lane counter, this pick may become harder.",
  "confidenceNote": "Confidence is high because the champion data, team composition data, and matchup tags are available."
}
```

The frontend can show these sections separately.

## Explanation Tone

AI explanations should be:

- simple
- short
- clear
- honest
- beginner-friendly
- not too confident
- not too technical unless needed

Preferred style:

```txt
Clear draft advice.
Plain language.
No fake certainty.
No invented stats.
```

Avoid:

```txt
This champion is broken.
This item guarantees the win.
The enemy cannot play against this.
This is always the best choice.
```

Use:

```txt
This champion looks strong here.
This item helps against their healing.
This pick has good synergy with your team.
This choice still has risk if the enemy drafts more crowd control.
```

## AI Safety Rules

### Rule 1: AI must not invent numbers

If the input does not include a number, AI should not create one.

Bad:

```txt
This item gives 45 armor.
```

Good:

```txt
This item is marked as an armor option in the current patch data.
```

### Rule 2: AI must not claim hidden game facts

AI should not claim facts that are not in the input.

Bad:

```txt
This matchup has a 58% win rate.
```

Good:

```txt
The scoring result marks this as a favorable matchup.
```

### Rule 3: AI must not override scoring

If the scoring engine recommends Ahri, AI should not recommend Akali instead.

Bad:

```txt
Even though Ahri scored first, Akali is the better choice.
```

Good:

```txt
Ahri is ranked first by the scoring engine. Akali may still be worth reviewing if the user prefers a higher-risk assassin pick.
```

### Rule 4: AI must show uncertainty

If confidence is low, AI should say that clearly.

Example:

```txt
Confidence is low because some matchup data is missing. Treat this as a rough suggestion, not a final answer.
```

### Rule 5: AI must not promise wins

Wise Rift is a decision-support tool.

AI should not promise that a pick, ban, or item build will win the game.

## Fallback Behavior

The app should still work if AI is unavailable.

If the AI service fails, Wise Rift should show:

- recommendation rank
- score
- confidence
- reason codes
- score breakdown
- simple fallback text

Example fallback text:

```txt
AI explanation is unavailable. The recommendation is still based on the scoring engine.
```

The recommendation should not fail just because AI explanation fails.

## Error Handling

If AI explanation fails, the backend should return a safe response.

Example:

```json
{
  "success": true,
  "data": {
    "recommendation": {
      "championId": "ahri",
      "finalScore": 84,
      "confidence": "HIGH",
      "reasonCodes": ["HIGH_COMFORT_PICK", "GOOD_MATCHUP", "ADDS_MAGIC_DAMAGE"]
    },
    "aiExplanation": null,
    "fallbackExplanation": "AI explanation is unavailable. This recommendation is still based on the scoring engine."
  }
}
```

## Storage Direction

AI explanations can be stored after generation.

This can help with:

- draft history
- post-game review
- debugging
- user experience
- reducing repeated AI calls

Suggested stored fields:

```txt
aiExplanationId
draftSessionId
recommendationId
explanationType
inputSnapshot
summary
explanation
riskNote
confidenceNote
modelName
createdAt
```

The stored explanation should be tied to the recommendation result that created it.

If the recommendation changes, a new explanation should be generated.

## API Direction

Suggested AI explanation routes:

```txt
POST /api/ai/explanations
GET /api/ai/explanations/:aiExplanationId
POST /api/drafts/:draftSessionId/recommendations/:recommendationId/explanation
```

The backend should control AI calls.

The frontend should not call the AI provider directly.

## Data Flow

Suggested AI explanation flow:

```txt
Frontend requests explanation
→ Backend loads draft session
→ Backend loads recommendation result
→ Backend checks patch data and score data
→ Backend builds structured AI input
→ AI generates explanation
→ Backend validates explanation shape
→ Backend stores explanation
→ Frontend displays explanation
```

## Validation Direction

The backend should validate AI output before saving it.

Validation should check:

- required fields exist
- output is not empty
- output does not include banned phrases
- output does not claim guaranteed win
- output does not include unsupported numbers
- output matches expected JSON shape
- output stays connected to the scoring result

The first MVP validation can be simple.

Future validation can become stricter.

## Consequences

### Positive Consequences

AI explanations make Wise Rift easier to use.

Users can understand recommendations without reading raw score data.

The system keeps strong separation of responsibility.

The scoring engine stays testable.

The AI layer stays safer.

The app can still work without AI.

The user can see both structured scores and plain-language explanation.

### Negative Consequences

AI explanation adds cost.

AI explanation adds latency.

AI output may still need validation.

Some explanations may feel generic.

The backend needs extra logic for prompt building, response validation, and fallback handling.

### Risks

The main risks are:

- AI may invent unsupported details
- AI may sound too confident
- AI may explain the wrong reason
- AI may produce inconsistent wording
- AI provider may be slow
- AI provider may be unavailable
- AI costs may grow if explanations are generated too often

## Risk Mitigation

Wise Rift should reduce these risks by using:

- structured AI input
- strict AI instructions
- reason codes
- score breakdowns
- output validation
- fallback explanation
- stored explanations
- rate limits
- short explanation length
- clear UI labels

The UI should make it clear that AI explanation is a support feature.

The recommendation itself comes from the scoring engine.

## Alternatives Considered

### Alternative 1: Let AI decide recommendations

Rejected.

AI can invent facts, change answers, and make decisions that are hard to test.

Wise Rift should not use AI as the decision-maker for MVP.

### Alternative 2: Do not use AI at all

Rejected for now.

Without AI, the app can still work, but explanations may feel too technical.

AI adds value by translating score breakdowns into simple player-friendly language.

### Alternative 3: Use AI to generate patch data

Rejected.

Patch data must be manually maintained and validated.

AI can help format text during development, but it cannot be the source of truth.

### Alternative 4: Let frontend call AI directly

Rejected.

The backend should control AI requests because it can:

- protect API keys
- validate input
- validate output
- apply rate limits
- store explanations
- connect explanations to recommendation records

## Future Migration Path

The MVP starts with AI explanation only.

Future versions may add stronger explanation features.

Possible future path:

```txt
Basic AI explanation
→ structured explanation templates
→ user tone preferences
→ draft review summaries
→ matchup learning notes
→ post-game coaching summaries
→ personalized explanation style
```

AI can become more useful over time, but the main decision boundary should remain clear.

The scoring engine should continue to decide unless there is a strong reason to change the architecture.

## Final Decision

Wise Rift will use AI as an explanation layer only.

The AI layer will explain recommendation results from the scoring engine in simple language.

The AI layer will not decide recommendations.

The AI layer will not create game data.

The AI layer will not override scoring results.

This keeps Wise Rift easier to trust, easier to test, and safer to build for the MVP.

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
```
