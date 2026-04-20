import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import reducer, { createInitialState } from './reducer';
import type { Action, Dispatch, State } from './types';

export type SidenotesContextValue = {
  state: State;
  dispatch: Dispatch;
  getState: () => State;
};

const SidenotesContext = createContext<SidenotesContextValue | null>(null);

export type SidenotesProviderProps = {
  padding?: number;
  children: React.ReactNode;
};

export const SidenotesProvider = ({ padding = 10, children }: SidenotesProviderProps) => {
  const [state, baseDispatch] = useReducer(reducer, undefined, () => createInitialState(padding));

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);
  const getState = useCallback(() => stateRef.current, []);

  const dispatch = useCallback<Dispatch>((action: Action) => {
    baseDispatch(action);
  }, []);

  const value = useMemo(() => ({ state, dispatch, getState }), [state, dispatch, getState]);

  return <SidenotesContext.Provider value={value}>{children}</SidenotesContext.Provider>;
};

export function useSidenotesContext(): SidenotesContextValue {
  const ctx = useContext(SidenotesContext);
  if (!ctx) {
    throw new Error('Sidenotes components must be rendered inside a <SidenotesProvider>.');
  }
  return ctx;
}

export function useSidenotesState(): State {
  return useSidenotesContext().state;
}

export function useSidenotesDispatch(): Dispatch {
  return useSidenotesContext().dispatch;
}

export function useSidenotesSelector<T>(selector: (state: State) => T): T {
  return selector(useSidenotesContext().state);
}
