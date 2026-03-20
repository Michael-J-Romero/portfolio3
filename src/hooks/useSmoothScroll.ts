/**
 * Native scrolling is used here because the always-on Lenis RAF loop kept the
 * page busy even while idle, which showed up as system-wide lag in the browser.
 */
export function useSmoothScroll(): void {}
