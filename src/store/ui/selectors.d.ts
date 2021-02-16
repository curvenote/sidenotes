import { State } from '../types';
export declare function selectedSidenote(state: State, docId?: string | null): string | null;
export declare function isSidenoteSelected(state: State, docId?: string | null, sidenoteId?: string | null): boolean;
export declare function sidenoteTop(state: State, docId?: string | null, sidenoteId?: string | null): number;
export declare function isAnchorSelected(state: State, docId: string | null, anchorId: string | null): boolean;
