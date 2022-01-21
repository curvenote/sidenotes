/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { setup, Store, actions } from '../src';
import rootReducer from './reducers';
import '../styles/index.scss';
import './index.scss';
import { App } from './App';

declare global {
  interface Window {
    [index: string]: any;
  }
}

const store: Store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
window.store = store;
setup(store, { padding: 10 });

const docId = 'doc-123';
const baseAnchor = 'mike';

const deselect = () => store.dispatch(actions.deselectSidenote(docId));

window.repostion = () => {
  store.dispatch(actions.repositionSidenotes(docId));
};
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <article id={docId} onClick={deselect}>
        <h1>sidenotes</h1>
        <button type="button" onClick={deselect}>
          Deselect Sidenotes
        </button>
        <App baseAnchor={baseAnchor} store={store} docId={docId} />
      </article>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
