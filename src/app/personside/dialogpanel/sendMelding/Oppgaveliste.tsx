import * as React from 'react';
import Select from 'nav-frontend-skjema/lib/select';
import { OppgavelisteValg } from './SendNyMelding';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import saksbehandlersEnheter from '../../../../rest/resources/saksbehandlersEnheterResource';
import { useValgtenhet } from '../../../../context/valgtenhet-state';

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
    const enheterResource = saksbehandlersEnheter.useFetch();
    const enheter = enheterResource.data ? enheterResource.data.enhetliste : [];
    const valgtEnhetId = useValgtenhet().enhetId;

    const valgtEnhet = enheter.find((enhet) => enhet.enhetId === valgtEnhetId);
    const enhet = valgtEnhet?.navn ?? 'valgt enhet';

    return (
        <StyledSelect
            label="Oppgaveliste"
            value={props.oppgaveliste}
            onChange={(event) => props.setOppgaveliste(event.target.value as OppgavelisteValg)}
        >
            <option value={OppgavelisteValg.MinListe}>Svar skal til min oppgaveliste hos {enhet}</option>
            <option value={OppgavelisteValg.EnhetensListe}>Svar skal til {enhet} sin oppgaveliste</option>
        </StyledSelect>
    );
}

export default Oppgaveliste;
