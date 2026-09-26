import type { Component } from 'svelte';

import type { CatalogEntry, Category } from './types.js';

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
	{
		id: 'content',
		label: 'content',
		blurb: 'prose in a frame. callouts, quotes, steps, a shell, a release.'
	},
	{ id: 'diagrams', label: 'diagrams', blurb: 'paths, trees, timelines, schedules.' },
	{ id: 'data', label: 'data', blurb: 'numbers with labels. stats, specs, tables, diffs.' },
	{ id: 'charts', label: 'charts', blurb: 'glyphs on a track. ranks, meters, sparks, grids.' },
	{ id: 'time', label: 'time', blurb: 'calendars, uptime, timers, countdowns.' },
	{ id: 'primitives', label: 'primitives', blurb: 'the frame every graph is drawn in.' }
];

const catalogModules = import.meta.glob<{ default: CatalogEntry }>('./catalog/*.ts', {
	eager: true
});

const order = CATEGORIES.map((category) => category.id);

/** Every documented component, grouped by category, then by title. */
export const catalog: CatalogEntry[] = Object.values(catalogModules)
	.map((module) => module.default)
	.sort(
		(a, b) =>
			order.indexOf(a.category) - order.indexOf(b.category) || a.title.localeCompare(b.title)
	);

export function getEntry(slug: string) {
	return catalog.find((entry) => entry.slug === slug);
}

export type Example = {
	slug: string;
	file: string;
	title: string;
	description: string;
	component: Component;
	/** Source as users would write it: package imports, no header comment. */
	code: string;
};

const exampleModules = import.meta.glob<{ default: Component }>('./examples/*/*.svelte', {
	eager: true
});
const exampleSources = import.meta.glob<string>('./examples/*/*.svelte', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const HEADER = /^<!--\s*(.+?)(?:\s+—\s+(.+?))?\s*-->\s*\n/;

function publicSource(raw: string) {
	return raw
		.replace(HEADER, '')
		.replace(/\$lib\/registry\/([\w-]+)\/index\.js/g, 'mdxcn-svelte/$1')
		.trim();
}

export const examples: Example[] = Object.entries(exampleModules)
	.map(([path, module]) => {
		const [, slug, file] = path.match(/\.\/examples\/([^/]+)\/([^/]+)\.svelte$/) ?? [];
		const raw = exampleSources[path] ?? '';
		const header = raw.match(HEADER);
		return {
			slug,
			file,
			title: header?.[1] ?? file,
			description: header?.[2] ?? '',
			component: module.default,
			code: publicSource(raw)
		};
	})
	.sort((a, b) => a.file.localeCompare(b.file));

export function examplesFor(slug: string) {
	return examples.filter((example) => example.slug === slug);
}
