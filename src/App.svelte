<script lang="ts">
  import MNav from './lib/components/m-nav.svelte';
  import Map from './lib/components/map.svelte';
  import Sidebar from './lib/components/sidebar.svelte';

  let lat: number = 0;
  let lng: number = 0;

  let updateMap: boolean = false;

  // Handler for "go to" event from sidebar
  const onGo = (e: any) => {
    const { lng: _lng, lat: _lat } = e.detail;
    lat = _lat;
    lng = _lng;

    updateMap = true;
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/@carbon/charts/styles.min.css"
  />
</svelte:head>

<main class="w-screen h-screen flex flex-row">
  <Sidebar on:go={onGo} bind:lat bind:lng />
  <Map bind:lat bind:lng bind:update={updateMap} />
</main>
<MNav />

<style lang="postcss">
  /* Tailwind setup */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
</style>
