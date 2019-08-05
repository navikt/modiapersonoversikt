import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';
import { isLoadedPerson } from './personinformasjon';
import { NavKontorResponse } from '../../models/navkontor';
import { loggError } from '../../utils/frontendLogger';
import { Kodeverk } from '../../models/kodeverk';

export function getUrl(geografiskTilknytning?: string, diskresjonsKode?: Kodeverk) {
    return `${apiBaseUri}/enheter?gt=${geografiskTilknytning || ''}${
        diskresjonsKode ? '&dkode=' + diskresjonsKode.kodeRef : ''
    }`;
}

function getBrukersNavkontorFetchUri(state: AppState) {
    const personResource = state.restResources.personinformasjon;
    if (!isLoadedPerson(personResource)) {
        loggError(new Error('Fetch Nav-kontor: Kunne ikke finne personinformasjon'));
        return `${apiBaseUri}/enheter?gt=`;
    }
    const geografiskTilknytning = personResource.data.geografiskTilknytning;
    const diskresjonsKode = personResource.data.diskresjonskode;
    return getUrl(geografiskTilknytning, diskresjonsKode);
}

export default createRestResourceReducerAndActions<NavKontorResponse>('navkontor', getBrukersNavkontorFetchUri);
