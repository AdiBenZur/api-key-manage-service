# API Key Management Service

## Features
- **Create API Keys**: Generates secure keys with hashed storage.
- **List Keys**: Retrieve metadata for all keys associated with an account.
- **Revoke Keys**: Soft delete (revoke).
  
## How to run
1. Clone the repository.
2. Create a .env file in the root directory and use the structure provided in env.example.
3. Database initialization:
   - Start docker: docker-compose up -d
   - Apply migrations: npx prisma migrate dev --name init
4. Running the service (The server will be available at http://localhost:3000): npm run dev
- **note**: The repository includes a docker-compose.yml for instant database setup and a prisma/migrations folder to ensure the schema is initialized correctly every time the service starts from scratch.

## Next Steps
Key Verification.
Implementing the validation logic for incoming requests:
- Endpoint: GET /auth/verify
- Header: x-api-key: <prefix.secret>
- Logic: Verify if the prefix exists, compare the hash, and check that revokedAt is null

## Project Structure
  
```
api-key-manage-service/
├── controllers/         # Request handling and input validation
│   └── apiKeyController.ts
├── routes/              # API route definitions and mapping
│   └── apiKeyRoutes.ts
├── services/            # Logic and database interactions
│   └── apiKeyService.ts
├── prisma/              # Database schema and migrations
│   ├── migrations/      # Deterministic DB version history
│   └── schema.prisma    # Data models (ApiKey)
├── docker-compose.yml   # Infrastructure (PostgreSQL container)
├── env.example          # Template for environment variables
├── index.ts             # Application entry point
├── package.json         # Project metadata and scripts
└── tsconfig.json        # TypeScript configuration
```
