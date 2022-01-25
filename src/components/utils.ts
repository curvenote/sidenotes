const articleMap = new WeakMap();
export const getDoc = (el: HTMLElement | null) => {
  const doc = el ? articleMap.get(el) || el.closest('article')?.id : null;
  if (el && doc) {
    articleMap.set(el, doc);
  }
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
  let timter: number | null = null;
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const context = this;
  return function throttleFn(...args: any[]) {
    const now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
      return;
    }
    if (timter) clearTimeout(timter);
    timter = +setTimeout(() => {
      timter = null;
      func.apply(context, args);
    }, delay);
  };
}
// scrollIntoView
export function scrollElementInview(ele: Element | undefined) {
  if (!ele) return;
  // eslint-disable-next-line
  // @ts-ignore
  if (typeof ele.scrollIntoViewIfNeeded === 'function') {
    // eslint-disable-next-line
    // @ts-ignore
    ele.scrollIntoViewIfNeeded(true);
  } else {
    ele.scrollIntoView({ behavior: 'auto', block: 'center' });
  }
}
