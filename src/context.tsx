import React, { createContext, useCallback, useContext, useMemo, useReducer, useRef } from 'react';
import uiReducer, { createInitialState } from './store/ui/reducer';
import type { Dispatch, SidenotesUIActions, State } from './store/types';

type SidenotesContextValue = {
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
  const [state, baseDispatch] = useReducer(uiReducer, undefined, () => createInitialState(padding));

  const stateRef = useRef(state);
  stateRef.current = state;
  const getState = useCallback(() => stateRef.current, []);

  const dispatch = useCallback<Dispatch>((action: SidenotesUIActions) => {
    baseDispatch(action);
  }, []);

  const value = useMemo(() => ({ state, dispatch, getState }), [state, dispatch, getState]);

  return <SidenotesContext.Provider value={value}>{children}</SidenotesContext.Provider>;
};

function useSidenotesContext(): SidenotesContextValue {
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

export function useSidenotesStore(): { getState: () => State; dispatch: Dispatch } {
  const { dispatch, getState } = useSidenotesContext();
  return { dispatch, getState };
}
