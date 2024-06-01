<script lang="ts">
	import { scaleTime } from 'd3-scale';
	import * as d3shapes from 'd3-shape';
	import { format } from 'date-fns';
	import { Area, Axis, Chart, Highlight, LinearGradient, RectClipPath, Svg, Tooltip } from 'layerchart';
	import { MoveRight, TrendingDown, TrendingUp } from 'lucide-svelte';
	import type { HabitDataWithValue } from '../types/Habit';
	// TODO: add trend back to data
	export let data: HabitDataWithValue[];

	$: newData = data.map((d) => ({
		value: d.value,
		date: new Date(d.date),
	}));

	// https://d3js.org/d3-shape/curve
	// https://www.layerchart.com/docs/components/Area
	// @ts-expect-error d3-shape types are not up to date
	const curve = d3shapes['linear']; // curveBasis or linear
</script>

<div class="h-[200px]">
	<Chart
		data={newData}
		x={'date'}
		xScale={scaleTime()}
		y="value"
		yDomain={[0, null]}
		yNice
		tooltip={{ mode: 'bisect-x' }}
		let:width
		let:height
		let:tooltip
	>
		<Svg>
			<LinearGradient class="fill from-primary" vertical let:url>
				<Area curve={curve} line={{ class: 'stroke-2 stroke-primary opacity-20' }} fill={url} />
				<RectClipPath x={0} y={0} width={tooltip.data ? tooltip.x : width} height={height} spring>
					<Area curve={curve} line={{ class: 'stroke-2 stroke-primary' }} fill={url} />
				</RectClipPath>
			</LinearGradient>
			<Highlight points />
			<Axis
				placement="bottom"
				format={(d) => format(d, 'MM-dd')}
				labelProps={{
					class: 'fill-secondary-foreground',
				}}
			/>
		</Svg>

		<Tooltip
			xOffset={4}
			variant="none"
			class="whitespace-nowrap rounded-md border bg-background px-2 py-1 text-sm leading-3 text-foreground"
			let:data
		>
			<div class="flex items-center gap-2">
				{#if data.trend === '0'}
					<MoveRight class="inline-block h-4 w-4" />
				{:else if data.trend === '1'}
					<TrendingUp class="inline-block h-4 w-4" />
				{:else if data.trend === '-1'}
					<TrendingDown class="inline-block h-4 w-4" />
				{/if}
				{format(data.date, 'yyyy-MM-dd')}
			</div>
		</Tooltip>
	</Chart>
</div>
