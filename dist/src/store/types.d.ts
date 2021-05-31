import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Store as RStore, Action, Middleware as RMiddleware, Reducer as RReducer } from 'redux';
import { UIState, UIActionTypes } from './ui/types';
export interface State {
    sidenotes: {
        ui: UIState;
    };
}
export declare type SidenotesUIActions = (UIActionTypes);
export declare type AppThunk<ReturnType = void> = ThunkAction<ReturnType, State, null, Action<string>>;
export declare type Dispatch = ThunkDispatch<State, null, Action<string>>;
export declare type Store = RStore<State, SidenotesUIActions> & {
    dispatch: Dispatch;
};
export declare type Middleware = RMiddleware<any, State, Dispatch>;
export declare type Reducer = RReducer<State, SidenotesUIActions>;
