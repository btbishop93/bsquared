# Product Requirements Document (PRD) – Bsquared Interactive Portfolio

## 1. Overview

The **Bsquared Portfolio** is an interactive, terminal-style interface (SSH, and web terminal) that lets users explore Brenden’s career, skills, and achievements.

Instead of scrolling through a static portfolio, users can run **slash commands** and chat with an **AI agent** trained on curated context (resume, skills, GitHub projects, achievements, references).

## 2. Goals

- Provide an engaging, dev-centric portfolio experience.
- Support both structured commands (skills, resume, achievements) and open Q&A via LLM.
- Enable recruiters, hiring managers, and peers to download my resume, see references, and get a TL;DR pitch.
- Ensure graceful fallback when AI cannot answer (redirect to /message).

## 3. Target Users

- Recruiters: want a quick, clear understanding of skills & pitch.
- Hiring managers / Engineers: want technical depth and GitHub projects.
- Peers / Network: want references, personality, and ways to contact.

## 4. Core Features

### Commands

- `/message <text>` – user leaves a message for Brenden (requires email).
- `/download` – provides PDF download of resume.
- `/skills` – lists skills, frameworks, and technologies.
- `/achievements` – highlights most important career achievements.
- `/links` – GitHub, LinkedIn, project/demo links.
- `/references` – reference contacts and quotes.
- `/tldr` – concise self-pitch.

### AI Interaction

- Freeform Q&A with the LLM.
- Uses RAG context (resume, skills, projects, achievements, personality docs).
- If unsure: fallback with option to leave a message.

## 5. Success Criteria

- Commands work across SSH, and web.
- AI answers are cited, concise, and relevant.
- Fallback offered when answer is uncertain.
- Distribution: SSH, and web at bsquared.dev.
- Resume downloadable, references viewable, messages capturable.

## 6. Platforms

- **SSH** (connect to bsquared.dev → auto-launch TUI).
- **Web** (Next.js + xterm.js terminal, plus Easy Mode markdown portfolio).
- **Mobile web** (responsive terminal + toolbar + PWA Easy Mode).

## 7. Deliverables & Milestones

- M1: SSH TUI with basic commands.
- M3: Web terminal + Easy Mode site.
- M4: RAG + AI Q&A + fallback messaging.
- M5: Mobile toolbar + PWA support.
- M6: Telemetry.
