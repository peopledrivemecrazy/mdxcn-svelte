export const source = `## Release 0.4

Two figures side by side, then a table. Plain Markdown: no compiler, no imports.

::row{cols=2}
::graph-meter{title="shipped" value="0.67" caption="of the roadmap"}
::

::graph-spark
---
title: p95 ms
data: [12, 14, 13, 18, 16, 15, 14, 12]
---
::
::

::graph-table
---
title: usage
headers: [name, requests]
rows:
  - [docs, "12,400"]
  - [api, "900"]
footer: [total, "13,300"]
---
::
`;

export const setup = `<script lang="ts">
	import { Markdown } from '@comark/svelte';
	import { graphComponents } from 'mdxcn-svelte/graph-comark';

	let { value }: { value: string } = $props();
</script>

<Markdown {value} components={graphComponents} />`;

export const ssr = `// +page.ts: parse during load so the figures are in the server HTML.
import { parseMarkdown } from 'comark';

export const load = async () => ({ doc: await parseMarkdown(source) });

// +page.svelte
<Markdown value={data.doc} components={graphComponents} />`;
