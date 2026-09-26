export type Category = 'content' | 'diagrams' | 'data' | 'charts' | 'time' | 'primitives';

export type PropRow = {
	name: string;
	type: string;
	default?: string;
	description: string;
};

/** A data-only child component such as `<Row>` or `<Stat>`. */
export type ItemDoc = {
	name: string;
	description: string;
	props: PropRow[];
};

export type CatalogEntry = {
	slug: string;
	/** Lowercase display title, e.g. "table". */
	title: string;
	/** Main component export, e.g. "GraphTable". */
	name: string;
	category: Category;
	description: string;
	/** Import path users write, e.g. "mdxcn-svelte/graph-table". */
	importPath: string;
	/** Named exports to import from importPath. */
	exports: string[];
	props: PropRow[];
	items?: ItemDoc[];
};

export const corner: PropRow = {
	name: 'corner',
	type: 'string',
	default: '"+"',
	description: 'Character at each corner of the frame.'
};

export const className: PropRow = {
	name: 'class',
	type: 'string',
	description: 'Passed to the outer frame.'
};

export const glyphs: PropRow = {
	name: 'glyphs',
	type: '"shade" | "ascii" | "hash" | "bar" | string[]',
	default: '"shade"',
	description: 'Glyph preset or your own characters, lightest to heaviest.'
};

export const palette: PropRow = {
	name: 'palette',
	type: '"mono" | "duo" | "multi"',
	default: '"mono"',
	description: 'One accent, two, or three cycling hues.'
};
