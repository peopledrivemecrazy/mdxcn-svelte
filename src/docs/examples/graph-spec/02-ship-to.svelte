<!-- ship to — The data form: pass rows instead of Field children. -->
<script lang="ts">
	import { GraphSpec } from '$lib/registry/graph-spec/index.js';
</script>

<GraphSpec
	title="SHIP TO"
	rows={[
		{ label: 'Name', value: 'A. Rao' },
		{ label: 'City', value: 'Bengaluru' },
		{ label: 'Carrier', value: 'Delhivery' },
		{ label: 'ETA', value: 'Thu', accent: true }
	]}
/>
