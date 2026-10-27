# thicket-web

Web storefront for **Thicket**, built with React, Vite, and Apollo Client. Browse
products, manage a cart, check out, and view order history and receipts.

It consumes the GraphQL API in
[thicket-api](https://github.com/mtyates-coderabbit/thicket-api).

## Requirements

- Node.js 20 or later
- A running thicket-api on port 4000

## Running locally

Start the API first:

```bash
git clone https://github.com/mtyates-coderabbit/thicket-api.git
cd thicket-api && npm install && npm run dev
```

Then, in this repository:

```bash
npm install
npm run dev
```

Open <http://localhost:5173>. The dev server proxies `/graphql` to
`http://localhost:4000`. To point at a different API, set `VITE_API_URL`.

## GraphQL workflow

Operations and fragments live in `src/graphql/`. Typed documents are generated into
`src/gql/graphql.ts`:

```bash
npm run schema:pull   # refresh schema/thicket-api.graphql
npm run codegen       # regenerate src/gql/graphql.ts
```

`schema:pull` copies from a sibling `../thicket-api` checkout when one exists, and
otherwise downloads the schema from thicket-api `main`. CI always uses `main`.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build into `dist/` |
| `npm run typecheck` | Type-check the project |
| `npm test` | Run tests |
| `npm run schema:pull` | Refresh the vendored API schema |
| `npm run codegen` | Generate typed GraphQL documents |
