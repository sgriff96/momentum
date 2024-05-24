<script lang="ts">
	import type { PageData } from './$types';
	import { Chart, Svg, Axis, Area, Spline } from 'layerchart';
	import { format, PeriodType, formatDate } from 'svelte-ux';
	import { scaleTime } from 'd3-scale';

	// export let data: PageData;

	// console.log(data);

	const fuck = [
		{
			date: '2024-04-25T07:00:00.000Z',
			value: 69
		},
		{
			date: '2024-04-26T07:00:00.000Z',
			value: 86
		},
		{
			date: '2024-04-27T07:00:00.000Z',
			value: 77
		},
		{
			date: '2024-04-28T07:00:00.000Z',
			value: 85
		},
		{
			date: '2024-04-29T07:00:00.000Z',
			value: 73
		},
		{
			date: '2024-04-30T07:00:00.000Z',
			value: 67
		},
		{
			date: '2024-05-01T07:00:00.000Z',
			value: 53
		},
		{
			date: '2024-05-02T07:00:00.000Z',
			value: 70
		},
		{
			date: '2024-05-03T07:00:00.000Z',
			value: 57
		},
		{
			date: '2024-05-04T07:00:00.000Z',
			value: 66
		},
		{
			date: '2024-05-05T07:00:00.000Z',
			value: 94
		},
		{
			date: '2024-05-06T07:00:00.000Z',
			value: 70
		},
		{
			date: '2024-05-07T07:00:00.000Z',
			value: 71
		},
		{
			date: '2024-05-08T07:00:00.000Z',
			value: 80
		},
		{
			date: '2024-05-09T07:00:00.000Z',
			value: 64
		},
		{
			date: '2024-05-10T07:00:00.000Z',
			value: 99
		},
		{
			date: '2024-05-11T07:00:00.000Z',
			value: 55
		},
		{
			date: '2024-05-12T07:00:00.000Z',
			value: 50
		},
		{
			date: '2024-05-13T07:00:00.000Z',
			value: 76
		},
		{
			date: '2024-05-14T07:00:00.000Z',
			value: 54
		},
		{
			date: '2024-05-15T07:00:00.000Z',
			value: 59
		},
		{
			date: '2024-05-16T07:00:00.000Z',
			value: 53
		},
		{
			date: '2024-05-17T07:00:00.000Z',
			value: 77
		},
		{
			date: '2024-05-18T07:00:00.000Z',
			value: 75
		},
		{
			date: '2024-05-19T07:00:00.000Z',
			value: 87
		},
		{
			date: '2024-05-20T07:00:00.000Z',
			value: 63
		},
		{
			date: '2024-05-21T07:00:00.000Z',
			value: 93
		},
		{
			date: '2024-05-22T07:00:00.000Z',
			value: 67
		},
		{
			date: '2024-05-23T07:00:00.000Z',
			value: 59
		},
		{
			date: '2024-05-24T07:00:00.000Z',
			value: 89
		}
	];
</script>

<div class="h-[300px] rounded border p-4">
	<Chart
		data={fuck}
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
				format={(d) => formatDate(d, PeriodType.Day, { variant: 'short' })}
				rule
			/>
			<Spline class="stroke-primary stroke-2" />
		</Svg>
	</Chart>
</div>
