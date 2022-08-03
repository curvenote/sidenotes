"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidenote = void 0;
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const classnames_1 = __importDefault(require("classnames"));
const actions_1 = require("../store/ui/actions");
const selectors_1 = require("../store/ui/selectors");
const utils_1 = require("./utils");
const Sidenote = (props) => {
    const { base, sidenote, children } = props;
    const dispatch = (0, react_redux_1.useDispatch)();
    const [doc, setDoc] = (0, react_1.useState)();
    const selected = (0, react_redux_1.useSelector)((state) => (0, selectors_1.isSidenoteSelected)(state, doc, sidenote));
    const top = (0, react_redux_1.useSelector)((state) => (0, selectors_1.sidenoteTop)(state, doc, sidenote));
    const onClick = (0, react_1.useCallback)((event) => {
        event.stopPropagation();
        if (selected)
            return;
        dispatch((0, actions_1.selectSidenote)(doc, sidenote));
    }, [doc, selected]);
    const onRef = (0, react_1.useCallback)((el) => {
        const parentDoc = (0, utils_1.getDoc)(el);
        if (parentDoc) {
            setDoc(parentDoc);
            dispatch((0, actions_1.connectSidenote)(parentDoc, sidenote, base));
        }
    }, []);
    return (react_1.default.createElement("div", { id: sidenote, className: (0, classnames_1.default)('sidenote', { selected }), onClick: onClick, ref: onRef, style: { top } }, children));
};
exports.Sidenote = Sidenote;
exports.Sidenote.defaultProps = {
    base: undefined,
};
exports.default = exports.Sidenote;
//# sourceMappingURL=Sidenote.js.map