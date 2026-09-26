<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	/** One row inside `<GraphSlope>`: `<Slope label="docs" from={8200} to={12400} />`. */
	export type SlopeItem = {
		label?: string;
		from: number | string;
		to: number | string;
	};

	let { label, from, to }: SlopeItem = $props();

	registerItem('Slope', () => ({ label, from, to }));
</script>
