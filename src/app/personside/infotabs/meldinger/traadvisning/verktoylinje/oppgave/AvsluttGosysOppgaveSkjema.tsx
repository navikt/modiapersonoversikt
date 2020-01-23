import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { apiBaseUri } from '../../../../../../../api/config';
import { post } from '../../../../../../../api/api';
import { AlertStripeAdvarsel, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { useAppState } from '../../../../../../../utils/customHooks';
import { usePostResource } from '../../../../../../../rest/consumer/usePostResource';
import { isFinishedPosting } from '../../../../../../../rest/utils/postResource';
import { loggError, loggEvent } from '../../../../../../../utils/frontendLogger';
import { Textarea } from 'nav-frontend-skjema';
import theme from '../../../../../../../styles/personOversiktTheme';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Element } from 'nav-frontend-typografi';
import { useDispatch } from 'react-redux';

const StyledAlert = styled.div`
    margin: 1rem 0rem;
`;

const StyledAvsluttOppgavePanel = styled(EkspanderbartpanelBase)`
    .ekspanderbartPanel__hode,
    .ekspanderbartPanel__innhold {
        padding: 0.5rem 0.5rem;
    }
    border: ${theme.border.skilleSvak};
    padding: 0.5rem;
    margin-bottom: 2rem;
`;

function AvsluttGosysOppgaveSkjema() {
    const saksbehandlersEnhet = useAppState(state => state.session.valgtEnhetId);
    const plukkOppgaveResource = usePostResource(resources => resources.plukkNyeOppgaver);
    const [gosysBeskrivelse, setGosysBeskrivelse] = useState('Henvendelse lest og besvart i Modia.');
    const [submitting, setSubmitting] = useState(false);
    const [avsluttOppgaveSuksess, setAvsluttOppgaveSuksess] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const oppgaveFraGosys =
        isFinishedPosting(plukkOppgaveResource) && plukkOppgaveResource.response.find(it => it.fraGosys);

    const handleOppgaveFraGosys = () => {
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
                    setSubmitting(false);
                    setAvsluttOppgaveSuksess(true);
                    loggEvent('AvsluttGosysOppgaveFraUrl', 'AvsluttOppgaveskjema');
                })
                .then(() => {
                    dispatch(plukkOppgaveResource.actions.reset);
                })
                .catch(() => {
                    setError(true);
                    loggError(new Error('AvslutteGosysOppgave'), 'Oppgave');
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

    return (
        <>
            {oppgaveFraGosys && (
                <StyledAvsluttOppgavePanel apen={true} heading={<Element>Avslutt oppgave fra GOSYS</Element>}>
                    <>
                        <Textarea
                            label={'Beskrivelse'}
                            value={gosysBeskrivelse}
                            maxLength={0}
                            onChange={e =>
                                setGosysBeskrivelse((e as React.KeyboardEvent<HTMLTextAreaElement>).currentTarget.value)
                            }
                        />
                        <Hovedknapp onClick={() => handleOppgaveFraGosys()} spinner={submitting}>
                            Avslutt oppgave
                        </Hovedknapp>
                    </>
                </StyledAvsluttOppgavePanel>
            )}
        </>
    );
}

export default AvsluttGosysOppgaveSkjema;
