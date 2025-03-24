import { Hovedknapp } from 'nav-frontend-knapper';
import { Element } from 'nav-frontend-typografi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { post } from '../../../../../../../api/api';
import { apiBaseUri } from '../../../../../../../api/config';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';
import FormErrorSummary from '../../../../../../../components/form/FormErrorSummary';
import { useValgtenhet } from '../../../../../../../context/valgtenhet-state';
import type { AppState } from '../../../../../../../redux/reducers';
import { erBehandlet } from '../../../utils/meldingerUtils';
import { Resultat } from '../utils/VisPostResultat';
import AvsluttGosysOppgaveSkjema from './AvsluttGosysOppgaveSkjema';
import OppgaveSkjemaEnhetAnsatt from './OppgaveSkjemaDeler/OppgaveSkjemaEnhetAnsatt';
import OppgaveSkjemaErBehandlet from './OppgaveSkjemaDeler/OppgaveSkjemaErBehandlet';
import OppgaveSkjemaPrioritetBeskrivelse from './OppgaveSkjemaDeler/OppgaveSkjemaPrioritetBeskrivelse';
import OppgaveSkjemaResultat from './OppgaveSkjemaDeler/OppgaveSkjemaResultat';
import OppgaveSkjemaTemaGjelderTypeOppgave from './OppgaveSkjemaDeler/OppgaveSkjemaTemaGjelderTypeOppgave';
import { lagOppgaveRequest } from './byggRequest';
import type { OppgaveProps, OppgaveSkjemaForm } from './oppgaveInterfaces';
import { resolverOppgaveSkjema } from './oppgaveSkjemaUtils';
import { useNormalPrioritet } from './useNormalPrioritet';

export const AlertStyling = styled.div`
  > * {
    margin-top: 1rem;
  }
`;

const SkjemaStyle = styled.div`
  padding-top: 1rem;
  .inputPanelGruppe__inner {
    display: flex;
    > * {
      flex-grow: 1;
    }
  }
  label {
    font-weight: 600;
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

function OppgaveSkjema(props: OppgaveProps) {
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const saksbehandlersEnhet = useValgtenhet().enhetId;
    const [resultat, settResultat] = useState<Resultat>();
    const form = useForm<OppgaveSkjemaForm>({
        resolver: resolverOppgaveSkjema,
        mode: 'onChange',
        shouldFocusError: false
    });

    const valgtTema = useNormalPrioritet(props.gsakTema, form);

    //biome-ignore lint/suspicious/noExplicitAny: init biome
    function submitHandler(values: OppgaveSkjemaForm): Promise<any> {
        const request = lagOppgaveRequest(
            values,
            valgtBrukersFnr,
            saksbehandlersEnhet || '',
            props.gsakTema,
            props.valgtTraad
        );
        return (
            post(`${apiBaseUri}/dialogoppgave/v2/opprett`, request, 'OpprettOppgave')
                .then(() => {
                    settResultat(Resultat.VELLYKKET);
                    if (props.onSuccessCallback) props.onSuccessCallback();
                })
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .catch((_error: Error) => {
                    settResultat(Resultat.FEIL);
                })
        );
    }

    if (props.valgtTraad && !erBehandlet(props.valgtTraad)) {
        <OppgaveSkjemaErBehandlet lukkPanel={props.lukkPanel} />;
    }

    if (resultat) {
        return <OppgaveSkjemaResultat resultat={resultat} lukkPanel={props.lukkPanel} />;
    }

    const knappetekst = props.onSuccessCallback ? 'Merk som kontorsperret' : 'Opprett oppgave';
    return (
        <SkjemaStyle>
            <AvsluttGosysOppgaveSkjema valgtTraad={props.valgtTraad} />
            <form onSubmit={form.handleSubmit(submitHandler)}>
                <FormErrorSummary form={form} tittel={'For å kunne søke må du rett opp i følgende:'} />
                <Element>Opprett oppgave</Element>
                <OppgaveSkjemaTemaGjelderTypeOppgave form={form} gsakTema={props.gsakTema} valgtTema={valgtTema} />
                <OppgaveSkjemaEnhetAnsatt form={form} saksbehandlersEnhet={saksbehandlersEnhet} />
                <OppgaveSkjemaPrioritetBeskrivelse form={form} valgtTema={valgtTema} />
                <KnappStyle>
                    <Hovedknapp htmlType="submit" spinner={form.formState.isSubmitting} autoDisableVedSpinner>
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
