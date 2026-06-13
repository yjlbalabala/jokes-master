## MODIFIED Requirements

### Requirement: API route placeholder

The project SHALL expose `POST /api/joke` that generates a joke via DeepSeek when configured, replacing the previous HTTP 501 placeholder for valid generation requests.

#### Scenario: Placeholder API response

- **WHEN** a client sends a request to `/api/joke`
- **THEN** the response status is 501 and the body indicates not implemented

#### Scenario: Successful generation replaces placeholder

- **WHEN** a client sends `POST /api/joke` with valid `mode` and the server is configured with `DEEPSEEK_API_KEY`
- **THEN** the response status is 200 with `{ "joke": string }` instead of 501
