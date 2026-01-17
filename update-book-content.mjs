import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

for (let i = 1; i <= 100; i++) {
  const fileName = i + '.tsx';
  const filePath = path.join(__dirname, 'client/pages/book', fileName);
  
  const componentName = 'BookPage' + i;
  const content = 'export default function ' + componentName + '() {\n' +
    '  return (\n' +
    '    <div className="bg-card border border-border rounded-xl p-8 mb-8">\n' +
    '      <h1 className="text-2xl font-bold mb-4">صفحہ ' + i + '</h1>\n' +
    '      <div className="prose prose-invert max-w-none">\n' +
    '        <p className="text-muted-foreground leading-relaxed">\n' +
    '          یہاں صفحہ ' + i + ' کا مواد ہوگا۔\n' +
    '        </p>\n' +
    '        <p className="text-muted-foreground leading-relaxed mt-4">\n' +
    '          This is the content area for page ' + i + '. Add your book content here.\n' +
    '        </p>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  );\n' +
    '}\n';
  
  fs.writeFileSync(filePath, content);
  console.log('Updated page ' + i);
}

console.log('Completed updating all book pages 1-100 with content messages');
