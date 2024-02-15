import * as React from 'react';
import { useFodselsnummer, useOnMount } from '../../../../utils/customHooks';
import { loggError } from '../../../../utils/logger/frontendLogger';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { OpprettHenvendelseRequestV2, OpprettHenvendelseResponse, Traad } from '../../../../models/meldinger/meldinger';
import { useDispatch } from 'react-redux';
import { apiBaseUri } from '../../../../api/config';
import { postWithConflictVerification, RespectConflictError } from '../../../../api/api';
import { useState } from 'react';
import { setIngenValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import tildelteoppgaverResource from '../../../../rest/resources/tildelteoppgaverResource';
import { useValgtenhet } from '../../../../context/valgtenhet-state';

interface NotFinishedOpprettHenvendelse {
    success: false;
    placeholder: JSX.Element;
}

interface FinishedOpprettHenvendelse {
    success: true;
    henvendelse: OpprettHenvendelseResponse;
}

type OpprettHenvendelseReturns = NotFinishedOpprettHenvendelse | FinishedOpprettHenvendelse;

function useOpprettHenvendelse(traad: Traad): OpprettHenvendelseReturns {
    const valgtEnhet = useValgtenhet().enhetId;
    const [error, setError] = useState(false);
    const [response, setResponse] = useState<OpprettHenvendelseResponse | undefined>();
    const tildelteoppgaver = tildelteoppgaverResource.useFetch();
    const dispatch = useDispatch();
    const fnr = useFodselsnummer();

    useOnMount(function getBehandlingsId() {
        const request: OpprettHenvendelseRequestV2 = {
            fnr,
            enhet: valgtEnhet,
            traadId: traad.traadId
        };

        const url = `${apiBaseUri}/v2/dialog/fortsett/opprett`;
        postWithConflictVerification(
            url,
            request,
            'Opprett-henvendelse',
            'Oppgaven tilknyttet denne meldingen er allerede tilordnet en saksbehandler. Vil du overstyre dette?'
        )
            .then((data) => setResponse(data as OpprettHenvendelseResponse))
            .then(() => tildelteoppgaver.refetch())
            .catch((e) => {
                if (e instanceof RespectConflictError) {
                    dispatch(setIngenValgtTraadDialogpanel());
                } else {
                    setError(true);
                    loggError(e, 'Kunne ikke opprette henvendelse for traadId: ' + traad.traadId, {});
                }
            });
    });

    if (error) {
        return {
            success: false,
            placeholder: <AlertStripeFeil>Kunne ikke opprette henvendelse</AlertStripeFeil>
        };
    }

    if (!response) {
        return {
            success: false,
            placeholder: <CenteredLazySpinner />
        };
    }

    return {
        success: true,
        henvendelse: response
    };
}

export default useOpprettHenvendelse;
