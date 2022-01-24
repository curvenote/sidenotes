import { opts } from '../../connect';
import docReducer from './docReducer';
import {
  UIState,
  UIActionTypes,
  UI_CONNECT_SIDENOTE,
  UI_SELECT_SIDENOTE,
  UI_CONNECT_ANCHOR,
  UI_SELECT_ANCHOR,
  DocState,
  UI_DISCONNECT_ANCHOR,
  UI_DESELECT_SIDENOTE,
  UI_CONNECT_ANCHOR_BASE,
  UI_REPOSITION_SIDENOTES,
  UI_RESET_ALL_SIDENOTES,
  UI_DISCONNECT_SIDENOTE,
  UI_DISCONNECT_ANCHOR_BASE,
  Sidenote,
} from './types';

export const initialState: UIState = {
  docs: {},
};

function getHeight(id: string) {
  return document.getElementById(id)?.offsetHeight ?? 0;
}

function getAnchorElement(state: DocState, sidenote: Sidenote): HTMLElement | null {
  // Iterate through all of the inline, and then work towards base anchors
  // This should return fast, usually the first element is defined!
  // If an ID is removed from the DOM, this falls back to any other anchors
  const allAnchors = [...(sidenote.inlineAnchors ?? []), ...(sidenote.baseAnchors ?? [])];
  for (let index = 0; index < allAnchors.length; index += 1) {
    const anchor = state.anchors[allAnchors[index]];
    const element = anchor?.element ?? document.getElementById(anchor?.id ?? '');
    if (element) return element;
  }
  return null;
}

function getTopLeft(anchor: HTMLElement | null) {
  // Recurse up the tree until you find the article (nested relative offsets)
  let el: HTMLElement | null = anchor;
  let top = 0;
  let left = 0;
  const article = anchor?.closest('article') || document.body;
  while (article.contains(el)) {
    top += el?.offsetTop || 0;
    left += el?.offsetLeft || 0;
    el = (el?.offsetParent ?? null) as HTMLElement | null;
  }
  return { top, left };
}

type Loc = [string, { top: number; left: number; height: number; isRemoved?: boolean }];
function placeSidenotes(state: DocState, actionType: string): DocState {
  // Do not place comments if it is a deselect call
  if (actionType === UI_DESELECT_SIDENOTE) return state;
  let findMe: Loc | undefined;
  const sorted = Object.entries(state.sidenotes)
    .map(([id, sidenote]) => {
      const element = getAnchorElement(state, sidenote);
      const loc: Loc = [id, { ...getTopLeft(element), height: getHeight(id), isRemoved: !element }];
      if (id === state.selectedSidenote) {
        findMe = loc;
      }
      return loc;
    })
    .filter((loc) => !loc[1].isRemoved)
    .sort((a, b) => {
      if (a[1].top === b[1].top) return a[1].left - b[1].left;
      return a[1].top - b[1].top;
    });

  const idx = findMe ? sorted.indexOf(findMe) : 0;
  // Push upwards from target (or nothing)
  const before = sorted.slice(0, idx + 1).reduceRight((prev, [id, loc]) => {
    const { top } = prev[prev.length - 1]?.[1] ?? {};
    const newTop = Math.min(top - loc.height - opts.padding, loc.top) || loc.top;
    const next = [id, { top: newTop, height: loc.height }] as Loc;
    return [...prev, next];
  }, [] as Loc[]);

  // Push comments downward
  const after = sorted.slice(idx).reduce((prev, [id, loc]) => {
    const { top, height } = prev[prev.length - 1]?.[1] ?? {};
    const newTop = Math.max(top + height + opts.padding, loc.top) || loc.top;
    const next = [id, { top: newTop, height: loc.height }] as Loc;
    return [...prev, next];
  }, [] as Loc[]);

  const idealPlacement = Object.fromEntries([...before, ...after]);

  let hasChanges = false;
  const sidenotes = Object.fromEntries(
    Object.entries(state.sidenotes).map(([id, comment]) => {
      const { top } = idealPlacement[id] || {};
      if (comment.top !== top) {
        hasChanges = true;
        return [id, { ...comment, top }];
      }
      return [id, comment];
    }),
  );
  if (!hasChanges) return state;
  return {
    ...state,
    sidenotes,
  };
}

const uiReducer = (state = initialState, action: UIActionTypes): UIState => {
  switch (action.type) {
    case UI_CONNECT_ANCHOR:
    case UI_CONNECT_ANCHOR_BASE:
    case UI_CONNECT_SIDENOTE:
    case UI_SELECT_SIDENOTE:
    case UI_SELECT_ANCHOR:
    case UI_DISCONNECT_ANCHOR:
    case UI_DISCONNECT_ANCHOR_BASE:
    case UI_DISCONNECT_SIDENOTE:
    case UI_DESELECT_SIDENOTE:
    case UI_REPOSITION_SIDENOTES: {
      const { docId } = action.payload;
      const nextDoc = placeSidenotes(docReducer(state.docs[docId], action), action.type);
      return {
        ...state,
        docs: {
          ...state.docs,
          [docId]: nextDoc,
        },
      };
    }

    case UI_RESET_ALL_SIDENOTES: {
      return {
        ...state,
        docs: {},
      };
    }
    default:
      return state;
  }
};

export default uiReducer;
