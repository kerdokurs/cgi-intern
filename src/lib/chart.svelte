<script lang="ts">
  import { LineChart } from '@carbon/charts-svelte';
  import { calculateRange } from './calc';
  import type Timezone from './Timezone';

  export let lat: number;
  export let lng: number;
  export let startDate: number;
  export let endDate: number;
  export let timezone: Timezone;

  export let modalOpen: boolean;

  export let height: number = 400;

  let data: any[] = [];
  $: {
    data = calculateRange(
      new Date(startDate),
      new Date(endDate),
      lat,
      lng,
      timezone
    ).map((val) => ({
      group: 'Päeva pikkus',
      date: val.date.toString(),
      value: val.length,
    }));
  }

  const options = {
    title: 'Päevade pikkus',
    axes: {
      bottom: {
        title: 'Kuupäev',
        mapsTo: 'date',
        scaleType: 'time',
      },
      left: {
        mapsTo: 'value',
        title: 'Päeva pikkus (min)',
        scaleType: 'linear',
      },
    },
    height: `${height}px`,
  };
</script>

<LineChart {data} {options} />
<p class="text-right text-xs">
  <button
    class="outline-none focus:outline-none text-indigo-800"
    on:click={() => (modalOpen = !modalOpen)}>Vaata suuremalt</button
  >
</p>
