# Aura Event Rentals

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/EagleSalute/aura-event-rentals-premium-event-equipment-rental-platform)

A full-stack chat application built on Cloudflare Workers, featuring real-time chat boards, user management, and message persistence using Durable Objects. This production-ready template includes a modern React frontend with shadcn/ui components, Tailwind CSS, and TanStack Query for seamless data fetching.

## Features

- **Entity-based Backend**: Users and ChatBoards stored as Durable Object instances with automatic indexing for efficient listing and pagination.
- **Real-time Chat**: Send and retrieve messages per chat board with optimistic updates.
- **CRUD Operations**: Create, read, update, delete users and chats via REST APIs.
- **Modern UI**: Responsive design with dark mode, sidebar layout, and smooth animations using shadcn/ui and Tailwind CSS.
- **Type-safe**: Full TypeScript support across frontend, backend, and shared types.
- **Edge Deployment**: Zero-cold-start backend with Cloudflare Workers and Durable Objects.
- **Developer Experience**: Hot reload, error boundaries, and client-side error reporting.

## Tech Stack

- **Backend**: Cloudflare Workers, Hono, Durable Objects
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui
- **Data**: TanStack Query, Zustand (via immer), Zod
- **UI/UX**: Lucide React icons, Framer Motion, Sonner toasts
- **Dev Tools**: Bun, ESLint, Wrangler

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) installed (recommended package manager)
- [Cloudflare CLI (Wrangler)](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for deployment
- Node.js-compatible environment (Bun handles this)

### Installation

1. Clone the repository and navigate to the project directory.
2. Install dependencies:

   ```bash
   bun install
   ```

3. (Optional) Generate Worker types:

   ```bash
   bun run cf-typegen
   ```

### Development

1. Start the development server (runs on port 3000 or `$PORT`):

   ```bash
   bun dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

3. The backend APIs are available at `/api/*` endpoints (proxied via Vite).

**Hot Reload**: Frontend changes hot-reload automatically. Backend changes require redeploy or `wrangler dev`.

### Usage Examples

#### Frontend Data Fetching

Uses `api-client.ts` helper:

```typescript
import { api } from '@/lib/api-client';
import type { User } from '@shared/types';

const users = await api<User[]>('/api/users?limit=10');
```

#### API Endpoints

- `GET /api/users` - List users (supports `?cursor` & `?limit`)
- `POST /api/users` - Create user `{ name: string }`
- `GET /api/chats` - List chats
- `POST /api/chats` - Create chat `{ title: string }`
- `GET /api/chats/:chatId/messages` - List messages
- `POST /api/chats/:chatId/messages` - Send message `{ userId: string, text: string }`
- Delete endpoints: `DELETE /api/users/:id`, etc.

Seed data (users/chats) auto-loads on first request.

#### Customizing Entities

1. Extend `IndexedEntity` in `worker/entities.ts`.
2. Add routes in `worker/user-routes.ts`.
3. Update shared types in `shared/types.ts`.
4. Use in frontend via TanStack Query or `api()` helper.

## Deployment

1. Build the frontend:

   ```bash
   bun build
   ```

2. Deploy to Cloudflare Workers:

   ```bash
   bun run deploy
   ```

   Or use Wrangler directly:

   ```bash
   npx wrangler deploy
   ```

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/EagleSalute/aura-event-rentals-premium-event-equipment-rental-platform)

**Custom Domain**: Update `wrangler.jsonc` assets and deploy.

**Environment Variables**: Set via Wrangler secrets if needed (none required for demo).

## Project Structure

```
├── src/              # React frontend (Vite + shadcn/ui)
├── worker/           # Hono backend + Durable Objects
├── shared/           # Shared TypeScript types
├── package.json      # Bun-based dependencies
└── wrangler.jsonc    # Cloudflare config
```

## Architecture

- **Durable Objects**: One DO per entity (User/ChatBoard) for strong consistency.
- **Global Index**: Prefix-based indexes for listing entities.
- **Frontend**: React Router, TanStack Query for API integration.
- **Assets**: Static frontend served via Workers Sites.

## Customization

- **UI Components**: Add via `npx shadcn-ui@latest add <component>`
- **Routes**: Extend `src/main.tsx` router.
- **Backend**: Add entities/routes without breaking core utils.
- **Theme**: Edit `tailwind.config.js` and CSS variables.

## Troubleshooting

- **Build Errors**: Run `bun install` and check TypeScript configs.
- **Worker Types**: `bun run cf-typegen`.
- **CORS**: Enabled for `/api/*`.
- **Logs**: Check Cloudflare dashboard or `wrangler tail`.

## Contributing

Fork, create a branch, and submit a PR. Focus on:
- Type safety
- Performance (edge-first)
- DX improvements

## License

MIT. See [LICENSE](LICENSE) for details.