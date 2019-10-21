import { Traad } from '../../../../../models/meldinger/meldinger';
import { useRestResource } from '../../../../../utils/customHooks';
import { hasData } from '../../../../../rest/utils/restResource';
import { useInfotabsDyplenker } from '../../dyplenker';

export function useValgtTraadIUrl(): Traad | undefined {
    const dyplenker = useInfotabsDyplenker();
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const traader = hasData(traaderResource) ? traaderResource.data : [];
    return traader.find(dyplenker.meldinger.erValgt);
}
