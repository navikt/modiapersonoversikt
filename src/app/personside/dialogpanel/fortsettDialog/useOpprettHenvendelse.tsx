import * as React from 'react';
import { useAppState, useFodselsnummer, useOnMount } from '../../../../utils/customHooks';
import { loggError } from '../../../../utils/logger/frontendLogger';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { OpprettHenvendelseRequest, OpprettHenvendelseResponse, Traad } from '../../../../models/meldinger/meldinger';
import { useDispatch } from 'react-redux';
import { apiBaseUri } from '../../../../api/config';
import { postWithConflictVerification } from '../../../../api/api';
import { useState } from 'react';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import { selectValgtEnhet } from '../../../../redux/session/session';

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
    const reloadTildelteOppgaver = useRestResource(resources => resources.tildelteOppgaver).actions.reload;
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
            .then(data => setResponse(data as OpprettHenvendelseResponse))
            .then(() => dispatch(reloadTildelteOppgaver))
            .catch(e => {
                setError(true);
                loggError(e, 'Kunne ikke opprette henvendelse for traadId: ' + traad.traadId, {});
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
