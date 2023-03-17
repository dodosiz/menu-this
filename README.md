## Getting Started

Install all dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Migrations

Run the migrations:

```
npx prisma migrate dev --name migration_name
```

Apply to the prisma client:

```
npx prisma generate
```

## Run locally

Make sure docker is running then run:

```
npx supabase start
```

Then you can visit http://localhost:54323/projects to configure supabase or query tables.

To stop the services:

```
npx supabase stop
```

## Run Firebase emulator

To run the emulators:

```
firebase emulators:start
```
