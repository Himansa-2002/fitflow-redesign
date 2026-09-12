# Architecture Decision Record (ADR)

## ADR-001: Technology Stack Selection for the FitFlow Redesign

**Status:** Accepted
**Date:** 2026-09-10
**Deciders:** Product & Engineering team (FitFlow Redesign project)
**Related activities:** Lab Exercise 05, Activities 1–4 (IT3060 – Human Computer Interaction)

---

### Context

FitFlow, a fitness-tracking app, had been losing users, with ratings falling from 4.6 to 3.8 stars and 68% of users abandoning the app shortly after onboarding. User research identified a personalization gap, social isolation, and high friction in nutrition tracking as the core problems. The redesign needed to deliver AI-powered personalized workout plans, private social features, and camera-based nutrition tracking, across iOS, Android, and web, built by a mid-sized team under time and budget pressure.

The team needed to choose:
1. A frontend framework for a seamless cross-platform experience
2. A backend framework, database, and authentication solution
3. An AI/ML approach for personalization and computer vision

### Decision

The team selected:

- **Frontend:** React Native
- **Backend:** Node.js with Express
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **AI/ML:** TensorFlow Lite for on-device personalization, combined with cloud-based ML services for heavier models, and accessible ML kits for computer-vision-based nutrition logging

### Rationale

- **React Native** was chosen over Flutter, Kotlin Multiplatform, and Swift/SwiftUI because it offered the best balance of cross-platform code reuse, a mature ecosystem for fitness/social app components, strong animation support for workout experiences, and a lower learning curve for a JavaScript-experienced team. Kotlin Multiplatform and Swift/SwiftUI were ruled out because they either required duplicated native UI work or excluded Android/web entirely, which conflicted with the "seamless iOS/Android/web" requirement.
- **Node.js/Express** paired naturally with Firebase's real-time capabilities and let the team reuse JavaScript skills across the stack, speeding up development.
- **Firestore** was chosen over PostgreSQL and DynamoDB for its managed scaling, tight integration with Firebase Auth and Firebase's real-time listeners (critical for the social feed), and lower operational overhead for a mid-sized team without dedicated DB administrators.
- **Firebase Auth** was selected for fast integration, built-in support for common auth flows, and adequate compliance tooling for GDPR; a BAA-backed HIPAA plan was considered sufficient given FitFlow anonymizes health data before analysis.
- **TensorFlow Lite + cloud ML** balanced privacy (on-device inference minimizes data transmission) with the flexibility to run heavier models in the cloud when needed, directly addressing the personalization gap found in user research.

### Alternatives Considered

- **Flutter** — nearly tied with React Native on most criteria; not chosen mainly because the team's existing JavaScript/React expertise reduced ramp-up time with React Native.
- **PostgreSQL + Auth0** — offered stronger relational data guarantees and audit rigor for health data, but was rejected due to higher setup and operational complexity for the team's size and timeline.
- **Kotlin Multiplatform / Swift** — offered the best raw performance and native security guarantees but were rejected due to higher maintenance cost (still requires platform-specific UI) or lack of cross-platform/web support.

### Consequences

**Positive:**
- Faster time-to-market with a single mobile codebase and a JavaScript-only stack
- Lower infrastructure management overhead (managed Firestore/Auth vs self-hosted DB)
- Real-time social and notification features work out-of-the-box with Firebase
- On-device AI inference reduces latency and keeps sensitive data on-device where possible

**Trade-offs / Risks:**
- Firestore's query model is less flexible than a relational database for complex, multi-attribute health-data reporting; may need a secondary analytics store if reporting needs grow
- React Native still bridges to native modules for some performance-critical features, which can introduce edge-case bugs compared to fully native code
- Vendor lock-in to the Firebase/Google Cloud ecosystem could complicate a future migration

### Follow-up

Revisit this ADR if: (1) health-data compliance requirements tighten beyond what Firestore/Firebase Auth can support, or (2) query complexity for analytics/reporting grows beyond what Firestore handles efficiently — at which point introducing a PostgreSQL-based reporting layer alongside Firestore should be evaluated.
