export const ACCENT_STORAGE_KEY = 'graph-accent';
export const THEME_STORAGE_KEY = 'theme';
export const DEFAULT_ACCENT_ID = 'ocean';

export type Accent = { id: string; kind: 'solid' | 'gradient'; swatch: string };

/** Solid hues first, then three-stop families. Values match tokens.css. */
export const accents: Accent[] = [
	{ id: 'theme', kind: 'solid', swatch: 'oklch(0.92 0 0)' },
	{ id: 'mint', kind: 'solid', swatch: 'oklch(0.77 0.15 163)' },
	{ id: 'orange', kind: 'solid', swatch: 'oklch(0.76 0.14 55)' },
	{ id: 'green', kind: 'solid', swatch: 'oklch(0.74 0.14 145)' },
	{ id: 'cyan', kind: 'solid', swatch: 'oklch(0.76 0.1 210)' },
	{ id: 'blue', kind: 'solid', swatch: 'oklch(0.7 0.12 255)' },
	{ id: 'purple', kind: 'solid', swatch: 'oklch(0.72 0.12 300)' },
	{ id: 'pink', kind: 'solid', swatch: 'oklch(0.74 0.14 8)' },
	{
		id: 'sunset',
		kind: 'gradient',
		swatch: 'linear-gradient(135deg, oklch(0.7 0.19 19), oklch(0.86 0.12 74), oklch(0.92 0.1 89))'
	},
	{
		id: 'ocean',
		kind: 'gradient',
		swatch:
			'linear-gradient(135deg, oklch(0.77 0.15 228), oklch(0.68 0.18 259), oklch(0.72 0.15 248))'
	},
	{
		id: 'neon',
		kind: 'gradient',
		swatch:
			'linear-gradient(135deg, oklch(0.92 0.23 129), oklch(0.89 0.18 162), oklch(0.8 0.15 220))'
	},
	{
		id: 'aurora',
		kind: 'gradient',
		swatch:
			'linear-gradient(135deg, oklch(0.68 0.25 351), oklch(0.7 0.14 307), oklch(0.7 0.13 244))'
	},
	{
		id: 'fire',
		kind: 'gradient',
		swatch: 'linear-gradient(135deg, oklch(0.67 0.22 33), oklch(0.68 0.2 1), oklch(0.82 0.15 72))'
	},
	{
		id: 'prism',
		kind: 'gradient',
		swatch:
			'linear-gradient(135deg, oklch(0.75 0.14 220), oklch(0.69 0.19 313), oklch(0.66 0.2 21))'
	}
];

export function applyAccent(id: string) {
	const accent = accents.find((entry) => entry.id === id) ?? accents[0];
	const root = document.documentElement;
	root.dataset.accent = accent.id;
	root.dataset.accentKind = accent.kind;
	try {
		localStorage.setItem(ACCENT_STORAGE_KEY, accent.id);
	} catch {
		// Private mode: the choice lasts until reload.
	}
}

export function applyTheme(dark: boolean) {
	document.documentElement.classList.toggle('dark', dark);
	try {
		localStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light');
	} catch {
		// Private mode: the choice lasts until reload.
	}
}
