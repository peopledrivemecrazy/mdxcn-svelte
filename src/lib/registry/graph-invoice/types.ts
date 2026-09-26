export type InvoiceParty = {
	name: string;
	/** Address lines. An array, or one line per newline. */
	lines?: readonly string[] | string;
};

export type InvoiceMeta = {
	label: string;
	value: string;
};

export type InvoiceItem = {
	description: string;
	qty?: string;
	rate?: string;
	amount: string;
};

export type InvoiceTotal = {
	label: string;
	value: string;
	accent?: boolean;
};
