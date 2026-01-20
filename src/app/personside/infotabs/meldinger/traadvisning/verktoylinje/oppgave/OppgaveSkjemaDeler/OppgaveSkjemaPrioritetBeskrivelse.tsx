import type { Path, UseFormReturn } from 'react-hook-form';
import FormSelect from '../../../../../../../../components/form/FormSelect';
import FormTextarea from '../../../../../../../../components/form/FormTextArea';
import type { GsakTema } from '../../../../../../../../models/meldinger/oppgave';
import type { OppgaveSkjemaDelteFelter } from '../oppgaveInterfaces';
import { Prioriteter } from '../SkjemaElementOptions';

interface Props<F extends OppgaveSkjemaDelteFelter> {
    form: UseFormReturn<F>;
    valgtTema?: GsakTema;
}

function OppgaveSkjemaPrioritetBeskrivelse<F extends OppgaveSkjemaDelteFelter>({ form, valgtTema }: Props<F>) {
    return (
        <>
            <FormSelect form={form} name={'valgtPrioritet' as Path<F>} id="valgtPrioritet" label="Velg prioritet">
                <Prioriteter valgtGsakTema={valgtTema} />
            </FormSelect>
            <FormTextarea
                form={form}
                name={'beskrivelse' as Path<F>}
                id="beskrivelse"
                maxLength={0}
                label="Beskrivelse"
            />
        </>
    );
}

export default OppgaveSkjemaPrioritetBeskrivelse;
