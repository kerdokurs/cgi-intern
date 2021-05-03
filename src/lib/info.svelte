<script lang="ts">
  import type dayjs from 'dayjs';

  export let sunrise: dayjs.Dayjs;
  export let sunset: dayjs.Dayjs;
  export let length: number;
</script>

<div>
  <p>Päikesetõus: {sunrise.format('HH:mm:ss')}</p>
  <p>Päikeseloojang: {sunset.format('HH:mm:ss')}</p>
  <p>Päeva pikkus: {length} minut(it)</p>
</div>
