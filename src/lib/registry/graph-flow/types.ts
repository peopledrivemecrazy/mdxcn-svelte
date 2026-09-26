export type FlowTone = 'default' | 'accent' | 'muted';

export type FlowNode = {
	label: string;
	tone?: FlowTone;
	stretch?: boolean;
};

export type FlowRow = {
	nodes: FlowNode[];
};

const ARROW = /\s*(?:→|->|—>|=>)\s*/;

/**
 * `tap → **update** → *server syncs*` → three nodes. Split on `→`, `->`,
 * `—>` or `=>`. `**bold**` is the accent node, `*italic*` or `_italic_` recedes.
 */
export function nodesOf(text: string): FlowNode[] {
	const nodes: FlowNode[] = [];

	for (const part of text.split(ARROW)) {
		const label = part.trim();
		if (!label) {
			continue;
		}

		const strong = label.match(/^(?:\*\*|__)(.+)(?:\*\*|__)$/);
		if (strong) {
			nodes.push({ label: (strong[1] ?? label).trim(), tone: 'accent' });
			continue;
		}

		const em = label.match(/^[*_](.+)[*_]$/);
		if (em) {
			nodes.push({ label: (em[1] ?? label).trim(), tone: 'muted' });
			continue;
		}

		nodes.push({ label });
	}

	return nodes;
}
