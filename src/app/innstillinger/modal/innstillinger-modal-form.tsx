import * as React from 'react';
import useFormstateFactory from '@nutgaard/use-formstate';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Undertekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import styled from 'styled-components/macro';
import { Select } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';
import { connect } from 'react-redux';
import {
    Innstillinger,
    OkState,
    State as InnstillingerState,
    oppdaterInnstillinger
} from '../../../redux/innstillinger';
import { AsyncDispatch } from '../../../redux/ThunkTypes';

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
    defaultTagsStandardtekster: 'na'
};
const useFormState = useFormstateFactory<Innstillinger>({
    defaultTagsStandardtekster: () => undefined
});

const AutomatiskeTagsLabel = (
    <Label>
        <b>Automatiske tags</b>
        <Hjelpetekst id="AutomatiskeTagsLabel" type={PopoverOrientering.UnderVenstre}>
            Vil legge til henholdsvis #sto og #samref automatisk når man bruker standardtekstene-søket (alt + c).
        </Hjelpetekst>
    </Label>
);

function getFormState(innstillinger: Innstillinger): Innstillinger {
    return {
        ...defaultInnstillinger,
        ...innstillinger
    };
}

interface Props extends ReturnType<typeof mapDispatchToProps> {
    innstillinger: InnstillingerState & OkState;
}
function InnstillingerModalForm(props: Props) {
    const { innstillinger } = props;
    const [innsendingFeilet, settInnsendingFeilet] = React.useState<boolean>(false);
    const state = useFormState(getFormState(innstillinger.data.innstillinger));

    const onSubmitHandler = (nyeInnstillinger: Innstillinger): Promise<any> => {
        return props.actions
            .oppdaterInnstillinger(nyeInnstillinger)
            .then(oppdaterteInnstillinger => {
                state.reinitialize(oppdaterteInnstillinger.innstillinger);
                settInnsendingFeilet(false);
            })
            .catch(() => {
                settInnsendingFeilet(true);
            });
    };

    return (
        <form onSubmit={state.onSubmit(onSubmitHandler)}>
            <ModalContent>
                <Undertekst className="blokk-xxs">
                    Sist oppdatert: {new Date(props.innstillinger.data.sistLagret).toLocaleString('nb')}
                </Undertekst>
                <Select label={AutomatiskeTagsLabel} {...state.fields.defaultTagsStandardtekster.input}>
                    <option value="na">Ikke valgt</option>
                    <option value="sto">Skriv til oss (#sto)</option>
                    <option value="samref">Samtalereferat (#samref)</option>
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

const mapDispatchToProps = (dispatch: AsyncDispatch) => ({
    actions: {
        oppdaterInnstillinger: (innstillinger: Innstillinger) => dispatch(oppdaterInnstillinger(innstillinger))
    }
});

export default connect(null, mapDispatchToProps)(InnstillingerModalForm);
