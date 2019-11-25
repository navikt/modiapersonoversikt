import { useRestResource } from '../../../utils/customHooks';
import { hasData, isLoading, isReloading } from '../../../rest/utils/restResource';
import { erMaks10MinSiden } from '../../../utils/dateUtils';
import {
    erSammefritekstSomNyesteMeldingITraad,
    nyesteMelding,
    nyesteTraad
} from '../infotabs/meldinger/utils/meldingerUtils';

export function useSentMelding(fritekst: string) {
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const traader = hasData(traaderResource) ? traaderResource.data : [];
    const sisteTraad = nyesteTraad(traader);
    const sisteMelding = sisteTraad && nyesteMelding(sisteTraad);
    const erRiktigMelding =
        erSammefritekstSomNyesteMeldingITraad(fritekst, sisteTraad) && erMaks10MinSiden(sisteMelding.opprettetDato); //Sjekker om nyeste meldingen hentet ut er samme som ble sendt når det er vanskelig å få ut traadUd / behandlingsId fra backend
    return {
        pending: isReloading(traaderResource) || isLoading(traaderResource),
        melding: erRiktigMelding ? sisteMelding : undefined,
        traad: erRiktigMelding ? sisteTraad : undefined
    };
}
