<!-- install — Pass the session as text. $ marks a command, ✓ a pass. -->
<script lang="ts">
	import { Terminal } from '$lib/registry/terminal/index.js';

	const session = `$ pnpm dlx shadcn@latest add @mdxcn/callout
✓ registry/default/callout/callout.tsx
✓ registry/default/graph-frame/graph-frame.tsx
  2 files written, 0 conflicts`;
</script>

<Terminal title="SHELL" text={session} />
