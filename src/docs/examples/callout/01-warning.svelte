<!-- warning — type sets the frame title and the glyph. The body is Markdown — write it like a paragraph. -->
<script lang="ts">
	import { Callout } from '$lib/registry/callout/index.js';
</script>

<Callout type="warning">
	<p>
		The CLI copies files into registry/default. It does not add an npm dependency, so there is
		nothing to update later — edit the source.
	</p>
</Callout>
