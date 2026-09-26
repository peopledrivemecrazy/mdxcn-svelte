export const template = `{{ shipped | graph_meter:"SHIPPED" }}

{{ usage | graph_table:"USAGE" }}`;

export const context = {
	shipped: { value: 0.67, caption: 'of the roadmap' },
	usage: {
		headers: ['name', 'requests'],
		rows: [
			['docs', '12,400'],
			['api', '900']
		]
	}
};

export const setup = `import { createEngine, standardFilters } from 'knap';
import { graphFilters } from 'mdxcn-svelte/graph-knap';

const engine = createEngine({ filters: { ...standardFilters, ...graphFilters } });
const { output } = await engine.render(template, { variables: context });`;
