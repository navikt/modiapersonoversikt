import React from 'react';
import SakerFullscreenV2 from './SakerFullscreenV2';

interface Props {
    fnr: string;
}

function SakerFullscreenProxy(props: Props) {
    return <SakerFullscreenV2 fnr={props.fnr} />;
}

export default SakerFullscreenProxy;
