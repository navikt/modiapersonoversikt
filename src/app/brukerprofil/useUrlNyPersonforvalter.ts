import aktoridResource from '../../rest/resources/aktoridResource';
import baseurls from '../../rest/resources/baseurlsResource';
import { useFodselsnummer } from '../../utils/customHooks';

function useUrlNyPersonforvalter() {
    const baseUrlResource = baseurls.useFetch();
    const fnr = useFodselsnummer();
    const aktoridResponse = aktoridResource.useFetch(fnr ?? '');

    if (!aktoridResponse.data || !baseUrlResource.data) {
        return '';
    }
    const aktorid = aktoridResponse.data;

    const baseUrl = baseUrlResource.data?.personforvalter ?? '';
    if (!baseUrl || baseUrl === '') {
        return '';
    }
    return `${baseUrl}?aktoerId=${aktorid}`;
}

export default useUrlNyPersonforvalter;
