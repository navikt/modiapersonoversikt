import * as React from 'react';
import { TraadType } from '../../../../models/meldinger/meldinger';
import { Radio } from 'nav-frontend-skjema';
import { VelgDialogtypeStyle } from '../fellesStyling';
import { NySendNyMeldingState } from './NySendNyMelding';

interface Props {
    formState: NySendNyMeldingState;
    updateTraadType: (traadType: TraadType, avsluttet: boolean) => void;
}

function NyVelgDialogType(props: Props) {
    return (
        <VelgDialogtypeStyle>
            <Radio
                label="Referat"
                onChange={() => props.updateTraadType(TraadType.SAMTALEREFERAT, false)}
                checked={props.formState.traadType === TraadType.SAMTALEREFERAT}
                name="dialogtype"
            />
            <Radio
                label="Samtale"
                onChange={() => props.updateTraadType(TraadType.MELDINGSKJEDE, false)}
                checked={props.formState.traadType !== TraadType.SAMTALEREFERAT && !props.formState.avsluttet}
                name="dialogtype"
            />
            <Radio
                label="Infomelding"
                onChange={() => props.updateTraadType(TraadType.MELDINGSKJEDE, true)}
                checked={props.formState.traadType !== TraadType.SAMTALEREFERAT && props.formState.avsluttet}
                name="dialogtype"
            />
        </VelgDialogtypeStyle>
    );
}

export default NyVelgDialogType;
