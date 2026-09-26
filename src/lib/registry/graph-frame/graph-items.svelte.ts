import { getContext, onDestroy, setContext } from 'svelte';

/**
 * Data-only children, the Svelte way.
 *
 * React mdxcn reads `<Row>` / `<Stat>` children by walking `props.children`.
 * Svelte children are snippets and cannot be inspected, so each item
 * component registers a getter for its props with the nearest graph instead.
 *
 * ```svelte
 * <GraphStat title="usage">
 *   <Stat value="12,400" label="docs" />
 * </GraphStat>
 * ```
 *
 * The graph calls `provideItems()` and renders `{@render children?.()}`
 * before any markup that reads the items. Items render nothing themselves, so
 * both the server and the client see every item before the figure is drawn.
 */

const ITEMS = Symbol('mdxcn-items');

type Entry = { tag: string; read: () => Record<string, unknown> };

export class GraphItems {
	#entries = $state.raw<Entry[]>([]);

	add(tag: string, read: () => Record<string, unknown>) {
		const entry = { tag, read };
		this.#entries = [...this.#entries, entry];
		return () => {
			this.#entries = this.#entries.filter((other) => other !== entry);
		};
	}

	/** Props of every registered item with this tag, in document order. */
	list<P>(tag: string): P[] {
		return this.#entries.filter((entry) => entry.tag === tag).map((entry) => entry.read() as P);
	}

	/** Every item, in order, with its tag. For graphs that mix item kinds. */
	all<P = Record<string, unknown>>(): { tag: string; props: P }[] {
		return this.#entries.map((entry) => ({ tag: entry.tag, props: entry.read() as P }));
	}
}

/** Call in a graph's script. Items rendered inside it register here. */
export function provideItems() {
	const items = new GraphItems();
	setContext(ITEMS, items);
	return items;
}

/**
 * Call in an item's script with a getter over its props so updates flow
 * through: `registerItem('Row', () => ({ label, cells }))`.
 */
export function registerItem(tag: string, read: () => Record<string, unknown>) {
	const items = getContext<GraphItems | undefined>(ITEMS);
	if (!items) {
		return;
	}

	onDestroy(items.add(tag, read));
}
