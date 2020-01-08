import { Traad } from '../../../../../models/meldinger/meldinger';
import { hasData } from '../../../../../rest/utils/restResource';
import { useInfotabsDyplenker } from '../../dyplenker';
import { useRestResource } from '../../../../../rest/consumer/useRestResource';

export function useValgtTraadIUrl(): Traad | undefined {
    const dyplenker = useInfotabsDyplenker();
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const traader = hasData(traaderResource) ? traaderResource.data : [];
    return traader.find(dyplenker.meldinger.erValgt);
}
