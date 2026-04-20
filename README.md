# sidenotes

[![sidenotes on npm](https://img.shields.io/npm/v/sidenotes.svg)](https://www.npmjs.com/package/sidenotes)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/curvenote/sidenotes/main/LICENSE)
![CI](https://github.com/curvenote/sidenotes/workflows/CI/badge.svg)
[![demo](https://img.shields.io/badge/live-demo-blue)](https://curvenote.github.io/sidenotes/)

**Position floating sidenotes/comments next to a document with inline references.**

## Goals

- Place notes/comments to the side of a document with inline references.
- When an inline reference is clicked, animate the relevant sidenote to be as close as possible and move non-relevant sidenotes out of the way without overlapping.
- Do not provide UI or impose any styling, **only placement**.

## Use cases

- Comment streams next to a document. This is showing [Curvenote](https://curvenote.com), which is a scientific writing platform that connects to Jupyter.
  [![Comments Using Sidenotes](https://github.com/curvenote/sidenotes/raw/main/images/comments.gif)](https://curvenote.com)

## Stack

- React 18/19 with `useReducer` + Context (no Redux dependency)
- TypeScript 6
- Vite 8 for the demo, `tsc` for the library
- Bun as the package manager

## Demo

See [`demo/index.tsx`](/demo/index.tsx) for the full example.

```bash
bun install
bun run dev
```

![sidenotes](https://github.com/curvenote/sidenotes/raw/main/images/sidenotes.gif)

## Getting started

```bash
bun add sidenotes
# or: npm install sidenotes
```

## Usage

Wrap the content that contains sidenotes in a `<SidenotesProvider>`. Put inline references inside `<InlineAnchor>` and the floating sidenote cards inside `<Sidenote>`. `<AnchorBase>` is an optional fallback target used when no inline anchor is mounted.

```tsx
import {
  SidenotesProvider,
  Sidenote,
  InlineAnchor,
  AnchorBase,
  useSidenotes,
} from 'sidenotes';

function Doc() {
  const { deselect } = useSidenotes();
  return (
    <article onClick={deselect}>
      <AnchorBase anchor="anchor">
        Content with <InlineAnchor sidenote="note-1">an inline reference</InlineAnchor>.
      </AnchorBase>
      <div className="sidenotes">
        <Sidenote sidenote="note-1" base="anchor">
          Your custom UI, e.g. a comment.
        </Sidenote>
      </div>
    </article>
  );
}

export default function App() {
  return (
    <SidenotesProvider padding={10}>
      <Doc />
    </SidenotesProvider>
  );
}
```

### The `useSidenotes()` hook

`useSidenotes()` is the public surface for interacting with sidenotes imperatively. It is backed by a stable control context and **does not re-render when the selection changes** — read the current selection by calling the getter functions.

```ts
const {
  getSelectedSidenote, // () => string | null
  getSelectedAnchor,   // () => string | null
  selectSidenote,      // (sidenoteId: string) => void
  selectAnchor,        // (anchor: string | HTMLElement) => void
  deselect,            // () => void
  reposition,          // () => void — recompute positions (e.g. after layout change)
} = useSidenotes();
```

If you need to re-render a component when the selection changes, read the state directly from context — the getters are intentionally decoupled from React's re-render loop.

Everything else (reducer, action creators, selectors, dispatch) is internal.

### Styling

The library **does not ship any CSS**. Components render with stable class names so you can style them however you want:

| Component      | Element / class                                |
| -------------- | ---------------------------------------------- |
| `InlineAnchor` | `<span class="anchor [selected]">`             |
| `AnchorBase`   | `<div class="[selected]">`                     |
| `Sidenote`     | `<div class="sidenote [selected]">`            |
| Container     | whatever wraps your `<Sidenote>` list (e.g. `<div className="sidenotes">`) |

The demo's [`demo/index.css`](/demo/index.css) has a full working Tailwind v4 setup you can copy as a starting point.

## Constraints

- Sidenotes positioning is computed relative to a wrapping `<article>` element.
- Each `<SidenotesProvider>` owns one document. Use multiple providers if you need more than one.
- `InlineAnchor` renders a `<span>`; `AnchorBase` renders a `<div>`; `Sidenote` renders a `<div>`.

## Development

```bash
bun install
bun run dev           # demo with HMR at http://localhost:3013
bun run build         # type-check + emit library to dist/
bun run build:demo    # build the demo site to dist-demo/
bun run typecheck
bun run lint
bun run format
bun run render-check  # build the demo and assert React output in happy-dom
```

## Roadmap

- Better mobile layout that places notes at the bottom.
