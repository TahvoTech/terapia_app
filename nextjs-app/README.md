# Terapia App - Next.js Mockup

A production-quality therapy support web application mockup built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## 🎯 Overview

This is a **prototype/mockup** version designed for demonstration and testing purposes. It uses **localStorage** for data persistence instead of a backend database. All data is stored locally in the browser.

### Features

- **Two user roles**: Client and Therapist
- **Client Dashboard**:
  - Weekly check-in form (mood, stress, sleep, notes)
  - Homework task list with completion tracking
  - Personal journal with entries
- **Therapist Dashboard**:
  - View all assigned clients
  - Read client check-ins, homework progress, and journal entries
- **Crisis support banner** on all authenticated pages
- **Mock authentication** with demo users
- **localStorage persistence** for all user data

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:

```bash
cd nextjs-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Users

**Clients:**
- Matti Meikäläinen
- Anna Korhonen

**Therapist:**
- Dr. Maria Virtanen

## 📁 Project Structure

```
nextjs-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── client/            # Client dashboard
│   │   ├── therapist/         # Therapist dashboard
│   │   ├── login/             # Login page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── CrisisBanner.tsx   # Crisis support banner & modal
│   │   └── UI.tsx             # Reusable UI components
│   ├── data/                  # Data access layer
│   │   └── store.ts           # localStorage abstraction
│   ├── mock/                  # Mock data
│   │   └── data.ts            # Seed data for users & homework
│   └── types/                 # TypeScript types
│       └── index.ts           # Type definitions
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Data Storage**: localStorage (mockup)

## 🔄 Migrating to Supabase

The application is architected to make database integration straightforward:

### Current Architecture

All data access is centralized in `src/data/store.ts`, which provides functions like:
- `getSession()`, `setSession()`, `clearSession()`
- `listClients()`, `getClientById()`
- `addCheckIn()`, `listCheckIns()`
- `toggleHomework()`, `listHomework()`
- `addJournalEntry()`, `listJournalEntries()`

### Migration Steps

1. **Install Supabase client**:
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Initialize Supabase**:
   ```typescript
   import { createClient } from '@supabase/supabase-js'
   
   const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   )
   ```

3. **Update `src/data/store.ts`**:
   - Replace localStorage calls with Supabase queries
   - Make functions async (add `async`/`await`)
   - Update return types to `Promise<T>`
   
   Example transformation:
   ```typescript
   // Before (localStorage)
   export function listClients(): Client[] {
     return MOCK_CLIENTS;
   }
   
   // After (Supabase)
   export async function listClients(): Promise<Client[]> {
     const { data, error } = await supabase
       .from('clients')
       .select('*');
     
     if (error) throw error;
     return data;
   }
   ```

4. **Update components**:
   - Add `async`/`await` to data fetching
   - Consider using React Query or SWR for caching
   - Handle loading and error states

5. **Create database schema** in Supabase:
   ```sql
   create table clients (
     id uuid primary key default uuid_generate_v4(),
     name text not null,
     email text not null,
     therapist_id uuid references therapists(id),
     created_at timestamp with time zone default now()
   );
   
   create table check_ins (
     id uuid primary key default uuid_generate_v4(),
     client_id uuid references clients(id),
     date timestamp with time zone default now(),
     mood int not null check (mood between 1 and 5),
     stress int not null check (stress between 1 and 5),
     sleep int not null check (sleep between 1 and 5),
     notes text
   );
   
   -- Add similar tables for homework, journal_entries, etc.
   ```

6. **Replace mock authentication** with Supabase Auth

7. **Add Row Level Security (RLS)** policies for data protection

## 🛠️ Development

### Build for production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 📝 Notes

- This is a **mockup/prototype** - not production-ready for real therapy use
- No real authentication or authorization
- Data is stored only in browser localStorage (cleared when browser data is cleared)
- Crisis banner includes important safety information and emergency numbers (Finnish)

## 📄 License

MIT

## 🤝 Contributing

This is a prototype project. Feel free to fork and adapt for your needs.
