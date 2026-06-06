# Wise Rift - API Design Architecture

This document defines the first API design for **Wise Rift**.

The goal of this document is to map the product modules, draft workflow, patch data, and recommendation logic into a clear backend API structure before implementation.

Wise Rift helps Wild Rift players make better draft decisions.

The core draft workflow is:

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

The API should support this main workflow:

```txt
Create Account
→ Select Active Patch
→ Create Champion Pool
→ Start Draft Session
→ Choose Role
→ Choose Intended Champion or Leave It Blank
→ Get Ban Recommendations
→ Enter Bans
→ Start Live Pick Phase
→ Update Team and Enemy Picks as Draft Changes
→ View Live Pick Recommendations
→ View Live Team Composition Analysis
→ View Live Item Build Suggestions
→ Save Matchup Notes
→ Save Match Result
→ Review Draft Performance
```

---

# 1. Purpose

The purpose of this document is to define:

- API design principles
- route naming rules
- authentication rules
- authorization rules
- request format
- response format
- error format
- pagination format
- main MVP API routes
- patch API flow
- champion pool API flow
- draft session API flow
- live pick API flow
- recommendation API flow
- AI explanation API flow
- implementation order

This document is not final backend code.

It is the API architecture guide for the first backend version.

---

# 2. API Design Principles

## 2.1 REST First

The MVP should use REST-style APIs.

REST is easier to understand, test, document, and explain in interviews.

Example:

```txt
GET /api/drafts
POST /api/drafts
GET /api/drafts/:draftSessionId
PATCH /api/drafts/:draftSessionId
DELETE /api/drafts/:draftSessionId
```

## 2.2 Draft-Centered Routes

Most gameplay routes should live under a draft session.

Example:

```txt
/api/drafts/:draftSessionId/bans
/api/drafts/:draftSessionId/picks
/api/drafts/:draftSessionId/recommendations/bans
/api/drafts/:draftSessionId/recommendations/picks
/api/drafts/:draftSessionId/recommendations/item-builds
/api/drafts/:draftSessionId/review
```

Reason:

A draft session is the main workspace for recommendations.

## 2.3 Auth Required by Default

Most routes should require login.

Public routes should be limited.

Public routes in MVP:

```txt
POST /api/auth/register
POST /api/auth/login
GET /api/health
```

Private routes:

```txt
All patch selection, champion pool, draft, recommendation, match result, and review routes
```

## 2.4 User Ownership First

The MVP is single-user.

A user can only access their own data.

Main rule:

```txt
record.userId === currentUser.id
```

For draft child records:

```txt
record.draftSession.userId === currentUser.id
```

## 2.5 Patch Data Is Source of Truth

Patch data should control all champion and item numbers.

Main rule:

```txt
Manual patch data is the source of truth.
AI should not invent champion numbers, item stats, or patch changes.
```

## 2.6 Scoring Engine Decides

The recommendation engine should decide the recommendation.

Main rule:

```txt
Scoring engine decides.
AI explains.
User reviews.
```

The AI layer should not change the score.

## 2.7 Consistent Response Shape

All APIs should return a consistent JSON structure.

Success response:

```json
{
  "success": true,
  "data": {},
  "message": "Request completed successfully"
}
```

Error response:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Champion is already picked or banned",
    "details": {}
  }
}
```

## 2.8 MVP Should Stay Simple

Avoid over-engineering.

Do not add these in MVP:

- team accounts
- public draft rooms
- Riot API sync
- automatic patch scraping
- ranked match history import
- live in-game data
- billing routes
- advanced analytics routes
- full combat simulation

---

# 3. Base API Structure

## 3.1 Base URL

For local development:

```txt
http://localhost:5001/api
```

For production:

```txt
https://api.wise-rift.app/api
```

The production URL is a placeholder.

## 3.2 API Versioning

For MVP, routes can start without versioning:

```txt
/api/drafts
```

Future versioning can use:

```txt
/api/v1/drafts
```

Recommended MVP choice:

```txt
Use /api without versioning first.
```

Reason:

The project is still early and single-user.

---

# 4. Authentication Design

## 4.1 Auth Strategy

Recommended MVP auth strategy:

```txt
Email + password
JWT access token
HTTP-only refresh token cookie
```

Alternative simpler MVP option:

```txt
Session-based auth with secure cookies
```

Recommended stack direction:

```txt
Next.js web app
React Native Expo mobile app
NestJS backend
PostgreSQL database
Prisma ORM
JWT or session auth
```

## 4.2 Auth Routes

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
PATCH /api/auth/me
PATCH /api/auth/password
```

## 4.3 Register User

### Route

```txt
POST /api/auth/register
```

### Request Body

```json
{
  "name": "Ben Nguyen",
  "email": "ben@example.com",
  "password": "StrongPassword123!"
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "Ben Nguyen",
      "email": "ben@example.com"
    }
  },
  "message": "Account created successfully"
}
```

### Validation Rules

```txt
name is optional
email is required
email must be unique
password is required
password must meet minimum security rules
```

## 4.4 Login User

### Route

```txt
POST /api/auth/login
```

### Request Body

```json
{
  "email": "ben@example.com",
  "password": "StrongPassword123!"
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "Ben Nguyen",
      "email": "ben@example.com"
    },
    "accessToken": "jwt_access_token_here"
  },
  "message": "Logged in successfully"
}
```

## 4.5 Get Current User

### Route

```txt
GET /api/auth/me
```

### Success Response

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "Ben Nguyen",
      "email": "ben@example.com",
      "avatarUrl": null,
      "createdAt": "2026-06-06T10:00:00.000Z"
    }
  },
  "message": "Current user loaded"
}
```

---

# 5. Authorization Rules

## 5.1 Main Rule

Every private request should know the current user.

```txt
currentUser.id
```

The backend must check ownership before returning or changing data.

## 5.2 Champion Pool Access Rule

For champion pool routes:

```txt
championPool.userId === currentUser.id
```

For champion pool entries:

```txt
championPoolEntry.championPool.userId === currentUser.id
```

## 5.3 Draft Session Access Rule

For draft routes:

```txt
draftSession.userId === currentUser.id
```

## 5.4 Draft Child Record Access Rule

For records under a draft session:

```txt
record.draftSessionId === draftSession.id
draftSession.userId === currentUser.id
```

## 5.5 Recommendation Access Rule

For recommendation results:

```txt
recommendationResult.userId === currentUser.id
recommendationResult.draftSessionId === draftSession.id
```

## 5.6 Patch Data Access Rule

Patch data is read-only for normal users in MVP.

Admin-only or developer-only routes can create and update patch data.

Main rule:

```txt
Normal users can read patch data.
Only admin or seed scripts can update patch data.
```

---

# 6. Standard Response Format

## 6.1 Success Response

Use this format for normal success:

```json
{
  "success": true,
  "data": {},
  "message": "Request completed successfully"
}
```

## 6.2 List Response

Use this format for list routes:

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalItems": 100,
      "totalPages": 5,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  },
  "message": "Items loaded successfully"
}
```

## 6.3 Error Response

Use this format for errors:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Champion is already picked or banned",
    "details": {
      "field": "championId"
    }
  }
}
```

---

# 7. Standard Error Codes

Recommended MVP error codes:

```txt
VALIDATION_ERROR
AUTH_REQUIRED
INVALID_CREDENTIALS
FORBIDDEN
NOT_FOUND
CONFLICT
RATE_LIMITED
PATCH_NOT_FOUND
CHAMPION_NOT_FOUND
ITEM_NOT_FOUND
DRAFT_NOT_FOUND
CHAMPION_ALREADY_PICKED
CHAMPION_ALREADY_BANNED
INVALID_DRAFT_STATE
RECOMMENDATION_FAILED
AI_EXPLANATION_FAILED
INTERNAL_SERVER_ERROR
```

## 7.1 Error Code Meaning

| Code                    | Meaning                                       |
| ----------------------- | --------------------------------------------- |
| VALIDATION_ERROR        | Request body is missing required data         |
| AUTH_REQUIRED           | User is not logged in                         |
| INVALID_CREDENTIALS     | Email or password is wrong                    |
| FORBIDDEN               | User does not own the record                  |
| NOT_FOUND               | Record does not exist or is not accessible    |
| CONFLICT                | Duplicate or invalid state conflict           |
| RATE_LIMITED            | Too many requests                             |
| PATCH_NOT_FOUND         | Patch does not exist                          |
| CHAMPION_NOT_FOUND      | Champion does not exist in the selected patch |
| ITEM_NOT_FOUND          | Item does not exist in the selected patch     |
| DRAFT_NOT_FOUND         | Draft session does not exist                  |
| CHAMPION_ALREADY_PICKED | Champion is already picked in this draft      |
| CHAMPION_ALREADY_BANNED | Champion is already banned in this draft      |
| INVALID_DRAFT_STATE     | Draft state is not valid                      |
| RECOMMENDATION_FAILED   | Recommendation service failed                 |
| AI_EXPLANATION_FAILED   | AI explanation generation failed              |
| INTERNAL_SERVER_ERROR   | Unknown server error                          |

---

# 8. Pagination, Filtering, and Sorting

## 8.1 Standard Query Params

List routes should support:

```txt
page
limit
status
search
sortBy
sortOrder
```

Example:

```txt
GET /api/drafts?page=1&limit=20&status=COMPLETED&search=akali&sortBy=createdAt&sortOrder=desc
```

## 8.2 Pagination Defaults

Recommended defaults:

```txt
page = 1
limit = 20
max limit = 100
```

## 8.3 Sorting Defaults

Recommended default:

```txt
sortBy = createdAt
sortOrder = desc
```

---

# 9. Health Check API

## 9.1 Health Route

### Route

```txt
GET /api/health
```

### Success Response

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "service": "wise-rift-api",
    "time": "2026-06-06T10:00:00.000Z"
  },
  "message": "API is healthy"
}
```

Purpose:

```txt
Check that the backend is running.
```

---

# 10. Patch API

Patches define the active game version.

Patch data is important because recommendations depend on patch-specific champion and item data.

## 10.1 Patch Routes

```txt
GET /api/patches
GET /api/patches/active
GET /api/patches/:patchId
POST /api/patches
PATCH /api/patches/:patchId
PATCH /api/patches/:patchId/activate
```

MVP note:

```txt
POST, PATCH, and activate routes can be admin-only or development-only.
```

## 10.2 List Patches

### Route

```txt
GET /api/patches
```

### Success Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "patch_61",
        "version": "6.1",
        "name": "Patch 6.1",
        "isActive": true,
        "releasedAt": "2026-01-10T00:00:00.000Z",
        "createdAt": "2026-06-06T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalItems": 1,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPreviousPage": false
    }
  },
  "message": "Patches loaded successfully"
}
```

## 10.3 Get Active Patch

### Route

```txt
GET /api/patches/active
```

### Success Response

```json
{
  "success": true,
  "data": {
    "patch": {
      "id": "patch_61",
      "version": "6.1",
      "name": "Patch 6.1",
      "isActive": true,
      "releasedAt": "2026-01-10T00:00:00.000Z"
    }
  },
  "message": "Active patch loaded successfully"
}
```

## 10.4 Create Patch

### Route

```txt
POST /api/patches
```

### Request Body

```json
{
  "version": "6.2",
  "name": "Patch 6.2",
  "notes": "Manual patch data update for champion and item changes.",
  "releasedAt": "2026-02-20T00:00:00.000Z"
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "patch": {
      "id": "patch_62",
      "version": "6.2",
      "name": "Patch 6.2",
      "isActive": false,
      "createdAt": "2026-06-06T10:00:00.000Z"
    }
  },
  "message": "Patch created successfully"
}
```

## 10.5 Activate Patch

### Route

```txt
PATCH /api/patches/:patchId/activate
```

### Success Behavior

```txt
Set all other patches to inactive.
Set selected patch to active.
Do not change old draft sessions.
```

Main rule:

```txt
Old draft sessions should keep their original patchId.
```

---

# 11. Champion API

Champions are patch-aware game records.

In MVP, champions are read-only for normal users.

## 11.1 Champion Routes

```txt
GET /api/champions
GET /api/champions/:championId
GET /api/champions/:championId/patch-stats
GET /api/champions/:championId/skills
POST /api/champions
PATCH /api/champions/:championId
```

MVP note:

```txt
POST and PATCH can be admin-only or development-only.
```

## 11.2 List Champions

### Route

```txt
GET /api/champions
```

### Query Params

```txt
page
limit
role
damageType
search
patchId
sortBy
sortOrder
```

Example:

```txt
GET /api/champions?role=MID&patchId=patch_61&search=akali
```

### Success Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "champion_akali",
        "key": "akali",
        "name": "Akali",
        "roles": ["MID", "BARON"],
        "damageType": "MAGIC",
        "rangeType": "MELEE",
        "difficulty": "HIGH",
        "tags": ["ASSASSIN", "MOBILITY", "BURST", "SNOWBALL"]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalItems": 1,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPreviousPage": false
    }
  },
  "message": "Champions loaded successfully"
}
```

## 11.3 Get Champion Detail

### Route

```txt
GET /api/champions/:championId
```

### Query Params

```txt
patchId
```

### Success Response

```json
{
  "success": true,
  "data": {
    "champion": {
      "id": "champion_akali",
      "key": "akali",
      "name": "Akali",
      "roles": ["MID", "BARON"],
      "damageType": "MAGIC",
      "rangeType": "MELEE",
      "difficulty": "HIGH",
      "tags": ["ASSASSIN", "MOBILITY", "BURST", "SNOWBALL"],
      "strengths": ["backline threat", "skirmish", "outplay"],
      "weaknesses": ["crowd control", "early wave control", "true sight"],
      "patchStats": {
        "patchId": "patch_61",
        "baseHealth": 650,
        "baseArmor": 35,
        "baseMagicResist": 38
      },
      "skills": []
    }
  },
  "message": "Champion loaded successfully"
}
```

## 11.4 Champion Validation Rules

```txt
champion key must be unique
champion name is required
at least one role is required
damage type is required
patch stats must belong to a valid patch
```

---

# 12. Item API

Items are patch-aware game records.

In MVP, items are read-only for normal users.

## 12.1 Item Routes

```txt
GET /api/items
GET /api/items/:itemId
GET /api/items/:itemId/patch-stats
POST /api/items
PATCH /api/items/:itemId
```

MVP note:

```txt
POST and PATCH can be admin-only or development-only.
```

## 12.2 List Items

### Route

```txt
GET /api/items
```

### Query Params

```txt
page
limit
category
tag
patchId
search
sortBy
sortOrder
```

Example:

```txt
GET /api/items?category=MAGIC&patchId=patch_61&tag=ANTI_TANK
```

### Success Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "item_void_staff",
        "key": "void-staff",
        "name": "Void Staff",
        "category": "MAGIC",
        "tags": ["MAGIC_PENETRATION", "ANTI_MAGIC_RESIST"],
        "goodAgainst": ["HIGH_MAGIC_RESIST", "TANKS", "BRUISERS"]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalItems": 1,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPreviousPage": false
    }
  },
  "message": "Items loaded successfully"
}
```

## 12.3 Get Item Detail

### Route

```txt
GET /api/items/:itemId
```

### Query Params

```txt
patchId
```

### Success Response

```json
{
  "success": true,
  "data": {
    "item": {
      "id": "item_void_staff",
      "key": "void-staff",
      "name": "Void Staff",
      "category": "MAGIC",
      "tags": ["MAGIC_PENETRATION", "ANTI_MAGIC_RESIST"],
      "goodAgainst": ["HIGH_MAGIC_RESIST", "TANKS", "BRUISERS"],
      "patchStats": {
        "patchId": "patch_61",
        "abilityPower": 90,
        "magicPenetrationPercent": 40
      }
    }
  },
  "message": "Item loaded successfully"
}
```

## 12.4 Item Validation Rules

```txt
item key must be unique
item name is required
item category is required
patch stats must belong to a valid patch
```

---

# 13. Champion Pool API

Champion pool stores the champions the user is comfortable playing.

## 13.1 Champion Pool Routes

```txt
GET /api/champion-pool
POST /api/champion-pool
GET /api/champion-pool/:entryId
PATCH /api/champion-pool/:entryId
DELETE /api/champion-pool/:entryId
```

## 13.2 Get Champion Pool

### Route

```txt
GET /api/champion-pool
```

### Query Params

```txt
role
patchId
search
sortBy
sortOrder
```

### Success Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "pool_entry_123",
        "champion": {
          "id": "champion_akali",
          "key": "akali",
          "name": "Akali",
          "roles": ["MID", "BARON"]
        },
        "preferredRole": "MID",
        "comfortLevel": 5,
        "notes": "Strong comfort pick. Good into low crowd control teams.",
        "createdAt": "2026-06-06T10:00:00.000Z"
      }
    ]
  },
  "message": "Champion pool loaded successfully"
}
```

## 13.3 Add Champion to Pool

### Route

```txt
POST /api/champion-pool
```

### Request Body

```json
{
  "championId": "champion_akali",
  "preferredRole": "MID",
  "comfortLevel": 5,
  "notes": "Strong comfort pick. Good into low crowd control teams."
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "entry": {
      "id": "pool_entry_123",
      "championId": "champion_akali",
      "preferredRole": "MID",
      "comfortLevel": 5,
      "notes": "Strong comfort pick. Good into low crowd control teams.",
      "createdAt": "2026-06-06T10:00:00.000Z"
    }
  },
  "message": "Champion added to pool successfully"
}
```

## 13.4 Update Champion Pool Entry

### Route

```txt
PATCH /api/champion-pool/:entryId
```

### Request Body

```json
{
  "preferredRole": "MID",
  "comfortLevel": 4,
  "notes": "Still comfortable, but risky into heavy crowd control."
}
```

## 13.5 Champion Pool Validation Rules

```txt
championId is required
champion must exist
preferredRole is required
comfortLevel must be between 1 and 5
same champion cannot be added twice for the same user and role
```

---

# 14. Draft Session API

Draft sessions store one draft workflow.

## 14.1 Draft Session Routes

```txt
GET /api/drafts
POST /api/drafts
GET /api/drafts/:draftSessionId
PATCH /api/drafts/:draftSessionId
DELETE /api/drafts/:draftSessionId
PATCH /api/drafts/:draftSessionId/start-live-pick
PATCH /api/drafts/:draftSessionId/complete
PATCH /api/drafts/:draftSessionId/archive
```

## 14.2 Create Draft Session

### Route

```txt
POST /api/drafts
```

### Request Body

```json
{
  "role": "MID",
  "intendedChampionId": "champion_akali",
  "patchId": "patch_61",
  "queueType": "RANKED",
  "notes": "Practice draft for mid lane."
}
```

MVP note:

```txt
intendedChampionId is optional.
If patchId is not provided, backend should use the active patch.
```

### Success Response

```json
{
  "success": true,
  "data": {
    "draftSession": {
      "id": "draft_123",
      "userId": "user_123",
      "patchId": "patch_61",
      "role": "MID",
      "intendedChampionId": "champion_akali",
      "phase": "BAN_PREP",
      "status": "ACTIVE",
      "queueType": "RANKED",
      "createdAt": "2026-06-06T10:00:00.000Z"
    }
  },
  "message": "Draft session created successfully"
}
```

## 14.3 List Draft Sessions

### Route

```txt
GET /api/drafts
```

### Query Params

```txt
page
limit
status
role
patchId
result
search
sortBy
sortOrder
```

### Success Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "draft_123",
        "patch": {
          "id": "patch_61",
          "version": "6.1"
        },
        "role": "MID",
        "phase": "COMPLETED",
        "status": "COMPLETED",
        "result": "WIN",
        "createdAt": "2026-06-06T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalItems": 1,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPreviousPage": false
    }
  },
  "message": "Draft sessions loaded successfully"
}
```

## 14.4 Get Draft Detail

### Route

```txt
GET /api/drafts/:draftSessionId
```

### Success Response

```json
{
  "success": true,
  "data": {
    "draftSession": {
      "id": "draft_123",
      "patchId": "patch_61",
      "role": "MID",
      "phase": "LIVE_PICK",
      "status": "ACTIVE",
      "intendedChampion": {
        "id": "champion_akali",
        "key": "akali",
        "name": "Akali"
      },
      "bans": [],
      "picks": [],
      "latestRecommendations": []
    }
  },
  "message": "Draft session loaded successfully"
}
```

## 14.5 Start Live Pick Phase

### Route

```txt
PATCH /api/drafts/:draftSessionId/start-live-pick
```

### Success Behavior

```txt
Set phase to LIVE_PICK.
Keep existing bans.
Allow team and enemy picks to be added or updated.
```

## 14.6 Complete Draft Session

### Route

```txt
PATCH /api/drafts/:draftSessionId/complete
```

### Request Body

```json
{
  "completedChampionId": "champion_akali",
  "notes": "Draft completed. Enemy had strong crowd control."
}
```

### Success Behavior

```txt
Set draft phase to COMPLETED.
Set draft status to COMPLETED.
Keep patchId unchanged.
```

---

# 15. Draft Ban API

Draft bans store banned champions in one draft session.

## 15.1 Draft Ban Routes

```txt
GET /api/drafts/:draftSessionId/bans
POST /api/drafts/:draftSessionId/bans
DELETE /api/drafts/:draftSessionId/bans/:banId
PATCH /api/drafts/:draftSessionId/bans/reorder
```

## 15.2 Add Ban

### Route

```txt
POST /api/drafts/:draftSessionId/bans
```

### Request Body

```json
{
  "championId": "champion_yasuo",
  "teamSide": "ENEMY",
  "orderIndex": 1
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "ban": {
      "id": "ban_123",
      "draftSessionId": "draft_123",
      "championId": "champion_yasuo",
      "teamSide": "ENEMY",
      "orderIndex": 1,
      "createdAt": "2026-06-06T10:00:00.000Z"
    }
  },
  "message": "Ban added successfully"
}
```

## 15.3 Ban Validation Rules

```txt
championId is required
champion must exist in draft patch
champion cannot already be banned in same draft
champion cannot already be picked in same draft
teamSide must be MY_TEAM, ENEMY, or UNKNOWN
orderIndex must be valid if provided
```

---

# 16. Draft Pick API

Draft picks store champions picked by both teams.

The pick phase is live and can update after every pick.

## 16.1 Draft Pick Routes

```txt
GET /api/drafts/:draftSessionId/picks
POST /api/drafts/:draftSessionId/picks
PATCH /api/drafts/:draftSessionId/picks/:pickId
DELETE /api/drafts/:draftSessionId/picks/:pickId
PATCH /api/drafts/:draftSessionId/picks/reorder
```

## 16.2 Add Pick

### Route

```txt
POST /api/drafts/:draftSessionId/picks
```

### Request Body

```json
{
  "championId": "champion_orianna",
  "teamSide": "MY_TEAM",
  "role": "MID",
  "playerSlot": 1,
  "orderIndex": 1,
  "isUserPick": true
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "pick": {
      "id": "pick_123",
      "draftSessionId": "draft_123",
      "championId": "champion_orianna",
      "teamSide": "MY_TEAM",
      "role": "MID",
      "playerSlot": 1,
      "orderIndex": 1,
      "isUserPick": true,
      "createdAt": "2026-06-06T10:00:00.000Z"
    }
  },
  "message": "Pick added successfully"
}
```

## 16.3 Update Pick

### Route

```txt
PATCH /api/drafts/:draftSessionId/picks/:pickId
```

### Request Body

```json
{
  "championId": "champion_viktor",
  "teamSide": "MY_TEAM",
  "role": "MID",
  "playerSlot": 1,
  "isUserPick": true
}
```

## 16.4 Pick Validation Rules

```txt
championId is required
champion must exist in draft patch
champion cannot already be picked in same draft
champion cannot already be banned in same draft
teamSide must be MY_TEAM or ENEMY
role is optional for enemy picks
playerSlot must be between 1 and 5 if provided
orderIndex must be valid if provided
only one pick should be marked isUserPick true in a draft
```

---

# 17. Recommendation API

Recommendations are generated from draft context and patch data.

The backend owns the request.

The Python recommendation service owns scoring.

The AI layer owns explanation.

## 17.1 Recommendation Routes

```txt
POST /api/drafts/:draftSessionId/recommendations/bans
POST /api/drafts/:draftSessionId/recommendations/picks
POST /api/drafts/:draftSessionId/recommendations/team-composition
POST /api/drafts/:draftSessionId/recommendations/item-builds
GET /api/drafts/:draftSessionId/recommendations
GET /api/drafts/:draftSessionId/recommendations/:recommendationId
```

## 17.2 Get Ban Recommendations

### Route

```txt
POST /api/drafts/:draftSessionId/recommendations/bans
```

### Request Body

```json
{
  "intendedChampionId": "champion_akali",
  "extraContext": {
    "avoidChampions": ["champion_malzahar"],
    "notes": "I struggle against strong point-and-click crowd control."
  }
}
```

MVP note:

```txt
intendedChampionId is optional.
If missing, backend uses draftSession.intendedChampionId if available.
```

### Success Response

```json
{
  "success": true,
  "data": {
    "recommendation": {
      "id": "rec_ban_123",
      "draftSessionId": "draft_123",
      "type": "BAN",
      "status": "SUCCEEDED",
      "items": [
        {
          "championId": "champion_yasuo",
          "championName": "Yasuo",
          "totalScore": 88,
          "confidence": "HIGH",
          "reasonCodes": [
            "HIGH_META_THREAT",
            "COUNTERS_USER_POOL",
            "SNOWBALL_RISK"
          ],
          "scoreBreakdown": {
            "metaScore": 20,
            "counterScore": 25,
            "comfortThreatScore": 18,
            "lanePressureScore": 15,
            "teamfightThreatScore": 10
          }
        }
      ],
      "aiExplanation": {
        "summary": "Yasuo is a strong ban because he can punish your champion pool and snowball early if your team lacks control."
      },
      "createdAt": "2026-06-06T10:00:00.000Z"
    }
  },
  "message": "Ban recommendations generated successfully"
}
```

## 17.3 Get Pick Recommendations

### Route

```txt
POST /api/drafts/:draftSessionId/recommendations/picks
```

### Request Body

```json
{
  "role": "MID",
  "onlyFromChampionPool": true,
  "extraContext": {
    "preferredStyle": "safe scaling mage"
  }
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "recommendation": {
      "id": "rec_pick_123",
      "draftSessionId": "draft_123",
      "type": "PICK",
      "status": "SUCCEEDED",
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
      "aiExplanation": {
        "summary": "Orianna is recommended because she gives your team safer wave control and stronger teamfight setup."
      },
      "createdAt": "2026-06-06T10:00:00.000Z"
    }
  },
  "message": "Pick recommendations generated successfully"
}
```

## 17.4 Recommendation Validation Rules

```txt
draftSessionId is required
draft must belong to current user
draft must have a valid patchId
patch data must exist
champion pool should exist for pool-based recommendations
banned champions should not be recommended as picks
picked champions should not be recommended again
```

## 17.5 Recommendation Storage Rule

Each recommendation result should be saved.

Reason:

```txt
Draft review should be able to show what was recommended at the time.
```

---

# 18. Team Composition API

Team composition analysis explains what the team has and what the team lacks.

## 18.1 Team Composition Route

```txt
POST /api/drafts/:draftSessionId/recommendations/team-composition
```

## 18.2 Generate Team Composition Analysis

### Route

```txt
POST /api/drafts/:draftSessionId/recommendations/team-composition
```

### Request Body

```json
{
  "includeEnemyAnalysis": true
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "composition": {
      "id": "composition_123",
      "draftSessionId": "draft_123",
      "teamStrengths": [
        "strong teamfight",
        "good magic damage",
        "strong engage"
      ],
      "teamWeaknesses": ["low physical damage", "weak early wave control"],
      "warnings": [
        "Enemy team has strong dive threat",
        "Your team may need anti-heal"
      ],
      "scores": {
        "damageBalance": 65,
        "crowdControl": 80,
        "frontline": 55,
        "scaling": 72
      },
      "aiExplanation": {
        "summary": "Your team has good engage and teamfight tools, but it may lack physical damage if the draft continues this way."
      }
    }
  },
  "message": "Team composition analysis generated successfully"
}
```

## 18.3 Composition Validation Rules

```txt
draftSessionId is required
draft must belong to current user
draft must have at least one team pick or enemy pick
champions must exist in draft patch
```

---

# 19. Item Build API

Item build recommendations help the user respond to enemy champions and team needs.

## 19.1 Item Build Routes

```txt
POST /api/drafts/:draftSessionId/recommendations/item-builds
GET /api/drafts/:draftSessionId/item-builds
GET /api/drafts/:draftSessionId/item-builds/:itemBuildId
```

## 19.2 Generate Item Build Recommendation

### Route

```txt
POST /api/drafts/:draftSessionId/recommendations/item-builds
```

### Request Body

```json
{
  "championId": "champion_viktor",
  "gamePlan": "STANDARD",
  "extraContext": {
    "enemyHealingFeelsHigh": true,
    "enemyCrowdControlFeelsHigh": true
  }
}
```

MVP note:

```txt
championId can be the user's selected champion.
If championId is missing, backend should use the user pick in the draft if available.
```

### Success Response

```json
{
  "success": true,
  "data": {
    "itemBuild": {
      "id": "item_build_123",
      "draftSessionId": "draft_123",
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
        },
        {
          "itemId": "item_infinity_orb",
          "name": "Infinity Orb",
          "orderIndex": 3
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
        "damageFit": 25,
        "enemyCounterFit": 30,
        "survivalFit": 20,
        "championSynergy": 25
      },
      "aiExplanation": {
        "summary": "This build gives Viktor strong burst while adding Void Staff if the enemy builds magic resist."
      }
    }
  },
  "message": "Item build recommendation generated successfully"
}
```

## 19.3 Item Build Validation Rules

```txt
draftSessionId is required
draft must belong to current user
champion must exist in draft patch
items must exist in draft patch
banned champions do not block item builds
enemy picks should be used if available
```

---

# 20. Matchup Notes API

Matchup notes help the user save lessons about specific matchups.

## 20.1 Matchup Note Routes

```txt
GET /api/matchup-notes
POST /api/matchup-notes
GET /api/matchup-notes/:matchupNoteId
PATCH /api/matchup-notes/:matchupNoteId
DELETE /api/matchup-notes/:matchupNoteId
GET /api/drafts/:draftSessionId/matchup-notes
POST /api/drafts/:draftSessionId/matchup-notes
```

## 20.2 Create Matchup Note

### Route

```txt
POST /api/drafts/:draftSessionId/matchup-notes
```

### Request Body

```json
{
  "myChampionId": "champion_akali",
  "enemyChampionId": "champion_orianna",
  "role": "MID",
  "title": "Akali into Orianna",
  "notes": "Respect Orianna poke before level 5. Look for short trades after she uses ball."
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "matchupNote": {
      "id": "matchup_note_123",
      "draftSessionId": "draft_123",
      "myChampionId": "champion_akali",
      "enemyChampionId": "champion_orianna",
      "role": "MID",
      "title": "Akali into Orianna",
      "notes": "Respect Orianna poke before level 5. Look for short trades after she uses ball.",
      "createdAt": "2026-06-06T10:00:00.000Z"
    }
  },
  "message": "Matchup note created successfully"
}
```

## 20.3 Matchup Note Validation Rules

```txt
myChampionId is required
enemyChampionId is required
role is required
title is required
notes are required
champions must exist
draftSessionId is optional for global notes
```

---

# 21. Match Result API

Match results save whether the draft led to a win or loss.

## 21.1 Match Result Routes

```txt
POST /api/drafts/:draftSessionId/match-result
GET /api/drafts/:draftSessionId/match-result
PATCH /api/drafts/:draftSessionId/match-result
DELETE /api/drafts/:draftSessionId/match-result
```

## 21.2 Save Match Result

### Route

```txt
POST /api/drafts/:draftSessionId/match-result
```

### Request Body

```json
{
  "result": "WIN",
  "myChampionId": "champion_akali",
  "kills": 8,
  "deaths": 3,
  "assists": 6,
  "notes": "Draft felt good. Ban recommendation helped remove a hard matchup."
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "matchResult": {
      "id": "match_result_123",
      "draftSessionId": "draft_123",
      "result": "WIN",
      "myChampionId": "champion_akali",
      "kills": 8,
      "deaths": 3,
      "assists": 6,
      "notes": "Draft felt good. Ban recommendation helped remove a hard matchup.",
      "createdAt": "2026-06-06T10:00:00.000Z"
    }
  },
  "message": "Match result saved successfully"
}
```

## 21.3 Match Result Validation Rules

```txt
result is required
result must be WIN, LOSS, or UNKNOWN
myChampionId is optional but recommended
KDA fields are optional
draft must belong to current user
one draft should only have one match result
```

---

# 22. Draft Review API

Draft review summarizes the draft after the match result is saved.

## 22.1 Draft Review Routes

```txt
GET /api/drafts/:draftSessionId/review
POST /api/drafts/:draftSessionId/review
PATCH /api/drafts/:draftSessionId/review
```

## 22.2 Generate Draft Review

### Route

```txt
POST /api/drafts/:draftSessionId/review
```

### Request Body

```json
{
  "includeAiSummary": true
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "draftReview": {
      "id": "draft_review_123",
      "draftSessionId": "draft_123",
      "summary": {
        "result": "WIN",
        "role": "MID",
        "patchVersion": "6.1",
        "myChampion": "Akali"
      },
      "whatWentWell": [
        "Ban removed a high-risk matchup",
        "Team had strong engage",
        "Item build matched enemy threats"
      ],
      "whatToImprove": [
        "Team had low physical damage",
        "Need better plan against early wave control"
      ],
      "recommendationAccuracy": {
        "followedBanRecommendation": true,
        "followedPickRecommendation": false,
        "usedSuggestedItems": true
      },
      "aiSummary": "This draft worked because your ban removed a major threat and your item choices matched the enemy team. The main weakness was low physical damage."
    }
  },
  "message": "Draft review generated successfully"
}
```

## 22.3 Draft Review Validation Rules

```txt
draft must belong to current user
draft should be completed
match result should exist before full review
recommendation history should be used if available
AI summary is optional
```

---

# 23. AI Explanation API

AI explanations are used to explain scored results.

AI should not make final decisions.

## 23.1 AI Explanation Routes

```txt
POST /api/ai/explanations
GET /api/ai/explanations/:aiExplanationId
GET /api/drafts/:draftSessionId/ai-explanations
```

## 23.2 Create AI Explanation

### Route

```txt
POST /api/ai/explanations
```

### Request Body

```json
{
  "sourceType": "RECOMMENDATION_RESULT",
  "sourceId": "rec_pick_123",
  "style": "SHORT",
  "language": "en"
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "aiExplanation": {
      "id": "ai_explanation_123",
      "sourceType": "RECOMMENDATION_RESULT",
      "sourceId": "rec_pick_123",
      "summary": "Orianna is recommended because she gives your team safer wave control and stronger teamfight setup.",
      "createdAt": "2026-06-06T10:00:00.000Z"
    }
  },
  "message": "AI explanation created successfully"
}
```

## 23.3 AI Explanation Rules

```txt
AI should explain score results.
AI should not create new champion stats.
AI should not create new item stats.
AI should not override recommendation scores.
AI should not receive secrets.
AI should use only safe draft context and score breakdowns.
```

---

# 24. Dashboard API

The dashboard should show the user's Wise Rift activity.

## 24.1 Dashboard Routes

```txt
GET /api/dashboard
```

## 24.2 Get Dashboard

### Route

```txt
GET /api/dashboard
```

### Success Response

```json
{
  "success": true,
  "data": {
    "summary": {
      "drafts": {
        "total": 20,
        "completed": 15,
        "active": 1
      },
      "results": {
        "wins": 9,
        "losses": 6,
        "unknown": 5
      },
      "championPool": {
        "total": 8,
        "midChampions": 5
      },
      "recommendations": {
        "banRecommendations": 12,
        "pickRecommendations": 15,
        "itemBuildRecommendations": 10
      }
    },
    "recentDrafts": []
  },
  "message": "Dashboard loaded successfully"
}
```

---

# 25. Search API

Search is optional for MVP, but useful.

## 25.1 Search Routes

```txt
GET /api/search
```

## 25.2 Global Search

### Route

```txt
GET /api/search
```

### Query Params

```txt
q
types
limit
```

Example:

```txt
GET /api/search?q=akali&types=champions,drafts,matchup-notes&limit=10
```

### MVP Search Scope

Search should include:

```txt
Champions
Items
Draft sessions
Matchup notes
```

MVP search can use simple database search first.

Do not add advanced semantic search in MVP.

---

# 26. Route Summary by Module

## 26.1 Auth

```txt
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
PATCH  /api/auth/me
PATCH  /api/auth/password
```

## 26.2 Health

```txt
GET    /api/health
```

## 26.3 Dashboard

```txt
GET    /api/dashboard
```

## 26.4 Patches

```txt
GET    /api/patches
GET    /api/patches/active
GET    /api/patches/:patchId
POST   /api/patches
PATCH  /api/patches/:patchId
PATCH  /api/patches/:patchId/activate
```

## 26.5 Champions

```txt
GET    /api/champions
GET    /api/champions/:championId
GET    /api/champions/:championId/patch-stats
GET    /api/champions/:championId/skills
POST   /api/champions
PATCH  /api/champions/:championId
```

## 26.6 Items

```txt
GET    /api/items
GET    /api/items/:itemId
GET    /api/items/:itemId/patch-stats
POST   /api/items
PATCH  /api/items/:itemId
```

## 26.7 Champion Pool

```txt
GET    /api/champion-pool
POST   /api/champion-pool
GET    /api/champion-pool/:entryId
PATCH  /api/champion-pool/:entryId
DELETE /api/champion-pool/:entryId
```

## 26.8 Draft Sessions

```txt
GET    /api/drafts
POST   /api/drafts
GET    /api/drafts/:draftSessionId
PATCH  /api/drafts/:draftSessionId
DELETE /api/drafts/:draftSessionId
PATCH  /api/drafts/:draftSessionId/start-live-pick
PATCH  /api/drafts/:draftSessionId/complete
PATCH  /api/drafts/:draftSessionId/archive
```

## 26.9 Draft Bans

```txt
GET    /api/drafts/:draftSessionId/bans
POST   /api/drafts/:draftSessionId/bans
DELETE /api/drafts/:draftSessionId/bans/:banId
PATCH  /api/drafts/:draftSessionId/bans/reorder
```

## 26.10 Draft Picks

```txt
GET    /api/drafts/:draftSessionId/picks
POST   /api/drafts/:draftSessionId/picks
PATCH  /api/drafts/:draftSessionId/picks/:pickId
DELETE /api/drafts/:draftSessionId/picks/:pickId
PATCH  /api/drafts/:draftSessionId/picks/reorder
```

## 26.11 Recommendations

```txt
POST   /api/drafts/:draftSessionId/recommendations/bans
POST   /api/drafts/:draftSessionId/recommendations/picks
POST   /api/drafts/:draftSessionId/recommendations/team-composition
POST   /api/drafts/:draftSessionId/recommendations/item-builds
GET    /api/drafts/:draftSessionId/recommendations
GET    /api/drafts/:draftSessionId/recommendations/:recommendationId
```

## 26.12 Item Builds

```txt
GET    /api/drafts/:draftSessionId/item-builds
GET    /api/drafts/:draftSessionId/item-builds/:itemBuildId
```

## 26.13 Matchup Notes

```txt
GET    /api/matchup-notes
POST   /api/matchup-notes
GET    /api/matchup-notes/:matchupNoteId
PATCH  /api/matchup-notes/:matchupNoteId
DELETE /api/matchup-notes/:matchupNoteId
GET    /api/drafts/:draftSessionId/matchup-notes
POST   /api/drafts/:draftSessionId/matchup-notes
```

## 26.14 Match Result

```txt
POST   /api/drafts/:draftSessionId/match-result
GET    /api/drafts/:draftSessionId/match-result
PATCH  /api/drafts/:draftSessionId/match-result
DELETE /api/drafts/:draftSessionId/match-result
```

## 26.15 Draft Review

```txt
GET    /api/drafts/:draftSessionId/review
POST   /api/drafts/:draftSessionId/review
PATCH  /api/drafts/:draftSessionId/review
```

## 26.16 AI Explanations

```txt
POST   /api/ai/explanations
GET    /api/ai/explanations/:aiExplanationId
GET    /api/drafts/:draftSessionId/ai-explanations
```

## 26.17 Search

```txt
GET    /api/search
```

---

# 27. Validation Strategy

## 27.1 Recommended Validation Library

Recommended TypeScript validation library:

```txt
Zod
```

Alternative NestJS validation option:

```txt
class-validator
class-transformer
```

Recommended MVP choice:

```txt
Use Zod if schemas will be shared with frontend.
Use class-validator if following standard NestJS DTO style.
```

## 27.2 Validation Layers

Use validation in these places:

```txt
frontend form validation
mobile form validation
backend request validation
database constraints
business rule validation
recommendation input validation
```

## 27.3 Business Rule Examples

Champion pool:

```txt
Cannot add the same champion twice for the same role.
```

Draft bans:

```txt
Cannot ban a champion that is already picked.
```

Draft picks:

```txt
Cannot pick a champion that is already banned.
```

Live pick phase:

```txt
Cannot add picks if draft is archived or completed.
```

Recommendation:

```txt
Cannot recommend a banned or already picked champion.
```

Patch data:

```txt
Cannot generate recommendations if draft patch data is missing.
```

Draft review:

```txt
Cannot generate full review without a match result.
```

---

# 28. API Security Rules

## 28.1 Password Security

```txt
Never store plain text passwords.
Hash passwords before saving.
Use a strong password hashing library.
```

Recommended library:

```txt
bcrypt or argon2
```

## 28.2 Token Security

```txt
Keep access tokens short-lived.
Store refresh token in HTTP-only cookie if using refresh tokens.
Do not store sensitive tokens in localStorage if avoidable.
```

## 28.3 Input Security

```txt
Validate all request bodies.
Sanitize user text where needed.
Limit request body size.
```

## 28.4 Authorization Security

```txt
Never trust draftSessionId from the frontend alone.
Always check database ownership.
```

## 28.5 AI Security

```txt
Do not send secrets to AI prompts.
Do not include API keys, passwords, private tokens, or environment variables in AI input.
Only send score results, reason codes, and safe draft context.
```

## 28.6 Recommendation Service Security

```txt
Do not let frontend call the Python recommendation service directly.
Backend API should call the recommendation service.
Recommendation service should validate an internal API secret.
```

---

# 29. Rate Limiting

Rate limiting should be simple in MVP.

Recommended rate limits:

```txt
Auth routes: stricter
Recommendation routes: medium
AI explanation routes: stricter
Normal CRUD routes: basic
```

Example:

```txt
POST /api/auth/login
Limit: 5 attempts per minute per IP
```

```txt
POST /api/drafts/:draftSessionId/recommendations/picks
Limit: 60 requests per hour per user
```

```txt
POST /api/ai/explanations
Limit: 30 explanations per hour per user
```

---

# 30. API Testing Strategy

## 30.1 Test Types

The backend should include:

```txt
unit tests
integration tests
API route tests
authorization tests
validation tests
recommendation flow tests
AI explanation tests
```

## 30.2 Important Test Cases

Auth:

```txt
User can register
User can login
Invalid password returns error
Unauthenticated request is rejected
```

Patch:

```txt
User can load active patch
Old draft keeps old patchId
Admin can activate new patch
```

Champion Pool:

```txt
User can add champion to pool
User can update comfort level
Duplicate champion pool entry is rejected
User cannot access another user's champion pool entry
```

Draft Session:

```txt
User can create draft session
Draft session uses active patch if patchId is missing
User can start live pick phase
User can complete draft
User cannot access another user's draft
```

Bans:

```txt
User can add ban
Duplicate ban is rejected
Banning an already picked champion is rejected
```

Picks:

```txt
User can add team pick
User can add enemy pick
Picking an already banned champion is rejected
Picking an already picked champion is rejected
Only one pick can be user pick
```

Recommendations:

```txt
User can generate ban recommendations
User can generate pick recommendations
Banned champions are excluded from pick recommendations
Picked champions are excluded from pick recommendations
Recommendation output includes score breakdown
Recommendation output is deterministic for same input
```

Team Composition:

```txt
User can generate team composition analysis
Composition analysis returns strengths, weaknesses, warnings, and scores
```

Item Builds:

```txt
User can generate item build recommendation
Item build uses selected champion
Item build uses enemy picks
Item build uses patch item data
```

Match Result:

```txt
User can save match result
One draft can only have one match result
User can update match result
```

Draft Review:

```txt
User can generate draft review
Full review requires match result
Review uses recommendation history
```

AI Explanations:

```txt
User can generate AI explanation
AI explanation does not change recommendation score
AI explanation does not invent patch stats
```

---

# 31. MVP Implementation Order

The API should be implemented in phases.

## 31.1 Phase 1 - Foundation

```txt
GET /api/health
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

## 31.2 Phase 2 - Patch, Champion, and Item Read APIs

```txt
GET /api/patches
GET /api/patches/active
GET /api/champions
GET /api/champions/:championId
GET /api/items
GET /api/items/:itemId
```

## 31.3 Phase 3 - Champion Pool

```txt
GET /api/champion-pool
POST /api/champion-pool
PATCH /api/champion-pool/:entryId
DELETE /api/champion-pool/:entryId
```

## 31.4 Phase 4 - Draft Session Core

```txt
GET /api/drafts
POST /api/drafts
GET /api/drafts/:draftSessionId
PATCH /api/drafts/:draftSessionId
PATCH /api/drafts/:draftSessionId/start-live-pick
PATCH /api/drafts/:draftSessionId/complete
```

## 31.5 Phase 5 - Bans and Picks

```txt
Draft Ban CRUD
Draft Pick CRUD
Draft validation rules
Live draft state update
```

## 31.6 Phase 6 - Recommendation Endpoints

```txt
POST /api/drafts/:draftSessionId/recommendations/bans
POST /api/drafts/:draftSessionId/recommendations/picks
POST /api/drafts/:draftSessionId/recommendations/team-composition
POST /api/drafts/:draftSessionId/recommendations/item-builds
GET /api/drafts/:draftSessionId/recommendations
```

## 31.7 Phase 7 - Match Result and Draft Review

```txt
POST /api/drafts/:draftSessionId/match-result
GET /api/drafts/:draftSessionId/match-result
POST /api/drafts/:draftSessionId/review
GET /api/drafts/:draftSessionId/review
```

## 31.8 Phase 8 - AI Explanations

```txt
POST /api/ai/explanations
GET /api/ai/explanations/:aiExplanationId
GET /api/drafts/:draftSessionId/ai-explanations
```

## 31.9 Phase 9 - Polish

```txt
Dashboard summary
Search
Rate limiting
API tests
Error handling polish
Response shape cleanup
```

---

# 32. MVP Boundary

The MVP API should support:

- user registration and login
- active patch loading
- champion read APIs
- item read APIs
- champion pool CRUD
- draft session CRUD
- ban entry
- pick entry
- live pick phase updates
- ban recommendations
- pick recommendations
- team composition analysis
- item build recommendations
- AI explanations
- matchup notes
- match result saving
- draft review
- draft history
- dashboard summary

The MVP API should not support yet:

- team accounts
- billing
- Riot API sync
- automatic patch scraping
- ranked match history import
- public draft rooms
- live in-game data
- complex role permissions
- advanced combat simulation
- full analytics dashboard
- mobile offline sync

---

# 33. Final API Design Summary

The Wise Rift API should be simple, draft-centered, and easy to test.

The main API shape is:

```txt
/api/auth
/api/patches
/api/champions
/api/items
/api/champion-pool
/api/drafts
/api/drafts/:draftSessionId/bans
/api/drafts/:draftSessionId/picks
/api/drafts/:draftSessionId/recommendations
/api/drafts/:draftSessionId/match-result
/api/drafts/:draftSessionId/review
/api/ai/explanations
```

The backend should protect every private route with:

```txt
Authentication
Authorization
Validation
Business rules
```

The most important product rule is:

```txt
Scoring engine decides.
AI explains.
User reviews.
```
