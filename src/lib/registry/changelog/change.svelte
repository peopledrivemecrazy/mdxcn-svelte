<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type ChangeType = 'add' | 'change' | 'fix' | 'remove';

	export type ChangeProps = {
		/** add is the accent. remove recedes. change and fix stay plain. */
		type?: ChangeType;
		/** Markdown. One change. */
		children?: Snippet;
	};
</script>

<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	/** `<Change type="add">Callout, Steps, Terminal</Change>` inside `<Changelog>`. */
	let { type, children }: ChangeProps = $props();

	registerItem('Change', () => ({ type, children }));
</script>
