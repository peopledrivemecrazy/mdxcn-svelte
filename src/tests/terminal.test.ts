import { describe, expect, it } from 'vitest';

import { parseTerminal, Terminal } from '$lib/registry/terminal/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/terminal/*.svelte',
	{ eager: true }
);

describe('parseTerminal', () => {
	it('sorts lines into commands, comments, passes and output', () => {
		expect(parseTerminal('\n$ ls\n# note\n✓ done\n  out  \n\n', '$')).toEqual([
			{ kind: 'command', text: 'ls' },
			{ kind: 'comment', text: '# note' },
			{ kind: 'ok', text: '✓ done' },
			{ kind: 'output', text: '  out' }
		]);
	});
});

describe('Terminal', () => {
	it('draws the prompt on command lines only', () => {
		const markup = html(Terminal, { text: '$ bun test\nok' });
		expect(text(markup)).toContain('[ shell ]');
		expect(text(markup)).toContain('$ bun test');
		expect(markup.match(/data-reveal/g)?.length).toBe(2);
	});

	it('takes lines as an array', () => {
		const markup = html(Terminal, { prompt: '>', lines: ['> go', '✓ ran'] });
		expect(text(markup)).toContain('> go');
		expect(markup).toContain('text-graph-accent');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ \w+ \][ +]* (\$|#) \S+/);
	});
});
