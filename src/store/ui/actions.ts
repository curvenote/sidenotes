import { v4 as uuid } from 'uuid';
import {
  UI_CONNECT_ANCHOR,
  UI_DESELECT_SIDENOTE,
  UI_DISCONNECT_ANCHOR,
  UI_CONNECT_SIDENOTE,
  UI_SELECT_ANCHOR,
  UI_SELECT_SIDENOTE,
  UI_DISCONNECT_SIDENOTE,
  UI_CONNECT_ANCHOR_BASE,
  UI_REPOSITION_SIDENOTES,
  UI_RESET_ALL_SIDENOTES,
  UIActionTypes,
} from './types';

export function connectSidenote(sidenoteId: string, baseId?: string): UIActionTypes {
  return { type: UI_CONNECT_SIDENOTE, payload: { sidenoteId, baseId } };
}

export function connectAnchor(sidenoteId: string, element: string | HTMLElement): UIActionTypes {
  const anchorId = typeof element === 'string' ? element : uuid();
  if (typeof element !== 'string') {
    (element as unknown as { anchorId: string }).anchorId = anchorId;
  }
  return {
    type: UI_CONNECT_ANCHOR,
    payload: {
      sidenoteId,
      anchorId,
      element: typeof element === 'string' ? undefined : element,
    },
  };
}

export function connectAnchorBase(anchorId: string, element: HTMLElement): UIActionTypes {
  (element as unknown as { anchorId: string }).anchorId = anchorId;
  return { type: UI_CONNECT_ANCHOR_BASE, payload: { anchorId, element } };
}

export function selectSidenote(sidenoteId: string): UIActionTypes {
  return { type: UI_SELECT_SIDENOTE, payload: { sidenoteId } };
}

export function selectAnchor(anchor: string | HTMLElement): UIActionTypes | null {
  const anchorId =
    typeof anchor === 'string' ? anchor : (anchor as unknown as { anchorId: string }).anchorId;
  if (!anchorId) return null;
  return { type: UI_SELECT_ANCHOR, payload: { anchorId } };
}

export function disconnectSidenote(sidenoteId: string): UIActionTypes {
  return { type: UI_DISCONNECT_SIDENOTE, payload: { sidenoteId } };
}

export function disconnectAnchor(anchor: string | HTMLElement): UIActionTypes | null {
  const anchorId =
    typeof anchor === 'string' ? anchor : (anchor as unknown as { anchorId: string }).anchorId;
  if (!anchorId) return null;
  return { type: UI_DISCONNECT_ANCHOR, payload: { anchorId } };
}

export function resetAllSidenotes(): UIActionTypes {
  return { type: UI_RESET_ALL_SIDENOTES, payload: {} };
}

export function deselectSidenote(): UIActionTypes {
  return { type: UI_DESELECT_SIDENOTE, payload: {} };
}

export function repositionSidenotes(): UIActionTypes {
  return { type: UI_REPOSITION_SIDENOTES, payload: {} };
}
