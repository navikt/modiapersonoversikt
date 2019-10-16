import * as React from 'react';
import { Meldingstype, Temagruppe } from '../../../../models/meldinger/meldinger';
import { DialogpanelKvittering, DialogpanelKvitteringStyling } from '../fellesStyling';
import { useDispatch } from 'react-redux';
import { setIngenValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import { erLeggTilbakeOppgaveFeilTemaRequest, LeggTilbakeOppgaveRequest } from '../../../../models/oppgave';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { temagruppeTekst } from '../../infotabs/meldinger/utils/meldingstekster';
import KnappBase from 'nav-frontend-knapper';
import { KvitteringsData } from './FortsettDialogTypes';

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
