<script lang="ts">
  import { onMount } from 'svelte';

  let number: number = 0;

  onMount(() => {
    const interval = setInterval(() => number++, 1000);

    return () => clearInterval(interval);
  });
</script>

<main class="text-center w-screen h-screen flex flex-col justify-center">
  <h1 class="text-4xl">CGI internship task</h1>
  <p>The page has been opened for {number} seconds</p>
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
