# Weighted Technology Decision Matrix — FitFlow Redesign

This matrix consolidates the frontend, backend, database, and authentication comparisons (Activities 1 & 2) into a single weighted scoring model, as required for Activity 3.

## Scoring Method

Each option is scored **1–5** per criterion (5 = best fit for FitFlow). Scores are multiplied by the criterion's weight, then summed for a weighted total.

## Criteria & Weights

| Criterion | Weight | Rationale |
|---|---|---|
| Performance | 20% | Fitness app needs smooth real-time tracking and responsiveness |
| Security | 20% | Handles sensitive health data — high sensitivity |
| Development speed | 15% | Startup needs to ship the redesign fast |
| AI/ML support | 15% | Personalization is the core new feature driving the redesign |
| Scalability | 15% | Must handle user growth post-redesign |
| Cost | 10% | Mid-sized team, budget-conscious |
| Maintainability | 5% | Smaller team, but still matters long-term |

**Total weight: 100%**

---

## Frontend Layer

| Option | Performance (20%) | Security (20%) | Dev Speed (15%) | AI/ML (15%) | Scalability (15%) | Cost (10%) | Maintainability (5%) | **Weighted Total** |
|---|---|---|---|---|---|---|---|---|
| **React Native** | 4 | 4 | 5 | 4 | 4 | 5 | 4 | **4.15** |
| Flutter | 4 | 4 | 5 | 4 | 4 | 5 | 4 | 4.15 |
| Kotlin Multiplatform | 5 | 5 | 3 | 5 | 4 | 3 | 3 | 4.05 |
| Swift/SwiftUI (iOS only) | 5 | 5 | 3 | 5 | 3 | 2 | 2 | 3.75 |

## Backend Layer

| Option | Performance (20%) | Security (20%) | Dev Speed (15%) | AI/ML (15%) | Scalability (15%) | Cost (10%) | Maintainability (5%) | **Weighted Total** |
|---|---|---|---|---|---|---|---|---|
| **Node.js/Express** | 4 | 4 | 5 | 3 | 4 | 4 | 4 | **4.00** |
| Python/FastAPI | 3 | 4 | 4 | 5 | 4 | 4 | 4 | 3.90 |
| Go | 5 | 4 | 2 | 2 | 5 | 4 | 3 | 3.55 |

## Database Layer

| Option | Performance (20%) | Security (20%) | Dev Speed (15%) | AI/ML (15%) | Scalability (15%) | Cost (10%) | Maintainability (5%) | **Weighted Total** |
|---|---|---|---|---|---|---|---|---|
| **Firestore (Firebase)** | 4 | 4 | 5 | 4 | 5 | 3 | 5 | **4.30** |
| PostgreSQL | 4 | 5 | 3 | 3 | 4 | 4 | 4 | 3.90 |
| MongoDB | 4 | 3 | 4 | 3 | 4 | 4 | 4 | 3.65 |
| DynamoDB | 5 | 4 | 3 | 3 | 5 | 3 | 3 | 3.90 |

## Authentication Layer

| Option | Performance (20%) | Security (20%) | Dev Speed (15%) | AI/ML (15%) | Scalability (15%) | Cost (10%) | Maintainability (5%) | **Weighted Total** |
|---|---|---|---|---|---|---|---|---|
| **Firebase Auth** | 4 | 4 | 5 | 3 | 5 | 4 | 5 | **4.25** |
| AWS Cognito | 4 | 5 | 3 | 3 | 5 | 4 | 3 | 4.05 |
| Auth0 | 4 | 5 | 4 | 3 | 4 | 3 | 4 | 3.95 |
| Supabase | 4 | 4 | 4 | 3 | 4 | 5 | 4 | 4.00 |

*(AI/ML column for auth options scored lower across the board since auth solutions have no direct role in AI/ML functionality — included only for consistency with the shared criteria set.)*

---

## Recommended Technology Stack

| Layer | Winning Option | Weighted Score |
|---|---|---|
| Frontend | React Native | 4.15 |
| Backend | Node.js/Express | 4.00 |
| Database | Firestore (Firebase) | 4.30 |
| Authentication | Firebase Auth | 4.25 |
| AI/ML | TensorFlow Lite + Cloud ML (see ADR) | — |

### Supporting Rationale

The matrix consistently favors the **Firebase-centric stack (React Native + Node.js/Express + Firestore + Firebase Auth)** because it scores highest on development speed, scalability, and maintainability — the criteria most critical for a mid-sized team needing to ship a redesign quickly while still meeting performance and security needs. This aligns with both the independent scoring above and the technology stack actually adopted in the FitFlow case study, reinforcing that the recommendation is well-grounded. The main trade-off, noted in the ADR, is reduced flexibility for complex relational health-data reporting compared to PostgreSQL — a risk to revisit as FitFlow's data and compliance needs mature.
