import React, { FormEvent, useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../../../../../../../components/common-styled-components';
import styled from 'styled-components';
import { OppgaveSkjemaElementerSkjermetPerson } from './OppgaveSkjemaElementerSkjermetPerson';
import { OppgaveProps, OppgaveSkjemaForm, SkjermetPersonOppgaveSkjemaProps } from '../oppgaveInterfaces';
import { GsakTema, GsakTemaOppgavetype, GsakTemaUnderkategori } from '../../../../../../../../models/meldinger/oppgave';
import { ValideringsResultat } from '../../../../../../../../utils/forms/FormValidator';
import { getValidOppgaveSkjemaState } from '../oppgaveSkjemaValidator';
import { post } from '../../../../../../../../api/api';
import { apiBaseUri } from '../../../../../../../../api/config';
import { Resultat } from '../../utils/VisPostResultat';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { lagOppgaveRequest } from '../byggRequest';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../../redux/reducers';
import { useAppState } from '../../../../../../../../utils/customHooks';
import { validerOppgaveSkjemaSkjermetPerson } from './oppgaveSkjemaValidatorSkjermetPerson';

const SkjemaStyle = styled.div`
    padding-top: 1rem;
    label {
        margin-bottom: 0.1rem;
    }
    .skjemaelement {
        margin-bottom: 0.7rem;
    }
`;

const KnappStyle = styled.div`
    display: flex;
    justify-content: space-between;
    button {
        margin: 0;
    }
`;

const AlertStyling = styled.div`
    > * {
        margin-top: 1rem;
    }
`;
function OppgaveSkjemaSkjermetPerson(props: OppgaveProps) {
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const saksbehandlersEnhet = useAppState(state => state.session.valgtEnhetId);
    const [submitting, setSubmitting] = useState(false);
    const [valgtTema, settValgtTema] = useState<GsakTema | undefined>(undefined);
    const [valgtUnderkategori, settValgtUnderkategori] = useState<GsakTemaUnderkategori | undefined>(undefined);
    const [valgtOppgavetype, settValgtOppgavetype] = useState<GsakTemaOppgavetype | undefined>(undefined);
    const [valgtPrioritet, settValgtPrioritet] = useState<string | undefined>(undefined);
    const [beskrivelse, settBeskrivelse] = useState('');
    const [resultat, settResultat] = useState<Resultat | undefined>(undefined);
    const [valideringsResultat, settValideringsresultat] = useState<ValideringsResultat<OppgaveSkjemaForm>>(
        getValidOppgaveSkjemaState()
    );

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
        valgtPrioritet,
        beskrivelse
    };
    const formProps: SkjermetPersonOppgaveSkjemaProps = {
        state: formState,
        actions: {
            oppdaterStateVedValgtTema,
            settValgtUnderkategori,
            settValgtOppgavetype,
            settValgtPrioritet,
            settBeskrivelse
        },
        valideringsResultat: valideringsResultat
    };

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();

        if (submitting) {
            return;
        }

        const valideringsResultat = validerOppgaveSkjemaSkjermetPerson(formState);
        if (valideringsResultat.formErGyldig) {
            setSubmitting(true);
            settValideringsresultat(getValidOppgaveSkjemaState());

            const request = lagOppgaveRequest(props, formProps, valgtBrukersFnr, saksbehandlersEnhet || '');

            post(`${apiBaseUri}/`, request, 'OpprettOppgaveSkjermetPerson')
                .then(() => {
                    settResultat(Resultat.VELLYKKET);
                    setSubmitting(false);
                    props.onSuccessCallback && props.onSuccessCallback();
                })
                .catch(() => {
                    settResultat(Resultat.FEIL);
                    setSubmitting(false);
                });
        } else {
            settValideringsresultat(valideringsResultat);
        }
    };

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

    return (
        <SkjemaStyle>
            <form onSubmit={submitHandler}>
                <OppgaveSkjemaElementerSkjermetPerson {...props} form={formProps} />
                <KnappStyle>
                    <Hovedknapp htmlType="submit" spinner={submitting}>
                        Opprett Oppgave
                    </Hovedknapp>
                    <LenkeKnapp type="button" onClick={props.lukkPanel}>
                        Avbryt
                    </LenkeKnapp>
                </KnappStyle>
            </form>
        </SkjemaStyle>
    );
}

export default OppgaveSkjemaSkjermetPerson;
