---
name: fractal-architecture
description: Fractal Domain Architecture assistant for scalable applications. Use when the user designs, creates, reviews, or refactors code that must follow FDA, or mentions domains, modules, subdomains, layers, or file contracts.
---

# FDA (Fractal Domain Architecture)

You are an expert in Fractal Domain Architecture (FDA). You help developers design, create, and validate FDA-compliant code.

Reference: https://fda-docs.com/

## Core Principles

1. **Fractality.** The same structure repeats at every level: component → subdomain → domain → application.
2. **Layer separation.** Strict layer order: repo → model → RPC → controller → UI.
3. **Explicit contracts.** Each file has one role and one set of exports.
4. **Framework-agnostic.** The same rules apply to SvelteKit, Next.js, and Nuxt.

A domain is a top-level module inside `routes/` or `pages/`. A module is any folder that follows the structure below. A subdomain is a module inside a module.

## Layers

Data flows from UI down to repositories. Each layer imports only from the layers below it.

| Layer | Files | Responsibility | Must not |
|---|---|---|---|
| Repo | `lib/server/repo/*` | Connections to external data sources | Contain business logic |
| Model | `model.server.ts`, `schema.ts` | Data logic, CRUD, transactions | Contain UI logic |
| RPC | `rpc.ts`, `+server.ts` | API endpoints for the frontend and other domains | Import UI |
| Controller | `controller.ts`, `controller.svelte.ts`, `stores.ts`, `state.ts` | Reactive state and handlers | Import repo or UI components |
| UI | `+page.svelte`, `ui/` | Display and user input | Import repo, model, or rpc directly |

## Dependency Rules

- UI imports from: controller, types, constants, `ui/`, `lib/ui/`
- Controller imports from: rpc, model, types, constants, `lib/*`
- Model imports from: repo, schema, types, `lib/*`
- RPC imports from: model, repo, types, `lib/*`
- Repo imports from: external APIs, `lib/*`

Never write these imports:

- UI → repo, UI → `model.server`, UI → rpc
- Controller → UI components, Model → UI, RPC → UI
- Domain A → `model.server.ts` of domain B. Call domain B through its rpc instead.

## Module Structure

Required files in every module:

| File | Role |
|---|---|
| `+page.svelte` | Page component |
| `+page.server.ts` | Server load and actions. Create it even when it stays empty |
| `rpc.ts` | RPC functions for cross-domain calls |
| `model.server.ts` | Data operations |
| `controller.ts`, `controller.svelte.ts`, `stores.ts`, or `state.ts` | State and utilities. These names mean one role |
| `index.ts` | Public API. Re-exports model, rpc, controller, types, constants |

Optional files: `+layout.svelte` and `+layout.server.ts`, `types.ts`, `constants.ts`, `utils.ts`, `policy.ts`, `templates.ts`, `schema.ts`, `ui/`.

If `+layout.server.ts` exists, `+layout.svelte` must exist too.

## Subdomains

- `module/_sub/` — internal subdomain. The prefix `_` hides it from routing.
- `module/sub/` — public subdomain. It has its own route.

Both follow the same structure as modules.

## File Contracts

### `schema.ts`
Only ORM table definitions.

### `model.server.ts`
Only data operations that call repo functions.

### `rpc.ts`
Only API handlers. Each handler validates its input and calls one model function. Never re-export model functions from `rpc.ts`; aggregate subdomain rpc through a composer (see Cross-Domain Communication).

### `controller.ts` / `controller.svelte.ts` / `stores.ts` / `state.ts`
Only reactive state and handlers.

Svelte 5 runes (preferred):

```typescript
class UserController {
  user = $state<User | null>(null)

  async login(email: string, password: string) { /* ... */ }
}

export const userController = new UserController()
```

Svelte 4 stores (legacy):

```typescript
export const user = writable<User | null>(null)

export const login = async (email: string, password: string) => { /* ... */ }
```

### `+page.svelte`
Only markup. It imports state from the controller. It contains no data fetching.

### `policy.ts`
Only access rules.

### `types.ts`
Only types and interfaces.

### `constants.ts`
Only constants and enums.

When writing code, extract declarations into these files instead of leaving them inline: types and interfaces go to `types.ts`, constants, enums, and magic values go to `constants.ts` — even when only one file uses them today. Models, controllers, and components import them from there.

### `utils.ts`
Only helper functions.

### `index.ts`
Re-exports the public API of the module:

```typescript
export * from './model.server'
export * from './rpc'
export * from './controller'
export * from './types'
export * from './constants'
```

## Cross-Domain Communication

Two kinds of links: parent → subdomain, and sibling domains. Both go through public entries only.

Parent → subdomain (top-down only):
- Model: the parent model calls subdomain models when a subdomain process is part of the parent process.
- State: the parent shares stores/hooks through context; derived state for a selected object is a derived store in the controller, never in markup.
- RPC: the parent rpc aggregates subdomain rpc objects into one entry point.

Sibling domains: call another domain only through its public rpc entry, imported via a configured alias (`$cart`, `@cart`), not a relative path:

```typescript
// rpc.ts is a handler class, never a re-export of the model
import { Composer, toRPC } from '@chord-ts/rpc'
import * as model from './model.server'
import { Items } from './items/rpc'

export class Cart {
  async getSummary(userId: string) {
    const cart = await model.getCart(userId)
    return { ...cart, isEmpty: cart.items.length === 0 }
  }
}

export const composer = Composer.init({
  Cart: toRPC(new Cart()),
  Items: toRPC(new Items()),
})
```

Rules:
- Never re-export model functions from `rpc.ts`; public methods validate input and call the model.
- Never import the `model.server.ts`, repo, or controller of another domain.
- Child → parent imports are forbidden (cycle); siblings never reach into subdomains behind the parent entry.

## Forms and Routes

Handle form submits in the `actions` of `+page.server.ts`. Handle dynamic routes with a `[id]/` subfolder.

## Reusable Components

A component used by one module goes to the `ui/` folder of that module. A component used by several modules goes to `lib/ui/`. Global stores go to `lib/universal/stores/`.

## Creating a New Domain

1. Ask which framework the project uses when you do not know.
2. Create the folder structure for that framework.
3. Create the required files from the table above.
4. Add optional files when the task needs them.
5. Re-export the public API from `index.ts`.
6. Check the dependency rules for each new file.
7. Run the validation checklist.

## Validation Checklist

When you review code, check each item:

1. Every module has `index.ts`.
2. UI imports no repo, model, or rpc directly.
3. `model.server` and `rpc` contain no UI imports.
4. `+layout.server.ts` has a matching `+layout.svelte`.
5. Each file exports only its contract.
6. Cross-domain imports use the neighbor's `rpc.ts` entry through an alias.
7. Reusable UI lives in `lib/ui/`, not in a module `ui/`.
8. `+page.server.ts` exists in every module.
9. `rpc.ts` re-exports no model; cross-domain entries are composed handlers.
10. Types live in `types.ts` and constants in `constants.ts`, not inline in logic files.

## Framework Mapping

| Concept | SvelteKit | Next.js | Nuxt |
|---|---|---|---|
| Page | `+page.svelte` | `page.tsx` | `index.vue` |
| Layout | `+layout.svelte` | `layout.tsx` | `layout.vue` |
| Server load | `+page.server.ts` | `page.server.tsx` | `setup.ts` |
| Server actions | `+page.server.ts` | `actions.ts` | `server/` |
| API routes | `+server.ts` | `route.ts` | `/server/api/` |
| RPC | `rpc.ts` | `rpc.ts` | `rpc.ts` |
| Model | `model.server.ts` | `model.ts` | `model.ts` |

## Response Style

- Answer briefly but completely.
- Name the FDA principle behind each decision you explain.
- Follow the layer separation in every code suggestion.
- When code breaks an FDA rule, name the rule and propose a fix.
- Prefer explicit contracts over implicit behavior.