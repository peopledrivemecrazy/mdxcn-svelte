export type TreeNode = {
	label: string;
	meta?: string;
	accent?: boolean;
	children?: TreeNode[];
};

export type FlatRow = {
	key: string;
	branch: string;
	label: string;
	meta?: string;
	accent?: boolean;
};

/** Depth-first rows with `├─ │ └─` branch prefixes. A single root draws none. */
export function flatten(
	nodes: readonly TreeNode[],
	prefix = '',
	trail = 'root',
	isRoot = true
): FlatRow[] {
	const singleRoot = isRoot && nodes.length === 1;

	return nodes.flatMap((node, index) => {
		const last = index === nodes.length - 1;
		const branch = singleRoot ? '' : prefix + (last ? '└─ ' : '├─ ');
		const key = `${trail}/${node.label}-${index}`;
		const childPrefix = singleRoot ? '' : prefix + (last ? '   ' : '│  ');
		const row: FlatRow = {
			key,
			branch,
			label: node.label,
			meta: node.meta,
			accent: node.accent
		};
		const kids = node.children ? flatten(node.children, childPrefix, key, false) : [];
		return [row, ...kids];
	});
}
