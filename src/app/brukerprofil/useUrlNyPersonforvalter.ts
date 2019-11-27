import { useRestResource } from '../../utils/customHooks';
import { hasData } from '../../rest/utils/restResource';
import { hentBaseUrl } from '../../redux/restReducers/baseurls';

function useUrlNyPersonforvalter() {
    const baseUrlReosurce = useRestResource(resources => resources.baseUrl);
    return hasData(baseUrlReosurce) ? hentBaseUrl(baseUrlReosurce.data, 'personforvalter') : '';
}

export default useUrlNyPersonforvalter;
