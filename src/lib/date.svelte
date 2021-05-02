<script lang="ts">
  import { calculate } from './calc';
  import type Data from './Data';

  export let lat: number = 0;
  export let lng: number = 0;

  let data: Data;
  $: {
    data = calculate(new Date(), lat, lng);
    console.log(data);
  }
</script>

<!-- Test -->
<input type="decimal" bind:value={lat} placeholder="lat" />
<input type="decimal" bind:value={lng} placeholder="lng" />
<p>Sunrise: {data.sunrise.format('HH:mm:s')}</p>
<p>Sunset: {data.sunset.format('HH:mm:s')}</p>
