<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	import type { DiffLineProps } from './types.js';

	/** `<Line sign="add" label="app" value="31 kb" />`. `total` puts it under the rule. */
	let { label, value, sign, total }: DiffLineProps = $props();

	registerItem('Line', () => ({ label, value, sign, total }));
</script>
