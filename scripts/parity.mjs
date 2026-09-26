// Compare every example figure against mdxcn.dev, glyph by glyph.
//
//   node scripts/parity.mjs [--headed] [--light] [--port http://localhost:4173] [slug ...]
//
// For each docs page it reads the example figures on both sites (upstream's
// props table excluded) and lists, per text run, differences in text,
// position relative to the figure, color, effective opacity and weight.
// Exit code 1 when anything differs. Serve a fresh build first.
import { chromium } from 'playwright';
import { readdirSync } from 'node:fs';

const args = process.argv.slice(2);
const headed = args.includes('--headed');
const scheme = args.includes('--light') ? 'light' : 'dark';
const portIndex = args.indexOf('--port');
const PORT = portIndex >= 0 ? args[portIndex + 1] : 'http://localhost:4173';
const UPSTREAM = 'https://www.mdxcn.dev';
const named = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--port');
const slugs = named.length
	? named
	: readdirSync(new URL('../src/docs/catalog', import.meta.url)).map((f) => f.replace(/\.ts$/, ''));

const W = 864;
async function open(x) {
	const browser = await chromium.launch({
		headless: !headed,
		args: headed ? [`--window-position=${x},0`, `--window-size=${W},1120`] : []
	});
	const context = await browser.newContext({
		viewport: { width: W, height: 1030 },
		colorScheme: scheme
	});
	// Both sites keep the theme in localStorage under `theme`; mdxcn.dev ignores the system setting.
	await context.addInitScript((value) => localStorage.setItem('theme', value), scheme);
	return { browser, page: await context.newPage() };
}

async function runs(page, url) {
	await page.goto(url, { waitUntil: 'networkidle' });
	await page.evaluate(async () => {
		for (let y = 0; y < document.body.scrollHeight; y += 400) {
			window.scrollTo(0, y);
			await new Promise((r) => setTimeout(r, 60));
		}
	});
	await page.waitForTimeout(1500);
	return page.evaluate(() => {
		// Both sites use the same tokens, but upstream's CSS pipeline emits lab()
		// where ours emits oklch(). Compare what a canvas paints instead.
		const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
		const rgb = (color) => {
			ctx.clearRect(0, 0, 1, 1);
			ctx.fillStyle = color;
			ctx.fillRect(0, 0, 1, 1);
			return [...ctx.getImageData(0, 0, 1, 1).data].join(',');
		};
		const figures = [...document.querySelectorAll('main figure')].filter(
			(f) => !f.parentElement.closest('figure')
		);
		return figures.map((figure) => {
			const box = figure.getBoundingClientRect();
			const out = [];
			const walker = document.createTreeWalker(figure, NodeFilter.SHOW_TEXT);
			for (let node = walker.nextNode(); node; node = walker.nextNode()) {
				const text = node.textContent.replace(/\s+/g, ' ').trim();
				if (!text) continue;
				const el = node.parentElement;
				if (el.closest('.sr-only')) continue;
				const range = document.createRange();
				range.selectNodeContents(node);
				const r = range.getBoundingClientRect();
				if (!r.width) continue;
				let opacity = 1;
				for (let a = el; a && a !== figure.parentElement; a = a.parentElement) {
					opacity *= Number(getComputedStyle(a).opacity);
				}
				const cs = getComputedStyle(el);
				// React emits `{n}%` as two text nodes; Svelte as one. Merge siblings.
				const prev = out[out.length - 1];
				if (prev && prev.el === el) {
					prev.text += text;
					continue;
				}
				out.push({
					el,
					text,
					x: Math.round(r.left - box.left),
					y: Math.round(r.top - box.top),
					color: rgb(cs.color),
					opacity: Math.round(opacity * 100) / 100,
					weight: cs.fontWeight
				});
			}
			for (const run of out) delete run.el;
			return {
				title: figure.querySelector('figcaption')?.textContent.trim() ?? '',
				h: Math.round(box.height),
				runs: out
			};
		});
	});
}

const up = await open(0);
const us = await open(W);
let total = 0;
for (const slug of slugs) {
	const [a, b] = await Promise.all([
		runs(up.page, `${UPSTREAM}/docs/${slug}`),
		runs(us.page, `${PORT}/docs/${slug}`)
	]);
	const count = a.length - 1;
	for (let i = 0; i < count; i++) {
		const fa = a[i],
			fb = b[i];
		const problems = [];
		if (!fb) {
			problems.push('missing in port');
		} else {
			if (fa.h !== fb.h) problems.push(`height ${fa.h} vs ${fb.h}`);
			const n = Math.max(fa.runs.length, fb.runs.length);
			for (let k = 0; k < n && problems.length < 12; k++) {
				const ra = fa.runs[k],
					rb = fb.runs[k];
				if (!ra || !rb) {
					problems.push(`run ${k}: ${JSON.stringify(ra?.text)} vs ${JSON.stringify(rb?.text)}`);
					continue;
				}
				const d = [];
				if (ra.text !== rb.text)
					d.push(`text ${JSON.stringify(ra.text)} vs ${JSON.stringify(rb.text)}`);
				if (Math.abs(ra.x - rb.x) > 1 || Math.abs(ra.y - rb.y) > 1)
					d.push(`pos ${ra.x},${ra.y} vs ${rb.x},${rb.y}`);
				if (ra.color !== rb.color) d.push(`color ${ra.color} vs ${rb.color}`);
				if (Math.abs(ra.opacity - rb.opacity) > 0.02)
					d.push(`opacity ${ra.opacity} vs ${rb.opacity}`);
				if (ra.weight !== rb.weight) d.push(`weight ${ra.weight} vs ${rb.weight}`);
				if (d.length) problems.push(`run ${k} ${JSON.stringify(ra.text)}: ${d.join('; ')}`);
			}
		}
		if (problems.length) {
			total++;
			console.log(`\n${slug} #${i} ${fa.title}`);
			for (const p of problems) console.log('  ' + p);
		}
	}
}
await up.browser.close();
await us.browser.close();
console.log(total ? `\n${total} figures differ` : '\nall figures match');
process.exit(total ? 1 : 0);
