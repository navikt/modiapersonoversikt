import * as React from 'react';
import { TraadType } from '../../../../models/meldinger/meldinger';
import { Radio } from 'nav-frontend-skjema';
import { VelgDialogtypeStyle } from '../fellesStyling';
import { NySendNyMeldingState } from './NySendNyMelding';

interface Props {
    formState: NySendNyMeldingState;
    updateTraadType: (traadType: TraadType) => void;
}

function NyVelgDialogType(props: Props) {
    return (
        <VelgDialogtypeStyle>
            <Radio
                label="Referat"
                onChange={() => props.updateTraadType(TraadType.SAMTALEREFERAT)}
                checked={props.formState.traadType === TraadType.SAMTALEREFERAT}
                name="dialogtype"
            />
            <Radio
                label="Samtale"
                onChange={() => props.updateTraadType(TraadType.MELDINGSKJEDE)}
                checked={props.formState.traadType !== TraadType.SAMTALEREFERAT}
                name="dialogtype"
            />
        </VelgDialogtypeStyle>
    );
}

export default NyVelgDialogType;
