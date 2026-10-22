# Valdespou

A personal follow-up desk for scheduling requests and important unanswered messages from Gmail and Instagram, with Google Calendar as the planned calendar destination.

## Current version

This is a runnable prototype using **sample conversations only**. It does not connect to accounts, read messages, infer importance, send replies, create calendar events, or deliver background reminders. Review and dismiss actions are saved only in this browser’s local storage. Reset sample data restores the examples. No credentials are needed for the prototype.

## Development

Requires Node.js 22 or later. No external runtime dependencies.

```sh
cd /workspace/Valdespou
npm ci --ignore-scripts
npm test
npm start
```

The default port is 3000; override with `PORT`. `GET /api/health` reports demo mode and connection status. Use the existing checkout in cloud tasks; do not create a worktree unless requested.

## Live integration work still required

1. Register a Google OAuth web application for Gmail and Google Calendar. Configure a real deployment origin and redirect URL, enable the relevant APIs, and complete Google’s verification requirements where applicable. Users must authorize access; never supply account passwords. Choose minimum scopes based on the final read, draft, and calendar operations.
2. Implement server-side OAuth, encrypted token persistence, account isolation, revocation, incremental synchronization, and refresh handling. Keep all secrets outside Git. A public deployment needs user authentication before storing private messages.
3. Confirm Instagram professional account eligibility and the current Meta login route. Facebook Page linking depends on the integration route. Configure Meta permissions, webhooks, and review requirements for that route. Messaging permission and policy restrictions apply; unrestricted automatic replies cannot be assumed.
4. Define “important” and reminder timing with the user. Track sent replies as well as incoming messages so resolved threads stop generating reminders. Add durable storage and scheduled jobs with retries and duplicate prevention.
5. Extract proposed dates with timezone and ambiguity handling. Require approval of recipient, exact date, time, and duration before calendar creation. Review suggested replies before any send.
6. Add integration tests with authorized test accounts and verify actual message sync, answered-thread resolution, calendar event creation, and reminder delivery. The current tests verify the prototype server only.

Never commit `.env`, OAuth tokens, or private message exports. GitHub publication and public app deployment are separate from publishing the Codex environment snapshot.
