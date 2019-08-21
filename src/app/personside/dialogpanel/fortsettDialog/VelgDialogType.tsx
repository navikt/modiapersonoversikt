import * as React from 'react';
import Select from 'nav-frontend-skjema/lib/select';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { Meldingstype } from '../../../../models/meldinger/meldinger';
import { FortsettDialogState, FortsettDialogType } from './FortsettDialog';

interface Props {
    formState: FortsettDialogState;
    updateDialogType: (dialogType: FortsettDialogType) => void;
    erTilknyttetOppgave: boolean;
}

const StyledSelect = styled(Select)`
    label {
        ${theme.visuallyHidden}
    }
`;

function VelgDialogType(props: Props) {
    return (
        <div>
            <StyledSelect
                label="Velg dialogtype"
                value={props.formState.dialogType}
                onChange={event => props.updateDialogType((event.target.value as unknown) as FortsettDialogType)}
            >
                <option value={Meldingstype.SVAR_SKRIFTLIG}>Svar</option>
                <option value={Meldingstype.SPORSMAL_MODIA_UTGAAENDE}>Spørsmål</option>
                {props.erTilknyttetOppgave && <option value={Meldingstype.DELVIS_SVAR_SKRIFTLIG}>Delsvar</option>}
                <option value={Meldingstype.SVAR_TELEFON}>Telefon</option>
                <option value={Meldingstype.SVAR_OPPMOTE}>Oppmøte</option>
            </StyledSelect>
        </div>
    );
}

export default VelgDialogType;
