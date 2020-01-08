import { erMaks10MinSiden } from '../../../utils/dateUtils';
import {
    erSammefritekstSomNyesteMeldingITraad,
    nyesteMelding,
    nyesteTraad
} from '../infotabs/meldinger/utils/meldingerUtils';
import { useRestResource } from '../../../rest/consumer/useRestResource';

export function useSentMelding(fritekst: string) {
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const traader = traaderResource.data ? traaderResource.data : [];
    const sisteTraad = nyesteTraad(traader);
    const sisteMelding = sisteTraad && nyesteMelding(sisteTraad);
    const erRiktigMelding =
        erSammefritekstSomNyesteMeldingITraad(fritekst, sisteTraad) && erMaks10MinSiden(sisteMelding.opprettetDato); //Sjekker om nyeste meldingen hentet ut er samme som ble sendt når det er vanskelig å få ut traadUd / behandlingsId fra backend
    return {
        pending: traaderResource.isLoading || traaderResource.isReloading,
        melding: erRiktigMelding ? sisteMelding : undefined,
        traad: erRiktigMelding ? sisteTraad : undefined
    };
}
