import * as React from 'react';
import { ForsettDialogRequest, Temagruppe } from '../../../../models/meldinger/meldinger';
import { DialogpanelFeilmelding, DialogpanelKvittering, DialogpanelKvitteringStyling } from '../fellesStyling';
import {
    FailedPostResource,
    FinishedPostResource,
    isFailedPosting,
    isFinishedPosting,
    isPosting
} from '../../../../rest/utils/postResource';
import { useDispatch } from 'react-redux';
import { setIngenValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import { erLeggTilbakeOppgaveFeilTemaRequest, LeggTilbakeOppgaveRequest } from '../../../../models/oppgave';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { temagruppeTekst } from '../../infotabs/meldinger/utils/meldingstekster';
import KnappBase from 'nav-frontend-knapper';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { useRestResource } from '../../../../utils/customHooks';

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
                    {temagruppeTekst(props.resource.payload.temagruppe as Temagruppe).toLowerCase}
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

function LeggTilbakeOppgaveFeil(props: { resource: FailedPostResource<LeggTilbakeOppgaveRequest, {}> }) {
    const dispatch = useDispatch();
    return (
        <DialogpanelKvitteringStyling>
            <AlertStripeFeil>Det skjedde en feil ved tilbakelegging av oppgave: {props.resource.error}</AlertStripeFeil>
            <KnappBase type="standard" onClick={() => dispatch(props.resource.actions.reset)}>
                Lukk
            </KnappBase>
        </DialogpanelKvitteringStyling>
    );
}

export function useFortsettDialogKvittering() {
    const leggTilbakeResource = useRestResource(resources => resources.leggTilbakeOppgave);
    const sendSvarResource = useRestResource(resources => resources.sendSvar);

    if (isPosting(sendSvarResource) || isPosting(leggTilbakeResource)) {
        return <CenteredLazySpinner type="XL" delay={100} />;
    }
    if (isFinishedPosting(sendSvarResource)) {
        return <SvarSendtKvittering resource={sendSvarResource} />;
    }
    if (isFinishedPosting(leggTilbakeResource)) {
        return <OppgaveLagtTilbakeKvittering resource={leggTilbakeResource} />;
    }
    if (isFailedPosting(sendSvarResource)) {
        return <DialogpanelFeilmelding resource={sendSvarResource} />;
    }
    if (isFailedPosting(leggTilbakeResource)) {
        return <LeggTilbakeOppgaveFeil resource={leggTilbakeResource} />;
    }
    return null;
}
