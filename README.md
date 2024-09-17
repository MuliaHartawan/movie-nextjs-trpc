# NextJS Fullstack Boilerplate

## Project Description

This is a full-stack boilerplate application built with Next.js that utilizes React Server Actions for server-side logic.

### (!)Important

Since this approach is not designed for high-performance applications, it is recommended to use this project for small to medium-sized projects.

## System Requirements

- Next 14
- Node.js >= 20
- Postgres 15
- pnpm

## Setup

### 1. Clone the Repository

```bash
git clone https://your-repo-url.git
cd your-repo-directory
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Variables

```bash
cp .env.example .env.local
```

Follow the instruction on file `.env` to set the specific environment variables.

### 4. Database Setup

In this boilerplate, we use PostgreSQL as the database. You can set up your database by following these steps:

1. Create a new database.
2. Update the `.env.local` file with the database connection details.
3. Run the database migrations:

```bash
pnpm db:push
```

Please read [Drizzle-ORM documentation](https://orm.drizzle.team/docs/overview)

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Project Structure

```
.
├── src/
│   ├── app/
│   |   ├── _components/
│   |   ├── (authenticated)/
│   |   |   ├── (module-name)/
│   |   |   |   ├── _components/
│   |   |   |   ├── _hooks/
│   |   |   |   ├── path/
│   |   |   |   |   ├── page.tsx
│   |   ├── (public)/
│   |   |   ├── (module-name)/
│   |   |   |   ├── _components/
│   |   |   |   ├── _hooks/
│   |   |   |   ├── path/
│   |   |   |   |   ├── page.tsx
│   |   ├── api/
│   ├── common/
|   |   ├── enums/
|   |   ├── types/
│   ├── libs/
│   ├── server/
│   |   ├── module-name/
│   |   |   ├── actions/
│   |   |   ├── repositories/
│   |   |   ├── validations/

│   ├── types/
│   ├── utils/
│   ├── middleware.ts
│   └── ...
```

### Key Directories

- **`src/app/`**: Contains the application logic, including components, pages, and API routes.
  - **`src/app/_components/`**: Contains shared components used throughout the application.
  - **`src/app/(authenticated)/`**: Contains components and pages that require authentication. See [Modules Structure](#modules-structure) for more details.
  - **`src/app/(public)/`**: Contains components and pages that are publicly accessible. See [Modules Structure](#modules-structure) for more details.
  - **`src/app/api/`**: Contains API routes.
- **`src/common/`**: Contains common utilities, types, and enums.
- **`src/libs/`**: Contains libraries and utilities used throughout the application.
- **`src/server/`**: Contains server-side logic, including React Server Actions.
  - **`src/server/(module-name)/`**: Contains server-side logic for a specific module.
    - **`src/server/(module-name)/actions/`**: Contains server-action functions that ready to be called from the client.
    - **`src/server/(module-name)/repositories/`**: Contains repositories for getting data from the database.
    - **`src/server/(module-name)/validations/`**: Contains validation rules.
- **`src/types/`**: Contains type definitions used throughout the application.
- **`src/utils/`**: Contains utility functions used throughout the application.
- **`src/middleware.ts`**: Contains middleware functions used throughout the application.

#### Modules Structure

- Module name should be inside brackets, e.g. `(module-name)`.
- Each module will have its own directories:
  - **`_components/`**: Contains components used within the module.
  - **`_hooks/`**: Contains hooks used within the module.
  - **`path/`**: Contains the page components for the module. Follow the [NextJS routing rules](https://nextjs.org/docs/app/building-your-application/routing).

#### Development Guidelines
- Start Simple: Begin with a simple approach to the feature or task. Avoid unnecessary complexity at the start.
- Split When Needed: As the code grows, split components, hooks, and logic into smaller pieces only when it becomes necessary for readability or maintainability.
- No Big Hook: Avoid creating large, multi-purpose hooks. Each hook should be focused and concise.
- 1 Hook 1 Goal: Ensure that each hook serves a single, clear purpose.

## Integration

### Authentication

- **Google OAuth**: Configured via `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` in the `.env.local` file.
- **Auth.js**: Utilized for authentication, with the secret stored in `AUTH_SECRET`.

### Database

- **PostgreSQL**: Connection details are configured via `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and `DB_SSL` in the `.env.local` file.

### Error Tracking

- **Sentry**: Configured via `SENTRY_DSN`, `SENTRY_TOKEN`, `SENTRY_URL`, and `SENTRY_PROJECT` in the `.env.local` file. See `sentry.client.config.ts`, `sentry.edge.config.ts`, and `sentry.server.config.ts` for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
