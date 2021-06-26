"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const docReducer = (state, action) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    if (state == null && action.type !== types_1.UI_RESET_ALL_SIDENOTES) {
        const { docId } = action.payload;
        state = {
            id: docId,
            selectedSidenote: null,
            selectedAnchor: null,
            sidenotes: {},
            anchors: {},
        };
    }
    switch (action.type) {
        case types_1.UI_REPOSITION_SIDENOTES:
            return state;
        case types_1.UI_CONNECT_SIDENOTE: {
            const { sidenoteId, baseId } = action.payload;
            const baseIds = baseId ? [baseId] : [];
            const prevSidenote = state.sidenotes[sidenoteId];
            return Object.assign(Object.assign({}, state), { sidenotes: Object.assign(Object.assign({}, state.sidenotes), { [sidenoteId]: Object.assign(Object.assign({}, prevSidenote), { id: sidenoteId, baseAnchors: [...baseIds, ...((_a = prevSidenote === null || prevSidenote === void 0 ? void 0 : prevSidenote.baseAnchors) !== null && _a !== void 0 ? _a : [])], inlineAnchors: [...((_b = prevSidenote === null || prevSidenote === void 0 ? void 0 : prevSidenote.inlineAnchors) !== null && _b !== void 0 ? _b : [])] }) }) });
        }
        case types_1.UI_DISCONNECT_SIDENOTE: {
            const { sidenoteId } = action.payload;
            const sidenote = state.sidenotes[sidenoteId];
            if (!sidenote)
                return state;
            const sidenotes = Object.assign({}, state.sidenotes);
            delete sidenotes[sidenote.id];
            return Object.assign(Object.assign({}, state), { sidenotes });
        }
        case types_1.UI_CONNECT_ANCHOR: {
            const { sidenoteId, anchorId, element } = action.payload;
            const prevSidenote = state.sidenotes[sidenoteId];
            return Object.assign(Object.assign({}, state), { sidenotes: Object.assign(Object.assign({}, state.sidenotes), { [sidenoteId]: Object.assign(Object.assign({}, prevSidenote), { inlineAnchors: [anchorId, ...((_c = prevSidenote === null || prevSidenote === void 0 ? void 0 : prevSidenote.inlineAnchors) !== null && _c !== void 0 ? _c : [])] }) }), anchors: Object.assign(Object.assign({}, state.anchors), { [anchorId]: {
                        id: anchorId,
                        sidenote: sidenoteId,
                        element,
                    } }) });
        }
        case types_1.UI_CONNECT_ANCHOR_BASE: {
            const { anchorId, element } = action.payload;
            return Object.assign(Object.assign({}, state), { anchors: Object.assign(Object.assign({}, state.anchors), { [anchorId]: {
                        id: anchorId,
                        sidenote: types_1.ANCHOR_BASE,
                        element,
                    } }) });
        }
        case types_1.UI_DISCONNECT_ANCHOR: {
            const { anchorId } = action.payload;
            const anchor = state.anchors[anchorId];
            if (!anchor)
                return state;
            const anchors = Object.assign({}, state.anchors);
            delete anchors[anchor.id];
            const sidenote = state.sidenotes[anchor.sidenote];
            return Object.assign(Object.assign({}, state), { sidenotes: Object.assign(Object.assign({}, state.sidenotes), { [anchor.sidenote]: Object.assign(Object.assign({}, sidenote), { inlineAnchors: [...((_d = sidenote === null || sidenote === void 0 ? void 0 : sidenote.inlineAnchors) !== null && _d !== void 0 ? _d : [])].filter((a) => a !== anchorId) }) }), anchors });
        }
        case types_1.UI_SELECT_SIDENOTE: {
            const { sidenoteId } = action.payload;
            const prevSidenote = state.sidenotes[sidenoteId];
            return Object.assign(Object.assign({}, state), { selectedSidenote: sidenoteId, selectedAnchor: (_h = (_f = (_e = prevSidenote === null || prevSidenote === void 0 ? void 0 : prevSidenote.inlineAnchors) === null || _e === void 0 ? void 0 : _e[0]) !== null && _f !== void 0 ? _f : (_g = prevSidenote === null || prevSidenote === void 0 ? void 0 : prevSidenote.baseAnchors) === null || _g === void 0 ? void 0 : _g[0]) !== null && _h !== void 0 ? _h : null, sidenotes: Object.assign(Object.assign({}, state.sidenotes), { [sidenoteId]: Object.assign(Object.assign({}, prevSidenote), { id: sidenoteId, baseAnchors: [...((_j = prevSidenote === null || prevSidenote === void 0 ? void 0 : prevSidenote.baseAnchors) !== null && _j !== void 0 ? _j : [])], inlineAnchors: [...((_k = prevSidenote === null || prevSidenote === void 0 ? void 0 : prevSidenote.inlineAnchors) !== null && _k !== void 0 ? _k : [])] }) }) });
        }
        case types_1.UI_SELECT_ANCHOR: {
            const { anchorId } = action.payload;
            const anchor = state.anchors[anchorId];
            if (!anchor)
                return state;
            const sidenote = state.sidenotes[anchor.sidenote];
            const anchors = [
                anchorId,
                ...[...((_l = sidenote === null || sidenote === void 0 ? void 0 : sidenote.inlineAnchors) !== null && _l !== void 0 ? _l : [])].filter((a) => a !== anchorId),
            ];
            return Object.assign(Object.assign({}, state), { sidenotes: Object.assign(Object.assign({}, state.sidenotes), { [anchor.sidenote]: Object.assign(Object.assign({}, sidenote), { inlineAnchors: anchors }) }), selectedAnchor: anchorId, selectedSidenote: anchor.sidenote });
        }
        case types_1.UI_DESELECT_SIDENOTE: {
            return Object.assign(Object.assign({}, state), { selectedAnchor: null, selectedSidenote: null });
        }
        default:
            return state;
    }
};
exports.default = docReducer;
//# sourceMappingURL=docReducer.js.map