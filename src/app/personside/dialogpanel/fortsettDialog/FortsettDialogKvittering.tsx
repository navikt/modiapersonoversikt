import { useDispatch } from 'react-redux';
import { setIngenValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import { DialogpanelKvittering } from '../nyFellesStyling';
import { SendNyMeldingStatus } from '../sendMelding/SendNyMeldingTypes';
import type { KvitteringsData } from './FortsettDialogTypes';

export function SvarSendtKvittering(props: { kvitteringsData: KvitteringsData }) {
    const dispatch = useDispatch();

    return (
        <DialogpanelKvittering
            tittel="Svar ble sendt"
            fritekst={props.kvitteringsData.fritekst}
            traad={props.kvitteringsData.traad}
            lukk={() => {
                dispatch(setIngenValgtTraadDialogpanel());
            }}
            meldingstatus={SendNyMeldingStatus.SVAR_SENDT}
        />
    );
}
