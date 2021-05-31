import React from 'react';
declare type Props = {
    base?: string;
    sidenote: string;
    children: React.ReactNode;
};
export declare const Sidenote: {
    (props: Props): JSX.Element;
    defaultProps: {
        base: undefined;
    };
};
export default Sidenote;
