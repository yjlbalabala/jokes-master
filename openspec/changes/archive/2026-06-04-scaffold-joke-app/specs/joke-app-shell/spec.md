## ADDED Requirements

### Requirement: Vite Vue project bootstrap

The repository SHALL contain a Vite + Vue 3 application that builds with `npm run build` and serves locally with `npm run dev`.

#### Scenario: Development server starts

- **WHEN** a developer runs `npm install` followed by `npm run dev`
- **THEN** the dev server starts without errors and serves the application

#### Scenario: Production build succeeds

- **WHEN** a developer runs `npm run build`
- **THEN** static assets are emitted to the configured output directory (default `dist/`)

### Requirement: Environment variable documentation

The project SHALL include `.env.example` documenting future server-side variables (e.g. `DEEPSEEK_API_KEY`) without committing secrets.

#### Scenario: Example env file present

- **WHEN** a developer clones the repository
- **THEN** `.env.example` exists and lists placeholder variable names for later API integration

### Requirement: API route placeholder

The project SHALL include a serverless API entry at `/api/joke` that returns HTTP 501 and a JSON body indicating the endpoint is not yet implemented.

#### Scenario: Placeholder API response

- **WHEN** a client sends a request to `/api/joke`
- **THEN** the response status is 501 and the body indicates not implemented

### Requirement: Deployment configuration

The project SHALL include deployment configuration for static hosting with API routes (e.g. `vercel.json`) and a README section describing local dev and deploy steps.

#### Scenario: Deploy docs available

- **WHEN** a developer reads the project README
- **THEN** instructions exist for `npm run dev`, `npm run build`, and deploying to the chosen platform
