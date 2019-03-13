import * as React from 'react';
import { useFocusOnMount } from '../utils/customHooks';

function VisuallyHiddenAutoFokusHeader(props: { tittel: string }) {
    const ref = React.createRef<HTMLHeadingElement>();
    useFocusOnMount(ref);
    return (
        <h2 className="visually-hidden" tabIndex={-1} ref={ref}>
            {props.tittel}
        </h2>
    );
}

export default VisuallyHiddenAutoFokusHeader;
