import { useCallback, useMemo } from 'react';
import { useSidenotesControl } from './context.js';
import { deselectSidenote, repositionSidenotes, selectAnchor, selectSidenote } from './actions.js';

export type UseSidenotes = {
  getSelectedSidenote: () => string | null;
  getSelectedAnchor: () => string | null;
  selectSidenote: (sidenoteId: string) => void;
  selectAnchor: (anchor: string | HTMLElement) => void;
  deselect: () => void;
  reposition: () => void;
};

export function useSidenotes(): UseSidenotes {
  const { dispatch, getState } = useSidenotesControl();

  const getSelectedSidenote = useCallback(() => getState().selectedSidenote, [getState]);
  const getSelectedAnchor = useCallback(() => getState().selectedAnchor, [getState]);

  const selectSidenoteCb = useCallback(
    (sidenoteId: string) => dispatch(selectSidenote(sidenoteId)),
    [dispatch],
  );

  const selectAnchorCb = useCallback(
    (anchor: string | HTMLElement) => {
      const action = selectAnchor(anchor);
      if (action) dispatch(action);
    },
    [dispatch],
  );

  const deselect = useCallback(() => dispatch(deselectSidenote()), [dispatch]);
  const reposition = useCallback(() => dispatch(repositionSidenotes()), [dispatch]);

  return useMemo(
    () => ({
      getSelectedSidenote,
      getSelectedAnchor,
      selectSidenote: selectSidenoteCb,
      selectAnchor: selectAnchorCb,
      deselect,
      reposition,
    }),
    [
      getSelectedSidenote,
      getSelectedAnchor,
      selectSidenoteCb,
      selectAnchorCb,
      deselect,
      reposition,
    ],
  );
}
