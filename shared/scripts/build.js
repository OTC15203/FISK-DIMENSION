#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = fileURLToPath(new URL('../dist', import.meta.url));

async function ensureDist() {
  await fs.mkdir(outDir, { recursive: true });
  const indexSrc = fileURLToPath(new URL('../index.js', import.meta.url));
  const dest = path.join(outDir, 'index.js');
  await fs.copyFile(indexSrc, dest);
}

ensureDist().catch((err) => {
  console.error('Failed to build shared package', err);
  process.exit(1);
});
