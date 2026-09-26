<!-- incident — Times work as dates. -->
<script lang="ts">
	import { Event, GraphTimeline } from '$lib/registry/graph-timeline/index.js';
</script>

<GraphTimeline title="INCIDENT">
	<Event date="14:02" label="p95 crossed 800ms" />
	<Event date="14:11" label="rolled back the cache flag" state="now" />
	<Event date="14:40" label="write the postmortem" state="next" />
</GraphTimeline>
