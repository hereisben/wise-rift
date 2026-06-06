# User Flow

## Overview

This document defines the main user flows for **Wise Rift**.

Wise Rift is a single-user draft assistant for Wild Rift players.

The product helps the user move through this core draft workflow:

```txt
Choose Role
→ Choose Intended Champion or Leave It Blank
→ Get Ban Recommendations
→ Enter Bans
→ Start Pick Phase
→ Update Team and Enemy Picks as Draft Changes
→ View Live Pick Recommendations
→ View Live Team Composition Analysis
→ View Live Item Build Suggestions
→ Save Match Result
→ Review Draft Performance
```

This document focuses on the user's journey through the product.

Detailed feature behavior is defined in:

```txt
docs/product/product-requirements.md
```

Detailed system design will be defined in:

```txt
docs/architecture/system-architecture.md
```

---

## Main User Journey

The main user journey starts when the user opens Wise Rift and wants help during champion select.

```txt
Open App
→ Log In
→ View Dashboard
→ Check Active Patch
→ Manage Champion Pool
→ Start Draft Session
→ Get Ban Recommendations
→ Enter Bans
→ Start Live Pick Phase
→ Update Picks as Draft Changes
→ View Live Recommendations
→ Save Match Result
→ Review Draft History
```

The MVP should make this flow fast and simple.

The user may be in champion select while using the app, so the draft screens should avoid slow and complex steps.

---

## User Flow Map

```txt
Authentication
├─ Sign Up
├─ Log In
└─ Log Out

Dashboard
├─ View Active Patch
├─ View Recent Draft Sessions
├─ View Champion Pool Summary
└─ Start New Draft

Champion Pool
├─ View Champion Pool
├─ Add Champion
├─ Set Role
├─ Set Comfort Score
├─ Add Notes
└─ Edit Champion Pool Entry

Draft Setup
├─ Select Role
├─ Select Intended Champion or Leave Blank
└─ Continue to Ban Recommendation

Ban Phase
├─ Get Ban Recommendations
├─ View Top Ban Options
├─ Enter My Team Bans
├─ Enter Enemy Team Bans
└─ Continue to Pick Phase

Live Pick Phase
├─ Enter or Update My Team Picks
├─ Enter or Update Enemy Team Picks
├─ Recalculate Pick Recommendations
├─ Recalculate Team Composition Analysis
├─ Recalculate Item Build Suggestions
└─ Continue Until Draft Is Complete

Post Game
├─ Save Match Result
├─ Add Matchup Note
├─ Generate Draft Review
└─ View Draft History
```

---

## Flow 1 — First-Time User Flow

This flow covers a new user who opens Wise Rift for the first time.

```txt
Open App
→ Sign Up
→ Log In
→ View Empty Dashboard
→ View Active Patch
→ Add Champions to Champion Pool
→ Set Comfort Scores
→ Start First Draft Session
```

### Expected User Experience

The user should understand that Wise Rift needs a champion pool before it can give strong pick recommendations.

The app should guide the user to add champions first.

### Empty State

If the user has no champions in their pool, the app should show:

```txt
You have not added any champions yet.
Add champions to your pool so Wise Rift can recommend picks you are comfortable with.
```

### Success Result

The first-time setup is successful when:

```txt
The user has an account
The user can see the active patch
The user has at least one champion in their pool
The user can start a draft session
```

---

## Flow 2 — Returning User Flow

This flow covers a user who already has an account and champion pool.

```txt
Open App
→ Log In
→ View Dashboard
→ Check Active Patch
→ Start Draft Session
```

### Expected User Experience

The user should be able to start a draft quickly.

The dashboard should show:

- active patch
- recent draft sessions
- champion pool summary
- start draft button

### Success Result

The returning user flow is successful when:

```txt
The user can log in
The user can view saved data
The user can start a new draft session quickly
```

---

## Flow 3 — Champion Pool Flow

This flow covers how the user manages their personal champion pool.

```txt
Open Champion Pool
→ Search Champion
→ Add Champion
→ Select Role
→ Set Comfort Score
→ Add Notes
→ Save Champion Pool Entry
```

### Champion Pool Entry

Each champion pool entry should include:

```txt
Champion
Role
Comfort Score
Notes
Created Date
Updated Date
```

### Comfort Score

Comfort score should use this scale:

```txt
1 = very uncomfortable
10 = very comfortable
```

### Example Flow

```txt
Open Champion Pool
→ Search Akali
→ Add Akali
→ Select Mid
→ Set Comfort Score: 8
→ Add Notes
→ Save
```

### Success Result

The champion pool flow is successful when:

```txt
The champion appears in the user's pool
The role is saved
The comfort score is saved
The notes are saved
The recommendation engine can use this champion later
```

---

## Flow 4 — Start Draft Session Flow

This flow starts the main draft assistant experience.

```txt
Click Start Draft
→ Active Patch is attached to draft session
→ Select Role
→ Select Intended Champion or Leave Blank
→ Continue to Ban Recommendation
```

### Important Rule

The intended champion is optional.

The user may know what they want to play.

The user may also leave it blank if they are still flexible.

### Draft Setup Fields

The setup screen should include:

```txt
Role
Intended Champion
Active Patch
Champion Pool Preview
Start Ban Recommendation Button
```

### Success Result

The draft session setup is successful when:

```txt
A draft session is created
The active patch is attached
The user's role is saved
The intended champion is saved or left blank
The user can request ban recommendations
```

---

## Flow 5 — Ban Recommendation Flow

This is one of the most important flows in Wise Rift.

In Wild Rift draft, the ban phase happens before the full pick phase.

Because of this, Wise Rift must show ban recommendations early.

```txt
Select Role
→ Select Intended Champion or Leave Blank
→ Get Ban Recommendations
→ View Top Ban Options
→ Enter Final Bans
→ Continue to Pick Phase
```

### Case A — Intended Champion Selected

Example:

```txt
Role: Mid
Intended Champion: Akali
```

The app should recommend bans based on:

- Akali counters
- mid lane threats
- meta threats
- user discomfort history
- common difficult matchups
- patch-specific champion strength

Example output:

```txt
Recommended Ban: Galio

Reason:
Galio can punish Akali's engage pattern and adds reliable crowd control.
```

### Case B — Intended Champion Blank

Example:

```txt
Role: Mid
Intended Champion: Blank
```

The app should recommend bans based on:

- mid lane threats
- meta threats
- user discomfort history
- champion pool weaknesses
- common difficult matchups

Example output:

```txt
Recommended Ban: Galio

Reason:
Galio is a strong mid lane threat and can counter many melee AP champions in your pool.
```

### Ban Recommendation Screen

The ban recommendation screen should show:

```txt
Top recommended bans
Score
Short reason
Main score factors
Confidence level
Already banned champions
Button to enter bans
```

### Success Result

The ban recommendation flow is successful when:

```txt
The user can get ban recommendations before entering full team picks
The recommendations respect already banned champions
The user can understand why each ban is suggested
The user can enter final bans and continue the draft
```

---

## Flow 6 — Ban Entry Flow

After the user sees ban recommendations, the user enters the real bans from the match.

```txt
View Ban Recommendations
→ Enter My Team Bans
→ Enter Enemy Team Bans
→ Save Bans
→ Continue to Pick Phase
```

### Ban Entry Rules

The app should validate that:

```txt
A banned champion is a valid champion
The same champion cannot be banned twice
A banned champion cannot be picked later
```

### Success Result

The ban entry flow is successful when:

```txt
My team bans are saved
Enemy team bans are saved
Banned champions are removed from available picks
The user can continue to pick phase
```

---

## Flow 7 — Live Pick Phase Flow

This flow happens after bans are entered and both teams begin picking champions.

In Wild Rift draft, both teams pick champions in turns.

Because of this, Wise Rift should not treat team picks and enemy picks as two separate one-time steps.

The app should allow the user to update the draft state after each pick.

```txt
Start Pick Phase
→ Enter or Update My Team Picks
→ Enter or Update Enemy Team Picks
→ Recalculate Pick Recommendations
→ Recalculate Team Composition Analysis
→ Recalculate Item Build Suggestions
→ Continue Until Draft Is Complete
```

### Live Draft Behavior

During the pick phase, the user can update:

- my team picks
- enemy team picks
- my final champion
- available champions

After each update, the app should refresh:

- pick recommendations
- team composition analysis
- enemy threat summary
- item build suggestions when enough enemy data exists

### Why This Flow Is Not Linear

The pick phase should not be treated like this:

```txt
Enter Team Picks
→ Enter Enemy Picks
→ Get Pick Recommendations
→ View Team Composition Analysis
→ View Item Build Suggestions
```

That flow is too linear.

The real draft is more like this:

```txt
Team A picks
→ Team B picks
→ Team B picks
→ Team A picks
→ Team A picks
→ Team B picks
→ Continue until draft is complete
```

Because picks happen in turns, Wise Rift should update recommendations live as the draft changes.

### Live Pick Phase Screen

The live pick phase screen should show:

```txt
My Team Picks
Enemy Team Picks
Banned Champions
Available Champions
Current Recommendation Panel
Team Composition Panel
Item Suggestion Panel
```

### Pick Entry Rules

The app should validate that:

```txt
A picked champion is a valid champion
The same champion cannot be picked twice
A picked champion cannot already be banned
A picked champion should be removed from available champions
```

### Success Result

The live pick phase flow is successful when:

```txt
The user can update picks as the draft changes
The app recalculates recommendations after each update
The app does not require the full draft to be complete before showing useful guidance
The user can view pick, team composition, and item suggestions during the draft
```

---

## Flow 8 — Pick Recommendation Flow

This flow recommends which champion the user should pick during the live pick phase.

```txt
Draft State Updates
→ Recalculate Pick Recommendations
→ View Ranked Picks
→ View Pick Reason
→ Select Final Pick
```

### Pick Recommendation Inputs

Pick recommendations should consider:

```txt
User role
User champion pool
Comfort score
My team picks
Enemy team picks
Bans
Lane matchup
Team composition fit
Enemy threat safety
Patch meta score
Available champions
```

### Pick Recommendation Screen

The screen should show:

```txt
Recommended picks
Score
Short reason
Lane matchup risk
Team composition fit
Main tradeoff
Confidence level
```

### Example Output

```txt
Recommended Pick: Viktor

Reason:
Viktor gives safer scaling, strong wave clear, AP damage, and better spacing against Jarvan and Malphite engage.
```

### Success Result

The pick recommendation flow is successful when:

```txt
The app ranks available champions
The app does not recommend banned champions
The app does not recommend already picked champions
The app uses the user's champion pool by default
The app explains why the top pick is recommended
The app updates recommendations when the draft state changes
```

---

## Flow 9 — Team Composition Analysis Flow

This flow helps the user understand the draft during the live pick phase.

```txt
Draft State Updates
→ Recalculate Team Composition
→ View Strengths and Weaknesses
```

### Team Composition Inputs

The analyzer should consider:

```txt
My team picks
Enemy team picks
User role
User champion
Patch data
Champion tags
Damage profiles
```

### Team Composition Output

The analysis should show:

```txt
Team Composition Score
Strengths
Weaknesses
Missing Needs
Enemy Threat Summary
```

### Example Output

```txt
Team Composition Score: 72/100

Strengths:
- Strong late game
- Good backline protection
- Strong objective damage

Weaknesses:
- Low engage
- Weak early mid pressure
- Vulnerable to hard dive
```

### Success Result

The team composition flow is successful when:

```txt
The user can see what the team does well
The user can see what the team lacks
The user can understand enemy threats
The result is short enough to read during draft
The analysis updates when team or enemy picks change
```

---

## Flow 10 — Item Build Recommendation Flow

This flow recommends item focus and item choices during the live pick phase.

Item suggestions can update as enemy picks are entered.

```txt
Draft State Updates
→ Enemy Picks Change
→ Recalculate Item Build Suggestions
→ View Core Items
→ View Situational Items
→ View Defensive Options
```

### Item Recommendation Inputs

The item engine should consider:

```txt
User champion
Lane opponent
Enemy team damage profile
Enemy healing
Enemy shielding
Enemy crowd control
Enemy tankiness
Enemy armor
Enemy magic resistance
Game phase
Patch item data
```

### Item Recommendation Output

The screen should show:

```txt
Core items
Situational items
Defensive items
Enchant suggestion
Reason for each item
```

### Example Output

```txt
Champion: Viktor

Enemy Team:
Mundo, Soraka, Malphite, Draven, Taliyah

Recommended Focus:
- Magic penetration
- Anti-heal
- Stasis enchant
- Damage against high HP targets
```

### Success Result

The item build flow is successful when:

```txt
The app recommends items based on the enemy team
The app explains why each item is suggested
The app highlights healing, shielding, tankiness, and crowd control threats
The item suggestions update when enemy picks change
The user can understand what to build and why
```

---

## Flow 11 — Matchup Note Flow

This flow lets the user save personal matchup learning.

```txt
Open Matchup Notes
→ Select My Champion
→ Select Enemy Champion
→ Select Role
→ Write Note
→ Add Result
→ Save Note
```

### Example Note

```txt
Akali vs Orianna

Notes:
- Do not trade before level 3
- Avoid getting poked before level 5
- Look for all-in after Orianna uses ball cooldown
```

### Success Result

The matchup note flow is successful when:

```txt
The note is saved
The note is linked to the user's champion
The note is linked to the enemy champion
The note can be viewed later
```

---

## Flow 12 — Save Match Result Flow

This flow happens after the game.

```txt
Open Draft Session
→ Save Result
→ Add Main Draft Problem
→ Add Short Review
→ Save
```

### Result Values

```txt
Win
Loss
Unknown
```

### Main Draft Problem Values

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

### Success Result

The match result flow is successful when:

```txt
The result is saved
The main draft problem is saved
The short review is saved
The draft appears in history
```

---

## Flow 13 — Post-Game Draft Review Flow

This flow gives the user a learning summary after the match.

```txt
Save Match Result
→ Request Post-Game Draft Review
→ AI Generates Review Draft
→ User Reviews It
→ Save Review
```

### Review Should Explain

```txt
Whether the ban made sense
Whether the pick made sense
What the team composition lacked
What enemy threats mattered
What item choices were important
What to learn next time
```

### Important Rule

AI can generate the review, but the review is draft text.

The user can edit it, save it, or ignore it.

### Success Result

The post-game review flow is successful when:

```txt
The app generates a clear review
The review is tied to draft data
The review does not invent fake patch numbers
The review helps the user learn from the match
```

---

## Flow 14 — Draft History Flow

This flow lets the user review past drafts.

```txt
Open Draft History
→ View Past Draft Sessions
→ Filter by Champion or Result
→ Open Draft Detail
→ Review Recommendations and Notes
```

### Draft History Should Show

```txt
Date
Patch
Role
Intended Champion
Final Champion
Enemy Lane Champion
Result
Top Ban Recommendation
Top Pick Recommendation
Team Composition Score
```

### Draft Detail Should Show

```txt
Draft state
Bans
Picks
Recommendations
Team composition analysis
Item build suggestions
Match result
Matchup notes
Post-game review
```

### Success Result

The draft history flow is successful when:

```txt
The user can see past draft sessions
The user can open draft details
The user can review what was recommended
The user can learn from saved notes and results
```

---

## Quick Draft Flow

The quick draft flow is the most important flow for the iOS companion app.

It should be short and fast.

```txt
Open Quick Draft
→ Select Role
→ Select Intended Champion or Leave Blank
→ Get Ban Recommendations
→ Enter Bans
→ Start Pick Phase
→ Update Team and Enemy Picks as Draft Changes
→ View Live Pick Recommendation
→ View Live Item Build Suggestions
```

### Quick Draft Priority

The quick draft flow should prioritize:

```txt
Speed
Simple input
Short explanations
Easy champion search
Few screens
Large touch targets
Clear next action
```

The iOS app does not need every desktop feature in the first version.

---

## Error Flows

## No Champion Pool

```txt
Start Draft
→ No Champions in Pool
→ Show Warning
→ Allow Ban Recommendation
→ Suggest Adding Champions Before Pick Recommendation
```

The app can still recommend bans without champion pool data, but pick recommendations will be weaker.

---

## No Active Patch

```txt
Start Draft
→ No Active Patch Found
→ Show Error
→ Disable Recommendation Actions
```

The app cannot generate reliable recommendations without active patch data.

---

## Scoring Service Error

```txt
Request Recommendation
→ Scoring Service Fails
→ Show Error Message
→ Allow User to Retry
```

The app should not crash.

---

## AI Explanation Error

```txt
Recommendation Calculated
→ AI Explanation Fails
→ Show Recommendation Without AI Explanation
→ Show Explanation Error
```

The recommendation should still be shown if scoring succeeds.

Example message:

```txt
The recommendation was calculated, but the explanation could not be generated.
You can still view the score and score factors.
```

---

## Final MVP User Flow

The final MVP should support this full flow:

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
11. Start live pick phase
12. Update team and enemy picks as draft changes
13. View live pick recommendations
14. View live team composition analysis
15. View live item build suggestions
16. Save matchup note
17. Save match result
18. View post-game draft review
19. View draft in draft history
```

---

## Final User Flow Boundary

Wise Rift should not feel like a full coaching platform in the MVP.

The MVP user flow should stay focused on this idea:

```txt
A player can quickly enter draft context and receive useful live ban, pick, team composition, and item build guidance.
```
