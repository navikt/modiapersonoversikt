import * as React from 'react';
import { SendNyMeldingDialogType, SendNyMeldingState } from './SendNyMelding';
import { Meldingstype } from '../../../../models/meldinger/meldinger';
import { Radio } from 'nav-frontend-skjema';
import { VelgDialogtypeStyle } from '../fellesStyling';

interface Props {
    formState: SendNyMeldingState;
    updateDialogType: (dialogType: SendNyMeldingDialogType) => void;
}

function NyVelgDialogType(props: Props) {
    return (
        <VelgDialogtypeStyle>
            <Radio
                label="Referat"
                onChange={() => props.updateDialogType(Meldingstype.SAMTALEREFERAT_OPPMOTE)}
                checked={
                    props.formState.dialogType === Meldingstype.SAMTALEREFERAT_OPPMOTE ||
                    props.formState.dialogType === Meldingstype.SAMTALEREFERAT_TELEFON
                }
                name="dialogtype"
            />
            <Radio
                label="Samtale"
                onChange={() => props.updateDialogType(Meldingstype.SPORSMAL_MODIA_UTGAAENDE)}
                checked={
                    props.formState.dialogType === Meldingstype.SPORSMAL_MODIA_UTGAAENDE ||
                    props.formState.dialogType === Meldingstype.INFOMELDING_MODIA_UTGAAENDE
                }
                name="dialogtype"
            />
        </VelgDialogtypeStyle>
    );
}

export default NyVelgDialogType;
