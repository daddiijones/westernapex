// These must be set before any modules load for the limits to take effect at startup
process.env.UV_THREADPOOL_SIZE = '1';    // cap libuv thread pool (default is 4)
process.env.NEXT_TELEMETRY_DISABLED = '1'; // prevent Next.js spawning a background telemetry process

const { createServer } = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> WesternApex ready on port ${port}`);
  });
});
