<script lang="ts">
	import { scaleTime } from 'd3-scale';
	import { format } from 'date-fns';

	import type { HabitDataWithValue } from '$lib/types/Habit';
	import { Spline, Tooltip, Highlight, Chart, Svg } from 'layerchart';

	export let data: HabitDataWithValue[];

	$: newData = data.map((d) => ({
		value: d.value,
		date: new Date(d.date),
	}));
</script>

<div class="h-[25px]">
	<Chart data={newData} x="date" xScale={scaleTime()} y="value" tooltip={{ mode: 'bisect-x' }}>
		<Svg>
			<Spline class="stroke-primary stroke-1" />
			<Highlight points={{ r: 3, class: 'stroke-none' }} />
		</Svg>
		<Tooltip class="text-xs" contained={false} header={(data) => format(data.date, 'yyyy-MM-dd')} />
	</Chart>
</div>
