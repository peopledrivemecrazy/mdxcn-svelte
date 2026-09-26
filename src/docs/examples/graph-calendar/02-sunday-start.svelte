<!-- sunday start — weekStartsOn 0 matches a US calendar. -->
<script lang="ts">
	import { GraphCalendar } from '$lib/registry/graph-calendar/index.js';
</script>

<GraphCalendar
	title="SHIP WEEK"
	year={2026}
	month={3}
	weekStartsOn={0}
	marks={[{ day: 12, accent: true }, { day: 18 }]}
/>
