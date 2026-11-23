# StudyMatch

**Tagline:** “Find Your People. Study Smarter. Achieve More.”

StudyMatch is a responsive, frontend-only student collaboration platform prototype for Murang'a University of Technology (MUT). It helps students find compatible study partners, create groups, schedule sessions, exchange invitations and view platform insights.

## Problem statement
Students often find it difficult to locate classmates with compatible units, availability, study modes and academic goals. StudyMatch centralizes these preferences and provides transparent recommendations.

## Objectives
- Match students using explainable rules.
- Support study groups and sessions.
- Persist a complete prototype in browser LocalStorage.
- Demonstrate authentication, profiles, role checks, validation and analytics.

## Target users
MUT students and a demonstration platform administrator.

## Features
- Registration, login, logout and persistent sessions
- Hashed prototype passwords using Web Crypto SHA-256
- Editable student academic profiles
- Ranked compatibility recommendations and filters
- Student profile views and invitations
- Create, browse, join, leave and manage groups
- Schedule, view and cancel sessions with validation
- Notifications and invitation acceptance/rejection
- Administrator statistics, group moderation and reset
- Responsive Chart.js insights

## Technologies
HTML5, CSS3, ES6+ JavaScript, Browser LocalStorage, Lucide icons and optional Chart.js. No backend or external database is used.

## Architecture
The SPA has separate modules:
- `storage.js`: safe JSON LocalStorage operations and unique IDs
- `data.js`: seeded data initialization
- `auth.js`: registration, login, sessions and password hashing
- `profile.js`: profile validation and persistence
- `matching.js`: compatibility engine
- `groups.js`: group rules and management
- `sessions.js`: scheduling and validation
- `app.js`: navigation and UI rendering

## Matching algorithm
For two complete profiles:

- Shared units: `intersection units / max(unit counts) × 45%`
- Availability: `intersection times / max(time counts) × 30%`
- Study mode: 100% equal, 85% if one mode is Both, otherwise 20%, weighted 15%
- Academic goals: `intersection goals / max(goal counts) × 10%`

Final score = units score × 0.45 + availability × 0.30 + mode × 0.15 + goals × 0.10.

The current student and incomplete profiles are excluded. Results are sorted from highest to lowest. Every factor is calculated directly from saved profile data; no random scores are used.

## Project structure

```text
studymatch/
├── index.html
├── css/
│   ├── style.css
│   ├── dashboard.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── data.js
│   ├── storage.js
│   ├── auth.js
│   ├── profile.js
│   ├── matching.js
│   ├── groups.js
│   └── sessions.js
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

## Installation and execution
1. Open the `studymatch` folder in VS Code.
2. Start Live Server or run `python3 -m http.server 5500` from `studyMatch`.
3. Open `http://localhost:5500/studymatch/`.

## Demonstration accounts
- Student: `amina@mut.ac.ke` / `Study123!`
- Student: `brian@mut.ac.ke` / `Study123!`
- Administrator: `admin@mut.ac.ke` / `Admin123!`

Any newly registered account can also use a password of at least eight characters.

## Demonstration workflow
1. Sign in as Amina.
2. Open **Find Partners** to view real ranked scores.
3. Filter by course, year or shared unit.
4. Open a profile or send an invitation.
5. Open the bell or Notifications to accept or reject the invitation by logging in as the recipient.
6. Create or join a study group.
7. Schedule a future session for one of your groups.
8. Log in as the administrator to view Insights and manage/reset data.

## Testing checklist
- Registration and duplicate email prevention
- Student and administrator login/logout
- Profile creation/editing and required-field validation
- Compatibility calculation and ranking
- Duplicate invitation prevention and invitation responses
- Group creation, join/leave, full capacity and duplicate membership prevention
- Session past-date, end-time and required-field validation
- LocalStorage persistence after refresh
- Administrator route and role restrictions
- Responsive desktop and mobile navigation

## Data structures
- Users: ID, name, email, role, password hash
- Profiles: course, year, units, availability, mode, learning methods and goals
- Groups: ID, name, description, units, capacity, mode, creator and members
- Sessions: title, group, unit, date, time, mode, location and status
- Invitations: sender, recipient, status and timestamp
- Activity: text and display time

## Prototype limitations
- Password hashing does not replace secure backend authentication.
- LocalStorage is browser-local and is not secure multi-user server storage.
- User data is fictional demonstration data.
- There is no external calendar, video conferencing or email delivery.
- Chart.js and Lucide are loaded from CDNs and need internet access unless cached/served locally.

## Future improvements
- Secure backend and database
- Server-side authorization and password policies
- Real-time notifications
- Messaging and shared resources
- Group invitations and role permissions
- Exportable calendar integration
- Unit and end-to-end automated test suites
