<!-- incident window — days as one string. empty days sit as dashes so a gap stays visible. -->
<script lang="ts">
	import { GraphUptime } from '$lib/registry/graph-uptime/index.js';
</script>

<GraphUptime
	title="WEBHOOKS"
	from="Mon"
	to="Fri"
	days="ok ok ok degraded ok empty empty ok down ok ok ok"
/>
