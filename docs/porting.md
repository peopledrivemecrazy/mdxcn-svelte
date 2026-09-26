# Porting a graph from mdxcn (React) to Svelte

Upstream: `keshav-exe/mdxcn`, MIT. Its React source is the spec for look, glyphs, props and motion. The Svelte version must render the same characters, classes and layout.

## Files per graph

| Upstream | Here |
| --- | --- |
| `registry/default/graph-x/graph-x.tsx` | `src/lib/registry/graph-x/graph-x.svelte` (+ one `.svelte` per item child) and `index.ts` |
| entry in `lib/docs/catalog.ts` | `src/docs/catalog/graph-x.ts` (default export, `satisfies CatalogEntry`) |
| entries in `components/docs/examples.tsx` | `src/docs/examples/graph-x/NN-name.svelte`, one file per example |
| — | `src/tests/graph-x.test.ts` server-render test |

Copy `graph-meter` and `graph-table` for shape. `index.ts` exports the component as `GraphX`, its item components, and `type GraphXProps`.

## Rules

- Svelte 5 runes only: `$props`, `$derived`, `$state`, snippets, `{@attach}`. No `export let`, no slots, no stores, no `createEventDispatcher`.
- Import frame pieces from `$lib/registry/graph-frame/index.js` and `cn` from `$lib/utils.js`. Relative imports inside one graph folder. Use `.js` extensions on TS imports.
- `className` becomes `class`. Keep every Tailwind class string from upstream verbatim unless a Svelte difference forces a change.
- Props type is exported from the component: `export type GraphXProps = {...}` inside `<script lang="ts">`, then `let {...}: GraphXProps = $props()`.
- Derive, do not mirror: computed values are `$derived`/`$derived.by`, never `$effect` writing `$state`.
- `{#each}` blocks need a key.
- Upstream `React.ReactNode` props become `string` (or a `Snippet` where the content is genuinely markup, such as prose bodies). Name snippet props after upstream.
- No new dependencies.

## Children

React mdxcn reads three kinds of children. Svelte cannot inspect snippets, so:

1. **Item children** (`<Row>`, `<Stat>`, `<Task>`, `<Node>`…). Each is its own `.svelte` file that calls `registerItem('Tag', () => ({ ...props }))` and renders nothing (or `{@render children?.()}` when items nest, e.g. tree nodes, after calling `provideItems()` itself). The graph calls `const items = provideItems()`, renders `{@render children?.()}` **before** its markup, and reads `items.list<P>('Tag')`. Text that upstream took from an item's children becomes a prop (`label`, `text`, `cells`…); if the item's children are display markup, pass the `children` snippet through the registered props and `{@render}` it in the graph.
   Shared `Head`, `Row`, `Foot` live in `graph-frame` (props `cells`, `label`, `align`). Reuse them for table-like graphs.
2. **Markdown children** (a table, list or `### heading` written inside the tag). Not supported directly: the data props and item children cover the same ground, and Comark (`::graph-x` blocks) covers Markdown. Drop `tableOf`, `listItems`, `headingSections`, `textOf`, `paragraphsOf` paths.
3. **Prose children** (callout, quote, terminal bodies). Render the `children` snippet inside `GraphProse` or wherever upstream rendered `children`.

Keep every data prop and every string shorthand (`"2 3 4"`, `"67%"`, `"a | b"`) via `numbers`, `words`, `fraction`, `numberOf`, `cellsOf`, `splitLabel`, `splitDash`, `firstToken` from `graph-frame`.

## Motion

`motion/react` is gone. Use the `reveal` attachment from `graph-frame`:

- `motion.tbody` + `staggerList` + `motion.tr variants={fadeUp}` → `<tbody {@attach reveal({ stagger: 0.04, amount: 0.4 })}>` and `data-reveal` on each row.
- A single `fadeUp` element → `<div data-reveal {@attach reveal()}>`.
- Opacity-only fills with `fillDelay` → container `{@attach reveal({ y: 0, delayOf: (_, i) => fillDelay(false, i) })}`, `data-reveal` on each filled glyph.
- Width/scale transforms (`scaleX` from 0) → `reveal` cannot do these; use the same pattern with a `transform-origin` class and a CSS-free Web Animation only if upstream relies on it visually, otherwise a fade is acceptable. Note it in your report.
- Only elements carrying `data-reveal` are hidden before reveal. Never put `data-reveal` on an element no attachment will reach.
- Attachments pass through components: `<GraphTrack {@attach reveal(...)}>` works.

## Time

`useGraphNow()` → `const now = new GraphNow(interval)` from `graph-frame`, read `now.current` (null on the server and before mount). Formatting helpers (`formatHms`, `formatAgo`, `formatClock`, `parseInstant`) are there too.

## Examples

One file per upstream example, same order, numbered `01-`, `02-`. First line is `<!-- title — description -->` using upstream's title and description. Import from `$lib/registry/graph-x/index.js`. Rewrite JSX to Svelte (`{...}` props, item children instead of Markdown children). An upstream example that only demonstrates Markdown children: port it with item children or data props instead.

## Catalog

Port upstream's entry: `slug`, `title`, `name`, `description`, `props`. Add `category` (the section upstream files it under in `lib/docs/catalog.ts`), `importPath: 'mdxcn-svelte/graph-x'`, `exports`, and `items` for item children. Use the shared `corner`, `className`, `glyphs`, `palette` rows from `../types.js`. Rewrite types to Svelte (`ReactNode` → `Snippet` or `string`, `className` → `class`).

## Verify

- `bunx vitest --run --project server src/tests/graph-x.test.ts` passes, rendering every example through `svelte/server` and asserting key text.
- Run the Svelte MCP autofixer on each `.svelte` file until it reports no issues.
- `bun run check` reports no errors in your files.
