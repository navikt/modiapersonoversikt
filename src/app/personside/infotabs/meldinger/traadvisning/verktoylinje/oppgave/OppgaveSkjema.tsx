import React, { FormEvent, useState } from 'react';
import {
    Ansatt,
    Enhet,
    GsakTema,
    GsakTemaOppgavetype,
    GsakTemaUnderkategori
} from '../../../../../../../models/meldinger/oppgave';
import { OppgaveSkjemaElementer } from './OppgaveSkjemaElementer';
import { lagOppgaveRequest } from './byggRequest';
import { OppgaveProps, OppgaveSkjemaForm, OppgaveSkjemaProps } from './oppgaveInterfaces';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../redux/reducers';
import { cache, createCacheKey } from '@nutgaard/use-fetch';
import { apiBaseUri } from '../../../../../../../api/config';
import { post } from '../../../../../../../api/api';
import { Resultat } from '../utils/VisPostResultat';
import { AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';
import { erBehandlet } from '../../../utils/meldingerUtils';
import { Hovedknapp } from 'nav-frontend-knapper';
import { getValidOppgaveSkjemaState, validerOppgaveSkjema } from './oppgaveSkjemaValidator';
import { ValideringsResultat } from '../../../../../../../utils/forms/FormValidator';
import { useAppState } from '../../../../../../../utils/customHooks';

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

function populerCacheMedTomAnsattliste() {
    cache.put(createCacheKey(`${apiBaseUri}/enheter/_/ansatte`), Promise.resolve(new Response('[]')));
}

function OppgaveSkjema(props: OppgaveProps) {
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const saksbehandlersEnhet = useAppState(state => state.session.valgtEnhetId);
    const [resultat, settResultat] = useState<Resultat | undefined>(undefined);
    const [submitting, setSubmitting] = useState(false);
    const [valgtTema, settValgtTema] = useState<GsakTema | undefined>(undefined);
    const [valgtUnderkategori, settValgtUnderkategori] = useState<GsakTemaUnderkategori | undefined>(undefined);
    const [valgtOppgavetype, settValgtOppgavetype] = useState<GsakTemaOppgavetype | undefined>(undefined);
    const [valgtEnhet, settValgtEnhet] = useState<Enhet | undefined>(undefined);
    const [valgtAnsatt, settValgtAnsatt] = useState<Ansatt | undefined>(undefined);
    const [valgtPrioritet, settValgtPrioritet] = useState<string | undefined>(undefined);
    const [beskrivelse, settBeskrivelse] = useState('');
    const [valideringsResultat, settValideringsresultat] = useState<ValideringsResultat<OppgaveSkjemaForm>>(
        getValidOppgaveSkjemaState()
    );
    populerCacheMedTomAnsattliste();

    function oppdaterStateVedValgtTema(tema: GsakTema | undefined) {
        settValgtTema(tema);
        if (!tema) {
            settValgtUnderkategori(undefined);
            settValgtOppgavetype(undefined);
        }

        const normalOppgaveprioritet = tema?.prioriteter.find(prioritet => prioritet.kode.includes('NORM'));
        settValgtPrioritet(normalOppgaveprioritet?.kode);
    }

    const formState: OppgaveSkjemaForm = {
        valgtTema,
        valgtUnderkategori,
        valgtOppgavetype,
        valgtEnhet,
        valgtAnsatt,
        valgtPrioritet,
        beskrivelse
    };
    const formProps: OppgaveSkjemaProps = {
        state: formState,
        actions: {
            oppdaterStateVedValgtTema,
            settValgtUnderkategori,
            settValgtOppgavetype,
            settValgtEnhet,
            settValgtAnsatt,
            settValgtPrioritet,
            settBeskrivelse
        },
        valideringsResultat: valideringsResultat
    };

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        const valideringsResultat = validerOppgaveSkjema(formState);

        if (valideringsResultat.formErGyldig) {
            setSubmitting(true);
            settValideringsresultat(getValidOppgaveSkjemaState());
            const request = lagOppgaveRequest(
                props,
                formProps,
                valgtBrukersFnr,
                saksbehandlersEnhet || '',
                props.valgtTraad
            );
            post(`${apiBaseUri}/dialogoppgave/opprett`, request, 'OpprettOppgave')
                .then(() => {
                    settResultat(Resultat.VELLYKKET);
                    setSubmitting(false);
                    props.onSuccessCallback && props.onSuccessCallback();
                })
                .catch((error: Error) => {
                    settResultat(Resultat.FEIL);
                    setSubmitting(false);
                });
        } else {
            settValideringsresultat(valideringsResultat);
        }
    };

    if (props.valgtTraad && !erBehandlet(props.valgtTraad)) {
        return (
            <AlertStyling>
                <AlertStripeInfo>Kan ikke opprette oppgave på denne tråden</AlertStripeInfo>
                <Hovedknapp autoFocus={true} onClick={props.lukkPanel}>
                    Lukk
                </Hovedknapp>
            </AlertStyling>
        );
    }

    if (resultat) {
        const alert =
            resultat === Resultat.VELLYKKET ? (
                <AlertStripeSuksess>Oppgave opprettet</AlertStripeSuksess>
            ) : (
                <AlertStripeFeil>Klarte ikke å opprette oppgave</AlertStripeFeil>
            );
        return (
            <AlertStyling>
                {alert}
                <Hovedknapp autoFocus={true} onClick={props.lukkPanel}>
                    Lukk
                </Hovedknapp>
            </AlertStyling>
        );
    }

    const knappetekst = props.onSuccessCallback ? 'Merk som kontorsperret' : 'Opprett oppgave';

    return (
        <SkjemaStyle>
            <form onSubmit={submitHandler}>
                <OppgaveSkjemaElementer {...props} form={formProps} />
                <KnappStyle>
                    <Hovedknapp htmlType="submit" spinner={submitting}>
                        {knappetekst}
                    </Hovedknapp>
                    <LenkeKnapp type="button" onClick={props.lukkPanel}>
                        Avbryt
                    </LenkeKnapp>
                </KnappStyle>
            </form>
        </SkjemaStyle>
    );
}

export default OppgaveSkjema;
