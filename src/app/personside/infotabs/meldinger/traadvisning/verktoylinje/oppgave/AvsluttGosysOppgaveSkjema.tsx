import React, { useRef, useState } from 'react';
import styled from 'styled-components/macro';
import { apiBaseUri } from '../../../../../../../api/config';
import { post } from '../../../../../../../api/api';
import { AlertStripeAdvarsel, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { useAppState, useFocusOnMount } from '../../../../../../../utils/customHooks';
import { Textarea } from 'nav-frontend-skjema';
import theme from '../../../../../../../styles/personOversiktTheme';
import { Element } from 'nav-frontend-typografi';
import { useDispatch } from 'react-redux';
import { AvsluttGosysOppgaveRequest } from '../../../../../../../models/meldinger/merk';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { useRestResource } from '../../../../../../../rest/consumer/useRestResource';
import { hasData } from '../../../../../../../rest/utils/restResource';

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
    const dispatch = useDispatch();
    const ref = useRef<HTMLElement>(null);
    const saksbehandlersEnhet = useAppState(state => state.session.valgtEnhetId);
    const tildelteOppgaverResource = useRestResource(resources => resources.tildelteOppgaver);
    const [gosysBeskrivelse, setGosysBeskrivelse] = useState('Henvendelse lest og vurdert i Modia.');
    const [submitting, setSubmitting] = useState(false);
    const [avsluttOppgaveSuksess, setAvsluttOppgaveSuksess] = useState(false);
    const [error, setError] = useState(false);
    const harOppgaveTilknyttetTrad =
        hasData(tildelteOppgaverResource.resource) &&
        tildelteOppgaverResource.resource.data.find(it => it.traadId === props.valgtTraad.traadId);

    useFocusOnMount(ref);

    const handleSubmit = () => {
        if (submitting) {
            return;
        }
        setSubmitting(true);
        if (harOppgaveTilknyttetTrad) {
            const request: AvsluttGosysOppgaveRequest = {
                fnr: harOppgaveTilknyttetTrad.fødselsnummer,
                oppgaveid: harOppgaveTilknyttetTrad.oppgaveId,
                beskrivelse: gosysBeskrivelse,
                saksbehandlerValgtEnhet: saksbehandlersEnhet
            };
            post(`${apiBaseUri}/dialogmerking/avsluttgosysoppgave`, request, 'Avslutt-Oppgave-Fra-Gosys')
                .then(() => {
                    setAvsluttOppgaveSuksess(true);
                    dispatch(tildelteOppgaverResource.actions.reset);
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
            <Element>Avslutt oppgave</Element>
            <Textarea
                label={'Beskrivelse'}
                value={gosysBeskrivelse}
                maxLength={0}
                onChange={e => setGosysBeskrivelse(e.currentTarget.value)}
            />
            <Hovedknapp onClick={handleSubmit} spinner={submitting}>
                Avslutt oppgave
            </Hovedknapp>
        </StyledArticle>
    );
}

export default AvsluttGosysOppgaveSkjema;
