<script lang="ts">
  import { LineChart } from '@carbon/charts-svelte';
  import { calculateRange } from '../algo';
  import type Timezone from '../interfaces/Timezone';

  export let lat: number;
  export let lng: number;
  export let startDate: number;
  export let endDate: number;
  export let timezone: Timezone;

  export let height: number = 400;

  let data: any[] = [];
  $: data = calculateRange(
    new Date(startDate),
    new Date(endDate),
    lat,
    lng,
    timezone
  ).map((val) => ({
    group: 'Length of day',
    date: val.date.toString(),
    value: val.length,
  })); // Some magic to map the data to expected format

  const options = {
    title: 'Length of days',
    axes: {
      bottom: {
        title: 'Date',
        mapsTo: 'date',
        scaleType: 'time',
      },
      left: {
        mapsTo: 'value',
        title: 'Length of day (min)',
        scaleType: 'linear',
      },
    },
    height: `${height}px`,
  };
</script>

<LineChart {data} {options} />
