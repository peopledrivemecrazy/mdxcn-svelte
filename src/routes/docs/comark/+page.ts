import { parseMarkdown } from 'comark';

import type { PageLoad } from './$types.js';
import { source } from './source.js';

export const load: PageLoad = async () => ({ doc: await parseMarkdown(source) });
