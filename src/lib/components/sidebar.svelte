<script>
  import { createEventDispatcher } from 'svelte';
  import type Timezone from '../interfaces/Timezone';
  import { mapHasLoaded, sidebarOpen } from '../store/state';
  import timezones from '../timezones';
  import Chart from './chart.svelte';
  import Info from './info.svelte';

  const dispatch = createEventDispatcher();

  export let lat: number;
  export let lng: number;

  let showRange: boolean = false;
  let startDate: number = new Date().getTime();
  let endDate: number = -1;

  let dateError: boolean;
  $: dateError = endDate < startDate;

  let timezone: Timezone = timezones[0];

  // "Go to" handler - going to be notifying to move the map
  const go = () => dispatch('go', { lat, lng });

  // Defaulting to the current geolocation after the map has loaded
  $: $mapHasLoaded && getCurrentLocation();

  const getCurrentLocation = () => {
    // Getting the current geolocation from the navigator if
    // the user has given permission
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        lat = latitude;
        lng = longitude;
        go();
      });
    }
  };
</script>

<div
  class="w-full h-screen lg:w-2/5 lg:relative py-20 px-4 bg-white {$sidebarOpen
    ? 'w-screen lg:w-full flex absolute left-0 z-10'
    : 'hidden lg:flex'} flex-col gap-4"
>
  <h1 class="text-2xl font-bold">Päeva pikkuse kalkulaator</h1>
  <h2 class="text-lg">Sisesta koordinaadid või vali asukoht kaardilt</h2>

  <div>
    <div class="text-left grid grid-cols-2 gap-2">
      <label for="start"> {showRange ? 'Algk' : 'K'}uupäev </label>
      <input
        type="date"
        name="start"
        id="start"
        class="w-auto"
        bind:value={startDate}
      />

      {#if showRange}
        <label for="end"> Lõppkuupäev </label>
        <input
          type="date"
          name="end"
          id="end"
          class="w-auto"
          bind:value={endDate}
        />
        {#if dateError}
          <p class="col-span-2 text-xs text-red-800 text-right">
            Vale lõpukuupäev
          </p>
        {/if}
      {/if}

      <p class="col-span-2 text-right text-xs">
        <button
          class="outline-none focus:outline-none text-indigo-800"
          on:click|preventDefault={() => (showRange = !showRange)}
        >
          {showRange ? 'Sulge' : 'Ava'} vahemik
        </button>
      </p>

      <label for="lat"> Laiuskraad </label>
      <input type="decimal" name="lat" id="lat" bind:value={lat} />

      <label for="lng"> Pikkuskraad </label>
      <input type="decimal" name="lng" id="lng" bind:value={lng} />

      <label for="timezone"> Ajavöönd </label>
      <select name="timezone" id="timezone" bind:value={timezone}>
        {#each timezones as _timezone, i (i)}
          <option value={_timezone}>{_timezone.name}</option>
        {/each}
      </select>
    </div>
    <button
      type="button"
      class="mt-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-800 text-white font-semibold"
      on:click={go}
    >
      Mine asukohta
    </button>
  </div>

  {#if showRange && !dateError}
    <Chart bind:lng bind:lat {startDate} {endDate} bind:timezone />
  {:else}
    <Info bind:lng bind:lat bind:date={startDate} bind:timezone />
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
