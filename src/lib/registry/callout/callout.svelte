<script lang="ts" module>
	export type CalloutType = 'note' | 'tip' | 'warning' | 'danger';

	const glyph: Record<CalloutType, string> = {
		note: 'i',
		tip: '+',
		warning: '!',
		danger: '×'
	};

	const tone: Record<CalloutType, string> = {
		note: 'text-graph-muted',
		tip: 'text-graph-accent',
		warning: 'text-graph-accent',
		danger: 'text-destructive'
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Graph, GraphBody, GraphProse, reveal } from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	export type CalloutProps = {
		/** Sets the frame title and the glyph. Default note. */
		type?: CalloutType;
		/** Overrides the frame title. Defaults to the type, uppercase. */
		title?: string;
		/** Markdown. Paragraphs, lists, inline code, links. */
		children?: Snippet;
		corner?: string;
		class?: string;
	};

	let { type = 'note', title, children, corner, class: className }: CalloutProps = $props();
</script>

<Graph class={className} {corner} role="note" title={title ?? type}>
	<GraphBody class="py-6 sm:py-6">
		<div
			class="grid grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-x-3"
			data-reveal
			{@attach reveal({ amount: 0.4 })}
		>
			<span aria-hidden="true" class={cn('text-center leading-relaxed select-none', tone[type])}
				>{glyph[type]}</span
			>
			<GraphProse class="text-foreground">{@render children?.()}</GraphProse>
		</div>
	</GraphBody>
</Graph>
