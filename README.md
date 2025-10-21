# Kaggle-HubSpot Integration

A TypeScript application that integrates Kaggle dataset scraping with HubSpot CRM, featuring automated data pipeline and robust scraping capabilities.

## Features

- Automated Kaggle dataset scraping using Playwright
- Data processing and transformation
- HubSpot CRM integration
- MySQL database integration using Sequelize ORM
- Automated migrations system
- TypeScript for type safety

## Prerequisites

- Node.js (Latest LTS version recommended)
- MySQL database
- TypeScript knowledge
- HubSpot API credentials
- Kaggle account credentials

## Installation

1. Clone the repository:
```bash
git clone https://github.com/kausikimaddula/Emma-hubspot.git
cd Emma-hubspot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL=mysql://user:password@localhost:3306/database_name
HUBSPOT_API_KEY=your_hubspot_api_key
KAGGLE_USERNAME=your_kaggle_username
KAGGLE_KEY=your_kaggle_key
```

4. Run database migrations:
```bash
npm run migrate
```

## Usage

1. Build the project:
```bash
npm run build
```

2. Start the application:
```bash
npm start
```

## Project Structure

```
├── migrations/              # Database migration files
├── src/
│   ├── db/                 # Database configuration and models
│   ├── utils/              # Utility functions including CSV parsing
│   ├── hubspot.ts         # HubSpot integration logic
│   ├── playwrightScript.ts # Kaggle scraping implementation
│   └── index.ts           # Application entry point
├── package.json
└── tsconfig.json
```

## Scripts

- `npm run build` - Transpiles TypeScript to JavaScript
- `npm start` - Runs the application
- `npm run migrate` - Runs database migrations
- `npm run lint` - Runs ESLint for code quality

## Production Considerations

For production deployment, consider:

1. **Security**
   - Use secure secret management (Vault/AWS Secrets Manager)
   - Implement token rotation for HubSpot

2. **Scalability**
   - Containerize using Docker
   - Deploy to cloud platforms (ECS/GKE)
   - Implement job scheduling

3. **Reliability**
   - Add retry mechanisms
   - Implement proper error handling
   - Set up monitoring and alerting

4. **Data Pipeline**
   - Use staging databases
   - Implement schema versioning
   - Add message queues for reliable delivery

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is private and proprietary. All rights reserved.
