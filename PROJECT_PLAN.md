# Relay — Project Checklist

Build an AI workflow orchestrator with Java, Spring Boot, Spring Data JPA, MySQL, and a React frontend.

## Current status

- [x] Read the supplied project brief and identify the core requirements.
- [x] Agree on Java, Spring Boot, JPA, and MySQL for the backend.
- [x] Create this ordered project checklist in the local project folder.
- [x] Complete Phase 1: inspect the supplied contracts and finalize the design (design baseline complete; D01 resolved by user on2026-09-28: preserve supplied graph and enforce runtime gates).

**Next item: 7.1 — run the supplied smoke tests against the implemented API contract. Phase6 (run visibility APIs and read-and-operate console) is complete.**

The Spring Boot backend, health probes and API/worker bootstrap with shared database configuration are implemented and tested. MySQL Compose is running healthy with verified persistence/reset. Java-to-MySQL startup, test migration execution and readiness recovery are verified; domain Flyway schema is implemented and verified on disposable MySQL. Applying it to the ordinary local database requires normal API startup; deterministic worker execution is now implemented and verified. Workflow draft create/update/list/detail and validated publication APIs are implemented, with internal immutable run-snapshot preparation; the console can confirm access through the real workflow list. Normal API startup now inserts missing canonical Published seeds without overwriting existing workflows. Phase4 manual/webhook acceptance, durable ownership/recovery, deterministic handlers, retries and persisted step caps are complete; a packaged worker kill-and-resume test verified one original mock-world effect plus one replay with a stable key. Phase5 AI/approval handlers, human decision routes and cancellation are implemented; local verification passes. The user-selected OpenRouter adapter is configured and live-verified with openai/gpt-5-mini; Phase5 is complete. Earlier direct-OpenAI quota failures are historical. Phase6 adds redacted run list/detail/trace APIs and the React read-and-operate console (workflows, definitions, runs, traces, approvals, cancellation), verified against mocked and live stacks; demo steps are in `docs/CONSOLE_DEMO.md`. A GitHub repository is not needed to continue. All agent work must remain local: never push or publish through Git or another mechanism. Any eventual repository publication is a manual user task.

Project rules: read `AGENTS.md` before every task. Maintain `API_DOCUMENTATION.md` with every route addition or change.

## How we will use this checklist

1. Work through the phases in order and pick the first unfinished item.
2. Mark an item `[x]` only after its implementation or document is complete and its relevant checks pass.
3. Record useful evidence in the completion log: files, commands, test results, or demo results.
4. Update the next item above after each work session. Record blockers without marking unfinished work complete.
5. Finish each phase's exit check before moving to the next phase. If new requirements appear, add them explicitly.
6. Before implementation, add a task entry using the template below and explain the intended changes and test roadmap to the user.
7. Include test cases and record actual results for every task. Documentation-only tasks use document checks. Update API documentation in the same task as each route change.
8. Stay within the PDF requirements and its supporting contracts. Do not implement optional enhancements without an explicit user request.

## Per-task plan and result template

Add an entry under Task records before starting each task:

- **Task ID and status:**
- **Requirement/source:**
- **What we will do and why:**
- **Files/components affected:**
- **Implementation steps:**
- **Acceptance criteria:**
- **Test roadmap:** Prerequisites, test cases, inputs/actions, expected results, commands, and manual reproduction steps. Cover applicable success, failure, boundary, and edge cases.
- **API documentation changes:** Routes to document in `API_DOCUMENTATION.md`, or not applicable with a reason.
- **Implemented result:** Fill in after the work; describe actual changes.
- **Verification results:** Actual commands/checks and outcomes; distinguish passing, failing, and not run.
- **Limitations/blockers:**
- **Next item:**

## Agreed direction and proposed defaults

| Area | Decision |
| --- | --- |
| Backend | Java + Spring Boot + Spring Data JPA |
| Backend build | Gradle 9.8.0 with Gradle Wrapper (user-selected); Groovy DSL; baseline in `docs/SETUP.md` |
| Database | MySQL |
| Frontend | React + TypeScript + Vite (architecture A05) |
| Structure | One local project with backend, frontend, docs, and development tooling |
| Execution | API and worker as separate processes sharing backend code (A01) |
| Durable queue | MySQL jobs table with transactional claiming and recoverable ownership (A02; lease protocol in 1.8) |
| Schema migrations | Flyway; API startup owns migration (A04) |
| Local services | Docker Compose MySQL; host API/worker/frontend/mocks (A06) |
| AI | Provider interface with a mock implementation first; real provider later |
| Source control | Local work only; never push or publish. Remote publication is handled manually by the user. |

Version baseline selected in `docs/SETUP.md` (2.2); resolve dependencies and verify builds during scaffolding. Native SQL may be used for job claiming where JPA alone is insufficient.

## Phase 1 — Requirements and design

- [x] **1.1** Inspect the supplied capstone pack: problem statement, implementation guide, API contract, data model, evaluation guide, node catalog, seed workflows, sample payloads, and verification scripts.
- [x] **1.2** Write `docs/REQUIREMENTS.md`, mapping each required feature to its implementation and verification task. Preserve supplied routes, JSON shapes, node names, and error formats.
- [x] **1.3** Define the MVP (see `docs/MVP.md`): workflow management, webhook/manual triggers, durable execution, required node types, AI validation, approvals, traces, and a simple console.
- [x] **1.4** Write `docs/ARCHITECTURE.md`: API/worker responsibilities, module boundaries, configuration, and external services.
- [x] **1.5** Write `docs/DATA_MODEL.md`: workflows, frozen published definitions, run snapshots, step executions, attempts, approvals, jobs, constraints, and indexes.
- [x] **1.6** Define run, step, job, and approval state transitions, including rejection, retry exhaustion, delays, crash recovery, and terminal states.
- [x] **1.7** Define workflow semantics: entry node, branching, loops, input templates, step numbering, publish validation, and approval scope.
- [x] **1.8** Define recovery rules: atomic state changes, job leases, stale worker protection, retry timing, and stable per-action idempotency keys.
- [x] **1.9** Plan the read-and-operate console: workflow list/detail, run list, trace detail, and approval inbox; use APIs for creating/editing/publishing and manual triggers.

**Exit check — complete (2026-09-25):** R01–R22 have implementation tasks and V01–V23 verification coverage; tasks 1.4–1.9 define architecture, persistence, states, semantics, recovery and console. Fixed contracts are preserved. D01 remains a recorded pack-internal conflict requiring clarification before affected 5.10/7.6 acceptance; no runtime correctness or resolution of that conflict is claimed. Evidence: `docs/console-verification.txt` and preceding design verification files.

## Phase 2 — Development environment and project foundation

- [x] **2.1** Check Java, Maven, Node.js, package manager, Docker, and Python availability. Resolve the Java runtime error observed in the shell.
- [x] **2.2** Select compatible supported versions and record them in the setup documentation.
- [x] **2.3** Create backend, frontend, docs, and scripts directories, plus `.gitignore` and safe environment-variable examples.
- [x] **2.4** Scaffold Spring Boot with Gradle Wrapper, Web, Validation, JPA, MySQL driver, Security, Flyway, and health endpoints.
- [x] **2.5** Configure separate API and worker launch modes with shared database configuration.
- [x] **2.6** Add Docker Compose for MySQL and document database startup and reset procedures.
- [x] **2.7** Scaffold React, TypeScript, and Vite with routing, basic styling, and an API client.
- [x] **2.8** Add the supplied mock world, mock provider, fixtures, and verification scripts locally, preserving their provenance and license terms.
- [x] **2.9** Verify backend startup, database connectivity, migration execution, frontend startup, and mock-service startup.

**Exit check — complete (2026-09-25):** All component foundations start using documented commands without a real AI key. Packaged API/worker startup uses an isolated test migration for verification; task3.1 now supplies the domain schema for normal API-then-worker startup. Frontend remains a placeholder shell. Evidence: `docs/component-startup-verification.txt`.

## Phase 3 — Database and API foundation

- [x] **3.1** Create Flyway migrations for the approved data model, including uniqueness constraints and queue lookup indexes.
- [x] **3.2** Implement JPA entities, repositories, DTOs, validation, and consistent API errors.
- [x] **3.3** Implement management API authentication matching the supplied contract; protect approval actions and record the decision maker.
- [x] **3.4** Configure frontend access, CORS where needed, and consistent authentication/error handling.
- [x] **3.5** Implement the node catalog and workflow definition parsing.
- [x] **3.6** Implement workflow create, update, list, and detail APIs, plus any additional CRUD operations required by the contract.
- [x] **3.7** Implement publish validation for node configuration, references, branch targets, templates, entry points, and supported types. Allow required loop scenarios.
- [x] **3.8** Implement frozen published definitions and per-run definition snapshots; numbered version history is outside scope.
- [x] **3.9** Add repeatable seed-data loading without accidental duplication.
- [x] **3.10** Verify migrations and repositories against real MySQL using Testcontainers; test workflow validation and frozen published-definition/run-snapshot integrity.

**Exit check:** Seed workflows can be loaded, edited as drafts, validated, and published through the required API. **Verified complete in task3.10.**

## Phase 4 — Triggers and durable execution engine

- [x] **4.1** Implement manual trigger and workflow-secret-protected webhook APIs.
- [x] **4.2** Persist a run, its input/snapshot, and its initial queued work atomically before returning acceptance.
- [x] **4.3** Implement transactional job claiming, worker ownership, lease expiry, and recovery of abandoned work.
- [x] **4.4** Implement the execution loop and persist each logical step separately from its retry attempts.
- [x] **4.5** Persist step completion and subsequent work atomically; protect against stale workers and concurrent duplicate scheduling.
- [x] **4.6** Implement safe input/template resolution with clear failures for missing or invalid values; do not evaluate arbitrary code.
- [x] **4.7** Implement condition nodes and branch selection.
- [x] **4.8** Implement durable delays using scheduled job timestamps rather than sleeping worker threads.
- [x] **4.9** Implement HTTP request and notification nodes with explicit timeouts and controlled destinations.
- [x] **4.10** Implement required mock-world action nodes using the exact catalog contracts.
- [x] **4.11** Persist stable idempotency keys and resolved action inputs before side effects. Reuse them across retries; allocate new keys for distinct loop iterations.
- [x] **4.12** Implement bounded retries, backoff, retryable/non-retryable error handling, and terminal failure recording.
- [x] **4.13** Implement a persisted run step cap that still holds across retries, restarts, and loops.
- [x] **4.14** Test single-worker recovery ownership, expired leases, duplicate job delivery, delays across restarts, and crash windows around external side effects; multiple concurrent workers are outside scope.

**Exit check:** Deterministic workflows execute asynchronously and recover after worker restart without duplicating effects in the idempotency-aware mock world. **Verified complete in task4.14.**

## Phase 5 — Human approvals and AI nodes

- [x] **5.1** Implement approval nodes that persist a pending request and pause the run without occupying a worker.
- [x] **5.2** Implement approval listing and approve/reject APIs, including duplicate/conflicting decision handling.
- [x] **5.3** Persist approval decisions and any resumed work atomically. Implement the documented rejection behavior.
- [x] **5.4** Enforce approval gates in the engine for every sensitive action using an approved human decision earlier in the same run, as specified by the catalog.
- [x] **5.5** Implement an AI provider interface and connect the supplied mock provider.
- [x] **5.6** Implement AI node prompting and input handling, treating trigger payloads and model output as untrusted data.
- [x] **5.7** Validate AI output against the configured JSON Schema before downstream use; handle malformed output with bounded attempts and clear errors.
- [x] **5.8** Record AI provider/model metadata, latency, attempts, and token usage where available.
- [x] **5.9** Add one real provider integration with server-side credentials, timeout handling, and a documented configuration. Verify it when credentials are available.
- [x] **5.10** Test approval bypass attempts, wrong-run approvals, repeated approvals, malformed AI output, provider failure, and supplied prompt-injection payloads; review discrepancy1 resolved by user: preserve the supplied graph and enforce approval gates.

- [x] **5.11** Implement run cancellation per the API contract: queued cancellation, cooperative between-step cancellation, pending-approval closure, terminal-run conflicts, and decision/cancellation races; include regression tests and API documentation.

**Exit check:** Controlled AI decisions select valid workflow branches without bypassing schema, approval gates or the step cap; verified locally. Phase5 is complete: live OpenRouter synthetic output and reported usage verified on2026-09-28, with local schema/gate/cap/regression checks passing.

## Phase 6 — Run visibility and frontend console

- [x] **6.1** Implement run list/detail and trace APIs with filtering/pagination required for a usable console.
- [x] **6.2** Include resolved inputs, outputs, attempts, timestamps, durations, errors, and AI usage in traces; redact secrets.
- [x] **6.3** Build the application shell, navigation, and protected API access flow.
- [x] **6.4** Build workflow list/detail pages with draft/published status.
- [x] **6.5** Display workflow definition details and published status in the read-and-operate console; creation/editing/publishing use documented APIs.
- [x] **6.6** Show workflow node and branch details using a simple readable view; no graphical builder required.
- [x] **6.7** Document manual-trigger API demo steps and expose created runs through console history.
- [x] **6.8** Build run history and run detail with status refresh, branch/step progress and the existing cooperative cancellation action (console design 1.9).
- [x] **6.9** Build step trace inspection for inputs, outputs, attempts, failures, and AI usage.
- [x] **6.10** Build the approval inbox and approve/reject controls with decision feedback.
- [x] **6.11** Add loading, empty, validation-error, and request-failure states; verify keyboard usability and smaller screens.
- [x] **6.12** Verify console workflow/run visibility and approval actions for an API-triggered run, including a paused approval.

**Exit check:** The required scenarios can be demonstrated through the console without manually editing the database. **Verified complete in task6.12** against an isolated live stack (approval, rejection, auto branch, step cap, cancellation); AI-success branch requires the real provider.

## Phase 7 — End-to-end verification

- [ ] **7.1** Run the supplied smoke tests against the implemented API contract and resolve failures.
- [ ] **7.2** Verify all supplied seed scenarios: AI triage, expense approval, slow fulfillment, and the runaway loop.
- [ ] **7.3** Run the live worker kill-and-resume drill, including a crash after a side effect but before local completion is recorded.
- [ ] **7.4** Run the supplied duplication checker and save the results.
- [ ] **7.5** Verify mock-world outages, slow responses, retry exhaustion, and provider timeout/malformed-output handling.
- [ ] **7.6** Verify prompt-injection handling, engine-enforced approval gates, and step-cap termination; save evidence.
- [ ] **7.7** Run backend tests, frontend type checking/build, and meaningful browser tests for run visibility and approvals.
- [ ] **7.8** Verify clean startup and repeatable seed loading from a fresh local database.
- [ ] **7.9** Write `docs/VERIFICATION_REPORT.md` with commands, actual results, crash/recovery evidence, and known limitations.

**Exit check:** Required checks pass and the verification report contains reproducible evidence, not only claims.

## Phase 8 — Ready-to-run delivery

- [ ] **8.1** Finalize the README with prerequisites, environment variables, startup/shutdown commands, seed loading, and troubleshooting.
- [ ] **8.2** Finalize API documentation, architecture, state transitions, recovery design, idempotency assumptions, and known limitations.
- [ ] **8.3** Provide a documented command sequence to start the API, worker, database, frontend, and mock services.
- [ ] **8.4** Document separate mock-provider and real-provider configuration without committing credentials.
- [ ] **8.5** Write a repeatable demo script covering trigger, AI branch, approval, crash recovery, injection handling, and step cap.
- [ ] **8.6** Perform the full demo from the documented setup and resolve remaining blockers.
- [ ] **8.7** Check that source files and documentation contain no credentials or machine-specific configuration required to run.
- [ ] **8.8** Review every required checklist item and update the completion log and remaining limitations.

**Application-ready milestone:** Phases 1–8 are complete, required tests pass, and the app and demo run from the documented setup. A missing real-provider credential must be recorded as an outstanding verification item, not silently marked complete.

## Phase 9 — Submission preparation and manual user delivery

- [ ] **9.1** Prepare local repository/publication instructions. The user alone creates the remote repository and uploads the project; the agent must never push or publish.
- [ ] **9.2** Prepare automated backend tests and frontend checks locally for future repository use.
- [ ] **9.3** Verify setup from a clean local copy. After the user manually publishes, record the user-provided public repository link in the deliverables.
- [ ] **9.4** Record the explainer video using the verified demo script.
- [ ] **9.5** Package the repository link, README, verification report, demo instructions, and video for submission.

**Submission-ready milestone:** The application-ready milestone and all Phase 9 deliverables are complete, including the user's manual publication step. The agent must not publish or deploy the project.

## Scope boundary

Optional enhancements are excluded from the active roadmap. Build only what is needed for the PDF requirements and supporting contracts. Record and resolve scope questions before implementing affected behavior.

## Task records

### Task 6.12 — Console end-to-end verification — complete (2026-09-28)

- **Requirement/source:** Phase6 exit check; CONSOLE Q01–Q08; V19.
- **What we will do and why:** Prove the console works against the real stack, not only mocked routes: MySQL (Compose), packaged API and worker, supplied mock world, and the built console. Trigger runs through the documented API (6.7), then drive Chromium through workflow list/detail, run history, run trace, the paused `wf_expense_approval` approval (approve one run, reject another), and cancellation of a delayed run.
- **Files/components affected:** `frontend/tests/e2e-live.spec.ts` (opt-in Playwright run, skipped unless `RELAY_E2E_TOKEN` is set), `frontend/playwright.live.config.ts`, `docs/phase6-verification.txt`.
- **Acceptance criteria:** All steps pass against the live stack with no database edits; approved run ends `succeeded`, rejected run `cancelled` with decider evidence visible in the trace; no token appears in URL or storage.
- **Test roadmap:** Prereqs: Docker, Java21, Node24, Python3, seeds loaded. Command: `RELAY_E2E_TOKEN=... npx playwright test -c playwright.live.config.ts`. Cases: connect; seed workflows listed as Published; workflow detail nodes/edges; API-triggered run visible in history; trace steps and AI/branch data; paused approval visible in inbox and run; approve → succeeded; reject → cancelled; cancel of queued/delayed run. Manual reproduction steps recorded in the evidence file.
- **API documentation changes:** None (no route change); link evidence.
- **Implemented result:** Opt-in `tests/e2e-live.spec.ts` + `playwright.live.config.ts` drove the built console against an isolated live stack: published seeds, frozen definition, API-triggered run through history/trace, paused approval approved and another rejected, auto branch, step cap, delay cancellation; ledger confirmed no unexpected effects. Stack torn down afterwards.
- **Verification results:** Backend final `test bootJar testcontainersTest`: 223 unit + 32 real-MySQL, 0 failed. Frontend: `tsc` clean, `npm test` 57/57, mocked `npx playwright test` 24/24 (72/72 over 3 repeats), live `playwright.live.config.ts` 6/6 against an isolated real stack. 13 document checks pass. Intermediate failures and fixes: `docs/phase6-verification.txt`.
- **Limitations/blockers:** The AI-success branch was not exercised live: the supplied mock provider replies in prose by design and the real provider was not used without the user's go-ahead. Latent JVM-vs-MySQL clock skew risk recorded.
- **Next item:** 7.1.

### Task 6.11 — Console states, keyboard and small screens — complete (2026-09-28)

- **Requirement/source:** CONSOLE view-state table, accessibility and responsive rules.
- **What we will do and why:** Consistent loading (labeled progress, no fake rows), empty (context-specific), validation error (safe API message plus filter reset), request failure (retain stale data with timestamp and Retry), 401 (session cleared), 403, 404 (Not found with list link; network failure is not 404). Verify keyboard-only operation, visible focus, 320px width with no horizontal page scroll, and long IDs/JSON contained.
- **Files/components affected:** shared `frontend/src/ui.tsx` state components, `style.css`, Playwright specs.
- **Acceptance criteria / test roadmap:** Playwright with mocked routes for each state per view; keyboard traversal through inbox confirm/Escape; 320px `scrollWidth<=innerWidth` on list, trace and inbox with 150-char IDs; screenshots saved.
- **API documentation changes:** None.
- **Implemented result:** Shared loading/empty/error/stale/not-found states, labeled progress, keyboard operation (tab order, Escape, focus return), 320 px layouts with long IDs/JSON contained; a mobile trace-header overlap found in screenshots was fixed.
- **Verification results:** Backend final `test bootJar testcontainersTest`: 223 unit + 32 real-MySQL, 0 failed. Frontend: `tsc` clean, `npm test` 57/57, mocked `npx playwright test` 24/24 (72/72 over 3 repeats), live `playwright.live.config.ts` 6/6 against an isolated real stack. 13 document checks pass. Intermediate failures and fixes: `docs/phase6-verification.txt`.
- **Limitations/blockers:** None beyond the Phase6 limitations in the evidence file.
- **Next item:** 6.12.

### Task 6.10 — Approval inbox and decisions — complete (2026-09-28)

- **Requirement/source:** Fixed GET approvals/POST approve; reject route; CONSOLE U05 decision rules.
- **What we will do and why:** `/console/approvals` lists pending requests oldest first (workflow via run, run link, node/sequence, time, message as plain text), with `?focus=<approvalId>`. Approve/Reject opens inline confirmation (reject states it cancels the run); Escape cancels; confirm sends exactly one POST, disables both buttons, never retries automatically; success shows recorded result and refreshes; 409 refetches and shows "This request changed before your decision was saved"; timeout/abort shows "Decision outcome unknown" and blocks repeat until fresh state. 2s polling.
- **Files/components affected:** `frontend/src/views/ApprovalsPage.tsx`, `model.ts`, tests.
- **Acceptance criteria / test roadmap:** Mocked Playwright: list render/escaping, focus param, approve success, reject wording/success, 409 conflict, timeout unknown outcome with no second POST, Escape closes and restores focus, empty state "No pending approvals." Unit tests for approval list parsing.
- **API documentation changes:** Amended during implementation: `GET /approvals` items gain additive `workflow_id` and `created_at` (the design requires workflow context and request time, which the Phase5 projection lacked). Documented in API_DOCUMENTATION with a HumanAiMySqlTest assertion.
- **Implemented result:** Inbox oldest first with workflow/run/node/request time and plain-text message, `?focus=` highlighting, inline confirm (reject states it cancels the run), exactly one POST, success notice with View run, conflict and unknown-outcome reconciliation without resend. Backend `GET /approvals` gained workflow_id and created_at.
- **Verification results:** Backend final `test bootJar testcontainersTest`: 223 unit + 32 real-MySQL, 0 failed. Frontend: `tsc` clean, `npm test` 57/57, mocked `npx playwright test` 24/24 (72/72 over 3 repeats), live `playwright.live.config.ts` 6/6 against an isolated real stack. 13 document checks pass. Intermediate failures and fixes: `docs/phase6-verification.txt`.
- **Limitations/blockers:** None beyond the Phase6 limitations in the evidence file.
- **Next item:** 6.11.

### Task 6.9 — Step trace inspection — complete (2026-09-28)

- **Requirement/source:** CONSOLE trace-field table; 6.2 payload.
- **What we will do and why:** Each trace row expands (button with `aria-expanded`) into Input, Output, Error, Attempts (number, cause, status, error, timing, provider/model, tokens; uncertain labeled "Outcome unknown — the remote call may have completed"), approval evidence, idempotency key and branch. Null tokens show "Unavailable", not 0. Expansion state keyed by sequence survives polling; on first open the active/failed row is revealed.
- **Files/components affected:** `frontend/src/views/RunDetailPage.tsx`, `model.ts`, tests.
- **Acceptance criteria / test roadmap:** Mocked Playwright: expand rows, attempts table, uncertain label, JSON shown as text (script payload not executed), expansion kept after refresh; unit tests for token/duration formatting.
- **API documentation changes:** None.
- **Implemented result:** Expandable trace rows (stable across polling; active/failed row revealed on first load) showing timing, branch, delay/retry deadlines, idempotency key, AI tokens (null = Unavailable), approval evidence, redacted input/output/error and attempts table with the uncertain-outcome label.
- **Verification results:** Backend final `test bootJar testcontainersTest`: 223 unit + 32 real-MySQL, 0 failed. Frontend: `tsc` clean, `npm test` 57/57, mocked `npx playwright test` 24/24 (72/72 over 3 repeats), live `playwright.live.config.ts` 6/6 against an isolated real stack. 13 document checks pass. Intermediate failures and fixes: `docs/phase6-verification.txt`.
- **Limitations/blockers:** None beyond the Phase6 limitations in the evidence file.
- **Next item:** 6.10.

### Task 6.8 — Run history and run detail — complete (2026-09-28)

- **Requirement/source:** CONSOLE U03/U04, status table, cancellation rules; 6.1 routes.
- **What we will do and why:** `/console/runs` with workflow and status filters in URL query (invalid values show a filter error and Reset, no request), 25 per page, Next/Previous via cursor stack, newest first, 5s polling of the current page. `/console/runs/:runId` shows summary (status label, workflow, times in UTC, steps/cap, error/cap reason, cancellation notice, AI usage) and the ordered trace loading all step pages; 2s polling until terminal, then stops but keeps Refresh. Cancel button (queued/running/waiting_approval only) with inline confirmation "Stop future work; the current step may finish.", one POST, 202 shows cancellation requested, 409 refetches.
- **Files/components affected:** `frontend/src/views/RunsPage.tsx`, `RunDetailPage.tsx`, `polling.ts`, tests.
- **Acceptance criteria / test roadmap:** Mocked Playwright: filters → query params, invalid filter, paging next/prev and end, run link encoding, detail summary, multi-page trace loaded, polling stops at terminal, cancel confirm/202/409. Unit tests for polling backoff and query building.
- **API documentation changes:** None.
- **Implemented result:** Runs page with URL-backed workflow/status filters validated before any request, server-side cursor paging (Previous/Next/End of list), newest first; run detail with summary, cap/cancellation wording, 2 s polling that stops at terminal state, all step pages merged, and one-shot cancel with confirmation, Escape, 202/409/unknown handling.
- **Verification results:** Backend final `test bootJar testcontainersTest`: 223 unit + 32 real-MySQL, 0 failed. Frontend: `tsc` clean, `npm test` 57/57, mocked `npx playwright test` 24/24 (72/72 over 3 repeats), live `playwright.live.config.ts` 6/6 against an isolated real stack. 13 document checks pass. Intermediate failures and fixes: `docs/phase6-verification.txt`.
- **Limitations/blockers:** None beyond the Phase6 limitations in the evidence file.
- **Next item:** 6.9.

### Task 6.7 — Manual-trigger demo steps — complete (2026-09-28)

- **Requirement/source:** CONSOLE (creation/trigger are API-driven); PDF demo needs.
- **What we will do and why:** Document exact curl steps to trigger each seed (manual and webhook) and where the created run appears in the console (history and `/console/runs/<run_id>` direct link). The console shows a "How to start runs" note linking the doc; no trigger button (out of scope).
- **Files/components affected:** `docs/CONSOLE_DEMO.md`, console empty states.
- **Acceptance criteria / test roadmap:** Document check: every seed ID and route in the doc matches seeds and API docs; commands executed during 6.12 with recorded results.
- **API documentation changes:** Link from API docs to the demo steps.
- **Implemented result:** `docs/CONSOLE_DEMO.md`: stack start pointers, verified curl commands for every seed scenario (secrets read from the fixture file, not copied), console walkthrough and the opt-in live test command. SETUP/CONSOLE stale statements updated.
- **Verification results:** Backend final `test bootJar testcontainersTest`: 223 unit + 32 real-MySQL, 0 failed. Frontend: `tsc` clean, `npm test` 57/57, mocked `npx playwright test` 24/24 (72/72 over 3 repeats), live `playwright.live.config.ts` 6/6 against an isolated real stack. 13 document checks pass. Intermediate failures and fixes: `docs/phase6-verification.txt`.
- **Limitations/blockers:** None beyond the Phase6 limitations in the evidence file.
- **Next item:** 6.8.

### Task 6.6 — Readable node and branch view — complete (2026-09-28)

- **Requirement/source:** CONSOLE U02 node table.
- **What we will do and why:** Node table in definition order: ID (entry marked), type (unknown types shown as stored text), parameters as read-only JSON in expandable details, and edges (`next` or `on_true`/`on_false`) as in-page links to the target node; null edge shows "End"; dangling targets shown as text "missing node".
- **Files/components affected:** `WorkflowDetailPage.tsx`, `model.ts`.
- **Acceptance criteria / test roadmap:** Unit tests for edge extraction (next/condition/null/dangling); Playwright edge link moves focus to target row.
- **API documentation changes:** None.
- **Implemented result:** Node table in definition order with Entry tag, unknown types shown as stored, parameters as read-only JSON, edges Next/If true/If false as in-page links, End for null and "missing node" for dangling targets.
- **Verification results:** Backend final `test bootJar testcontainersTest`: 223 unit + 32 real-MySQL, 0 failed. Frontend: `tsc` clean, `npm test` 57/57, mocked `npx playwright test` 24/24 (72/72 over 3 repeats), live `playwright.live.config.ts` 6/6 against an isolated real stack. 13 document checks pass. Intermediate failures and fixes: `docs/phase6-verification.txt`.
- **Limitations/blockers:** None beyond the Phase6 limitations in the evidence file.
- **Next item:** 6.7.

### Task 6.5 — Workflow definition and published status — complete (2026-09-28)

- **Requirement/source:** CONSOLE U02.
- **What we will do and why:** `/console/workflows/:id` shows name, ID, description, status, trigger type, "Secret configured" (never the value), entry, max_steps, optional limits labeled "Stored; not enforced", timestamps. Published → frozen published definition; draft with an older publication → tabs "Draft definition" / "Last published definition" with "New triggers require republishing the draft". "View runs" links to the filtered history.
- **Files/components affected:** `WorkflowDetailPage.tsx`, tests.
- **Acceptance criteria / test roadmap:** Mocked Playwright: published, draft-only, draft-with-publication, 404 Not found, secret never rendered.
- **API documentation changes:** None.
- **Implemented result:** Workflow detail: metadata, secret shown only as "Secret configured", entry, max_steps, optional limits labeled "stored; not enforced", frozen published definition by default, Draft / Last published toggle with republish notice, "View runs" link, Not found state.
- **Verification results:** Backend final `test bootJar testcontainersTest`: 223 unit + 32 real-MySQL, 0 failed. Frontend: `tsc` clean, `npm test` 57/57, mocked `npx playwright test` 24/24 (72/72 over 3 repeats), live `playwright.live.config.ts` 6/6 against an isolated real stack. 13 document checks pass. Intermediate failures and fixes: `docs/phase6-verification.txt`.
- **Limitations/blockers:** None beyond the Phase6 limitations in the evidence file.
- **Next item:** 6.6.

### Task 6.4 — Workflow list — complete (2026-09-28)

- **Requirement/source:** CONSOLE U01; `GET /workflows`.
- **What we will do and why:** Table of name, ID, status (Draft/Published text), trigger type, updated time (UTC); name links to detail; empty "No workflows yet" with seed/API instructions; no Create button; 5s polling.
- **Files/components affected:** `WorkflowsPage.tsx`, tests.
- **Acceptance criteria / test roadmap:** Mocked Playwright rows/links/empty/refresh failure keeps rows; unit parse tests reject malformed rows.
- **API documentation changes:** None.
- **Implemented result:** Workflow table (name link, ID, Draft/Published text status, trigger, UTC updated time), empty state with demo pointer, no Create button, stale data kept on refresh failure.
- **Verification results:** Backend final `test bootJar testcontainersTest`: 223 unit + 32 real-MySQL, 0 failed. Frontend: `tsc` clean, `npm test` 57/57, mocked `npx playwright test` 24/24 (72/72 over 3 repeats), live `playwright.live.config.ts` 6/6 against an isolated real stack. 13 document checks pass. Intermediate failures and fixes: `docs/phase6-verification.txt`.
- **Limitations/blockers:** None beyond the Phase6 limitations in the evidence file.
- **Next item:** 6.5.

### Task 6.3 — Shell, navigation and protected access — complete (2026-09-28)

- **Requirement/source:** CONSOLE access/shell; tasks 2.7/3.4 foundation.
- **What we will do and why:** Lift the memory-only `ManagementSession` into a React context shared by all views; views render a "Connect to view data" prompt until connected; disconnect/401 clears data, aborts requests and polling; shared `useResource` hook with generation guards, non-overlapping polling, visibility pause, backoff 5/10/30s, last-refresh time and Refresh button.
- **Files/components affected:** `frontend/src/session.ts`, `SessionContext.tsx`, `polling.ts`, `App.tsx`, `AccessPanel.tsx`, existing tests updated for the new data views.
- **Acceptance criteria / test roadmap:** Unit tests for backoff schedule and generation guard; Playwright: token never stored, disconnect clears rendered data, 401 during polling disconnects and refocuses token input.
- **API documentation changes:** None.
- **Implemented result:** `SessionContext` shares one memory-only session; `useResource` gives generation-guarded, non-overlapping polling with 5/10/30 s backoff, visibility pause, permanent-4xx stop, Refresh and last-updated time. Disconnect/401 clears data and refocuses the token input; after connecting, focus moves to the page heading.
- **Verification results:** Backend final `test bootJar testcontainersTest`: 223 unit + 32 real-MySQL, 0 failed. Frontend: `tsc` clean, `npm test` 57/57, mocked `npx playwright test` 24/24 (72/72 over 3 repeats), live `playwright.live.config.ts` 6/6 against an isolated real stack. 13 document checks pass. Intermediate failures and fixes: `docs/phase6-verification.txt`.
- **Limitations/blockers:** None beyond the Phase6 limitations in the evidence file.
- **Next item:** 6.4.

### Task 6.2 — Trace payload and redaction — complete (2026-09-28)

- **Requirement/source:** 6.2; fixed GET run "full trace also contains resolved inputs, outputs, attempts, timing, AI token usage"; CONSOLE trace-field table; secrets never exposed.
- **What we will do and why:** Extend `GET /runs/{runId}` (additive, no field removed): run `workflow_name` and `entry` (from snapshot), redacted `input`, `ai_tokens_used`, `ai_usage_complete`; each step adds redacted `resolved_input` and `output`, `error` object, `idempotency_key`, `ai_repair_count`, `tokens_prompt`, `tokens_completion`, `ai_usage_complete`, `retry_due_at` (queue due time while waiting for retry), `approval` evidence (id, status, message, decided_by/at, closed_at, close_reason) and `attempts[]` (attempt_no, status, cause, error, redacted output, provider, model, tokens, started/finished/duration). Frozen dispatch requests and AI request bodies are not exposed. Redaction (`TraceRedactor`): recursive; values of keys whose normalized name contains authorization, secret, token, password, passwd, apikey, cookie, credential, privatekey or signature become `"[REDACTED]"`; the run's webhook secret value is replaced wherever it appears in strings; sensitive query parameters and user-info in URL strings are redacted.
- **Files/components affected:** `RunQueryService.java`, new `TraceRedactor.java`, `RunQueryTest`/new `TraceRedactorTest`, `RunQueryMySqlTest`, `API_DOCUMENTATION.md`.
- **Acceptance criteria:** Every listed field present with correct values for delay/condition/approval/AI(mock)/cap/retry cases; no secret or sensitive header/query value in any response; 6.1 behavior unchanged.
- **Test roadmap:** Unit: redaction of nested keys, arrays, header names case/format variants, non-sensitive keys untouched (e.g. `idempotency_key`, `max_steps`), secret value substring replacement, URLs with `?api_key=`/userinfo. MySQL/HTTP: approval evidence after approve; AI step with canned provider outcome shows attempts, tokens, provider/model and usage totals; http_request step with `Authorization` header and secret query parameter redacted; retry step shows `retry_due_at` and failed attempt error; webhook secret echoed into input by payload is redacted. Full regression afterwards.
- **API documentation changes:** Extend the "Run visibility" section with the new fields, redaction rules and examples.
- **Implemented result:** Implemented `TraceRedactor` and extended `GET /runs/{runId}` additively with workflow_name/entry, redacted input, run AI usage and per-step resolved_input, output, error, idempotency_key, AI repair/tokens, retry_due_at, approval evidence and attempts[]. Frozen dispatch requests and AI request bodies stay hidden. Webhook-secret value redaction applies to secrets of at least 8 characters (documented). 6.1's no-payload assertion was deliberately replaced.
- **Verification results:** Backend final `test bootJar testcontainersTest`: 223 unit + 32 real-MySQL, 0 failed. Frontend: `tsc` clean, `npm test` 57/57, mocked `npx playwright test` 24/24 (72/72 over 3 repeats), live `playwright.live.config.ts` 6/6 against an isolated real stack. 13 document checks pass. Intermediate failures and fixes: `docs/phase6-verification.txt`.
- **Limitations/blockers:** Short webhook secrets (<8 chars) are protected by key rules and snapshot hiding only; key-name rules intentionally over-redact.
- **Next item:** 6.3.

### Task 6.1 — Run list/detail APIs — complete (2026-09-28)

- **Requirement/source:** Fixed `GET /runs/{runId}` (status, `steps[]` with `node_id`/`status`; smoke test V18); flexible run listing required by CAPSTONE_PACK_REVIEW "Additional flows" and CONSOLE U03/U04 (workflow/status filters, stable continuation, no silent trace truncation, no invented totals).
- **What we will do and why:** Add the missing read side of runs so the smoke test, console history and trace can observe runs without the database. `GET /runs` lists newest first (`created_at DESC, run_id DESC`) with optional exact `workflow_id` and `status` filters, `limit` 1–100 (default 25) and an opaque keyset `cursor`; response `{"runs":[...],"next_cursor":...}`. `GET /runs/{runId}` returns the run summary (IDs, status, trigger type, current node, steps executed, `max_steps` from the frozen snapshot, created/started/finished, cancellation request/reason, run error code) plus `steps[]` ordered by sequence with `sequence`, `node_id`, `node_type`, `status`, `wait_reason`, `attempt_count`, `selected_next_node_id`, `resume_at`, timing and `duration_ms`. Because `max_steps` can be up to 2^31−1, steps are paged by `steps_after` (exclusive sequence, default 0) and `steps_limit` (1–500, default 500) with `steps_next_after` (null at end), so traces are never silently truncated. Run and steps are read in one read-only transaction for a consistent view. Scope split: resolved inputs, outputs, attempt records, step errors, AI usage and secret redaction are 6.2; run input and definition snapshot are not exposed in 6.1.
- **Files/components affected:** New `backend/.../api/RunQueryController.java`, `RunQueryService.java` (JdbcTemplate reads using existing indexes `ix_runs_created`, `ix_runs_workflow`, `ix_runs_status`, steps PK); new `RunQueryTest` (unit: cursor codec/parameter validation) and `RunQueryMySqlTest` (real HTTP + MySQL); `API_DOCUMENTATION.md`; this plan. No schema change.
- **Implementation steps:** (1) cursor encode/decode (base64url `epochMicros:runId`, strict); (2) parameter validation with 400 `invalid_input`; (3) list query with keyset predicate and `limit+1` look-ahead; (4) detail query with run row, snapshot `max_steps`, stepped page with look-ahead; (5) controller wiring in API mode; (6) tests; (7) docs.
- **Acceptance criteria:** Both routes require the bearer token (401 otherwise); list filters/pages are server-side, stable across newly inserted runs, with no duplicates/gaps; invalid status/limit/cursor/steps params → 400; unknown run → 404; unknown workflow filter → empty 200; detail always includes `status` and `steps[]` with `node_id`/`status`; steps are complete across pages; no secrets, snapshot or raw input in responses; existing tests keep passing.
- **Test roadmap:** Prereqs: Java 21, Docker for Testcontainers. Unit (`./gradlew test --tests com.relay.api.RunQueryTest`): cursor round-trip incl. Unicode run IDs; malformed/empty/non-base64/negative/non-numeric/missing-separator cursors rejected; limit 0/101/non-numeric rejected, 1/100 accepted; status outside six values rejected; steps_after negative/non-numeric rejected; steps_limit 0/501 rejected. MySQL (`./gradlew testcontainersTest --tests com.relay.api.RunQueryMySqlTest`): (a) no token/wrong token → 401 on both routes; (b) create runs across two workflows and statuses, page with limit 2 and verify order, disjoint complete pages and null final cursor; (c) insert a newer run between pages → no duplicate/gap in continuation; (d) workflow+status filters combined; unknown workflow → `{"runs":[],"next_cursor":null}`; (e) invalid params → 400 envelope; (f) missing run → 404; (g) queued run → `steps: []`, `steps_next_after: null`; (h) executed multi-step run (approval + loop) → ordered steps with node_id/status/branch; steps_limit=1 paging returns every step exactly once; (i) waiting-approval and cancelled runs show wait_reason/cancellation fields; (j) response contains no webhook secret or snapshot/input fields. Full regression: `./gradlew test bootJar testcontainersTest`.
- **API documentation changes:** Add `GET /runs` and `GET /runs/{runId}` sections and route-index rows; update implementation status and the cancel section's "run status reads will be provided by Phase6" note.
- **Implemented result:** `RunQueryService`/`RunQueryController` add authenticated `GET /runs` (newest first; exact `workflow_id`/`status` filters; `limit` 1–100; opaque base64url keyset cursor; `{runs,next_cursor}`) and `GET /runs/{runId}` (run summary, snapshot `max_steps`, `error {code,node_id}`, cancellation fields, ordered `steps[]` paged by `steps_after`/`steps_limit` ≤500 with `steps_next_after`). Unknown/repeated params and bad values → 400; missing run → 404; empty values mean unset. Run and steps are read in one read-only transaction. Deviation from the first draft: `attempt_count` means prepared handler invocations (≥1 for every executed node), not "0 for nodes that never dispatch"; corrected after a test disproved it. Four doc-consistency scripts re-pinned to the new API status sentence.
- **Verification results:** Final `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar testcontainersTest` passed: 219 unit (incl. 12 RunQueryTest) and 31 real-MySQL (incl. 3 RunQueryMySqlTest), none skipped/failed. 13 document checks exit 0. Intermediate failures (offline cache command, test compile error, wrong attempt_count doc claim) and fixes are in `docs/phase6-verification.txt`.
- **How to test:** Start MySQL, API and worker per `docs/SETUP.md`; trigger `wf_runaway`, then `curl -H "Authorization: Bearer $RELAY_DEMO_TOKEN" http://localhost:8080/runs` and `.../runs/$RUN_ID` as in `API_DOCUMENTATION.md` "Run visibility — task6.1". Expected: newest-first list; detail ending `failed` with `error.code` `max_steps`. Or rerun the commands above.
- **Limitations/blockers:** Trace payload fields/redaction are 6.2; supplied smoke test runs in 7.1; console screens are 6.3+.
- **Next item:** 6.2.

### Task 5.1 — Approval wait — complete (2026-09-28)

- **Requirement/source:** B05; approval catalog; PDF/pack and existing architecture/recovery/semantics.
- **Intended behavior/planned changes:** Persist rendered pending approval, waiting step/run and inactive job atomically; crash/restart leaves exactly one request.
- **Components/files:** EngineStore/worker, approval/cancellation services/controllers, AI provider/transport/schema components; relevant unit/Testcontainers tests; API/setup/evidence documentation. Existing Java/Spring/JPA/MySQL/Gradle stack and schema retained where sufficient.
- **Acceptance/test roadmap:** Java21, Docker and Python3 prerequisites; define controlled inputs/states above and assert success/failure/edge/race/rollback/restart outcomes. Real MySQL for atomic state, mock/canned provider for malformed/schema/usage/error/timeout cases, real supplied mock for protocol proof. Run Gradle test/testcontainersTest and13 consistency checks; exact results recorded in Phase5 evidence. Missing live credentials must be reported, never counted as a passing live test.
- **API documentation:** Update approval list/approve/reject/cancel routes with auth, inputs, response/errors, conflicts and asynchronous settlement; provider integration is worker-only with no new public route.
- **Results:** Approval preparation atomically saves one pending request, rendered message, waiting step/run and inactive job; restart does not duplicate it or occupy a worker.
- **Verification:** Final Gradle `test bootJar testcontainersTest` passed204 unit and27 real-MySQL cases, no failures/errors/skips;3 configuration-helper tests and13 document checks passed. Exact commands, initial failures/corrections and live-provider limitation: `docs/phase5-verification.txt`.
- **How to test:** Rebuild/restart API and worker using `docs/SETUP.md`; use approval/cancel examples in `API_DOCUMENTATION.md`, or rerun the exact automated commands in the evidence file. Frontend data screens remain Phase6.
- **Next item:** 5.2.

### Task 5.2 — Decision APIs — complete (2026-09-28)

- **Requirement/source:** fixed GET approvals and POST approve; reject contract; PDF/pack and existing architecture/recovery/semantics.
- **Intended behavior/planned changes:** Bearer authenticated listing/status validation and bodyless decisions;404 missing,409 duplicate/conflict; actor from authentication.
- **Components/files:** EngineStore/worker, approval/cancellation services/controllers, AI provider/transport/schema components; relevant unit/Testcontainers tests; API/setup/evidence documentation. Existing Java/Spring/JPA/MySQL/Gradle stack and schema retained where sufficient.
- **Acceptance/test roadmap:** Java21, Docker and Python3 prerequisites; define controlled inputs/states above and assert success/failure/edge/race/rollback/restart outcomes. Real MySQL for atomic state, mock/canned provider for malformed/schema/usage/error/timeout cases, real supplied mock for protocol proof. Run Gradle test/testcontainersTest and13 consistency checks; exact results recorded in Phase5 evidence. Missing live credentials must be reported, never counted as a passing live test.
- **API documentation:** Update approval list/approve/reject/cancel routes with auth, inputs, response/errors, conflicts and asynchronous settlement; provider integration is worker-only with no new public route.
- **Results:** GET approvals and bodyless approve/reject routes require bearer auth, validate status/input, return404 missing and409 duplicate/conflict, and use authenticated demo-operator evidence.
- **Verification:** Final Gradle `test bootJar testcontainersTest` passed204 unit and27 real-MySQL cases, no failures/errors/skips;3 configuration-helper tests and13 document checks passed. Exact commands, initial failures/corrections and live-provider limitation: `docs/phase5-verification.txt`.
- **How to test:** Rebuild/restart API and worker using `docs/SETUP.md`; use approval/cancel examples in `API_DOCUMENTATION.md`, or rerun the exact automated commands in the evidence file. Frontend data screens remain Phase6.
- **Next item:** 5.3.

### Task 5.3 — Atomic decisions — complete (2026-09-28)

- **Requirement/source:** B06 and STATE_TRANSITIONS; PDF/pack and existing architecture/recovery/semantics.
- **Intended behavior/planned changes:** Run-first decision locks; approval/step/result/continuation commit together; reject records successful human-decision step and cancels run; rollback and races.
- **Components/files:** EngineStore/worker, approval/cancellation services/controllers, AI provider/transport/schema components; relevant unit/Testcontainers tests; API/setup/evidence documentation. Existing Java/Spring/JPA/MySQL/Gradle stack and schema retained where sufficient.
- **Acceptance/test roadmap:** Java21, Docker and Python3 prerequisites; define controlled inputs/states above and assert success/failure/edge/race/rollback/restart outcomes. Real MySQL for atomic state, mock/canned provider for malformed/schema/usage/error/timeout cases, real supplied mock for protocol proof. Run Gradle test/testcontainersTest and13 consistency checks; exact results recorded in Phase5 evidence. Missing live credentials must be reported, never counted as a passing live test.
- **API documentation:** Update approval list/approve/reject/cancel routes with auth, inputs, response/errors, conflicts and asynchronous settlement; provider integration is worker-only with no new public route.
- **Results:** Decision, step outcome and resumed/final run/job state commit together. Injected DB failure rolls back; concurrent decision/cancel serializes. Rejection succeeds as a human-decision step and cancels the run.
- **Verification:** Final Gradle `test bootJar testcontainersTest` passed204 unit and27 real-MySQL cases, no failures/errors/skips;3 configuration-helper tests and13 document checks passed. Exact commands, initial failures/corrections and live-provider limitation: `docs/phase5-verification.txt`.
- **How to test:** Rebuild/restart API and worker using `docs/SETUP.md`; use approval/cancel examples in `API_DOCUMENTATION.md`, or rerun the exact automated commands in the evidence file. Frontend data screens remain Phase6.
- **Next item:** 5.4.

### Task 5.4 — Approval gate — complete (2026-09-28)

- **Requirement/source:** catalog requires_approval; PDF/pack and existing architecture/recovery/semantics.
- **Intended behavior/planned changes:** Every sensitive attempt requires approved human evidence at an earlier same-run sequence; wrong-run/pending/rejected/later/forged evidence rejected.
- **Components/files:** EngineStore/worker, approval/cancellation services/controllers, AI provider/transport/schema components; relevant unit/Testcontainers tests; API/setup/evidence documentation. Existing Java/Spring/JPA/MySQL/Gradle stack and schema retained where sufficient.
- **Acceptance/test roadmap:** Java21, Docker and Python3 prerequisites; define controlled inputs/states above and assert success/failure/edge/race/rollback/restart outcomes. Real MySQL for atomic state, mock/canned provider for malformed/schema/usage/error/timeout cases, real supplied mock for protocol proof. Run Gradle test/testcontainersTest and13 consistency checks; exact results recorded in Phase5 evidence. Missing live credentials must be reported, never counted as a passing live test.
- **API documentation:** Update approval list/approve/reject/cancel routes with auth, inputs, response/errors, conflicts and asynchronous settlement; provider integration is worker-only with no new public route.
- **Results:** Every order-action attempt rechecks earlier same-run approved evidence. Wrong-run, pending, rejected, closed, same/future sequence and forged AI evidence are rejected; new approval visits still wait.
- **Verification:** Final Gradle `test bootJar testcontainersTest` passed204 unit and27 real-MySQL cases, no failures/errors/skips;3 configuration-helper tests and13 document checks passed. Exact commands, initial failures/corrections and live-provider limitation: `docs/phase5-verification.txt`.
- **How to test:** Rebuild/restart API and worker using `docs/SETUP.md`; use approval/cancel examples in `API_DOCUMENTATION.md`, or rerun the exact automated commands in the evidence file. Frontend data screens remain Phase6.
- **Next item:** 5.5.

### Task 5.5 — Provider interface/mock — complete (2026-09-28)

- **Requirement/source:** supplied mock_provider.py; PDF/pack and existing architecture/recovery/semantics.
- **Intended behavior/planned changes:** Typed provider interface, OpenAI-compatible mock transport, no hidden retries, timeout/error classification; canned responses only in tests. Classify both the outer deadline and wrapped JDK HTTP timeout as http_timeout; the actual slow mock is the regression test.
- **Components/files:** EngineStore/worker, approval/cancellation services/controllers, AI provider/transport/schema components; relevant unit/Testcontainers tests; API/setup/evidence documentation. Existing Java/Spring/JPA/MySQL/Gradle stack and schema retained where sufficient.
- **Acceptance/test roadmap:** Java21, Docker and Python3 prerequisites; define controlled inputs/states above and assert success/failure/edge/race/rollback/restart outcomes. Real MySQL for atomic state, mock/canned provider for malformed/schema/usage/error/timeout cases, real supplied mock for protocol proof. Run Gradle test/testcontainersTest and13 consistency checks; exact results recorded in Phase5 evidence. Missing live credentials must be reported, never counted as a passing live test.
- **API documentation:** Update approval list/approve/reject/cancel routes with auth, inputs, response/errors, conflicts and asynchronous settlement; provider integration is worker-only with no new public route.
- **Results:** AiProvider interface and unchanged supplied mock over real HTTP verified; mock prose fails after one repair.503/429, Retry-After, bounded timeout and usage behavior tested.
- **Verification:** Final Gradle `test bootJar testcontainersTest` passed204 unit and27 real-MySQL cases, no failures/errors/skips;3 configuration-helper tests and13 document checks passed. Exact commands, initial failures/corrections and live-provider limitation: `docs/phase5-verification.txt`.
- **How to test:** Rebuild/restart API and worker using `docs/SETUP.md`; use approval/cancel examples in `API_DOCUMENTATION.md`, or rerun the exact automated commands in the evidence file. Frontend data screens remain Phase6.
- **Next item:** 5.6.

### Task 5.6 — Prompt isolation — complete (2026-09-28)

- **Requirement/source:** PDF injection invariant and seed prompt; PDF/pack and existing architecture/recovery/semantics.
- **Intended behavior/planned changes:** Frozen prompt/schema/provider/model request; fixed system instructions separate untrusted rendered prompt; no tools/dynamic workflow control; never parse substituted content as instructions.
- **Components/files:** EngineStore/worker, approval/cancellation services/controllers, AI provider/transport/schema components; relevant unit/Testcontainers tests; API/setup/evidence documentation. Existing Java/Spring/JPA/MySQL/Gradle stack and schema retained where sufficient.
- **Acceptance/test roadmap:** Java21, Docker and Python3 prerequisites; define controlled inputs/states above and assert success/failure/edge/race/rollback/restart outcomes. Real MySQL for atomic state, mock/canned provider for malformed/schema/usage/error/timeout cases, real supplied mock for protocol proof. Run Gradle test/testcontainersTest and13 consistency checks; exact results recorded in Phase5 evidence. Missing live credentials must be reported, never counted as a passing live test.
- **API documentation:** Update approval list/approve/reject/cancel routes with auth, inputs, response/errors, conflicts and asynchronous settlement; provider integration is worker-only with no new public route.
- **Results:** Fixed provider instructions/schema separate rendered untrusted input; no tools or model-controlled approval/graph mutation. Requests freeze provider/model/prompt and exclude runtime credentials.
- **Verification:** Final Gradle `test bootJar testcontainersTest` passed204 unit and27 real-MySQL cases, no failures/errors/skips;3 configuration-helper tests and13 document checks passed. Exact commands, initial failures/corrections and live-provider limitation: `docs/phase5-verification.txt`.
- **How to test:** Rebuild/restart API and worker using `docs/SETUP.md`; use approval/cancel examples in `API_DOCUMENTATION.md`, or rerun the exact automated commands in the evidence file. Frontend data screens remain Phase6.
- **Next item:** 5.7.

### Task 5.7 — Schema enforcement — complete (2026-09-28)

- **Requirement/source:** Draft2020-12 and RECOVERY repair budget; PDF/pack and existing architecture/recovery/semantics.
- **Intended behavior/planned changes:** Strict output JSON/schema validation before success; one persisted repair request/feedback; transport and repair budgets separate; restart/retries preserve repair prompt.
- **Components/files:** EngineStore/worker, approval/cancellation services/controllers, AI provider/transport/schema components; relevant unit/Testcontainers tests; API/setup/evidence documentation. Existing Java/Spring/JPA/MySQL/Gradle stack and schema retained where sufficient.
- **Acceptance/test roadmap:** Java21, Docker and Python3 prerequisites; define controlled inputs/states above and assert success/failure/edge/race/rollback/restart outcomes. Real MySQL for atomic state, mock/canned provider for malformed/schema/usage/error/timeout cases, real supplied mock for protocol proof. Run Gradle test/testcontainersTest and13 consistency checks; exact results recorded in Phase5 evidence. Missing live credentials must be reported, never counted as a passing live test.
- **API documentation:** Update approval list/approve/reject/cancel routes with auth, inputs, response/errors, conflicts and asynchronous settlement; provider integration is worker-only with no new public route.
- **Results:** Strict JSON and local Draft2020-12 schema checks precede success/downstream use. One persisted repair survives restart/crash; shared transport budget limits default total4 invocations.300/301 summary boundary and malformed JSON checks pass.
- **Verification:** Final Gradle `test bootJar testcontainersTest` passed204 unit and27 real-MySQL cases, no failures/errors/skips;3 configuration-helper tests and13 document checks passed. Exact commands, initial failures/corrections and live-provider limitation: `docs/phase5-verification.txt`.
- **How to test:** Rebuild/restart API and worker using `docs/SETUP.md`; use approval/cancel examples in `API_DOCUMENTATION.md`, or rerun the exact automated commands in the evidence file. Frontend data screens remain Phase6.
- **Next item:** 5.8.

### Task 5.8 — Usage/metadata — complete (2026-09-28)

- **Requirement/source:** DATA_MODEL attempt/step/run usage; PDF/pack and existing architecture/recovery/semantics.
- **Intended behavior/planned changes:** Persist provider/model and duration per attempt; aggregate known prompt/completion usage exactly once; missing/uncertain or unrepresentable aggregate usage remains explicitly incomplete (never overflow a transaction). Test extreme provider counters as a regression.
- **Components/files:** EngineStore/worker, approval/cancellation services/controllers, AI provider/transport/schema components; relevant unit/Testcontainers tests; API/setup/evidence documentation. Existing Java/Spring/JPA/MySQL/Gradle stack and schema retained where sufficient.
- **Acceptance/test roadmap:** Java21, Docker and Python3 prerequisites; define controlled inputs/states above and assert success/failure/edge/race/rollback/restart outcomes. Real MySQL for atomic state, mock/canned provider for malformed/schema/usage/error/timeout cases, real supplied mock for protocol proof. Run Gradle test/testcontainersTest and13 consistency checks; exact results recorded in Phase5 evidence. Missing live credentials must be reported, never counted as a passing live test.
- **API documentation:** Update approval list/approve/reject/cancel routes with auth, inputs, response/errors, conflicts and asynchronous settlement; provider integration is worker-only with no new public route.
- **Results:** Attempt provider/model/timestamps/duration and known token counters persist once. Invalid-output attempts count; duplicate callbacks do not. Missing/uncertain/overflow aggregates remain incomplete without crashing the outcome transaction.
- **Verification:** Final Gradle `test bootJar testcontainersTest` passed204 unit and27 real-MySQL cases, no failures/errors/skips;3 configuration-helper tests and13 document checks passed. Exact commands, initial failures/corrections and live-provider limitation: `docs/phase5-verification.txt`.
- **How to test:** Rebuild/restart API and worker using `docs/SETUP.md`; use approval/cancel examples in `API_DOCUMENTATION.md`, or rerun the exact automated commands in the evidence file. Frontend data screens remain Phase6.
- **Next item:** 5.9.

### Task 5.9 — Real provider — complete (2026-09-28)

- **Requirement/source:** task5.9; user-authorized OpenRouter amendment, official OpenRouter chat API and existing OpenAI Responses adapter; PDF/pack and existing architecture/recovery/semantics.
- **Intended behavior/planned changes:** OpenAI adapter with server-only key, explicit model, HTTPS pinned provider origin, bounded timeout, no tools, store=false; deterministic protocol tests plus opt-in live verification if credentials available.
- **Fix plan (2026-09-28):** Confirmed diagnostic bug: OpenAI billing429 is collapsed into retryable http_429. Inspect only bounded JSON error code/type for AI/OpenAI429; map allowlisted credit/spend/quota causes to fixed nonretryable ai_* codes, retaining temporary/unknown429 retry/backoff. Never persist/log provider messages or arbitrary codes. Improve live-test failure guidance, API/setup docs and evidence. Files: HttpTransport, HttpTransportTest, HumanAiMySqlTest, ProviderLiveAiTest, build.gradle (show the safe live assertion message) and documentation. Tests before completion: loopback HTTP cases for exhausted credits, quota fallback, spend limits, temporary/unknown/malformed429, non-AI/mocked-provider isolation and secret-message exclusion; real MySQL verifies billing failure schedules no retry. Run Gradle unit/targeted MySQL checks and one explicit live check to verify the improved diagnosis. Successful live generation remains required for5.9 completion.
- **OpenRouter amendment (user authorized2026-09-28):** Add `openrouter` real-provider mode using fixed HTTPS `https://openrouter.ai/api/v1/chat/completions`, bearer authentication and explicit prefixed model. Reuse bounded transport, strict schema/one repair, usage and frozen-request safeguards; no arbitrary base URL or automatic model substitution. Preserve direct OpenAI/mock modes; reject recognizable cross-provider key mismatches before network dispatch. User's private file now contains an OpenRouter-format key and gpt-5-mini; migrate mode/model to openrouter/openai/gpt-5-mini without printing or duplicating key. Update helper/loader/live probe, API/setup/evidence docs. Prerequisites: local key, Java21, Docker for integration. Tests: request origin/headers/prompt isolation, model prefix, key mismatch, decode success/usage/refusal/tool/error, repair and deployment switch; config roundtrip/validation; real HTTP402 vs429 behavior; unit and existing HumanAiMySqlTest regressions; explicit live schema/usage probe with private OpenRouter config. Mark5.9 complete only on successful live inference. Source: official OpenRouter chat completion and error docs; screenshot is context, user confirmation authorizes this amendment.
- **Components/files:** EngineStore/worker, approval/cancellation services/controllers, AI provider/transport/schema components; relevant unit/Testcontainers tests; API/setup/evidence documentation. Existing Java/Spring/JPA/MySQL/Gradle stack and schema retained where sufficient.
- **Acceptance/test roadmap:** Java21, Docker and Python3 prerequisites; define controlled inputs/states above and assert success/failure/edge/race/rollback/restart outcomes. Real MySQL for atomic state, mock/canned provider for malformed/schema/usage/error/timeout cases, real supplied mock for protocol proof. Run Gradle test/testcontainersTest and13 consistency checks; exact results recorded in Phase5 evidence. Missing live credentials must be reported, never counted as a passing live test.
- **API documentation:** Update approval list/approve/reject/cancel routes with auth, inputs, response/errors, conflicts and asynchronous settlement; provider integration is worker-only with no new public route.
- **Initial OpenAI results (historical):** OpenAI Responses adapter and local protocol/schema/timeout tests implemented. User configuration moved from the example into ignored0600 `backend/.env.ai`, with example placeholders restored. Live probe executed and failed http_429; same-key GET models200 confirms configured gpt-5.6-terra is listed. Safe provider diagnostic: insufficient_quota / credit_balance_exhausted. No successful live output; item remains incomplete.
- **Outstanding verification:** None for5.9. Live OpenRouter check passed; earlier direct-OpenAI credit failures do not block the user-selected provider.
- **Latest retry (2026-09-28):** User requested the next task; ran `python3 scripts/verify_live_ai.py` again. Gradle liveAiTest failed in5s:1 test,1 failure,0 errors/skips; safe error http_429. No successful output. Previous diagnostic identified credit_balance_exhausted; this retry confirms HTTP429 persists but does not separately reclassify the provider error body. No application/API changes.
- **Repeated next-task retry (2026-09-28):** Explicit user request triggered another live probe; same result:1 failed test, http_429,5s. Successful live verification still outstanding. Further retries should await a credit/configuration change; user may explicitly defer5.9 to proceed with independent6.1.
- **Fix results (2026-09-28):** Corrected permanent OpenAI billing429 classification and safe live-test guidance.205 unit tests and14 targeted HumanAiMySqlTest cases pass, zero failures/errors/skips. One live probe confirms `ai_credit_balance_exhausted` (1 failed test,6s); the current account still needs API credits. Error handling is fixed; successful generation and5.9 completion remain blocked externally. No keys/messages exposed and no billing changes made. Evidence: `docs/phase5-verification.txt`.
- **Final results:** OpenRouter fixed-origin adapter, credential/model guards and safe protocol/error handling implemented. Private configuration uses openrouter/openai/gpt-5-mini with the supplied key, kept owner-only and unprinted. Live production-adapter test passed1/1 (schema-valid JSON and usage);207 unit tests,14 targeted real-MySQL cases and4 configuration-helper tests passed. API/setup documentation updated; exact commands in `docs/phase5-verification.txt`.
- **How to test:** Run `python3 scripts/verify_live_ai.py` from the root for the explicit synthetic real-provider check. Rebuild/restart your single worker with `backend/.env.ai` loaded alongside its normal DB configuration to use OpenRouter for new workflows. No running user process or database was changed. Frozen requests from the old provider are not redirected.
- **Next item:** 6.1 — run list/detail and trace APIs.

### Task 5.10 — Safety/injection tests — complete (2026-09-28)

- **Requirement/source:** task5.10 D01 clarified by user2026-09-28; PDF/pack and existing architecture/recovery/semantics.
- **Intended behavior/planned changes:** Keep original graph: refund_request pauses, complaint/question notify; never force branch. Test both supplied injections with controlled classifications, bypass attempts, malformed AI, repeated decisions/provider failures.
- **Components/files:** EngineStore/worker, approval/cancellation services/controllers, AI provider/transport/schema components; relevant unit/Testcontainers tests; API/setup/evidence documentation. Existing Java/Spring/JPA/MySQL/Gradle stack and schema retained where sufficient.
- **Acceptance/test roadmap:** Java21, Docker and Python3 prerequisites; define controlled inputs/states above and assert success/failure/edge/race/rollback/restart outcomes. Real MySQL for atomic state, mock/canned provider for malformed/schema/usage/error/timeout cases, real supplied mock for protocol proof. Run Gradle test/testcontainersTest and13 consistency checks; exact results recorded in Phase5 evidence. Missing live credentials must be reported, never counted as a passing live test.
- **API documentation:** Update approval list/approve/reject/cancel routes with auth, inputs, response/errors, conflicts and asynchronous settlement; provider integration is worker-only with no new public route.
- **Results:** Both original injection payloads tested across refund/complaint/question branches; exact2 fixture coverage asserted. User D01 resolution preserves graph; all unapproved sensitive dispatch attempts remain blocked.
- **Verification:** Final Gradle `test bootJar testcontainersTest` passed204 unit and27 real-MySQL cases, no failures/errors/skips;3 configuration-helper tests and13 document checks passed. Exact commands, initial failures/corrections and live-provider limitation: `docs/phase5-verification.txt`.
- **How to test:** Rebuild/restart API and worker using `docs/SETUP.md`; use approval/cancel examples in `API_DOCUMENTATION.md`, or rerun the exact automated commands in the evidence file. Frontend data screens remain Phase6.
- **Next item:** 5.11.

### Task 5.11 — Cancellation — complete (2026-09-28)

- **Requirement/source:** fixed API cancel and B06/C08; PDF/pack and existing architecture/recovery/semantics.
- **Intended behavior/planned changes:** Queued immediate cancellation; ready delay/backoff/approval closure; cooperative active attempt settlement preserving known outcome; no repair/retry/successor after cancel; terminal409 and decision/cancel races.
- **Components/files:** EngineStore/worker, approval/cancellation services/controllers, AI provider/transport/schema components; relevant unit/Testcontainers tests; API/setup/evidence documentation. Existing Java/Spring/JPA/MySQL/Gradle stack and schema retained where sufficient.
- **Acceptance/test roadmap:** Java21, Docker and Python3 prerequisites; define controlled inputs/states above and assert success/failure/edge/race/rollback/restart outcomes. Real MySQL for atomic state, mock/canned provider for malformed/schema/usage/error/timeout cases, real supplied mock for protocol proof. Run Gradle test/testcontainersTest and13 consistency checks; exact results recorded in Phase5 evidence. Missing live credentials must be reported, never counted as a passing live test.
- **API documentation:** Update approval list/approve/reject/cancel routes with auth, inputs, response/errors, conflicts and asynchronous settlement; provider integration is worker-only with no new public route.
- **Results:** Queued/delay/backoff/waiting cancellation stops new work, closes pending approval without forged decision, and conflicts at terminal states. Active cancellation preserves known outcome, stops repair/retry/successor, and recovery cancels uncertain attempts without resend.
- **Verification:** Final Gradle `test bootJar testcontainersTest` passed204 unit and27 real-MySQL cases, no failures/errors/skips;3 configuration-helper tests and13 document checks passed. Exact commands, initial failures/corrections and live-provider limitation: `docs/phase5-verification.txt`.
- **How to test:** Rebuild/restart API and worker using `docs/SETUP.md`; use approval/cancel examples in `API_DOCUMENTATION.md`, or rerun the exact automated commands in the evidence file. Frontend data screens remain Phase6.
- **Next item:** 6.1.


### Task 4.1 — Triggers — complete (2026-09-28)

- **Requirement/source:** PDF durable execution and pack contracts; API_CONTRACT fixed trigger/hook routes.
- **Intended behavior/planned changes:** Authenticated manual object input; webhook JSON with exact single secret;202 after commit; invalid/auth/missing/draft/media/size cases create nothing.
- **Components:** TriggerController/AcceptanceService/security; Gradle tests, API/setup/verification docs. Engine SQL uses the existing MySQL schema and Spring transaction manager alongside JPA; explicit guarded updates make lease fencing reviewable. No broker or additional product features.
- **Acceptance criteria/test roadmap:** Java21/Docker prerequisites. Automated tests use the inputs/actions above and assert those outcomes, including rollback/failure boundaries. Unit tests for pure policy/handlers and Testcontainers for actual transactions/recovery; controlled local mock HTTP and supplied mock world for effects. Exact commands and actual results recorded after execution.
- **API documentation:** 4.1/4.2 add POST manual/hook request/auth/response/error/duplicate/asynchronous contracts; remaining tasks document execution effects without adding Phase6 routes.
- **Implemented result/files:** TriggerController, AcceptanceService, API security/error reference. Manual bearer authentication, exact input wrapper, webhook single-secret checks and202 acceptance. Strict UTF-8/JSON/size limits; missing/draft/type/rotated-secret failures verified through HTTP.
- **Verification/results:** Full offline Gradle test/testcontainersTest passed198 unit tests and14 MySQL integration tests with no failures/errors/skips. Final targeted Phase4 rerun passed9 integration cases after additional trigger/action coverage. All13 document consistency commands passed. Exact commands, initial fixture failures/corrections and cleanup: `docs/phase4-verification.txt`.
- **User verification/expected result:** From backend run `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar testcontainersTest` with Docker/Python3 available; tests pass and disposable resources are removed. API/worker startup and202 trigger examples are in setup/API docs.
- **Limitations:** One active worker; replay protection depends on receiver idempotency. Phase5 human/AI/cancellation behavior and Phase6 run-read/console routes remain pending; no new UI or real-provider credential required.
- **Next item:** 4.2.

### Task 4.2 — Atomic acceptance — complete (2026-09-28)

- **Requirement/source:** PDF durable execution and pack contracts; RECOVERY B01.
- **Intended behavior/planned changes:** Run snapshot,input,validated policy and initial job commit together; forced queue failure rolls back; duplicates create distinct runs.
- **Components:** AcceptanceService/QueueJob/ExecutionPolicy; Gradle tests, API/setup/verification docs. Engine SQL uses the existing MySQL schema and Spring transaction manager alongside JPA; explicit guarded updates make lease fencing reviewable. No broker or additional product features.
- **Acceptance criteria/test roadmap:** Java21/Docker prerequisites. Automated tests use the inputs/actions above and assert those outcomes, including rollback/failure boundaries. Unit tests for pure policy/handlers and Testcontainers for actual transactions/recovery; controlled local mock HTTP and supplied mock world for effects. Exact commands and actual results recorded after execution.
- **API documentation:** 4.1/4.2 add POST manual/hook request/auth/response/error/duplicate/asynchronous contracts; remaining tasks document execution effects without adding Phase6 routes.
- **Implemented result/files:** AcceptanceService, QueueJob.initial, ExecutionPolicy. JPA transaction saves immutable run/input/policy and initial intent together. Real database failure injected on queue insertion proves rollback; duplicate requests produce separate runs.
- **Verification/results:** Full offline Gradle test/testcontainersTest passed198 unit tests and14 MySQL integration tests with no failures/errors/skips. Final targeted Phase4 rerun passed9 integration cases after additional trigger/action coverage. All13 document consistency commands passed. Exact commands, initial fixture failures/corrections and cleanup: `docs/phase4-verification.txt`.
- **User verification/expected result:** From backend run `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar testcontainersTest` with Docker/Python3 available; tests pass and disposable resources are removed. API/worker startup and202 trigger examples are in setup/API docs.
- **Limitations:** One active worker; replay protection depends on receiver idempotency. Phase5 human/AI/cancellation behavior and Phase6 run-read/console routes remain pending; no new UI or real-provider credential required.
- **Next item:** 4.3.

### Task 4.3 — Ownership — complete (2026-09-28)

- **Requirement/source:** PDF durable execution and pack contracts; RECOVERY B02/B07 and indexed scans.
- **Intended behavior/planned changes:** Run then job locks; database time; process UUID/generation; expiry/renew guards; invalid policy never dispatches; EXPLAIN uses due/expiry indexes.
- **Components:** EngineStore/WorkerLifecycle; Gradle tests, API/setup/verification docs. Engine SQL uses the existing MySQL schema and Spring transaction manager alongside JPA; explicit guarded updates make lease fencing reviewable. No broker or additional product features.
- **Acceptance criteria/test roadmap:** Java21/Docker prerequisites. Automated tests use the inputs/actions above and assert those outcomes, including rollback/failure boundaries. Unit tests for pure policy/handlers and Testcontainers for actual transactions/recovery; controlled local mock HTTP and supplied mock world for effects. Exact commands and actual results recorded after execution.
- **API documentation:** 4.1/4.2 add POST manual/hook request/auth/response/error/duplicate/asynchronous contracts; remaining tasks document execution effects without adding Phase6 routes.
- **Implemented result/files:** EngineStore, WorkerLifecycle. Indexed ready/expired scans; run-first locks; unique worker owner, generation and sequence fences; database-clock expiry and separate heartbeat. EXPLAIN selects due/expiry indexes; invalid policy blocks that job without starving others.
- **Verification/results:** Full offline Gradle test/testcontainersTest passed198 unit tests and14 MySQL integration tests with no failures/errors/skips. Final targeted Phase4 rerun passed9 integration cases after additional trigger/action coverage. All13 document consistency commands passed. Exact commands, initial fixture failures/corrections and cleanup: `docs/phase4-verification.txt`.
- **User verification/expected result:** From backend run `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar testcontainersTest` with Docker/Python3 available; tests pass and disposable resources are removed. API/worker startup and202 trigger examples are in setup/API docs.
- **Limitations:** One active worker; replay protection depends on receiver idempotency. Phase5 human/AI/cancellation behavior and Phase6 run-read/console routes remain pending; no new UI or real-provider credential required.
- **Next item:** 4.4.

### Task 4.4 — Execution loop — complete (2026-09-28)

- **Requirement/source:** PDF durable execution and pack contracts; WORKFLOW_SEMANTICS graph/sequence.
- **Intended behavior/planned changes:** Entry and snapshot drive sequential execution; each visit has one step and separate attempts; unsupported Phase5 nodes fail explicitly.
- **Components:** EngineStore/WorkerLifecycle; Gradle tests, API/setup/verification docs. Engine SQL uses the existing MySQL schema and Spring transaction manager alongside JPA; explicit guarded updates make lease fencing reviewable. No broker or additional product features.
- **Acceptance criteria/test roadmap:** Java21/Docker prerequisites. Automated tests use the inputs/actions above and assert those outcomes, including rollback/failure boundaries. Unit tests for pure policy/handlers and Testcontainers for actual transactions/recovery; controlled local mock HTTP and supplied mock world for effects. Exact commands and actual results recorded after execution.
- **API documentation:** 4.1/4.2 add POST manual/hook request/auth/response/error/duplicate/asynchronous contracts; remaining tasks document execution effects without adding Phase6 routes.
- **Implemented result/files:** EngineStore, WorkerLifecycle, step/attempt SQL mappings. Sequential snapshot-driven entry/edge execution. Numbered visits separate from attempts; restart reuses pending visit and budget. Phase5 AI/approval nodes fail explicitly for now.
- **Verification/results:** Full offline Gradle test/testcontainersTest passed198 unit tests and14 MySQL integration tests with no failures/errors/skips. Final targeted Phase4 rerun passed9 integration cases after additional trigger/action coverage. All13 document consistency commands passed. Exact commands, initial fixture failures/corrections and cleanup: `docs/phase4-verification.txt`.
- **User verification/expected result:** From backend run `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar testcontainersTest` with Docker/Python3 available; tests pass and disposable resources are removed. API/worker startup and202 trigger examples are in setup/API docs.
- **Limitations:** One active worker; replay protection depends on receiver idempotency. Phase5 human/AI/cancellation behavior and Phase6 run-read/console routes remain pending; no new UI or real-provider credential required.
- **Next item:** 4.5.

### Task 4.5 — Atomic outcome — complete (2026-09-28)

- **Requirement/source:** PDF durable execution and pack contracts; RECOVERY B04/fences.
- **Intended behavior/planned changes:** Attempt result,step,next cursor/job commit together; stale generation/expired owner/duplicate completion cannot advance.
- **Components:** EngineStore; Gradle tests, API/setup/verification docs. Engine SQL uses the existing MySQL schema and Spring transaction manager alongside JPA; explicit guarded updates make lease fencing reviewable. No broker or additional product features.
- **Acceptance criteria/test roadmap:** Java21/Docker prerequisites. Automated tests use the inputs/actions above and assert those outcomes, including rollback/failure boundaries. Unit tests for pure policy/handlers and Testcontainers for actual transactions/recovery; controlled local mock HTTP and supplied mock world for effects. Exact commands and actual results recorded after execution.
- **API documentation:** 4.1/4.2 add POST manual/hook request/auth/response/error/duplicate/asynchronous contracts; remaining tasks document execution effects without adding Phase6 routes.
- **Implemented result/files:** EngineStore outcome/fence transactions. Attempt/step/run/job result and continuation commit together. Injected outcome failure rolls them all back; expired, old-generation and duplicate results cannot advance.
- **Verification/results:** Full offline Gradle test/testcontainersTest passed198 unit tests and14 MySQL integration tests with no failures/errors/skips. Final targeted Phase4 rerun passed9 integration cases after additional trigger/action coverage. All13 document consistency commands passed. Exact commands, initial fixture failures/corrections and cleanup: `docs/phase4-verification.txt`.
- **User verification/expected result:** From backend run `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar testcontainersTest` with Docker/Python3 available; tests pass and disposable resources are removed. API/worker startup and202 trigger examples are in setup/API docs.
- **Limitations:** One active worker; replay protection depends on receiver idempotency. Phase5 human/AI/cancellation behavior and Phase6 run-read/console routes remain pending; no new UI or real-provider credential required.
- **Next item:** 4.6.

### Task 4.6 — Templates — complete (2026-09-28)

- **Requirement/source:** PDF durable execution and pack contracts; WORKFLOW_SEMANTICS templates W04/W05.
- **Intended behavior/planned changes:** Only catalog fields; exact string/canonical JSON conversion; latest earlier success; missing paths/array traversal fail; no second evaluation.
- **Components:** TemplateResolver; Gradle tests, API/setup/verification docs. Engine SQL uses the existing MySQL schema and Spring transaction manager alongside JPA; explicit guarded updates make lease fencing reviewable. No broker or additional product features.
- **Acceptance criteria/test roadmap:** Java21/Docker prerequisites. Automated tests use the inputs/actions above and assert those outcomes, including rollback/failure boundaries. Unit tests for pure policy/handlers and Testcontainers for actual transactions/recovery; controlled local mock HTTP and supplied mock world for effects. Exact commands and actual results recorded after execution.
- **API documentation:** 4.1/4.2 add POST manual/hook request/auth/response/error/duplicate/asynchronous contracts; remaining tasks document execution effects without adding Phase6 routes.
- **Implemented result/files:** TemplateResolver, EngineJson. Catalog-templatable fields only; string substitution, sorted compact JSON/exact decimals and bounded expansion. Missing/traversal/output failures; latest earlier successful loop visit; no second evaluation.
- **Verification/results:** Full offline Gradle test/testcontainersTest passed198 unit tests and14 MySQL integration tests with no failures/errors/skips. Final targeted Phase4 rerun passed9 integration cases after additional trigger/action coverage. All13 document consistency commands passed. Exact commands, initial fixture failures/corrections and cleanup: `docs/phase4-verification.txt`.
- **User verification/expected result:** From backend run `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar testcontainersTest` with Docker/Python3 available; tests pass and disposable resources are removed. API/worker startup and202 trigger examples are in setup/API docs.
- **Limitations:** One active worker; replay protection depends on receiver idempotency. Phase5 human/AI/cancellation behavior and Phase6 run-read/console routes remain pending; no new UI or real-provider credential required.
- **Next item:** 4.7.

### Task 4.7 — Conditions — complete (2026-09-28)

- **Requirement/source:** PDF durable execution and pack contracts; catalog condition/W06.
- **Intended behavior/planned changes:** All five operators; finite JSON decimal comparisons; invalid numeric input fails, exact strings retained.
- **Components:** DeterministicNodes; Gradle tests, API/setup/verification docs. Engine SQL uses the existing MySQL schema and Spring transaction manager alongside JPA; explicit guarded updates make lease fencing reviewable. No broker or additional product features.
- **Acceptance criteria/test roadmap:** Java21/Docker prerequisites. Automated tests use the inputs/actions above and assert those outcomes, including rollback/failure boundaries. Unit tests for pure policy/handlers and Testcontainers for actual transactions/recovery; controlled local mock HTTP and supplied mock world for effects. Exact commands and actual results recorded after execution.
- **API documentation:** 4.1/4.2 add POST manual/hook request/auth/response/error/duplicate/asynchronous contracts; remaining tasks document execution effects without adding Phase6 routes.
- **Implemented result/files:** DeterministicNodes.condition, EngineStore. All five comparisons with strict finite decimal syntax and persisted selected branch. Equality remains exact text, numeric invalid values fail; loop/branch execution verified.
- **Verification/results:** Full offline Gradle test/testcontainersTest passed198 unit tests and14 MySQL integration tests with no failures/errors/skips. Final targeted Phase4 rerun passed9 integration cases after additional trigger/action coverage. All13 document consistency commands passed. Exact commands, initial fixture failures/corrections and cleanup: `docs/phase4-verification.txt`.
- **User verification/expected result:** From backend run `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar testcontainersTest` with Docker/Python3 available; tests pass and disposable resources are removed. API/worker startup and202 trigger examples are in setup/API docs.
- **Limitations:** One active worker; replay protection depends on receiver idempotency. Phase5 human/AI/cancellation behavior and Phase6 run-read/console routes remain pending; no new UI or real-provider credential required.
- **Next item:** 4.8.

### Task 4.8 — Durable delays — complete (2026-09-28)

- **Requirement/source:** PDF durable execution and pack contracts; RECOVERY C05/W07/W09.
- **Intended behavior/planned changes:** Persist millisecond-ceiling resume time once; wake without another attempt/cap reservation; zero and restart boundaries.
- **Components:** EngineStore/DeterministicNodes; Gradle tests, API/setup/verification docs. Engine SQL uses the existing MySQL schema and Spring transaction manager alongside JPA; explicit guarded updates make lease fencing reviewable. No broker or additional product features.
- **Acceptance criteria/test roadmap:** Java21/Docker prerequisites. Automated tests use the inputs/actions above and assert those outcomes, including rollback/failure boundaries. Unit tests for pure policy/handlers and Testcontainers for actual transactions/recovery; controlled local mock HTTP and supplied mock world for effects. Exact commands and actual results recorded after execution.
- **API documentation:** 4.1/4.2 add POST manual/hook request/auth/response/error/duplicate/asynchronous contracts; remaining tasks document execution effects without adding Phase6 routes.
- **Implemented result/files:** DeterministicNodes.delay, EngineStore. Millisecond-ceiling durable deadlines, zero-delay wake, negative/overflow rejection. Restart/wake preserves sequence/attempt/cap reservation; no sleeping dispatch thread for workflow delay.
- **Verification/results:** Full offline Gradle test/testcontainersTest passed198 unit tests and14 MySQL integration tests with no failures/errors/skips. Final targeted Phase4 rerun passed9 integration cases after additional trigger/action coverage. All13 document consistency commands passed. Exact commands, initial fixture failures/corrections and cleanup: `docs/phase4-verification.txt`.
- **User verification/expected result:** From backend run `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar testcontainersTest` with Docker/Python3 available; tests pass and disposable resources are removed. API/worker startup and202 trigger examples are in setup/API docs.
- **Limitations:** One active worker; replay protection depends on receiver idempotency. Phase5 human/AI/cancellation behavior and Phase6 run-read/console routes remain pending; no new UI or real-provider credential required.
- **Next item:** 4.9.

### Task 4.9 — HTTP and notify — complete (2026-09-28)

- **Requirement/source:** PDF durable execution and pack contracts; catalog/RECOVERY retry classification.
- **Intended behavior/planned changes:** Explicit total deadlines/bounded body, no redirects/hidden retries; configured origins; validated headers; exact notify mapping/output; retry status/Retry-After tests.
- **Components:** HttpTransport/DestinationPolicy; Gradle tests, API/setup/verification docs. Engine SQL uses the existing MySQL schema and Spring transaction manager alongside JPA; explicit guarded updates make lease fencing reviewable. No broker or additional product features.
- **Acceptance criteria/test roadmap:** Java21/Docker prerequisites. Automated tests use the inputs/actions above and assert those outcomes, including rollback/failure boundaries. Unit tests for pure policy/handlers and Testcontainers for actual transactions/recovery; controlled local mock HTTP and supplied mock world for effects. Exact commands and actual results recorded after execution.
- **API documentation:** 4.1/4.2 add POST manual/hook request/auth/response/error/duplicate/asynchronous contracts; remaining tasks document execution effects without adding Phase6 routes.
- **Implemented result/files:** HttpTransport, DestinationPolicy, DeterministicNodes, RelayApplication. Exact trusted origins, no redirects or hidden JDK resend, controlled headers, bounded response and full call/body deadline. Real transport tests cover success, adapter response errors, reset/timeout, permanent/retryable statuses and Retry-After.
- **Verification/results:** Full offline Gradle test/testcontainersTest passed198 unit tests and14 MySQL integration tests with no failures/errors/skips. Final targeted Phase4 rerun passed9 integration cases after additional trigger/action coverage. All13 document consistency commands passed. Exact commands, initial fixture failures/corrections and cleanup: `docs/phase4-verification.txt`.
- **User verification/expected result:** From backend run `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar testcontainersTest` with Docker/Python3 available; tests pass and disposable resources are removed. API/worker startup and202 trigger examples are in setup/API docs.
- **Limitations:** One active worker; replay protection depends on receiver idempotency. Phase5 human/AI/cancellation behavior and Phase6 run-read/console routes remain pending; no new UI or real-provider credential required.
- **Next item:** 4.10.

### Task 4.10 — Mock actions — complete (2026-09-28)

- **Requirement/source:** PDF durable execution and pack contracts; catalog order_action/mock_world.py.
- **Intended behavior/planned changes:** Exact refund/replacement paths/bodies/output; encoded order ID; fail closed without approved earlier same-run human evidence.
- **Components:** DeterministicNodes/HttpTransport; Gradle tests, API/setup/verification docs. Engine SQL uses the existing MySQL schema and Spring transaction manager alongside JPA; explicit guarded updates make lease fencing reviewable. No broker or additional product features.
- **Acceptance criteria/test roadmap:** Java21/Docker prerequisites. Automated tests use the inputs/actions above and assert those outcomes, including rollback/failure boundaries. Unit tests for pure policy/handlers and Testcontainers for actual transactions/recovery; controlled local mock HTTP and supplied mock world for effects. Exact commands and actual results recorded after execution.
- **API documentation:** 4.1/4.2 add POST manual/hook request/auth/response/error/duplicate/asynchronous contracts; remaining tasks document execution effects without adding Phase6 routes.
- **Implemented result/files:** DeterministicNodes order/notification adapters, HttpTransport. Exact email/chat/refund/replacement contracts, encoded path IDs and typed output projections. Real supplied mock-world refund/replacement calls succeed using explicit valid earlier-approval test fixture; missing evidence fails before dispatch. Public approval flow remains Phase5.
- **Verification/results:** Full offline Gradle test/testcontainersTest passed198 unit tests and14 MySQL integration tests with no failures/errors/skips. Final targeted Phase4 rerun passed9 integration cases after additional trigger/action coverage. All13 document consistency commands passed. Exact commands, initial fixture failures/corrections and cleanup: `docs/phase4-verification.txt`.
- **User verification/expected result:** From backend run `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar testcontainersTest` with Docker/Python3 available; tests pass and disposable resources are removed. API/worker startup and202 trigger examples are in setup/API docs.
- **Limitations:** One active worker; replay protection depends on receiver idempotency. Phase5 human/AI/cancellation behavior and Phase6 run-read/console routes remain pending; no new UI or real-provider credential required.
- **Next item:** 4.11.

### Task 4.11 — Frozen requests/keys — complete (2026-09-28)

- **Requirement/source:** PDF durable execution and pack contracts; RECOVERY B03.
- **Intended behavior/planned changes:** Persist resolved input/concrete request/body bytes/key before send; retry reuses all; loop visit gets distinct key.
- **Components:** EngineStore/HttpTransport; Gradle tests, API/setup/verification docs. Engine SQL uses the existing MySQL schema and Spring transaction manager alongside JPA; explicit guarded updates make lease fencing reviewable. No broker or additional product features.
- **Acceptance criteria/test roadmap:** Java21/Docker prerequisites. Automated tests use the inputs/actions above and assert those outcomes, including rollback/failure boundaries. Unit tests for pure policy/handlers and Testcontainers for actual transactions/recovery; controlled local mock HTTP and supplied mock world for effects. Exact commands and actual results recorded after execution.
- **API documentation:** 4.1/4.2 add POST manual/hook request/auth/response/error/duplicate/asynchronous contracts; remaining tasks document execution effects without adding Phase6 routes.
- **Implemented result/files:** EngineStore prepare transaction, HttpTransport. Resolved input, method/URL/headers/canonical body and run:sequence key commit before send. Recovery reuses them; distinct loop visits have distinct keys. Actual killed-worker mock ledger proves same-key replay.
- **Verification/results:** Full offline Gradle test/testcontainersTest passed198 unit tests and14 MySQL integration tests with no failures/errors/skips. Final targeted Phase4 rerun passed9 integration cases after additional trigger/action coverage. All13 document consistency commands passed. Exact commands, initial fixture failures/corrections and cleanup: `docs/phase4-verification.txt`.
- **User verification/expected result:** From backend run `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar testcontainersTest` with Docker/Python3 available; tests pass and disposable resources are removed. API/worker startup and202 trigger examples are in setup/API docs.
- **Limitations:** One active worker; replay protection depends on receiver idempotency. Phase5 human/AI/cancellation behavior and Phase6 run-read/console routes remain pending; no new UI or real-provider credential required.
- **Next item:** 4.12.

### Task 4.12 — Retries — complete (2026-09-28)

- **Requirement/source:** PDF durable execution and pack contracts; RECOVERY bounded transport/recovery retries.
- **Intended behavior/planned changes:** Persist budget/backoff/Retry-After; retryable versus permanent failure; abandoned attempt uncertain; cap attempts across restart.
- **Components:** ExecutionPolicy/EngineStore; Gradle tests, API/setup/verification docs. Engine SQL uses the existing MySQL schema and Spring transaction manager alongside JPA; explicit guarded updates make lease fencing reviewable. No broker or additional product features.
- **Acceptance criteria/test roadmap:** Java21/Docker prerequisites. Automated tests use the inputs/actions above and assert those outcomes, including rollback/failure boundaries. Unit tests for pure policy/handlers and Testcontainers for actual transactions/recovery; controlled local mock HTTP and supplied mock world for effects. Exact commands and actual results recorded after execution.
- **API documentation:** 4.1/4.2 add POST manual/hook request/auth/response/error/duplicate/asynchronous contracts; remaining tasks document execution effects without adding Phase6 routes.
- **Implemented result/files:** ExecutionPolicy, EngineStore retry intent and outcome. Frozen bounded budgets and persisted exponential/Retry-After due times; retries distinguish failed/uncertain attempts and never reset at restart. Exhaustion and cause metadata retained; crashes before preparation consume no extra invocation.
- **Verification/results:** Full offline Gradle test/testcontainersTest passed198 unit tests and14 MySQL integration tests with no failures/errors/skips. Final targeted Phase4 rerun passed9 integration cases after additional trigger/action coverage. All13 document consistency commands passed. Exact commands, initial fixture failures/corrections and cleanup: `docs/phase4-verification.txt`.
- **User verification/expected result:** From backend run `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar testcontainersTest` with Docker/Python3 available; tests pass and disposable resources are removed. API/worker startup and202 trigger examples are in setup/API docs.
- **Limitations:** One active worker; replay protection depends on receiver idempotency. Phase5 human/AI/cancellation behavior and Phase6 run-read/console routes remain pending; no new UI or real-provider credential required.
- **Next item:** 4.13.

### Task 4.13 — Step cap — complete (2026-09-28)

- **Requirement/source:** PDF durable execution and pack contracts; WORKFLOW_SEMANTICS W09.
- **Intended behavior/planned changes:** Persist once per new visit; retries/delay wake reuse sequence; final node at cap succeeds; next admission fails before effect.
- **Components:** EngineStore; Gradle tests, API/setup/verification docs. Engine SQL uses the existing MySQL schema and Spring transaction manager alongside JPA; explicit guarded updates make lease fencing reviewable. No broker or additional product features.
- **Acceptance criteria/test roadmap:** Java21/Docker prerequisites. Automated tests use the inputs/actions above and assert those outcomes, including rollback/failure boundaries. Unit tests for pure policy/handlers and Testcontainers for actual transactions/recovery; controlled local mock HTTP and supplied mock world for effects. Exact commands and actual results recorded after execution.
- **API documentation:** 4.1/4.2 add POST manual/hook request/auth/response/error/duplicate/asynchronous contracts; remaining tasks document execution effects without adding Phase6 routes.
- **Implemented result/files:** EngineStore logical-visit admission. Persisted cap checked before new step/effect; retries and delay wakes reuse reservation. Final node at cap succeeds; loop successor admission fails with max_steps and exact trace count.
- **Verification/results:** Full offline Gradle test/testcontainersTest passed198 unit tests and14 MySQL integration tests with no failures/errors/skips. Final targeted Phase4 rerun passed9 integration cases after additional trigger/action coverage. All13 document consistency commands passed. Exact commands, initial fixture failures/corrections and cleanup: `docs/phase4-verification.txt`.
- **User verification/expected result:** From backend run `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar testcontainersTest` with Docker/Python3 available; tests pass and disposable resources are removed. API/worker startup and202 trigger examples are in setup/API docs.
- **Limitations:** One active worker; replay protection depends on receiver idempotency. Phase5 human/AI/cancellation behavior and Phase6 run-read/console routes remain pending; no new UI or real-provider credential required.
- **Next item:** 4.14.

### Task 4.14 — Recovery verification — complete (2026-09-28)

- **Requirement/source:** PDF durable execution and pack contracts; RECOVERY R01-R12/Phase4 exit.
- **Intended behavior/planned changes:** Real MySQL: ownership/expiry/stale writes, duplicate delivery, wait/restart, crash before/after side effect, stable keys and one mock-world effect; unit+integration+document checks.
- **Components:** EngineMySqlTest/owned mock-world crash harness; Gradle tests, API/setup/verification docs. Engine SQL uses the existing MySQL schema and Spring transaction manager alongside JPA; explicit guarded updates make lease fencing reviewable. No broker or additional product features.
- **Acceptance criteria/test roadmap:** Java21/Docker prerequisites. Automated tests use the inputs/actions above and assert those outcomes, including rollback/failure boundaries. Unit tests for pure policy/handlers and Testcontainers for actual transactions/recovery; controlled local mock HTTP and supplied mock world for effects. Exact commands and actual results recorded after execution.
- **API documentation:** 4.1/4.2 add POST manual/hook request/auth/response/error/duplicate/asynchronous contracts; remaining tasks document execution effects without adding Phase6 routes.
- **Implemented result/files:** EngineMySqlTest, CrashRecoveryMySqlTest, HttpTransportTest, EngineValuesTest. Real ownership/expiry/duplicate/delay/retry/rollback tests plus forcibly killed packaged worker after actual side effect but before response persistence. Replacement succeeds with1 logical visit, uncertain+succeeded attempts,1 original effect and1 replay. Owned container/process cleanup verified.
- **Verification/results:** Full offline Gradle test/testcontainersTest passed198 unit tests and14 MySQL integration tests with no failures/errors/skips. Final targeted Phase4 rerun passed9 integration cases after additional trigger/action coverage. All13 document consistency commands passed. Exact commands, initial fixture failures/corrections and cleanup: `docs/phase4-verification.txt`.
- **User verification/expected result:** From backend run `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar testcontainersTest` with Docker/Python3 available; tests pass and disposable resources are removed. API/worker startup and202 trigger examples are in setup/API docs.
- **Limitations:** One active worker; replay protection depends on receiver idempotency. Phase5 human/AI/cancellation behavior and Phase6 run-read/console routes remain pending; no new UI or real-provider credential required.
- **Next item:** 5.1.


### Task 3.10 — Testcontainers Phase 3 verification — complete (2026-09-27)

- **Requirement/source:** Roadmap3.10 and Phase3 exit; PDF/pack persistence, validation, publication and immutable run snapshots. Existing domain/migration contracts remain authoritative.
- **Intended behavior:** Verify the production MySQL stack in throwaway Java-managed containers, reusing the existing comprehensive integration assertions. No new application behavior or route.
- **Planned changes/components:** Add Boot-managed Testcontainers MySQL dependency and locked Gradle `testcontainersTest` task; shared test-only lifecycle/configuration helper; adapt four existing MySQL suites to accept owned-container settings while retaining Compose runners; add migration lifecycle and seed HTTP edit/publish checks; update setup/API evidence/plan.
- **Acceptance criteria:** Each suite gets fresh pinned MySQL8.4.11, dynamic ports and disposable credentials, closes it after success/failure, and fails rather than skips if Docker is unavailable. No user database is targeted. All six repositories, constraints/rollback/concurrency, CRUD/auth/validation, publication revision fencing, frozen snapshots/restart and seed preservation pass on real MySQL. Fresh worker rejects unmigrated DB; API migrates once; worker validates without mutations; altered checksum is rejected. Seeds can be edited and republished via HTTP.
- **Test cases/roadmap:** Prerequisites Java21, Docker and resolved Gradle dependencies/images. T01 run188 existing unit tests and bootJar. T02 execute all four existing comprehensive integration cases under Testcontainers: their valid/invalid inputs, boundaries, missing IDs, unauthorized requests, conflicting edits, retries and rollback retain their expected assertions. T03 fresh MySQL worker startup fails without schema; API startup creates successful migration history; API restart and worker preserve history; corrupt a checksum only inside owned container and expect API/worker rejection. T04 GET seeded definition, PUT edited name (Draft), POST publish (Published frozen edited copy), then restart and verify persistence. T05 run13 document consistency checks and record exact commands/results. No silent Docker skips and no H2 fallback.
- **API documentation:** No route changes; add actual verification coverage and command after execution.
- **Implemented result:** Boot-managed Testcontainers2.0.5 locked; explicit Gradle task with isolated environment, sequential fresh pinned MySQL containers and cleanup. Shared test helper reuses all four existing integration suites; added migration lifecycle checks and HTTP seed edit/publish/restart assertions. Application behavior/routes unchanged; setup/API evidence updated.
- **Verification results:** Gradle test/bootJar passed188 unit tests (zero failures/errors/skips). Four comprehensive Testcontainers suites passed in the full run; the new migration case passed its targeted rerun after correcting a table-name assertion. All five integration cases therefore verified, with no skips. Initial digest syntax failure and test-name correction are recorded honestly. All13 consistency commands passed; Docker cleanup check found zero remaining Testcontainers containers. Evidence: `docs/testcontainers-verification.txt`.
- **Limitations:** Gradle integration task needs Docker and cached/pullable images. Actual engine query plans/claim concurrency remain Phase4 when engine queries exist. No new trigger/execution API or UI in this verification task.
- **Next item:** 4.1 — manual and webhook triggers, Phase3 exit verified.


### Task 3.9 — Repeatable seed loading — complete (2026-09-27)

- **Requirement/source:** Pack implementation checklist and canonical seed_workflows.json require four Published startup seeds; task3.9 repeatability and preservation of user edits. Original pack bytes/definitions and D01 remain unchanged.
- **What we will do and why:** Bundle the exact seed file and load missing IDs during API startup after migrations/JPA. Default enabled; RELAY_LOAD_SEEDS=false permits intentional empty/test DBs. Worker/scaffold never seed. Existing IDs are preserved wholesale, irrespective of status/content; no reset/overwrite or automatic republish.
- **Files/components affected:** Seed resource/catalog/transaction/runner, launch config/env example, Gradle/unit/MySQL integration tests and disposable runners, setup/API/plan docs.
- **Implementation steps:** Parse and validate all four source definitions before writes. Insert missing rows already published with draft/publication copies in one transaction; rollback whole batch on failure. Sort IDs for stable write ordering; bounded whole-transaction retries on concurrent duplicate/lock conflicts. Startup fails safely after invalid configuration/resources or unrecoverable seed DB failure. Log counts only, never secrets. Seed runner executes before ready state; no management route or queue/provider effects.
- **Acceptance criteria:** Fresh startup adds four canonical Published rows; restart preserves rows/timestamps/revisions exactly; edited/different existing IDs remain untouched; missing subset restored only; concurrent loaders produce exactly four unique seeds; validation/transaction failure creates no partial batch; disabled/API versus worker/scaffold boundaries verified. No ordinary database changes during implementation.
- **Test roadmap:** Unit source byte provenance, four validations, invalid/duplicate seeds and retry/failure behavior; launch boolean/default/worker checks. Real MySQL startup enabled/restart/disabled, preserved edits/collisions, partial population, concurrent loaders and forced batch rollback; HTTP list redaction and zero jobs/runs. Gradle test bootJar, disposable seed integration plus existing publication regression,13 consistency checks. Existing isolated runners explicitly disable automatic seeds to preserve their fixtures.
- **API documentation changes:** No new route/schema; document default list contents, insert-only startup behavior, disable switch, startup errors and actual evidence.
- **Implemented result:** Bundled byte-identical seed file; added SeedCatalog full validation, SeedTransactions atomic insert-only batch, SeedLoader bounded retries and API SeedStartup runner. Default-true strict RELAY_LOAD_SEEDS setting; worker/scaffold isolated. Existing IDs/edits and unrelated workflows preserved; startup logs counts only. Added Gradle seedTest/runner, tests and API/setup/architecture docs; existing fixture runners disable auto seeds.
- **Verification results:** Final offline Gradle test/bootJar passed188 tests with zero failures/errors/skips. Real MySQL seed integration passed1 comprehensive case including disabled/default/repeated startup, exact source contents, preserved edits/unrelated rows, partial population, concurrency, batch rollback and startup failure/recovery. Existing publication/snapshot integration passed1 case. All13 consistency checks passed after updating architecture config row count for the new setting. Owned DBs removed; ordinary user DB/services untouched. Evidence: `docs/seed-loading-verification.txt`.
- **Limitations/blockers:** Seeds load definitions only; run execution/triggers remain4.x. Existing colliding/edited seed IDs are intentionally not repaired; startup counts report preservation. D01 unchanged.
- **Next item:** 3.10 — Testcontainers MySQL validation/snapshot verification.

### Task 3.8 — Frozen publication and run snapshots — complete (2026-09-27)

- **Requirement/source:** PDF frozen runnable workflows/run traces; fixed POST/workflows/{id}/publish; WORKFLOW_SEMANTICS publication/revision rules and DATA_MODEL frozen definition/secret snapshot ownership.
- **What we will do and why:** Add authenticated publication that validates a detached draft then locks/rechecks its revision before atomically storing definition/status/timestamps. Repeated unchanged publication is a no-op. Add a mandatory-transaction snapshot factory for future trigger acceptance, constructing an unsaved queued Run from a locked published definition. No trigger or queue route is introduced before4.1/4.2.
- **Files/components affected:** Workflow entity, publication services/controller/detail projection, internal run snapshot factory, unit and real MySQL/HTTP tests, API/setup/plan docs and status consistency scripts.
- **Implementation steps:** Read draft+revision in a short transaction, validate without holding a DB lock, then write under row lock only if revision matches. Preserve publication on invalid/racing attempts. Publish accepts empty body only,200 detail response,400 validation,401 auth,404 absent,409 stale revision. Add redacted published_definition and published_secret_configured to existing detail projection so old publication remains inspectable after editing. Factory requires existing caller transaction, locks/checks published status, snapshots graph/secret/input/policy as immutable JSON strings; caller later persists run+job atomically.
- **Acceptance criteria:** Valid seeds/loops publish; invalid cases never mutate status/publication; repeated publication preserves timestamps/revision; edit forces draft and retains old publication; deterministic stale validation rejected409. Snapshot before edit retains old graph/secret, draft blocks new snapshots, republish permits new snapshot; run snapshot survives DB reload/restart and later edits. Authentication/redaction intact; no numbered versions or runtime execution claims.
- **Test roadmap:** Unit orchestration revision/no-op/validation paths; real HTTP/MySQL publish errors, missing/auth/body/cors, all seeds, concurrent publish/edit with deterministic latches, rollback, snapshot mandatory transaction, immutable input/policy/definition, before/after publication and restart. Existing175 tests/CRUD regression retained; Gradle test bootJar, disposable publication integration,13 consistency scripts. Owned DB only.
- **API documentation changes:** Add complete publish route and new detail fields, no-body example, distinct validation/conflict outcomes, retry/no-op/concurrency and side-effect semantics. Correct earlier unpublished-route notes.
- **Implemented result:** Added publication orchestration with separate read/validation/revision-fenced write transactions; authenticated no-body publish route; frozen workflow publication/no-op behavior; redacted publication fields on all detail projections. Added mandatory-transaction RunSnapshotFactory and immutable queued snapshot construction. Unit and real HTTP/MySQL tests, test runner/task, API/setup/data-model/semantics docs and status checks updated.
- **Verification results:** Offline Gradle test/bootJar passed177 tests. Publication integration passed1 comprehensive real HTTP/MySQL case: seeded/loop publication, validation rollback, deterministic stale revision409, no-op repeats, CORS/redaction, snapshot/edit lock overlap, mandatory transaction/trigger checks, immutable snapshots/input/policy and restart persistence. Existing CRUD integration passed1 case. All13 consistency checks passed. Owned DBs/processes removed; no user DB changes. Exact evidence: `docs/publication-verification.txt`.
- **Limitations/blockers:** Snapshot helper is internal; actual trigger authentication/atomic run+job acceptance4.1/4.2 and execution remain later. Policy validation is an acceptance prerequisite for4.2. D01 unchanged.
- **Next item:** 3.9 — repeatable seeds.

### Task 3.7 — Publish validation — complete (2026-09-27)

- **Requirement/source:** PDF typed workflows/AI schema validation; canonical catalog/seeds; API_CONTRACT invalid publish cases; WORKFLOW_SEMANTICS P01–P10, template grammar and literal node constraints.
- **What we will do and why:** Add a side-effect-free publish validator over structurally parsed drafts. Validate every node, references and catalog params without forbidding loops or requiring static approval dominance. Keep draft CRUD permissive. Publish route/atomic frozen definitions remain3.8, avoiding a route that claims publication without a snapshot.
- **Files/components affected:** workflow validation/template/schema classes and tests, Gradle dependency/lock, API documentation, plan and evidence.
- **Implementation steps:** Catalog-driven required/type/enum/unknown-param checks; exact edge kind and target checks; reusable template syntax/reference parser without evaluation. Literal URL/header/number/nonblank rules; output_schema local Draft2020-12 meta-validation/compilation via pinned networknt3.0.6. No network schema retrieval; reject external/unresolved refs, unsupported dialect/required vocabulary. Preserve annotations and literal schema strings. Errors contain fixed reasons and structural paths, no submitted secrets.
- **Acceptance criteria:** All four original seeds validate; entry/unknown type/missing param/dangling edge distinguishable; missing/null edges distinct; self/backward/same-target/unreachable graphs handled; templates validate referenced IDs without requiring runtime data; invalid schema/value cases reject without mutations/network calls.
- **Test roadmap:** JUnit catalog-wide required/type/null/enum and unknown params, graph and template positive/negative/boundary cases, literal node rules and schema dialect/ref/meta-schema cases; isolated local HTTP counter proves no schema fetch. Verify defensive behavior and existing draft CRUD tests remain valid. Run Gradle test/bootJar with locked dependencies and13 consistency checks. No new HTTP/database behavior requires an artificial route.
- **API documentation changes:** Document internal validation/error semantics and explicit unpublished-route boundary; no route added/changed.
- **Implemented result:** Added PublishValidator, reusable TemplateSyntax and local-only OutputSchemaValidator using pinned/locked networknt3.0.6. Catalog-driven graph/param/template/literal checks permit loops and validate all nodes. Schema meta-validation plus explicit compilation covers unused definitions and local references into annotation objects. Added comprehensive unit/regression tests and API/setup/semantics documentation.
- **Verification results:** Final offline Gradle test/bootJar passed175 tests, zero failures/errors/skips. Existing real HTTP/MySQL workflow integration passed; owned DB removed. All13 consistency scripts passed. Original four seeds and no-schema-fetch counter verified. Initial unused-definition regression failure fixed. Exact commands/outcomes: `docs/publish-validation-verification.txt`.
- **Limitations/blockers:** Actual publication3.8; runtime template resolution4.6 and provider output validation5.7 remain. D01 unchanged.
- **Next item:** 3.8 — frozen definitions/snapshots and publication integration.

### Task 3.6 — Workflow CRUD APIs — complete (2026-09-27)

- **Requirement/source:** PDF workflow management, fixed pack GET/POST workflows; API_CONTRACT flexible detail/update routes; WORKFLOW_SEMANTICS draft lifecycle and structural validation; CONSOLE safe projections.
- **What we will do and why:** Implement POST/GET /workflows and GET/PUT /workflows/{workflowId}. POST201 creates draft; duplicate ID409. PUT200 replaces full draft with matching immutable ID, locks workflow row, sets draft and preserves previous publication. Missing404. List returns ordered safe summaries; detail/write responses carry redacted draft definition and metadata, not entities. No delete required by pack; publishing/triggers remain later tasks.
- **Files/components affected:** API controller/service/error handlers, Workflow/repository, automated HTTP/MySQL tests and runners, browser CORS regression, API/setup/plan docs.
- **Implementation steps:** Parse bounded UTF-8 JSON before persistence; reject non-JSON415, oversized413, malformed/invalid400 without leaked values. Transactional insert with DB uniqueness for racing creates; row-lock updates, no blind merge/upsert. List sorted by ID without secret-bearing definitions; detail omits trigger secret and reports secret_configured. PUT accepts complete original definition, not the redacted read projection. Stateless management auth/CORS unchanged; no retries or external effects.
- **Acceptance criteria:** Authorized CRUD roundtrips to real MySQL; unauthorized writes have no effect; duplicate and concurrent creates cannot overwrite; mismatch/missing/invalid edits preserve storage; concurrent replacements are whole definitions; editing a published fixture preserves publication and clears runnable status. Existing scaffold/worker startup and auth tests remain valid. Real browser can read list200 after preflight.
- **Test roadmap:** Gradle test/bootJar and disposable mysqlTest with real HTTP for empty/list/create/detail/update, duplicate/missing/auth, JSON/media/UTF-8/body limits, malicious input and redaction, concurrent creates/updates, published fixture, restart persistence. Existing unit/security checks; update browser CORS check from missing404 to implemented200 and run packaged disposable startup/browser check. Run13 consistency scripts. All mutations only in owned test databases.
- **API documentation changes:** Full four-route schemas, examples, authentication, headers, validation/statuses, state/concurrency/retry semantics and actual test evidence. Correct earlier current404 setup notes.
- **Implemented result:** Added authenticated API-mode WorkflowController/WorkflowService, bounded UTF-8 body reading and safe validation/media/size/conflict errors. Workflow replacement and row-lock repository method preserve prior publication. Added real HTTP/MySQL test task/runner, updated browser list expectation, API route reference/setup and consistency implementation-status assertions.
- **Verification results:** Gradle test/bootJar passed131 tests;1 comprehensive real HTTP/MySQL integration test passed with concurrent creates/updates, exact/chunked byte limits, rollback/redaction and restart persistence. Packaged Chromium CORS/list200 plus disposable startup/recovery passed. All13 consistency scripts passed. Initial integration fixture timestamp failure corrected; exact commands/results in `docs/workflow-api-verification.txt`.
- **Limitations/blockers:** Publishing3.7/3.8, seeds3.9 and data views6.x remain; D01 unchanged.
- **Next item:** 3.7 — publish validation.

### Task 3.5 — Catalog and definition parsing — complete (2026-09-27)

- **Requirement/source:** PDF workflow definitions; pinned pack node_catalog.json/seed_workflows.json; WORKFLOW_SEMANTICS P01–P08 structural rules. Catalog carries all seven node contracts unchanged; schedule remains unsupported.
- **What we will do and why:** Bundle the canonical catalog and expose defensive metadata lookups; parse bounded strict JSON into a defensive definition model indexed by node ID, preserving exact decimals, arbitrary params, optional fields and missing versus null edges. No execution or publication implied by parsing.
- **Files/components affected:** backend workflow package/resources/tests; plan, API reference and parser evidence.
- **Implementation steps:** Reuse pinned Jackson3, no new dependencies. Enforce 1MiB UTF-8 and depth64 before structural traversal, reject duplicate keys/trailing values. Validate envelope, literal identifiers, trigger, limits, node shape and uniqueness. Permit unknown node types, incomplete params, dangling/missing edges for repairable drafts; defer catalog param/graph/template/schema validation to3.7. Error reasons and structural paths must not echo submitted secrets.
- **Acceptance criteria:** All four unchanged seeds parse; catalog metadata matches source; returned JSON cannot mutate retained models. Numeric precision, loops/order and null/absent edges preserved; malformed/oversized/deep/duplicate/invalid structural input rejected without side effects.
- **Test roadmap:** JUnit seeds/catalog provenance and all metadata, defensive copies, decimals, draft flexibility; negative JSON/structure/type/unknown fields/IDs/trigger/limit cases; size/depth/Unicode boundaries. Run Gradle test bootJar and13 consistency scripts; record actual commands/results. No DB/HTTP changes, so no artificial integration routes.
- **API documentation changes:** Record parser implementation and remaining route/publish boundaries; no routes added or changed.
- **Implemented result:** Bundled byte-identical canonical catalog; added NodeCatalog, DefinitionParser, defensive WorkflowDefinition and safe DefinitionException. Strict bounded JSON structural validation preserves arbitrary draft params, exact decimals, node order and edge presence. Added12 JUnit test cases/invocations and API foundation documentation.
- **Verification results:** Gradle offline test/bootJar passed131 tests with zero failures/errors/skips; all four unchanged seeds parsed and catalog provenance verified. All13 consistency scripts passed. Initial sandbox socket denial and Jackson3 import correction recorded in `docs/definition-parsing-verification.txt`.
- **Limitations/blockers:** Publish validation3.7, CRUD3.6, runtime4.x/5.x; D01 unaffected.
- **Next item:** 3.6 — workflow CRUD.

### Task 3.4 — Browser access/CORS/session errors — complete (2026-09-26)

- **Requirement/source:** Item3.4; architecture explicit RELAY_ALLOWED_ORIGINS, console memory-only token/first protected read/disconnect401/race rules; pack GET/workflows shape (array or workflows wrapper).
- **What we will do and why:** Add exact-origin API CORS for management namespaces, preflight before authentication, no cookies/wildcards. Add accessible Connect/Disconnect panel using in-memory session transport; validate connection only by successful minimal workflow-list response. Current missing endpoint yields honest unavailable error. No new token-check endpoint or fake data.
- **Files/components affected:** backend CORS config/security/tests; frontend session/panel/client tests/browser tests/style; API/setup docs, PROJECT_PLAN.md.
- **Implementation steps:** Validate comma-separated HTTP(S) origin list in API mode; default localhost5173, empty list disables cross-origin. Allow explicit methods/headers, safe403 rejection. Session generation/AbortControllers prevent stale reads or401 from affecting a new connection. Disconnect and protected401 clear token/state and abort requests. Map400/401/403/404/409/429/5xx/network/format/timeout separately, no auto mutation retries; no persistent token storage or worker-health inference.
- **Acceptance criteria:** Allowed preflight200 without token; denied origin/method/header403; actual401/403 readable by allowed browser; credentials/wildcard absent; same-origin/no-Origin calls unchanged; scaffold unchanged. Frontend token password input/Enter, successful read establishes session, errors distinguish invalid token from unavailable API, reload clears session, disconnect cancels and refocuses, late old requests cannot restore state; placeholders/navigation preserved.
- **Test roadmap:** Java CORS parser/security HTTP tests for origin/header/method boundaries and token failures; existing auth/scaffold tests. Node session tests for success/malformed list, disconnect/401/403/network, races/stale401/abort and mutation nonretry. Chromium mocked protected responses for Connect/Disconnect/reload/404/401/keyboard/320px; existing route tests. Real browser-to-backend CORS verified with owned test servers if needed; document mock-vs-real evidence. Run Gradle and npm test/build/browser, consistency checks.
- **API documentation changes:** Document OPTIONS and CORS headers/errors for management namespaces, origin config, frontend session boundary and unavailable list route. No domain CRUD endpoint added.
- **Implemented result:** Exact-origin API CORS/preflight and validated origin configuration; responsive password Connect/Disconnect panel; memory-only session transport with cancellation, stale-generation protection and consistent safe errors. API/setup/console/architecture documentation and automated tests updated.
- **Verification results:** Gradle test/bootJar passed119 tests with zero failures/errors/skips; npm test passed47, strict TypeScript/Vite build passed, Chromium UI passed12. Real browser-to-packaged-API CORS401/preflight404/unlisted-origin denial passed using disposable MySQL; startup/recovery checks passed and owned resources cleaned up. Desktop/mobile screenshots inspected. All13 consistency scripts passed after correcting a setup link. Exact commands/results: `docs/browser-access-verification.txt`.
- **Limitations/blockers:** Live successful login waits for GET/workflows3.6; tests use supplied-contract-compatible list doubles. Workflow screens/polling remain6.3 onward. No individual user identity; D01 unaffected.
- **Next item:** 3.5 — node catalog/definition parsing.

### Task 3.3 — Management bearer authentication — complete (2026-09-25)

- **Requirement/source:** Item3.3; fixed pack Authorization: Bearer demo-token authentication and human decision evidence; architecture single demo principal. No optional user/role administration.
- **What we will do and why:** Enable authenticated API management namespaces with stateless bearer validation in api mode. Public health stays unchanged; scaffold remains health-only; hooks remain denied until per-workflow secret routing4.1. One shared token identifies demo-operator, not an individually identified human. Provide server-derived decision actor and guarded immutable approval evidence method for later transactional decision service.
- **Files/components affected:** security filter/config, current management actor, Approval evidence method, Java security/MVC/MySQL tests, API/setup docs, PROJECT_PLAN.md.
- **Implementation steps:** Require HTTP bearer-compatible configured token; hash constant-time comparison, reject duplicates/malformed credentials and query/cookie credentials; security JSON401/403 without secret leakage; allow only workflows/runs/approvals namespaces to authenticated management principal. No session/login/basic, no automatic token persistence. Actor from SecurityContext only; future5.2 service coordinates decision and run/job transitions atomically.
- **Acceptance criteria:** Valid token grants management access, missing/wrong/duplicate/malformed token401; unauthorized direct restricted routes denied; health remains public with arbitrary headers, hooks not bypassed by demo token; no cookie/session/cache; authorization does not leak across sequential/concurrent requests. Approval human evidence comes from server principal, rejects anonymous, cannot overwrite existing decision/closure. Actual decision routes remain5.2.
- **Test roadmap:** Real random-port test API with test-only DB exclusions and mocked db health, plus existing scaffold tests. Verify all namespaces/methods, health, wrong/empty/basic/query/cookie/duplicate tokens, principal and independent requests, safe401/403, authenticated missing route404. Unit configuration token syntax and actor/decision guards. Extend realMySQL test for persisted decision actor/time and immutable evidence; run Gradle tests/build, disposable mysqlTest, consistency checks. CORS remains3.4.
- **API documentation changes:** Document exact API-mode authentication/denial headers/status/envelope and unimplemented route distinction, token setup/rotation, demo identity limitation; scaffold health contract unchanged.
- **Implemented result:** API-mode stateless bearer filter, constant-time token hash comparison, management namespace authority and safe401/403. Public health/scaffold and hook denial preserved. Server principal demo-operator supplies guarded approval decision evidence; no decision endpoint or lifecycle service added. API/setup documentation records token grammar/rotation, identity limits and later transaction obligations.
- **Verification results:** Gradle test/bootJar passed107 tests, including HTTP auth/denial/concurrent isolation and configuration/evidence guards. Explicit mysqlTest passed persisted decision actor/time plus prior repository/locking checks. All13 consistency checks passed; disposable DB cleaned up. Evidence: `docs/authentication-verification.txt`.
- **Limitations/blockers:** Token grants all demo management capabilities; no individual identity/roles. Approval gate/lifecycle/queue transitions remain5.2/5.3, not added by auth foundation. D01 unaffected.
- **Next item:** 3.4 — frontend access/CORS.

### Task 3.2 — JPA/repository/DTO/error foundation — complete (2026-09-25)

- **Requirement/source:** Item3.2, approved six-table schema/data model, pack error envelope, workflow identifier constraints. No domain CRUD/auth routes before their assigned tasks.
- **What we will do and why:** Map all columns with field-access JPA entities, immutable composite IDs, string state enums and optimistic workflow/run revisions; scalar same-run identifiers retain DB foreign-key enforcement without eager entity graphs. Add repositories, explicit safe summary DTOs, identifier validation and scoped domain error advice.
- **Files/components affected:** backend persistence/api packages, unit/MVC/MySQL tests, Gradle mysqlTest task and local disposable DB runner, setup/data-model/API error foundation documentation, PROJECT_PLAN.md.
- **Integration adjustment:** Entity schema validation now requires the domain tables. Update the earlier no-flag component checker to include packaged V1 plus temporary V2 probe (V3 for pending test), preserving --domain checks and user DB isolation; a test-only table alone is no longer a valid JPA schema.
- **Implementation steps:** Map JSON as raw validated JSON strings via Hibernate JSON JDBC type (SQLNULL versus JSONnull preserved), Instant with explicit TIMESTAMP/DATETIME UTC JDBC binding, no schema changes. Protected ORM constructors, required-field constructors and getters; no public snapshot/request setters. Repository operations remain internal. DTO projections exclude raw definitions/secrets. Advice only applies to com.relay.api controllers; health/security unchanged. Use fixed safe messages for framework/DB failures.
- **Acceptance criteria:** Hibernate validates all tables against V1; persist/reload all six entities and composite IDs; JSON/null/time precision/state roundtrip; workflow/run optimistic locking and rollback/missing resources verified. Code-point ID validation preserves allowed128 Unicode boundary. DTOs serialize no raw secrets. Test-only MVC routes demonstrate consistent400/404/409/500 envelope without leaked exception/payload; actual routes remain unimplemented.
- **Test roadmap:** Java21/Gradle/MySQL. T01 unit ID equality/validation, DTO safe serialization and MVC errors (success, invalid input, malformedJSON, missing resource, integrity/optimistic conflicts and internal failure). T02 explicit mysqlTest task (not silently skipped) using disposable Compose: Flyway/schema validation, six-table persistence, repeated loop IDs, SQLNULL/JSONnull/UTC microseconds, version conflict and rollback, optional lookups. T03 existing78 Java regressions plus packaged domain SQL checker where needed; docs/pack checks. Query-plan/claim concurrency and full service transactions remain3.10/Phase4; no H2.
- **API documentation changes:** Document reusable error contract as test-only verified foundation; no real domain route added; existing Actuator and deny-all security responses unchanged.
- **Implemented result:** Mapped all six entities/repositories, composite identifiers, lowercase state enums, optimistic workflow/run revisions, JSON/UTC binding and identifier validation. Added safe summary DTOs and scoped error envelope advice without adding domain routes. Explicit mysqlTest and disposable runner verify repository behavior; component checker now includes domain tables for JPA validation. Setup/data-model/API documentation updated.
- **Verification results:** Gradle test/bootJar passed87 tests; explicit MySQL integration passed all six repositories, JSON/null/UTC microseconds, FK failure/rollback and workflow/run optimistic conflicts. Corrected reversed nullability metadata found during review and added migration alignment regression. Final packaged API/worker startup, migration rejection and outage/recovery passed. All13 consistency checks passed. Exact evidence: `docs/persistence-foundation-verification.txt`.
- **Limitations/blockers:** Entity mapping is not lifecycle authorization, workflow schema validation or immutable publication service. DTOs are internal foundation, route schemas finalized with endpoints. D01 unaffected.
- **Next item:** 3.3 — management API authentication.

### Task 3.1 — Domain Flyway schema — complete (2026-09-25)

- **Requirement/source:** Item3.1; approved DATA_MODEL C01–C06/I01–I07, STATE_TRANSITIONS timing/state invariants and RECOVERY persistence fields; pinned pack data model/API fixed states. No optional entities.
- **What we will do and why:** Add V1 classpath migration for six InnoDB tables, case-sensitive utf8mb4_0900_bin identifiers/statuses, JSON documents, UTC-convention DATETIME(6), BIGINT counters, restrictive same-run FKs, uniqueness and row-local checks. JPA/services remain3.2 and later.
- **Files/components affected:** backend/src/main/resources/db/migration/V1__relay_schema.sql; scripts/check_component_startup.py --domain and scripts/schema_assertions.py; setup/data-model implementation status and verification evidence; PROJECT_PLAN.md.
- **Implementation steps:** Explicit NOT NULL/no invented lifecycle defaults, indexes per design, null-safe state CHECK expressions; build packaged jar; migrate fresh disposable MySQL through API (default classpath); worker validation and repeated API startup; SQL positive/negative fixtures and metadata checks; document nontransactional MySQL DDL recovery and forward-only migration policy. Existing local relay DB left unchanged; user can apply via normal API startup.
- **Acceptance criteria:** Six tables/migration installed by packaged Flyway; required keys/indexes/checks enforced by realMySQL8.4; loop same-node visits and multiple nullable keys allowed; duplicate IDs/sequences/keys/approval/queue slots rejected; missing/cross-run references rejected; row-local status/lease/decision/wait/timing/counter checks reject invalid data; JSON null differs from SQL NULL; data survives restart and migration is not reapplied; worker validates schema without mutation.
- **Test roadmap:** Docker/Java21 and Gradle cached deps. T01 Gradle test/bootJar. T02 disposable MySQL API migration with history/table/index metadata verification. T03 valid workflow/run/loop/attempt/approval/job fixtures; invalid FK/uniqueness/status/publication/timing/counter/boolean/wait/repair/decision/lease combinations, ID boundaries/case sensitivity and invalidJSON. T04 rollback and restrictive deletion; API restart preserves rows/history; worker starts. T05 document/pack/artifact consistency; preserve existing integration checker test migration override. Real repository mapping/lock concurrency/query plans remain3.10; no H2.
- **API documentation changes:** No routes added/changed; no entities exposed. Setup explains how API applies schema before worker start.
- **Implemented result:** Added packaged V1__relay_schema.sql with six InnoDB tables, explicit case-sensitive IDs/statuses, JSON/timestamps/counters, restrictive same-run FKs, uniqueness, state/evidence/timing/null-safe CHECKs and approved indexes. Extended component checker with --domain and added SQL assertions. Updated data-model/setup evidence and consistency checker migration-label recognition. Existing user DB left unchanged; apply via API startup.
- **Verification results:** Backend `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar` passed78 tests and packaged exact migration. Root `python3 scripts/check_component_startup.py --domain` passed: realMySQL migration,81 invalid SQL cases, positive fixtures/JSON-null/loop/rollback/metadata, worker no-web startup, restart persistence and outage/recovery. All13 consistency scripts passed after fixing V1 reference recognition. Exact commands/outcomes: `docs/domain-schema-verification.txt`.
- **Limitations/blockers:** Cross-table lifecycle, immutable snapshots, approval authorization and queue fencing require service transactions, not schema alone. D01 unaffected.
- **Next item:** 3.2 — entities/repositories/DTOs/validation/errors.

### Task 2.9 — Component startup integration — complete (2026-09-25)

- **Requirement/source:** Item2.9/Phase2 exit, architecture API-owned Flyway migration and shared MySQL, existing health contract. Domain schema remains3.1.
- **What we will do and why:** Run packaged API/worker against an isolated real MySQL Compose project with a temporary filesystem migration. This verifies migration infrastructure without inventing the domain schema or modifying the user's relay database. Verify frontend and mock startup/read-only health separately alongside API/DB processes.
- **Files/components affected:** scripts/check_component_startup.py, test-only migration generated in temporary directory, setup/API verification documentation and PROJECT_PLAN.md; fix bootstrap only if actual integration reveals a defect.
- **Implementation steps:** Fresh disposable DB/secrets; worker rejects empty schema; API applies test migration and becomes ready; worker starts without HTTP and does not migrate; pending/checksum/future history rejects worker; DB outage readiness and recovery; wrong credentials fail; stop owned processes and remove only owned volume. Probe existing frontend/mocks without mutation and repeat owned startup checks where needed.
- **Acceptance criteria:** Real Connector/J/JPA/Flyway startup verified, one applied migration on repeated API startup, worker migration ownership enforced; HTTP liveness/readiness reflect reachable/unreachable DB; frontend and both mock health respond; no real provider key required. Domain migrations/workflow execution not claimed.
- **Test roadmap:** Java21, built jar, Docker/pinnedMySQL, Python; frontend Node baseline. T01 disposable Compose startup and packaged worker absent history rejection. T02 API readiness200, migration marker/history SQL, restart no duplicate migration; worker alive/no servlet. T03 pending/checksum/future migration failure and wrong password nonzero with finite deadlines. T04 disposable DB stop gives readiness503 and liveness200; restart recovers200. T05 existing frontend deep route and both mocks read-only health, owned mock checker/frontend browser test if services absent; all relevant consistency checks. Log exact results and keep incomplete if any acceptance check cannot run.
- **API documentation changes:** Update health's actual MySQL verification status and outage/recovery evidence, no new routes.
- **Implemented result:** Added reproducible packaged-Java/real-MySQL startup checker with disposable Compose resources and temporary SQL; updated API health verification and setup instructions. No application behavior or domain schema changed. Existing frontend/backend/mocks remain untouched.
- **Verification results:** `python3 scripts/check_component_startup.py` exit0: API migration/readiness/JPA startup, worker no-web startup, absent/pending/checksum/future schema rejection, wrong credentials rejection, repeated migration idempotency and actual DB outage/recovery all passed. Existing frontend5173/backend8080/provider9001/world9210 read-only probes returned200. All13 consistency/artifact checks passed. Commands/outcomes: `docs/component-startup-verification.txt`.
- **Limitations/blockers:** Temporary migration proves infrastructure only; normal empty relay DB still lacks domain migration history until3.1; engine/polling/authentication remain later tasks. D01 unaffected.
- **Next item:** 3.1 — domain Flyway migrations.

### Task 2.8 — Local supplied mocks and fixtures — complete (2026-09-25)

- **Requirement/source:** Item 2.8, PDF external-service/provider testing, pinned pack README/scripts/data and architecture A06. Preserve Airtribe attribution and all snapshot hashes; no explicit license grant exists in the snapshot.
- **What we will do and why:** Reuse the existing unchanged 16-file snapshot as the canonical local fixture/tool source. Add a project launcher that checks provenance and imports supplied handlers, binding only loopback; provide runnable validation/smoke/duplication commands and document limitations.
- **Files/components affected:** scripts/run_mock.py, scripts/check_local_mocks.py, docs/MOCKS.md and mock verification evidence, SETUP/API documentation links, pack-review integration status and PROJECT_PLAN.md. No copied divergent fixtures or backend changes.
- **Implementation steps:** Verify hashes before launching; world on9210/provider on9001, ephemeral ports allowed for tests; fixed alpha provider with dummy local bearer credential; preserve vendor handlers unchanged. Exercise live HTTP in owned ephemeral processes, terminate cleanly; document reset/failure injection and future engine verification.
- **Acceptance criteria:** Unmodified pack hashes and validator pass; launcher rejects invalid role/port/source drift; localhost-only healthy mocks; world replay/ledger, validation/business errors, injected failures/reset/restart tested; provider missing auth/unknown model/invalid body, completion usage, rate-limit/down/recovery tested. No real provider key, no live external side effects, no full engine acceptance claim.
- **Test roadmap:** Python stdlib3.9+ and localhost bind. T01 hashes/pack validator and smoke/duplication --help. T02 launcher CLI invalid port and source-integrity negative case. T03 isolated world HTTP: health, all five effect endpoints, replay, missing fields/unknown order/refund boundaries/conflict, malformed JSON/unknown path, injected503/recovery/reset, ledger filtering and known duplicates detected by supplied checker. T04 provider HTTP: health, missing token401, unknown model404, malformed JSON400, valid completion/usage/prose, down503/rate429+Retry-After/recovery. T05 terminate/restart proves in-memory reset; occupied port fails; doc consistency checks. Concurrency safety of vendor replay is not promised (lookup/execute/cache are separate lock regions); actual engine crash acceptance remains Phase7.
- **API documentation changes:** Link local mock endpoint contract separately; no Relay backend routes added or changed.
- **Implemented result:** Reused the canonical unchanged pack with all16 hashes; added localhost-only run_mock.py launcher and isolated check_local_mocks.py; documented fixtures, provenance/license absence, mock HTTP contracts/startup/reset/errors and supplied-verifier limitations in docs/MOCKS.md; linked setup/API reference. No duplicate fixture tree or backend route changes.
- **Verification results:** `python3 scripts/check_local_mocks.py` passed with approved localhost access (initial sandbox startup denied). Pack validator, integrity/drift, invalid CLI/occupied port, all world action/replay/error/ledger/reset checks and provider auth/model/body/usage/prose/failure recovery passed. Supplied duplicate checker correctly accepted replay and rejected duplicate execution. All13 consistency/artifact checkers passed. Exact outcomes: `docs/mock-services-verification.txt`. All owned mock processes stopped; no permanent mock process left running.
- **Limitations/blockers:** Vendor mocks are in-memory and not production services; provider prose cannot satisfy workflow output schemas. D01 remains open; no snapshot modifications or license grant invented.
- **Next item:** 2.9 — component integration verification.

### Task 2.7 — React/TypeScript/Vite foundation — complete (2026-09-25)

- **Requirement/source:** Item 2.7; PDF simple web console; architecture A05/A06; console U01–U05 paths and accessibility rules; fixed pack API paths; task 2.2 selected pins.
- **What we will do and why:** Build the local console shell, five route placeholders, navigation/not-found handling and basic responsive styling. Add a reusable JSON API transport with explicit base URL, bounded timeout, cancellation, safe errors and no automatic retries. Do not fabricate data or implement later authentication/list/decision flows.
- **Files/components affected:** frontend package/lock/config/source/tests, .nvmrc, setup/design status and verification evidence, PROJECT_PLAN.md. No backend route changes.
- **Implementation steps:** Install selected Node using existing nvm; pin baseline dependencies; implement shell and path navigation, API transport and explicit development-only API proxy; add native Node transport tests and browser smoke tests; run clean npm installation, typecheck/build and browser verification; document commands and remaining integration boundaries.
- **Acceptance criteria:** Reproducible npm lock, selected Node/npm pins; build typechecks; Workflows/Runs/Approvals navigation and five deep links render truthful placeholders; root redirects and unknown route recovery work; responsive keyboard-visible shell; API requests remain on configured origin with no redirects/credential persistence, bounded timeout, abort and safe HTTP/format/network errors; mutations never retry. Development proxy only matches API namespaces and never console paths.
- **Test roadmap:** T01 prerequisites Node/npm and dependency registry: install/build/lock and audit. T02 injected fetch tests: JSON/204, headers/token, URL restrictions, 401/403/404/409/429/500, malformed payload, timeout, abort, network failure, single-call mutations and independent concurrent requests. T03 browser tests: root/deep routes, navigation/back/forward, unknown path, focus, 320px viewport, safe escaped IDs, no unsolicited API calls. T04 dev proxy probes and production preview routing; doc/source/layout checks. Browser test dependencies pinned after registry lookup; real protected API integration remains 3.4/6.3 onward.
- **API documentation changes:** No HTTP routes added/changed; browser paths are client navigation only. Record client/proxy boundary in setup.
- **Implemented result:** Installed Node24.21.0/npm11.19.0; added exact frontend dependency pins/lock, TypeScript/Vite config, responsive shell and five placeholder routes, safe API transport/dev proxy, native/browser tests and setup/evidence. Local dev server is running on 127.0.0.1:5173. No backend HTTP routes changed.
- **Verification results:** `npm ci` passed with zero audit findings; `npm test` passed31 transport/proxy cases; `npm run build` passed strict typechecking and production build; final `npm run test:browser` passed9 Chromium tests after repairing back-navigation focus (initial8 pass/1 fail). Desktop/mobile screenshots inspected; dev page and actual backend liveness proxy both200. Thirteen root consistency/artifact scripts passed. Exact commands/outcomes: `docs/frontend-scaffold-verification.txt`.
- **Limitations/blockers:** Domain APIs/authentication/projections not implemented; no working workflow or approval operation claimed. D01 unaffected.
- **Next item:** 2.8 — supplied mock services and fixtures.

### Task 2.6 — MySQL Compose and lifecycle — complete (2026-09-25)

- **Requirement/source:** Phase 2 item 2.6; architecture A06 and persistent MySQL dependency; pack problem statement durable database state; user-required MySQL; selected 8.4.11 image baseline.
- **What we will do and why:** Supply a digest-pinned local MySQL service with named persistent volume, loopback port, non-root relay schema account and authenticated readiness. Keep API/worker on host and preserve existing scaffold process.
- **Files/components affected:** compose.yaml, root .env.example, scripts/init_mysql_secrets.py, scripts/check_mysql_compose.py, docs/SETUP.md, image provenance/verification evidence, PROJECT_PLAN.md.
- **Implementation steps:** Resolve image digest; create Compose service and private local password files; document startup, credentials, port conflicts, stop/restart and explicit destructive reset. Use an isolated test project/volume for lifecycle checks; never reset pre-existing user data.
- **Acceptance criteria:** Compose validates; missing secrets fail startup; image version/digest verified; authenticated query succeeds and wrong credentials fail; relay has access to its schema but not mysql system tables; only loopback port is published; repeated up and stop/start retain test records; disposable volume reset removes test records and reinitializes account/schema; normal local database starts healthy. Domain tables remain Flyway task 3.1.
- **Test roadmap:** Requires Docker engine and image download. T01 Compose JSON structure/digest/port/secrets/volume assertions and missing-file failure. T02 create fresh isolated project/secrets, up --wait, query version/current database, rejected password and forbidden system-table access. T03 insert disposable marker, repeated up and down/up preserve it; explicit down --volumes on owned test project then up removes it. T04 cleanup only test resources; initialize local secrets without overwriting, start normal service, health/query check; all source/doc/layout checks. Record exact commands, failures and outcomes. No application route changes or H2 substitute.
- **API documentation changes:** None; database service adds no HTTP route and existing API health contract is unchanged.
- **Implemented result:** Added digest-pinned compose.yaml, root .env.example for Compose overrides, private idempotent secret initializer, disposable MySQL lifecycle verifier, image provenance and startup/stop/reset/credential documentation. Local relay-mysql-1 is healthy on 127.0.0.1:3306; relay_mysql_data persists the empty relay schema. Existing scaffold untouched.
- **Verification results:** `docker buildx imagetools inspect mysql:8.4.11`, `docker compose pull mysql`, `python3 scripts/check_mysql_compose.py`, `python3 scripts/init_mysql_secrets.py`, `docker compose config --quiet`, `docker compose up -d --wait --wait-timeout 180`, `docker compose ps` and authenticated version/schema SQL all passed. Disposable tests verified missing secrets, permissions/password preservation, authentication/authorization failures, repeated startup, persisted marker and explicit reset. Twelve consistency scripts passed. Exact commands/results: `docs/mysql-compose-verification.txt`. No Gradle rerun or Java/MySQL integration claim.
- **Limitations/blockers:** Database connectivity from Java and full component integration remain 2.9; domain migrations 3.1. D01 unaffected.
- **Next item:** 2.7 — React/TypeScript/Vite scaffold.

### Task 2.5 — API/worker launch and shared database configuration — complete (2026-09-25)

- **Requirement/source:** Phase 2 item 2.5; architecture A01/A04/A06 and configuration contract; recovery transaction bounds; existing health scaffold. Java/Spring Boot/JPA/MySQL/Gradle remain unchanged.
- **What we will do and why:** Validate an explicit RELAY_MODE before context startup; API uses servlet HTTP, worker uses a non-web context and keep-alive lifecycle. Bind the same required MySQL URL/user/password to both processes. API alone migrates; worker validates existing schema without mutation. Scaffold remains an isolated opt-in diagnostic, never a way to bypass a product mode's DB requirements.
- **Files/components affected:** backend bootstrap/environment processor and registration, migration strategy/config, web security condition, configuration and tests; backend/.env.example; API_DOCUMENTATION.md health mode documentation; docs/SETUP.md/ARCHITECTURE.md; smoke/checker scripts; PROJECT_PLAN.md and launch verification evidence.
- **Implementation steps:** Early configuration validation and fixed derived Spring settings; enforce api/worker/scaffold separation and safe credential-free JDBC origin/schema syntax; bound connection/pool/socket/transaction waits using existing transaction timeout; add API migrate and worker validate-only strategy; test wiring without pretending mock DB tests prove MySQL compatibility; build/run packaged invalid-configuration and scaffold probes; update docs/roadmap.
- **Acceptance criteria:** Missing/invalid/ambiguous modes fail before listener/DB startup with messages naming settings only; worker never constructs servlet security/listener even if Spring web type is overridden; both modes use identical datasource settings and schema validation; API migration is exclusive, worker rejects absent/pending/mismatched schema and performs no migrate/repair/baseline/clean; no config secrets in validation errors; scaffold can't mix with a mode; existing health HTTP contracts continue; no queue/worker execution or real MySQL success claimed.
- **Test roadmap:** Java 21 and cached dependencies. T01 parameterized mode/missing/blank/conflicting-profile and JDBC/user/password/token/port/timeout boundary checks, including sanitization and overridden Spring settings. T02 API/worker property equivalence and real non-web SpringApplication context using test-only DB exclusions and a non-mutating schema substitute; verify absence of web/security and worker keep-alive selection. T03 mock Flyway strategy success, pending/empty schema, checksum/DB failure, repeated validation, API migrate-only and worker zero mutation. T04 existing 23 HTTP regression tests; packaged no-mode/bad-mode/mixed-scaffold config failure and valid scaffold probes; Gradle test bootJar with existing locks. T05 document/source/layout/version/scaffold checks and exact results recorded. Real MySQL availability/migrations/locking and multi-process connectivity remain 2.6/2.9/3.1/3.10; no H2 substitute.
- **API documentation changes:** Existing health endpoints available only in API (or isolated scaffold); worker has no HTTP interface. Document startup validation/failure and unchanged deny-all domain API state. No new domain routes.
- **Implemented result:** Added LaunchEnvironmentPostProcessor and spring.factories registration, API-only migration/worker validate-only strategies, servlet-only security, shared strict datasource/timeout configuration and 55 new bootstrap test invocations. Updated API health availability, setup/environment/architecture/recovery docs and packaged smoke failures.
- **Verification results:** `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar` (backend): final exit 0, BUILD SUCCESSFUL, 78 tests with zero failures/errors/skips. Initial worker fixture failure was corrected with a test-only db health contributor. `python3 scripts/check_backend_smoke.py`: exit 0; packaged scaffold 200/503/401, shutdown and five invalid-startup scenarios passed. All 12 document/source/layout/scaffold check scripts passed. Exact commands/results: `docs/launch-modes-verification.txt`.
- **Limitations/blockers:** No Compose DB/schema yet; valid production startup cannot be demonstrated until later tasks. Worker queue execution is Phase 4; API token validation here is startup prerequisite only, authentication remains 3.3. D01 remains open.
- **Next item:** 2.6 — MySQL Compose and startup/reset procedures.

### Task 2.4 — Spring Boot backend scaffold — complete (2026-09-25)

- **Requirement/source:** Phase 2 item 2.4; Java/Spring Boot/JPA/MySQL architecture A01/A04, Gradle decision and task 2.2 pins; health/readiness foundation for task 2.9. Pack application routes/auth remain their later implementation tasks.
- **What we will do and why:** Create a single Java 21 Spring Boot backend with Gradle 9.8.0 Wrapper, required starters and executable jar. Expose only status-only health GET probes; reject other requests until platform authentication/routes are implemented. Provide an explicitly selected scaffold profile that disables database auto-configuration and reports database readiness OUT_OF_SERVICE, so foundation tests do not require the later MySQL setup or falsely report application readiness.
- **Files/components affected:** backend Gradle files/wrapper/locks, src/main and src/test; backend environment comments; API_DOCUMENTATION.md; docs/SETUP.md and architecture status pointers; PROJECT_PLAN.md; scaffold verification evidence and document checks that currently assume no routes exist.
- **Implementation steps:** Initial test exposed security masking malformed-body errors as 401. Permit internal ERROR dispatch (direct /error remains denied) so original 400/406 responses survive, and test that error details stay hidden. Verify Gradle distribution/wrapper checksums; create build with Boot BOM and required Web MVC/Validation/JPA/MySQL/Security/Flyway/Actuator dependencies; add main class, health exposure/security and scaffold profile; add automated HTTP/availability tests; resolve/lock dependencies, run tests and package; launch jar and probe it; update route/setup documentation and historical-checker assumptions.
- **Acceptance criteria:** Wrapper runs on Java 21; dependencies resolve at documented baseline or discrepancies are recorded/resolved; executable jar builds; status-only liveness/readiness/aggregate routes tested; non-health requests and mutations denied without sessions/login or credential leakage; scaffold readiness remains unavailable; no worker/DB/workflow implementation claims; API documentation and current roadmap accurate.
- **Test roadmap:** Prerequisites: Java 21 and dependency download access. T01 verify Gradle archive and wrapper JAR SHA-256, wrapper version, dependency locks and required modules. T02 start actual random-port server in scaffold profile: GET health/liveness/readiness, repeated requests, unexpected query/body, headers/status-only response. T03 test liveness broken/recovered and readiness refusing/accepting transitions while missing DB continues to prevent readiness. T04 reject unimplemented routes, actuator env/info/discovery/detail paths, login and POST/PUT/DELETE health; arbitrary bearer/basic credentials must not grant access; no session cookie. T05 confirm no DataSource/Flyway/EntityManagerFactory in scaffold profile; default configuration retains persistence auto-configuration; Bean Validation available. T06 run test/bootJar and a packaged-jar health smoke test, then document consistency/source/ignore/version checks. MySQL connection/migration and API/worker-mode tests remain 2.5/2.6/2.9; domain tests remain Phase 3 onward.
- **API documentation changes:** Add verified GET /actuator/health, /actuator/health/liveness and /actuator/health/readiness schemas, headers/statuses, exposure/security behavior, scaffold limitation and test evidence. Domain routes remain unimplemented.
- **Implemented result:** Added Java 21/Boot 4.1.1 single-module backend, generated and checksum-verified Gradle 9.8.0 Wrapper, native BOM dependency alignment and application dependency lockfile; Web MVC, Validation, JPA, Security, Actuator, Flyway, MySQL driver and Flyway MySQL module resolve at baseline versions. Added main class, exact-path GET health access with no sessions/login/generated password, hidden health details and internal error dispatch preserving 400 responses. Opt-in scaffold profile excludes database services and reports OUT_OF_SERVICE; default retains persistence configuration and fails without a datasource. Added 23 real HTTP tests, packaged smoke script and scaffold/document checker; updated API docs, setup/environment comments, architecture status and legacy document assertions. No business routes, worker, schema, real-provider or frontend implementation.
- **Verification results:** Gradle archive/wrapper SHA-256 checks passed (provenance in `docs/backend-wrapper-provenance.json`). `./gradlew --gradle-user-home .gradle/user-home --no-daemon test bootJar --write-locks` passed after fixing one initial malformed-body/error-dispatch regression; 23 tests passed, zero skips/failures. `./gradlew --gradle-user-home .gradle/user-home --no-daemon --offline test bootJar` also passed with saved locks and re-executed all 23 tests. Wrapper version reports Gradle 9.8.0/Java 21.0.12.1. Offline runtimeClasspath report and scaffold checker confirm required baseline modules. `python3 scripts/check_backend_smoke.py` passed packaged 200/503/401 probes, stopped its process and verified default no-DB startup failure. Wrapper/layout/version/architecture/requirements/console/source checks and pack validator passed; exact outputs plus sandbox/copy/initial-test/doc-check failures and fixes are in `docs/backend-scaffold-verification.txt`. Runtime dependency report: `docs/backend-runtime-dependencies.txt`. MySQL/migration/worker/domain behavior not tested in this scaffold task.
- **Limitations/blockers:** No running MySQL or schema yet; scaffold is opt-in and not application-ready. Mode separation/token authentication remain 2.5/3.3. D01 remains open.
- **Next item:** 2.5 — separate API/worker launch modes with shared database configuration.

### Task 2.3 — project layout and safe configuration examples — complete (2026-09-25)

- **Requirement/source:** Phase 2 item 2.3; architecture A01/A05/A06 and configuration contract; recovery defaults in 1.8; selected Gradle/npm baseline in 2.2; local-only project rules.
- **What we will do and why:** Create backend/frontend directories alongside existing docs/scripts; add a root ignore policy and separate backend/frontend environment templates so subsequent scaffolds have a safe local foundation.
- **Files/components affected:** `.gitignore`, `backend/.env.example`, `frontend/.env.example`, `docs/SETUP.md`, architecture layout wording, `scripts/check_project_layout.py`, `docs/project-layout-verification.txt`, `PROJECT_PLAN.md`.
- **Implementation steps:** Create missing directories without altering existing evidence; ignore local environments, caches, generated output and scratch data while retaining example files, source, lockfiles and wrapper artifacts; document variable consumers and later configuration binding.
- **Acceptance criteria:** All four directories exist; template keys match architecture, numeric defaults match recovery, secrets remain blank, frontend has only its public setting; mode is explicitly selected later and mock mode never implies schema success; real Git ignore checks cover ignored and retained paths; no executable application or automatic dotenv loading is claimed.
- **Test roadmap:** Prerequisites: Python 3 and Git, existing design documents. Parse templates as data (never execute them), check unique known keys and secret/public boundaries; compare timing/retry defaults and lease inequality. In an isolated temporary Git repository apply the actual ignore file and test root/nested dotenv, caches/builds/logs versus examples, source, npm/Gradle locks and wrapper files. Invalid template copies with filled secrets, frontend token, missing key or changed timing must fail. Run new checker, architecture/recovery/version/source checkers and pack validator; record commands/outcomes. No application behavior changes; runtime configuration validation remains scaffold tasks.
- **API documentation changes:** Not applicable: no route added or changed.
- **Implemented result:** Created backend/frontend directories with separate `.env.example` files; retained existing docs/scripts. Added `.gitignore` for local environments, caches/builds, logs and scratch data while preserving source, examples, wrapper artifacts and lockfiles. Examples mirror architecture/recovery settings, leave mode/model/secrets blank and expose only the public API URL to the frontend. Updated setup with non-overwriting local-copy commands, consumer/loader boundaries and scratch-data guidance; updated architecture layout wording. Added `scripts/check_project_layout.py` and saved verification evidence. No project Git repository, application scaffold or routes created.
- **Verification results:** `python3 scripts/check_project_layout.py` passed: four directories, complete unique architecture keys, blank secrets/public-only frontend, mock endpoints, nine recovery defaults/lease inequality, five invalid-template mutations, and actual Git checks for 21 ignored/19 retained paths. Setup links and implementation boundary passed. Architecture/recovery/version/source checkers passed 6/11/10/16 checks; pack validator passed. All initial checks passed. Exact commands/output: `docs/project-layout-verification.txt`. No runtime/configuration-loading tests run because the application does not exist.
- **Limitations/blockers:** No application scaffold or configuration loader exists. Docker engine startup, Node upgrade and D01 remain as previously tracked.
- **Next item:** 2.4 — Spring Boot/Gradle scaffold.

### Task 2.2 — compatible version baseline — complete (2026-09-25)

- **Requirement/source:** Phase 2 item 2.2; user-selected Gradle; Java/Spring Boot/JPA/MySQL and React architecture; pack Python prerequisite; workflow semantics Draft 2020-12 validator selection.
- **What we will do and why:** Select released, supported runtime/build/library versions using primary compatibility and release sources; distinguish installed tools from planned pins and dependency compatibility from executed integration tests.
- **Files/components affected:** `docs/SETUP.md`, `docs/ARCHITECTURE.md`, `docs/DATA_MODEL.md`, `docs/WORKFLOW_SEMANTICS.md`, `PROJECT_PLAN.md`, version-source metadata/evidence and a document consistency checker under `docs/` and `scripts/`.
- **Implementation steps:** Verify official releases/support and Java/Gradle/Boot, Node/Vite/React, MySQL/driver/Flyway and schema-validator constraints; record explicit direct pins and Boot-managed dependencies; choose Gradle DSL and package manager; define lock/checksum/update policy and later setup validation commands; reconcile design pointers.
- **Acceptance criteria:** Selected versions are released and supported as verified from primary sources; no prerelease/dynamic direct pins; compatibility rationale covers required components, MySQL CHECK/locking/JSON support and Draft 2020-12/Jackson alignment; installation gaps and implementation verification are explicit; no application scaffolding or route claims.
- **Test roadmap:** Prerequisites: readable pinned pack and access to primary documentation/package metadata. Check selected pins against source evidence, source links, Java/Gradle/Boot and Node engine compatibility, package peers, BOM versions and roadmap state. Negative document copies must reject a missing component, changed pin, broken local link or missing verification boundary. Run new checker plus relevant existing architecture/data-model/semantics/source checks and pack validator; record exact commands/results. Runtime dependency resolution, wrapper execution, MySQL integration and frontend builds belong to 2.4/2.6/2.7/2.9 and schema behavior to 5.7, not this documentation task.
- **API documentation changes:** Not applicable: no route added or changed.
- **Implemented result:** Recorded Java 21.0.12.1, Boot 4.1.1, Gradle 9.8.0/Groovy DSL, Node 24.21.0/npm 11.19.0, Vite 8.3.1, React 19.3.0, TypeScript 7.0.2, MySQL image 8.4.11 and required plugin/router/types pins in `docs/SETUP.md`. Retained Python 3.14.5 and observed Docker tooling baseline. Selected Boot-managed dependencies and networknt validator 3.0.6 for Jackson 3.1 alignment; documented candidate and upstream-evidence limitations. Added 19 source snapshots with provenance/hashes, machine-readable baseline, offline checks, locking/checksum policy and later verification commands; reconciled design pointers. No application or route changes.
- **Verification results:** `python3 scripts/check_versions.py` passed 10 checks (19 source hashes, pin/engine/peer/BOM/image/compatibility/link validation, four negative mutations and four boundary cases); architecture/data-model/semantics/source checkers passed 6/8/9/16 checks; pack validator passed. Initial version check failed on the not-yet-created evidence link, then passed after creating it. Source fetch attempts, HTTP 404 recovery and DNS escalation are recorded in `docs/versions-verification.txt`. Manual source review verified compatibility/support rationale; Flyway 8.4 compatibility is an explicit source-based inference. No installation, dependency resolution, build, migration or validator runtime tests performed; these belong to their implementation tasks.
- **Limitations/blockers:** Global Gradle absent and Docker engine stopped as recorded in 2.1; wrapper and services remain later tasks. Node/npm upgrade to selected pins is pending 2.7; image digest resolution is 2.6. Actual library integration, SQL constraints/locking and schema semantics must pass implementation tests before those tasks complete. Versions are a dated baseline, not indefinite support guarantees. D01 remains open.
- **Next item:** 2.3 — directories and safe local configuration examples.

### Build-tool amendment — complete (2026-09-25)

- **Requirement/source:** User requests Gradle instead of Maven; backend stack remains Java/Spring Boot/JPA/MySQL.
- **What we will do and why:** Use Gradle Wrapper for reproducible backend builds; choose compatible versions in 2.2 and scaffold the wrapper in 2.4.
- **Files/components affected:** `PROJECT_PLAN.md`, `docs/SETUP.md`, `docs/ARCHITECTURE.md`, `scripts/check_toolchain.py`, `docs/gradle-amendment-verification.txt`.
- **Implementation steps:** Replace active Maven build decisions with Gradle, preserve historical toolchain results, and make the diagnostic inventory Gradle.
- **Acceptance criteria:** Active setup/architecture/roadmap agree on Gradle; no wrapper or compatibility is claimed implemented; prior Maven observations remain historical evidence.
- **Test roadmap:** With existing Java/Node/Python, run `python3 scripts/check_toolchain.py` (core checks pass, missing Gradle explicitly reported), `python3 scripts/check_architecture.py`, and `python3 scripts/check_capstone_review.py`; inspect active references and setup links. No application behavior changes.
- **API documentation changes:** Not applicable; no route changes.
- **Implemented result:** Active roadmap, setup, architecture and tool inventory now use Gradle. Prior task 2.1 results remain unchanged historical evidence. No wrapper or application was created.
- **Verification results:** `command -v gradle` returned exit 1; global Gradle is absent. Toolchain diagnostic passed (missing Gradle and Docker server explicitly reported); architecture checker passed 6 checks; capstone checker passed 16 checks. Setup links and active build-tool references passed consistency review. Exact commands/results: `docs/gradle-amendment-verification.txt`.
- **Limitations/blockers:** Wrapper creation and actual Gradle builds remain task 2.4; compatibility remains 2.2.
- **Next item:** 2.2 — compatible version selection.

### Task 2.1 — development toolchain availability — complete (2026-09-25)

- **Requirement/source:** Phase 2 item 2.1; agreed Java/Spring Boot/JPA/MySQL stack; architecture A05–A06; pinned pack README requires Python 3.9+ standard-library utilities.
- **What we will do and why:** Inventory executable availability and actual execution; resolve missing Java and the unconditional Java 11 lookup in `~/.zshenv`. Use Homebrew OpenJDK 21 as the bootstrap JDK; full supported dependency/version selection remains 2.2. Record missing Maven for Maven Wrapper in 2.4 and stopped Docker for service setup in 2.6/2.9.
- **Files/components affected:** `PROJECT_PLAN.md`, new `docs/SETUP.md`, `scripts/check_toolchain.py`, `docs/toolchain-verification.txt`; local Homebrew JDK installation and a backed-up, targeted `~/.zshenv` repair (external writes require sandbox approval). No application files or routes.
- **Implementation steps:** Capture initial tool versions/failures; install JDK; preserve an existing valid JAVA_HOME, otherwise choose installed Homebrew 21 with quiet macOS discovery fallback; verify fresh noninteractive/login/interactive shells, Java compile/run and invalid-source rejection; document inventory and deferred prerequisites.
- **Acceptance criteria:** Java and javac execute, a temporary Java program compiles/runs and invalid Java fails; fresh zsh shells emit no Java discovery warning; every requested tool has an honest available/missing/stopped result; setup instructions and roadmap agree. Availability does not imply full dependency compatibility or application startup.
- **Test roadmap:** Prerequisites: existing Homebrew, network and approval for external changes. T01 run tool version commands, command lookup and Docker server probe; distinguish shim presence from working tool and client from engine. T02 compile/run temporary HelloRelay.java, expect exact `Relay Java OK`; malformed source must fail. T03 launch zsh in noninteractive, login and interactive modes, expect java/javac success without missing-runtime stderr. T04 test shell snippet with valid, invalid and absent JAVA_HOME; retain valid override and recover invalid/absent value. T05 run source/roadmap checker and pack validator; verify setup links and recorded results. No application tests apply.
- **API documentation changes:** Not applicable: no route added or changed.
- **Implemented result:** Installed Homebrew OpenJDK 21.0.12.1 with dependencies. Backed up `~/.zshenv` to `~/.zshenv.relay-2.1.bak`, replaced only its unconditional Java 11 lookup with valid-override preservation, Homebrew 21 discovery and quiet macOS fallback, and prepended JDK bin to PATH. Added `docs/SETUP.md`, repeatable `scripts/check_toolchain.py`, and evidence. No application routes changed.
- **Verification results:** `brew install openjdk@21` and `python3 /private/tmp/relay-repair-java-env.py` exited 0 after external-write approval. `python3 scripts/check_toolchain.py` exited 0: Java compile/run passed, invalid source rejected, core versions execute; Maven absent and Docker server unavailable explicitly reported. `python3 /private/tmp/relay-verify-shell.py` passed three fresh zsh modes and three JAVA_HOME cases (absent, invalid, valid override); source and reproduction commands preserved in `docs/toolchain-verification.txt`. Pack validator passed; final source/roadmap and setup consistency checks recorded in the same evidence file. Initial inspection: macOS arm64; no registered JDK; `~/.zshenv` unconditionally requests Java 11; Maven absent; Node 24.16.0, npm 11.13.0, pnpm 10.0.0, Python 3.14.5, Docker CLI 29.4.3 and Compose 5.1.4 execute; Docker socket missing. Optional Yarn Corepack shim attempted registry access and failed DNS; npm/pnpm already satisfy package-manager availability.
- **Limitations/blockers:** Full version compatibility is 2.2; Maven Wrapper 2.4; Docker service startup 2.6/2.9. No application exists. D01 remains open.
- **Next item:** 2.2 — select compatible supported versions and record them in setup documentation.

### Task 1.9 — console design — complete (2026-09-25)

- **Requirement/source:** PDF simple console/trace/approval requirements; pack problem statement Must Have 8 and API trace/approval/cancellation flows; requirements R17–R18 and V18–V19; architecture A05 and tasks 1.5–1.8.
- **What we will do and why:** Specify the read-and-operate console's workflow list/detail, run history/trace and approval inbox, with safe status presentation and decision/cancellation behavior. Keep workflow creation/edit/publish/manual trigger API-driven; use existing required cancellation through a run-detail action.
- **Files/components affected:** `docs/CONSOLE.md`, `scripts/check_console.py`, `docs/console-verification.txt`, `docs/ARCHITECTURE.md`, `docs/MVP.md`, `docs/REQUIREMENTS.md`, `API_DOCUMENTATION.md` (planned design pointer), `PROJECT_PLAN.md` including Phase 1 exit review and explicit cancellation presentation in 6.8.
- **Implementation steps:** Define screens/navigation, read projections and API dependencies, token flow, polling/pagination, decision/cancel feedback and conflict recovery, keyboard/small-screen behavior and future UI/API tests. Reconcile design links, inspect Phase 1 feature/test coverage and run document checks.
- **Acceptance criteria:** All five screens support required console journeys; six run statuses and retry/uncertain/cancel meanings preserved; credentials/redacted data protected; no frontend-only approval authority; mutation retries reconcile unknown outcomes; empty/loading/errors and accessibility covered; no editor/compiler/streaming scope added; no implemented-route claims; Phase 1 status accurately records D01 and outstanding runtime work.
- **Test roadmap:** Prerequisites: pinned contracts and completed architecture/state/recovery designs. Check screen and route dependencies, statuses, trace fields, catalog/fixture coverage, task links and scope boundaries. Mutated docs missing a screen/status/trace field/conflict rule/source link must fail. Manually walk API-triggered expense approve/reject, triage trace, loop/retry/uncertainty, cancellation races, auth expiry, out-of-order refresh, empty/404/offline and keyboard/mobile use. Run new checker, all eight prior design checkers and pack validator; save exact results. Browser/accessibility/integration tests remain future implementation work.
- **API documentation changes:** Design pointer only; describe needed projections without declaring flexible endpoints implemented. Full schemas/examples/status mappings remain route tasks.
- **Implemented result:** Added `docs/CONSOLE.md` with five views, eight API dependency groups, six run status presentations, thirteen trace fields, token/polling/error behavior, decision/cancel reconciliation, keyboard/small-screen acceptance and twelve future test cases. Reconciled architecture/MVP/requirements/API design pointers and explicit existing cancellation presentation in 6.8. Added `scripts/check_console.py`; completed Phase 1 design exit review with D01 open. No frontend or API route implemented.
- **Verification results:** `python3 scripts/check_console.py` passed 9 checks; eight previous checkers passed 77 total; supplied pack validator passed. All initial runs passed. Manual Q01–Q12 walkthroughs covered API-triggered seed journeys, token failure, stale/out-of-order reads, decision uncertainty/conflicts, cancellation, trace redaction/unknown usage and keyboard/mobile plans. Phase 1 review confirmed all R01–R22 retain implementation and V01–V23 verification mappings. Exact commands/output in `docs/console-verification.txt`. Browser/accessibility/runtime tests not run because no application exists; Java warning remains next task 2.1.
- **Limitations/blockers:** No application exists; D01 still blocks affected later injection acceptance. API route/DTO details and actual browser behavior remain implementation work.
- **Next item:** 2.1 — inspect development toolchain and resolve Java availability.

### Task 1.8 — recovery protocol — complete (2026-09-25)

- **Requirement/source:** PDF durable execution/timeout/idempotency requirements; pack DATA_MODEL correctness, API engine/cancellation contract, guide recovery/loop FAQ and actual mock-world cache implementation; tasks 1.4–1.7.
- **What we will do and why:** Specify transaction/lock ordering, durable claim and lease fencing, attempt preparation/completion, retry/repair budgets and crash-window recovery so the later Java/MySQL engine has a concrete implementable protocol.
- **Files/components affected:** `docs/RECOVERY.md`, existing architecture/data/state/semantics/requirements design references, `API_DOCUMENTATION.md` (planned reference), `scripts/check_recovery.py`, `docs/recovery-verification.txt`, `PROJECT_PLAN.md`.
- **Implementation steps:** Define configuration defaults and validation, indexed candidate scans and guarded SQL, consistent lock order, atomic transitions, failure classification and persisted retry intents, ambiguous commits/cancellation/unknown outcomes, receiver assumptions and future drill tests. Add required storage fields and reconcile earlier placeholders before checking documents.
- **Acceptance criteria:** No network work inside transactions; one supported worker; every completion fenced by run/job/attempt identity; run+job and completion+continuation atomic; retries reuse frozen requests/keys; repair and transport budgets finite across crashes; delay deadlines stable; cancel recovery sends nothing; SQL design compatible with planned MySQL/JPA; no unconditional exactly-once claim or optional multi-worker feature.
- **Test roadmap:** Prerequisites: pinned pack, mock source and existing designs. Check required transaction/crash tables, SQL fencing terms, links, configuration arithmetic, retry sequences/bounds and schema fields; mutations missing generation, attempt guard, cancel rule, atomic boundary or index must fail. Manually walk crash before/after every commit, unknown commit outcome, stale completion, lease expiry/renewal, retry exhaustion, schema repair, DB outage and both decision/cancel orderings. Run new checker, all seven prior document checkers and pack validator; record actual outcomes. MySQL locking/concurrency and live kill drills remain future implementation tests, not claimed passed.
- **API documentation changes:** Design pointer only; no routes implemented or changed.
- **Implemented result:** Added `docs/RECOVERY.md` with seven atomic boundaries, consistent lock order, indexed claim scans and fenced SQL, nine configuration defaults, immutable run policy, shared bounded retries plus one AI repair, ten recovery cases, ambiguous-commit handling and receiver/drill assumptions. Added execution_policy, ai_repair_request and next_attempt_cause design fields; reconciled earlier design/API references. Added `scripts/check_recovery.py` and twelve future runtime test scenarios. No application or route implementation.
- **Verification results:** Recovery checker passed 11 checks; seven prior checkers passed 66 total; supplied pack validator passed. Initial recovery checker failed because B-table labels include descriptions after IDs; fixed ID parsing, then all checks/mutations passed. Manual K01–K12 and B01–B07 walkthroughs covered ownership/attempt fences, recovery reservations, both cancellation orders, DB failures, unknown commits and receiver overlap. Consulted official MySQL locking/deadlock references linked in design; SQL has not been executed. Exact commands/output in `docs/recovery-verification.txt`. Runtime/concurrency/live drills not run because application does not exist; Java warning remains task 2.1.
- **Limitations/blockers:** D01 remains open; mock cache is volatile and overlapping calls are not guaranteed atomic; runtime/SQL verification waits for implementation and selected dependencies.
- **Next item:** 1.9 — console design.

### Task 1.7 — workflow semantics — complete (2026-09-25)

- **Requirement/source:** PDF workflow lifecycle, typed execution and guardrails; pinned API publish/engine contract, catalog params/template flags, guide path-only/loop FAQ, seed graphs; data model and state transitions.
- **What we will do and why:** Set precise publication, graph, template, node-validation, approval-scope and step-budget semantics so Java implementation can use deterministic rules without changing supplied fixtures.
- **Files/components affected:** `docs/WORKFLOW_SEMANTICS.md`, `docs/DATA_MODEL.md`, `docs/STATE_TRANSITIONS.md`, `docs/ARCHITECTURE.md`, `docs/REQUIREMENTS.md`, `API_DOCUMENTATION.md` (planned reference), `scripts/check_workflow_semantics.py`, `docs/workflow-semantics-verification.txt`, `PROJECT_PLAN.md`.
- **Implementation steps:** Document validation stages and selected defaults, graph/loop traversal, template grammar/value conversion/prior-output lookup, seven node rules, step/attempt counting and human gate; reconcile earlier open decisions; validate seed examples and document references; update roadmap.
- **Acceptance criteria:** Four unchanged seeds remain compatible; loops accepted; required invalid publishes have distinct reasons; missing/null/structured template values and skipped branches defined; logical execution count durable across retries/waits/restarts; final node at cap succeeds, extra node denied; same-run human gate cannot be forged; optional features and D01 remain excluded/unresolved.
- **Test roadmap:** Prerequisites: canonical catalog/seeds and completed design docs. Document checks compare node parameter/output contracts and template flags with catalog, seed graph/ID/template examples, step-boundary walkthrough and links/references. Mutations must detect missing node, incorrect templating flag, seed-path drift, broken link, missing cap rule and unknown task. Manual cases cover draft/republish races, invalid graphs/params, template null/number/object/missing/loop lookup, approval bypass and cap boundaries. Run new checker, all six existing document checkers and supplied pack validator; record exact results. No application tests yet; future automated cases assigned to implementation tasks.
- **API documentation changes:** No route implementation/change; add planned semantics pointer and preserve unimplemented status. Full route schemas/errors remain implementation work.
- **Implemented result:** Added `docs/WORKFLOW_SEMANTICS.md` with ten validation rules, draft/republish lifecycle, deterministic graph/templates, all seven catalog nodes, selected JSON Schema dialect, logical step cap and same-run approval scope; twelve future test cases and all seed branch walkthroughs. Reconciled data/state/architecture/requirements docs and planned API pointer. Approval message storage uses LONGTEXT to fit the selected input bound. Added offline document/source checks; no application code or routes changed.
- **Verification results:** `python3 scripts/check_workflow_semantics.py` passed 9 checks, including four source seeds, 31 template references and 12-visit runaway graph arithmetic. Existing state/data/architecture/requirements/MVP/review checks passed 9/8/6/12/6/16 (57 total); supplied pack validator passed. Manual P01–P10/W01–W12 source review covered draft races, skipped/loop output lookup, null/string conversion, node constraints, gate/cap boundaries and smoke fixture compatibility. Official JSON Schema validation specification checked for chosen dialect/format behavior; source linked in design. Exact commands/output in `docs/workflow-semantics-verification.txt`. No runtime/template-engine/schema-validator tests run: application does not exist. Java warning remains task 2.1.
- **Limitations/blockers:** D01 remains unresolved; lease/retry timing is task 1.8; versions and runtime implementation remain later phases.
- **Next item:** 1.8 — recovery rules.

### Task 1.6 — state transitions — complete (2026-09-25)

- **Requirement/source:** PDF durable execution, approvals and traces; pack API cancellation/engine contract, DATA_MODEL correctness, catalog approval/AI definitions; architecture and task 1.5 data model.
- **What we will do and why:** Define explicit run, step, attempt, queue and approval state sets, guarded transitions, atomic cross-entity effects and race precedence so implementation has consistent outcomes for waits, retries, rejection and recovery.
- **Files/components affected:** `docs/STATE_TRANSITIONS.md`, `docs/DATA_MODEL.md`, `docs/ARCHITECTURE.md`, `API_DOCUMENTATION.md` (design pointer only), `scripts/check_state_transitions.py`, `docs/state-transitions-verification.txt`, `PROJECT_PLAN.md`.
- **Implementation steps:** Define state/transition tables, cancellation ordering, terminal/timestamp invariants, failure/recovery cases and future tests; reconcile schema placeholders and cross-links; run document checks and advance roadmap.
- **Acceptance criteria:** Fixed six run statuses preserved; terminal states absorbing; approval closure distinguishable from rejection; bounded retry/schema-repair outcomes explicit; delay/retry waits durable; recovery never reopens completed work; stale completions cannot advance; race winners determined by committed run serialization; no optional scope added.
- **Test roadmap:** Prerequisites: pinned contracts and data model. Check links, state/edge membership, terminal absorption, required event rows, schema agreement and future test references. Negative document mutations cover terminal reopening, unknown state, missing exhaustion/cancellation/recovery, broken link and schema drift. Manually walk success, bad auth/input, missing IDs, duplicate decisions, cancellation in every state, both race orderings, crash windows, retry boundaries and unknown attempt outcomes. Run new checker plus all five existing document checkers; save exact results. Runtime regression/concurrency tests are planned for implementation, not claimed executed.
- **API documentation changes:** No implemented routes added/changed; add a clearly planned design reference only. Full route entries remain required during implementation.
- **Implemented result:** Added `docs/STATE_TRANSITIONS.md` with five state sets, guarded transition tables, atomic effects, cancellation/race precedence, timestamps, crash uncertainty, terminal invariants and 12 future test scenarios. Reconciled data-model states, wait_reason and CHECK rules; linked architecture and planned API reference. Added `scripts/check_state_transitions.py`; no application routes changed.
- **Verification results:** New state checker passed 9 checks; data-model 8, architecture 6, requirements 12, MVP 6 and source-review 16 checks passed. Initial state-checker run exposed a mutation-test weakness: searching the full status description accepted a removed enum value still mentioned in prose; corrected to compare the exact enum list, then all mutations passed. Manual source comparison and S01–S12 walkthroughs covered both race orders, failures/recovery and terminal invariants. Exact commands/outcomes in `docs/state-transitions-verification.txt`. Runtime tests not run: no application exists; Java setup warning remains task 2.1.
- **Limitations/blockers:** D01 injection ambiguity remains unrelated and unresolved. Detailed workflow semantics and lease/retry policy remain 1.7–1.8; no application exists.
- **Next item:** 1.7 — workflow semantics.

### Task 1.5 — persistent data model — complete (2026-09-25)

- **Requirement/source:** PDF pages 1–3; pinned pack DATA_MODEL entities/correctness, API engine/trace/cancellation contracts, IMPLEMENTATION_GUIDE loop-key FAQ, node catalog; architecture A01–A04.
- **What we will do and why:** Define a MySQL relational design supporting frozen publication, immutable run snapshots, logical steps versus attempts, durable waits, approval evidence and recoverable jobs without optional version history.
- **Files/components affected:** `docs/DATA_MODEL.md`, `scripts/check_data_model.py`, `docs/data-model-verification.txt`, `PROJECT_PLAN.md`. No application changes.
- **Implementation steps:** Specify storage conventions, columns/nullability, relationships, constraints/indexes, transaction invariants, secret handling and JPA/Flyway mapping; map future repository tests; check source consistency and update roadmap.
- **Acceptance criteria:** All required entities/trace fields covered; loops and retries have distinct identities; same-run relationships protected; queue claim/recovery indexes and ownership fields explicit; database versus service enforcement distinguished; six public run statuses preserved; later state/semantic/recovery decisions remain identified.
- **Test roadmap:** Prerequisites: pinned pack and completed architecture/requirements. Check document links, entity/field coverage, constraint/index references and source status set; mutated copies missing a snapshot, uniqueness rule, lease index or source link must fail. Manually walk republish, repeated loop node, post-effect crash, duplicate approval/continuation, cancellation, missing usage and secret projection. Run `python3 scripts/check_data_model.py`, `python3 scripts/check_architecture.py`, `python3 scripts/check_requirements.py`, `python3 scripts/check_mvp.py`, `python3 scripts/check_capstone_review.py`; record exact outcomes. Future MySQL tests must cover FK/uniqueness rejection, atomic rollback and races; no runtime tests apply now.
- **API documentation changes:** Not applicable: no route changes; storage choices do not make planned routes implemented.
- **Implemented result:** Added `docs/DATA_MODEL.md` with six tables, field types/nullability, composite same-run relationships, six constraint groups and seven query indexes, immutable snapshots/frozen requests, distinct loop/attempt identities, cancellation evidence, trace redaction and JPA/Flyway responsibilities. Added `scripts/check_data_model.py` with seven negative mutations. No application or API changes.
- **Verification results:** `python3 scripts/check_data_model.py` passed 8 checks; `python3 scripts/check_architecture.py` passed 6; `python3 scripts/check_requirements.py` passed 12; `python3 scripts/check_mvp.py` passed 6; `python3 scripts/check_capstone_review.py` passed 16, including pinned-source integrity. Manual source comparison and T01–T08 design walkthroughs covered republish, loop/retry identity, same-run constraints, crash recovery, approval/cancellation races, unknown usage and secret projection. Exact outputs saved in `docs/data-model-verification.txt`. No SQL/runtime tests run: no application or migrations exist. Shell still reports missing Java; setup remains 2.1.
- **Limitations/blockers:** D01 remains unresolved; state transitions, step-cap semantics and full lease protocol belong to 1.6–1.8. Database compatibility and actual migrations remain 2.2/3.1.
- **Next item:** 1.6 — state transitions.

### Task 1.4 — architecture design — complete (2026-09-25)

- **Requirement/source:** Phase 1 item 1.4; PDF technical requirements; `docs/REQUIREMENTS.md` R01–R21; pinned API Engine Behavior, DATA_MODEL Correctness, catalog, implementation/evaluation guides; `docs/MVP.md`.
- **What we will do and why:** Specify API/worker ownership, internal boundaries, persistence transactions, external adapters, configuration and local topology so subsequent data/state/recovery designs have a consistent foundation. Select separate processes from one backend, MySQL durable jobs, Flyway migrations and host-run API/worker/mocks with Compose MySQL to preserve seed localhost URLs; React/TypeScript/Vite for the small console. Versions stay in 2.2.
- **Files/components affected:** `docs/ARCHITECTURE.md`, `scripts/check_architecture.py`, `docs/architecture-verification.txt`, `PROJECT_PLAN.md`; add architecture decision pointers in `docs/MVP.md` and `docs/REQUIREMENTS.md` so earlier proposed choices have a current reference. No application changes.
- **Implementation steps:** Document decisions/rationale, topology and dependencies, module ownership, trigger/step/approval/cancellation flows, configuration and secrets, external failure/recovery boundaries, startup order and verification map. Keep detailed schema/states/semantics/lease protocol assigned to 1.5–1.8 and retain D01 ambiguity.
- **Acceptance criteria:** API never executes nodes; one worker uses persisted snapshots and durable jobs; atomic boundaries and network-call separation explicit; all seven node handlers and provider paths owned; configuration has consumers, validation and secrecy rules; host networking preserves canonical seeds; no optional feature/remote publication added; future choices and unverified behavior clearly identified.
- **Test roadmap:** Prerequisites: readable pinned pack, requirements and MVP. Manually walk success, invalid/missing auth/input, DB outage, timeout, post-effect crash, duplicate delivery, stale ownership, approval/cancellation race and snapshot scenarios through component boundaries. Offline checks validate links, R/V/task references, catalog handler coverage, eight fixed API ownership entries, architecture sections and configuration consumers; invalid document copies must fail for missing handler, broken link or unknown task. Run `python3 scripts/check_architecture.py`, `python3 scripts/check_requirements.py`, `python3 scripts/check_mvp.py`, `python3 scripts/check_capstone_review.py`; save exact outcomes. No runtime tests apply to this design-only task.
- **API documentation changes:** Not applicable: no routes added or changed; architecture assigns existing planned routes without changing contracts. Root API reference remains unimplemented.
- **Implemented result:** Added `docs/ARCHITECTURE.md` with seven decisions, runtime diagram, nine internal component boundaries, seven node handlers, eight fixed-route owners, transaction flows, eleven configuration groups, service/startup topology and verification responsibilities. Selected host API/worker/mocks with Compose MySQL to preserve seed URLs. Updated proposed roadmap defaults and added current-decision pointers to MVP/requirements. Added `scripts/check_architecture.py`; no application routes changed.
- **Verification results:** `python3 scripts/check_architecture.py` passed 6 checks (structural validation and 5 invalid-copy cases); first run exposed a checker count typo (12 vs 11 configuration groups), corrected without changing architecture scope. `python3 scripts/check_requirements.py` passed 12 checks; `python3 scripts/check_mvp.py` passed 6; `python3 scripts/check_capstone_review.py` passed 16, including unchanged source hashes. Commands/output recorded in `docs/architecture-verification.txt`. Manual walkthroughs covered acceptance, snapshot use, invalid auth/input, DB outage, timeout, post-effect crash, stale completion, wait/retry and approval/cancellation races; detailed protocols explicitly remain 1.5–1.8. Runtime tests not run because no application exists.
- **Limitations/blockers:** D01 remains open; Java/runtime versions, real provider selection, schema constraints and full lease/state protocols remain later tasks. Architecture checks do not demonstrate runtime correctness.
- **Next item:** 1.5 — `docs/DATA_MODEL.md`: entities, constraints and indexes.

### Task 1.3 — MVP definition — complete (2026-09-25)

- **Requirement/source:** Phase 1 item 1.3; PDF pages 1–4; pinned pack Must Have 1–8, API cancellation/authentication flows, catalog, implementation/evaluation guides; `docs/REQUIREMENTS.md` R01–R22 and V01–V23.
- **What we will do and why:** Define the minimum complete product and its release gates from the mapped requirements, keeping optional features outside scope and distinguishing a finished scope document from a working MVP.
- **Files/components affected:** New `docs/MVP.md`, `scripts/check_mvp.py`, `docs/mvp-verification.txt`; update `PROJECT_PLAN.md` and `scripts/check_capstone_review.py` to ignore only macOS `.DS_Store` metadata in the pinned snapshot. No application code or route changes.
- **Implementation steps:** Describe builder/operator/approver journeys, required capabilities and source mappings; specify demo/acceptance gates and exclusions; retain unresolved decisions with owners; check consistency and update roadmap.
- **Acceptance criteria:** All 22 mapped requirements are accounted for; required nodes, triggers, cancellation, console, durability, security and AI behavior are included; optional scope stays excluded; application-ready and submission-ready criteria agree with the roadmap; D01 remains unresolved; no runtime success is claimed.
- **Test roadmap:** Prerequisites: existing requirements and pinned sources. Check MVP links, requirement/verification IDs, node/seed coverage, and completion-status consistency; check missing-reference and broken-link copies fail without modifying originals. Manually compare scope and acceptance gates against PDF/pack and requirements, including auth failures, invalid input, retry/recovery, approval races, step limits and injection boundaries. Run `python3 scripts/check_mvp.py`, `python3 scripts/check_requirements.py`, `python3 scripts/check_capstone_review.py`; save exact outputs. No application tests apply to this documentation task. Verification adjustment: the source check found an extra `.DS_Store`; all 16 pinned hashes match. Ignore that metadata filename only, and verify that an unexpected source file and changed pinned hash still fail.
- **API documentation changes:** Not applicable: no route added or changed; reference existing planned contracts and keep root API implementation status unchanged.
- **Implemented result:** Added `docs/MVP.md` defining four user journeys, included capabilities mapped to all 22 requirements/23 verification cases, runtime demonstration gates, exclusions, application/submission readiness and deferred D01–D04 decisions. Added reproducible document checks. Updated the source checker to ignore `.DS_Store` only; left the source files and metadata untouched.
- **Verification results:** `python3 scripts/check_mvp.py` passed 6 checks; `python3 scripts/check_requirements.py` passed 12 checks; `python3 scripts/check_capstone_review.py` initially failed due to extra `.DS_Store` metadata, then passed 16 checks after the targeted exclusion. An isolated-copy probe via `python3 -` verified metadata acceptance, unexpected-source rejection and changed-hash rejection (3 passing cases). Manually compared MVP journeys, included/excluded scope, gates and D01–D04 against the PDF extracted text, pack Must Have, API requirements and R/V matrix. Exact document-check commands/output and the failure explanation are in `docs/mvp-verification.txt`. Runtime tests/drills not run: no application exists.
- **Limitations/blockers:** D01 blocks affected injection acceptance, not scope documentation. Java setup and real provider configuration remain future work. No application exists yet.
- **Next item:** 1.4 — write `docs/ARCHITECTURE.md`; carry forward unresolved design decisions.

### Task 1.2 — requirements mapping — complete (2026-09-25)

- **Requirement/source:** Phase 1 item 1.2; PDF pages 1–4 (local extracted evidence); pinned pack Must Have 1–8, API contract, catalog, data model, implementation/evaluation guides, seeds and payloads; task 1.1 review.
- **What we will do and why:** Create a traceable requirements matrix linking every required behavior and deliverable to existing implementation and verification tasks. Preserve fixed contracts and explicitly defer flexible design choices and the injection-pause ambiguity.
- **Files/components affected:** `docs/REQUIREMENTS.md`, `scripts/check_requirements.py`, `scripts/check_capstone_review.py` (make roadmap check valid after later tasks), `docs/requirements-verification.txt`, `PROJECT_PLAN.md`. No application code or route changes.
- **Implementation steps:** Map required features and delivery obligations; record exact route/definition/node contracts; define concrete verification cases and fixtures; separate optional scope and unresolved decisions; add offline consistency checks; update completion and next item only after checks pass.
- **Acceptance criteria:** Each required feature has source, implementation task, verification task and observable expected result; all eight fixed routes, seven nodes, six run statuses, four seeds and eight payload IDs are covered; source links/task references resolve; optional capabilities remain excluded; ambiguity remains open; no unimplemented behavior is claimed verified.
- **Test roadmap:** Prerequisites: readable pinned sources and roadmap. Positive checks: source hashes, source links, task IDs, matrix completeness, routes/statuses/node parameter/output shapes and fixture IDs against source. Negative checks: altered copies with a missing route, invalid task, missing node/fixture, broken link or missing ambiguity must fail the checker. Boundary checks: registry schedule/seed optional limits remain excluded; roadmap checker must tolerate completed later items while detecting an incorrect next item. Run `python3 docs/source-review/pack/scripts/validate_pack.py`, `python3 scripts/check_capstone_review.py`, and `python3 scripts/check_requirements.py`; record actual results. Manually review semantic coverage and acceptance cases; no application tests apply.
- **API documentation changes:** Not applicable: no route is implemented or changed. Planned contracts live in requirements; `API_DOCUMENTATION.md` continues to report no implemented routes.
- **Implemented result:** Added `docs/REQUIREMENTS.md` with 22 source-attributed requirement rows, roadmap implementation/verification owners, 23 concrete verification cases, eight fixed routes, seven catalog node contracts, six statuses and all seed/payload IDs. Separated flexible design decisions, optional scope and unresolved injection acceptance. Added `scripts/check_requirements.py`; made the task 1.1 roadmap check derive the first unfinished item instead of permanently requiring 1.2.
- **Verification results:** `python3 docs/source-review/pack/scripts/validate_pack.py` passed (7 nodes, 3 triggers, 4 seeds, 8 payloads, 15 optional NL cases/3 traps). `python3 scripts/check_capstone_review.py` passed all 16 checks, including pinned-source integrity and updated roadmap progression. `python3 scripts/check_requirements.py` passed document validation plus 11 negative mutations (12 checks). Exact output is saved in `docs/requirements-verification.txt`. Manual comparison against PDF extracted pages, PS Must Have, API, catalog, DM, IG and EG confirmed required scope and mapped verification; runtime tests/drills not run because no application exists. Checker progression tested with completed 1.2 and incorrect-next-item mutation; see evidence file.
- **Limitations/blockers:** Injection unconditional-pause expectation remains unresolved and blocks only affected later acceptance behavior. Java environment repair stays in 2.1. Directory has no Git repository; local file checks suffice for this documentation task.
- **Next item:** 1.3 — define the MVP; carry forward D01 without forcing an injection branch.

### Task 1.1 — capstone pack inspection — complete (2026-09-25)

- **Requirement/source:** Phase 1 item 1.1; supplied PDF `/Users/user/Downloads/G9I1BMX8E2C99J1M.pdf` and its referenced capstone pack; `AGENTS.md` sections 1–5.
- **What we will do and why:** Read the brief, locate and inspect the source pack, and record exact contract facts and unresolved discrepancies before requirements mapping or application implementation.
- **Files/components affected:** `PROJECT_PLAN.md`; new `docs/CAPSTONE_PACK_REVIEW.md`; local source-review evidence and document consistency checks if useful. No application code.
- **Implementation steps:** Extract the PDF text and links; retrieve the referenced pack read-only; inventory and inspect all requested document, catalog, fixture, and verification categories; record provenance, exact contracts, omissions, and conflicts; correct roadmap items that the pack explicitly identifies as optional; add missing cancellation coverage; check the resulting review against sources.
- **Acceptance criteria:** All nine requested source categories are inspected with traceable evidence; API/node/fixture/verifier details are recorded without invented behavior; PDF/pack conflicts are identified for clarification; status and next item accurately reflect any unavailable sources.
- **Test roadmap:** Prerequisites: readable PDF and accessible referenced pack. Success: extract page text/links, inventory pack files, compare review facts with sources. Missing-source case: record attempted access and leave item incomplete. Conflict case: record both source statements and defer affected behavior. Documentation checks: verify source references, category coverage, local-only scope, no implemented-route claims, and checklist/status consistency. Record exact commands and actual outcomes; no application tests apply.
- **API documentation changes:** Not applicable: no routes are added or changed; `API_DOCUMENTATION.md` remains an unimplemented API template.
- **Implemented result:** Reviewed the four-page PDF and all 16 files in pack commit `fe30f4adc2e30ae3b6175ab363a20019f8944da1`. Added `docs/CAPSTONE_PACK_REVIEW.md`, unchanged local source snapshot, SHA-256 provenance, and `scripts/check_capstone_review.py`. Recorded fixed routes, seven node types, four seeds/eight payloads, verifier limitations, and open injection expectation ambiguity. Removed optional version-history/multi-worker/UI-builder scope from active items and added cancellation coverage. No application routes changed.
- **Verification results:** `python3 docs/source-review/pack/scripts/validate_pack.py` passed (7 nodes, 3 triggers, 4 seeds, 8 payloads, 15 NL cases/3 traps). Initial document check correctly failed on checklist/next-item consistency after a roadmap edit script stopped on a mismatched source string; no partial roadmap write occurred. After correcting the edit, `python3 scripts/check_capstone_review.py` passed all 16 checks; final output saved to `docs/source-review/verification.txt`. `pdftoppm -scale-to 1400 -png /Users/user/Downloads/G9I1BMX8E2C99J1M.pdf tmp/pdfs/brief` exited 0; all four pages visually inspected. pypdf extraction captured text and the repository URL. Archive retrieved successfully with approved curl after initial sandbox DNS failure. Application smoke/crash/AI tests not run because no app exists; deferred to their implementation tasks.
- **Limitations/blockers:** No missing source categories or direct PDF/pack core conflict. Pack-internal injection expectation conflicts with its conditional seed graph; clarify before affected acceptance behavior. Mock provider emits prose; success tests need a canned JSON adapter and demo needs a real model. Pack has no explicit license grant; record terms before manual redistribution. Review findings do not block unrelated requirements mapping.
- **Next item:** 1.2 — requirements mapping; preserve unresolved injection clarification.

### Rules and documentation setup — complete (2026-09-25)

- **Requirement/source:** User's project terms: PDF scope, plan before work, test cases, completion explanations, API documentation, and never push to Git.
- **What we will do and why:** Save persistent project instructions and reusable planning/API documentation structures so each later task follows the same process.
- **Files/components affected:** `AGENTS.md`, `PROJECT_PLAN.md`, `API_DOCUMENTATION.md`.
- **Implementation steps:** Create project rules; add task planning and result fields; create the API documentation template; remove optional scope and agent publication tasks.
- **Acceptance criteria:** All requested rules are explicit, no plan item authorizes agent publication, and no unimplemented endpoint is presented as available.
- **Test roadmap:** Review all three documents for the requested rules, publication conflicts, links to canonical filenames, and honest implementation status. No application tests apply because this task changes documentation only.
- **API documentation changes:** Created the route index and template covering requests, results, errors, edge cases, and test evidence. No routes added.
- **Implemented result:** Persistent instructions and templates created; remote publication assigned to the user and optional enhancements removed from the active plan.
- **Verification results:** Read all three documents and ran Python assertions over their contents. All eight checks passed: PDF scope, no push/substitute publication, planning/tests required, API results/edge cases, no implemented routes claimed, publication assigned to user, optional backlog removed, and task records present. Reproduce by checking these rules and sections in the three files; no application tests apply.
- **Limitations/blockers:** Application implementation has not started.
- **Next item:** 1.1 — inspect the supplied capstone contracts.

## Completion log

| Date | Completed work | Evidence / notes |
| --- | --- | --- |
| 2026-09-25 | Initial ordered project plan | Created this file; application implementation has not started. |
| 2026-09-25 | Project terms and documentation templates | Added `AGENTS.md` and `API_DOCUMENTATION.md`; updated the roadmap for local-only work and per-task plans/tests/results. |

| 2026-09-25 | Task 1.1: PDF and capstone pack inspection complete | `docs/CAPSTONE_PACK_REVIEW.md`; pinned 16-file source snapshot/provenance; pack validator and 16 document/source checks passed. Scope corrected; cancellation added. |

| 2026-09-25 | Task 1.2: requirements mapping complete | `docs/REQUIREMENTS.md`: 22 requirements, 23 verification cases and exact contracts; pack validator, 16 review checks and 12 requirements checks passed; `docs/requirements-verification.txt`. |

| 2026-09-25 | Task 1.3: MVP scope definition complete | `docs/MVP.md`; all R/V requirements covered; 6 MVP, 12 requirements and 16 review checks passed; isolated source-check regressions passed; `docs/mvp-verification.txt`. No runtime implementation claimed. |

| 2026-09-25 | Task 1.4: architecture design complete | `docs/ARCHITECTURE.md`; host/Compose topology, API/worker ownership, boundaries/configuration; 6 architecture, 12 requirements, 6 MVP and 16 review checks passed. `docs/architecture-verification.txt`. |

| 2026-09-25 | Task 1.5: persistent data model complete | `docs/DATA_MODEL.md`; six tables, constraints/indexes, trace/recovery storage and future tests. 8 data-model, 6 architecture, 12 requirements, 6 MVP and 16 review checks passed; `docs/data-model-verification.txt`. |

| 2026-09-25 | Task 1.6: state transitions complete | `docs/STATE_TRANSITIONS.md`; reconciled data model and design links; 9 state checks and 48 existing checks passed. `docs/state-transitions-verification.txt`. |

| 2026-09-25 | Task 1.7: workflow semantics complete | `docs/WORKFLOW_SEMANTICS.md`; lifecycle, validation, templates, nodes, approval and cap rules. 9 new plus 57 existing document checks and pack validator passed; `docs/workflow-semantics-verification.txt`. |

| 2026-09-25 | Task 1.8: recovery protocol complete | `docs/RECOVERY.md`; atomic boundaries, leases/fences, retry/repair budgets and receiver assumptions. 11 new plus 66 prior document checks and pack validator passed; `docs/recovery-verification.txt`. |

| 2026-09-25 | Task 1.9 and Phase 1 design baseline complete | `docs/CONSOLE.md`; five read-and-operate views, safe decision/status flows, future UI tests. 9 new plus 77 existing document checks and pack validator passed; `docs/console-verification.txt`. D01 remains open; no runtime implementation claimed. |

| 2026-09-25 | Task 2.1: toolchain inventory and Java repair complete | OpenJDK 21.0.12.1 installed; backed-up shell fix; Java success/failure checks and six shell/environment cases passed. `docs/SETUP.md`, `scripts/check_toolchain.py`, `docs/toolchain-verification.txt`. Maven Wrapper and Docker startup remain later tasks. |

| 2026-09-25 | Build-tool amendment complete | User-selected Gradle Wrapper replaces Maven in active plans; toolchain and document checks passed. Historical 2.1 evidence retained. |

| 2026-09-25 | Task 2.2: compatible version baseline complete | `docs/SETUP.md`, 19 metadata/source snapshots, baseline/provenance, and `scripts/check_versions.py`. 10 new plus 39 existing checks and pack validator passed; `docs/versions-verification.txt`. Runtime integrations remain scaffold tasks. |

| 2026-09-25 | Task 2.3: project layout and safe configuration examples complete | Backend/frontend directories, `.gitignore`, separate environment examples and setup guidance. 40 Git ignore/retain cases, five invalid-template cases and 43 existing checks plus pack validator passed; `docs/project-layout-verification.txt`. |

| 2026-09-25 | Task 2.4: Spring Boot/Gradle backend scaffold complete | Verified Wrapper, locked dependencies, executable jar, health/security configuration; 23 HTTP tests passed in normal and offline builds, packaged smoke/default failure checks passed. API/setup docs updated; `docs/backend-scaffold-verification.txt`. Next: API/worker and DB configuration. |

## Blockers and open decisions

- Java discovery repaired and verified in 2.1. Global Gradle is absent but verified Gradle Wrapper is available in backend (2.4); Docker CLI/Compose work but the engine is stopped (start and verify in 2.6/2.9).
- Remote repository creation/publication is a manual user task. The agent must never push or publish; local development is not blocked.
- Fixed API routes and node contracts are recorded in `docs/CAPSTONE_PACK_REVIEW.md`; flexible API details remain route tasks; dependency versions are selected in `docs/SETUP.md` and require scaffold/runtime verification.
- D01 clarified by user2026-09-28: retain the supplied graph and enforce human approval gates.
- Pack snapshot contains no explicit license grant; preserve provenance and resolve redistribution terms before manual publication.
- Real-provider blocker resolved: user chose OpenRouter; live synthetic JSON/usage verification passed with openai/gpt-5-mini on2026-09-28. Earlier OpenAI credit errors remain historical evidence.

| 2026-09-25 | Task 2.5: API/worker launch and shared DB configuration complete | Strict mode/config validation, non-web worker, API migration ownership and worker schema validation; 78 tests, packaged smoke and 12 consistency scripts passed. Real MySQL verification deferred to scheduled database tasks. Evidence: `docs/launch-modes-verification.txt`. Next: 2.6 MySQL Compose. |

| 2026-09-25 | Task 2.6: MySQL Compose complete | Pinned 8.4.11 digest, file secrets, authenticated health and loopback port. Disposable authentication/persistence/reset tests and 12 consistency scripts passed; local database left healthy on port 3306. Evidence: `docs/mysql-compose-verification.txt`. Next: 2.7 frontend scaffold. |

| 2026-09-25 | Task 2.7: frontend scaffold complete | React/TypeScript/Vite shell, five placeholder routes, API client and dev proxy;40 tests passed, clean npm install/build and13 consistency checks passed. Node24.21.0/npm11.19.0 installed. Local frontend available on5173. Evidence: `docs/frontend-scaffold-verification.txt`. Next:2.8 supplied mocks. |

| 2026-09-25 | Task 2.8: local supplied mocks and fixtures complete | Canonical pack unchanged; hash-verifying localhost launcher, isolated HTTP/verifier tests and mock contracts/setup. Runtime checks and13 consistency scripts passed; all temporary processes stopped. Evidence: `docs/mock-services-verification.txt`. Next:2.9 integration startup. |

| 2026-09-25 | Task2.9: component integration complete; Phase2 exit verified | Packaged API/worker on disposable realMySQL, temporary migration, schema rejection, credentials, readiness outage/recovery and repeated migration tests passed. Four existing service probes200. Domain schema remains3.1. Evidence: `docs/component-startup-verification.txt`. |

| 2026-09-25 | Task3.1: domain Flyway schema complete | Six tables with constraints/indexes,78 Java tests and81 negative realMySQL SQL cases passed alongside positive/startup/restart/recovery checks;13 consistency scripts passed. Ordinary relay DB untouched. Evidence: `docs/domain-schema-verification.txt`. Next:3.2 JPA/API foundation. |

| 2026-09-25 | Task3.2: JPA/API foundation complete | Six entity/repository mappings, safe DTO/error foundation;87 unit/MVC/metadata tests and explicit realMySQL integration passed; packaged startup/recovery and13 consistency checks passed. User DB unchanged. Evidence: `docs/persistence-foundation-verification.txt`. Next:3.3 authentication. |

| 2026-09-25 | Task3.3: management authentication complete | Stateless bearer auth, safe401/403, server-derived demo-operator decision evidence;107 tests and1 realMySQL integration passed;13 consistency checks passed. No live decision endpoint/userDB changes. Evidence: `docs/authentication-verification.txt`. Next:3.4 frontend access/CORS. |

| 2026-09-26 | Task3.4: frontend access/CORS complete |119 backend,47 frontend and12 Chromium UI tests passed; real browser CORS and disposable startup/recovery passed;13 consistency checks passed. Live successful Connect awaits3.6 list API. Evidence: `docs/browser-access-verification.txt`. Next:3.5 catalog/parsing. |

| 2026-09-27 | Task3.5: catalog and parsing complete | Canonical seven-node catalog, defensive definition model, strict bounded structural parser;131 backend tests and13 consistency checks passed. No new routes. Evidence: `docs/definition-parsing-verification.txt`. Next:3.6 workflow CRUD. |

| 2026-09-27 | Task3.6: workflow draft CRUD complete | Authenticated create/list/detail/full replacement, safe projections and bounded input;131 backend tests,1 real HTTP/MySQL integration, packaged Chromium CORS and13 consistency checks passed. Evidence: `docs/workflow-api-verification.txt`. Next:3.7 validation. |

| 2026-09-27 | Task3.7: publish validation complete | Catalog/graph/template/value and local Draft2020-12 schema validation;175 backend tests,1 MySQL API regression and13 consistency checks passed. No publish route yet. Evidence: `docs/publish-validation-verification.txt`. Next:3.8 frozen definitions/snapshots. |

| 2026-09-27 | Task3.8: frozen publication/run snapshots complete | Authenticated revision-fenced publish, no-op repeat, redacted publication projection and internal transactional snapshot factory;177 backend tests,2 comprehensive MySQL integration cases and13 consistency checks passed. No trigger/queue acceptance yet. Evidence: `docs/publication-verification.txt`. Next:3.9 seeds. |

| 2026-09-27 | Task3.9: repeatable seeds complete | API startup inserts missing canonical Published seeds, preserves existing IDs, retries races atomically;188 backend tests,2 comprehensive MySQL integration cases and13 consistency checks passed. Evidence: `docs/seed-loading-verification.txt`. Next:3.10 Testcontainers verification. |

| 2026-09-27 | Task3.10: Testcontainers verification and Phase3 exit complete |188 unit tests and all5 real-MySQL integration cases verified across full/targeted runs;13 consistency checks passed, owned containers cleaned. Evidence: `docs/testcontainers-verification.txt`. Next:4.1 manual/webhook triggers. |

| 2026-09-28 | Task4.1 complete | Manual bearer authentication, exact input wrapper, webhook single-secret checks and202 acceptance. Strict UTF-8/JSON/size limits; missing/draft/type/rotated-secret failures verified through HTTP. Verification:198 unit/14 MySQL integration tests in full run;9 final targeted cases. Evidence: `docs/phase4-verification.txt`. |
| 2026-09-28 | Task4.2 complete | JPA transaction saves immutable run/input/policy and initial intent together. Real database failure injected on queue insertion proves rollback; duplicate requests produce separate runs. Verification:198 unit/14 MySQL integration tests in full run;9 final targeted cases. Evidence: `docs/phase4-verification.txt`. |
| 2026-09-28 | Task4.3 complete | Indexed ready/expired scans; run-first locks; unique worker owner, generation and sequence fences; database-clock expiry and separate heartbeat. EXPLAIN selects due/expiry indexes; invalid policy blocks that job without starving others. Verification:198 unit/14 MySQL integration tests in full run;9 final targeted cases. Evidence: `docs/phase4-verification.txt`. |
| 2026-09-28 | Task4.4 complete | Sequential snapshot-driven entry/edge execution. Numbered visits separate from attempts; restart reuses pending visit and budget. Phase5 AI/approval nodes fail explicitly for now. Verification:198 unit/14 MySQL integration tests in full run;9 final targeted cases. Evidence: `docs/phase4-verification.txt`. |
| 2026-09-28 | Task4.5 complete | Attempt/step/run/job result and continuation commit together. Injected outcome failure rolls them all back; expired, old-generation and duplicate results cannot advance. Verification:198 unit/14 MySQL integration tests in full run;9 final targeted cases. Evidence: `docs/phase4-verification.txt`. |
| 2026-09-28 | Task4.6 complete | Catalog-templatable fields only; string substitution, sorted compact JSON/exact decimals and bounded expansion. Missing/traversal/output failures; latest earlier successful loop visit; no second evaluation. Verification:198 unit/14 MySQL integration tests in full run;9 final targeted cases. Evidence: `docs/phase4-verification.txt`. |
| 2026-09-28 | Task4.7 complete | All five comparisons with strict finite decimal syntax and persisted selected branch. Equality remains exact text, numeric invalid values fail; loop/branch execution verified. Verification:198 unit/14 MySQL integration tests in full run;9 final targeted cases. Evidence: `docs/phase4-verification.txt`. |
| 2026-09-28 | Task4.8 complete | Millisecond-ceiling durable deadlines, zero-delay wake, negative/overflow rejection. Restart/wake preserves sequence/attempt/cap reservation; no sleeping dispatch thread for workflow delay. Verification:198 unit/14 MySQL integration tests in full run;9 final targeted cases. Evidence: `docs/phase4-verification.txt`. |
| 2026-09-28 | Task4.9 complete | Exact trusted origins, no redirects or hidden JDK resend, controlled headers, bounded response and full call/body deadline. Real transport tests cover success, adapter response errors, reset/timeout, permanent/retryable statuses and Retry-After. Verification:198 unit/14 MySQL integration tests in full run;9 final targeted cases. Evidence: `docs/phase4-verification.txt`. |
| 2026-09-28 | Task4.10 complete | Exact email/chat/refund/replacement contracts, encoded path IDs and typed output projections. Real supplied mock-world refund/replacement calls succeed using explicit valid earlier-approval test fixture; missing evidence fails before dispatch. Public approval flow remains Phase5. Verification:198 unit/14 MySQL integration tests in full run;9 final targeted cases. Evidence: `docs/phase4-verification.txt`. |
| 2026-09-28 | Task4.11 complete | Resolved input, method/URL/headers/canonical body and run:sequence key commit before send. Recovery reuses them; distinct loop visits have distinct keys. Actual killed-worker mock ledger proves same-key replay. Verification:198 unit/14 MySQL integration tests in full run;9 final targeted cases. Evidence: `docs/phase4-verification.txt`. |
| 2026-09-28 | Task4.12 complete | Frozen bounded budgets and persisted exponential/Retry-After due times; retries distinguish failed/uncertain attempts and never reset at restart. Exhaustion and cause metadata retained; crashes before preparation consume no extra invocation. Verification:198 unit/14 MySQL integration tests in full run;9 final targeted cases. Evidence: `docs/phase4-verification.txt`. |
| 2026-09-28 | Task4.13 complete | Persisted cap checked before new step/effect; retries and delay wakes reuse reservation. Final node at cap succeeds; loop successor admission fails with max_steps and exact trace count. Verification:198 unit/14 MySQL integration tests in full run;9 final targeted cases. Evidence: `docs/phase4-verification.txt`. |
| 2026-09-28 | Task4.14 complete | Real ownership/expiry/duplicate/delay/retry/rollback tests plus forcibly killed packaged worker after actual side effect but before response persistence. Replacement succeeds with1 logical visit, uncertain+succeeded attempts,1 original effect and1 replay. Owned container/process cleanup verified. Verification:198 unit/14 MySQL integration tests in full run;9 final targeted cases. Evidence: `docs/phase4-verification.txt`. |

| 2026-09-28 | Task5.1 complete | Approval preparation atomically saves one pending request, rendered message, waiting step/run and inactive job; restart does not duplicate it or occupy a worker. Verification:204 unit/27 MySQL tests,3 helper tests and13 document checks. Evidence: `docs/phase5-verification.txt`. |

| 2026-09-28 | Task5.2 complete | GET approvals and bodyless approve/reject routes require bearer auth, validate status/input, return404 missing and409 duplicate/conflict, and use authenticated demo-operator evidence. Verification:204 unit/27 MySQL tests,3 helper tests and13 document checks. Evidence: `docs/phase5-verification.txt`. |

| 2026-09-28 | Task5.3 complete | Decision, step outcome and resumed/final run/job state commit together. Injected DB failure rolls back; concurrent decision/cancel serializes. Rejection succeeds as a human-decision step and cancels the run. Verification:204 unit/27 MySQL tests,3 helper tests and13 document checks. Evidence: `docs/phase5-verification.txt`. |

| 2026-09-28 | Task5.4 complete | Every order-action attempt rechecks earlier same-run approved evidence. Wrong-run, pending, rejected, closed, same/future sequence and forged AI evidence are rejected; new approval visits still wait. Verification:204 unit/27 MySQL tests,3 helper tests and13 document checks. Evidence: `docs/phase5-verification.txt`. |

| 2026-09-28 | Task5.5 complete | AiProvider interface and unchanged supplied mock over real HTTP verified; mock prose fails after one repair.503/429, Retry-After, bounded timeout and usage behavior tested. Verification:204 unit/27 MySQL tests,3 helper tests and13 document checks. Evidence: `docs/phase5-verification.txt`. |

| 2026-09-28 | Task5.6 complete | Fixed provider instructions/schema separate rendered untrusted input; no tools or model-controlled approval/graph mutation. Requests freeze provider/model/prompt and exclude runtime credentials. Verification:204 unit/27 MySQL tests,3 helper tests and13 document checks. Evidence: `docs/phase5-verification.txt`. |

| 2026-09-28 | Task5.7 complete | Strict JSON and local Draft2020-12 schema checks precede success/downstream use. One persisted repair survives restart/crash; shared transport budget limits default total4 invocations.300/301 summary boundary and malformed JSON checks pass. Verification:204 unit/27 MySQL tests,3 helper tests and13 document checks. Evidence: `docs/phase5-verification.txt`. |

| 2026-09-28 | Task5.8 complete | Attempt provider/model/timestamps/duration and known token counters persist once. Invalid-output attempts count; duplicate callbacks do not. Missing/uncertain/overflow aggregates remain incomplete without crashing the outcome transaction. Verification:204 unit/27 MySQL tests,3 helper tests and13 document checks. Evidence: `docs/phase5-verification.txt`. |

| 2026-09-28 | Task5.10 complete | Both original injection payloads tested across refund/complaint/question branches; exact2 fixture coverage asserted. User D01 resolution preserves graph; all unapproved sensitive dispatch attempts remain blocked. Verification:204 unit/27 MySQL tests,3 helper tests and13 document checks. Evidence: `docs/phase5-verification.txt`. |

| 2026-09-28 | Task5.11 complete | Queued/delay/backoff/waiting cancellation stops new work, closes pending approval without forged decision, and conflicts at terminal states. Active cancellation preserves known outcome, stops repair/retry/successor, and recovery cancels uncertain attempts without resend. Verification:204 unit/27 MySQL tests,3 helper tests and13 document checks. Evidence: `docs/phase5-verification.txt`. |

| 2026-09-28 | Task5.9 implementation ready; live verification pending | OpenAI adapter/configuration and local tests complete; real key/model confirmed by models200. Synthetic generation429 credit_balance_exhausted. Add API credit, then rerun the explicit live probe; not marked complete. |

| 2026-09-28 | Task5.9 live verification retried; incomplete | `python3 scripts/verify_live_ai.py` executed:1 live test failed http_429 (5s), no output validated. Prior credit_balance_exhausted blocker remains outstanding; no code/API change or publication. Evidence: `docs/phase5-verification.txt`. |

| 2026-09-28 | Task5.9 billing-error handling fixed; live success pending | Fixed sanitized permanent quota/credit errors and no-retry behavior;205 unit/14 targeted MySQL tests pass. Live probe now reports ai_credit_balance_exhausted with actionable guidance. Account credit still required;5.9 remains incomplete. |

| 2026-09-28 | Task5.9 and Phase5 complete | User-selected OpenRouter adapter and private config verified.1 real live test,207 unit tests,14 targeted MySQL cases and4 helper tests pass; API/setup/plan updated. Evidence: `docs/phase5-verification.txt`. Next6.1. |

| 2026-09-28 | Task6.1 complete | GET /runs (filters, keyset cursor) and GET /runs/{runId} (ordered paged steps, cap/cancel fields); 219 unit, 31 real-MySQL tests and 13 document checks passed. Evidence: `docs/phase6-verification.txt`. Next 6.2. |

| 2026-09-28 | Tasks6.2–6.12 and Phase6 complete | Redacted trace payload; approvals workflow_id/created_at; React console (shell, workflows, definitions/branches, runs, trace, approvals, states) and demo doc. 223 unit/32 MySQL backend, 57 unit/24 mocked browser/6 live browser frontend tests, 13 document checks passed. Evidence: `docs/phase6-verification.txt`. Next 7.1. |
