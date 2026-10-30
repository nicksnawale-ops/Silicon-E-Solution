import type Lenis from 'lenis';

/** Shared handle to the smooth-scroll instance so overlays can pause it. */
export const lenisRef: { current: Lenis | null } = { current: null };
