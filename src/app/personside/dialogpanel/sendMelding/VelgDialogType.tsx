import * as React from 'react';
import { SendNyMeldingDialogType, SendNyMeldingState } from './SendNyMelding';
import { Meldingstype } from '../../../../models/meldinger/meldinger';
import { Radio } from 'nav-frontend-skjema';
import { VelgDialogtypeStyle } from '../fellesStyling';
import useFeatureToggle from '../../../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../../../components/featureToggle/toggleIDs';

interface Props {
    formState: SendNyMeldingState;
    updateDialogType: (dialogType: SendNyMeldingDialogType) => void;
}

function VelgDialogType(props: Props) {
    const enabled = useFeatureToggle(FeatureToggles.Infomelding).isOn ?? false;
    return (
        <VelgDialogtypeStyle>
            <Radio
                label="Referat telefon"
                onChange={() => props.updateDialogType(Meldingstype.SAMTALEREFERAT_TELEFON)}
                checked={props.formState.dialogType === Meldingstype.SAMTALEREFERAT_TELEFON}
                name="dialogtype"
            />
            <Radio
                label="Referat oppmøte"
                onChange={() => props.updateDialogType(Meldingstype.SAMTALEREFERAT_OPPMOTE)}
                checked={props.formState.dialogType === Meldingstype.SAMTALEREFERAT_OPPMOTE}
                name="dialogtype"
            />
            <Radio
                label="Spørsmål"
                onChange={() => props.updateDialogType(Meldingstype.SPORSMAL_MODIA_UTGAAENDE)}
                checked={props.formState.dialogType === Meldingstype.SPORSMAL_MODIA_UTGAAENDE}
                name="dialogtype"
            />
            {enabled && (
                <Radio
                    label="Infomelding"
                    name="dialogtype"
                    onChange={() => props.updateDialogType(Meldingstype.INFOMELDING_MODIA_UTGAAENDE)}
                    checked={props.formState.dialogType === Meldingstype.INFOMELDING_MODIA_UTGAAENDE}
                />
            )}
        </VelgDialogtypeStyle>
    );
}

export default VelgDialogType;
