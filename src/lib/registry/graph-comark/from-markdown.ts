import type { Component } from 'svelte';

import type { GraphAdapter } from './adapters.js';
import MarkdownGraph from './markdown-graph.svelte';

/**
 * Wrap a graph for Comark. The wrapper coerces Markdown's string props,
 * holds a pending frame until required data arrives, and remounts on change.
 *
 * Svelte components are functions of `(internals, props)` on both server and
 * client, so the wrapper forwards the call with its own props object. Getters
 * keep Comark's props live while a stream updates them.
 */
export function fromMarkdown(
	component: Component<any>,
	adapter: GraphAdapter = {}
): Component<any> {
	const Wrapped = ((internals: unknown, props: Record<string, unknown>) =>
		(MarkdownGraph as unknown as (internals: unknown, props: unknown) => unknown)(internals, {
			component,
			adapter,
			get props() {
				return props;
			}
		})) as unknown as Component<any>;

	return Wrapped;
}
