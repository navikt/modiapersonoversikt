import * as React from 'react';
import { Fieldset, Radio } from 'nav-frontend-skjema';
import { FormState, SendNyMeldingDialogTyper } from './SendNyMelding';
import styled from 'styled-components';

const StyledFieldset = styled(Fieldset)`
    > * {
        margin-bottom: 0.3rem;
    }
`;

interface Props {
    formState: FormState;
    updateDialogType: (dialogType: SendNyMeldingDialogTyper) => void;
}

function VelgDialogType(props: Props) {
    function getProps(label: string, dialogType: SendNyMeldingDialogTyper) {
        const checked = props.formState.dialogType === dialogType;
        return {
            label: label,
            name: 'dialogtype',
            onClick: () => props.updateDialogType(dialogType),
            checked: checked
        };
    }

    return (
        <StyledFieldset legend="Velg dialogtype">
            <Radio {...getProps('Samtalereferat telefon', SendNyMeldingDialogTyper.SamtaleReferatTelefon)} />
            <Radio {...getProps('Samtalereferat oppmøte', SendNyMeldingDialogTyper.SamtaleReferatOppmøte)} />
            <Radio {...getProps('Spørsmål til bruker', SendNyMeldingDialogTyper.SpørsmålSkriftlig)} />
        </StyledFieldset>
    );
}

export default VelgDialogType;
