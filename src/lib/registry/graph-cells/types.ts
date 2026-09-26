export type CellGrid = {
	label: string;
	/** 0/1 rows: `[[1, 0], [0, 1]]`, `"1 0 / 0 1"`, or one row per line. */
	cells: readonly (readonly number[])[] | string;
};

function parseRow(line: string): number[] {
	return line
		.split(/[\s,]+/)
		.filter(Boolean)
		.map(Number)
		.filter((value) => Number.isFinite(value));
}

/** Rows split on `/` or newlines. Arrays pass through. */
export function gridCells(value: CellGrid['cells'] | undefined): number[][] {
	if (value == null) {
		return [];
	}

	if (typeof value !== 'string') {
		return value.map((row) => [...row]);
	}

	const text = value.trim();
	const lines = text.includes('/') ? text.split('/') : text.split('\n');
	return lines.map(parseRow).filter((row) => row.length > 0);
}
