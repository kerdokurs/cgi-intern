<script>
  import { sidebarOpen } from './store/state';
</script>

<div class="block lg:hidden absolute left-0 top-0 p-4 z-20">
  <button
    class="bg-white rounded-full w-10 h-10 flex"
    on:click={() => ($sidebarOpen = !$sidebarOpen)}
  >
    {#if !$sidebarOpen}
      <svg
        class="w-6 h-6 m-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    {:else}
      <svg
        class="w-6 h-6 m-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    {/if}
  </button>
</div>
