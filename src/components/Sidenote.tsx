import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { connectSidenote, selectSidenote } from '../store/ui/actions';
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
  const [dom, setDom] = useState<HTMLDivElement | null>(null);

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

  const onRef = useCallback((el: HTMLDivElement) => {
    const parentDoc = getDoc(el);
    setDom(el);
    if (parentDoc && el) {
      setDoc(parentDoc);
      dispatch(connectSidenote(parentDoc, sidenote, base));
      observer(el, parentDoc);
    }
    setInit(false);
  }, []);

  useEffect(() => {
    return () => {
      if (dom) {
        unObserver(dom, doc);
      }
    };
  }, [dom, doc]);

  return (
    ((top !== null && top !== undefined) || isInit) && (
      <div
        id={sidenote}
        className={classNames('sidenote', { selected })}
        onClick={onClick}
        ref={onRef}
        style={{ top: top ?? 0 }}
      >
        {children}
      </div>
    )
  );
};

Sidenote.defaultProps = {
  base: undefined,
};

export default Sidenote;
