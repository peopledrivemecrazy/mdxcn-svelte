<script lang="ts">
	import { Graph, GraphBody, reveal } from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	import { parseTerminal } from './parse.js';

	export type TerminalProps = {
		title?: string;
		/** The prompt glyph that marks a command line. Default `$`. */
		prompt?: string;
		/** The session as one string. `$ cmd` is a command, `# …` a comment. */
		text?: string;
		/** The session as one string per line. Used when `text` is not set. */
		lines?: readonly string[];
		corner?: string;
		class?: string;
	};

	let {
		title = 'shell',
		prompt = '$',
		text,
		lines: lineList,
		corner,
		class: className
	}: TerminalProps = $props();

	const lines = $derived(parseTerminal(text ?? lineList?.join('\n') ?? '', prompt));
</script>

<Graph class={className} {corner} {title}>
	<GraphBody class="graph-scroll-x">
		<pre
			class="m-0 flex min-w-max flex-col gap-0.5 leading-relaxed whitespace-pre"
			{@attach reveal({ stagger: 0.04, amount: 0.3 })}>{#each lines as line, index (index)}<code
					class={cn(
						'grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-2',
						line.kind === 'command' && 'text-foreground',
						line.kind === 'comment' && 'text-graph-muted',
						line.kind === 'ok' && 'text-graph-accent',
						line.kind === 'output' && 'text-graph-muted'
					)}
					data-reveal
					><span
						aria-hidden="true"
						class={cn(
							'text-center select-none',
							line.kind === 'command' ? 'text-graph-accent' : 'text-transparent'
						)}>{line.kind === 'command' ? prompt : ' '}</span
					><span>{line.text || ' '}</span></code
				>{/each}</pre>
	</GraphBody>
</Graph>
