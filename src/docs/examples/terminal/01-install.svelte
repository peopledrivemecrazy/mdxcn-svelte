<!-- install — Pass the session as text. $ marks a command, ✓ a pass. -->
<script lang="ts">
	import { Terminal } from '$lib/registry/terminal/index.js';

	const session = `$ bun add mdxcn-svelte
✓ installed mdxcn-svelte
✓ svelte and tailwindcss found
  1 package added`;
</script>

<Terminal title="SHELL" text={session} />
