import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import type {
  Store as RStore,
  Action,
  Middleware as RMiddleware,
  Reducer as RReducer,
} from 'redux';
import { UIState, UIActionTypes } from './ui/types';

export interface State {
  sidenotes: {
    ui: UIState;
  };
}

export type SidenotesUIActions = UIActionTypes;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, State, null, Action<string>>;
export type Dispatch = ThunkDispatch<State, null, Action<string>>;
export type Store = RStore<State, SidenotesUIActions> & { dispatch: Dispatch };
export type Middleware = RMiddleware<any, State, Dispatch>;
export type Reducer = RReducer<State, SidenotesUIActions>;
