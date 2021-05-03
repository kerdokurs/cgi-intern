<script lang="ts">
  import { onMount } from 'svelte';
  import { mapbox } from './mapbox';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let container: HTMLElement;
  let map: mapbox.Map;
  let marker: mapbox.Marker;

  export let lng: number = 0;
  export let lat: number = 0;

  export let update: boolean = false;

  $: update && updateMarker();

  onMount(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/mapbox-gl/dist/mapbox-gl.css';

    link.onload = () => {
      map = new mapbox.Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 3.5,
      });
      map.addControl(new mapbox.NavigationControl());

      map.on('click', (e) => {
        const {
          lngLat: { lng: _lng, lat: _lat },
        } = e;
        lng = _lng;
        lat = _lat;

        updateMarker();
      });
    };

    document.head.appendChild(link);

    return () => {
      map && map.remove();
      link?.parentNode?.removeChild(link);
    };
  });

  const updateMarker = (): void => {
    update = false;
    if (!map) return;

    map.flyTo({
      center: [lng, lat],
      zoom: Math.max(map.getZoom(), 9),
      bearing: 0,
      speed: 1,
      curve: 1,
      easing: (t) => t,
      essential: true,
    });

    if (!marker) marker = new mapbox.Marker().setLngLat([lng, lat]).addTo(map);
    else marker.setLngLat([lng, lat]);
  };
</script>

<div id="map" class="w-full h-full" bind:this={container} />
