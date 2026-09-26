const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DAY_MS = 86_400_000;

export type ActivityDay = {
	/** ISO date, `2026-06-01`. */
	date: string;
	count: number;
};

export type ActivityCell = {
	date: string;
	count: number;
	inRange: boolean;
};

/** UTC midnight for an ISO date. Never reads the local clock or zone. */
function parseUTC(iso: string) {
	const [year = 1970, month = 1, day = 1] = iso.split('-').map(Number);
	return Date.UTC(year, month - 1, day);
}

function toISO(utc: number) {
	return new Date(utc).toISOString().slice(0, 10);
}

/** Columns of seven days, padded to whole weeks. Padding cells are out of range. */
export function buildWeeks(days: readonly ActivityDay[], weekStartsOn: 0 | 1) {
	if (days.length === 0) {
		return [] as ActivityCell[][];
	}

	const counts = new Map<string, number>();
	let min = Number.POSITIVE_INFINITY;
	let max = Number.NEGATIVE_INFINITY;

	for (const day of days) {
		const time = parseUTC(day.date);
		counts.set(day.date, day.count);
		if (time < min) min = time;
		if (time > max) max = time;
	}

	const lead = (new Date(min).getUTCDay() - weekStartsOn + 7) % 7;
	const trail = (weekStartsOn + 6 - new Date(max).getUTCDay() + 7) % 7;
	const first = min - lead * DAY_MS;
	const last = max + trail * DAY_MS;
	const weeks: ActivityCell[][] = [];
	let week: ActivityCell[] = [];

	for (let time = first; time <= last; time += DAY_MS) {
		const date = toISO(time);
		const inRange = time >= min && time <= max;
		week.push({ date, count: inRange ? (counts.get(date) ?? 0) : 0, inRange });
		if (week.length === 7) {
			weeks.push(week);
			week = [];
		}
	}

	return weeks;
}

/** Short month name over the week holding the 1st, blank otherwise. */
export function monthLabels(weeks: readonly ActivityCell[][]) {
	return weeks.map((week) => {
		const start = week.find(
			(cell) => cell.inRange && new Date(parseUTC(cell.date)).getUTCDate() === 1
		);

		if (!start) {
			return '';
		}

		return MONTHS[new Date(parseUTC(start.date)).getUTCMonth()] ?? '';
	});
}

export function dayLabels(weekStartsOn: 0 | 1) {
	return weekStartsOn === 1 ? ['M', '', 'W', '', 'F', '', ''] : ['', 'M', '', 'W', '', 'F', ''];
}
