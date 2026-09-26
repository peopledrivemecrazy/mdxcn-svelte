import { onMount } from 'svelte';

export function parseInstant(value: Date | number | string) {
	if (value instanceof Date) {
		return value.getTime();
	}

	if (typeof value === 'number') {
		return Number.isFinite(value) ? value : Number.NaN;
	}

	return Date.parse(value);
}

export function pad2(value: number) {
	return String(Math.trunc(value)).padStart(2, '0');
}

export function formatHms(ms: number) {
	const total = Math.max(0, Math.floor(ms / 1000));
	const days = Math.floor(total / 86400);
	const hours = Math.floor((total % 86400) / 3600);
	const minutes = Math.floor((total % 3600) / 60);
	const seconds = total % 60;
	const clock = `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;

	if (days > 0) {
		return `${days}d ${clock}`;
	}

	return clock;
}

export function formatAgo(ms: number) {
	const seconds = Math.max(0, Math.floor(ms / 1000));

	if (seconds < 60) {
		return `${seconds}s ago`;
	}

	const minutes = Math.floor(seconds / 60);

	if (minutes < 60) {
		return `${minutes}m ago`;
	}

	const hours = Math.floor(minutes / 60);

	if (hours < 48) {
		return `${hours}h ago`;
	}

	return `${Math.floor(hours / 24)}d ago`;
}

export function formatClock(ms: number) {
	// A throwaway value for formatting, never state.
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	const date = new Date(ms);

	return `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
}

/**
 * The current time, ticking once per `interval`. `null` on the server and
 * before mount, so rendered markup never depends on the server's clock.
 */
export class GraphNow {
	current = $state<number | null>(null);

	constructor(interval = 1000) {
		onMount(() => {
			this.current = Date.now();
			const id = window.setInterval(() => {
				this.current = Date.now();
			}, interval);
			return () => window.clearInterval(id);
		});
	}
}
