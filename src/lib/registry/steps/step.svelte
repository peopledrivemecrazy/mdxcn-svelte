<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type StepState = 'done' | 'now' | 'next';

	export type StepProps = {
		/** One line. Drawn next to the number. */
		title?: string;
		/** now uses the accent. next recedes. done (default) stays plain. */
		state?: StepState;
		/** Markdown. The body of the step. */
		children?: Snippet;
	};
</script>

<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	/** `<Step title="Install">Run the CLI.</Step>` inside `<Steps>`. */
	let { title, state, children }: StepProps = $props();

	registerItem('Step', () => ({ title, state, children }));
</script>
