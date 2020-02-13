import React, { useRef, useState } from 'react';
import styled from 'styled-components/macro';
import { apiBaseUri } from '../../../../../../../api/config';
import { post } from '../../../../../../../api/api';
import { AlertStripeAdvarsel, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { useAppState, useFocusOnMount } from '../../../../../../../utils/customHooks';
import { usePostResource } from '../../../../../../../rest/consumer/usePostResource';
import { isFinishedPosting } from '../../../../../../../rest/utils/postResource';
import { loggError, loggEvent } from '../../../../../../../utils/logger/frontendLogger';
import { Textarea } from 'nav-frontend-skjema';
import theme from '../../../../../../../styles/personOversiktTheme';
import { Element } from 'nav-frontend-typografi';
import { useDispatch } from 'react-redux';

const StyledAlert = styled.div`
    margin: 1rem 0rem;
`;

const StyledArticle = styled.article`
    border-bottom: ${theme.border.skille};
    padding-bottom: 1rem;
    margin-bottom: 2rem;
`;

function AvsluttGosysOppgaveSkjema() {
    const saksbehandlersEnhet = useAppState(state => state.session.valgtEnhetId);
    const plukkOppgaveResource = usePostResource(resources => resources.plukkNyeOppgaver);
    const [gosysBeskrivelse, setGosysBeskrivelse] = useState('Henvendelse lest og vurdert i Modia.');
    const [submitting, setSubmitting] = useState(false);
    const [avsluttOppgaveSuksess, setAvsluttOppgaveSuksess] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const oppgaveFraGosys =
        isFinishedPosting(plukkOppgaveResource) && plukkOppgaveResource.response.find(it => it.fraGosys);
    const ref = useRef<HTMLElement>(null);
    useFocusOnMount(ref);

    const handleOppgaveFraGosys = () => {
        if (submitting) {
            return;
        }
        setSubmitting(true);
        if (oppgaveFraGosys) {
            const request = {
                fnr: oppgaveFraGosys.fødselsnummer,
                oppgaveid: oppgaveFraGosys.oppgaveId,
                beskrivelse: gosysBeskrivelse,
                saksbehandlerValgtEnhet: saksbehandlersEnhet
            };
            post(`${apiBaseUri}/dialogmerking/avsluttgosysoppgave`, request, 'Avslutt-Oppgave-Fra-Gosys')
                .then(() => {
                    setAvsluttOppgaveSuksess(true);
                    loggEvent('AvsluttGosysOppgaveFraUrl', 'AvsluttOppgaveskjema');
                    dispatch(plukkOppgaveResource.actions.reset);
                })
                .catch(() => {
                    setError(true);
                    loggError(new Error('AvslutteGosysOppgave'), 'Oppgave');
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

    if (!oppgaveFraGosys) {
        return null;
    }
    return (
        <StyledArticle ref={ref}>
            <Element>Avslutt oppgave</Element>
            <Textarea
                label={'Beskrivelse'}
                value={gosysBeskrivelse}
                maxLength={0}
                onChange={e => setGosysBeskrivelse((e as React.KeyboardEvent<HTMLTextAreaElement>).currentTarget.value)}
            />
            <Hovedknapp onClick={handleOppgaveFraGosys} spinner={submitting}>
                Avslutt oppgave
            </Hovedknapp>
        </StyledArticle>
    );
}

export default AvsluttGosysOppgaveSkjema;
