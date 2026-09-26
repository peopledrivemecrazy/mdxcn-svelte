<script lang="ts">
	import { Markdown } from '@comark/svelte';

	import { graphComponents } from '$lib/registry/graph-comark/index.js';

	let { doc }: { doc: never } = $props();
</script>

<Markdown value={doc} components={graphComponents} />
