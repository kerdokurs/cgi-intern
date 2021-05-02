<script lang="ts">
  import Map from './lib/map.svelte';
  import Sidebar from './lib/sidebar.svelte';

  let lat: number = 0;
  let lng: number = 0;

  // Map click handler
  const onClick = (e: any) => {
    const { lng: _lng, lat: _lat } = e.detail;
    lat = _lat;
    lng = _lng;
  };
</script>

<main class="text-center w-screen h-screen grid grid-cols-12">
  <Map on:click={onClick} />
  <Sidebar bind:lat bind:lng />
</main>

<style lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
</style>
