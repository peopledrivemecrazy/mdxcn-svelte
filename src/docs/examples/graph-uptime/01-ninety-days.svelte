<!-- ninety days — One glyph per day, wrapped every 30. Percent is the share of ok days. -->
<script lang="ts">
	import { GraphUptime, type UptimeStatus } from '$lib/registry/graph-uptime/index.js';

	const days = Array.from({ length: 90 }, (_, index): UptimeStatus => {
		if (index === 41 || index === 42) {
			return 'down';
		}
		if (index === 18 || index === 60 || index === 61) {
			return 'degraded';
		}
		return 'ok';
	});
</script>

<GraphUptime title="API" from="Jun 1" to="Aug 29" {days} />
