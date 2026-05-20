# 7GG Pay Wallet Backend MVP

Mock-only NestJS backend for user wallet address generation, deposits, AML risk status, isolation wallet handling, and treasury sweep presentation.

This service does not connect to any real blockchain, payment rail, Fireblocks, Chainalysis, ledger, MPC, bank, or payment processor. It never stores private keys, seed phrases, or mnemonic phrases.

## Stack

- Node.js
- NestJS
- PostgreSQL
- Prisma
- Docker Compose
- Swagger

## Setup

```bash
cd apps/backend
cp .env.example .env
docker compose up -d
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run build
npm run start:dev
```

Swagger is available at:

```text
http://localhost:4000/docs
```

## Demo Accounts

After seeding:

```text
admin@7ggpay.local / Admin12345!
merchant@7ggpay.local / User12345!
```

## API Endpoints

Auth:

- `POST /auth/register`
- `POST /auth/login`

Wallet:

- `GET /wallet/addresses`
- `GET /wallet/overview`

Deposit:

- `POST /deposits/mock`
- `GET /deposits`
- `GET /deposits/:id`
- `POST /deposits/:id/screen`
- `POST /deposits/:id/sweep`

Admin:

- `GET /admin/wallet-isolation`
- `GET /admin/risk-deposits`

## Test Flow

Register user:

```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@merchant.test","password":"User12345!"}'
```

Login:

```bash
TOKEN=$(curl -s -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@merchant.test","password":"User12345!"}' | jq -r .accessToken)
```

View auto-generated wallet addresses:

```bash
curl http://localhost:4000/wallet/addresses \
  -H "Authorization: Bearer $TOKEN"
```

Create a mock low-risk deposit:

```bash
LOW_DEPOSIT=$(curl -s -X POST http://localhost:4000/deposits/mock \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"chainAsset":"USDT_TRON","amount":"1200.00000000","sourceAddress":"TLowRiskMockSource","txHash":"mock-low-risk-001"}' | jq -r .id)
```

Run AML screen as low risk:

```bash
curl -X POST http://localhost:4000/deposits/$LOW_DEPOSIT/screen \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"riskScore":18,"riskLevel":"LOW"}'
```

Mock sweep the low-risk deposit:

```bash
curl -X POST http://localhost:4000/deposits/$LOW_DEPOSIT/sweep \
  -H "Authorization: Bearer $TOKEN"
```

Create a mock high-risk deposit:

```bash
HIGH_DEPOSIT=$(curl -s -X POST http://localhost:4000/deposits/mock \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"chainAsset":"BTC","amount":"0.42000000","sourceAddress":"bc1qHighRiskMockSource","txHash":"mock-high-risk-001"}' | jq -r .id)
```

Run AML screen as high risk:

```bash
curl -X POST http://localhost:4000/deposits/$HIGH_DEPOSIT/screen \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"riskScore":88,"riskLevel":"HIGH"}'
```

Attempting to sweep a high-risk deposit returns `400` and creates a blocked mock sweep record:

```bash
curl -X POST http://localhost:4000/deposits/$HIGH_DEPOSIT/sweep \
  -H "Authorization: Bearer $TOKEN"
```

Admin risk review:

```bash
ADMIN_TOKEN=$(curl -s -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@7ggpay.local","password":"Admin12345!"}' | jq -r .accessToken)

curl http://localhost:4000/admin/wallet-isolation \
  -H "Authorization: Bearer $ADMIN_TOKEN"

curl http://localhost:4000/admin/risk-deposits \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

## Safety Notes

- Wallet addresses are deterministic mock addresses.
- No private keys, seed phrases, or mnemonic phrases are generated or stored.
- Sweep transactions are database-only mock records.
- Master wallet addresses are read from `.env`.
