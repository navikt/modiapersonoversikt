import { OppgaveSkjemaForm } from './oppgaveInterfaces';
import { useFødselsnummer } from '../../../../../../../utils/customHooks';
import { useEffect, useMemo, useState } from 'react';
import { Enhet } from '../../../../../../../models/meldinger/oppgave';
import { loggError, loggEvent } from '../../../../../../../utils/logger/frontendLogger';
import { includeCredentials } from '../../../../../../../api/config';

const superHackyBaseApi = '/modiapersonoversikt-api/rest';
function useForeslatteEnheter(form: OppgaveSkjemaForm) {
    const fnr = useFødselsnummer();
    const [foreslatteEnheter, setForeslatteEnheter] = useState<Enhet[]>([]);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        if (!form.valgtTema || !form.valgtOppgavetype) {
            return;
        }

        const request = {
            fnr: fnr,
            temakode: form.valgtTema.kode,
            typekode: form.valgtOppgavetype.kode,
            underkategori: form.valgtUnderkategori && form.valgtUnderkategori.kode
        };
        const queryParams = Object.entries(request)
            .filter(entry => entry[1])
            .map(entry => entry[0] + '=' + entry[1])
            .join('&');

        setPending(true);
        loggEvent('Fetch', 'LagOppgave-ForeslåtteEnheter');
        fetch(`${superHackyBaseApi}/enheter/oppgavebehandlere/foreslatte?${queryParams}`, includeCredentials)
            .then(response => response.json())
            .then(setForeslatteEnheter)
            .catch(e => loggError(e, 'Feil ved henting av foreslåtte enheter'))
            .finally(() => setPending(false));
    }, [form.valgtTema, form.valgtOppgavetype, form.valgtUnderkategori, fnr]);

    return useMemo(
        () => ({
            pending,
            foreslatteEnheter
        }),
        [pending, foreslatteEnheter]
    );
}

export default useForeslatteEnheter;
