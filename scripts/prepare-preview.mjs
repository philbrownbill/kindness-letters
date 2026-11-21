import fs from 'node:fs/promises';
// Download the licensed stock image into the deployment, avoiding a visitor-side external request.
const directory = '_preview';
const remote = 'https://images.pexels.com/photos/5588367/pexels-photo-5588367.jpeg?auto=compress&cs=tinysrgb&w=1200';
try {
  const response = await fetch(remote, {signal: AbortSignal.timeout(20000)});
  if (!response.ok) throw new Error(`Photo download returned ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) throw new Error('Photo response is not a JPEG');
  await fs.writeFile(`${directory}/assets/friends-hugging.jpg`, bytes);
  const html = await fs.readFile(`${directory}/index.html`, 'utf8');
  await fs.writeFile(`${directory}/index.html`, html.replace(remote.replaceAll('&', '&amp;'), 'assets/friends-hugging.jpg'));
  console.log('Stock photo included in the deployment.');
} catch (error) {
  console.warn(`::warning::${error.message}. Keeping the external photo and letter-art fallback.`);
}
// Preserve the /site/ links already shared while serving the same website at the root.
const entries = await fs.readdir(directory, {withFileTypes: true});
await fs.mkdir(`${directory}/site`, {recursive:true});
for (const entry of entries) {
  if (entry.name === 'site') continue;
  await fs.cp(`${directory}/${entry.name}`, `${directory}/site/${entry.name}`, {recursive:true});
}
