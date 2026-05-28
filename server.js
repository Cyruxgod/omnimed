const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif'
};

const server = http.createServer((req, res) => {
  // Normalize path and resolve to index.html for root
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  
  // Basic security: prevent escaping the directory
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  const ext = path.extname(filePath);
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 File Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Internal Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m', '---------------------------------------------------------');
  console.log('\x1b[36m%s\x1b[0m', `  Omnimed Recruitment Agency Dev Server is now online!`);
  console.log('\x1b[36m%s\x1b[0m', `  Local Address: http://localhost:${PORT}`);
  console.log('\x1b[36m%s\x1b[0m', '---------------------------------------------------------');
});
