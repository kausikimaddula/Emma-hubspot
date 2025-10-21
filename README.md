# Kaggle -> HubSpot Demo
## Overview
This project demonstrates:
- Using Playwright (headless Chromium) to log in to Kaggle and download a CSV dataset.
- Parsing the CSV to extract `Name` and `Sex` columns.
- Storing data in MySQL using Sequelize (TypeScript).
- Sending contacts to HubSpot via their Contacts API.

## What is included
- `src/` - TypeScript source code
- `migrations/` - Sequelize migration to create `BabyNames` table
- `.env.example` - example environment variables
- `package.json`, `tsconfig.json`

## How to run (development)
1. Copy `.env.example` to `.env` and fill values:
   - KAGGLE_EMAIL, KAGGLE_PASSWORD
   - HUBSPOT_API_KEY_OR_TOKEN (HubSpot private app access token)
   - MYSQL_* (host, port, user, password, database)
2. Install deps:
   ```bash
   npm install
   npx playwright install
   ```
3. Run migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```
   (or run `ts-node src/db/runMigrations.ts` if you prefer)
4. Run the scraper & importer:
   ```bash
   npm run start
   ```
## Notes & production proposals
See `PROPOSAL.md` for suggested steps to harden and move to production.
