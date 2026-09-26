<!-- bundle — Each segment label gets its own glyph and hue. -->
<script lang="ts">
	import { Bar, GraphStack, Segment } from '$lib/registry/graph-stack/index.js';
</script>

<GraphStack title="BUNDLE" palette="multi">
	<Bar label="marketing">
		<Segment value={48} label="js" />
		<Segment value={22} label="css" />
		<Segment value={30} label="images" />
	</Bar>
	<Bar label="docs">
		<Segment value={28} label="js" />
		<Segment value={18} label="css" />
		<Segment value={54} label="images" />
	</Bar>
</GraphStack>
