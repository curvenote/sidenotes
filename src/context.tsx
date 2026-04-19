import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useCallback,
  useId,
} from 'react';
import uiReducer, { createInitialState } from './store/ui/reducer';
import type { State, Dispatch, SidenotesUIActions } from './store/types';

type SidenotesContextValue = {
  state: State;
  dispatch: Dispatch;
  getState: () => State;
  docId: string;
};

const SidenotesContext = createContext<SidenotesContextValue | null>(null);

export type SidenotesProviderProps = {
  docId?: string;
  padding?: number;
  children: React.ReactNode;
};

export const SidenotesProvider = ({
  docId: docIdProp,
  padding = 10,
  children,
}: SidenotesProviderProps) => {
  const autoId = useId();
  const docId = docIdProp ?? autoId;

  const [state, baseDispatch] = useReducer(
    uiReducer,
    undefined,
    () => createInitialState(docId, padding),
  );

  const stateRef = useRef(state);
  stateRef.current = state;
  const getState = useCallback(() => stateRef.current, []);

  const dispatch = useCallback<Dispatch>((action: SidenotesUIActions) => {
    baseDispatch(action);
  }, []);

  const value = useMemo(
    () => ({ state, dispatch, getState, docId }),
    [state, dispatch, getState, docId],
  );

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

export function useSidenotesDocId(): string {
  return useSidenotesContext().docId;
}

export function useSidenotesStore(): {
  getState: () => State;
  dispatch: Dispatch;
  docId: string;
} {
  const { dispatch, getState, docId } = useSidenotesContext();
  return { dispatch, getState, docId };
}
