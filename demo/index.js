"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const redux_1 = require("redux");
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const react_redux_1 = require("react-redux");
const react_dom_1 = __importDefault(require("react-dom"));
const src_1 = require("../src");
const reducers_1 = __importDefault(require("./reducers"));
require("../styles/index.scss");
require("./index.scss");
const actions_1 = require("../src/store/ui/actions");
const store = (0, redux_1.createStore)(reducers_1.default, (0, redux_1.applyMiddleware)(redux_thunk_1.default));
window.store = store;
(0, src_1.setup)(store, { padding: 10 });
const docId = 'article';
const baseAnchor = 'anchor';
const blue = 'blue';
const red = 'red';
const green = 'green';
const someId = 'some_id';
const deselect = () => store.dispatch((0, actions_1.deselectSidenote)(docId));
store.dispatch(src_1.actions.connectAnchor(docId, blue, someId));
react_dom_1.default.render(react_1.default.createElement(react_redux_1.Provider, { store: store },
    react_1.default.createElement(react_1.default.StrictMode, null,
        react_1.default.createElement("article", { id: docId, onClick: deselect },
            react_1.default.createElement("h1", null, "sidenotes"),
            react_1.default.createElement("div", null,
                react_1.default.createElement("a", { href: "https://www.npmjs.com/package/sidenotes", title: "sidenotes on npm" },
                    react_1.default.createElement("img", { src: "https://img.shields.io/npm/v/sidenotes.svg" })),
                react_1.default.createElement("a", { href: "https://github.com/curvenote/sidenotes/blob/main/LICENSE", title: "MIT License" },
                    react_1.default.createElement("img", { src: "https://img.shields.io/badge/license-MIT-blue.svg" })),
                react_1.default.createElement("a", { href: "https://github.com/curvenote/sidenotes", title: "CI" },
                    react_1.default.createElement("img", { src: "https://github.com/curvenote/sidenotes/workflows/CI/badge.svg" }))),
            react_1.default.createElement("button", { type: "button", onClick: deselect }, "Deselect Sidenotes"),
            react_1.default.createElement(src_1.AnchorBase, { anchor: baseAnchor, className: "greenBase" },
                react_1.default.createElement("p", null,
                    react_1.default.createElement(src_1.InlineAnchor, { sidenote: blue, className: "blue" }, "A sidenote"),
                    ' ',
                    "and",
                    ' ',
                    react_1.default.createElement(src_1.InlineAnchor, { sidenote: red, className: "red" }, "another red sidenote!")),
                react_1.default.createElement("ul", null,
                    react_1.default.createElement("li", null,
                        "Must see all the",
                        ' ',
                        react_1.default.createElement(src_1.InlineAnchor, { sidenote: red, className: "red" }, "sidenotes"),
                        ' ',
                        "at once, so they should be in the margins!"),
                    react_1.default.createElement("li", null, "Must be associated with a block (a small bit of content), that is versioned and must point to content inside of that block.")),
                react_1.default.createElement("p", null,
                    "The sidenotes location",
                    ' ',
                    react_1.default.createElement(src_1.InlineAnchor, { sidenote: blue, className: "blue" }, "information"),
                    ' ',
                    "is a stand alone package. For example, the reducer should be based on the ID of the sidenote that can get triggered (or not)."),
                react_1.default.createElement("p", null,
                    "Has a mini reducer in there to keep internal state There needs to be one for each sidenote list, and one per doc/article. Positions things based on height of each",
                    ' ',
                    react_1.default.createElement(src_1.InlineAnchor, { sidenote: blue, className: "blue" }, "sidenotes"),
                    ", and a list of ids in the document. These ids are used to look up position and place the position of the sidenotes based on a relative container that is along side the doc. Visible Selected The sidenotes dont have to reposition unless one is selected. Each time do a sweep of the doc and reposition the elements. The animation can be handled by CSS."),
                react_1.default.createElement("p", null,
                    react_1.default.createElement(src_1.InlineAnchor, { sidenote: red, className: "red" }, "Next sidenote!")),
                react_1.default.createElement("p", null,
                    react_1.default.createElement(src_1.InlineAnchor, { sidenote: red, className: "red" }, "sidenotes")),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("span", { id: someId, onClickCapture: (event) => {
                            event.stopPropagation();
                            store.dispatch(src_1.actions.selectAnchor(docId, someId));
                        }, className: "blue" }, "You can also create usng plain js if you want."))),
            react_1.default.createElement("div", { className: "sidenotes" },
                react_1.default.createElement(src_1.Sidenote, { sidenote: blue, base: baseAnchor },
                    react_1.default.createElement("div", { style: { width: 280, height: 150, backgroundColor: 'blue' } })),
                react_1.default.createElement(src_1.Sidenote, { sidenote: red, base: baseAnchor },
                    react_1.default.createElement("div", { style: { width: 280, height: 100, backgroundColor: 'red' } })),
                react_1.default.createElement(src_1.Sidenote, { sidenote: green, base: baseAnchor },
                    react_1.default.createElement("div", { style: { width: 280, height: 100, backgroundColor: 'green' } }, "Attached to sidenote base.")))))), document.getElementById('root'));
//# sourceMappingURL=index.js.map