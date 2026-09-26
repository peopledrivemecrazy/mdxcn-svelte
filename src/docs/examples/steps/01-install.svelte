<!-- install — Each Step is numbered. state="now" is the current step, state="next" the one after. -->
<script lang="ts">
	import { Step, Steps } from '$lib/registry/steps/index.js';
</script>

<Steps title="INSTALL">
	<Step title="Add the package">
		<p>bun add mdxcn-svelte. Tailwind v4 picks up the classes.</p>
	</Step>
	<Step title="Import the stylesheet" state="now">
		<p>Import tokens.css after tailwindcss.</p>
	</Step>
	<Step title="Write" state="next">
		<p>Import a graph and drop it between paragraphs.</p>
	</Step>
</Steps>
