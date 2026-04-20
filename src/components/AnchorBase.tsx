import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { connectAnchorBase, disconnectAnchor } from '../actions.js';
import { isSidenoteSelected } from '../selectors.js';
import { useSidenotesDispatch, useSidenotesSelector } from '../context.js';

type Props = {
  anchor: string;
  className?: string;
  children: React.ReactNode;
};

export const AnchorBase = ({ anchor, children, className }: Props) => {
  const dispatch = useSidenotesDispatch();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const selected = useSidenotesSelector((state) => isSidenoteSelected(state, anchor));

  useEffect(() => {
    if (!ref) return;
    dispatch(connectAnchorBase(anchor, ref));
    return () => {
      const action = disconnectAnchor(anchor);
      if (action) dispatch(action);
    };
  }, [ref, dispatch, anchor]);

  return (
    <div className={classNames({ selected }, className)} ref={setRef}>
      {children}
    </div>
  );
};

export default AnchorBase;
