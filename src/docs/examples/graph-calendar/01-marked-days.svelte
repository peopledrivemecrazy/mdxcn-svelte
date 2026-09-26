<!-- marked days — month is 1–12. today is passed in so render stays stable. -->
<script lang="ts">
	import { GraphCalendar } from '$lib/registry/graph-calendar/index.js';
</script>

<GraphCalendar year={2026} month={8} today={27} marks="12 18 27" />
