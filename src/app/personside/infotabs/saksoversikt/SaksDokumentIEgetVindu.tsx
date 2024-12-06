import { useOnMount } from '../../../../utils/customHooks';
import { loggEvent } from '../../../../utils/logger/frontendLogger';
import DokumentVisning from './dokumentvisning/SaksDokumentVisning';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import { getSaksdokumentUrl } from './dokumentvisning/getSaksdokumentUrl';
import { getRouteApi } from '@tanstack/react-router';

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

const routeApi = getRouteApi('/dokument');

function SaksDokumentEgetVindu(props: Props) {
    const { dokument, journalpost } = routeApi.useSearch();

    useOnMount(() => {
        loggEvent('Sidevisning', 'SaksDokumentEgetVindu');
        document.title = 'Dokument';
    });

    if (!dokument) {
        return (
            <Sentring>
                <AlertStripeFeil>Mangler dokumentURL</AlertStripeFeil>
            </Sentring>
        );
    }
    return (
        <>
            <DokumentVisning fnr={props.fnr} url={getSaksdokumentUrl(journalpost ?? null, dokument)} />
        </>
    );
}

export default SaksDokumentEgetVindu;
