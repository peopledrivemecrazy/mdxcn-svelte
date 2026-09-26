<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	/** One number: `<Stat value="12,400" label="docs" />`. `accent` marks the one that matters. */
	export type StatProps = {
		value: string | number;
		label?: string;
		hint?: string;
		accent?: boolean;
	};

	let { value, label, hint, accent }: StatProps = $props();

	registerItem('Stat', () => ({ value, label, hint, accent }));
</script>
