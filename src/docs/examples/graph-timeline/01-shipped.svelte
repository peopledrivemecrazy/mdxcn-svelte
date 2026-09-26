<!-- shipped — The current row is filled with the accent. The next one is hollow. -->
<script lang="ts">
	import { Event, GraphTimeline } from '$lib/registry/graph-timeline/index.js';
</script>

<GraphTimeline title="SHIPPED">
	<Event date="Mar 12" label="CLI copies the files" />
	<Event date="Mar 18" label="Docs, live previews" state="now" />
	<Event date="Apr 02" label="Registry listed" state="next" />
</GraphTimeline>
