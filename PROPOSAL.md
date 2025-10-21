# Production Proposal (high level)
1. **Secrets & Config**
   - Use Vault or AWS Secrets Manager to store credentials.
   - Do not store HubSpot tokens or Kaggle credentials in env files.
2. **Authentication with HubSpot**
   - Use OAuth or HubSpot Private Apps with rotating tokens.
3. **Robust Scraping**
   - Prefer Kaggle API where possible (official API + kaggle CLI) instead of logging-in scraping.
   - If scraping is required, add retry, proxy rotation, CAPTCHA handling and monitoring.
4. **Scaling & Deployment**
   - Containerize (Docker) and deploy to ECS/GKE.
   - Use job schedulers (AWS Batch, CronJobs) for periodic ingest.
5. **Data pipeline**
   - Introduce staging DB, schema versioning, and idempotency keys.
   - Use message queue (SQS, RabbitMQ) for reliable delivery to HubSpot.
6. **Observability**
   - Add structured logging, metrics, dashboards, and alerts.
7. **Testing**
   - Add unit & integration tests; use Playwright test runner for end-to-end.
