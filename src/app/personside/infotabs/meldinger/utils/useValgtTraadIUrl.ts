import { Traad } from '../../../../../models/meldinger/meldinger';
import { useInfotabsDyplenker } from '../../dyplenker';
import { useRestResource } from '../../../../../rest/consumer/useRestResource';

export function useValgtTraadIUrl(): Traad | undefined {
    const dyplenker = useInfotabsDyplenker();
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const traader = traaderResource.data ? traaderResource.data : [];
    return traader.find(dyplenker.meldinger.erValgt);
}
