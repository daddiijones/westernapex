# Deploying to Namecheap cPanel Shared Hosting

Steps actually taken to get this Next.js + Prisma app running on Namecheap shared hosting (cPanel, Passenger/`nodevenv`, MySQL). Written from the real deployment — including the gotchas, since those are the part worth not re-discovering.

## 1. Prep the repo locally

- Make sure `.gitignore` excludes secrets and local artifacts: `.env*`, `/prisma/dev.db`, `/node_modules`, `/.next/`.
- Add a Passenger-compatible startup file. cPanel's Node.js app runner (Passenger) can't run `next start` directly — it needs a plain Node entry file:

  ```js
  // server.js
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
      console.log(`> Ready on port ${port}`);
    });
  });
  ```

## 2. Push to GitHub

```bash
git init
git add -A
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:<you>/<repo>.git   # SSH if you have a key set up
git push -u origin main
```

## 3. Create the Node.js App in cPanel

**cPanel → Setup Node.js App → Create Application**

| Field | Value |
|---|---|
| Node.js version | Highest available ≥ the version in `node_modules/next/package.json`'s `engines.node` (we needed ≥20.9.0) |
| Application mode | Production |
| Application root | e.g. `westernapex` |
| Application URL | your domain |
| Application startup file | `server.js` |
| Environment variables | added in step 6 below, or via `.env` |

cPanel auto-creates the app root directory with placeholder files (`server.js`, `public/`, `tmp/`) and a Node virtual environment (`nodevenv`) — **don't delete `tmp/`**, Passenger uses it for restart signaling.

## 4. Get a terminal into the app's environment

cPanel's "Setup Node.js App" page gives you an activation command — run it every time you open a new terminal session, it doesn't persist:

```bash
source /home/<user>/nodevenv/<app>/<node-version>/bin/activate && cd /home/<user>/<app-root>
which node && node -v   # sanity check the venv is actually active
```

## 5. Get the real repo into the app root

The app root already has cPanel's placeholder files, so a plain `git clone` into it fails ("directory not empty"). Move the one conflicting file out of the way, then init + pull instead of clone:

```bash
mv server.js server.js.bak
git init
git remote add origin https://github.com/<you>/<repo>.git   # HTTPS is fine if the repo is public
git pull origin main
git branch -M main
git branch --set-upstream-to=origin/main main   # so future updates are just `git pull`
rm server.js.bak
```

(If the repo is private, you'll need a GitHub Personal Access Token in the clone URL instead, or use cPanel's own Git Version Control tool, which manages its own deploy key.)

## 6. Create `.env` on the server

```bash
cat > /home/<user>/<app-root>/.env << 'EOF'
DATABASE_URL="mysql://<db_user>:<url_encoded_password>@localhost:3306/<db_name>"
SMTP_HOST=mail.<yourdomain>
SMTP_PORT=465
SMTP_USER=support@<yourdomain>
SMTP_PASS=<password>
EMAIL_FROM=support@<yourdomain>
ADMIN_EMAIL="admin@<yourdomain>"
EOF
```

**Gotcha:** any special character in the DB password (`@`, `:`, `/`, etc.) must be percent-encoded in the connection string or the URL parser misreads where the password ends — `@` becomes `%40`.

**Gotcha:** `localhost` in `DATABASE_URL` only resolves correctly *on the server itself*. Your local dev machine can't use this same `.env` value unless you enable Remote MySQL in cPanel.

## 7. Switch Prisma from SQLite to MySQL

In `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

(Do this in your local repo too, commit, and `git pull` it on the server — don't hand-edit it remotely or it'll drift from git.)

## 8. Install, generate, migrate, seed

```bash
npm install
npx prisma generate
npx prisma db push      # creates tables in the MySQL database
node prisma/seed.js      # admin account + any sample data
```

**Gotcha:** if your seed script sends emails, wrap each send in `try/catch`. A real production SMTP server validates recipient domains (unlike a sandbox like Mailtrap) — one bad/fake address will throw and abort the whole script if unhandled, leaving later records never created.

## 9. Build

```bash
npm run build
```

Two shared-hosting-specific failures to expect here:

- **Turbopack vs. cPanel's `node_modules` symlink.** cPanel's `nodevenv` makes your app's `node_modules` a symlink into the venv's own lib directory. Next.js 16's default bundler (Turbopack) does a strict check that `node_modules` resolves under the project root, and aborts with `Symlink [project]/node_modules is invalid, it points out of the filesystem root`. Fix: force the legacy webpack bundler for builds — `next build --webpack`, or permanently in `package.json`: `"build": "next build --webpack"`.

- **`EAGAIN` on spawn.** Shared hosting (CloudLinux) caps how many OS processes your account can run at once. Next's build spawns extra worker *processes* for parallel compilation and can hit that cap. Fix in `next.config.mjs`:

  ```js
  const nextConfig = {
    experimental: {
      workerThreads: true,  // worker threads instead of new processes
      cpus: 1,
    },
  };
  ```

## 10. Restart and verify

cPanel → Setup Node.js App → your app → **Restart**.

Then check:
- Site loads on your domain (not 503/blank)
- A page that hits the database renders real data (e.g. a tracking page)
- Admin login works
- Any outbound email actually sends (check a real inbox, not just script output)

## Redeploying after future changes

```bash
git pull
npm install              # only if package.json changed
npx prisma generate      # only if schema.prisma changed
npx prisma db push        # only if schema.prisma changed
npm run build
```
Then restart the app from the cPanel UI.
