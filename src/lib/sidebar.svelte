<script>
  import { createEventDispatcher } from 'svelte';
  import { calculate } from './calc';
  import type Data from './Data';
  import Chart from './chart.svelte';
  import Info from './info.svelte';
  import type Timezone from './Timezone';
  import timezones from './timezones';
  import { sidebarOpen } from './store/state';

  const dispatch = createEventDispatcher();

  export let lat: number;
  export let lng: number;

  let showRange: boolean = false;
  let startDate: number = new Date().getTime();
  let endDate: number = new Date().getTime();

  let timezone: Timezone = timezones[0];

  let data: Data;
  $: {
    startDate && (data = calculate(new Date(startDate), lat, lng, timezone));
  }

  const go = () => {
    dispatch('go', { lat, lng });
  };
</script>

<div
  class="w-full h-screen lg:w-2/5 lg:relative py-20 px-4 bg-white {$sidebarOpen
    ? 'w-screen lg:w-full flex absolute left-0 z-10'
    : 'hidden lg:flex'} flex-col gap-4"
>
  <h1 class="text-2xl font-bold">Päeva pikkuse kalkulaator</h1>
  <h2 class="text-lg">Sisesta koordinaadid või vali asukoht kaardilt</h2>

  <form on:submit|preventDefault={go}>
    <div class="text-left grid grid-cols-2 gap-2">
      <label for="start"> {showRange ? 'Algk' : 'K'}uupäev </label>
      <input
        type="datetime-local"
        name="start"
        id="start"
        bind:value={startDate}
      />

      {#if showRange}
        <label for="end"> Lõppkuupäev </label>
        <input type="datetime-local" name="end" id="end" bind:value={endDate} />
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
      type="submit"
      class="mt-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-800 text-white font-semibold"
    >
      Mine
    </button>
  </form>

  {#if showRange}
    <Chart bind:lng bind:lat {startDate} {endDate} bind:timezone />
  {:else}
    <Info {...data} />
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
