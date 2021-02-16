"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAnchorSelected = exports.sidenoteTop = exports.isSidenoteSelected = exports.selectedSidenote = void 0;
function selectedSidenote(state, docId) {
    var _a;
    if (docId == null)
        return null;
    return (_a = state.sidenotes.ui.docs[docId]) === null || _a === void 0 ? void 0 : _a.selectedSidenote;
}
exports.selectedSidenote = selectedSidenote;
function isSidenoteSelected(state, docId, sidenoteId) {
    var _a;
    if (docId == null || sidenoteId == null)
        return false;
    return ((_a = state.sidenotes.ui.docs[docId]) === null || _a === void 0 ? void 0 : _a.selectedSidenote) === sidenoteId;
}
exports.isSidenoteSelected = isSidenoteSelected;
function sidenoteTop(state, docId, sidenoteId) {
    var _a, _b, _c;
    if (docId == null || sidenoteId == null)
        return 0;
    return (_c = (_b = (_a = state.sidenotes.ui.docs[docId]) === null || _a === void 0 ? void 0 : _a.sidenotes[sidenoteId]) === null || _b === void 0 ? void 0 : _b.top) !== null && _c !== void 0 ? _c : 0;
}
exports.sidenoteTop = sidenoteTop;
function isAnchorSelected(state, docId, anchorId) {
    var _a;
    if (docId == null || anchorId == null)
        return false;
    return ((_a = state.sidenotes.ui.docs[docId]) === null || _a === void 0 ? void 0 : _a.selectedAnchor) === anchorId;
}
exports.isAnchorSelected = isAnchorSelected;
//# sourceMappingURL=selectors.js.map