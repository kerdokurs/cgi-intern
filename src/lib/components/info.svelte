<script lang="ts">
  import { calculate } from '../algo';
  import type Data from '../interfaces/Data';
  import type Timezone from '../interfaces/Timezone';

  export let lat: number;
  export let lng: number;
  export let date: number;
  export let timezone: Timezone;

  let data: Data;

  // Reactive reassign when any of the parameters change
  $: data = calculate(new Date(date), lat, lng, timezone);
</script>

<div>
  <p>Sunrise: {data.sunrise.format('HH:mm:ss')}</p>
  <p>Sunset: {data.sunset.format('HH:mm:ss')}</p>
  <p>Length of day: {data.length} minute(s)</p>
</div>
