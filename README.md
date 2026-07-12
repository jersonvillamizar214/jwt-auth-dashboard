# JWT Auth Dashboard

A full-stack authentication demo built with **Next.js** (App Router), where the frontend and backend live in a single project — deployable to Vercel with a Neon PostgreSQL database.

> Part of my developer portfolio. Companion to [`rest-api-jwt-auth`](https://github.com/jersonvillamizar214/rest-api-jwt-auth) — the same auth system implemented as a standalone Express REST API.

## What it shows

- A public **landing page** describing the project.
- **Register / Login** with real form validation and error handling.
- A **protected dashboard** that only authenticated users can reach.
- **Role-based UI**: `ADMIN` users see a table of all registered users; `USER` accounts see their own profile.
- Secure **logout** that revokes the session server-side.

## Tech Stack

| Layer      | Technology                              |
| ---------- | --------------------------------------- |
| Framework  | Next.js 16 (App Router, route handlers) |
| Language   | TypeScript                              |
| Styling    | Tailwind CSS v4                         |
| ORM        | Prisma                                  |
| Database   | PostgreSQL (Neon in production)         |
| Auth       | JWT (access + refresh) + bcrypt         |
| Validation | Zod                                     |
| Deploy     | Vercel                                  |

## How authentication works

1. On **register/login**, the server hashes/verifies the password with **bcrypt**, signs a JWT **access** token (15 min) and **refresh** token (7 days), and stores them in **httpOnly cookies** — invisible to client-side JavaScript, which mitigates XSS token theft.
2. Refresh tokens are also **persisted in the database**, so **logout** can revoke them server-side.
3. Server Components read the session with `getSession()` and **redirect unauthenticated users** away from `/dashboard`.
4. The same login error is returned for an unknown email and a wrong password to prevent **user enumeration**.

## Project structure

```
src/
├── app/
│   ├── page.tsx              # public landing
│   ├── login/  · register/   # auth pages
│   ├── dashboard/            # protected (Server Component guard)
│   └── api/
│       ├── auth/{register,login,logout}/route.ts
│       └── users/{,me}/route.ts
├── components/               # Navbar · AuthForm · LogoutButton
└── lib/                      # prisma · env · jwt · auth · validation
```

## Run locally

Requires Node 20+ and Docker (for PostgreSQL).

```bash
# 1. Install
npm install

# 2. Environment
cp .env.example .env          # secrets are pre-filled for local dev

# 3. Start PostgreSQL
docker compose up -d

# 4. Create the schema
npm run db:push

# 5. Dev server
npm run dev                   # http://localhost:3000
```

### Make yourself an admin (optional)

After registering, promote your account to see the admin table:

```bash
docker exec -it jwt_dashboard_db \
  psql -U postgres -d authdb \
  -c "UPDATE users SET role='ADMIN' WHERE email='tu@correo.com';"
```

## Deploy (Vercel + Neon)

1. Create a free PostgreSQL database at [neon.tech](https://neon.tech) and copy its connection string.
2. Import this repo into [vercel.com](https://vercel.com).
3. Add environment variables in Vercel (`DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`).
4. Run `npx prisma db push` once against the Neon URL to create the tables.
5. Deploy — every push to `main` redeploys automatically.

## License

MIT
