import {
  UIState,
  UIActionTypes,
  UI_CONNECT_SIDENOTE,
  UI_SELECT_SIDENOTE,
  UI_CONNECT_ANCHOR,
  UI_SELECT_ANCHOR,
  UI_DISCONNECT_ANCHOR,
  UI_DESELECT_SIDENOTE,
  UI_CONNECT_ANCHOR_BASE,
  UI_REPOSITION_SIDENOTES,
  UI_RESET_ALL_SIDENOTES,
  UI_DISCONNECT_SIDENOTE,
  Sidenote,
  ANCHOR_BASE,
} from './types';

export const createInitialState = (docId: string, padding = 10): UIState => ({
  padding,
  docId,
  selectedSidenote: null,
  selectedAnchor: null,
  sidenotes: {},
  anchors: {},
});

function getHeight(id: string) {
  return document.getElementById(id)?.offsetHeight ?? 0;
}

function getAnchorElement(state: UIState, sidenote: Sidenote): HTMLElement | null {
  const allAnchors = [...(sidenote.inlineAnchors ?? []), ...(sidenote.baseAnchors ?? [])];
  for (let index = 0; index < allAnchors.length; index += 1) {
    const anchor = state.anchors[allAnchors[index]];
    const element = anchor?.element ?? document.getElementById(anchor?.id ?? '');
    if (element) return element;
  }
  return null;
}

function getTopLeft(anchor: HTMLElement | null) {
  let el: HTMLElement | null = anchor;
  let top = 0;
  let left = 0;
  do {
    top += el?.offsetTop || 0;
    left += el?.offsetLeft || 0;
    el = (el?.offsetParent ?? null) as HTMLElement | null;
  } while (el && el.tagName !== 'ARTICLE');
  return { top, left };
}

function placeSidenotes(state: UIState, actionType: string): UIState {
  if (actionType === UI_DESELECT_SIDENOTE) return state;
  type Loc = [string, { top: number; left: number; height: number }];
  let findMe: Loc | undefined;
  const sorted = Object.entries(state.sidenotes)
    .map(([id, sidenote]) => {
      const element = getAnchorElement(state, sidenote);
      const loc: Loc = [id, { ...getTopLeft(element), height: getHeight(id) }];
      if (id === state.selectedSidenote) findMe = loc;
      return loc;
    })
    .sort((a, b) => {
      if (a[1].top === b[1].top) return a[1].left - b[1].left;
      return a[1].top - b[1].top;
    });

  const idx = findMe ? sorted.indexOf(findMe) : 0;
  const before = sorted.slice(0, idx + 1).reduceRight((prev, [id, loc]) => {
    const { top } = prev[prev.length - 1]?.[1] ?? {};
    const newTop = Math.min(top - loc.height - state.padding, loc.top) || loc.top;
    const next = [id, { top: newTop, height: loc.height }] as Loc;
    return [...prev, next];
  }, [] as Loc[]);

  const after = sorted.slice(idx).reduce((prev, [id, loc]) => {
    const { top, height } = prev[prev.length - 1]?.[1] ?? {};
    const newTop = Math.max(top + height + state.padding, loc.top) || loc.top;
    const next = [id, { top: newTop, height: loc.height }] as Loc;
    return [...prev, next];
  }, [] as Loc[]);

  const idealPlacement = Object.fromEntries([...before, ...after]);

  let hasChanges = false;
  const sidenotes = Object.fromEntries(
    Object.entries(state.sidenotes).map(([id, comment]) => {
      const { top } = idealPlacement[id];
      if (comment.top !== top) {
        hasChanges = true;
        return [id, { ...comment, top }];
      }
      return [id, comment];
    }),
  );
  if (!hasChanges) return state;
  return { ...state, sidenotes };
}

export const uiReducer = (state: UIState, action: UIActionTypes): UIState => {
  switch (action.type) {
    case UI_REPOSITION_SIDENOTES:
      return placeSidenotes(state, action.type);
    case UI_CONNECT_SIDENOTE: {
      const { sidenoteId, baseId } = action.payload;
      const baseIds = baseId ? [baseId] : [];
      const prev = state.sidenotes[sidenoteId];
      return placeSidenotes(
        {
          ...state,
          sidenotes: {
            ...state.sidenotes,
            [sidenoteId]: {
              ...prev,
              id: sidenoteId,
              baseAnchors: [...baseIds, ...(prev?.baseAnchors ?? [])],
              inlineAnchors: [...(prev?.inlineAnchors ?? [])],
            },
          },
        },
        action.type,
      );
    }
    case UI_DISCONNECT_SIDENOTE: {
      const { sidenoteId } = action.payload;
      if (!state.sidenotes[sidenoteId]) return state;
      const sidenotes = { ...state.sidenotes };
      delete sidenotes[sidenoteId];
      return placeSidenotes({ ...state, sidenotes }, action.type);
    }
    case UI_CONNECT_ANCHOR: {
      const { sidenoteId, anchorId, element } = action.payload;
      const prev = state.sidenotes[sidenoteId];
      return placeSidenotes(
        {
          ...state,
          sidenotes: {
            ...state.sidenotes,
            [sidenoteId]: {
              ...prev,
              inlineAnchors: [anchorId, ...(prev?.inlineAnchors ?? [])],
            } as Sidenote,
          },
          anchors: {
            ...state.anchors,
            [anchorId]: { id: anchorId, sidenote: sidenoteId, element },
          },
        },
        action.type,
      );
    }
    case UI_CONNECT_ANCHOR_BASE: {
      const { anchorId, element } = action.payload;
      return placeSidenotes(
        {
          ...state,
          anchors: {
            ...state.anchors,
            [anchorId]: { id: anchorId, sidenote: ANCHOR_BASE, element },
          },
        },
        action.type,
      );
    }
    case UI_DISCONNECT_ANCHOR: {
      const { anchorId } = action.payload;
      const anchor = state.anchors[anchorId];
      if (!anchor) return state;
      const anchors = { ...state.anchors };
      delete anchors[anchor.id];
      const sidenote = state.sidenotes[anchor.sidenote];
      return placeSidenotes(
        {
          ...state,
          sidenotes: {
            ...state.sidenotes,
            [anchor.sidenote]: {
              ...sidenote,
              inlineAnchors: [...(sidenote?.inlineAnchors ?? [])].filter((a) => a !== anchorId),
            } as Sidenote,
          },
          anchors,
        },
        action.type,
      );
    }
    case UI_SELECT_SIDENOTE: {
      const { sidenoteId } = action.payload;
      const prev = state.sidenotes[sidenoteId];
      return placeSidenotes(
        {
          ...state,
          selectedSidenote: sidenoteId,
          selectedAnchor: prev?.inlineAnchors?.[0] ?? prev?.baseAnchors?.[0] ?? null,
          sidenotes: {
            ...state.sidenotes,
            [sidenoteId]: {
              ...prev,
              id: sidenoteId,
              baseAnchors: [...(prev?.baseAnchors ?? [])],
              inlineAnchors: [...(prev?.inlineAnchors ?? [])],
            } as Sidenote,
          },
        },
        action.type,
      );
    }
    case UI_SELECT_ANCHOR: {
      const { anchorId } = action.payload;
      const anchor = state.anchors[anchorId];
      if (!anchor) return state;
      const sidenote = state.sidenotes[anchor.sidenote];
      const anchors = [
        anchorId,
        ...[...(sidenote?.inlineAnchors ?? [])].filter((a) => a !== anchorId),
      ];
      return placeSidenotes(
        {
          ...state,
          sidenotes: {
            ...state.sidenotes,
            [anchor.sidenote]: { ...sidenote, inlineAnchors: anchors } as Sidenote,
          },
          selectedAnchor: anchorId,
          selectedSidenote: anchor.sidenote,
        },
        action.type,
      );
    }
    case UI_DESELECT_SIDENOTE:
      return { ...state, selectedAnchor: null, selectedSidenote: null };
    case UI_RESET_ALL_SIDENOTES:
      return createInitialState(state.docId, state.padding);
    default:
      return state;
  }
};

export default uiReducer;
