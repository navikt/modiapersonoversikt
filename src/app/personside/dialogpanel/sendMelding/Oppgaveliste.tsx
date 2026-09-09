import Select from 'nav-frontend-skjema/lib/select';
import { useDisableDialog } from 'src/lib/state/dialog';
import styled from 'styled-components';
import { useValgtenhet } from '../../../../context/valgtenhet-state';
import saksbehandlersEnheter from '../../../../rest/resources/saksbehandlersEnheterResource';
import theme from '../../../../styles/personOversiktTheme';
import { OppgavelisteValg } from './SendNyMelding';

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
    const enheter = enheterResource.data?.enhetliste ?? [];
    const valgtEnhetId = useValgtenhet().enhetId;

    const valgtEnhet = enheter.find((enhet) => enhet.enhetId === valgtEnhetId);
    const enhet = valgtEnhet?.navn ?? 'valgt enhet';

    const disableDialog = useDisableDialog();

    return (
        <StyledSelect
            disabled={disableDialog}
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
