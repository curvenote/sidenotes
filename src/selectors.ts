import type { State } from './types';

export function selectedSidenote(state: State) {
  return state.selectedSidenote;
}

export function isSidenoteSelected(state: State, sidenoteId?: string | null) {
  if (sidenoteId == null) return false;
  return state.selectedSidenote === sidenoteId;
}

export function sidenoteTop(state: State, sidenoteId?: string | null) {
  if (sidenoteId == null) return 0;
  return state.sidenotes[sidenoteId]?.top ?? 0;
}

export function isAnchorSelected(state: State, anchorId?: string | null) {
  if (anchorId == null) return false;
  return state.selectedAnchor === anchorId;
}
