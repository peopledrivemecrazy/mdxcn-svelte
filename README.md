# mdxcn-svelte

Svelte 5 components for ASCII-style tables, charts, and diagrams. Each figure sits in a dashed frame with its title on the top edge, glyphs do the drawing, and one accent colors it. A port of [mdxcn](https://github.com/keshav-exe/mdxcn) (React) by Keshav Bagaade.

Works in SvelteKit pages, mdsvex Markdown, and plain Markdown rendered at runtime with [Comark](https://comark.dev). Knap filters turn the same props into framed ASCII for READMEs and PR comments.

## Install

```bash
bun add mdxcn-svelte
```

Requires Svelte 5.29+ and Tailwind CSS v4. In the CSS file that imports Tailwind:

```css
@import 'tailwindcss';
@import 'mdxcn-svelte/tokens.css'; /* full palette, fonts, accent presets */
/* or, if you already define shadcn-style --background / --foreground: */
/* @import 'mdxcn-svelte/theme.css'; */
```

Both stylesheets point Tailwind at the package's class names, so nothing else is needed.

## Use

```svelte
<script lang="ts">
	import { GraphMeter } from 'mdxcn-svelte/graph-meter';
	import { GraphTable, Head, Row, Foot } from 'mdxcn-svelte/graph-table';
</script>

<GraphMeter title="shipped" value="67%" caption="of the roadmap" />

<GraphTable title="usage">
	<Head cells="name | requests" />
	<Row cells="docs | 12,400" />
	<Row cells="api | 900" />
	<Foot cells="total | 13,300" />
</GraphTable>
```

Every graph takes data props (`rows`, `items`, `data`…). Most also take item children such as `<Row>`, `<Stat>` or `<Node>`: small components that register their props with the enclosing graph, so the same figure reads well in a template. Shorthand strings work everywhere: `"2 3 4"`, `"67%"`, `"a | b"`.

Dark mode follows a `.dark` class on `<html>` (shadcn-svelte, mode-watcher). Accents: `<html data-accent="mint">`, or set `--graph-accent`, `--graph-accent-2`, `--graph-accent-3` yourself. Drawing graphs take `palette="duo" | "multi"` and `glyphs="shade" | "ascii" | "hash" | "bar"` or your own characters.

### Comark

```svelte
<script lang="ts">
	import { Markdown } from '@comark/svelte';
	import { graphComponents } from 'mdxcn-svelte/graph-comark';
</script>

<Markdown value={markdown} components={graphComponents} />
```

```md
::graph-meter{title="shipped" value="0.67"}
::
```

Parse with `parseMarkdown` from `comark` in a `load` function to get the figures into server-rendered HTML.

### Knap

```ts
import { createEngine, standardFilters } from 'knap';
import { graphFilters } from 'mdxcn-svelte/graph-knap';

const engine = createEngine({ filters: { ...standardFilters, ...graphFilters } });
const { output } = await engine.render('{{ v | graph_meter:"SHIPPED" }}', {
	variables: { v: 0.67 }
});
```

## Components

| Component      | Import                         | Category | Use for                                                   |
| -------------- | ------------------------------ | -------- | --------------------------------------------------------- |
| Callout        | `mdxcn-svelte/callout`         | content  | An aside between paragraphs — a caveat, a tip, a warning  |
| Changelog      | `mdxcn-svelte/changelog`       | content  | One release                                               |
| Quote          | `mdxcn-svelte/quote`           | content  | Someone else's sentence, with a name under it             |
| Steps          | `mdxcn-svelte/steps`           | content  | A numbered procedure                                      |
| Terminal       | `mdxcn-svelte/terminal`        | content  | A shell session                                           |
| GraphFlow      | `mdxcn-svelte/graph-flow`      | diagrams | A process on a dashed arrow                               |
| GraphGantt     | `mdxcn-svelte/graph-gantt`     | diagrams | Work that overlaps on a shared calendar                   |
| GraphTimeline  | `mdxcn-svelte/graph-timeline`  | diagrams | A dated list                                              |
| GraphTree      | `mdxcn-svelte/graph-tree`      | diagrams | Nested nodes drawn with branch glyphs                     |
| GraphCheck     | `mdxcn-svelte/graph-check`     | data     | A punch list                                              |
| GraphCompare   | `mdxcn-svelte/graph-compare`   | data     | Two options side by side                                  |
| GraphDiff      | `mdxcn-svelte/graph-diff`      | data     | What was added, removed, or kept                          |
| GraphInvoice   | `mdxcn-svelte/graph-invoice`   | data     | From, bill-to, line items, and a totals block             |
| GraphKpi       | `mdxcn-svelte/graph-kpi`       | data     | One large number with a sparkline under it                |
| GraphMatrix    | `mdxcn-svelte/graph-matrix`    | data     | Exact numbers on both axes                                |
| GraphSheet     | `mdxcn-svelte/graph-sheet`     | data     | A table with section titles — an API, an RFC              |
| GraphSpec      | `mdxcn-svelte/graph-spec`      | data     | Aligned label and value rows                              |
| GraphStat      | `mdxcn-svelte/graph-stat`      | data     | Two to four large numbers                                 |
| GraphTable     | `mdxcn-svelte/graph-table`     | data     | A framed table                                            |
| GraphActivity  | `mdxcn-svelte/graph-activity`  | charts   | GitHub-style contribution grid                            |
| GraphBars      | `mdxcn-svelte/graph-bars`      | charts   | Two small histograms, before and after                    |
| GraphBullet    | `mdxcn-svelte/graph-bullet`    | charts   | Actual versus target on a shared track                    |
| GraphCells     | `mdxcn-svelte/graph-cells`     | charts   | A small 0/1 grid                                          |
| GraphFunnel    | `mdxcn-svelte/graph-funnel`    | charts   | Steps that get narrower as people drop off                |
| GraphHeatmap   | `mdxcn-svelte/graph-heatmap`   | charts   | A labeled grid of intensities                             |
| GraphMeter     | `mdxcn-svelte/graph-meter`     | charts   | Progress bar drawn with = characters                      |
| GraphPlot      | `mdxcn-svelte/graph-plot`      | charts   | Line or area chart built from columns of block characters |
| GraphRank      | `mdxcn-svelte/graph-rank`      | charts   | Labels ranked by a number                                 |
| GraphSlope     | `mdxcn-svelte/graph-slope`     | charts   | Two figures per row with an arrow between                 |
| GraphSpark     | `mdxcn-svelte/graph-spark`     | charts   | Sparkline from block characters                           |
| GraphStack     | `mdxcn-svelte/graph-stack`     | charts   | Parts of a whole on one track                             |
| GraphWaffle    | `mdxcn-svelte/graph-waffle`    | charts   | Grid of 100 cells                                         |
| GraphWaterfall | `mdxcn-svelte/graph-waterfall` | charts   | Running total as floating bars                            |
| GraphCalendar  | `mdxcn-svelte/graph-calendar`  | time     | One month as a seven-column grid                          |
| GraphCountdown | `mdxcn-svelte/graph-countdown` | time     | Time left until a date                                    |
| GraphTimer     | `mdxcn-svelte/graph-timer`     | time     | Elapsed time, how long ago, or the time of day            |
| GraphUptime    | `mdxcn-svelte/graph-uptime`    | time     | One glyph per day                                         |

Shared frame primitives (`Graph`, `GraphBody`, `GraphTrack`, `GraphTick`, `reveal`, glyph and palette helpers) come from `mdxcn-svelte/graph-frame` for building your own figures.

## Differences from mdxcn

- A package, not copy-paste registry files. The sources are plain `.svelte` files under `src/lib/registry`, so copying a folder still works.
- No `motion` dependency. Enter animations use the Web Animations API through the `reveal` attachment: transform and opacity only, 220 ms, once, and off under `prefers-reduced-motion`.
- Svelte cannot read a component's children, so Markdown written inside a graph tag (a table, a list) is not parsed. Use data props, item children, or Comark blocks.
- `className` is `class`.

## Develop

```bash
bun install
bun run dev        # docs site
bun run test       # server-render tests + headless browser tests
bun run check      # svelte-check
bun run build      # static docs site in build/, package in dist/
```

`docs/porting.md` describes how a graph is ported and verified.

## License

MIT. See `LICENSE`; the original mdxcn is MIT © Keshav Bagaade.
