<!-- quote -->
<script lang="ts">
	import { GraphInvoice, Item, Meta, Total } from '$lib/registry/graph-invoice/index.js';
</script>

<GraphInvoice title="QUOTE" from="mdxcn" to="Northwind">
	<Meta label="Valid until" value="May 01" />
	<Item description="Registry install" amount="0" />
	<Item description="Custom graph" amount="2,400" />
	<Total label="Estimate" value="2,400" accent />
</GraphInvoice>
