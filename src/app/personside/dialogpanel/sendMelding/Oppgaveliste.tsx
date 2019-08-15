import * as React from 'react';
import Select from 'nav-frontend-skjema/lib/select';
import { OppgavelisteValg } from './SendNyMelding';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { getSaksbehandlerEnhet } from '../../../../utils/loggInfo/saksbehandlersEnhetInfo';

interface Props {
    oppgaveliste: OppgavelisteValg;
    setOppgaveliste: (oppgaveliste: OppgavelisteValg) => void;
}

const StyledSelect = styled(Select)`
    label {
        ${theme.visuallyHidden}
    }
    margin-top: 1rem;
`;

function Oppgaveliste(props: Props) {
    const enhet = getSaksbehandlerEnhet();
    return (
        <StyledSelect
            label="Oppgaveliste"
            value={props.oppgaveliste}
            onChange={event => props.setOppgaveliste(event.target.value as OppgavelisteValg)}
        >
            <option value={OppgavelisteValg.MinListe}>Svar skal til min oppgaveliste</option>
            <option value={OppgavelisteValg.EnhetensListe}>Svar skal til {enhet} sin oppgaveliste</option>
        </StyledSelect>
    );
}

export default Oppgaveliste;
