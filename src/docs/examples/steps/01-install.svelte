<!-- install — Each Step is numbered. state="now" is the current step, state="next" the one after. -->
<script lang="ts">
	import { Step, Steps } from '$lib/registry/steps/index.js';
</script>

<Steps title="INSTALL">
	<Step title="Copy the source">
		<p>Run the shadcn CLI. Files land under registry/default.</p>
	</Step>
	<Step title="Register it" state="now">
		<p>Export the component from mdx-components.tsx.</p>
	</Step>
	<Step title="Write" state="next">
		<p>Use it between paragraphs. No import line.</p>
	</Step>
</Steps>
