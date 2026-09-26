<!-- bundle — Each segment label gets its own glyph and hue. -->
<script lang="ts">
	import { Bar, GraphStack } from '$lib/registry/graph-stack/index.js';
</script>

<GraphStack title="BUNDLE" palette="multi">
	<Bar label="marketing" segments="48 js, 22 css, 30 images" />
	<Bar label="docs" segments="28 js, 18 css, 54 images" />
</GraphStack>
