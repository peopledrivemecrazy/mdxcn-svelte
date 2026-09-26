import { createEngine, standardFilters } from 'knap';

import { graphFilters } from '$lib/registry/graph-knap/index.js';

import type { PageLoad } from './$types.js';
import { context, template } from './source.js';

export const load: PageLoad = async () => {
	const engine = createEngine({ filters: { ...standardFilters, ...graphFilters } });
	const result = await engine.render(template, { variables: context });
	return { output: result.output };
};
