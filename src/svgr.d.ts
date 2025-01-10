declare module '*.svg' {
    import type * as React from 'react';

    const ReactComponent: React.FunctionComponent<
        React.ComponentProps<'svg'> & {
            title?: string;
            titleId?: string;
            desc?: string;
            descId?: string;
        }
    >;

    export default ReactComponent;
}
