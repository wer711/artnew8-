import fs from 'fs';
import path from 'path';

const files = [
  'src/components/Generator.tsx',
  'src/components/InventoryTracker.tsx',
  'src/components/Library.tsx',
  'src/components/Calendar.tsx',
  'src/data/db.ts',
  'src/data/library.ts'
];

for (const file of files) {
  const p = path.resolve(file);
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/\\\`/g, '`').replace(/\\\$/g, '$').replace(/\\'/g, "'");
  fs.writeFileSync(p, content);
}
console.log('Fixed');
