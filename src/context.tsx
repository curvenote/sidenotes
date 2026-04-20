import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import reducer, { createInitialState } from './reducer.js';
import type { Action, Dispatch, State } from './types.js';

type ControlValue = {
  dispatch: Dispatch;
  getState: () => State;
};

const StateContext = createContext<State | null>(null);
const ControlContext = createContext<ControlValue | null>(null);

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
  const dispatch = useCallback<Dispatch>((action: Action) => baseDispatch(action), []);

  const control = useMemo<ControlValue>(() => ({ dispatch, getState }), [dispatch, getState]);

  return (
    <ControlContext.Provider value={control}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </ControlContext.Provider>
  );
};

function useSidenotesStateContext(): State {
  const s = useContext(StateContext);
  if (s == null) {
    throw new Error('Sidenotes components must be rendered inside a <SidenotesProvider>.');
  }
  return s;
}

export function useSidenotesControl(): ControlValue {
  const c = useContext(ControlContext);
  if (!c) {
    throw new Error('Sidenotes components must be rendered inside a <SidenotesProvider>.');
  }
  return c;
}

export function useSidenotesState(): State {
  return useSidenotesStateContext();
}

export function useSidenotesDispatch(): Dispatch {
  return useSidenotesControl().dispatch;
}

export function useSidenotesSelector<T>(selector: (state: State) => T): T {
  return selector(useSidenotesStateContext());
}
