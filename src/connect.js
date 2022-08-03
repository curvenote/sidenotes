"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opts = exports.store = exports.setup = exports.ref = void 0;
const uuid_1 = require("uuid");
exports.ref = {
    store() {
        if (exports.ref._store === undefined)
            throw new Error('Must init store.');
        return exports.ref._store;
    },
    opts() {
        if (exports.ref._opts === undefined)
            throw new Error('Must init opts.');
        return exports.ref._opts;
    },
};
const subscriptions = {};
function subscribe(listener) {
    const key = (0, uuid_1.v4)();
    subscriptions[key] = { listener };
    return () => delete subscriptions[key];
}
let currentState;
function notify(store) {
    const previousState = currentState;
    currentState = store.getState().sidenotes;
    if (previousState === currentState)
        return;
    Object.keys(subscriptions).forEach((key) => {
        const { listener } = subscriptions[key];
        listener();
    });
}
function setup(store, opts) {
    exports.ref._store = store;
    exports.ref._opts = opts;
    store.subscribe(() => notify(store));
}
exports.setup = setup;
exports.store = {
    getState: () => exports.ref.store().getState(),
    dispatch: (action) => exports.ref.store().dispatch(action),
    subscribe: (listener) => subscribe(listener),
};
exports.opts = {
    get padding() {
        var _a;
        return (_a = exports.ref.opts().padding) !== null && _a !== void 0 ? _a : 10;
    },
};
//# sourceMappingURL=connect.js.map