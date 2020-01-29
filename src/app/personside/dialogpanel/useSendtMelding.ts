import { erMaks10MinSiden } from '../../../utils/dateUtils';
import { erSammefritekstSomIMelding, nyesteMelding, nyesteTraad } from '../infotabs/meldinger/utils/meldingerUtils';
import { useRestResource } from '../../../rest/consumer/useRestResource';
import { useEffect, useMemo, useState } from 'react';
import { Melding, Traad } from '../../../models/meldinger/meldinger';
import { loggError } from '../../../utils/logger/frontendLogger';

export function useSendtMelding(fritekst: string) {
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const [pending, setPending] = useState(true);
    const [melding, setMelding] = useState<Melding | undefined>();
    const [traad, setTraad] = useState<Traad | undefined>();

    useEffect(() => {
        if (!traaderResource.isLoading && !traaderResource.isReloading) {
            setPending(false);
        }
        if (melding && traad) {
            return;
        }
        if (traaderResource.data?.length) {
            try {
                const sisteTraad = nyesteTraad(traaderResource.data);
                const sisteMelding = nyesteMelding(sisteTraad);
                const erRiktigMelding =
                    erSammefritekstSomIMelding(fritekst, sisteMelding) && erMaks10MinSiden(sisteMelding.opprettetDato);
                //Sjekker om nyeste meldingen hentet ut er samme som ble sendt når det er vanskelig å få ut traadUd / behandlingsId fra backend
                if (erRiktigMelding) {
                    setMelding(sisteMelding);
                    setTraad(sisteTraad);
                }
            } catch (e) {
                loggError(e, 'Kunne ikke finne sendt melding', { traader: JSON.stringify(traaderResource.data) });
                throw e;
            }
        }
    }, [traaderResource, fritekst, traad, melding]);

    return useMemo(
        () => ({
            pending: pending,
            melding: melding,
            traad: traad
        }),
        [pending, melding, traad]
    );
}
