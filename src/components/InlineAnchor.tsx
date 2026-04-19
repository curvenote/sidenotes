import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { connectAnchor, disconnectAnchor, selectAnchor } from '../store/ui/actions';
import { isSidenoteSelected } from '../store/ui/selectors';
import { useSidenotesDispatch, useSidenotesSelector } from '../context';

type Props = {
  sidenote: string;
  className?: string;
  children: React.ReactNode;
};

export const InlineAnchor = ({ sidenote, children, className }: Props) => {
  const dispatch = useSidenotesDispatch();
  const [ref, setRef] = useState<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (ref == null) return;
    dispatch(connectAnchor(sidenote, ref));
    return () => {
      const action = disconnectAnchor(ref);
      if (action) dispatch(action);
    };
  }, [ref, dispatch, sidenote]);

  const selected = useSidenotesSelector((state) => isSidenoteSelected(state, sidenote));

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      event.stopPropagation();
      if (!ref) return;
      const action = selectAnchor(ref);
      if (action) dispatch(action);
    },
    [ref, dispatch],
  );

  return (
    <span
      className={classNames(
        'anchor bg-[var(--sidenoteAnchorColor,#f8e4b1)] hover:bg-[var(--sidenoteAnchorColorHover,#f7cf69b6)] cursor-pointer',
        { 'bg-[var(--sidenoteAnchorColorSelected,#f5c955)]': selected },
        className,
      )}
      onClick={onClick}
      ref={setRef}
    >
      {children}
    </span>
  );
};

export default InlineAnchor;
