import * as React from 'react';
import { useOnMount, useRestResource } from '../../../../utils/customHooks';
import { isFailedPosting, isFinishedPosting } from '../../../../rest/utils/postResource';
import { loggError } from '../../../../utils/frontendLogger';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { Traad } from '../../../../models/meldinger/meldinger';
import { useDispatch } from 'react-redux';

interface NotFinishedOpprettHenvendelseStatus {
    success: false;
    placeholder: JSX.Element;
}

interface FinishedOpprettHenvendelseStatus {
    success: true;
    behandlingsId: string;
}

type OpprettHenvendelseStatus = NotFinishedOpprettHenvendelseStatus | FinishedOpprettHenvendelseStatus;

function useOpprettHenvendelse(traad: Traad): OpprettHenvendelseStatus {
    const opprettHenvendelseResource = useRestResource(resources => resources.opprettHenvendelse);
    const dispatch = useDispatch();

    useOnMount(function getBehandlingsId() {
        dispatch(opprettHenvendelseResource.actions.post({ traadId: traad.traadId }));
        return () => {
            dispatch(opprettHenvendelseResource.actions.reset);
        };
    });

    if (isFailedPosting(opprettHenvendelseResource)) {
        loggError(new Error('Kunne ikke opprette henvendelse for traadId: ' + traad.traadId));
        return {
            success: false,
            placeholder: <AlertStripeFeil>Kunne ikke opprette henvendelse</AlertStripeFeil>
        };
    }

    if (!isFinishedPosting(opprettHenvendelseResource)) {
        return {
            success: false,
            placeholder: <CenteredLazySpinner />
        };
    }

    return {
        success: true,
        behandlingsId: opprettHenvendelseResource.response.behandlingsId
    };
}

export default useOpprettHenvendelse;
