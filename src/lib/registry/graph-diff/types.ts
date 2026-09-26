export type DiffSign = 'add' | 'remove' | 'keep';

export type DiffRow = {
	label?: string;
	value: string;
	sign?: DiffSign;
};

export type DiffLineProps = DiffRow & {
	/** Draw this row under a rule as the total. */
	total?: boolean;
};
