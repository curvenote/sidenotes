import { v4 as uuid } from 'uuid';
import {
  UI_CONNECT_ANCHOR,
  UI_DESELECT_SIDENOTE,
  UI_DISCONNECT_ANCHOR,
  UI_DISCONNECT_ANCHOR_BASE,
  UI_CONNECT_SIDENOTE,
  UI_SELECT_ANCHOR,
  UI_SELECT_SIDENOTE,
  UI_DISCONNECT_SIDENOTE,
  UI_CONNECT_ANCHOR_BASE,
  UI_REPOSITION_SIDENOTES,
  UI_RESET_ALL_SIDENOTES,
  DisconnectAnchorBase,
} from './types';
import { AppThunk, SidenotesUIActions } from '../types';
import { selectedSidenote, selectedAnchor } from './selectors';

export function connectSidenote(
  docId?: string,
  sidenoteId?: string | Array<string>,
  baseId?: string,
): AppThunk<void> {
  return (dispatch) => {
    if (docId == null || sidenoteId == null || sidenoteId?.length === 0) return;
    if (Array.isArray(sidenoteId)) {
      sidenoteId.forEach((id) => {
        dispatch({
          type: UI_CONNECT_SIDENOTE,
          payload: { docId, sidenoteId: id, baseId },
        } as SidenotesUIActions);
      });
      return;
    }
    dispatch({
      type: UI_CONNECT_SIDENOTE,
      payload: { docId, sidenoteId, baseId },
    } as SidenotesUIActions);
  };
}

export function connectAnchor(
  docId?: string,
  sidenoteId?: string | Array<string>,
  element?: string | HTMLElement,
): AppThunk<void> {
  return (dispatch) => {
    if (docId == null || sidenoteId == null || element == null) return;
    if (Array.isArray(sidenoteId)) {
      const anchorIds =
        typeof element === 'string'
          ? element
          : (element as any)?.anchorId || sidenoteId.map(() => uuid()); // array
      if ((element as any)?.anchorId === anchorIds) return;
      if (typeof element !== 'string') {
        // eslint-disable-next-line no-param-reassign
        (element as any).anchorId = anchorIds;
      }
      sidenoteId.forEach((id, index) => {
        dispatch({
          type: UI_CONNECT_ANCHOR,
          payload: {
            docId,
            sidenoteId: id,
            anchorId: Array.isArray(anchorIds) ? anchorIds[index] : anchorIds,
            element: typeof element === 'string' ? undefined : element,
          },
        } as SidenotesUIActions);
      });
      return;
    }
    const anchorId = typeof element === 'string' ? element : (element as any)?.anchorId || uuid();
    if ((element as any)?.anchorId === anchorId) return;
    if (typeof element !== 'string') {
      // eslint-disable-next-line no-param-reassign
      (element as any).anchorId = anchorId;
    }
    dispatch({
      type: UI_CONNECT_ANCHOR,
      payload: {
        docId,
        sidenoteId,
        anchorId,
        element: typeof element === 'string' ? undefined : element,
      },
    } as SidenotesUIActions);
  };
}

export function connectAnchorBase(
  docId?: string,
  anchorId?: string,
  element?: HTMLElement,
): AppThunk<void> {
  return (dispatch) => {
    if (docId == null || anchorId == null || element == null) return;
    // eslint-disable-next-line no-param-reassign
    (element as any).anchorId = anchorId;
    dispatch({
      type: UI_CONNECT_ANCHOR_BASE,
      payload: {
        docId,
        anchorId,
        element,
      },
    } as SidenotesUIActions);
  };
}
export function disconnectAnchorBase(docId?: string, anchorId?: string): AppThunk<void> {
  return (dispatch) => {
    if (docId == null || anchorId == null) return;
    dispatch({
      type: UI_DISCONNECT_ANCHOR_BASE,
      payload: {
        docId,
        anchorId,
      },
    } as DisconnectAnchorBase);
  };
}
export function repositionSidenotes(docId: string): SidenotesUIActions {
  return { type: UI_REPOSITION_SIDENOTES, payload: { docId } };
}

export function updateSidenote(docId: string, sidenoteId: string): SidenotesUIActions {
  return {
    type: UI_SELECT_SIDENOTE,
    payload: { docId, sidenoteId },
  };
}
export function selectSidenote(docId?: string, sidenoteId?: string): AppThunk<void> {
  return (dispatch) => {
    dispatch({
      type: UI_SELECT_SIDENOTE,
      payload: { docId, sidenoteId },
    } as SidenotesUIActions);
  };
}

export function selectAnchor(docId?: string, anchor?: string | HTMLElement | null): AppThunk<void> {
  return (dispatch, getState) => {
    if (docId == null || anchor == null) return;
    const anchorId = typeof anchor === 'string' ? anchor : (anchor as any).anchorId;
    if (!anchorId) return;
    if (Array.isArray(anchorId)) {
      // Click repeatedly and activate the corresponding notes in turn
      let index = anchorId.indexOf(selectedAnchor(getState(), docId) || '');
      // eslint-disable-next-line no-nested-ternary
      index = index < 0 ? 0 : index >= anchorId.length - 1 ? 0 : index + 1;
      dispatch({
        type: UI_SELECT_ANCHOR,
        payload: { docId, anchorId: anchorId[index] },
      } as SidenotesUIActions);
      return;
    }
    dispatch({
      type: UI_SELECT_ANCHOR,
      payload: { docId, anchorId },
    } as SidenotesUIActions);
  };
}

export function disconnectSidenote(docId?: string, sidenoteId?: string): AppThunk<void> {
  return (dispatch) => {
    if (docId == null || sidenoteId == null) return;
    dispatch({
      type: UI_DISCONNECT_SIDENOTE,
      payload: { docId, sidenoteId },
    } as SidenotesUIActions);
  };
}

export function disconnectAnchor(
  docId?: string,
  anchor?: string | HTMLElement | null,
): AppThunk<void> {
  return (dispatch) => {
    if (docId == null || anchor == null) return;
    const anchorId = typeof anchor === 'string' ? anchor : (anchor as any).anchorId;
    if (!anchorId) return;
    if (Array.isArray(anchorId)) {
      anchorId.forEach((id) => {
        dispatch({
          type: UI_DISCONNECT_ANCHOR,
          payload: { docId, anchorId: id },
        } as SidenotesUIActions);
      });
      return;
    }
    dispatch({
      type: UI_DISCONNECT_ANCHOR,
      payload: { docId, anchorId },
    } as SidenotesUIActions);
  };
}

export function resetAllSidenotes(): AppThunk<void> {
  return (dispatch) => {
    dispatch({ type: UI_RESET_ALL_SIDENOTES, payload: {} } as SidenotesUIActions);
  };
}

const toggle = { active: false };
export function disableNextDeselectSidenote() {
  toggle.active = true;
}

export function deselectSidenote(docId: string): AppThunk {
  return (dispatch, getState) => {
    if (toggle.active) {
      toggle.active = false;
      return;
    }
    const selected = selectedSidenote(getState(), docId);
    if (selected) {
      dispatch({ type: UI_DESELECT_SIDENOTE, payload: { docId } });
    }
  };
}
