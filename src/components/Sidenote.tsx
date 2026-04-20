import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { connectSidenote, disconnectSidenote, selectSidenote } from '../actions';
import { sidenoteTop, isSidenoteSelected } from '../selectors';
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
      className={classNames('sidenote', { selected }, className)}
      onClick={onClick}
      style={{ top }}
    >
      {children}
    </div>
  );
};

export default Sidenote;
