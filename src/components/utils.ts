export const getDoc = (el: HTMLElement | null) => {
  const doc = el?.closest('article')?.id;
  // eslint-disable-next-line no-console
  if (el && !doc) console.warn('Parent doc for comment not found.');
  return doc || 'global';
};
/**
 * Throttling enforces a maximum number of times a function
 * can be called over time.
 *
 * @param func a function
 * @param delay time
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function throttle(this: any, func: Function, delay: number) {
  let prev = Date.now();
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const context = this;
  return function throttleFn(...args: any[]) {
    const now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
    }
  };
}
