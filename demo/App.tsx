/* eslint-disable  */
import React, { useEffect, useState } from 'react';
import { Sidenote, InlineAnchor, AnchorBase, actions } from '../src';

const blue = 'blue';
const red = 'red';
const green = 'green';
const someId = 'some_id';

export function App(props: any) {
  const { baseAnchor, store, docId } = props;
  const [showGreen, setShowGreen] = useState(true);
  const [showRed, setShowRed] = useState(true);
  useEffect(() => {
    store.dispatch(actions.connectAnchor(docId, blue, someId));
  }, []);
  return (
    <>
      <br/>
      <button className='green' onClick={() => setShowGreen(!showGreen)}>toggle green word</button>
      <br/>
      <button className='red' onClick={() => setShowRed(!showRed)}>toggle a red word</button>
      <br/>
      <AnchorBase anchor={baseAnchor} className="greenBase">
        <div contentEditable>
          <p>
            <InlineAnchor sidenote={blue} className="blue">
              A sidenote
            </InlineAnchor>{' '}
            and{' '}
            <InlineAnchor sidenote={red} className="red">
              another red sidenote!
            </InlineAnchor>
          </p>
          <ul>
            <li>
              Must see all the{' '}
              {
                showRed && 
                <InlineAnchor sidenote={red} className="red">
                  sidenotes
                </InlineAnchor>
              }{' '}
              at once, so they should be in the margins!
            </li>
            <li>
              {showGreen && (
                <InlineAnchor sidenote={green} className="green">
                  Must
                </InlineAnchor>
              )}
              be associated with a block (a small bit of content), that is versioned and must point
              to content inside of that block.
            </li>
          </ul>
          <p>
            The sidenotes location{' '}
            <InlineAnchor sidenote={blue} className="blue">
              information
            </InlineAnchor>{' '}
            is a stand alone package. For example, the reducer should be based on the ID of the
            sidenote that can get triggered (or not).
          </p>
          <p>
            Has a{' '}
            <InlineAnchor sidenote={red} className="red">
              mini{' '}
            </InlineAnchor>
            <InlineAnchor sidenote={[blue, showRed ? red : ''].filter(Boolean)} className={showRed ? 'custom' : 'blue'}>
              reducer
            </InlineAnchor>
            <InlineAnchor sidenote={blue} className="blue">
              {' '}in
            </InlineAnchor>
            {' '}there to keep internal state There needs to be one for each sidenote list, and one
            per doc/article. Positions things based on height of each{' '}
            <InlineAnchor sidenote={blue} className="blue">
              sidenotes
            </InlineAnchor>
            , and a list of ids in the document. These ids are used to look up position and place
            the position of the sidenotes based on a relative container that is along side the doc.
            Visible Selected The sidenotes dont have to reposition unless one is selected. Each time
            do a sweep of the doc and reposition the elements. The animation can be handled by CSS.
          </p>
          <p>
            <InlineAnchor sidenote={red} className="red">
              Next sidenote!
            </InlineAnchor>
          </p>
          <p>
            <InlineAnchor sidenote={red} className="red">
              sidenotes
            </InlineAnchor>
          </p>
          <p>
            <span
              id={someId}
              onClickCapture={(event) => {
                event.stopPropagation();
                store.dispatch(actions.selectAnchor(docId, someId));
              }}
              className="blue"
            >
              You can also create usng plain js if you want.
            </span>
          </p>
        </div>
      </AnchorBase>
      <div className="sidenotes">
        <Sidenote sidenote={blue} base={baseAnchor}>
          <div style={{ width: 280, height: 140, backgroundColor: 'blue' }} />
        </Sidenote>
        <Sidenote sidenote={red} base={baseAnchor}>
          <div style={{ width: 280, height: 100, backgroundColor: 'red' }} />
        </Sidenote>
        <Sidenote sidenote={green} >
          <div style={{ width: 280, height: 100, backgroundColor: 'green' }}>
            Attached to sidenote base.
          </div>
        </Sidenote>
      </div>
    </>
  );
}
