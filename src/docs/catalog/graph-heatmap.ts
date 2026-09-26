import { className, corner, glyphs, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-heatmap',
	title: 'heatmap',
	name: 'GraphHeatmap',
	category: 'charts',
	description:
		'A labeled grid of intensities. Write `<Row label="Mon" cells="0 1 4 8" />` rows. Exact numbers are Matrix. A contribution calendar is Activity.',
	importPath: 'mdxcn-svelte/graph-heatmap',
	exports: ['GraphHeatmap', 'Head', 'Row'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'columns',
			type: 'string[] | string',
			description: 'Column headers, left to right. Or "0 4 8 12".'
		},
		{ name: 'rows', type: 'HeatRow[]', description: 'label plus a value per column.' },
		{
			name: 'children',
			type: 'Snippet',
			description: '<Head> and <Row> items, used when columns or rows are not set.'
		},
		{ name: 'max', type: 'number', description: 'Lock the intensity scale across charts.' },
		{ name: 'legend', type: 'boolean', default: 'true', description: 'Less / more glyph key.' },
		{ name: 'caption', type: 'string', description: 'Optional note under the matrix.' },
		glyphs,
		palette,
		corner,
		className
	],
	items: [
		{
			name: 'Head',
			description: 'Column headers.',
			props: [
				{ name: 'cells', type: 'string | string[]', description: '"0 4 8 12" or "a | b | c".' }
			]
		},
		{
			name: 'Row',
			description: 'One labeled row of values.',
			props: [
				{ name: 'label', type: 'string', description: 'Row label on the left.' },
				{
					name: 'cells',
					type: 'string | number[]',
					description: 'One value per column: "0 1 4 8".'
				}
			]
		}
	]
} satisfies CatalogEntry;
