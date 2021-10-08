import * as React from 'react';
import Select from 'nav-frontend-skjema/lib/select';
import { OppgavelisteValg } from './SendNyMelding';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import { useAppState, useJustOnceEffect } from '../../../../utils/customHooks';
import { selectValgtEnhet } from '../../../../redux/session/session';
import useFeatureToggle from '../../../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../../../components/featureToggle/toggleIDs';

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
    const enheter = useRestResource(resources => resources.saksbehandlersEnheter);
    const valgtEnhetId = useAppState(selectValgtEnhet);
    const usingSFBackend = useFeatureToggle(FeatureToggles.BrukSalesforceDialoger).isOn ?? false;
    useJustOnceEffect(
        done => {
            if (usingSFBackend) {
                props.setOppgaveliste(OppgavelisteValg.EnhetensListe);
                done();
            }
        },
        [usingSFBackend, props.setOppgaveliste]
    );

    const valgtEnhet = enheter.data?.enhetliste.find(enhet => enhet.enhetId === valgtEnhetId);
    const enhet = valgtEnhet?.navn ?? 'valgt enhet';

    return (
        <StyledSelect
            label="Oppgaveliste"
            value={props.oppgaveliste}
            onChange={event => props.setOppgaveliste(event.target.value as OppgavelisteValg)}
        >
            <option value={OppgavelisteValg.MinListe} disabled={usingSFBackend}>
                Svar skal til min oppgaveliste hos {enhet}
            </option>
            <option value={OppgavelisteValg.EnhetensListe}>Svar skal til {enhet} sin oppgaveliste</option>
        </StyledSelect>
    );
}

export default Oppgaveliste;
