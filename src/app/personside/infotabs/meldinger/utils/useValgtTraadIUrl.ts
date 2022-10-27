import { Traad } from '../../../../../models/meldinger/meldinger';
import { useInfotabsDyplenker } from '../../dyplenker';
import dialogResource from '../../../../../rest/resources/dialogResource';

export function useValgtTraadIUrl(): Traad | undefined {
    const dyplenker = useInfotabsDyplenker();
    const traaderResource = dialogResource.useFetch();
    const traader = traaderResource.data ?? [];
    return traader.find(dyplenker.meldinger.erValgt);
}
