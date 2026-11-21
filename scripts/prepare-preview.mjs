import fs from 'node:fs/promises';
const directory = '_preview';
// Preserve the /site/ links already shared while serving the same website at the root.
const entries = await fs.readdir(directory, {withFileTypes: true});
await fs.mkdir(`${directory}/site`, {recursive:true});
for (const entry of entries) {
  if (entry.name === 'site') continue;
  await fs.cp(`${directory}/${entry.name}`, `${directory}/site/${entry.name}`, {recursive:true});
}
