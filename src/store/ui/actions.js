"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositionSidenotes = exports.deselectSidenote = exports.disconnectAnchor = exports.disconnectSidenote = exports.selectAnchor = exports.selectSidenote = exports.updateSidenote = exports.connectAnchorBase = exports.connectAnchor = exports.connectSidenote = void 0;
const uuid_1 = require("uuid");
const types_1 = require("./types");
function connectSidenote(docId, sidenoteId, baseId) {
    return (dispatch) => {
        if (docId == null || sidenoteId == null)
            return;
        dispatch({
            type: types_1.UI_CONNECT_SIDENOTE,
            payload: { docId, sidenoteId, baseId },
        });
    };
}
exports.connectSidenote = connectSidenote;
function connectAnchor(docId, sidenoteId, element) {
    return (dispatch) => {
        if (docId == null || sidenoteId == null || element == null)
            return;
        const anchorId = uuid_1.v4();
        element.anchorId = anchorId;
        dispatch({
            type: types_1.UI_CONNECT_ANCHOR,
            payload: {
                docId, sidenoteId, anchorId, element,
            },
        });
    };
}
exports.connectAnchor = connectAnchor;
function connectAnchorBase(docId, anchorId, element) {
    return (dispatch) => {
        if (docId == null || anchorId == null || element == null)
            return;
        element.anchorId = anchorId;
        dispatch({
            type: types_1.UI_CONNECT_ANCHOR_BASE,
            payload: {
                docId, anchorId, element,
            },
        });
    };
}
exports.connectAnchorBase = connectAnchorBase;
function updateSidenote(docId, sidenoteId) {
    return {
        type: types_1.UI_SELECT_SIDENOTE,
        payload: { docId, sidenoteId },
    };
}
exports.updateSidenote = updateSidenote;
function selectSidenote(docId, sidenoteId) {
    return (dispatch) => {
        dispatch({
            type: types_1.UI_SELECT_SIDENOTE,
            payload: { docId, sidenoteId },
        });
    };
}
exports.selectSidenote = selectSidenote;
function selectAnchor(docId, anchor) {
    return (dispatch) => {
        var _a;
        if (docId == null || anchor == null)
            return;
        const { anchorId } = (_a = anchor) !== null && _a !== void 0 ? _a : {};
        if (anchorId == null)
            return;
        dispatch({
            type: types_1.UI_SELECT_ANCHOR,
            payload: { docId, anchorId },
        });
    };
}
exports.selectAnchor = selectAnchor;
function disconnectSidenote(docId, sidenoteId) {
    return (dispatch) => {
        if (docId == null || sidenoteId == null)
            return;
        dispatch({
            type: types_1.UI_DISCONNECT_SIDENOTE,
            payload: { docId, sidenoteId },
        });
    };
}
exports.disconnectSidenote = disconnectSidenote;
function disconnectAnchor(docId, anchor) {
    return (dispatch) => {
        var _a;
        if (docId == null || anchor == null)
            return;
        const { anchorId } = (_a = anchor) !== null && _a !== void 0 ? _a : {};
        if (anchorId == null)
            return;
        dispatch({
            type: types_1.UI_DISCONNECT_ANCHOR,
            payload: { docId, anchorId },
        });
    };
}
exports.disconnectAnchor = disconnectAnchor;
function deselectSidenote(docId) {
    return {
        type: types_1.UI_DESELECT_SIDENOTE,
        payload: { docId },
    };
}
exports.deselectSidenote = deselectSidenote;
function repositionSidenotes(docId) {
    return {
        type: types_1.UI_REPOSITION_SIDENOTES,
        payload: { docId },
    };
}
exports.repositionSidenotes = repositionSidenotes;
//# sourceMappingURL=actions.js.map