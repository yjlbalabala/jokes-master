## ADDED Requirements

### Requirement: Three-page navigation

The application SHALL provide three routes: home (`/`), generating (`/generating`), and result (`/result`), wired with Vue Router.

#### Scenario: Home route loads

- **WHEN** a user opens `/`
- **THEN** the home page is displayed

#### Scenario: Generating route loads

- **WHEN** a user navigates to `/generating`
- **THEN** the generating page placeholder is displayed

#### Scenario: Result route loads

- **WHEN** a user navigates to `/result`
- **THEN** the result page placeholder is displayed

### Requirement: Mode selection on home

The home page SHALL allow selecting joke mode「日韩模式」or「欧美模式」and SHALL navigate to the generating page with the selected mode encoded (e.g. query `mode=jp-kr` or `mode=western`).

#### Scenario: JP-KR mode selected

- **WHEN** the user selects 日韩模式 and confirms (e.g. button click)
- **THEN** the app navigates to `/generating` with `mode` indicating jp-kr

#### Scenario: Western mode selected

- **WHEN** the user selects 欧美模式 and confirms
- **THEN** the app navigates to `/generating` with `mode` indicating western

### Requirement: Placeholder generate flow

The generating page SHALL display placeholder content for an in-progress joke and SHALL provide a way to reach the result page without calling an external API.

#### Scenario: Reach result from generating

- **WHEN** the user is on the generating page and triggers continue (auto-timeout or button per implementation)
- **THEN** the app navigates to `/result` with placeholder joke content

### Requirement: Return to home from result

The result page SHALL display placeholder joke text and SHALL provide navigation back to the home page.

#### Scenario: Return home

- **WHEN** the user chooses to return home from the result page
- **THEN** the app navigates to `/`
