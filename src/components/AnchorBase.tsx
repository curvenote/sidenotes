import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { connectAnchorBase, disconnectAnchorBase } from '../store/ui/actions';
import { isSidenoteSelected } from '../store/ui/selectors';
import { Dispatch, State } from '../store';
import { observer, unObserver } from '../resizeObserver';
import { getDoc } from './utils';

/**
 * AnchorBase Props
 */
type Props = {
  anchor: string;
  className?: string;
  children: React.ReactNode;
};

export const AnchorBase = (props: Props) => {
  const { anchor, children, className } = props;
  const dispatch = useDispatch<Dispatch>();
  const [doc, setDoc] = useState<string>();
  const onRef = useRef(null);

  const selected = useSelector((state: State) => isSidenoteSelected(state, doc, anchor));
  useEffect(() => {
    const el = onRef.current;
    const parentDoc = getDoc(el);
    observer(el, parentDoc);
    if (parentDoc && el) {
      setDoc(parentDoc);
      dispatch(connectAnchorBase(parentDoc, anchor, el));
    }
    return () => {
      unObserver(el, parentDoc);
      dispatch(disconnectAnchorBase(parentDoc, anchor));
    };
  }, []);
  const classes = classNames({
    selected,
    [className ?? '']: Boolean(className),
  });
  return (
    <div className={classes} ref={onRef}>
      {children}
    </div>
  );
};

AnchorBase.defaultProps = {
  className: undefined,
};

export default AnchorBase;
