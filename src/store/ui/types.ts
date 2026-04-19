export const ANCHOR_BASE = 'ANCHOR_BASE';

export const UI_CONNECT_SIDENOTE = 'UI_CONNECT_SIDENOTE';
export const UI_DISCONNECT_SIDENOTE = 'UI_DISCONNECT_SIDENOTE';
export const UI_CONNECT_ANCHOR = 'UI_CONNECT_ANCHOR';
export const UI_CONNECT_ANCHOR_BASE = 'UI_CONNECT_ANCHOR_BASE';
export const UI_DISCONNECT_ANCHOR = 'UI_DISCONNECT_ANCHOR';
export const UI_SELECT_SIDENOTE = 'UI_SELECT_SIDENOTE';
export const UI_DESELECT_SIDENOTE = 'UI_DESELECT_SIDENOTE';
export const UI_SELECT_ANCHOR = 'UI_SELECT_ANCHOR';
export const UI_REPOSITION_SIDENOTES = 'UI_REPOSITION_SIDENOTES';
export const UI_RESET_ALL_SIDENOTES = 'UI_RESET_ALL_SIDENOTES';

export type Sidenote = {
  id: string;
  baseAnchors: string[];
  inlineAnchors: string[];
  top: number;
  visible: boolean;
};

export type Anchor = {
  id: string;
  sidenote: typeof ANCHOR_BASE | string;
  element?: HTMLElement;
};

export type UIState = {
  padding: number;
  docId: string;
  selectedSidenote: string | null;
  selectedAnchor: string | null;
  sidenotes: Record<string, Sidenote>;
  anchors: Record<string, Anchor>;
};

export interface ConnectSidenoteAction {
  type: typeof UI_CONNECT_SIDENOTE;
  payload: { sidenoteId: string; baseId?: string };
}

export interface DisconnectAnchorAction {
  type: typeof UI_DISCONNECT_ANCHOR;
  payload: { anchorId: string };
}

export interface ResetAllSidenotesAction {
  type: typeof UI_RESET_ALL_SIDENOTES;
  payload: Record<string, never>;
}

export interface ConnectAnchorAction {
  type: typeof UI_CONNECT_ANCHOR;
  payload: { sidenoteId: string; anchorId: string; element?: HTMLElement };
}

export interface ConnectAnchorBaseAction {
  type: typeof UI_CONNECT_ANCHOR_BASE;
  payload: { anchorId: string; element: HTMLElement };
}

export interface DisconnectSidenoteAction {
  type: typeof UI_DISCONNECT_SIDENOTE;
  payload: { sidenoteId: string };
}

export interface SelectSidenoteAction {
  type: typeof UI_SELECT_SIDENOTE;
  payload: { sidenoteId: string };
}

export interface SelectAnchorAction {
  type: typeof UI_SELECT_ANCHOR;
  payload: { anchorId: string };
}

export interface DeselectSidenoteAction {
  type: typeof UI_DESELECT_SIDENOTE;
  payload: Record<string, never>;
}

export interface RepositionSidenotesAction {
  type: typeof UI_REPOSITION_SIDENOTES;
  payload: Record<string, never>;
}

export type UIActionTypes =
  | ConnectSidenoteAction
  | DisconnectSidenoteAction
  | ConnectAnchorAction
  | ConnectAnchorBaseAction
  | DisconnectAnchorAction
  | SelectSidenoteAction
  | SelectAnchorAction
  | DeselectSidenoteAction
  | RepositionSidenotesAction
  | ResetAllSidenotesAction;
