import { Traad } from '../../../../../models/meldinger/meldinger';
import { useInfotabsDyplenker } from '../../dyplenker';
import brukersdialog from '../../../../../rest/resources/brukersdialog';
import { hasData } from '@nutgaard/use-fetch';

export function useValgtTraadIUrl(): Traad | undefined {
    const dyplenker = useInfotabsDyplenker();
    const traaderResource = brukersdialog.useFetch();
    const traader = hasData(traaderResource) ? traaderResource.data : [];
    return traader.find(dyplenker.meldinger.erValgt);
}
