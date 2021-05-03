import { writable } from 'svelte/store';

// State for managing if the sidebar is open.
// Only used for mobile version
export const sidebarOpen = writable<boolean>(false);

// State for managing if the map has been loaded and
// a marker can be added or edited.
export const mapHasLoaded = writable<boolean>(false);
