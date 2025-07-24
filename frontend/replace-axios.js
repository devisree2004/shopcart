const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getRelativePath(filePath) {
    const depth = filePath.split(path.sep).length - srcDir.split(path.sep).length - 1;
    return '../'.repeat(depth) + 'api/axios';
}

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    if (content.includes('axios')) {
        const relativePath = getRelativePath(filePath);
        if (!content.includes('import API from')) {
            content = `import API from "${relativePath}";\n` + content;
        }
        content = content.replace(/\baxios\./g, 'API.');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function walkDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            replaceInFile(fullPath);
        }
    });
}

walkDir(srcDir);
