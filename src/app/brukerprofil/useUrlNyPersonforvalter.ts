import { hentBaseUrl } from '../../redux/restReducers/baseurls';
import { useRestResource } from '../../rest/consumer/useRestResource';
import useFetch, { FetchResult, isPending, hasError } from '@nutgaard/use-fetch';
import { useFodselsnummer } from '../../utils/customHooks';
import { apiBaseUri, includeCredentials } from '../../api/config';

function useUrlNyPersonforvalter() {
    const baseUrlReosurce = useRestResource((resources) => resources.baseUrl);
    const fnr = useFodselsnummer();
    const aktorIdResponse: FetchResult<string | null> = useFetch(
        `${apiBaseUri}/v2/person/${fnr}/aktorid`,
        includeCredentials
    );

    if (isPending(aktorIdResponse) || hasError(aktorIdResponse)) {
        return '';
    }

    const aktorid = aktorIdResponse.data;

    const baseUrl = baseUrlReosurce.data ? hentBaseUrl(baseUrlReosurce.data, 'personforvalter') : '';
    if (!baseUrl || baseUrl === '') {
        return '';
    }
    return `${baseUrl}?aktoerId=${aktorid}`;
}

export default useUrlNyPersonforvalter;
