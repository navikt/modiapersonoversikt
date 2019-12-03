import { useFødselsnummer, useRestResource } from '../../utils/customHooks';
import { hasData } from '../../rest/utils/restResource';
import { hentBaseUrl } from '../../redux/restReducers/baseurls';

function useUrlNyPersonforvalter() {
    const baseUrlReosurce = useRestResource(resources => resources.baseUrl);
    const fnr = useFødselsnummer();
    const baseUrl = hasData(baseUrlReosurce) ? hentBaseUrl(baseUrlReosurce.data, 'personforvalter') : '';
    if (!baseUrl || baseUrl === '') {
        return '';
    }
    return `${baseUrl}?aktoerId=${fnr}`;
}

export default useUrlNyPersonforvalter;
