<script lang="ts">
	import { GraphTable } from '$lib/registry/graph-table/index.js';

	import type { PropRow } from '../types.js';

	let { rows, title = 'PROPS' }: { rows: PropRow[]; title?: string } = $props();
</script>

<GraphTable
	{title}
	align="left left left left"
	headers={['Prop', 'Type', 'Default', 'Description']}
	rows={rows.map((row) => [row.name, row.type, row.default ?? '—', row.description])}
/>
