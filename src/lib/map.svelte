<script lang="ts">
  import { onMount } from 'svelte';
  import { mapbox } from './mapbox';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let container: HTMLElement;
  let map: mapbox.Map;

  onMount(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/mapbox-gl/dist/mapbox-gl.css';

    link.onload = () => {
      map = new mapbox.Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [0, 0],
        zoom: 3.5,
      });

      map.on('click', (e: any) => {
        const {
          lngLat: { lng, lat },
        } = e;
        dispatch('click', { lng, lat });
      });
    };

    document.head.appendChild(link);

    return () => {
      map && map.remove();
      link?.parentNode?.removeChild(link);
    };
  });
</script>

<div id="map" class="w-full h-full col-span-8" bind:this={container} />
