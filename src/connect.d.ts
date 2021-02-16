import { Store } from './store/types';
export declare type Options = {
    padding?: number;
};
declare type Ref<T> = {
    store: () => T;
    _store?: T;
    opts: () => Options;
    _opts?: Options;
};
export declare const ref: Ref<Store>;
export declare function setup(store: Store, opts: Options): void;
export declare const store: Pick<Store, 'getState' | 'dispatch' | 'subscribe'>;
export declare const opts: Required<Options>;
export {};
