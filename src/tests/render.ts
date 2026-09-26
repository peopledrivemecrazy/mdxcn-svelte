import type { Component } from 'svelte';
import { render } from 'svelte/server';

/** Server-render a component and drop hydration comments. */
export function html(component: Component<any>, props: Record<string, unknown> = {}) {
	return render(component, { props }).body.replace(/<!--.*?-->/g, '');
}

/** Visible text only, whitespace collapsed. */
export function text(markup: string) {
	return markup
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

/** Every example module for a slug, keyed by file name. */
export function examples(modules: Record<string, { default: Component<any> }>) {
	return Object.entries(modules).map(([path, module]) => ({
		name: path.split('/').pop() ?? path,
		component: module.default
	}));
}
