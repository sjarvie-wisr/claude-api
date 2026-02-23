# Next.js Migration Plan — Wisr Developer Portal

**Goal:** Rebuild `wisr-api-portal.html` (a 724-line static HTML file) as a React + Next.js
application. SSR ensures partners see the page fast on first load. Each PR below is sized
for a focused, same-day code review.

**Stack choices:**
- Next.js 15 (App Router) · TypeScript · Tailwind CSS · `swagger-ui-react` (dynamic import)
- React Context for partner-type state (`'all' | 'broker' | 'referrer'`)
- Content in TypeScript data files so docs updates never touch component JSX

---

## Directory Structure

```
/
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # Root layout — wraps every page
│   ├── page.tsx                    # / → Overview & Flow (default section)
│   ├── quickstart/page.tsx
│   ├── auth/page.tsx
│   ├── rate-estimate/
│   │   ├── post/page.tsx
│   │   └── get/page.tsx
│   ├── application/
│   │   ├── put/page.tsx
│   │   ├── post/page.tsx
│   │   └── get/page.tsx
│   ├── terms/page.tsx
│   ├── errors/page.tsx
│   ├── validation/page.tsx
│   ├── legal/page.tsx
│   └── swagger/page.tsx            # Dynamically imported Swagger UI
│
├── components/
│   ├── layout/                     # Shell — all Client Components (interactive)
│   │   ├── TopNav.tsx
│   │   ├── SearchBar.tsx
│   │   ├── PartnerBar.tsx
│   │   └── Sidebar.tsx
│   └── ui/                         # Primitives — mostly Server Components
│       ├── MethodBadge.tsx
│       ├── ReqBadge.tsx
│       ├── SectionHeader.tsx
│       ├── EndpointCard.tsx         # Client Component (toggle expand/collapse)
│       ├── CodeBlock.tsx            # Client Component (tab switch + copy)
│       ├── StatusRow.tsx
│       ├── PartnerNote.tsx          # Client Component (reads PartnerContext)
│       └── FlowDiagram.tsx
│
├── context/
│   └── PartnerContext.tsx           # Client Component — global partner type state
│
└── lib/
    ├── config.ts                    # Base URLs, env vars, nav structure
    └── content/                    # Data-driven documentation content
        ├── navigation.ts            # Sidebar nav items + section metadata
        ├── rate-estimate.ts         # POST/GET rate estimate params, statuses
        ├── application.ts           # PUT/POST/GET application params, statuses
        └── reference.ts            # Errors table, validation rules, legal text
```

---

## Server Components vs Client Components

| Component | Type | Reason |
|---|---|---|
| All `app/*/page.tsx` | Server Component | Static doc content, benefits from SSR |
| `app/layout.tsx` | Server Component | Shell is static; interactive children opt-in |
| `PartnerContext.tsx` | Client (`'use client'`) | React context requires browser runtime |
| `TopNav`, `SearchBar`, `PartnerBar`, `Sidebar` | Client (`'use client'`) | User interactions (search, toggle, active link) |
| `PartnerNote` | Client (`'use client'`) | Reads PartnerContext to show/hide |
| `EndpointCard` | Client (`'use client'`) | Expand/collapse toggle |
| `CodeBlock` | Client (`'use client'`) | Tab switching + clipboard API |
| `MethodBadge`, `ReqBadge`, `StatusRow`, `FlowDiagram`, `SectionHeader` | Server Component | Pure presentational, no interactivity |
| `app/swagger/page.tsx` | Client (`'use client'`) | `dynamic(() => import('swagger-ui-react'), { ssr: false })` |

---

## Route Mapping (HTML sections → Next.js pages)

| Old `showSection(id)` | New URL | Page File |
|---|---|---|
| `'overview'` | `/` | `app/page.tsx` |
| `'quickstart'` | `/quickstart` | `app/quickstart/page.tsx` |
| `'auth'` | `/auth` | `app/auth/page.tsx` |
| `'re-post'` | `/rate-estimate/post` | `app/rate-estimate/post/page.tsx` |
| `'re-get'` | `/rate-estimate/get` | `app/rate-estimate/get/page.tsx` |
| `'app-put'` | `/application/put` | `app/application/put/page.tsx` |
| `'app-post'` | `/application/post` | `app/application/post/page.tsx` |
| `'app-get'` | `/application/get` | `app/application/get/page.tsx` |
| `'terms'` | `/terms` | `app/terms/page.tsx` |
| `'errors'` | `/errors` | `app/errors/page.tsx` |
| `'validation'` | `/validation` | `app/validation/page.tsx` |
| `'legal'` | `/legal` | `app/legal/page.tsx` |
| _(nav link "Swagger ↗")_ | `/swagger` | `app/swagger/page.tsx` |

---

## Swagger Dynamic Import (key pattern)

```tsx
// app/swagger/page.tsx
'use client';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function SwaggerPage() {
  const url = process.env.NEXT_PUBLIC_SWAGGER_URL; // set per environment
  return <SwaggerUI url={url} />;
}
```

`ssr: false` prevents the swagger-ui bundle (which uses browser APIs) from running during
server rendering. The page shell renders on the server; swagger loads client-side.

---

## PartnerContext Design

```tsx
// context/PartnerContext.tsx
'use client';
type Partner = 'all' | 'broker' | 'referrer';
const PartnerContext = createContext<{ partner: Partner; setPartner: (p: Partner) => void }>(...);
export function PartnerProvider({ children }) { ... }
export const usePartner = () => useContext(PartnerContext);

// components/ui/PartnerNote.tsx — reads context, renders only for matching partner
'use client';
export function PartnerNote({ type, children }: { type: 'broker' | 'referrer'; children: React.ReactNode }) {
  const { partner } = usePartner();
  if (partner !== 'all' && partner !== type) return null;
  return <div className={type === 'broker' ? 'broker-note' : 'referrer-note'}>...</div>;
}
```

---

## PR Breakdown

### PR 1 — Project Scaffolding
**~6 files · Foundation for everything else**

Sets up the Next.js project. No content, no components. Purely configuration.

| File | Purpose |
|---|---|
| `package.json` | Next.js 15, React 19, TypeScript, Tailwind, `swagger-ui-react` |
| `next.config.ts` | Minimal config — enable strict mode |
| `tailwind.config.ts` | Map existing CSS variables: `navy: '#323F51'`, `teal: '#62C4BB'`, `teal-dark`, `teal-light`, `bg`, `code-bg` |
| `tsconfig.json` | Standard Next.js TypeScript config |
| `app/layout.tsx` | Root layout — `<html>`, `<body>`, placeholder `{children}` |
| `styles/globals.css` | Tailwind `@base`/`@components`/`@utilities` directives + CSS resets |

**Reviewable question:** "Does the project setup look right before we write any components?"

---

### PR 2 — Content Data Files
**~4 files · ~150 lines total · No JSX**

Extracts all documentation content from the HTML into typed TypeScript objects.
PRs 5-8 import from these files — changing doc content later means editing data only.

| File | Contains |
|---|---|
| `lib/config.ts` | `BASE_URLS` (sandbox/prod), `SWAGGER_URLS`, `API_VERSION = 'v3'` |
| `lib/content/navigation.ts` | `NAV_SECTIONS` array — section groups, items, method badges, href |
| `lib/content/rate-estimate.ts` | `RE_POST_PARAMS`, `RE_GET_STATUSES` — typed arrays of table rows + status rows |
| `lib/content/application.ts` | `APP_PUT_PARAMS`, `APP_GET_STATUSES`, `ERRORS_TABLE`, `VALIDATION_RULES` |

**Example shape:**
```ts
// lib/content/rate-estimate.ts
export const RE_POST_PARAMS: Param[] = [
  { field: 'loanAmount', type: 'number', required: 'required', notes: 'Amount to borrow' },
  { field: 'loanPurpose', type: 'string', required: 'required', notes: 'e.g. "holiday", "car"' },
  ...
];
```

**Reviewable question:** "Is the data shape right? Is anything missing from the original HTML?"

---

### PR 3 — Primitive UI Components (Server Components)
**~6 files · ~200 lines total**

Pure presentational components. No state. Safe to render on the server.

| Component | Props | What it renders |
|---|---|---|
| `MethodBadge` | `method: 'GET' \| 'POST' \| 'PUT'` | Coloured HTTP method pill |
| `ReqBadge` | `level: 'required' \| 'conditional' \| 'optional'` | Coloured requirement badge |
| `SectionHeader` | `title, description, tags?` | Page `<h1>` + subtitle + version tags |
| `StatusRow` | `dot: 'success' \| 'info' \| 'warn' \| 'error'`, `name, description` | Status indicator row |
| `FlowDiagram` | `steps: { num, label, sub }[]` | Numbered flow steps with arrows |
| `ParamTable` | `params: Param[]` | Renders parameter table from data file rows |

**Reviewable question:** "Are these component APIs sensible? Are the Tailwind class names correct?"

---

### PR 4 — Layout Shell (Client Components)
**~5 files · ~280 lines total**

The interactive chrome: nav, sidebar, search, partner toggle, context. Everything that
requires `'use client'` and won't benefit from SSR.

| File | Key details |
|---|---|
| `context/PartnerContext.tsx` | `PartnerProvider`, `usePartner()` hook |
| `components/layout/TopNav.tsx` | Logo SVG, version badge, nav links (uses `next/link`) |
| `components/layout/Sidebar.tsx` | Renders `NAV_SECTIONS` from `lib/content/navigation.ts`, highlights active link via `usePathname()` |
| `components/layout/SearchBar.tsx` | Controlled input, filters sidebar items |
| `components/layout/PartnerBar.tsx` | Toggle group, calls `usePartner()` to update context |
| Updated `app/layout.tsx` | Wraps children in `<PartnerProvider>`, `<TopNav>`, `<PartnerBar>`, `<Sidebar>` |

**Reviewable question:** "Does the layout composition look right? Is context wired up correctly?"

---

### PR 5 — Interactive UI Components (Client Components)
**~3 files · ~200 lines total**

The two components that need client-side interactivity for core UX, plus PartnerNote.

| Component | Details |
|---|---|
| `CodeBlock` | `tabs: { label, id, content }[]` — manages active tab with `useState`, copies text with `navigator.clipboard`. Renders syntax-highlighted `<pre>` using `dangerouslySetInnerHTML` preserving existing `<span class="hl-*">` spans from data file. |
| `EndpointCard` | `method, path, description?, children` — toggles body open/closed with `useState` |
| `PartnerNote` | `type: 'broker' \| 'referrer', children` — reads `usePartner()`, renders `null` when partner filter doesn't match |

**Reviewable question:** "Are these the right interactivity boundaries? Is the CodeBlock approach safe?"

---

### PR 6 — Getting Started Pages
**~3 page files · ~250 lines total**

First pages with real content. These are Server Components — content comes from data files
and JSX. No browser APIs needed.

| Page | Key content |
|---|---|
| `app/page.tsx` | Overview: `<SectionHeader>`, `<FlowDiagram>` (5 steps), base URLs `<EndpointCard>` |
| `app/quickstart/page.tsx` | 3 `<StepCard>` components, `<CodeBlock>` with cURL/Python/JS tabs |
| `app/auth/page.tsx` | Auth headers `<ParamTable>`, `<PartnerNote type="broker">`, `<PartnerNote type="referrer">` |

**Reviewable question:** "Does the SSR content match the original HTML faithfully?"

---

### PR 7 — API Endpoint Pages
**~5 page files · ~350 lines total**

The five endpoint reference pages. All Server Components consuming data from PR 2's files.

| Page | Sections rendered |
|---|---|
| `app/rate-estimate/post/page.tsx` | Endpoint card, performance table, `<ParamTable params={RE_POST_PARAMS}>`, response code block, partner notes |
| `app/rate-estimate/get/page.tsx` | Endpoint card, performance table, status grid from `RE_GET_STATUSES`, referrer note |
| `app/application/put/page.tsx` | Endpoint card, put-specific params table, broker note |
| `app/application/post/page.tsx` | Endpoint card, empty-body explanation |
| `app/application/get/page.tsx` | Endpoint card, `APP_GET_STATUSES` status grid |

**Reviewable question:** "Do the data-driven tables render correctly? Is partner-specific content filtered right?"

---

### PR 8 — Reference Pages + Swagger
**~5 page files · ~200 lines total**

Completes the portal. The Swagger page is the new capability — it embeds `swagger-ui-react`
using dynamic import instead of linking out to an external URL.

| Page | Key detail |
|---|---|
| `app/terms/page.tsx` | Endpoint card + plain text description |
| `app/errors/page.tsx` | HTTP errors table from `ERRORS_TABLE` data |
| `app/validation/page.tsx` | Validation rules table from `VALIDATION_RULES` data |
| `app/legal/page.tsx` | `<details>` collapsible legal text, rendered from data |
| `app/swagger/page.tsx` | `'use client'` + `dynamic(() => import('swagger-ui-react'), { ssr: false })`, URL from `NEXT_PUBLIC_SWAGGER_URL` env var |

**Reviewable question:** "Does the Swagger page load correctly? Are the reference tables complete?"

---

## Environment Variables

```bash
# .env.local (not committed)
NEXT_PUBLIC_API_BASE_SANDBOX=https://apis.sandbox.wisr.tech
NEXT_PUBLIC_API_BASE_PROD=https://apis.wisr.tech
NEXT_PUBLIC_SWAGGER_URL=https://apis-docs.sandbox.wisr.tech/openapi.json  # or prod equivalent
```

All hardcoded URLs from the HTML move here. `lib/config.ts` reads them.

---

## What SSR Gives You

The Getting Started and API pages are Server Components. When a partner opens the portal:

1. Next.js renders the full HTML on the server — the nav, sidebar, and documentation content
   are in the HTTP response. No blank-page flash.
2. React hydrates the interactive parts (partner toggle, search, code copy) client-side.
3. The Swagger page loads its heavy bundle lazily, only when the partner navigates to it —
   this is what `dynamic(..., { ssr: false })` achieves.

---

## Summary

| PR | Scope | Files | Effort |
|---|---|---|---|
| 1 | Project scaffolding | 6 | Small |
| 2 | Content data files | 4 | Small |
| 3 | Primitive UI components | 6 | Small |
| 4 | Layout shell (nav/sidebar/context) | 6 | Medium |
| 5 | Interactive UI components | 3 | Medium |
| 6 | Getting Started pages | 3 | Medium |
| 7 | API Endpoint pages | 5 | Medium |
| 8 | Reference pages + Swagger | 5 | Small–Medium |

Each PR is independently mergeable. PRs 1 and 2 have no dependencies on each other and can
be reviewed in parallel. PRs 3-5 depend on PR 1. PR 6-8 depend on PRs 2-5.
