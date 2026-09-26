<!-- comment and output — # lines are comments. Plain lines are output, muted. -->
<script lang="ts">
	import { Terminal } from '$lib/registry/terminal/index.js';

	const session = `# run the suite once
> pnpm test
 RUN  v3.2.7
 ✓ lib/http/accept.test.ts (12)
 ✓ lib/agent/copy.test.ts (4)
 Test Files  2 passed (2)`;
</script>

<Terminal prompt=">" title="TESTS" text={session} />
