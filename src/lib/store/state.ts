import { writable } from 'svelte/store';

// State for managing if the sidebar is open.
// Only used for mobile version
export const sidebarOpen = writable<boolean>(false);
