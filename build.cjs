const { mkdirSync, copyFileSync } = require('node:fs');
const { join } = require('node:path');

const output = join(__dirname, 'dist');
mkdirSync(output, { recursive: true });
for (const file of ['index.html', 'android.html', 'style.css', 'script.js']) {
  copyFileSync(join(__dirname, file), join(output, file));
}
console.log('Build complete: dist/');
