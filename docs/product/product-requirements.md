# Product Requirements

## Overview

This document defines the product requirements for **Wise Rift**.

Wise Rift is a single-user SaaS-style web and iOS application that helps Wild Rift players make better ban, pick, and item build decisions during draft.

This document explains how the product should behave from the user's point of view.

It covers:

- product goals
- user flow
- feature requirements
- business rules
- draft rules
- AI rules
- user stories
- acceptance criteria
- MVP boundaries

Detailed database design will be defined in:

```txt
docs/architecture/data-model.md
```

Detailed API design will be defined in:

```txt
docs/architecture/api-design.md
```

Detailed module design will be defined in:

```txt
docs/modules/
```

---

## Product Goal

The goal of Wise Rift is to help one Wild Rift player make clearer draft decisions.

The app should help the user answer these questions:

```txt
1. Which champions should I ban?
2. Which champion should I pick?
3. Is my team composition balanced?
4. Which items should I build against the enemy team?
5. What can I learn from this draft after the game?
```

Wise Rift should not promise perfect recommendations.

The product goal is decision support.

The user still makes the final decision.

---

## Target User

The MVP target user is one Wild Rift player.

The first version is designed for:

- solo queue players
- mid lane players
- players with a small champion pool
- players who want ban help
- players who want pick help
- players who want item build help
- players who want to save matchup notes
- players who want to learn from past drafts

The MVP does not support team accounts.

---

## Product Principles

Wise Rift should follow these principles.

### 1. Draft timing matters

The ban recommendation must happen early.

In Wild Rift draft, the ban phase happens before the full pick phase.

Because of this, Wise Rift should give ban recommendations right after the user chooses:

```txt
Role
Optional intended champion
```

The user should not need to enter full team picks before seeing ban recommendations.

---

### 2. Rule-based scoring decides

The recommendation engine decides the result using scoring rules.

AI does not decide the recommendation.

AI only explains the result in plain language.

Important rule:

```txt
Scoring engine decides.
AI explains.
User reviews.
```

---

### 3. Manual patch data is the source of truth

Champion stats, ability numbers, item stats, matchup rules, and build rules come from manually maintained patch data.

AI should not invent champion numbers.

AI should not invent item stats.

AI should not invent patch changes.

---

### 4. User comfort matters

Wise Rift should not only recommend the best champion on paper.

The app should also consider the user's champion pool and comfort score.

A strong meta champion should not always rank high if the user is bad or uncomfortable with that champion.

---

### 5. MVP should stay small

The MVP should focus on mid lane first.

The product should prove the core workflow before expanding to:

- all roles
- all champions
- full combat simulation
- public matchup database
- Riot API sync
- automatic patch scraping

---

## Core MVP Workflow

The main MVP workflow is:

```txt
Create Account
→ Select Active Patch
→ Create Champion Pool
→ Start Draft Session
→ Choose Role
→ Choose Intended Champion or Leave It Blank
→ Get Ban Recommendations
→ Enter Bans
→ Enter Team Picks
→ Enter Enemy Picks
→ Get Pick Recommendations
→ View Team Composition Analysis
→ View Item Build Suggestions
→ Save Matchup Notes
→ Save Match Result
→ Review Draft Performance
```

---

## User Roles

The MVP has one user role.

```txt
User
```

The user can:

- manage their own account
- manage their own champion pool
- create draft sessions
- get recommendations
- save matchup notes
- save match results
- view draft history

The MVP does not include:

- admin user
- coach user
- team member user
- public viewer
- moderator

Patch data can be managed through seed files during MVP development.

---

## Feature Requirements

## 1. Authentication

### Description

The user must be able to create an account and access only their own data.

### User Stories

```txt
As a user,
I want to sign up,
so that I can save my champion pool and draft history.
```

```txt
As a user,
I want to log in,
so that I can continue using my saved data.
```

```txt
As a user,
I want to log out,
so that my account is not left open.
```

### Requirements

The app should allow the user to:

- sign up with email and password
- log in with email and password
- log out
- access protected pages only after logging in
- access only their own data

### Acceptance Criteria

```txt
Given I am a new user
When I sign up with valid information
Then my account should be created
And I should be logged in
```

```txt
Given I am not logged in
When I try to access a protected page
Then I should be redirected to the login page
```

```txt
Given I am logged in
When I log out
Then I should no longer access protected pages
```

---

## 2. Active Patch

### Description

The app must use one active patch dataset for recommendations.

Patch data includes champion data, item data, matchup rules, ban rules, and build rules.

### User Stories

```txt
As a user,
I want recommendations based on the active patch,
so that the app reflects the current game version.
```

### Requirements

The app should:

- store patch records
- support one active patch
- load champion stats from the active patch
- load item stats from the active patch
- load matchup rules from the active patch
- load build rules from the active patch
- show the active patch version in the UI

### Acceptance Criteria

```txt
Given there is an active patch
When I start a draft session
Then the draft session should use that active patch
```

```txt
Given the active patch is changed later
When I view an old draft session
Then the old draft session should still keep its original patch reference
```

---

## 3. Champion Pool

### Description

The user can create a personal champion pool.

The champion pool helps Wise Rift recommend champions that the user can actually play.

### User Stories

```txt
As a user,
I want to add champions to my pool,
so that the app knows which champions I play.
```

```txt
As a user,
I want to set comfort scores,
so that the app can avoid recommending champions I am not comfortable with.
```

```txt
As a user,
I want to add notes to my champions,
so that I can remember matchup details and playstyle tips.
```

### Requirements

The user should be able to:

- view champion pool
- add champion to pool
- remove champion from pool
- set role
- set comfort score
- add notes
- edit notes
- update comfort score

A champion pool entry should include:

- champion
- role
- comfort score
- notes
- created date
- updated date

Comfort score should use a simple scale:

```txt
1 = very uncomfortable
10 = very comfortable
```

### Acceptance Criteria

```txt
Given I am logged in
When I add Akali to my champion pool
Then Akali should appear in my champion pool
```

```txt
Given Akali is in my champion pool
When I set comfort score to 8
Then future recommendations should use that comfort score
```

```txt
Given a champion is not in my pool
When the app recommends picks
Then the app should not recommend that champion by default
```

---

## 4. Draft Session

### Description

A draft session stores the current draft state.

It is the main object used for ban, pick, team composition, and item recommendations.

### User Stories

```txt
As a user,
I want to start a draft session,
so that I can get recommendations during champion select.
```

```txt
As a user,
I want to update draft information,
so that recommendations can change as the draft changes.
```

### Requirements

The user should be able to:

- create draft session
- select role
- select intended champion
- leave intended champion blank
- enter my team bans
- enter enemy team bans
- enter my team picks
- enter enemy team picks
- update draft state
- save draft session
- save match result after the game

A draft session should include:

- user
- patch
- role
- intended champion
- my team picks
- enemy team picks
- my team bans
- enemy team bans
- phase
- result
- created date
- updated date

### Draft Phases

The MVP should support these draft phases:

```txt
Setup
Ban Recommendation
Ban Entry
Pick Entry
Analysis
Post Game
Completed
```

### Acceptance Criteria

```txt
Given I am logged in
When I start a draft session
Then a new draft session should be created with the active patch
```

```txt
Given I start a draft session
When I select Mid as my role
Then the draft session should store Mid as my role
```

```txt
Given I do not know my intended champion yet
When I leave intended champion blank
Then the app should still allow ban recommendations
```

---

## 5. Ban Recommendation

### Description

The app recommends bans before the full pick phase.

Ban recommendation happens right after the user chooses role and optional intended champion.

### User Stories

```txt
As a user,
I want ban recommendations right after choosing my role,
so that I can help my team during the ban phase.
```

```txt
As a user,
I want the app to consider my intended champion,
so that I can ban champions that counter my pick.
```

```txt
As a user,
I want ban explanations,
so that I understand why a champion should be banned.
```

### Requirements

The app should generate ban recommendations based on:

- role
- intended champion if selected
- user champion pool
- user discomfort history
- patch meta score
- counter threat
- common role threats
- enemy likely picks
- team weakness if known
- enemy team if known

The ban recommendation should return:

- champion
- score
- reason
- score factors
- confidence level

The app should support ban recommendations even when intended champion is blank.

### Ban Recommendation Timing

Ban recommendation should happen here:

```txt
Choose Role
→ Choose Intended Champion or Leave It Blank
→ Get Ban Recommendations
```

Ban recommendation should not require:

- full team picks
- full enemy picks
- completed draft

### Acceptance Criteria

```txt
Given I selected Mid as my role
And I selected Akali as my intended champion
When I request ban recommendations
Then the app should recommend champions that are dangerous to Akali and Mid lane
```

```txt
Given I selected Mid as my role
And I left intended champion blank
When I request ban recommendations
Then the app should recommend role-based threats, meta threats, and discomfort-based bans
```

```txt
Given a champion is already banned
When ban recommendations are generated
Then that champion should not appear as a recommended ban
```

---

## 6. Pick Recommendation

### Description

The app recommends picks after draft picks begin.

Pick recommendation should consider team picks, enemy picks, user comfort, and matchup rules.

### User Stories

```txt
As a user,
I want pick recommendations,
so that I can choose a champion that fits the draft.
```

```txt
As a user,
I want the app to consider my champion pool,
so that it recommends champions I can play.
```

```txt
As a user,
I want to understand pick tradeoffs,
so that I know why one pick is safer than another.
```

### Requirements

The app should generate pick recommendations based on:

- user role
- user champion pool
- comfort score
- lane matchup
- team composition fit
- enemy threat safety
- patch meta score
- item build fit
- available champions

Pick recommendation should return:

- champion
- score
- reason
- lane matchup risk
- team composition fit
- main tradeoff
- confidence level

The MVP should recommend champions from the user's champion pool by default.

### Acceptance Criteria

```txt
Given my champion pool includes Akali, Viktor, Ahri, and Yasuo
And the enemy team has Jarvan and Malphite
When I request pick recommendations
Then the app should rank safer picks higher when hard engage is a major threat
```

```txt
Given Viktor has a better draft score than Akali
When the app recommends Viktor
Then the app should explain why Viktor is safer or better for the draft
```

```txt
Given a champion is already picked or banned
When pick recommendations are generated
Then that champion should not appear as an available pick
```

---

## 7. Team Composition Analysis

### Description

The app analyzes the user's team composition and enemy team threats.

The goal is to help the user understand what the draft has and what it lacks.

### User Stories

```txt
As a user,
I want to see team composition strengths,
so that I know what my team can do well.
```

```txt
As a user,
I want to see team composition weaknesses,
so that I know what risk my team has.
```

### Requirements

The app should analyze:

- AD damage
- AP damage
- true damage
- frontline
- engage
- disengage
- crowd control
- mobility
- wave clear
- scaling
- objective control
- healing
- shielding
- anti-tank pressure
- survivability

The analysis should return:

- team composition score
- strengths
- weaknesses
- missing needs
- enemy threat summary

### Acceptance Criteria

```txt
Given my team has strong late game damage
When team composition is analyzed
Then the result should list late game scaling as a strength
```

```txt
Given my team has no frontline
When team composition is analyzed
Then the result should list low frontline as a weakness
```

```txt
Given enemy team has hard engage
When team composition is analyzed
Then the result should warn about engage threat
```

---

## 8. Item Build Recommendation

### Description

The app recommends item builds based on the user's champion and enemy team.

The MVP should focus on item logic that is easy to explain.

### User Stories

```txt
As a user,
I want item recommendations against the enemy team,
so that I do not build the same items every game.
```

```txt
As a user,
I want the app to explain item choices,
so that I can learn when to build each item.
```

### Requirements

The item build engine should consider:

- user champion
- lane opponent
- enemy team damage profile
- enemy healing
- enemy shielding
- enemy crowd control
- enemy tankiness
- enemy armor
- enemy magic resistance
- game phase
- patch-specific item data

The item recommendation should return:

- core item suggestions
- situational item suggestions
- defensive item suggestions
- enchant suggestion
- reason for each item

### Rule Examples

```txt
Enemy has healing → recommend anti-heal
Enemy has shields → recommend anti-shield
Enemy has tanks → recommend penetration or high HP damage
Enemy has hard engage → recommend Stasis or defensive option
Enemy has burst AD → recommend armor or survivability
Enemy has burst AP → recommend magic resistance or survivability
```

### Acceptance Criteria

```txt
Given the enemy team has Soraka and Mundo
When item recommendations are generated
Then the app should recommend anti-heal
```

```txt
Given the enemy team has Malphite and Mundo
When item recommendations are generated
Then the app should recommend tank-counter options
```

```txt
Given the enemy team has hard engage
When item recommendations are generated
Then the app should recommend Stasis or another defensive option when relevant
```

---

## 9. Matchup Notes

### Description

The user can save matchup notes from real games.

These notes help the user remember difficult matchups and improve over time.

### User Stories

```txt
As a user,
I want to save matchup notes,
so that I can remember how to play difficult lanes.
```

```txt
As a user,
I want to view notes by champion,
so that I can prepare before picking that champion.
```

### Requirements

The user should be able to:

- create matchup note
- edit matchup note
- delete matchup note
- view notes by champion
- view notes by enemy champion
- save result with note

A matchup note should include:

- user
- champion
- enemy champion
- role
- note
- result
- created date
- updated date

### Acceptance Criteria

```txt
Given I played Akali against Orianna
When I save a matchup note
Then the note should be linked to Akali, Orianna, and Mid role
```

```txt
Given I have notes for Akali
When I view Akali details
Then I should see my saved matchup notes
```

---

## 10. Match Result

### Description

After a game, the user can save the match result and draft review notes.

### User Stories

```txt
As a user,
I want to save match result,
so that I can review whether the draft worked.
```

```txt
As a user,
I want to write what went wrong,
so that I can learn from the match.
```

### Requirements

The user should be able to save:

- result
- user champion
- enemy lane champion
- short review
- main draft problem
- notes for next time

Possible result values:

```txt
Win
Loss
Unknown
```

Possible main draft problem values:

```txt
Bad ban
Bad pick
Weak team composition
Wrong item build
Bad matchup
Too much crowd control
Too much enemy healing
Too much enemy tankiness
Other
```

### Acceptance Criteria

```txt
Given I completed a draft session
When I save the result as Loss
Then the draft session should store the loss result
```

```txt
Given I add a short review
When I save the match result
Then the review should appear in draft history
```

---

## 11. Post-Game Draft Review

### Description

The app can generate a draft review after the match.

The review should help the user understand the draft and learn for next time.

### User Stories

```txt
As a user,
I want a post-game draft review,
so that I can understand what I could have done better.
```

### Requirements

The review should explain:

- whether the ban made sense
- whether the pick made sense
- what the team composition lacked
- what enemy threats mattered
- what item choices were important
- what the user can learn next time

AI can generate the review, but the review must be treated as draft text.

### Acceptance Criteria

```txt
Given I saved a match result
When I request a post-game draft review
Then the app should generate a plain-language review
```

```txt
Given AI generates a review
When the review appears
Then it should be saved as draft text
```

---

## 12. Draft History

### Description

The user can view past draft sessions and analyses.

### User Stories

```txt
As a user,
I want to view draft history,
so that I can review past recommendations and results.
```

### Requirements

The user should be able to:

- view all draft sessions
- filter draft sessions by champion
- filter draft sessions by result
- view draft details
- view recommendation history
- view saved notes

The MVP does not need advanced analytics.

### Acceptance Criteria

```txt
Given I have saved draft sessions
When I open draft history
Then I should see my past draft sessions
```

```txt
Given I open a draft session from history
Then I should see the selected champion, enemy team, recommendations, result, and notes
```

---

## AI Requirements

## AI Purpose

AI should make recommendations easier to understand.

AI should not be the decision maker.

AI can:

- explain ban recommendations
- explain pick recommendations
- explain item recommendations
- summarize matchup notes
- generate post-game draft reviews
- explain tradeoffs in plain language

AI cannot:

- create champion stats
- create item stats
- create patch changes
- override scoring rules
- guarantee match results
- make hidden decisions

---

## AI Output Rules

AI output should be:

- clear
- short
- plain language
- tied to score factors
- saved as draft text
- safe to edit or ignore

AI output should avoid:

- fake patch data
- fake item numbers
- overconfident claims
- saying a pick guarantees a win
- unsupported matchup claims

Important rule:

```txt
AI can explain the recommendation.
AI cannot invent the recommendation.
```

---

## Recommendation Requirements

## Ban Score

Ban recommendation uses this formula:

```txt
banScore =
  metaThreatScore * 0.25
+ userDiscomfortScore * 0.25
+ counterThreatScore * 0.25
+ teamWeaknessExploitScore * 0.15
+ enemyLikelyPickScore * 0.10
```

The app should explain the top score factors.

---

## Pick Score

Pick recommendation uses this formula:

```txt
pickScore =
  userComfortScore * 0.25
+ laneMatchupScore * 0.25
+ teamCompFitScore * 0.20
+ enemyThreatSafetyScore * 0.15
+ metaScore * 0.10
+ itemBuildFitScore * 0.05
```

The app should explain the top score factors.

---

## Team Composition Score

Team composition score uses this formula:

```txt
teamCompScore =
  damageBalanceScore * 0.20
+ frontlineScore * 0.15
+ engageScore * 0.15
+ crowdControlScore * 0.15
+ waveClearScore * 0.10
+ scalingScore * 0.10
+ objectiveControlScore * 0.10
+ survivabilityScore * 0.05
```

The app should explain strengths and weaknesses.

---

## Item Score

Item recommendation uses this formula:

```txt
itemScore =
  championSynergyScore * 0.30
+ enemyCounterScore * 0.30
+ laneMatchupScore * 0.15
+ teamNeedScore * 0.15
+ gamePhaseScore * 0.10
```

The app should explain why each item is suggested.

---

## State Requirements

## Draft Session Status

Draft session status should support:

```txt
Setup
Ban Recommendation
Ban Entry
Pick Entry
Analysis
Post Game
Completed
Archived
```

---

## Draft Analysis Type

Draft analysis type should support:

```txt
Ban Recommendation
Pick Recommendation
Team Composition
Item Build
Post-Game Review
```

---

## AI Job Status

AI job status should support:

```txt
Queued
Processing
Completed
Failed
Canceled
```

For early MVP, AI can run synchronously first.

AI job tracking can be added when async jobs are needed.

---

## Validation Requirements

The app should validate user input.

### Champion Pool Validation

- Champion is required
- Role is required
- Comfort score must be between 1 and 10
- Notes are optional

### Draft Session Validation

- Role is required
- Intended champion is optional
- Picks must be valid champion IDs
- Bans must be valid champion IDs
- A champion cannot be picked and banned in the same draft
- A champion should not appear twice in the same draft state

### Matchup Note Validation

- Champion is required
- Enemy champion is required
- Role is required
- Note is required
- Result is optional

### Match Result Validation

- Result must be Win, Loss, or Unknown
- Review is optional
- Main draft problem is optional

---

## Error and Empty States

The product should include useful empty states.

### Champion Pool Empty State

```txt
You have not added any champions yet.
Add champions to your pool so Wise Rift can recommend picks you are comfortable with.
```

### Draft History Empty State

```txt
No draft sessions yet.
Start a draft session to get ban, pick, and item recommendations.
```

### No Ban Recommendation State

```txt
No ban recommendation is available yet.
Check that the active patch has champion and matchup data.
```

### No Pick Recommendation State

```txt
No pick recommendation is available yet.
Add champions to your champion pool or update the draft state.
```

### AI Failure State

```txt
The recommendation was calculated, but the explanation could not be generated.
You can still view the score and recommendation.
```

---

## Non-Functional Requirements

## Performance

The app should feel fast during draft.

MVP target:

```txt
Ban recommendation: under 2 seconds
Pick recommendation: under 2 seconds
Team composition analysis: under 2 seconds
Item recommendation: under 2 seconds
AI explanation: can take longer, but should show loading state
```

---

## Security

The app should protect user data.

Requirements:

- password should be hashed
- protected routes should require login
- user should access only their own data
- API should validate input
- API should not expose password hash
- environment variables should not be committed

---

## Reliability

The app should handle errors clearly.

Requirements:

- show API error messages
- handle missing patch data
- handle missing champion data
- handle scoring service failure
- handle AI explanation failure
- save draft sessions safely

---

## Usability

The app should be easy to use during draft.

Requirements:

- quick champion search
- fast role selection
- simple draft input
- short explanations by default
- expandable details for score factors
- mobile-friendly layout
- clear loading states
- clear disabled states

---

## MVP Acceptance Flow

The MVP is accepted when the user can complete this flow:

```txt
1. Sign up
2. Log in
3. View active patch
4. Add champions to champion pool
5. Set comfort scores
6. Start draft session
7. Choose role: Mid
8. Choose intended champion or leave it blank
9. Get ban recommendations
10. Enter bans
11. Enter team picks
12. Enter enemy picks
13. Get pick recommendations
14. View team composition analysis
15. View item build suggestions
16. Save matchup note
17. Save match result
18. View post-game draft review
19. View draft in draft history
```

---

## MVP Exclusions

The MVP does not include:

- all champions
- all roles
- automatic patch scraping
- Riot API sync
- public matchup database
- team accounts
- live match data
- advanced combat simulation
- full mobile app release
- billing
- subscriptions
- public sharing
- ranked match import
- push notifications
- advanced analytics

---

## Open Questions

### Product Questions

- Should pick recommendations only use champions from the user's pool?
- Should the user be able to request picks outside their champion pool?
- Should the intended champion field support multiple possible champions?
- Should the app recommend bans for the whole team or only for the user's role?
- Should ban recommendations update after each ban is entered?
- Should item recommendations show a full build or grouped item focus first?
- Should matchup notes appear automatically during draft?
- Should post-game review be optional or shown after every saved result?

### Technical Questions

- Should auth use JWT or HTTP-only cookies?
- Should AI explanations be synchronous for MVP?
- Should the Python scoring service read from the database directly?
- Should the API send normalized draft data to the Python service?
- Should Redis and BullMQ be added early or later?
- Should Prisma live in `apps/api` or `packages/database`?
- Should shared types live in `packages/shared`?

### UX Questions

- Should Quick Draft be one screen or step-by-step?
- Should the ban recommendation screen show top 3 or top 5 bans?
- Should explanations be collapsed by default?
- Should score factors show numbers or labels?
- Should item build suggestions use cards, tables, or grouped sections?
- Should champion pool use cards or a table?

---

## Final Product Boundary

Wise Rift is not a full coaching platform.

Wise Rift is not a public game statistics website.

Wise Rift is not a complete Wild Rift database.

Wise Rift is not an automatic patch scraper.

Wise Rift is a focused draft assistant for one player.

The MVP should prove this core product idea:

```txt
A Wild Rift player can choose a role, choose an optional intended champion, get early ban recommendations, enter draft picks, and receive clear pick, team composition, and item build guidance.
```
