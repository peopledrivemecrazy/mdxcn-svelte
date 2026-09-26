import { error } from '@sveltejs/kit';

import { catalog, getEntry } from '$docs/registry.js';

import type { EntryGenerator, PageLoad } from './$types.js';

export const entries: EntryGenerator = () => catalog.map((entry) => ({ slug: entry.slug }));

export const load: PageLoad = ({ params }) => {
	const entry = getEntry(params.slug);
	if (!entry) {
		error(404, 'No such component');
	}
	return { slug: entry.slug };
};
