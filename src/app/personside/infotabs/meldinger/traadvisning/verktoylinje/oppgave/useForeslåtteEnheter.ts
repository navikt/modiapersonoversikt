import { useEffect, useMemo, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { apiBaseUri, postConfig } from '../../../../../../../api/config';
import type { Enhet } from '../../../../../../../models/meldinger/oppgave';
import { useFodselsnummer } from '../../../../../../../utils/customHooks';
import { loggError, loggEvent } from '../../../../../../../utils/logger/frontendLogger';
import type { OppgaveSkjemaForm } from './oppgaveInterfaces';

function useForeslatteEnheter({ watch }: UseFormReturn<OppgaveSkjemaForm>) {
    const fnr = useFodselsnummer();

    const temakode = watch('valgtTema');
    const typekode = watch('valgtOppgavetype');
    const underkategori = watch('valgtUnderkategori');

    const [foreslatteEnheter, setForeslatteEnheter] = useState<Enhet[]>([]);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        if (!temakode || !typekode) {
            return;
        }

        const request = {
            fnr: fnr,
            temakode: temakode,
            typekode: typekode,
            underkategori: underkategori
        };

        const fetchResponse = fetch(`${apiBaseUri}/v2/enheter/oppgavebehandlere/v2/foreslatte`, postConfig(request));
        setPending(true);
        loggEvent('Fetch', 'LagOppgave-ForeslåtteEnheter');
        fetchResponse
            .then((response) => response.json())
            .then(setForeslatteEnheter)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            .catch((e) => loggError(e, 'Feil ved henting av foreslåtte enheter'))
            .finally(() => setPending(false));
    }, [temakode, typekode, underkategori, fnr]);

    return useMemo(
        () => ({
            pending,
            foreslatteEnheter
        }),
        [pending, foreslatteEnheter]
    );
}

export default useForeslatteEnheter;
