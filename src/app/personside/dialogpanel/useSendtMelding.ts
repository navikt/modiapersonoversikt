import { useEffect, useMemo, useState } from 'react';
import type { Melding, Traad } from '../../../models/meldinger/meldinger';
import dialogResource from '../../../rest/resources/dialogResource';
import { erMaks10MinSiden } from '../../../utils/date-utils';
import { loggError } from '../../../utils/logger/frontendLogger';
import { nyesteMelding, nyesteTraad } from '../infotabs/meldinger/utils/meldingerUtils';

interface SendtMelding {
    pending: boolean;
    melding: Melding | undefined;
    traad: Traad | undefined;
}

export function useSendtMelding(opprettetTraad: Traad | undefined): SendtMelding {
    const traaderResource = dialogResource.useFetch();
    const [pending, setPending] = useState(true);
    const [melding, setMelding] = useState<Melding | undefined>();
    const [traad, setTraad] = useState<Traad | undefined>();

    useEffect(() => {
        if (traaderResource.isSuccess && traaderResource.fetchStatus === 'idle') {
            setPending(false);
        }
        if (melding && traad) {
            return;
        }
        if (traaderResource.data) {
            try {
                const sisteTraad = nyesteTraad(traaderResource.data);
                if (sisteTraad) {
                    const sisteMelding = nyesteMelding(sisteTraad);
                    const erRiktigMelding =
                        sisteTraad.traadId === opprettetTraad?.traadId && erMaks10MinSiden(sisteMelding.opprettetDato);
                    if (erRiktigMelding) {
                        setMelding(sisteMelding);
                        setTraad(sisteTraad);
                    }
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                //biome-ignore lint/suspicious/noExplicitAny: biome migration
            } catch (e: any) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                loggError(e, 'Kunne ikke finne sendt melding', { traader: JSON.stringify(traaderResource.data) });
                throw e;
            }
        }
    }, [opprettetTraad?.traadId, traaderResource, traad, melding]);

    return useMemo(
        () => ({
            pending: pending,
            melding: melding,
            traad: traad
        }),
        [pending, melding, traad]
    );
}
