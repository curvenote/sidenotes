import type { Dispatch as ReactDispatch } from 'react';
import type { UIState, UIActionTypes } from './ui/types';

export type State = UIState;

export type SidenotesUIActions = UIActionTypes;

export type Dispatch = ReactDispatch<SidenotesUIActions>;
