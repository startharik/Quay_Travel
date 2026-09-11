import { mkdir, copyFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const sourceDir = join(root, "node_modules", "@electric-sql", "pglite", "dist");
const targetDir = join(root, ".vercel", "output", "functions", "__server.func", "_libs");

await mkdir(targetDir, { recursive: true });
for (const filename of ["pglite.wasm", "initdb.wasm"]) {
  await copyFile(join(sourceDir, filename), join(targetDir, filename));
}
