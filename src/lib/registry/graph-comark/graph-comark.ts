import type { Component } from 'svelte';

import { GraphActivity } from '$lib/registry/graph-activity/index.js';
import { GraphBars } from '$lib/registry/graph-bars/index.js';
import { GraphBullet } from '$lib/registry/graph-bullet/index.js';
import { GraphCalendar } from '$lib/registry/graph-calendar/index.js';
import { GraphCells } from '$lib/registry/graph-cells/index.js';
import { GraphCheck } from '$lib/registry/graph-check/index.js';
import { GraphCompare } from '$lib/registry/graph-compare/index.js';
import { GraphCountdown } from '$lib/registry/graph-countdown/index.js';
import { GraphDiff } from '$lib/registry/graph-diff/index.js';
import { GraphFlow } from '$lib/registry/graph-flow/index.js';
import { GraphFunnel } from '$lib/registry/graph-funnel/index.js';
import { GraphGantt } from '$lib/registry/graph-gantt/index.js';
import { GraphHeatmap } from '$lib/registry/graph-heatmap/index.js';
import { GraphInvoice } from '$lib/registry/graph-invoice/index.js';
import { GraphKpi } from '$lib/registry/graph-kpi/index.js';
import { GraphMatrix } from '$lib/registry/graph-matrix/index.js';
import { GraphMeter } from '$lib/registry/graph-meter/index.js';
import { GraphPlot } from '$lib/registry/graph-plot/index.js';
import { GraphRank } from '$lib/registry/graph-rank/index.js';
import { GraphSheet } from '$lib/registry/graph-sheet/index.js';
import { GraphSlope } from '$lib/registry/graph-slope/index.js';
import { GraphSpark } from '$lib/registry/graph-spark/index.js';
import { GraphSpec } from '$lib/registry/graph-spec/index.js';
import { GraphStack } from '$lib/registry/graph-stack/index.js';
import { GraphStat } from '$lib/registry/graph-stat/index.js';
import { GraphTable } from '$lib/registry/graph-table/index.js';
import { GraphTimeline } from '$lib/registry/graph-timeline/index.js';
import { GraphTimer } from '$lib/registry/graph-timer/index.js';
import { GraphTree } from '$lib/registry/graph-tree/index.js';
import { GraphUptime } from '$lib/registry/graph-uptime/index.js';
import { GraphWaffle } from '$lib/registry/graph-waffle/index.js';
import { GraphWaterfall } from '$lib/registry/graph-waterfall/index.js';

import { GRAPH_ADAPTERS, type GraphTag } from './adapters.js';
import { fromMarkdown } from './from-markdown.js';
import GraphRow from './graph-row.svelte';

export type GraphComponentMap = {
	[K in GraphTag]?: Component<any>;
};

/**
 * Wrap the graphs you want in Markdown. Pass the result to Comark's
 * `components` prop:
 *
 * ```svelte
 * <Markdown value={doc} components={graphComponents} />
 * ```
 */
export function createGraphComponents(installed: GraphComponentMap) {
	const out: Record<string, Component<any>> = {
		row: fromMarkdown(GraphRow, GRAPH_ADAPTERS.row)
	};

	for (const [tag, component] of Object.entries(installed)) {
		if (!component) continue;
		out[tag] = fromMarkdown(component, GRAPH_ADAPTERS[tag as GraphTag]);
	}

	return out;
}

/** Every graph, keyed by its `::graph-*` tag. */
export const graphComponents = createGraphComponents({
	'graph-table': GraphTable,
	'graph-sheet': GraphSheet,
	'graph-invoice': GraphInvoice,
	'graph-spec': GraphSpec,
	'graph-matrix': GraphMatrix,
	'graph-compare': GraphCompare,
	'graph-diff': GraphDiff,
	'graph-stat': GraphStat,
	'graph-kpi': GraphKpi,
	'graph-spark': GraphSpark,
	'graph-plot': GraphPlot,
	'graph-bars': GraphBars,
	'graph-slope': GraphSlope,
	'graph-cells': GraphCells,
	'graph-meter': GraphMeter,
	'graph-waffle': GraphWaffle,
	'graph-stack': GraphStack,
	'graph-funnel': GraphFunnel,
	'graph-waterfall': GraphWaterfall,
	'graph-rank': GraphRank,
	'graph-bullet': GraphBullet,
	'graph-heatmap': GraphHeatmap,
	'graph-activity': GraphActivity,
	'graph-calendar': GraphCalendar,
	'graph-uptime': GraphUptime,
	'graph-flow': GraphFlow,
	'graph-tree': GraphTree,
	'graph-timeline': GraphTimeline,
	'graph-gantt': GraphGantt,
	'graph-check': GraphCheck,
	'graph-timer': GraphTimer,
	'graph-countdown': GraphCountdown
});

export const graphTags = Object.keys(graphComponents);
