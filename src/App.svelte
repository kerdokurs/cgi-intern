<script lang="ts">
  import Map from './lib/map.svelte';
  import Sidebar from './lib/sidebar.svelte';

  let lat: number = 0;
  let lng: number = 0;

  let updateMap: boolean = false;

  const onGo = (e: any) => {
    const { lng: _lng, lat: _lat } = e.detail;
    lat = _lat;
    lng = _lng;

    updateMap = true;
  };
</script>

<main class="w-screen h-screen flex flex-row">
  <Sidebar on:go={onGo} bind:lat bind:lng />
  <Map bind:lat bind:lng bind:update={updateMap} />
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
