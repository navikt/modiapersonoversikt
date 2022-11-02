import { GsakTema, GsakTemaPrioritet } from '../../../../../../../models/meldinger/oppgave';
import { useEffect } from 'react';
import { OppgaveSkjemaDelteFelter } from './oppgaveInterfaces';
import { UseOppgaveSkjemaWatch } from './oppgaveSkjemaTyper';

export function useNormalPrioritet(
    gsakTema: GsakTema[],
    watch: UseOppgaveSkjemaWatch<OppgaveSkjemaDelteFelter>,
    setValgtPrioritet: (prioritet: GsakTemaPrioritet['kode']) => void
) {
    const valgtTemaKode = watch('valgtTema');
    const valgtTema = gsakTema.find((gsakTema) => gsakTema.kode === valgtTemaKode);

    useEffect(() => {
        const onsketPrioritet =
            valgtTema?.prioriteter.find((prioritet) => prioritet.kode.includes('NORM')) ??
            valgtTema?.prioriteter.find(() => true);
        if (onsketPrioritet) {
            setValgtPrioritet(onsketPrioritet.kode);
        }
    }, [valgtTema, setValgtPrioritet]);

    return valgtTema;
}
