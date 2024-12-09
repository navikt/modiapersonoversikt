import type { Traad } from '../../../../../models/meldinger/meldinger';
import dialogResource from '../../../../../rest/resources/dialogResource';
import { useInfotabsDyplenker } from '../../dyplenker';

export function useValgtTraadIUrl(): Traad | undefined {
    const dyplenker = useInfotabsDyplenker();
    const traaderResource = dialogResource.useFetch();
    const traader = traaderResource.data ?? [];
    return traader.find(dyplenker.meldinger.erValgt);
}
