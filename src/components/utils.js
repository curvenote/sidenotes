"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoc = void 0;
exports.getDoc = (el) => {
    var _a;
    const doc = (_a = el === null || el === void 0 ? void 0 : el.closest('article')) === null || _a === void 0 ? void 0 : _a.id;
    if (el && !doc)
        console.warn('Parent doc for comment not found.');
    return doc || 'global';
};
//# sourceMappingURL=utils.js.map