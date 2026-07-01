/**
 * Resume ↔ website fact-sync check.
 *
 * The resume PDF (`data/resume/resume.tex`) and the website both describe the
 * same career, but at different depths on purpose: the resume is terse, the
 * website's `description` prose is a richer superset. The one thing that must
 * NOT drift between them is the hard facts — metrics, counts, and dollar
 * amounts.
 *
 * `data/resume.json` is the canonical source. Each work entry carries a concise
 * `bullets` array (the resume-grade content) alongside its richer `description`
 * (website-only). This check compares the metric tokens in `bullets` against
 * the Work Experience bullets in the `.tex`, in both directions, and fails if
 * they disagree. The website `description` is intentionally not checked.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const RESUME_JSON = join(REPO_ROOT, "data", "resume.json");
const RESUME_TEX = join(REPO_ROOT, "data", "resume", "resume.tex");

// Matches dollar amounts ($2M+, $750K), percentages (86%), and counts
// (2,000+, 12), plus multipliers (4×, 3x). These are the high-signal facts
// that must stay identical across formats.
const METRIC_PATTERN = /\$\d[\d,]*(?:\.\d+)?[kmb]?\+?|\d[\d,]*\+?%|\d[\d,]*(?:×|x\b)|\d[\d,]*\+?/gi;

interface ResumeRole {
  bullets?: string[];
}

interface ResumeEntry {
  bullets?: string[];
  roles?: ResumeRole[];
}

interface ResumeData {
  work: ResumeEntry[];
}

function normalizeToken(token: string): string {
  return token.toLowerCase().replace(/×/g, "x").replace(/,/g, "");
}

function extractMetrics(text: string): Set<string> {
  const matches = text.match(METRIC_PATTERN) ?? [];
  return new Set(matches.map(normalizeToken));
}

function collectJsonBullets(data: ResumeData): string {
  const bullets: string[] = [];
  for (const entry of data.work) {
    if (entry.bullets) bullets.push(...entry.bullets);
    for (const role of entry.roles ?? []) {
      if (role.bullets) bullets.push(...role.bullets);
    }
  }
  return bullets.join("\n");
}

function extractTexWorkBullets(tex: string): string {
  const start = tex.indexOf("\\section{Work Experience}");
  const end = tex.indexOf("\\section{Skills}");
  const region = tex.slice(start === -1 ? 0 : start, end === -1 ? undefined : end);

  const cleaned = region
    .replace(/\\%/g, "%")
    .replace(/\\\$/g, "$")
    .replace(/\\textbf\{([^}]*)\}/g, "$1");

  return cleaned
    .split("\n")
    .filter((line) => line.trimStart().startsWith("\\item"))
    .join("\n");
}

function main(): void {
  const data = JSON.parse(readFileSync(RESUME_JSON, "utf8")) as ResumeData;
  const tex = readFileSync(RESUME_TEX, "utf8");

  const jsonMetrics = extractMetrics(collectJsonBullets(data));
  const texMetrics = extractMetrics(extractTexWorkBullets(tex));

  const missingFromTex = [...jsonMetrics].filter((m) => !texMetrics.has(m));
  const missingFromJson = [...texMetrics].filter((m) => !jsonMetrics.has(m));

  if (missingFromTex.length === 0 && missingFromJson.length === 0) {
    console.log("resume.json bullets and resume.tex agree on all metrics.");
    return;
  }

  if (missingFromTex.length > 0) {
    console.error(
      `Metrics in resume.json bullets but missing from resume.tex: ${missingFromTex.join(", ")}`,
    );
  }
  if (missingFromJson.length > 0) {
    console.error(
      `Metrics in resume.tex but missing from resume.json bullets: ${missingFromJson.join(", ")}`,
    );
  }
  process.exit(1);
}

main();
