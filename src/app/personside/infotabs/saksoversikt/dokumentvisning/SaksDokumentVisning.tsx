import { useLocation } from 'react-router';
import { useOnMount } from '../../../../../utils/customHooks';
import { default as React, useCallback, useEffect, useState } from 'react';
import { loggEvent } from '../../../../../utils/logger/frontendLogger';
import { erIE11 } from '../../../../../utils/erIE11';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { ObjectHttpFeilHandtering } from '../../../../../components/ObjectHttpFeilHandtering';
import { erSakerFullscreen } from '../utils/erSakerFullscreen';
import styled from 'styled-components';
import { getMockableUrl } from './mockable-dokument-url';
import { parseQueryString } from '../../../../../utils/url-utils';
import { apiBaseUri } from '../../../../../api/config';

interface Props {
    fnr: string;
    url: string;
}

const ErrorStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

function DokumentVisning(props: Props) {
    const pathname = useLocation().pathname;
    const [errMsg, setErrMsg] = useState('');
    const onError = useCallback((statusKode: number) => setErrMsg(feilmelding(statusKode)), [setErrMsg]);

    useEffect(() => {
        loggEvent('VisSaksdokument', 'Saker', { standalone: erSakerFullscreen(pathname) });
    }, [props.url, pathname]);

    useOnMount(() => {
        if (erIE11()) {
            loggEvent('KanIkkeViseDokumentIIE11', 'Saker');
        }
    });

    if (erIE11()) {
        return <AlertStripeInfo>Kan ikke vise dokumenter i Internet Explorer. Prøv chrome</AlertStripeInfo>;
    }

    const url = getMockableUrl(byggDokumentVisningUrl(props.url, props.fnr));

    return (
        <ObjectHttpFeilHandtering url={url} width="100%" height="100%" onError={onError}>
            <ErrorStyle>
                <AlertStripeAdvarsel>{errMsg}</AlertStripeAdvarsel>
            </ErrorStyle>
        </ObjectHttpFeilHandtering>
    );
}

function byggDokumentVisningUrl(url: string, fodselsnummer: string): string {
    const { journalpost, dokument } = parseQueryString<{ journalpost: string; dokument: string }>(url); // Format til url: 'journalpost=etcoicxr&dokument=q90p8dnw'
    return `${apiBaseUri}/saker/${fodselsnummer}/dokument/${journalpost}/${dokument}`;
}

function feilmelding(statusKode: number) {
    switch (statusKode) {
        case 401:
        case 403:
            return 'Du har ikke tilgang til dette dokumentet.';
        case 404:
            return 'Dokument ikke funnet.';
        default:
            return 'Ukjent feil ved henting av dokument. Kontakt brukerstøtte. Feilkode: ' + statusKode;
    }
}

export default React.memo(DokumentVisning);
