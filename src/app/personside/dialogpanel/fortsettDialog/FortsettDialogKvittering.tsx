import * as React from 'react';
import { DialogpanelKvittering } from '../fellesStyling';
import { useDispatch } from 'react-redux';
import { setIngenValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import { KvitteringsData } from './FortsettDialogTypes';
import { SendNyMeldingStatus } from '../sendMelding/SendNyMeldingTypes';

export function SvarSendtKvittering(props: { kvitteringsData: KvitteringsData }) {
    const dispatch = useDispatch();

    return (
        <DialogpanelKvittering
            tittel="Svar ble sendt"
            fritekst={props.kvitteringsData.fritekst}
            meldingstype={props.kvitteringsData.meldingstype}
            traad={props.kvitteringsData.traad}
            lukk={() => {
                dispatch(setIngenValgtTraadDialogpanel());
            }}
            meldingstatus={SendNyMeldingStatus.SVAR_SENDT}
        />
    );
}
