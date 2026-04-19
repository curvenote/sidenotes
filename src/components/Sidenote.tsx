import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { connectSidenote, disconnectSidenote, selectSidenote } from '../store/ui/actions';
import { sidenoteTop, isSidenoteSelected } from '../store/ui/selectors';
import { useSidenotesDispatch, useSidenotesSelector } from '../context';

type Props = {
  base?: string;
  sidenote: string;
  children: React.ReactNode;
  className?: string;
};

export const Sidenote = ({ base, sidenote, children, className }: Props) => {
  const dispatch = useSidenotesDispatch();

  const selected = useSidenotesSelector((state) => isSidenoteSelected(state, sidenote));
  const top = useSidenotesSelector((state) => sidenoteTop(state, sidenote));

  useEffect(() => {
    dispatch(connectSidenote(sidenote, base));
    return () => {
      dispatch(disconnectSidenote(sidenote));
    };
  }, [dispatch, sidenote, base]);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      if (selected) return;
      dispatch(selectSidenote(sidenote));
    },
    [selected, dispatch, sidenote],
  );

  return (
    <div
      id={sidenote}
      className={classNames(
        'sidenote absolute w-[280px] left-[10px] transition-all duration-300 ease-[cubic-bezier(0.655,0.18,0.3,1.255)]',
        { '!-left-[10px] opacity-100 z-10': selected },
        className,
      )}
      onClick={onClick}
      style={{ top }}
    >
      {children}
    </div>
  );
};

export default Sidenote;
