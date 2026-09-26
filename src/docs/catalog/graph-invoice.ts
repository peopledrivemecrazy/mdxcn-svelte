import { className, corner, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-invoice',
	title: 'invoice',
	name: 'GraphInvoice',
	category: 'data',
	description:
		'From, bill-to, line items, and a totals block. Write `<Item>` and `<Total>` children; from and to are strings. A generic grid is Table.',
	importPath: 'mdxcn-svelte/graph-invoice',
	exports: ['GraphInvoice', 'From', 'To', 'Meta', 'Item', 'Total'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'from',
			type: 'InvoiceParty | string',
			description: 'Issuer name. A string, or name plus address lines.'
		},
		{
			name: 'to',
			type: 'InvoiceParty | string',
			description: 'Recipient name. A string, or name plus address lines.'
		},
		{ name: 'meta', type: 'InvoiceMeta[]', description: 'Fields like number, issued, due.' },
		{
			name: 'items',
			type: 'InvoiceItem[]',
			description: 'Line items. qty and rate are optional; columns hide when unused.'
		},
		{
			name: 'totals',
			type: 'InvoiceTotal[]',
			description: 'Rows under the items. Set accent on the amount due.'
		},
		{
			name: 'note',
			type: 'string',
			description: 'Muted line under the totals. Payment terms, etc.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description:
				'`<From>`, `<To>`, `<Meta>`, `<Item>`, `<Total>` items instead of the data props.'
		},
		corner,
		className
	],
	items: [
		{
			name: 'From',
			description: 'Issuer. Used when the from prop is not set.',
			props: [
				{ name: 'name', type: 'string', description: 'Party name.' },
				{
					name: 'lines',
					type: 'string[] | string',
					description: 'Address lines. A string splits on newlines.'
				}
			]
		},
		{
			name: 'To',
			description: 'Recipient. Used when the to prop is not set.',
			props: [
				{ name: 'name', type: 'string', description: 'Party name.' },
				{
					name: 'lines',
					type: 'string[] | string',
					description: 'Address lines. A string splits on newlines.'
				}
			]
		},
		{
			name: 'Meta',
			description: 'One field such as number, issued, or due.',
			props: [
				{ name: 'label', type: 'string', description: 'Field name.' },
				{ name: 'value', type: 'string', description: 'Field value.' }
			]
		},
		{
			name: 'Item',
			description: 'One line item.',
			props: [
				{ name: 'description', type: 'string', description: 'What was billed.' },
				{
					name: 'qty',
					type: 'string',
					description: 'Quantity. The column hides when no item sets it.'
				},
				{
					name: 'rate',
					type: 'string',
					description: 'Unit rate. The column hides when no item sets it.'
				},
				{ name: 'amount', type: 'string', description: 'Line total.' }
			]
		},
		{
			name: 'Total',
			description: 'One row in the totals block.',
			props: [
				{ name: 'label', type: 'string', description: 'Row name, e.g. "Amount due".' },
				{ name: 'value', type: 'string', description: 'Amount.' },
				{ name: 'accent', type: 'boolean', default: 'false', description: 'Highlight this row.' }
			]
		}
	]
} satisfies CatalogEntry;
