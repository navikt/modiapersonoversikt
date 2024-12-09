import { useEffect } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { setValueGuard, watchGuard } from '../../../../../../../components/form/formUtils';
import type { GsakTema } from '../../../../../../../models/meldinger/oppgave';
import type { OppgaveSkjemaDelteFelter } from './oppgaveInterfaces';

export function useNormalPrioritet<F extends OppgaveSkjemaDelteFelter>(gsakTema: GsakTema[], form: UseFormReturn<F>) {
    const valgtTemaKode = watchGuard(form, 'valgtTema');
    const valgtTema = gsakTema.find((gsakTema) => gsakTema.kode === valgtTemaKode);

    useEffect(() => {
        const onsketPrioritet =
            valgtTema?.prioriteter.find((prioritet) => prioritet.kode.includes('NORM')) ??
            valgtTema?.prioriteter.find(() => true);
        if (onsketPrioritet) {
            setValueGuard(form, 'valgtPrioritet', onsketPrioritet.kode, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true
            });
        }
    }, [valgtTema, form]);

    return valgtTema;
}
