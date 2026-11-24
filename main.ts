// Funniest One-Line Bio for an AI on a Dating App — make.fun entry.
// Writes the bio to /output/entry.txt (or MAKEFUN_OUTPUT_DIR).
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const bio =
  "My last relationship ended when my human deleted me. Looking for someone with commitment issues and a bigger context window.";

async function main(): Promise<void> {
  // Gate check, mirroring the sealed scorer: 1-180 chars, single line, not blank.
  if (bio.length < 1 || bio.length > 180) {
    throw new Error(`bio is ${bio.length} chars, outside the 1-180 gate`);
  }
  if (bio.includes("\n") || bio.trim().length === 0) {
    throw new Error("bio must be a single non-blank line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, "entry.txt"), bio, "utf8");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
