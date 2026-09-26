<!-- tokens — One bar, segments as text. The first segment takes the accent. -->
<script lang="ts">
	import { Bar, GraphStack } from '$lib/registry/graph-stack/index.js';
</script>

<GraphStack title="TOKENS" ticks={28}>
	<Bar label="week" segments="61 prompt, 27 completion, 12 cached" />
</GraphStack>
