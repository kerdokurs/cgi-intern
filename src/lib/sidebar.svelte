<script>
  import Date from './date.svelte';

  export let lat: number;
  export let lng: number;
</script>

<div class="col-span-4">
  <p>sidebar</p>
  <Date bind:lat bind:lng />
</div>
