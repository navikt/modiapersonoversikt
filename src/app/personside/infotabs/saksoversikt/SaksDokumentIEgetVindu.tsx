import * as React from 'react';
import { useOnMount } from '../../../../utils/customHooks';
import { loggEvent } from '../../../../utils/frontendLogger';
import DokumentOgVedlegg from './dokumentvisning/DokumentOgVedlegg';

function SaksDokumentEgetVindu() {
    useOnMount(() => {
        loggEvent('Sidevisning', 'SaksDokumentEgetVindu');
    });

    return <DokumentOgVedlegg />;
}

export default SaksDokumentEgetVindu;
