<!-- runbook — A title and one line of body per step. -->
<script lang="ts">
	import { Step, Steps } from '$lib/registry/steps/index.js';
</script>

<Steps title="ROLLBACK">
	<Step title="Flip the flag">cache.v2 to off in the dashboard.</Step>
	<Step title="Watch p95">Two minutes. It should drop under 300ms.</Step>
	<Step title="Write it down">Open the postmortem before you leave.</Step>
</Steps>
