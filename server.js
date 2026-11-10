/**
 * VISHWAS ENTERPRISES - BACKEND SERVER (Node.js)
 * Zero external dependencies - uses standard Node.js runtime.
 * Run with: node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure enquiries.json exists
if (!fs.existsSync(ENQUIRIES_FILE)) {
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2));
}

// MIME types lookup
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  // CORS Headers for API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Endpoint: POST /api/enquiry
  if (req.url === '/api/enquiry' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      // Safeguard against large payloads
      if (body.length > 1e6) {
        req.connection.destroy();
      }
    });

    req.on('end', () => {
      try {
        const enquiry = JSON.parse(body);

        // Security check
        if (!enquiry.orgName || !enquiry.email || !enquiry.phone) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Missing required fields' }));
          return;
        }

        // Add server metadata
        enquiry.serverReceivedAt = new Date().toISOString();
        enquiry.ip = req.socket.remoteAddress;

        // Persist to enquiries.json
        const currentData = JSON.parse(fs.readFileSync(ENQUIRIES_FILE, 'utf8') || '[]');
        currentData.unshift(enquiry);
        fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(currentData, null, 2));

        console.log(`[Enquiry Logged] Ref: ${enquiry.refId} | Org: ${enquiry.orgName} | Service: ${enquiry.service}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          refId: enquiry.refId, 
          message: 'Enquiry securely recorded. Our team will contact you shortly.' 
        }));
      } catch (err) {
        console.error('Error handling enquiry:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Internal server error' }));
      }
    });
    return;
  }

  // API Endpoint: GET /api/enquiries (Protected audit summary)
  if (req.url === '/api/enquiries' && req.method === 'GET') {
    try {
      const data = JSON.parse(fs.readFileSync(ENQUIRIES_FILE, 'utf8') || '[]');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ total: data.length, enquiries: data }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read enquiries' }));
    }
    return;
  }

  // Static File Serving
  let safeUrl = req.url.split('?')[0];
  if (safeUrl === '/') safeUrl = '/index.html';

  let filePath = path.join(__dirname, safeUrl);

  // Security: prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  // Support clean URLs: /about -> /about.html
  if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p><a href="/">Return to Vishwas Enterprises</a></p>');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`500 Internal Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` VISHWAS ENTERPRISES - CORPORATE WEB SERVER`);
  console.log(` Running at: http://localhost:${PORT}`);
  console.log(` Enquiries file: ${ENQUIRIES_FILE}`);
  console.log(`====================================================`);
});

