import * as React from 'react';
import { useFødselsnummer, useOnMount, useRestResource } from '../../../../utils/customHooks';
import { loggError } from '../../../../utils/frontendLogger';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { OpprettHenvendelseRequest, OpprettHenvendelseResponse, Traad } from '../../../../models/meldinger/meldinger';
import { useDispatch } from 'react-redux';
import { apiBaseUri } from '../../../../api/config';
import { post } from '../../../../api/api';
import { useState } from 'react';

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
    const [error, setError] = useState(false);
    const [response, setResponse] = useState<OpprettHenvendelseResponse | undefined>();
    const reloadTildelteOppgaver = useRestResource(resources => resources.tildelteOppgaver.actions.reload);
    const dispatch = useDispatch();
    const fnr = useFødselsnummer();

    useOnMount(function getBehandlingsId() {
        const opprettHenvendelseRequest: OpprettHenvendelseRequest = { traadId: traad.traadId };
        post(`${apiBaseUri}/dialog/${fnr}/fortsett/opprett`, opprettHenvendelseRequest)
            .then(data => setResponse(data as OpprettHenvendelseResponse))
            .then(() => dispatch(reloadTildelteOppgaver))
            .catch(e => {
                setError(true);
                loggError(e, 'Kunne ikke opprette henvendelse for traadId: ' + traad.traadId);
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
