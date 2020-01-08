import { useFødselsnummer } from '../../utils/customHooks';
import { hentBaseUrl } from '../../redux/restReducers/baseurls';
import { useRestResource } from '../../rest/consumer/useRestResource';

function useUrlNyPersonforvalter() {
    const baseUrlReosurce = useRestResource(resources => resources.baseUrl);
    const fnr = useFødselsnummer();

    const baseUrl = baseUrlReosurce.data ? hentBaseUrl(baseUrlReosurce.data, 'personforvalter') : '';
    if (!baseUrl || baseUrl === '') {
        return '';
    }
    return `${baseUrl}?aktoerId=${fnr}`;
}

export default useUrlNyPersonforvalter;
