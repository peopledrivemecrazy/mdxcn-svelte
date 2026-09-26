<script lang="ts">
	import { applyTheme } from '../accent.js';

	function toggle() {
		applyTheme(!document.documentElement.classList.contains('dark'));
	}
</script>

<button
	type="button"
	aria-label="Toggle dark mode"
	class="px-2 py-1 font-mono text-muted-foreground hover:text-foreground"
	onclick={toggle}
>
	<span class="dark:hidden">[ dark ]</span>
	<span class="hidden dark:inline">[ light ]</span>
</button>
