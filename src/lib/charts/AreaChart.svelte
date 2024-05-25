<script lang="ts">
	import { format } from '@formkit/tempo';
	import * as d3shapes from 'd3-shape';
	import { scaleTime } from 'd3-scale';
	import {
		Axis,
		Chart,
		Area,
		Svg,
		LinearGradient,
		RectClipPath,
		Highlight,
		Tooltip
	} from 'layerchart';

	export let data: { date: Date; value: number }[];

	// https://d3js.org/d3-shape/curve
	// https://www.layerchart.com/docs/components/Area
	const curve = d3shapes['curveBasis'];
</script>

<div class="h-[200px]">
	<Chart
		{data}
		x="date"
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
				<Area {curve} line={{ class: 'stroke-2 stroke-primary opacity-20' }} fill={url} />
				<RectClipPath x={0} y={0} width={tooltip.data ? tooltip.x : width} {height} spring>
					<Area {curve} line={{ class: 'stroke-2 stroke-primary' }} fill={url} />
				</RectClipPath>
			</LinearGradient>
			<Highlight points />
			<Axis
				placement="bottom"
				format={(d) => format(d, 'MM/DD')}
				labelProps={{
					class: 'fill-secondary-foreground'
				}}
			/>
		</Svg>

		<Tooltip
			xOffset={4}
			variant="none"
			class="text-primary-content whitespace-nowrap rounded bg-primary px-2 py-1 text-sm font-semibold leading-3 text-primary-foreground"
			let:data
		>
			{format(data.date, 'long')}
		</Tooltip>
	</Chart>
</div>
