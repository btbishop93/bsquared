# Technical Design Document (TDD) – Bsquared Interactive Portfolio

## 1. Architecture

Monorepo with bun workspaces:

```
/apps
  /web       # Next.js + xterm.js + Easy Mode
  /indexer   # ingestion + embeddings
  /ssh       # ssh2 server wrapper
  /telemetry # posthog events

/packages
  /agent-core # LLM loop + command dispatcher
  /tools      # slash commands + RAG tools
  /data       # zod schemas, types
  /tui        # opentui layouts, widgets, keymaps
```

## 2. Components

### Slash Commands

- `/message`: capture text + email → Resend/email pipeline.
- `/download`: return signed URL for resume.pdf (hosted in Supabase/S3).
- `/skills`: return curated markdown file.
- `/achievements`: curated markdown.
- `/links`: static list (GitHub, LinkedIn, projects).
- `/references`: structured list with quotes.
- `/tldr`: self-pitch.

### LLM Agent

- Model: gpt-4.1-mini (fast, cost efficient).
- RAG: Supabase pgvector.
- Flow: parse → dispatch command if `/`; else → LLM + RAG. If low confidence → fallback with /message.

### TUI (opentui)

- Input bar + output pane.
- Keymaps: Ctrl-C exit, Ctrl-L clear, ↑/↓ history.
- Toolbar on mobile web for Esc/Ctrl/Tab/Arrows.

### Web

- Next.js app.
- `/terminal`: xterm.js + WS proxy to opentui session.
- `/`: Easy Mode markdown portfolio.
- PWA support: offline cache for Easy Mode.

### SSH

- System user `bsq` with login shell set to `bsq` binary, or ssh2 server wrapper.

## 3. Data Sources

- resume.pdf + resume.json
- skills.md
- achievements.md
- links.json
- references.md
- tldr.md
- curated GitHub repos
- personality.md

## 4. Distribution

- Web app on Vercel.
- SSH via system login.

## 5. Security

- Validate email on /message.
- Rate limit web/SSH.
- Redact sensitive patterns in logs.
- Idle timeout on sessions.

## 6. Observability

- PostHog events: command_executed, ai_query, resume_downloaded, message_submitted.
- Anonymous session IDs.

## 7. Mobile Support

- xterm.js + `xterm-addon-fit` for resizing.
- Toolbar for special keys (Esc, Ctrl, Arrows).
- Hidden input to trigger keyboard reliably.
- Dynamic viewport height (100dvh) + safe-area insets.
- PWA cache for Easy Mode.

## 8. Risks

- Native binding issues with opentui → prebuild with prebuildify.
- LLM hallucinations → require citations, fallback.
- Abuse via /message → CAPTCHA + rate limits.
- Resume hosting issues → stable S3/Supabase bucket.

## 9. Milestones

- M1: Web terminal + Easy Mode.
- M2: SSH support + installers.
- M3: AI + RAG.
- M4: Mobile toolbar + PWA.
- M5: Telemetry + polish.
