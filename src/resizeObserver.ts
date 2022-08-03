import { Store, Dispatch } from './store/types';
import { repositionSidenotes, updateSidenotesOffsetHeight } from './store/ui/actions';
import { throttle } from './components/utils';

type ObserverMap = Record<string, ResizeObserver | null>;

const resizeObserverMap: ObserverMap = {};
let dispatch: Dispatch | null = null;

export const throttleRepositionSidenotes = throttle((docId: string) => {
  if (!dispatch) return;
  dispatch(repositionSidenotes(docId));
}, 50);

function getHandleResize(docId: string, sidenoteId?: string) {
  return function cb(entries: ResizeObserverEntry[]) {
    if (!dispatch) return;
    if (!sidenoteId) {
      throttleRepositionSidenotes(docId);
      return;
    }
    entries.forEach((entry: ResizeObserverEntry) => {
      updateSidenotesOffsetHeight(docId, sidenoteId, entry.contentRect.height);
    });
  };
}
// observer element to reposition
export function observer(
  el: HTMLElement | null,
  docId: string | undefined,
  sidenoteId?: string | undefined,
) {
  if (!docId || !el) return;
  const resizeObserver =
    resizeObserverMap[docId] || new ResizeObserver(getHandleResize(docId, sidenoteId));
  resizeObserverMap[docId] = resizeObserver;
  if (sidenoteId) getHandleResize(docId); // call once to set initial height
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
