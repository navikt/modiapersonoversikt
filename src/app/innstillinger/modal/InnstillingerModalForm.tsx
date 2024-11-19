import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Undertekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import styled from 'styled-components';
import innstillingerResource, {
    Innstillinger,
    SaksbehandlerInnstillinger
} from '../../../rest/resources/innstillingerResource';
import { OppgaveDestinasjonLabel } from './InstillingerModalFormLabels';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormSelect from '../../../components/form/FormSelect';

const ModalContent = styled.div`
    min-height: 20rem;
`;

enum INNSTILLINGER_KEYS {
    defaultOppgaveDestinasjon = 'defaultOppgaveDestinasjon'
}

const defaultInnstillinger: { [key in INNSTILLINGER_KEYS]: string } = {
    defaultOppgaveDestinasjon: 'MinListe'
};

interface Props {
    innstillinger: SaksbehandlerInnstillinger;
}
function InnstillingerModalForm({ innstillinger }: Props) {
    const [innsendingFeilet, settInnsendingFeilet] = useState(false);
    const form = useForm<Innstillinger>({
        defaultValues: { ...defaultInnstillinger, ...innstillinger.innstillinger },
        mode: 'onChange'
    });

    const updateinnstillinger = innstillingerResource.useMutation();

    function onSubmitHandler(nyeInnstillinger: Innstillinger): Promise<void> {
        return updateinnstillinger
            .mutateAsync({ ...innstillinger.innstillinger, ...nyeInnstillinger })
            .then((oppdaterteInnstillinger) => {
                form.reset(oppdaterteInnstillinger.innstillinger);
                settInnsendingFeilet(false);
            })
            .catch((err: unknown) => {
                console.error(err);
                settInnsendingFeilet(true);
            });
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <ModalContent>
                <Undertekst className="blokk-xxs">
                    Sist oppdatert: {new Date(innstillinger.sistLagret).toLocaleString('nb')}
                </Undertekst>
                <FormSelect
                    name={INNSTILLINGER_KEYS.defaultOppgaveDestinasjon}
                    form={form}
                    className="blokk-s"
                    label={OppgaveDestinasjonLabel}
                >
                    <option value="MinListe">Svar skal til min oppgaveliste hos valgt enhet</option>
                    <option value="Enhetensliste">Svar skal til valgt enhet sin oppgaveliste</option>
                </FormSelect>
            </ModalContent>
            {innsendingFeilet && (
                <AlertStripeFeil className="blokk-xxs">Lagring av innstillinger feilet.</AlertStripeFeil>
            )}
            <Hovedknapp
                htmlType="submit"
                disabled={!form.formState.isDirty}
                spinner={form.formState.isSubmitting}
                autoDisableVedSpinner
            >
                Lagre
            </Hovedknapp>
        </form>
    );
}

export default InnstillingerModalForm;
