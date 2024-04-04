const fs = require('fs');

let processedLines = new Set(); 
let lastLineExcluded = false; 


function processOutput(output) {
    if (!processedLines.has(output) && !/\b\w*_[a-zA-Z0-9_]+\w*\b/.test(output)) {
        if (lastLineExcluded) {
            console.log(""); 
        }
        console.log(output);
        lastLineExcluded = false; 
        processedLines.add(output); // 
    } else {
        lastLineExcluded = true; 
    }
}

fs.watchFile('ganache_output.log', (curr, prev) => {
    fs.readFile('ganache_output.log', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        const lines = data.split('\n');
        lines.forEach(line => {
            processOutput(line);
        });
    });
});
