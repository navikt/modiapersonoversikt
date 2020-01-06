import * as React from 'react';
import { useOnMount } from '../../../../utils/customHooks';
import { loggEvent } from '../../../../utils/frontendLogger';
import DokumentVisning from './dokumentvisning/SaksDokumentVisning';
import { useQueryParams } from '../../../../utils/urlUtils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import styled from 'styled-components';

const Sentring = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

function SaksDokumentEgetVindu() {
    const queryParams = useQueryParams<{ dokumenturl?: string }>();
    console.log(queryParams);
    useOnMount(() => {
        loggEvent('Sidevisning', 'SaksDokumentEgetVindu');
    });

    if (!queryParams.dokumenturl) {
        return (
            <Sentring>
                <AlertStripeFeil>Mangler dokumentURL</AlertStripeFeil>
            </Sentring>
        );
    }
    return <DokumentVisning url={queryParams.dokumenturl} />;
}

export default SaksDokumentEgetVindu;
