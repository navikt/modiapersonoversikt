import * as React from 'react';
import { useAppState, useFodselsnummer, useOnMount } from '../../../../utils/customHooks';
import { loggError } from '../../../../utils/logger/frontendLogger';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { OpprettHenvendelseRequest, OpprettHenvendelseResponse, Traad } from '../../../../models/meldinger/meldinger';
import { useDispatch } from 'react-redux';
import { apiBaseUri } from '../../../../api/config';
import { postWithConflictVerification, RespectConflictError } from '../../../../api/api';
import { useState } from 'react';
import { selectValgtEnhet } from '../../../../redux/session/session';
import { setIngenValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import tildelteoppgaverResource from '../../../../rest/resources/tildelteoppgaver';

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
    const valgtEnhet = useAppState(selectValgtEnhet);
    const [error, setError] = useState(false);
    const [response, setResponse] = useState<OpprettHenvendelseResponse | undefined>();
    const tildelteoppgaver = tildelteoppgaverResource.useFetch();
    const dispatch = useDispatch();
    const fnr = useFodselsnummer();

    useOnMount(function getBehandlingsId() {
        const opprettHenvendelseRequest: OpprettHenvendelseRequest = { enhet: valgtEnhet, traadId: traad.traadId };
        postWithConflictVerification(
            `${apiBaseUri}/dialog/${fnr}/fortsett/opprett`,
            opprettHenvendelseRequest,
            'Opprett-henvendelse',
            'Oppgaven tilknyttet denne meldingen er allerede tilordnet en saksbehandler. Vil du overstyre dette?'
        )
            .then((data) => setResponse(data as OpprettHenvendelseResponse))
            .then(() => tildelteoppgaver.rerun())
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
