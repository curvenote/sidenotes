import { Store, Dispatch } from './store/types';
import { repositionSidenotes } from './store/ui/actions';
import { throttle } from './components/utils';

type ObserverMap = Record<string, ResizeObserver | null>;

const resizeObserverMap: ObserverMap = {};
let dispatch: Dispatch | null = null;
function getHandleResize(docId: string) {
  return throttle(() => {
    if (!dispatch) return;
    dispatch(repositionSidenotes(docId));
    // setTimeout(() => {
    //   if (!dispatch) return;
    //   dispatch(repositionSidenotes(docId));
    // }, 32);
  }, 100);
}

export function observer(el: HTMLElement | null, docId: string | undefined) {
  if (!docId || !el) return;
  const resizeObserver = resizeObserverMap[docId] || new ResizeObserver(getHandleResize(docId));
  resizeObserverMap[docId] = resizeObserver;
  // getHandleResize(docId);
  resizeObserver?.observe(el);
}
export function unObserver(el: HTMLElement | null, docId: string | undefined) {
  if (!docId || !el) return;
  const resizeObserver = resizeObserverMap[docId];
  if (!resizeObserver) return;
  resizeObserver.unobserve(el);
}
export function setupObserver(store: Store) {
  dispatch = store.dispatch;
}
