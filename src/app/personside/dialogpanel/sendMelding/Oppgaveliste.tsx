import * as React from 'react';
import Select from 'nav-frontend-skjema/lib/select';
import { FormState, OppgavelisteValg } from './SendNyMelding';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';

interface Props {
    state: FormState;
    enhet?: string;
    setOppgaveliste: (oppgaveliste: OppgavelisteValg) => void;
}

const StyledSelect = styled(Select)`
    label {
        ${theme.visuallyHidden}
    }
`;

function Oppgaveliste(props: Props) {
    return (
        <StyledSelect
            label="Oppgaveliste"
            value={props.state.oppgaveListe}
            onChange={event => props.setOppgaveliste(event.target.value as OppgavelisteValg)}
        >
            <option value={OppgavelisteValg.MinListe}>Skal til min oppgaveliste</option>
            <option value={OppgavelisteValg.EnhetensListe}>Skal til {props.enhet} sin oppgaveliste</option>
        </StyledSelect>
    );
}

export default Oppgaveliste;
