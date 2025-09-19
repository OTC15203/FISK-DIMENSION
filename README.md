# Fisk Dimension Omega9 – Private Control Platform

A converged deployment scaffold for the Fisk Dimension initiative. The repository now ships with a production-minded full-stack web platform alongside the original Unity prototype so the collective can experiment with immersive interaction flows, anime-inspired visuals, and secure operator tooling from a single codebase.

## What's Included

- **Frontend dashboard** – React + Vite + Tailwind experience channeling a "3D pixel anime" control room with avatar rendering, voice activation prompts, and gatekeeping UX.
- **Backend services** – Node/Express API with Server-Sent Events (SSE) session streaming, audit logging, and hook points for Guardian AI.
- **Shared utilities** – Auth and logging helpers published through a workspace so both frontend and backend can stay aligned.
- **Deployment stack** – Dockerfiles, compose configuration, environment templates, and operational scripts for rotating secrets or backups.
- **Unity dialogue prototype** – Existing Assets folder retained so creative teams can continue iterating on the 3D scene player.

## Repository Layout

```text
Assets/                     # Unity dialogue playback prototype (unchanged)
backend/
  Dockerfile                # Production build instructions (yarn-based)
  package.json
  routes/
  services/
  src/
  utils/
frontend/
  Dockerfile                # Static build served via nginx
  index.html
  package.json
  src/
shared/                     # Workspace exposing auth/log helpers
  package.json
  scripts/
deploy/
  docker-compose.yml
  env/
  scripts/
.githooks/
logs/
package.json                # Yarn workspaces root
.yarnrc.yml                 # Forces node_modules linker for Docker compatibility
```

> Logs are kept empty by default (`logs/.gitkeep`) so deployments can mount persistent volumes without polluting the repository.

## Getting Started

This project uses Yarn workspaces (Berry) with the node_modules linker for compatibility with Docker and local tooling.

```bash
corepack enable # optional, but recommended to pin Yarn
cd FISK-DIMENSION
yarn install
```

> **Note:** Automated dependency installation requires external registry access. If the command fails in restricted environments, regenerate the workspace lockfiles locally and commit them before building Docker images with `--frozen-lockfile`.

### Frontend Dashboard

```bash
yarn dev # starts the Vite dev server on http://localhost:3000
yarn workspace fisk-dimension-frontend build # builds to frontend/dist
```

The landing scene simulates the Omega9 gate:
- 3D pixel/anime inspired gradients and grid overlays.
- Secure gate with local-storage tokening.
- React Three Fiber canvas that loads `/assets/avatars/guardian.glb` when supplied (place assets under `frontend/public/assets/`).
- Voice activation button stub publishing the "Fisk Awaken" command.

### Backend API

```bash
yarn backend # node --watch src/index.js
yarn workspace fisk-dimension-backend start # production-style start
```

Endpoints exposed under `/api`:
- `GET /api/v1/session` – issues a session id.
- `POST /api/v1/session/:id/events` – appends an event to a tracked session and dispatches it to SSE listeners.
- `GET /api/v1/session/:id/stream` – establishes a Server-Sent Event stream.
- `GET /api/v1/echo` – simple heartbeat response.

The backend reads optional environment overrides from `deploy/env/.env`. Copy the template to get started:

```bash
cp deploy/env/.env.template deploy/env/.env
```

### Shared Utilities

Shared code is located in `shared/` and exposes helpers via:

```js
import { verifyAccessToken } from '@fisk/shared/auth';
import { createAuditLogger } from '@fisk/shared/logger';
```

A basic build script copies `index.js` into `dist/` for packaging scenarios.

### Docker & Deployment

The `deploy/docker-compose.yml` file orchestrates the frontend, backend, Postgres, and Redis containers. Environment variables follow `deploy/env/.env.template`. Utility scripts live in `deploy/scripts/` for secret rotation and backups (currently stubs to be expanded).

### Unity Dialogue Prototype

The original Unity scaffolding remains untouched so scene teams can continue iterating. Quick reminder of the workflow:

1. **Game Controller** – create an empty `GameObject` named `GameController` and attach `PlayerController.cs` + `LipSyncDriver.cs`.
2. **Audio Source** – add an `AudioSource` component and assign it to `PlayerController`.
3. **UI Canvas** – add `Canvas`, `ChoicePanel`, `PromptText`, and choice buttons, then bind them to `ChoiceOverlay`.
4. **Episode Data** – customize `Assets/Resources/episode.json` and drop audio clips into `Assets/Resources/Audio/` following the `episode_scene_l###` naming convention.
5. **Play** – dialogue runs sequentially, choices drive transitions, and lip-sync hooks can be replaced with production systems.

## Git Hooks

`.githooks/pre-commit-secret-scan` prevents accidental check-ins of obvious secrets. Enable with:

```bash
git config core.hooksPath .githooks
```

## Next Steps

- Wire real authentication to the secure gate (use `@fisk/shared` helpers).
- Replace placeholder alerts with live navigation flows and WebGL events.
- Extend the backend session service to persist to Postgres/Redis and secure SSE channels.
- Continue blending Unity cinematics with the web dashboard for a holistic storytelling surface.
