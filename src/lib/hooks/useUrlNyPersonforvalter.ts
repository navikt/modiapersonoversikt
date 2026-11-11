import { usePersonAtomValue } from 'src/lib/state/context';
import aktoridResource from '../../rest/resources/aktoridResource';
import baseurls from '../../rest/resources/baseurlsResource';

function useUrlNyPersonforvalter() {
    const baseUrlResource = baseurls.useFetch();
    const fnr = usePersonAtomValue();
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
