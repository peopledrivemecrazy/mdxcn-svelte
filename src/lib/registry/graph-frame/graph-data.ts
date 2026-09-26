/**
 * Prop normalisers. Every graph accepts arrays or the short string forms that
 * are convenient in Markdown and templates: `"2 3 4"`, `"67%"`, `"a | b"`.
 */

export type MdAlign = 'left' | 'right';

/** `[2, 3, 4]`, `"2 3 4"`, or `"2, 3, 4"` → `[2, 3, 4]`. */
export function numbers(value: readonly number[] | string | undefined): number[] {
	if (value == null) {
		return [];
	}

	if (typeof value === 'string') {
		return value
			.split(/[\s,]+/)
			.filter(Boolean)
			.map(Number)
			.filter((entry) => Number.isFinite(entry));
	}

	return [...value];
}

/** `["ok", "down"]` or `"ok down"` → `["ok", "down"]`. */
export function words<T extends string>(value: readonly T[] | string | undefined): T[] {
	if (value == null) {
		return [];
	}

	if (typeof value === 'string') {
		return value.split(/[\s,]+/).filter(Boolean) as T[];
	}

	return [...value];
}

/** `0.67`, `"0.67"`, or `"67%"` → `0.67`. */
export function fraction(value: number | string | undefined, fallback = 0): number {
	if (value == null) {
		return fallback;
	}

	if (typeof value === 'number') {
		return value;
	}

	const text = value.trim();
	const percent = text.endsWith('%');
	const parsed = Number.parseFloat(text);

	if (!Number.isFinite(parsed)) {
		return fallback;
	}

	return percent ? parsed / 100 : parsed;
}

/** `42` or `"12,400"` or `"100%"` → `42`. */
export function numberOf(value: number | string | undefined, fallback = 0): number {
	if (value == null) {
		return fallback;
	}

	if (typeof value === 'number') {
		return Number.isFinite(value) ? value : fallback;
	}

	const parsed = Number.parseFloat(value.replace(/,/g, ''));
	return Number.isFinite(parsed) ? parsed : fallback;
}

/** Split `Mar 18: Docs, live` / `14:02: p95 crossed` on `: `. */
export function splitLabel(text: string): { label: string; rest: string } {
	const match = text.match(/^(.+?):\s+(.+)$/);
	if (!match) {
		return { label: text, rest: '' };
	}
	return {
		label: (match[1] ?? text).trim(),
		rest: (match[2] ?? '').trim()
	};
}

/** Split `graph-tree.ts — ui` / `Copy the source — Run the CLI` on em dash. */
export function splitDash(text: string): { label: string; rest: string } {
	const parts = text.split(/\s+[—–]\s+/);
	if (parts.length < 2) {
		return { label: text, rest: '' };
	}
	return {
		label: (parts[0] ?? text).trim(),
		rest: parts.slice(1).join(' — ').trim()
	};
}

/** First word and the rest: `12,400 docs`, `100% frame`. */
export function firstToken(text: string): { token: string; rest: string } {
	const match = text.match(/^(\S+)\s*(.*)$/);
	if (!match) {
		return { token: text, rest: '' };
	}
	return { token: match[1] ?? text, rest: match[2] ?? '' };
}

/** Cells from an array or pipe text: `"docs | 12,400"`. Space-separated without pipes. */
export function cellsOf(value?: readonly (string | number)[] | string): string[] {
	if (value == null) {
		return [];
	}

	if (Array.isArray(value)) {
		return value.map((cell) => String(cell ?? ''));
	}

	const text = String(value).trim();
	if (!text) {
		return [];
	}

	if (text.includes('|')) {
		return text.split('|').map((cell) => cell.trim());
	}

	return words(text);
}

/** One trimmed line per newline, blanks dropped. */
export function linesOf(text: string | undefined): string[] {
	return (text ?? '')
		.split('\n')
		.map((line) => line.trim())
		.filter(Boolean);
}

/** `["left", "right"]` or `"left right"`. First column defaults left, the rest right. */
export function alignsOf(value: readonly MdAlign[] | string | undefined, count: number): MdAlign[] {
	const given = words<MdAlign>(value as readonly MdAlign[] | string | undefined);
	return Array.from(
		{ length: count },
		(_, index) => given[index] ?? (index === 0 ? 'left' : 'right')
	);
}
