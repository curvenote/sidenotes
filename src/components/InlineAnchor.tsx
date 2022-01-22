import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { connectAnchor, disconnectAnchor, selectAnchor } from '../store/ui/actions';
import { isSidenoteSelected } from '../store/ui/selectors';
import { Dispatch, State } from '../store';
import { getDoc } from './utils';

type Props = {
  sidenote: string | Array<string>;
  className?: string;
  children: React.ReactNode;
};

export const InlineAnchor = (props: Props) => {
  const { sidenote, children, className } = props;
  const dispatch = useDispatch<Dispatch>();
  const [doc, setDoc] = useState<string>();
  const onRef = useRef(null);

  const selected = useSelector((state: State) => isSidenoteSelected(state, doc, sidenote));
  const onClick = useCallback(
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      event.stopPropagation();
      if (onRef.current) {
        dispatch(selectAnchor(doc, onRef.current));
      }
    },
    [doc, onRef],
  );
  useEffect(() => {
    const el = onRef.current;
    const parentDoc = getDoc(el);
    if (parentDoc && el) {
      setDoc(parentDoc);
      dispatch(connectAnchor(parentDoc, sidenote, el));
    }
    return () => dispatch(disconnectAnchor(parentDoc, el));
  }, [sidenote]);

  const classes = classNames('anchor', {
    selected,
    [className ?? '']: Boolean(className),
  });
  return (
    <span className={classes} onClick={onClick} ref={onRef}>
      {children}
    </span>
  );
};

InlineAnchor.defaultProps = {
  className: undefined,
};

export default InlineAnchor;
