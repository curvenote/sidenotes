"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const src_1 = require("../src");
const combinedReducers = (0, redux_1.combineReducers)({
    sidenotes: src_1.reducer,
});
function rootReducer(state, action) {
    console.log('New Action: ', action);
    return combinedReducers(state, action);
}
exports.default = rootReducer;
//# sourceMappingURL=reducers.js.map