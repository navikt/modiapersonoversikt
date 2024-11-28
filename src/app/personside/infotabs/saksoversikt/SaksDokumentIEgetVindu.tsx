import { useOnMount } from '../../../../utils/customHooks';
import { loggEvent } from '../../../../utils/logger/frontendLogger';
import DokumentVisning from './dokumentvisning/SaksDokumentVisning';
import { useQueryParams } from '../../../../utils/url-utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import { getSaksdokumentUrl } from './dokumentvisning/getSaksdokumentUrl';
import VentPaaPersonLastet from '../../../../components/VentPaaPersonLastet';

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
    const queryParams = useQueryParams<{ dokument?: string; journalpost?: string }>();

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
            <VentPaaPersonLastet fnr={props.fnr}>
                <DokumentVisning
                    fnr={props.fnr}
                    url={getSaksdokumentUrl(props.fnr, queryParams.journalpost ?? null, queryParams.dokument)}
                />
            </VentPaaPersonLastet>
        </>
    );
}

export default SaksDokumentEgetVindu;
