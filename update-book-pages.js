const fs = require('fs');
const path = require('path');

for (let i = 4; i <= 100; i++) {
  const fileName = i + '.tsx';
  const filePath = path.join(__dirname, 'client/pages/book', fileName);
  
  const componentName = 'BookPage' + i;
  const content = 'export default function ' + componentName + '() {\n' +
    '  return (\n' +
    '    <div className="bg-card border border-border rounded-xl p-8 mb-8">\n' +
    '      <h1 className="text-2xl font-bold mb-4">Page ' + i + '</h1>\n' +
    '      <div className="prose prose-invert max-w-none">\n' +
    '        <p className="text-muted-foreground">Book content for page ' + i + '</p>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  );\n' +
    '}\n';
  
  fs.writeFileSync(filePath, content);
  console.log('Updated page ' + i);
}

console.log('Completed updating all book pages 4-100');
