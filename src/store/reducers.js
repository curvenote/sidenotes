"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const reducers_1 = __importDefault(require("./ui/reducers"));
const reducer = (0, redux_1.combineReducers)({
    ui: reducers_1.default,
});
exports.default = reducer;
//# sourceMappingURL=reducers.js.map