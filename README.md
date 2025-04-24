# NestJS Performance-Focused Template

This is a NestJS project template optimized for performance, leveraging modern libraries and tools:

- **NestJS** with **Fastify** (instead of Express)
- **MikroORM** (instead of TypeORM)
- **SWC** compiler (instead of default TypeScript compiler)
- **Vitest** (instead of Jest)
- Configured with **ES Modules (ESM)** instead of CommonJS

## Project Structure

```plaintext
.
├── bin/                                          # Utility scripts (entity generation, synchronization)
├── docs/                                         # Project documents
├── node_modules/                                 # Project dependencies
├── public/                                       # Static assets (images, frontend builds)
├── src/                                          # Source code
│   ├── app.module.ts                             # Root module of the application
│   ├── app.middleware.ts                         # Global middleware
│   ├── app.ts                                    # Application bootstrap file (entry point)
│   ├── swagger.ts                                # Swagger API documentation setup
│   ├── metadata.ts                               # Auto-generated metadata (Swagger, ORM)
│   ├── generate-metadata.ts                      # Metadata generation script
│   ├── auth/                                     # Authentication and Authorization
│   │   ├── dto/
│   │   ├── strategies/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── common/                                   # Shared utilities and components
│   │   ├── exceptions.filter.ts
│   │   ├── index.ts
│   │   └── logger-context.middleware.ts
│   ├── config/                                   # Configuration files
│   │   ├── envs/
│   │   ├── logger.config.ts
│   │   ├── type/
│   │   └── index.ts
│   ├── entities/                                 # MikroORM entities
│   ├── health/                                   # Health check module
│   │   ├── health.controller.ts
│   │   └── health.module.ts
│   ├── sample/                                   # CRUD API example
│   │   ├── dto/
│   │   ├── sample.controller.spec.ts
│   │   ├── sample.controller.ts
│   │   ├── sample.entity.ts
│   │   ├── sample.module.ts
│   │   └── sample.service.ts
│   └── user/                                     # User management
│       ├── user.controller.ts
│       ├── user.entity.ts
│       ├── user.module.ts
│       └── user.service.ts
├── test/                                         # Tests
│   ├── e2e/
│   ├── vitest.e2e.ts
│   └── jest-e2e.json (legacy, removable)
├── typings/                                      # Custom type definitions
├── .env.sample                                   # Sample environment configuration
├── .gitignore                                    # Ignored files for Git
├── .prettierrc                                   # Prettier formatting rules
├── .swcrc                                        # SWC compiler configuration
├── eslint.config.mjs                             # ESLint rules
├── nest-cli.json                                 # NestJS CLI configuration
├── package.json                                  # Project dependencies and scripts
├── package-lock.json                             # Locked dependency versions
├── README.md                                     # Documentation
├── tsconfig.json                                 # Main TypeScript config
├── tsconfig.build.json                           # TypeScript build configuration
└── vitest.config.ts                              # Vitest configuration
```

## Technologies Used

| Category           | Technology                                                          |
| ------------------ | ------------------------------------------------------------------- |
| **Framework**      | [NestJS v11+](https://nestjs.com/)                                  |
| **HTTP Server**    | [Fastify](https://www.fastify.io/)                                  |
| **ORM**            | [MikroORM v6+](https://mikro-orm.io/) (PostgreSQL)                  |
| **Compiler**       | [SWC](https://swc.rs/)                                              |
| **Testing**        | [Vitest](https://vitest.dev/)                                       |
| **Module System**  | ES Modules (ESM)                                                    |
| **Validation**     | `class-validator`, `class-transformer`                              |
| **Configuration**  | `@nestjs/config`                                                    |
| **Logging**        | `nestjs-pino`                                                       |
| **Authentication** | `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`, `passport-local` |
| **API Docs**       | `@nestjs/swagger`                                                   |
| **Health Checks**  | `@nestjs/terminus`                                                  |
| **Linting**        | [Biome](https://biomejs.dev/)                                       |
| **Formatting**     | [Biome](https://biomejs.dev/)                                       |

## Installation

### Clone and Setup

```bash
git clone <repository_url>
cd nestjs-project-performance
cp .env.sample .env # Edit database configuration in .env
npm ci
```

### Database Synchronization (optional)

Create database schema:

```bash
npm run entity:sync
```

Generate entities from existing database:

```bash
npm run entity:load
```

## Running the Application

### Development Mode

```bash
npm run start:dev
# Application available at http://localhost:3000
```

### Production Mode

```bash
npm run build
npm start
# Or with env variables:
NODE_ENV=production PORT=8000 node dist/app.js
```

## Testing

Run tests:

```bash
npm test          # Unit and integration tests
npm run test:e2e  # End-to-end tests
```

## API Documentation (Swagger)

Generate metadata (required for SWC):

```bash
npm run esm src/generate-metadata.ts
```

Start Swagger UI:

```bash
npm run doc:api
# Access via http://localhost:3000/api
```

## Linting and Formatting

Check for linting and formatting issues:

```bash
npm run lint
```

Apply formatting and lint fixes:

```bash
npm run format
```

## Additional Scripts

- `npm run build`: Compile TypeScript using SWC
- `npm start`: Run compiled application
- `npm run start:debug`: Debugging mode
- `npm run esm <script.ts>`: Execute TypeScript scripts with SWC

## Implementations

- Application Bootstrap: [app.ts](src/app.ts), [app.module.ts](src/app.module.ts)
- Global Exception Handling: [exceptions.filter.ts](src/common/exceptions.filter.ts)
- Logging Middleware: [logger-context.middleware.ts](src/common/logger-context.middleware.ts)
- Configuration: [config/envs](src/config/envs)
- JWT Authentication: [auth module](src/auth)
- CRUD Example: [sample module](src/sample)
- Testing Examples: [Unit](src/sample/sample.controller.spec.ts), [E2E](test/e2e)

## Resources

- [NestJS](https://docs.nestjs.com)
- [Nest Project Structure Example](https://github.com/CatsMiaow/node-nestjs-structure)
- [Fastify](https://fastify.dev)
- [MikroORM](https://mikro-orm.io)
- [Vitest](https://vitest.dev)
