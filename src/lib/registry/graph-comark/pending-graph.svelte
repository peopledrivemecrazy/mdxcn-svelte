<script lang="ts">
	import { Graph, GraphBody } from '$lib/registry/graph-frame/index.js';

	/**
	 * Shown while a streamed block's props are still incomplete. Comark accepts
	 * a component's `---` YAML fence only once it closes, so for a few frames the
	 * tag exists without data. Reserving the frame keeps the layout stable.
	 */
	let { title }: { title?: string } = $props();
</script>

<Graph {title}>
	<GraphBody class="flex items-center justify-center py-14">
		<span class="font-mono text-sm text-graph-frame select-none">· · ·</span>
	</GraphBody>
</Graph>
