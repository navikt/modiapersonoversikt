import * as React from 'react';
import { ForsettDialogRequest, Meldingstype, SendDelsvarRequest } from '../../../../models/meldinger/meldinger';
import { DialogpanelKvittering, DialogpanelKvitteringStyling } from '../fellesStyling';
import { FailedPostResource, FinishedPostResource, isFinishedPosting } from '../../../../rest/utils/postResource';
import { useDispatch } from 'react-redux';
import { setIngenValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import { erLeggTilbakeOppgaveFeilTemaRequest, LeggTilbakeOppgaveRequest } from '../../../../models/oppgave';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import { useOnMount, useRestResource } from '../../../../utils/customHooks';
import { loggError } from '../../../../utils/frontendLogger';
import { Temagruppe, temagruppeTekst } from '../../../../models/Temagrupper';

function SvarSendtKvittering(props: { resource: FinishedPostResource<ForsettDialogRequest, {}> }) {
    const dispatch = useDispatch();
    return (
        <DialogpanelKvittering
            tittel="Svar ble sendt"
            fritekst={props.resource.payload.fritekst}
            meldingstype={props.resource.payload.meldingstype}
            lukk={() => {
                dispatch(setIngenValgtTraadDialogpanel());
                dispatch(props.resource.actions.reset);
            }}
        />
    );
}

function DelsvarRegistrertKvittering(props: { resource: FinishedPostResource<SendDelsvarRequest, {}> }) {
    const dispatch = useDispatch();
    return (
        <DialogpanelKvittering
            tittel={`Delsvar ble registrert og lagt tilbake på ${temagruppeTekst(props.resource.payload
                .temagruppe as Temagruppe)}`}
            fritekst={props.resource.payload.fritekst}
            meldingstype={Meldingstype.DELVIS_SVAR_SKRIFTLIG}
            lukk={() => {
                dispatch(setIngenValgtTraadDialogpanel());
                dispatch(props.resource.actions.reset);
            }}
        />
    );
}

function OppgaveLagtTilbakeKvittering(props: { resource: FinishedPostResource<LeggTilbakeOppgaveRequest, {}> }) {
    const dispatch = useDispatch();
    const lukk = () => {
        dispatch(props.resource.actions.reset);
        dispatch(setIngenValgtTraadDialogpanel());
    };
    return (
        <DialogpanelKvitteringStyling>
            <VisuallyHiddenAutoFokusHeader tittel="Oppgaven ble lagt tilbake" />
            {erLeggTilbakeOppgaveFeilTemaRequest(props.resource.payload) && (
                <AlertStripeSuksess>
                    Oppgaven ble lagt tilbake på{' '}
                    {temagruppeTekst(props.resource.payload.temagruppe as Temagruppe).toLowerCase()}
                </AlertStripeSuksess>
            )}
            {!erLeggTilbakeOppgaveFeilTemaRequest(props.resource.payload) && (
                <AlertStripeSuksess>Oppgaven ble lagt tilbake</AlertStripeSuksess>
            )}
            <KnappBase type="standard" onClick={lukk}>
                Lukk
            </KnappBase>
        </DialogpanelKvitteringStyling>
    );
}

export function LeggTilbakeOppgaveFeil(props: { resource: FailedPostResource<LeggTilbakeOppgaveRequest, {}> }) {
    useOnMount(() => {
        loggError(new Error('Feil ved tilbakelegging av oppgave: ' + props.resource.error), undefined, {
            request: props.resource.payload
        });
    });

    return <AlertStripeFeil>Det skjedde en feil ved tilbakelegging av oppgave</AlertStripeFeil>;
}

export function useFortsettDialogKvittering() {
    const leggTilbakeResource = useRestResource(resources => resources.leggTilbakeOppgave);
    const sendSvarResource = useRestResource(resources => resources.sendSvar);
    const sendDelsvarResource = useRestResource(resources => resources.sendDelsvar);

    if (isFinishedPosting(sendSvarResource)) {
        return <SvarSendtKvittering resource={sendSvarResource} />;
    }
    if (isFinishedPosting(sendDelsvarResource)) {
        return <DelsvarRegistrertKvittering resource={sendDelsvarResource} />;
    }
    if (isFinishedPosting(leggTilbakeResource)) {
        return <OppgaveLagtTilbakeKvittering resource={leggTilbakeResource} />;
    }

    return null;
}
