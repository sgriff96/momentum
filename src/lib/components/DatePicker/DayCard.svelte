<script lang="ts">
	import { format } from 'date-fns';

	export let date: Date;

	const today = new Date();
	$: highlight = format(today, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
</script>

<div class="{highlight ? 'bg-blue-500' : 'bg-slate-500'} rounded p-1 text-white">
	<div>
		{format(date, 'E')}
		{format(date, 'MM-dd')}
	</div>
</div>
