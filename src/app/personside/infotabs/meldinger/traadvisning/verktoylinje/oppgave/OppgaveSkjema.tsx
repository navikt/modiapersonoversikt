import React, { FormEvent, useState } from 'react';
import {
    Ansatt,
    Enhet,
    GsakTema,
    GsakTemaOppgavetype,
    GsakTemaUnderkategori,
    OppgavePrioritet
} from '../../../../../../../models/meldinger/oppgave';
import { OppgaveSkjemaElementer } from './OppgaveSkjemaElementer';
import { lagOppgaveRequest } from './byggRequest';
import { OppgaveProps, OppgaveSkjemaProps } from './oppgaveInterfaces';
import styled from 'styled-components';
import theme from '../../../../../../../styles/personOversiktTheme';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../redux/reducers';
import { cache, createCacheKey } from '@nutgaard/use-fetch';
import { apiBaseUri } from '../../../../../../../api/config';
import { post } from '../../../../../../../api/api';
import VisPostResultat, { Resultat } from '../utils/VisPostResultat';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { loggError } from '../../../../../../../utils/frontendLogger';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';
import { erBehandlet } from '../../../utils/meldingerUtils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';

const ValideringsfeilStyle = styled.div`
    padding-top: ${theme.margin.layout};
    color: #d0021b;
`;

const AlertStyling = styled.div`
    > * {
        margin-top: 1rem;
    }
`;

const SkjemaStyle = styled.div`
    .inputPanelGruppe__inner {
        display: flex;
        > * {
            flex-grow: 1;
        }
    }
`;

const KnappStyle = styled.div`
    display: flex;
    justify-content: space-between;
    button {
        margin: 0;
    }
`;

function skjemavalidering(props: OppgaveSkjemaProps): string | undefined {
    const tommeKomponenter = [];

    if (!props.state.valgtTema) {
        tommeKomponenter.push('Tema');
    }

    if (!props.state.valgtOppgavetype) {
        tommeKomponenter.push('Oppgavetype');
    }

    if (!props.state.valgtPrioritet) {
        tommeKomponenter.push('Prioritet');
    }

    if (!props.state.beskrivelse) {
        tommeKomponenter.push('Beskrivelse');
    }

    if (!props.state.valgtEnhet) {
        tommeKomponenter.push('Enhet');
    }

    if (!props.state.valgtAnsatt) {
        tommeKomponenter.push('Ansatt');
    }

    if (tommeKomponenter.length > 0) {
        return 'Følgende felt er ikke satt: ' + tommeKomponenter.join(', ');
    }

    return undefined;
}

function populerCacheMedTomAnsattliste() {
    cache.put(createCacheKey(`${apiBaseUri}/enheter/_/ansatte`), Promise.resolve(new Response('[]')));
}

function OppgaveSkjema(props: OppgaveProps) {
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const [resultat, settResultat] = useState<Resultat | undefined>(undefined);
    const [submitting, setSubmitting] = useState(false);
    const [valgtTema, settValgtTema] = useState<GsakTema | undefined>(undefined);
    const [valgtUnderkategori, settValgtUnderkategori] = useState<GsakTemaUnderkategori | undefined>(undefined);
    const [valgtOppgavetype, settValgtOppgavetype] = useState<GsakTemaOppgavetype | undefined>(undefined);
    const [valgtEnhet, settValgtEnhet] = useState<Enhet | undefined>(undefined);
    const [valgtAnsatt, settValgtAnsatt] = useState<Ansatt | undefined>(undefined);
    const [valgtPrioritet, settValgtPrioritet] = useState(OppgavePrioritet.NORM);
    const [beskrivelse, settBeskrivelse] = useState('');
    const [valideringsfeil, settValideringsfeil] = useState<string | undefined>(undefined);

    populerCacheMedTomAnsattliste();

    function oppdaterStateVedValgtTema(tema: GsakTema | undefined) {
        settValgtTema(tema);
        if (!tema) {
            settValgtUnderkategori(undefined);
            settValgtOppgavetype(undefined);
        }
    }

    const formState: OppgaveSkjemaProps = {
        state: {
            valgtTema,
            valgtUnderkategori,
            valgtOppgavetype,
            valgtEnhet,
            valgtAnsatt,
            valgtPrioritet,
            beskrivelse
        },
        actions: {
            oppdaterStateVedValgtTema,
            settValgtUnderkategori,
            settValgtOppgavetype,
            settValgtEnhet,
            settValgtAnsatt,
            settValgtPrioritet,
            settBeskrivelse
        }
    };

    const submitHandler = (event: FormEvent) => {
        setSubmitting(true);
        event.preventDefault();
        const harSkjemaValideringsfeil = skjemavalidering(formState);
        settValideringsfeil(harSkjemaValideringsfeil);
        if (!harSkjemaValideringsfeil) {
            const request = lagOppgaveRequest(props, formState, valgtBrukersFnr, props.valgtTraad);
            post(`${apiBaseUri}/dialogoppgave/opprett`, request)
                .then(() => {
                    settResultat(Resultat.VELLYKKET);
                    setSubmitting(false);
                })
                .catch((error: Error) => {
                    settResultat(Resultat.FEIL);
                    setSubmitting(false);
                    loggError(error, 'Klarte ikke opprette oppgave');
                });
            if (props.kontorsperreFunksjon) {
                props.kontorsperreFunksjon();
            }
        }
    };

    if (props.valgtTraad && !erBehandlet(props.valgtTraad)) {
        return (
            <AlertStyling>
                <AlertStripeInfo>Kan ikke opprette oppgave på denne tråden</AlertStripeInfo>
                <Hovedknapp onClick={props.lukkPanel}>Lukk</Hovedknapp>
            </AlertStyling>
        );
    }

    if (resultat) {
        const alert =
            resultat === Resultat.VELLYKKET ? (
                <AlertStripeSuksess>Tråd merket</AlertStripeSuksess>
            ) : (
                <AlertStripeFeil>Klarte ikke å merke tråd</AlertStripeFeil>
            );
        return (
            <AlertStyling>
                {alert}
                <Hovedknapp onClick={props.lukkPanel}>Lukk</Hovedknapp>
            </AlertStyling>
        );
    }

    return (
        <SkjemaStyle>
            <form onSubmit={submitHandler}>
                <OppgaveSkjemaElementer {...props} form={formState} />
                <KnappStyle>
                    <Hovedknapp htmlType="submit" spinner={submitting} autoDisableVedSpinner>
                        Send
                    </Hovedknapp>
                    <LenkeKnapp type="button" onClick={props.lukkPanel}>
                        Avbryt
                    </LenkeKnapp>
                </KnappStyle>
            </form>
            <VisPostResultat resultat={resultat} />
            <ValideringsfeilStyle aria-live={'polite'}>{valideringsfeil}</ValideringsfeilStyle>
        </SkjemaStyle>
    );
}

export default OppgaveSkjema;
