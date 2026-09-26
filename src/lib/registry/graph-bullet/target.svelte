<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	/** One row inside `<GraphBullet>`: `<Target label="CPU" value={72} target={80} max={100} />`. */
	export type BulletItem = {
		label?: string;
		value: number | string;
		target?: number | string;
		max?: number | string;
		display?: string;
	};

	let { label, value, target, max, display }: BulletItem = $props();

	registerItem('Target', () => ({ label, value, target, max, display }));
</script>
