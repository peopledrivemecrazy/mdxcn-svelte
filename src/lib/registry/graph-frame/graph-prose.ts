import { cn } from '$lib/utils.js';

/**
 * Markdown children inside a frame: paragraphs, lists, inline code, links.
 * Keeps them quiet and on the mono grid instead of inheriting page prose.
 */
export const graphProseClass = cn(
	'flex min-w-0 flex-col gap-3 leading-relaxed',
	'[&_p]:m-0 [&_p]:text-pretty',
	'[&_ul]:m-0 [&_ul]:flex [&_ul]:list-none [&_ul]:flex-col [&_ul]:gap-1 [&_ul]:p-0',
	'[&_ol]:m-0 [&_ol]:flex [&_ol]:list-none [&_ol]:flex-col [&_ol]:gap-1 [&_ol]:p-0',
	"[&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-graph-muted [&_li]:before:content-['-']",
	'[&_a]:text-foreground [&_a]:underline [&_a]:decoration-graph-frame [&_a]:decoration-dashed [&_a]:underline-offset-[0.2em]',
	'[&_code]:font-semibold [&_code]:text-foreground',
	'[&_pre]:m-0 [&_pre]:whitespace-pre-wrap [&_pre_code]:font-normal [&_pre_code]:text-inherit',
	'[&_strong]:font-semibold [&_strong]:text-foreground',
	'[&_em]:text-graph-muted [&_em]:not-italic'
);
