// Copies the Thicket API schema into schema/thicket-api.graphql.
// Uses a sibling ../thicket-api checkout when present, otherwise the API's
// main branch on GitHub. Set THICKET_SCHEMA_SOURCE=remote to force GitHub.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const LOCAL = new URL('../../thicket-api/schema/schema.graphql', import.meta.url);
const REMOTE = 'https://raw.githubusercontent.com/mtyates-coderabbit/thicket-api/main/schema/schema.graphql';
const TARGET = new URL('../schema/thicket-api.graphql', import.meta.url);

let sdl;
if (process.env.THICKET_SCHEMA_SOURCE !== 'remote' && existsSync(LOCAL)) {
  sdl = readFileSync(LOCAL, 'utf8');
  console.log('Pulled schema from ../thicket-api');
} else {
  const response = await fetch(REMOTE);
  if (!response.ok) throw new Error(`Failed to fetch schema: ${response.status}`);
  sdl = await response.text();
  console.log(`Pulled schema from ${REMOTE}`);
}
writeFileSync(TARGET, sdl);
