import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { FormState } from 'react-hook-form';
import { GsakTema } from '../../../../../../../../models/meldinger/oppgave';
import { UseOppgaveSkjemaRegister } from '../oppgaveSkjemaTyper';
import { OppgaveSkjemaDelteFelter } from './../oppgaveInterfaces';
import { OppgavetypeOptions, TemaOptions, UnderkategoriOptions } from './../SkjemaElementOptions';
import { feilmeldingReactHookForm } from './../validering';

interface Props {
    formState: FormState<OppgaveSkjemaDelteFelter>;
    register: UseOppgaveSkjemaRegister<OppgaveSkjemaDelteFelter>;
    gsakTema: GsakTema[];
    valgtTema?: GsakTema;
}

function OppgaveSkjemaTemaGjelderTypeOppgave({ formState, gsakTema, valgtTema, register }: Props) {
    const selectors: {
        id: keyof OppgaveSkjemaDelteFelter;
        label: string;
        autoFocus?: boolean;
        child: JSX.Element;
    }[] = [
        {
            id: 'valgtTema',
            label: 'Tema',
            autoFocus: true,
            child: <TemaOptions gsakTema={gsakTema} />
        },
        {
            id: 'valgtUnderkategori',
            label: 'Gjelder',
            child: <UnderkategoriOptions valgtGsakTema={valgtTema} />
        },
        {
            id: 'valgtOppgavetype',
            label: 'Type oppgave',
            child: <OppgavetypeOptions valgtGsakTema={valgtTema} />
        }
    ];

    return (
        <>
            {selectors.map((selector) => {
                const { ref: selectRef, ...rest } = register(selector.id);
                return (
                    <Select
                        key={selector.id as string}
                        id={String(selector.id)}
                        label={selector.label}
                        autoFocus={!!selector.autoFocus}
                        selectRef={selectRef as any}
                        {...rest}
                        onChange={(e) => console.log(e.currentTarget.value)}
                        feil={feilmeldingReactHookForm(selector.id, formState)}
                    >
                        {selector.child}
                    </Select>
                );
            })}
        </>
    );
}

export default OppgaveSkjemaTemaGjelderTypeOppgave;
