import * as React from 'react';
import { Meldingstype, Temagruppe } from '../../../../models/meldinger/meldinger';
import { DialogpanelKvittering, DialogpanelKvitteringStyling } from '../fellesStyling';
import { FailedPostResource } from '../../../../rest/utils/postResource';
import { useDispatch } from 'react-redux';
import { setIngenValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import { erLeggTilbakeOppgaveFeilTemaRequest, LeggTilbakeOppgaveRequest } from '../../../../models/oppgave';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { temagruppeTekst } from '../../infotabs/meldinger/utils/meldingstekster';
import KnappBase from 'nav-frontend-knapper';
import { useOnMount } from '../../../../utils/customHooks';
import { loggError } from '../../../../utils/frontendLogger';
import { KvitteringsData } from './FortsettDialogContainer';

export function SvarSendtKvittering(props: { kvitteringsData: KvitteringsData }) {
    const dispatch = useDispatch();

    return (
        <DialogpanelKvittering
            tittel="Svar ble sendt"
            fritekst={props.kvitteringsData.fritekst}
            meldingstype={props.kvitteringsData.meldingstype}
            lukk={() => {
                dispatch(setIngenValgtTraadDialogpanel());
            }}
        />
    );
}

export function DelsvarRegistrertKvittering(props: { kvitteringsData: KvitteringsData }) {
    const dispatch = useDispatch();
    return (
        <DialogpanelKvittering
            tittel={`Delsvar ble registrert og lagt tilbake på ${temagruppeTekst(props.kvitteringsData
                .temagruppe as Temagruppe)}`}
            fritekst={props.kvitteringsData.fritekst}
            meldingstype={Meldingstype.DELVIS_SVAR_SKRIFTLIG}
            lukk={() => {
                dispatch(setIngenValgtTraadDialogpanel());
            }}
        />
    );
}

export function OppgaveLagtTilbakeKvittering(props: { payload: LeggTilbakeOppgaveRequest }) {
    const dispatch = useDispatch();
    const lukk = () => {
        dispatch(setIngenValgtTraadDialogpanel());
    };
    return (
        <DialogpanelKvitteringStyling>
            <VisuallyHiddenAutoFokusHeader tittel="Oppgaven ble lagt tilbake" />
            {erLeggTilbakeOppgaveFeilTemaRequest(props.payload) && (
                <AlertStripeSuksess>
                    Oppgaven ble lagt tilbake på {temagruppeTekst(props.payload.temagruppe as Temagruppe).toLowerCase()}
                </AlertStripeSuksess>
            )}
            {!erLeggTilbakeOppgaveFeilTemaRequest(props.payload) && (
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
