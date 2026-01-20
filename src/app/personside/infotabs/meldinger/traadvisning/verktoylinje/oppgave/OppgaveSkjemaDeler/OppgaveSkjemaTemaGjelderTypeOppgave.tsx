import type { JSX } from 'react';
import type { Path, UseFormReturn } from 'react-hook-form';
import FormSelect from '../../../../../../../../components/form/FormSelect';
import type { GsakTema } from '../../../../../../../../models/meldinger/oppgave';
import type { OppgaveSkjemaDelteFelter } from './../oppgaveInterfaces';
import { OppgavetypeOptions, TemaOptions, UnderkategoriOptions } from './../SkjemaElementOptions';

interface Props<F extends OppgaveSkjemaDelteFelter> {
    form: UseFormReturn<F>;
    gsakTema: GsakTema[];
    valgtTema?: GsakTema;
}

function OppgaveSkjemaTemaGjelderTypeOppgave<F extends OppgaveSkjemaDelteFelter>({
    form,
    gsakTema,
    valgtTema
}: Props<F>) {
    const selectors: {
        id: Extract<keyof OppgaveSkjemaDelteFelter, string>;
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
            {selectors.map((selector) => (
                <FormSelect
                    key={selector.id}
                    form={form}
                    name={selector.id as Path<F>}
                    label={selector.label}
                    autoFocus={!!selector.autoFocus}
                    defaultValue=""
                >
                    {selector.child}
                </FormSelect>
            ))}
        </>
    );
}

export default OppgaveSkjemaTemaGjelderTypeOppgave;
