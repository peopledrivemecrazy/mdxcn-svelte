export type GanttItem = {
	label?: string;
	/** 0–1 along the track. */
	start: number | string;
	/** 0–1 along the track. */
	end: number | string;
	accent?: boolean;
	/** 0–1 fill inside the bar. */
	complete?: number | string;
};
