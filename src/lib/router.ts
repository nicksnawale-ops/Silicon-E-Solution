import { useSyncExternalStore } from 'react';

/**
 * Minimal client-side router (no dependency): pathname-based pages with
 * history.pushState, plus "/#section" links that scroll after navigating.
 */

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', notify);
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export const usePathname = () =>
  useSyncExternalStore(
    subscribe,
    () => window.location.pathname,
    () => '/'
  );

/** Navigate to a path such as "/services" or "/#contact". */
export const navigate = (to: string) => {
  const url = new URL(to, window.location.origin);
  const samePath = url.pathname === window.location.pathname;

  if (samePath && url.hash) {
    // Same page: just scroll to the section.
    scrollToHash(url.hash);
    history.replaceState(null, '', url.pathname + url.hash);
    return;
  }

  history.pushState(null, '', url.pathname + url.hash);
  notify();
};

/** Scrolls to an element id once it exists and the new page's layout has settled. */
export const scrollToHash = (hash: string, attempts = 30) => {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) {
    if (attempts > 0) setTimeout(() => scrollToHash(hash, attempts - 1), 50);
    return;
  }
  // Give a freshly rendered page two frames + a beat to lay out before measuring.
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
        // Correct any drift if content above changed size during the smooth scroll.
        setTimeout(() => {
          const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
          const drift = el.getBoundingClientRect().top - margin;
          if (Math.abs(drift) > 8) {
            window.scrollTo({ top: window.scrollY + drift, behavior: 'instant' as ScrollBehavior });
          }
        }, 1400);
      }, 60)
    )
  );
};
