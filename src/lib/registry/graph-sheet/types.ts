export type GraphAlign = 'left' | 'right';

export type SheetCells = string | readonly (string | number)[];

export type SheetSection = {
	title: string;
	/** One entry per row: `["CLI copies files", "priya", "done"]` or `"CLI copies files | priya | done"`. */
	rows: readonly SheetCells[];
};
