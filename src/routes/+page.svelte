<script lang="ts">
	import AreaChart from '$lib/charts/AreaChart.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const chartData = data.dateSeriesData.map((d) => ({
		...d,
		date: new Date(d.date)
	}));
</script>

<AreaChart data={chartData} />
