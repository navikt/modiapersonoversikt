import { GsakTema } from '../../../../../../../models/meldinger/oppgave';
import { ChangeEvent, useEffect } from 'react';
import { Formstate } from '@nutgaard/use-formstate';
import { OppgaveSkjemaForm, SkjermetOppgaveSkjemaForm } from './oppgaveInterfaces';

export function useNormalPrioritet(
    state: Formstate<OppgaveSkjemaForm | SkjermetOppgaveSkjemaForm>,
    valgtTema?: GsakTema
) {
    const prioritetFieldName = state.fields.valgtPrioritet.input.name;
    const prioritetOnChange = state.fields.valgtPrioritet.input.onChange;
    useEffect(() => {
        const normalOppgaveprioritet = valgtTema?.prioriteter.find(prioritet => prioritet.kode.includes('NORM'));
        if (normalOppgaveprioritet) {
            prioritetOnChange(changeEvent(prioritetFieldName, normalOppgaveprioritet.kode));
        }
    }, [valgtTema, prioritetFieldName, prioritetOnChange]);
}

export function changeEvent(name: string, value: string): ChangeEvent {
    return ({ target: { name: name, value: value } } as unknown) as ChangeEvent;
}
