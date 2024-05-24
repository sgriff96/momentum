<script lang="ts">
	import { Chart, Svg, Axis, Area } from 'layerchart';
	import { format, Field, Switch, Toggle, PeriodType } from 'svelte-ux';
	import { scaleTime } from 'd3-scale';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="h-[300px] rounded border p-4">
	<Chart
		data={data.dateSeriesData}
		x="date"
		xScale={scaleTime()}
		y="value"
		yDomain={[0, null]}
		yNice
		padding={{ left: 16, bottom: 24 }}
	>
		<Svg>
			<Axis placement="left" grid rule />
			<Axis
				placement="bottom"
				format={(d) => format(d, PeriodType.Day, { variant: 'short' })}
				rule
			/>
			<Area line={{ class: 'stroke-2 stroke-primary' }} class="fill-primary/40" />
		</Svg>
	</Chart>
</div>
