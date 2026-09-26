<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	/** One row: `<Field label="ETA" value="Thu" accent />`. */
	export type FieldProps = {
		label: string;
		value?: string;
		accent?: boolean;
	};

	let { label, value, accent }: FieldProps = $props();

	registerItem('Field', () => ({ label, value, accent }));
</script>
