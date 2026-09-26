import { describe, expect, it } from 'vitest';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/changelog/*.svelte',
	{ eager: true }
);

const [release, titled] = examples(modules);

describe('Changelog', () => {
	it('draws a glyph and label per change under the version', () => {
		const markup = html(release!.component);
		const visible = text(markup);
		expect(visible).toContain('[ 1.2.0 ]');
		expect(visible).toContain('Mar 12');
		expect(visible).toContain('+ added Callout, Quote, Steps, Terminal, Changelog');
		expect(visible).toContain('~ changed Graphs read MDX children');
		expect(visible).toContain('* fixed Timeline connector on Safari');
		expect(visible).toContain('- removed The legacy accent prop');
		expect(markup.match(/data-reveal/g)?.length).toBe(4);
	});

	it('moves the version into the body when titled', () => {
		const visible = text(html(titled!.component));
		expect(visible).toContain('[ CHANGELOG ]');
		expect(visible).toMatch(/0\.9\.0 Feb 02/);
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ [\w.]+ \]/);
	});
});
