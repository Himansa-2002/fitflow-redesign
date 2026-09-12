# FitFlow Redesign

A full-scale redesign of **FitFlow**, a fitness-tracking app that was steadily losing users — retention had dropped and app-store ratings fell from 4.6 to 3.8 stars. This project follows a structured human-centered design process to fix the core problems uncovered in user research: a personalization gap, social isolation within the app, high friction in daily tracking, and low motivation.

> Course project — IT3060 Human Computer Interaction, BSc (Hons) in Information Technology, SLIIT.

## Problem

- 68% of users abandoned the app shortly after onboarding
- Nutrition logging was tedious and high-friction
- Workout plans felt generic, not personalized
- Users felt isolated — no meaningful social accountability features

## Redesign Goals

- AI-powered, adaptive personalized workout plans
- Private social circles for accountability without overwhelming users
- Camera-based nutrition logging (computer vision, low friction)
- Fast, offline-capable, accessible, and secure experience

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | **React Native** | Cross-platform (iOS/Android/Web) from one codebase, strong animation support, fast dev speed |
| Backend | **Node.js + Express** | Pairs naturally with Firebase, real-time support, team already knows JavaScript |
| Database | **Firebase Firestore** | Managed scaling, real-time listeners for social feed, low ops overhead |
| Auth | **Firebase Auth** | Fast integration, built-in flows, GDPR-aligned |
| AI/ML | **TensorFlow Lite + Cloud ML** | On-device inference for privacy and speed, cloud fallback for heavier models |
| Computer Vision | **Accessible ML Kits** | Powers instant food recognition for nutrition logging |

Full comparison tables and the weighted decision matrix behind this choice are in [`docs/tech-stack-summary.md`](docs/tech-stack-summary.md) and [`docs/comparison-matrix.md`](docs/comparison-matrix.md).

## Architecture

See [`docs/architecture-diagram.png`](docs/architecture-diagram.png) for the high-level system diagram (client, backend, AI microservice, and data layers) and [`docs/adr.md`](docs/adr.md) for the Architecture Decision Record explaining the stack choice, alternatives considered, and trade-offs.

## Project Structure

```
fitflow-redesign/
├── frontend/       # React Native app (iOS/Android/Web)
├── backend/        # Node.js/Express API and real-time services
├── ai-service/     # AI/ML microservice (personalization, computer vision)
├── docs/           # Tech stack comparisons, decision matrix, architecture diagram, ADR
├── .gitignore
└── README.md
```

## Setup

Development has not started yet — this repository currently holds the redesign's research, tech-stack decisions, and architecture documentation. Setup instructions will be added once the frontend and backend scaffolding are in place.

## Status

Retention rates, ratings, and app performance metrics from the original FitFlow app, along with the research and design process behind this redesign, are documented in the accompanying case study and lab report.
