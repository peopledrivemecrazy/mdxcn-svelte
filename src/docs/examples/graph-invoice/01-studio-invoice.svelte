<!-- studio invoice -->
<script lang="ts">
	import { GraphInvoice, Item, Meta, Total } from '$lib/registry/graph-invoice/index.js';
</script>

<GraphInvoice
	title="INVOICE 0041"
	from="mdxcn"
	to="Acme Studio"
	note="Net 30. Wire to the account on file."
>
	<Meta label="No." value="0041" />
	<Meta label="Issued" value="Mar 12, 2026" />
	<Meta label="Due" value="Apr 11, 2026" />
	<Item description="Design system" qty="1" rate="4,200" amount="4,200" />
	<Item description="Motion pass" qty="1" rate="1,800" amount="1,800" />
	<Item description="Docs rewrite" qty="8h" rate="180" amount="1,440" />
	<Total label="Amount due" value="7,440" accent />
</GraphInvoice>
