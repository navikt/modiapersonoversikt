import { Radio } from 'nav-frontend-skjema';
import { useDisableDialog } from 'src/lib/state/dialog';
import { TraadType } from '../../../../models/meldinger/meldinger';
import { VelgDialogtypeStyle } from '../fellesStyling';
import type { SendNyMeldingState } from './SendNyMelding';

interface Props {
    formState: SendNyMeldingState;
    updateTraadType: (traadType: TraadType, avsluttet: boolean) => void;
}

function VelgDialogType(props: Props) {
    const disableDialog = useDisableDialog();
    return (
        <VelgDialogtypeStyle>
            <Radio
                disabled={disableDialog}
                label="Referat"
                onChange={() => props.updateTraadType(TraadType.SAMTALEREFERAT, false)}
                checked={props.formState.traadType === TraadType.SAMTALEREFERAT}
                name="dialogtype"
            />
            <Radio
                disabled={disableDialog}
                label="Samtale"
                onChange={() => props.updateTraadType(TraadType.MELDINGSKJEDE, false)}
                checked={props.formState.traadType !== TraadType.SAMTALEREFERAT && !props.formState.avsluttet}
                name="dialogtype"
            />
            <Radio
                disabled={disableDialog}
                label="Infomelding"
                onChange={() => props.updateTraadType(TraadType.MELDINGSKJEDE, true)}
                checked={props.formState.traadType !== TraadType.SAMTALEREFERAT && props.formState.avsluttet}
                name="dialogtype"
            />
        </VelgDialogtypeStyle>
    );
}

export default VelgDialogType;
