import { useFødselsnummer } from '../../../../../../../utils/customHooks';
import { useEffect, useMemo, useState } from 'react';
import { Enhet } from '../../../../../../../models/meldinger/oppgave';
import { loggError, loggEvent } from '../../../../../../../utils/logger/frontendLogger';
import { apiBaseUri, includeCredentials } from '../../../../../../../api/config';

function useForeslatteEnheter(temakode?: string, typekode?: string, underkategori?: string) {
    const fnr = useFødselsnummer();
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
        const queryParams = Object.entries(request)
            .filter(entry => entry[1])
            .map(entry => entry[0] + '=' + entry[1])
            .join('&');

        setPending(true);
        loggEvent('Fetch', 'LagOppgave-ForeslåtteEnheter');
        fetch(`${apiBaseUri}/enheter/oppgavebehandlere/foreslatte?${queryParams}`, includeCredentials)
            .then(response => response.json())
            .then(setForeslatteEnheter)
            .catch(e => loggError(e, 'Feil ved henting av foreslåtte enheter'))
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
