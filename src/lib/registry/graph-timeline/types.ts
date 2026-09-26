export type TimelineState = 'done' | 'now' | 'next';

export type TimelineEvent = {
	date: string;
	label?: string;
	state?: TimelineState;
};
