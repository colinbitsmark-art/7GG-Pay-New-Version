# Deploy 7GG Pay to Railway

This monorepo deploys as **3 Railway services**:

1. **PostgreSQL** (Railway plugin)
2. **Backend** (NestJS API) — `docker/backend.Dockerfile`
3. **Frontend** (Next.js) — `docker/frontend.Dockerfile`

## 1. Push code to GitHub

Commit and push this repository to GitHub if you have not already.

## 2. Create a Railway project

1. Go to [railway.app](https://railway.app) and create a new project.
2. Choose **Deploy from GitHub repo** and select `7GG-Pay-New-Version`.

## 3. Add PostgreSQL

1. In the project, click **New** → **Database** → **PostgreSQL**.
2. Railway creates `DATABASE_URL` automatically.

## 4. Deploy the backend

1. Click **New** → **GitHub Repo** → select the same repository again (second service).
2. Rename the service to `backend`.
3. Open **Settings** → **Build**:
   - **Builder:** Dockerfile
   - **Dockerfile path:** `docker/backend.Dockerfile`
4. Open **Settings** → **Deploy** → set config file path to `railway.backend.toml` (optional).
5. Open **Variables** and add:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Reference from PostgreSQL service (`${{Postgres.DATABASE_URL}}`) |
| `JWT_SECRET` | A long random secret string |
| `JWT_EXPIRES_IN` | `1d` |
| `FRONTEND_URL` | Your frontend Railway URL (add after frontend deploy) |

6. Deploy. When healthy, copy the public URL (e.g. `https://backend-production-xxxx.up.railway.app`).

**Swagger:** `https://<backend-url>/docs`

### Seed demo users (first deploy only)

In Railway → backend service → **Shell**:

```bash
cd apps/backend && npx ts-node prisma/seed.ts
```

Or run locally with Railway CLI:

```bash
railway link
railway run --service backend pnpm --filter 7gg-pay-backend prisma:seed
```

## 5. Deploy the frontend

1. Click **New** → **GitHub Repo** → same repository (third service).
2. Rename the service to `frontend`.
3. Open **Settings** → **Build**:
   - **Builder:** Dockerfile
   - **Dockerfile path:** `docker/frontend.Dockerfile`
4. Open **Settings** → **Deploy** → set config file path to `railway.frontend.toml` (optional).
5. Open **Variables** and add:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | Your backend public URL (e.g. `https://backend-production-xxxx.up.railway.app`) |

> `NEXT_PUBLIC_API_URL` is baked in at **build time**. Redeploy the frontend after changing it.

6. Deploy and copy the frontend public URL.

## 6. Finish CORS setup

Go back to the **backend** service variables and set:

```
FRONTEND_URL=https://<your-frontend-url>
```

Redeploy the backend so CORS allows the frontend origin.

## Local Docker test (optional)

```bash
# Backend
docker build -f docker/backend.Dockerfile -t 7gg-pay-backend .
docker run --rm -p 4000:4000 --env-file apps/backend/.env 7gg-pay-backend

# Frontend
docker build -f docker/frontend.Dockerfile \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:4000 \
  -t 7gg-pay-frontend .
docker run --rm -p 3000:3000 7gg-pay-frontend
```

## Service URLs

| Service | Local | Railway |
|---------|-------|---------|
| Frontend | http://localhost:3000 | `https://<frontend>.up.railway.app` |
| Backend API | http://localhost:4000 | `https://<backend>.up.railway.app` |
| Swagger | http://localhost:4000/docs | `https://<backend>.up.railway.app/docs` |

## Demo accounts (after seeding)

- `admin@7ggpay.local` / `Admin12345!`
- `merchant@7ggpay.local` / `User12345!`

## Troubleshooting

- **Backend crash on start:** Check `DATABASE_URL` is linked to PostgreSQL.
- **Frontend can't reach API:** Verify `NEXT_PUBLIC_API_URL` and redeploy frontend.
- **CORS errors:** Set `FRONTEND_URL` on backend to the exact frontend URL (no trailing slash).
- **Migrations:** Backend runs `prisma migrate deploy` automatically on each deploy.
