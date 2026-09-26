<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		Graph,
		GraphBody,
		GraphProse,
		GraphRule,
		reveal
	} from '$lib/registry/graph-frame/index.js';

	export type QuoteProps = {
		/** Who said it. Drawn after an em dash. */
		by?: string;
		/** Where. Book, talk, thread. Muted, after the name. */
		source?: string;
		/** Optional frame title. Off by default so the quote is the frame. */
		title?: string;
		/** Markdown. The quote itself. */
		children?: Snippet;
		corner?: string;
		class?: string;
	};

	let { by, source, title, children, corner, class: className }: QuoteProps = $props();

	const cite = $derived(by || source);
</script>

<Graph class={className} {corner} {title}>
	<GraphBody>
		<blockquote class="m-0 flex flex-col gap-5 p-0" data-reveal {@attach reveal({ amount: 0.4 })}>
			<div class="grid grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-x-3">
				<span
					aria-hidden="true"
					class="text-center text-base leading-relaxed text-graph-accent select-none sm:text-lg"
				>
					“
				</span>
				<GraphProse class="text-base leading-relaxed text-foreground sm:text-lg">
					{@render children?.()}
				</GraphProse>
			</div>
			{#if cite}
				<GraphRule />
				<footer class="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3">
					<span aria-hidden="true" class="text-center select-none">—</span>
					<span class="flex min-w-0 flex-wrap gap-x-2">
						{#if by}
							<cite class="text-foreground not-italic">{by}</cite>
						{/if}
						{#if source}
							<span class="text-graph-muted">{source}</span>
						{/if}
					</span>
				</footer>
			{/if}
		</blockquote>
	</GraphBody>
</Graph>
