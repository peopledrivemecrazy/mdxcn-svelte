<script lang="ts">
	import {
		Graph,
		GraphBody,
		isMonoPalette,
		numbers,
		reveal,
		toneClass,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	import { markSet, type CalendarMark } from './marks.js';

	export type GraphCalendarProps = {
		/** Defaults to the month name and year. */
		title?: string;
		year: number;
		/** 1–12. */
		month: number;
		weekStartsOn?: 0 | 1;
		/** `[12, 18]`, `"12 18"`, or `{ day, accent }` objects. */
		marks?: CalendarMark[] | number[] | string;
		/** Day of the month to bracket. Passed in so render never reads the clock. */
		today?: number;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		year,
		month,
		weekStartsOn = 1,
		marks: marksProp,
		today,
		palette,
		corner,
		class: className
	}: GraphCalendarProps = $props();

	const WEEKDAYS_SUN = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	const WEEKDAYS_MON = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
	const MONTHS = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const monthIndex = $derived(month - 1);
	const days = $derived(new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate());
	const pad = $derived(
		(new Date(Date.UTC(year, monthIndex, 1)).getUTCDay() - weekStartsOn + 7) % 7
	);
	const highlighted = $derived(
		markSet(typeof marksProp === 'string' ? numbers(marksProp) : marksProp)
	);
	const headers = $derived(weekStartsOn === 1 ? WEEKDAYS_MON : WEEKDAYS_SUN);
	const caption = $derived(title ?? `${MONTHS[monthIndex]} ${year}`);
	const weeks = $derived.by(() => {
		const trailing = (7 - ((pad + days) % 7)) % 7;
		const grid: (number | null)[] = [
			...Array.from({ length: pad }, () => null),
			...Array.from({ length: days }, (_, index) => index + 1),
			...Array.from({ length: trailing }, () => null)
		];
		const rows: (number | null)[][] = [];

		for (let index = 0; index < grid.length; index += 7) {
			rows.push(grid.slice(index, index + 7));
		}

		return rows;
	});
</script>

<Graph title={caption} class={className} {corner}>
	<GraphBody class="flex flex-col gap-3">
		<div aria-hidden="true" class="grid grid-cols-7 justify-items-center">
			{#each headers as header, index (index)}
				<span class="w-[4ch] text-center text-graph-muted">{header}</span>
			{/each}
		</div>
		<div
			aria-hidden="true"
			class="flex flex-col gap-1"
			{@attach reveal({ stagger: 0.04, amount: 0.4 })}
		>
			{#each weeks as week, weekIndex (weekIndex)}
				<div class="grid grid-cols-7 justify-items-center" data-reveal>
					{#each week as day, dayIndex (dayIndex)}
						{@const inMonth = day != null}
						{@const accent = day != null && highlighted.get(day) === true}
						{@const isToday = inMonth && today === day}
						<span
							class={cn(
								'w-[4ch] text-center tabular-nums',
								!inMonth && 'text-transparent',
								inMonth && !accent && !isToday && 'text-foreground',
								accent && toneClass(palette, 'primary'),
								isToday &&
									!accent &&
									toneClass(palette, isMonoPalette(palette) ? 'primary' : 'secondary')
							)}>{inMonth ? (isToday ? `[${day}]` : day) : ' '}</span
						>
					{/each}
				</div>
			{/each}
		</div>
		<span class="sr-only">
			{MONTHS[monthIndex]}
			{year}{today ? `, today ${today}` : ''}{highlighted.size > 0
				? `, marked ${[...highlighted.keys()].join(', ')}`
				: ''}
		</span>
	</GraphBody>
</Graph>
