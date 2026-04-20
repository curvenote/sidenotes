import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  SidenotesProvider,
  Sidenote,
  InlineAnchor,
  AnchorBase,
  useSidenotes,
} from '../src/index.js';
import './index.css';

const baseAnchor = 'anchor';
const blue = 'blue';
const red = 'red';
const green = 'green';

function Demo() {
  const { deselect } = useSidenotes();

  return (
    <article onClick={deselect}>
      <h1 className="text-3xl font-bold">sidenotes</h1>
      <div className="flex gap-2">
        <a href="https://www.npmjs.com/package/sidenotes" title="sidenotes on npm">
          <img alt="npm" src="https://img.shields.io/npm/v/sidenotes.svg" />
        </a>
        <a href="https://github.com/curvenote/sidenotes/blob/main/LICENSE" title="MIT License">
          <img alt="license" src="https://img.shields.io/badge/license-MIT-blue.svg" />
        </a>
      </div>
      <button
        type="button"
        onClick={deselect}
        className="my-2 rounded border px-3 py-1 hover:bg-gray-100"
      >
        Deselect Sidenotes
      </button>
      <AnchorBase anchor={baseAnchor} className="p-[10px] border-[3px] border-green-600">
        <p>
          <InlineAnchor sidenote={blue} className="text-blue-600">
            A sidenote
          </InlineAnchor>{' '}
          and{' '}
          <InlineAnchor sidenote={red} className="text-red-600">
            another red sidenote!
          </InlineAnchor>
        </p>
        <ul className="list-disc pl-6">
          <li>
            Must see all the{' '}
            <InlineAnchor sidenote={red} className="text-red-600">
              sidenotes
            </InlineAnchor>{' '}
            at once, so they should be in the margins!
          </li>
          <li>
            Must be associated with a block (a small bit of content), that is versioned and must
            point to content inside of that block.
          </li>
        </ul>
        <p>
          The sidenotes location{' '}
          <InlineAnchor sidenote={blue} className="text-blue-600">
            information
          </InlineAnchor>{' '}
          is a stand alone package.
        </p>
        <p>
          Has a mini reducer in there to keep internal state. Positions things based on height of
          each{' '}
          <InlineAnchor sidenote={blue} className="text-blue-600">
            sidenote
          </InlineAnchor>
          . The animation can be handled by CSS.
        </p>
        <p>
          <InlineAnchor sidenote={red} className="text-red-600">
            Next sidenote!
          </InlineAnchor>
        </p>
      </AnchorBase>
      <div className="sidenotes">
        <Sidenote sidenote={blue} base={baseAnchor}>
          <div className="w-[280px] h-[150px] bg-blue-600" />
        </Sidenote>
        <Sidenote sidenote={red} base={baseAnchor}>
          <div className="w-[280px] h-[100px] bg-red-600" />
        </Sidenote>
        <Sidenote sidenote={green} base={baseAnchor}>
          <div className="w-[280px] h-[100px] bg-green-600 text-white p-2">
            Attached to sidenote base.
          </div>
        </Sidenote>
      </div>
    </article>
  );
}

const container = document.getElementById('root');
if (!container) throw new Error('Missing #root');

createRoot(container).render(
  <React.StrictMode>
    <SidenotesProvider padding={10}>
      <Demo />
    </SidenotesProvider>
  </React.StrictMode>,
);
