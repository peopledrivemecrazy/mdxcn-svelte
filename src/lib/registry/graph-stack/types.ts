import { numberOf } from '$lib/registry/graph-frame/index.js';

export type StackSegment = {
	label?: string;
	value: number | string;
};

export type StackRow = {
	label: string;
	/** Data form, or text: `"48 js, 22 css, 30 images"`. Or nest `<Segment />` inside `<Bar>`. */
	segments?: readonly StackSegment[] | string;
};

export type SegmentRow = { label: string; value: number };

/** `"48 js, 22 css, 30 images"` → labeled values. */
export function segmentsFromText(text: string): SegmentRow[] {
	const parts = [...text.matchAll(/([\d,.]+)\s+(\S+)/g)];
	return parts.map((part) => ({
		label: part[2] ?? '',
		value: numberOf(part[1])
	}));
}

export function segmentsOf(
	segments: readonly StackSegment[] | string | undefined,
	nested: readonly StackSegment[] = []
): SegmentRow[] {
	if (typeof segments === 'string') {
		return segmentsFromText(segments);
	}

	return (segments ?? nested).map((segment) => ({
		label: segment.label ?? '',
		value: numberOf(segment.value)
	}));
}
