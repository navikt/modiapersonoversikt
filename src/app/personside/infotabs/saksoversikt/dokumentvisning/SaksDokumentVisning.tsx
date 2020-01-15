import { useOnMount } from '../../../../../utils/customHooks';
import { default as React, useEffect, useState } from 'react';
import { loggEvent } from '../../../../../utils/frontendLogger';
import { erIE11 } from '../../../../../utils/erNyPersonoversikt';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { ObjectHttpFeilHandtering } from '../../../../../components/ObjectHttpFeilHandtering';
import { erSakerFullscreen } from '../utils/erSakerFullscreen';
import { mockSaksdokument, mockSaksdokumentUrl } from '../../../../../mock/saksoversikt/dokument-mock';

interface Props {
    url: string;
}

function DokumentVisning(props: Props) {
    const [errMsg, setErrMsg] = useState('');
    const onError = (statusKode: number) => setErrMsg(feilmelding(statusKode));

    useEffect(() => {
        loggEvent('VisSaksdokument', 'Saker', { standalone: erSakerFullscreen() });
    }, [props.url]);

    useOnMount(() => {
        if (erIE11()) {
            loggEvent('KanIkkeViseDokumentIIE11', 'Saker');
        }
    });

    if (erIE11()) {
        return <AlertStripeInfo>Kan ikke vise dokumenter i Internet Explorer. Prøv chrome</AlertStripeInfo>;
    }

    const url = props.url === mockSaksdokumentUrl ? mockSaksdokument() : props.url;

    return (
        <ObjectHttpFeilHandtering type="application/pdf" url={url} width="100%" height="100%" onError={onError}>
            <AlertStripeAdvarsel>{errMsg}</AlertStripeAdvarsel>
        </ObjectHttpFeilHandtering>
    );
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

export default DokumentVisning;
