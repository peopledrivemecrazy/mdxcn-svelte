export type CalendarMark = {
	day: number;
	accent?: boolean;
};

/** Day → accented. Plain numbers are accented; objects default to accented. */
export function markSet(marks?: readonly CalendarMark[] | readonly number[]) {
	const map = new Map<number, boolean>();

	for (const mark of marks ?? []) {
		if (typeof mark === 'number') {
			map.set(mark, true);
			continue;
		}

		map.set(mark.day, mark.accent ?? true);
	}

	return map;
}
