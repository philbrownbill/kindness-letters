import fs from 'node:fs';
import vm from 'node:vm';
const context = { window: {} };
vm.runInNewContext(fs.readFileSync('site/config.js', 'utf8'), context);
const c = context.window.KINDNESS_CONFIG;
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) throw new Error('Set the approved project email in site/config.js before publishing.');
if (!process.argv.includes('--preview') && (!c.logo || !fs.existsSync('site/' + c.logo))) throw new Error('Add the original approved logo and set config.logo before publishing.');
if (!['recruitment', 'recipient'].includes(c.phase)) throw new Error('Unknown homepage phase.');
console.log('Launch settings are ready.');
