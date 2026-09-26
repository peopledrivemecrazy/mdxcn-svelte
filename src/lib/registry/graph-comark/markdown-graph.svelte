<script lang="ts">
	import type { Component } from 'svelte';

	import type { GraphAdapter } from './adapters.js';
	import { coerceProps } from './coerce.js';
	import PendingGraph from './pending-graph.svelte';

	let {
		component: Graph,
		adapter = {},
		props
	}: {
		component: Component<any>;
		adapter?: GraphAdapter;
		props: Record<string, unknown>;
	} = $props();

	function isPresent(value: unknown): boolean {
		if (value == null) return false;
		if (Array.isArray(value)) return value.length > 0;
		if (typeof value === 'string') return value.trim() !== '';
		return true;
	}

	/**
	 * Changes when a figure's data changes, so the graph remounts and its enter
	 * animation replays over the full set while Markdown streams in. `children`
	 * is skipped: a snippet has no data identity.
	 */
	function propsKey(values: Record<string, unknown>): string {
		try {
			return Object.entries(values)
				.filter(([key]) => key !== 'children')
				.map(
					([key, value]) =>
						`${key}=${typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value)}`
				)
				.join('|');
		} catch {
			return '';
		}
	}

	const coerced = $derived(coerceProps<Record<string, unknown>>(props, adapter.numeric));
	const ready = $derived((adapter.required ?? []).every((key) => isPresent(coerced[key])));
</script>

{#if ready}
	{#key propsKey(coerced)}
		<Graph {...coerced} />
	{/key}
{:else}
	<PendingGraph title={typeof coerced.title === 'string' ? coerced.title : undefined} />
{/if}
