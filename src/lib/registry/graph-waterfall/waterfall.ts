import { numberOf } from '$lib/registry/graph-frame/index.js';

export type WaterfallKind = 'start' | 'in' | 'out' | 'end';

export type WaterfallItem = {
	label?: string;
	value: number | string;
	display?: string;
	kind?: WaterfallKind;
};

type WaterfallRow = {
	label: string;
	value: number;
	display?: string;
	kind?: WaterfallKind;
};

export type WaterfallSegment = WaterfallRow & { kind: WaterfallKind; from: number; to: number };

function resolveKind(item: WaterfallRow, index: number, length: number): WaterfallKind {
	if (item.kind) {
		return item.kind;
	}

	if (index === 0) {
		return 'start';
	}

	if (index === length - 1) {
		return 'end';
	}

	return item.value >= 0 ? 'in' : 'out';
}

export function formatValue(item: WaterfallRow, kind: WaterfallKind) {
	if (item.display) {
		return item.display;
	}

	const absolute = Math.abs(item.value);

	if (kind === 'in') {
		return `+${absolute.toLocaleString('en-US')}`;
	}

	if (kind === 'out') {
		return `−${absolute.toLocaleString('en-US')}`;
	}

	return item.value.toLocaleString('en-US');
}

/** Floating segments of a running total, each with its kind resolved. */
export function segmentsOf(entries: readonly WaterfallItem[]): WaterfallSegment[] {
	const items: WaterfallRow[] = entries.map((entry) => ({
		label: entry.label ?? '',
		value: numberOf(entry.value),
		display: entry.display,
		kind: entry.kind
	}));
	const segments: WaterfallSegment[] = [];

	items.reduce((run, entry, index) => {
		const kind = resolveKind(entry, index, items.length);
		const magnitude = Math.abs(entry.value);

		if (kind === 'start') {
			segments.push({ ...entry, kind, from: 0, to: entry.value });
			return entry.value;
		}

		if (kind === 'in') {
			segments.push({ ...entry, kind, from: run, to: run + magnitude });
			return run + magnitude;
		}

		if (kind === 'out') {
			segments.push({ ...entry, kind, from: run - magnitude, to: run });
			return run - magnitude;
		}

		segments.push({ ...entry, kind, from: 0, to: entry.value });
		return entry.value;
	}, 0);

	return segments;
}
