import * as React from 'react';
import formstateFactory from '@nutgaard/use-formstate';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Undertekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import styled from 'styled-components/macro';
import { Select } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';
import innstillingerResource, {
    Innstillinger,
    SaksbehandlerInnstillinger
} from '../../../rest/resources/innstillingerResource';

const ModalContent = styled.div`
    min-height: 20rem;
`;
const Label = styled.span`
    display: flex;
    }
    .popover {
      max-width: 30rem;
    }
    .hjelpetekst__apneknapp {
        margin-left: 0.5rem;
    }
`;

const defaultInnstillinger: Innstillinger = {
    defaultTagsStandardtekster: 'na',
    defaultOppgaveDestinasjon: 'MinListe'
};
const useFormState = formstateFactory<Innstillinger>({
    defaultTagsStandardtekster: () => undefined,
    defaultOppgaveDestinasjon: () => undefined
});

const AutomatiskeTagsLabel = (
    <Label>
        <b>Automatiske tags</b>
        <Hjelpetekst id="AutomatiskeTagsLabel" type={PopoverOrientering.UnderVenstre}>
            Vil legge til henholdsvis #sto og #samref automatisk når man bruker standardtekstene-søket (alt + c).
        </Hjelpetekst>
    </Label>
);
const OppgaveDestinasjonLabel = (
    <Label>
        <b>Destinasjon for oppgave ved svar</b>
        <Hjelpetekst id="OppgaveDestinasjonLabel" type={PopoverOrientering.UnderVenstre}>
            Setter standardvalget for hvor oppgaver skal sendes når bruker svarer. Det vil fortsatt være mulig å
            overstyre dette ved utsending.
        </Hjelpetekst>
    </Label>
);

function getFormState(innstillinger: Innstillinger): Innstillinger {
    return {
        ...defaultInnstillinger,
        ...innstillinger
    };
}

interface Props {
    innstillinger: SaksbehandlerInnstillinger;
}
function InnstillingerModalForm(props: Props) {
    const { innstillinger } = props;
    const [innsendingFeilet, settInnsendingFeilet] = React.useState<boolean>(false);
    const state = useFormState(getFormState(innstillinger.innstillinger));

    const onSubmitHandler = (nyeInnstillinger: Innstillinger): Promise<any> => {
        return innstillingerResource
            .update({ ...innstillinger.innstillinger, ...nyeInnstillinger })
            .then((oppdaterteInnstillinger) => {
                state.reinitialize(oppdaterteInnstillinger.innstillinger);
                settInnsendingFeilet(false);
            })
            .catch((err: unknown) => {
                console.error(err);
                settInnsendingFeilet(true);
            });
    };

    return (
        <form onSubmit={state.onSubmit(onSubmitHandler)}>
            <ModalContent>
                <Undertekst className="blokk-xxs">
                    Sist oppdatert: {new Date(props.innstillinger.sistLagret).toLocaleString('nb')}
                </Undertekst>
                <Select
                    className="blokk-s"
                    label={AutomatiskeTagsLabel}
                    {...state.fields.defaultTagsStandardtekster.input}
                >
                    <option value="na">Ikke valgt</option>
                    <option value="sto">Skriv til oss (#sto)</option>
                    <option value="samref">Samtalereferat (#samref)</option>
                </Select>
                <Select
                    className="blokk-s"
                    label={OppgaveDestinasjonLabel}
                    {...state.fields.defaultOppgaveDestinasjon.input}
                >
                    <option value="MinListe">Svar skal til min oppgaveliste hos valgt enhet</option>
                    <option value="Enhetensliste">Svar skal til valgt enhet sin oppgaveliste</option>
                </Select>
            </ModalContent>
            {innsendingFeilet && (
                <AlertStripeFeil className="blokk-xxs">Lagring av innstillinger feilet.</AlertStripeFeil>
            )}
            <Hovedknapp htmlType="submit" disabled={state.pristine} spinner={state.submitting} autoDisableVedSpinner>
                Lagre
            </Hovedknapp>
        </form>
    );
}

export default InnstillingerModalForm;
