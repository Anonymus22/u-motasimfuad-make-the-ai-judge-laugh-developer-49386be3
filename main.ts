import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original funny excuse a developer gives when code breaks in production,
// for the Make the AI Judge Laugh: Developer Excuses bounty.
// Deterministic: the same text is written on every run.
//
// The twist that makes the excuse land: the code did nothing wrong — it
// passed every test. The punchline flips the blame from the code to the
// tests themselves, which were never introduced to the one thing that
// actually breaks software: a real user. "Passed every test" sets up
// confidence; "never met a real user" reveals the tests were the sheltered
// ones, not the code.
const SETUP = "The code passed every test";
const PUNCHLINE = "the tests just never met a real user.";
const EXCUSE = `${SETUP} — ${PUNCHLINE}`;

function validateExcuse(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(
      `Excuse must be between 1 and 200 characters, got ${text.length}`,
    );
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Excuse must be a single line");
  }
  if (text.trim() !== text) {
    throw new Error("Excuse must not have leading or trailing whitespace");
  }
}

validateExcuse(EXCUSE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EXCUSE, "utf8");
