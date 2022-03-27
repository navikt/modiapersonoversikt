import * as React from 'react';
import { useOnMount } from '../../../../utils/customHooks';
import { loggEvent } from '../../../../utils/logger/frontendLogger';
import DokumentVisning from './dokumentvisning/SaksDokumentVisning';
import { useQueryParams } from '../../../../utils/url-utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import SetFnrIRedux from '../../../PersonOppslagHandler/SetFnrIRedux';

interface Props {
    fnr: string;
}

const Sentring = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0 auto;
`;

function SaksDokumentEgetVindu(props: Props) {
    const queryParams = useQueryParams<{ dokument?: string }>();

    useOnMount(() => {
        loggEvent('Sidevisning', 'SaksDokumentEgetVindu');
        document.title = 'Dokument';
    });

    if (!queryParams.dokument) {
        return (
            <Sentring>
                <AlertStripeFeil>Mangler dokumentURL</AlertStripeFeil>
            </Sentring>
        );
    }
    return (
        <>
            <SetFnrIRedux fnr={props.fnr} />
            <DokumentVisning url={queryParams.dokument} />
        </>
    );
}

export default SaksDokumentEgetVindu;
