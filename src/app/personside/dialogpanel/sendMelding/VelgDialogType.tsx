import * as React from 'react';
import { FormState, SendNyMeldingDialogTyper } from './SendNyMelding';
import Select from 'nav-frontend-skjema/lib/select';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';

interface Props {
    formState: FormState;
    updateDialogType: (dialogType: SendNyMeldingDialogTyper) => void;
}

const StyledSelect = styled(Select)`
    label {
        ${theme.visuallyHidden}
    }
`;

function VelgDialogType(props: Props) {
    return (
        <StyledSelect
            label="Velg dialogtype"
            value={props.formState.dialogType}
            onChange={event => props.updateDialogType((event.target.value as unknown) as SendNyMeldingDialogTyper)}
        >
            <option value={SendNyMeldingDialogTyper.SamtaleReferatTelefon}>Samtalereferat telefon</option>
            <option value={SendNyMeldingDialogTyper.SamtaleReferatOppmøte}>Samtalereferat oppmøte</option>
            <option value={SendNyMeldingDialogTyper.SpørsmålSkriftlig}>Spørsmål til bruker</option>
        </StyledSelect>
    );
}

export default VelgDialogType;
