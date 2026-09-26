<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	import type { TimelineEvent } from './types.js';

	/** `<Event date="Mar 18" label="Docs, live previews" state="now" />`. */
	let { date, label, state }: TimelineEvent = $props();

	registerItem('Event', () => ({ date, label, state }));
</script>
