import * as actions from './ui/actions';
import * as selectors from './ui/selectors';
import uiReducer, { createInitialState } from './ui/reducer';

export * from './types';
export type {
  Sidenote as SidenoteData,
  Anchor,
  UIState,
  UIActionTypes,
} from './ui/types';
export { ANCHOR_BASE } from './ui/types';

export { uiReducer as reducer, createInitialState, actions, selectors };
