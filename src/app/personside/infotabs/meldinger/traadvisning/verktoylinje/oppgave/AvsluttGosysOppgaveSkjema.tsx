import { AlertStripeAdvarsel, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Textarea } from 'nav-frontend-skjema';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { post } from '../../../../../../../api/api';
import { apiBaseUri } from '../../../../../../../api/config';
import { useValgtenhet } from '../../../../../../../context/valgtenhet-state';
import type { Traad } from '../../../../../../../models/meldinger/meldinger';
import type { AvsluttGosysOppgaveRequest } from '../../../../../../../models/meldinger/merk';
import tildelteoppgaver from '../../../../../../../rest/resources/tildelteoppgaverResource';
import theme from '../../../../../../../styles/personOversiktTheme';
import { useFocusOnMount } from '../../../../../../../utils/customHooks';

const StyledAlert = styled.div`
    margin: 1rem 0rem;
`;

const StyledArticle = styled.article`
    border-bottom: ${theme.border.skille};
    padding-bottom: 1rem;
    margin-bottom: 2rem;
`;

interface Props {
    valgtTraad: Traad;
}

function AvsluttGosysOppgaveSkjema(props: Props) {
    const ref = useRef<HTMLElement>(null);
    const saksbehandlersEnhet = useValgtenhet().enhetId;
    const tildelteOppgaverResource = tildelteoppgaver.useFetch();
    const [gosysBeskrivelse, setGosysBeskrivelse] = useState('Henvendelse lest og vurdert i Modia.');
    const [submitting, setSubmitting] = useState(false);
    const [avsluttOppgaveSuksess, setAvsluttOppgaveSuksess] = useState(false);
    const [error, setError] = useState(false);
    const harOppgaveTilknyttetTrad = tildelteOppgaverResource.data?.find(
        (it) => it.traadId === props.valgtTraad.traadId
    );

    useFocusOnMount(ref);

    const handleSubmit = () => {
        if (submitting) {
            return;
        }
        setSubmitting(true);
        if (harOppgaveTilknyttetTrad) {
            const request: AvsluttGosysOppgaveRequest = {
                fnr: harOppgaveTilknyttetTrad.fnr,
                oppgaveid: harOppgaveTilknyttetTrad.oppgaveId,
                beskrivelse: gosysBeskrivelse,
                saksbehandlerValgtEnhet: saksbehandlersEnhet
            };
            post(`${apiBaseUri}/dialogmerking/avsluttgosysoppgave`, request, 'Avslutt-Oppgave-Fra-Gosys')
                .then(() => {
                    setAvsluttOppgaveSuksess(true);
                    tildelteOppgaverResource.refetch();
                })
                .catch(() => {
                    setError(true);
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    };

    if (avsluttOppgaveSuksess) {
        return (
            <StyledAlert>
                <AlertStripeSuksess>Oppgaven ble avsluttet</AlertStripeSuksess>
            </StyledAlert>
        );
    }

    if (error) {
        return (
            <StyledAlert>
                <AlertStripeAdvarsel>Kunne ikke avslutte oppgave</AlertStripeAdvarsel>
            </StyledAlert>
        );
    }

    if (!harOppgaveTilknyttetTrad) {
        return null;
    }
    return (
        <StyledArticle ref={ref}>
            <Ekspanderbartpanel tittel={'Avslutt aktiv oppgave fra GOSYS'} apen={false}>
                <Textarea
                    label={'Beskrivelse'}
                    value={gosysBeskrivelse}
                    maxLength={0}
                    onChange={(e) => setGosysBeskrivelse(e.currentTarget.value)}
                />
                <Hovedknapp onClick={handleSubmit} spinner={submitting}>
                    Avslutt oppgave
                </Hovedknapp>
            </Ekspanderbartpanel>
        </StyledArticle>
    );
}

export default AvsluttGosysOppgaveSkjema;
