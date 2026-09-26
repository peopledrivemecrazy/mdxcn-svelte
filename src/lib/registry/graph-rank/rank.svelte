<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	/** One row inside `<GraphRank>`: `<Rank label="/install" value={4100} />`. */
	export type RankItem = {
		label?: string;
		value: number | string;
		display?: string;
	};

	let { label, value, display }: RankItem = $props();

	registerItem('Rank', () => ({ label, value, display }));
</script>
