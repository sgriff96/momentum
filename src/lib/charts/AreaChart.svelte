<script lang="ts">
	import { format } from '@formkit/tempo';
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
</script>

<div class="h-[300px] rounded border p-4">
	<Chart
		{data}
		x="date"
		xScale={scaleTime()}
		y="value"
		yDomain={[0, null]}
		yNice
		padding={{ top: 48, bottom: 24 }}
		tooltip={{ mode: 'bisect-x' }}
		let:width
		let:height
		let:padding
		let:tooltip
	>
		<Svg>
			<LinearGradient class="to-cyan-0 from-cyan-500" vertical let:url>
				<Area line={{ class: 'stroke-2 stroke-cyan-500 opacity-20' }} fill={url} />
				<RectClipPath x={0} y={0} width={tooltip.data ? tooltip.x : width} {height} spring>
					<Area line={{ class: 'stroke-2 stroke-cyan-600' }} fill={url} />
				</RectClipPath>
			</LinearGradient>
			<Highlight points lines={{ class: 'stroke-cyan-500 [stroke-dasharray:unset]' }} />
			<Axis placement="bottom" />
		</Svg>

		<Tooltip
			y={48}
			xOffset={4}
			variant="none"
			class="text-sm font-semibold leading-3 text-primary"
			let:data
		>
			{data.value}
		</Tooltip>

		<Tooltip x={4} y={4} variant="none" class="text-sm font-semibold leading-3" let:data>
			{format(data.date, 'short')}
		</Tooltip>

		<Tooltip
			x="data"
			y={height + padding.top + 2}
			anchor="top"
			variant="none"
			class="text-primary-content whitespace-nowrap rounded bg-black px-2 py-1 text-sm font-semibold leading-3"
			let:data
		>
			{format(data.date, 'short')}
		</Tooltip>
	</Chart>
</div>
