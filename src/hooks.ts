import { useCallback, useMemo } from 'react';
import { useSidenotesContext } from './context';
import { deselectSidenote, repositionSidenotes, selectAnchor, selectSidenote } from './actions';

export type UseSidenotes = {
  selectedSidenote: string | null;
  selectedAnchor: string | null;
  selectSidenote: (sidenoteId: string) => void;
  selectAnchor: (anchor: string | HTMLElement) => void;
  deselect: () => void;
  reposition: () => void;
};

export function useSidenotes(): UseSidenotes {
  const { state, dispatch } = useSidenotesContext();

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
      selectedSidenote: state.selectedSidenote,
      selectedAnchor: state.selectedAnchor,
      selectSidenote: selectSidenoteCb,
      selectAnchor: selectAnchorCb,
      deselect,
      reposition,
    }),
    [
      state.selectedSidenote,
      state.selectedAnchor,
      selectSidenoteCb,
      selectAnchorCb,
      deselect,
      reposition,
    ],
  );
}
