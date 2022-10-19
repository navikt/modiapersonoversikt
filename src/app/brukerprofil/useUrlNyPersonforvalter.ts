import useFetch, { FetchResult, hasData } from '@nutgaard/use-fetch';
import { useFodselsnummer } from '../../utils/customHooks';
import { apiBaseUri, includeCredentials } from '../../api/config';
import baseurls, { hentBaseUrl } from '../../rest/resources/baseurlsResource';

function useUrlNyPersonforvalter() {
    const baseUrlResource = baseurls.useFetch();
    const fnr = useFodselsnummer();
    const aktorIdResponse: FetchResult<string | null> = useFetch(
        `${apiBaseUri}/v2/person/${fnr}/aktorid`,
        includeCredentials
    );

    if (!hasData(aktorIdResponse) || !baseUrlResource.data) {
        return '';
    }

    const aktorid = aktorIdResponse.data;

    const baseUrl = baseUrlResource.data ? hentBaseUrl(baseUrlResource.data, 'personforvalter') : '';
    if (!baseUrl || baseUrl === '') {
        return '';
    }
    return `${baseUrl}?aktoerId=${aktorid}`;
}

export default useUrlNyPersonforvalter;
