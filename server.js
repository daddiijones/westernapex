// Cap libuv thread pool before any I/O modules load — shared hosting limits total threads per account
process.env.UV_THREADPOOL_SIZE = '1';

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
