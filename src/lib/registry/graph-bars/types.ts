export type BarSeries = {
	label: string;
	/** Relative heights: `[2, 4, 3]` or `"2 4 3"`. */
	values: readonly number[] | string;
	size?: 'sm' | 'lg';
};
