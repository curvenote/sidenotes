import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  connectSidenote,
  disconnectSidenote,
  selectSidenote,
  updateSidenotesOffsetHeight,
} from '../store/ui/actions';
import { sidenoteTop, isSidenoteSelected } from '../store/ui/selectors';
import { Dispatch, State } from '../store';
import { observer, unObserver } from '../resizeObserver';
import { getDoc } from './utils';

type Props = {
  base?: string;
  sidenote: string;
  children: React.ReactNode;
};

export const Sidenote = (props: Props) => {
  const { base, sidenote, children } = props;
  const dispatch = useDispatch<Dispatch>();
  const [isInit, setInit] = useState(true);
  const [doc, setDoc] = useState<string>();
  const onRef = useRef(null);

  const selected = useSelector((state: State) => isSidenoteSelected(state, doc, sidenote));
  const top = useSelector((state: State) => sidenoteTop(state, doc, sidenote));
  const onClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      if (selected) return;
      dispatch(selectSidenote(doc, sidenote));
    },
    [doc, selected],
  );

  useEffect(() => {
    const el: any = onRef.current;
    setInit(false);
    if (el?.id) {
      observer(el, doc, el.id);
      dispatch(connectSidenote(doc, sidenote, base));
    }
    return () => {
      unObserver(el, doc);
      if (doc) updateSidenotesOffsetHeight(doc, sidenote);
      dispatch(disconnectSidenote(doc, sidenote));
    };
  }, [doc, onRef.current]);

  useEffect(() => {
    const el = onRef.current;
    const parentDoc = getDoc(el);
    if (parentDoc && el) {
      setDoc(parentDoc);
    }
  }, [sidenote]);

  return (top !== null && top !== undefined) || isInit ? (
    <div
      id={sidenote}
      className={classNames('sidenote', { selected })}
      onClick={onClick}
      ref={onRef}
      style={{ top: top ?? 0 }}
    >
      {children}
    </div>
  ) : null;
};

Sidenote.defaultProps = {
  base: undefined,
};

export default Sidenote;
