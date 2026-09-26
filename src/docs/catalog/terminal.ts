import { className, corner, type CatalogEntry } from '../types.js';

export default {
	slug: 'terminal',
	title: 'terminal',
	name: 'Terminal',
	category: 'content',
	description:
		'A shell session. `$` is a command, `#` a comment, `✓` a pass. Source code stays in a fence. A file tree is Tree.',
	importPath: 'mdxcn-svelte/terminal',
	exports: ['Terminal'],
	props: [
		{
			name: 'title',
			type: 'string',
			default: '"shell"',
			description: 'Caption drawn on the top edge of the frame.'
		},
		{
			name: 'prompt',
			type: 'string',
			default: '"$"',
			description: 'The glyph that marks a command line.'
		},
		{
			name: 'text',
			type: 'string',
			description:
				'The session, one line per line. Whitespace is kept. Leading and trailing blank lines are dropped.'
		},
		{
			name: 'lines',
			type: 'string[]',
			description: 'The session as an array of lines. Used when text is not set.'
		},
		corner,
		className
	]
} satisfies CatalogEntry;
