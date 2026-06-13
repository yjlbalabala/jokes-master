## ADDED Requirements

### Requirement: Joke generation API contract

The server SHALL expose `POST /api/joke` accepting JSON `{ "mode": "jp-kr" | "western" }` and returning `{ "joke": string }` on success.

#### Scenario: Successful joke generation

- **WHEN** the client sends a valid `POST` with `mode` set to `jp-kr` or `western` and `DEEPSEEK_API_KEY` is configured
- **THEN** the response status is 200 and the body contains a non-empty `joke` string

#### Scenario: Invalid mode

- **WHEN** the client sends `POST` with a missing or invalid `mode`
- **THEN** the response status is 400 and the body describes the validation error

#### Scenario: Missing API key

- **WHEN** `DEEPSEEK_API_KEY` is not set on the server
- **THEN** the response status is 500 and the body indicates server misconfiguration

### Requirement: DeepSeek official API only

The server SHALL call DeepSeek Chat Completions at `https://api.deepseek.com/chat/completions` using model `deepseek-v4-flash` and SHALL NOT call other LLM providers.

#### Scenario: Model identifier

- **WHEN** the server generates a joke
- **THEN** the upstream request uses `model: deepseek-v4-flash`

### Requirement: API key server-side only

The application SHALL read `DEEPSEEK_API_KEY` only from server environment variables and SHALL NOT expose the key to the browser or accept it from client requests.

#### Scenario: Client cannot supply key

- **WHEN** the client sends a request body containing an API key field
- **THEN** the server ignores client-supplied keys and uses only environment configuration

### Requirement: Frontend fetch layer

The frontend SHALL request jokes via same-origin `fetch('/api/joke', { method: 'POST', ... })` from the generating page and display the returned joke on the result page.

#### Scenario: Generating page calls API

- **WHEN** the user reaches the generating page with a valid `mode` query
- **THEN** the client issues `POST /api/joke` with the corresponding mode

#### Scenario: Result shows API joke

- **WHEN** the API returns success
- **THEN** the result page displays the `joke` text from the response
