import * as React from 'react';
import { FormState, SendNyMeldingDialogType } from './SendNyMelding';
import Select from 'nav-frontend-skjema/lib/select';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { Meldingstype } from '../../../../models/meldinger/meldinger';

interface Props {
    formState: FormState;
    updateDialogType: (dialogType: SendNyMeldingDialogType) => void;
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
            onChange={event => props.updateDialogType((event.target.value as unknown) as SendNyMeldingDialogType)}
        >
            <option value={Meldingstype.SAMTALEREFERAT_TELEFON}>Samtalereferat telefon</option>
            <option value={Meldingstype.SAMTALEREFERAT_OPPMOTE}>Samtalereferat oppmøte</option>
            <option value={Meldingstype.SPORSMAL_SKRIFTLIG}>Spørsmål til bruker</option>
        </StyledSelect>
    );
}

export default VelgDialogType;
