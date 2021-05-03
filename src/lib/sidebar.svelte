<script>
  import dayjs from 'dayjs';

  import { createEventDispatcher } from 'svelte';
  import { calculate } from './calc';
  import type Data from './Data';
  import type Timezone from './Timezone';
  import timezones from './timezones';

  const dispatch = createEventDispatcher();

  export let lat: number;
  export let lng: number;

  let startDate: number = new Date().getTime();

  let timezone: Timezone = timezones[0];

  let data: Data;
  $: {
    startDate && (data = calculate(new Date(startDate), lat, lng, timezone));
  }

  const go = () => {
    dispatch('go', { lat, lng });
  };
</script>

<div class="w-2/5 py-20 px-4 flex flex-col gap-4">
  <h1 class="text-3xl font-bold">Päeva pikkuse kalkulaator</h1>
  <h2 class="text-xl">Sisesta koordinaadid või vali asukoht kaardilt</h2>

  <form on:submit|preventDefault={go}>
    <div class="text-left grid grid-cols-2 gap-2">
      <label for="start"> Laiuskraad </label>
      <input
        type="datetime-local"
        name="start"
        id="start"
        bind:value={startDate}
      />

      <label for="lat"> Laiuskraad </label>
      <input type="number" name="lat" id="lat" bind:value={lat} />

      <label for="lng"> Pikkuskraad </label>
      <input type="number" name="lng" id="lng" bind:value={lng} />

      <label for="timezone"> Ajavöönd </label>
      <select name="timezone" id="timezone" bind:value={timezone}>
        {#each timezones as _timezone, i (i)}
          <option value={_timezone}>{_timezone.name}</option>
        {/each}
      </select>
    </div>
    <button
      type="submit"
      class="mt-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-800 text-white font-semibold"
    >
      Mine
    </button>
  </form>

  {#if data}
    <div>
      <p>Päikesetõus: {data.sunrise.format('HH:mm:ssZ')}</p>
      <p>Päikeseloojang: {data.sunset.format('HH:mm:ssZ')}</p>
      <p>Päeva pikkus: {data.length} minut(it)</p>
    </div>
  {/if}
</div>

<style>
  input,
  select {
    @apply border;
    @apply border-black;
    @apply px-1;
  }
</style>
