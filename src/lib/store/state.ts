import { writable } from 'svelte/store';

export const sidebarOpen = writable<boolean>(false);
export const modalOpen = writable<boolean>(false);
