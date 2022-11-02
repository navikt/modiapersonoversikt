import { Select, Textarea } from 'nav-frontend-skjema';
import React from 'react';
import { FormState } from 'react-hook-form';
import { GsakTema } from '../../../../../../../../models/meldinger/oppgave';
import { OppgaveSkjemaDelteFelter } from '../oppgaveInterfaces';
import { UseOppgaveSkjemaRegister, UseOppgaveSkjemaWatch } from '../oppgaveSkjemaTyper';
import { Prioriteter } from '../SkjemaElementOptions';
import { feilmeldingReactHookForm } from '../validering';

interface Props {
    formState: FormState<OppgaveSkjemaDelteFelter>;
    register: UseOppgaveSkjemaRegister<OppgaveSkjemaDelteFelter>;
    watch: UseOppgaveSkjemaWatch<OppgaveSkjemaDelteFelter>;
    valgtTema?: GsakTema;
}

const OppgaveSkjemaPrioritetBeskrivelse: React.FC<Props> = ({ formState, register, valgtTema, watch }) => {
    const { ref: selectRef, ...selectRest } = register('valgtPrioritet');
    const { ref: textareaRef, ...textAreaRest } = register('beskrivelse');

    const beskrivelseValue = watch('beskrivelse');

    return (
        <>
            <Select
                id="valgtPrioritet"
                label="Velg prioritet"
                selectRef={selectRef as any}
                feil={feilmeldingReactHookForm('valgtPrioritet', formState)}
                {...selectRest}
            >
                <Prioriteter valgtGsakTema={valgtTema} />
            </Select>
            <Textarea
                id="beskrivelse"
                maxLength={0}
                label="Beskrivelse"
                textareaRef={textareaRef}
                feil={feilmeldingReactHookForm('beskrivelse', formState)}
                value={beskrivelseValue ?? ''}
                {...textAreaRest}
            />
        </>
    );
};

export default OppgaveSkjemaPrioritetBeskrivelse;
