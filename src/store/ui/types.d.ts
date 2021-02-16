export declare const ANCHOR_BASE = "ANCHOR_BASE";
export declare const UI_CONNECT_SIDENOTE = "UI_CONNECT_SIDENOTE";
export declare const UI_DISCONNECT_SIDENOTE = "UI_DISCONNECT_SIDENOTE";
export declare const UI_CONNECT_ANCHOR = "UI_CONNECT_ANCHOR";
export declare const UI_CONNECT_ANCHOR_BASE = "UI_CONNECT_ANCHOR_BASE";
export declare const UI_DISCONNECT_ANCHOR = "UI_DISCONNECT_ANCHOR";
export declare const UI_SELECT_SIDENOTE = "UI_SELECT_SIDENOTE";
export declare const UI_DESELECT_SIDENOTE = "UI_DESELECT_SIDENOTE";
export declare const UI_SELECT_ANCHOR = "UI_SELECT_ANCHOR";
export declare const UI_UPDATE_COMMENT = "UI_UPDATE_COMMENT";
export declare const UI_REPOSITION_SIDENOTES = "UI_REPOSITION_SIDENOTES";
export declare type Sidenote = {
    id: string;
    baseAnchors: string[];
    inlineAnchors: string[];
    top: number;
    visible: boolean;
};
export declare type Anchor = {
    id: string;
    element: HTMLElement;
    sidenote: typeof ANCHOR_BASE | string;
};
export declare type DocState = {
    id: string;
    selectedSidenote: string | null;
    selectedAnchor: string | null;
    sidenotes: Record<string, Sidenote>;
    anchors: Record<string, Anchor>;
};
export declare type UIState = {
    docs: Record<string, DocState>;
};
export interface ConnectSidenoteAction {
    type: typeof UI_CONNECT_SIDENOTE;
    payload: {
        docId: string;
        sidenoteId: string;
        baseId?: string;
    };
}
export interface DisconnectAnchorAction {
    type: typeof UI_DISCONNECT_ANCHOR;
    payload: {
        docId: string;
        anchorId: string;
    };
}
export interface ConnectAnchorAction {
    type: typeof UI_CONNECT_ANCHOR;
    payload: {
        docId: string;
        sidenoteId: string;
        anchorId: string;
        element: HTMLElement;
    };
}
export interface ConnectAnchorBaseAction {
    type: typeof UI_CONNECT_ANCHOR_BASE;
    payload: {
        docId: string;
        anchorId: string;
        element: HTMLElement;
    };
}
export interface DisconnectSidenoteAction {
    type: typeof UI_DISCONNECT_SIDENOTE;
    payload: {
        docId: string;
        sidenoteId: string;
    };
}
export interface SelectSidenoteAction {
    type: typeof UI_SELECT_SIDENOTE;
    payload: {
        docId: string;
        sidenoteId: string;
    };
}
export interface SelectAnchorAction {
    type: typeof UI_SELECT_ANCHOR;
    payload: {
        docId: string;
        anchorId: string;
    };
}
export interface DeselectSidenoteAction {
    type: typeof UI_DESELECT_SIDENOTE;
    payload: {
        docId: string;
    };
}
export interface RepositionSidenotesAction {
    type: typeof UI_REPOSITION_SIDENOTES;
    payload: {
        docId: string;
    };
}
export declare type UIActionTypes = (ConnectSidenoteAction | DisconnectSidenoteAction | ConnectAnchorAction | ConnectAnchorBaseAction | DisconnectAnchorAction | SelectSidenoteAction | SelectAnchorAction | DeselectSidenoteAction | RepositionSidenotesAction);
