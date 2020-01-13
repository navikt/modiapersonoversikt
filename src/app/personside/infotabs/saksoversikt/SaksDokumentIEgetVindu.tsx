import * as React from 'react';
import { useOnMount } from '../../../../utils/customHooks';
import { loggEvent } from '../../../../utils/frontendLogger';
import DokumentVisning from './dokumentvisning/SaksDokumentVisning';
import { useQueryParams } from '../../../../utils/urlUtils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import SetFnrIRedux from '../../../container/PersonOppslagHandler/SetFnrIRedux';

interface Props {
    fødselsnummer: string;
}

const Sentring = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

function SaksDokumentEgetVindu(props: Props) {
    const queryParams = useQueryParams<{ dokumenturl?: string }>();

    useOnMount(() => {
        loggEvent('Sidevisning', 'SaksDokumentEgetVindu');
        document.title = 'Dokument';
    });

    if (!queryParams.dokumenturl) {
        return (
            <Sentring>
                <AlertStripeFeil>Mangler dokumentURL</AlertStripeFeil>
            </Sentring>
        );
    }
    return (
        <>
            <SetFnrIRedux fødselsnummer={props.fødselsnummer} />
            <DokumentVisning url={queryParams.dokumenturl} />
        </>
    );
}

export default SaksDokumentEgetVindu;
