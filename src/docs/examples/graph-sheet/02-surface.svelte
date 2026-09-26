<!-- surface -->
<script lang="ts">
	import { GraphSheet } from '$lib/registry/graph-sheet/index.js';
</script>

<GraphSheet
	title="SURFACE"
	headers={['Name', 'Kind', 'Stable']}
	sections={[
		{
			title: 'Frame',
			rows: [
				['Graph', 'primitive', 'yes'],
				['GraphBody', 'primitive', 'yes']
			]
		},
		{
			title: 'Charts',
			rows: [
				['GraphTable', 'component', 'yes'],
				['GraphSheet', 'component', 'new']
			]
		}
	]}
/>
