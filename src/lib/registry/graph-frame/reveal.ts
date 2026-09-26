import type { Attachment } from 'svelte/attachments';

import { EASE_OUT_CUBIC, GRAPH_DURATION } from './graph-motion.js';

/**
 * Enter animations without a motion library.
 *
 * Markup marks each animated element with `data-reveal`. The stylesheet hides
 * those until they are revealed, so server-rendered pages do not flash. On
 * entering the viewport, the attachment plays a Web Animation (opacity and
 * transform only) and marks the element `data-reveal="done"`.
 *
 * Nothing loops. `prefers-reduced-motion: reduce` shows everything at once.
 */
export type RevealOptions = {
	/** Pixels to rise from. `0` is a plain fade. Default 8. */
	y?: number;
	/** Seconds before the first element starts. */
	delay?: number;
	/** Seconds between successive `[data-reveal]` descendants. `0` animates only the node. */
	stagger?: number;
	/** Fraction of the node that must be visible, like motion's `amount`. */
	amount?: number;
	/** Override the per-element delay, e.g. from `fillDelay`. Seconds. */
	delayOf?: (element: HTMLElement, index: number) => number;
};

function prefersReducedMotion() {
	return (
		typeof window !== 'undefined' &&
		typeof window.matchMedia === 'function' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	);
}

function targetsOf(node: HTMLElement, group: boolean): HTMLElement[] {
	if (!group) {
		return [node];
	}

	const found = Array.from(node.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal="done"])'));
	return node.matches('[data-reveal]') ? [node, ...found] : found;
}

function show(element: HTMLElement) {
	element.setAttribute('data-reveal', 'done');
}

function play(element: HTMLElement, y: number, delay: number) {
	show(element);

	if (typeof element.animate !== 'function') {
		return;
	}

	element.animate(
		[
			{ opacity: 0, transform: `translateY(${y}px)` },
			{ opacity: 1, transform: 'translateY(0px)' }
		],
		{
			duration: GRAPH_DURATION * 1000,
			delay: delay * 1000,
			easing: EASE_OUT_CUBIC,
			fill: 'backwards'
		}
	);
}

/**
 * `{@attach reveal()}` fades one element up. `{@attach reveal({ stagger: 0.04 })}`
 * on a container staggers every `[data-reveal]` inside it, once, when the
 * container scrolls into view. Elements added afterwards appear immediately.
 */
export function reveal(options: RevealOptions = {}): Attachment<HTMLElement> {
	const { y = 8, delay = 0, stagger = 0, amount = 0, delayOf } = options;
	const group = stagger > 0 || delayOf != null;

	return (node) => {
		if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) {
			for (const element of targetsOf(node, true)) {
				show(element);
			}
			return;
		}

		let fired = false;
		const later = new MutationObserver(() => {
			if (fired) {
				for (const element of targetsOf(node, true)) {
					show(element);
				}
			}
		});

		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((entry) => entry.isIntersecting)) {
					return;
				}

				fired = true;
				observer.disconnect();
				targetsOf(node, group).forEach((element, index) => {
					play(element, y, delay + (delayOf ? delayOf(element, index) : index * stagger));
				});
			},
			{ threshold: amount }
		);

		observer.observe(node);
		later.observe(node, { childList: true, subtree: true });

		return () => {
			observer.disconnect();
			later.disconnect();
		};
	};
}
