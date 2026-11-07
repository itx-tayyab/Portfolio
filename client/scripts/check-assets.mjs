#!/usr/bin/env node
/**
 * Verifies that every /images/... path referenced in src/ exists in public/
 * with the exact same letter case. Vercel's filesystem is case-sensitive, so
 * a path that works on macOS or Windows can 404 in production.
 *
 * Also lists files in public/images that nothing references (warning only).
 *
 * Usage: npm run check:assets   (exit code 1 on any missing path)
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const srcDir = join(root, "src");
const publicDir = join(root, "public");

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

/** Case-exact existence check: compares each path segment to the real directory listing. */
function existsExact(publicPath) {
  let dir = publicDir;
  for (const segment of publicPath.split("/").filter(Boolean)) {
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      return false;
    }
    if (!entries.includes(segment)) return false;
    dir = join(dir, segment);
  }
  return true;
}

// Resolve simple `const NAME = "/images/..."` prefixes used in template literals.
const constPattern = /const\s+(\w+)\s*=\s*["'`](\/images[^"'`]*)["'`]/g;
const pathPattern = /\/images\/[^"'`\s)]+/g;

const referenced = new Map(); // path -> [file:line]
for (const file of walk(srcDir).filter((f) => /\.(tsx?|jsx?|mjs|css)$/.test(f))) {
  let text = readFileSync(file, "utf8");
  for (const [, name, value] of text.matchAll(constPattern)) {
    text = text.replaceAll("${" + name + "}", value);
  }
  text.split("\n").forEach((line, i) => {
    for (const match of line.matchAll(pathPattern)) {
      const where = `${relative(root, file)}:${i + 1}`;
      referenced.set(match[0], [...(referenced.get(match[0]) ?? []), where]);
    }
  });
}

const missing = [...referenced].filter(([path]) => !existsExact(path));
const onDisk = walk(join(publicDir, "images")).map((f) => "/" + relative(publicDir, f).split(sep).join("/"));
const unreferenced = onDisk.filter((p) => !referenced.has(p));

console.log(`Checked ${referenced.size} referenced asset paths.`);
if (unreferenced.length) {
  console.log(`\nUnreferenced files in public/images (${unreferenced.length}):`);
  for (const p of unreferenced) console.log(`  ${p}`);
}
if (missing.length) {
  console.error(`\nMissing or wrong-case paths (${missing.length}):`);
  for (const [path, where] of missing) console.error(`  ${path}\n    used in ${where.join(", ")}`);
  process.exit(1);
}
console.log("\nAll referenced assets exist with exact case.");
