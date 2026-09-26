<script lang="ts">
	let { text, label = 'Copy' }: { text: string; label?: string } = $props();

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			clearTimeout(timer);
			timer = setTimeout(() => (copied = false), 1500);
		} catch {
			copied = false;
		}
	}
</script>

<button
	type="button"
	aria-label={label}
	class="bg-background px-2 py-1 font-mono text-xs text-muted-foreground hover:text-foreground"
	onclick={copy}
>
	{copied ? 'copied' : 'copy'}
</button>
