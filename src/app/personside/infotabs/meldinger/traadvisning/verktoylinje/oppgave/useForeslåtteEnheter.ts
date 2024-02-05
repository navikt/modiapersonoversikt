import { useFodselsnummer } from '../../../../../../../utils/customHooks';
import { useEffect, useMemo, useState } from 'react';
import { Enhet } from '../../../../../../../models/meldinger/oppgave';
import { loggError, loggEvent } from '../../../../../../../utils/logger/frontendLogger';
import { apiBaseUri, includeCredentials, postConfig } from '../../../../../../../api/config';
import { OppgaveSkjemaForm } from './oppgaveInterfaces';
import { UseFormReturn } from 'react-hook-form';
import useFeatureToggle from '../../../../../../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../../../../../../components/featureToggle/toggleIDs';

function useForeslatteEnheter({ watch }: UseFormReturn<OppgaveSkjemaForm>) {
    const fnr = useFodselsnummer();

    const temakode = watch('valgtTema');
    const typekode = watch('valgtOppgavetype');
    const underkategori = watch('valgtUnderkategori');

    const [foreslatteEnheter, setForeslatteEnheter] = useState<Enhet[]>([]);
    const [pending, setPending] = useState(false);
    const { isOn } = useFeatureToggle(FeatureToggles.IkkeFnrIPath);

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
            .filter((entry) => entry[1])
            .map((entry) => entry[0] + '=' + entry[1])
            .join('&');

        const fetchResponse = isOn
            ? fetch(`${apiBaseUri}/v2/enheter/oppgavebehandlere/v2/foreslatte`, postConfig(request))
            : fetch(`${apiBaseUri}/enheter/oppgavebehandlere/v2/foreslatte?${queryParams}`, includeCredentials);
        setPending(true);
        loggEvent('Fetch', 'LagOppgave-ForeslåtteEnheter');
        fetchResponse
            .then((response) => response.json())
            .then(setForeslatteEnheter)
            .catch((e) => loggError(e, 'Feil ved henting av foreslåtte enheter'))
            .finally(() => setPending(false));
    }, [temakode, typekode, underkategori, fnr, isOn]);

    return useMemo(
        () => ({
            pending,
            foreslatteEnheter
        }),
        [pending, foreslatteEnheter]
    );
}

export default useForeslatteEnheter;
