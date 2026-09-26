<!-- tip with a title — title overrides the type on the frame. Lists work. -->
<script lang="ts">
	import { Callout } from '$lib/registry/callout/index.js';
</script>

<Callout title="Palette" type="tip">
	<p>One accent is the default. Opt in when a second series needs its own hue:</p>
	<ul>
		<li>palette="duo" for two series</li>
		<li>palette="multi" for three</li>
	</ul>
</Callout>
