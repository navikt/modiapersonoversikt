import { useFødselsnummer, useRestResource } from '../../utils/customHooks';
import { hasData } from '../../rest/utils/restResource';
import { hentBaseUrl } from '../../redux/restReducers/baseurls';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

function useUrlNyPersonforvalter() {
    const nyPersonForvalter = useFeatureToggle(FeatureToggles.NyPersonforvalter);
    const baseUrlReosurce = useRestResource(resources => resources.baseUrl);
    const fnr = useFødselsnummer();

    if (nyPersonForvalter.isOn) {
        const baseUrl = hasData(baseUrlReosurce) ? hentBaseUrl(baseUrlReosurce.data, 'personforvalter') : '';
        if (!baseUrl || baseUrl === '') {
            return '';
        }
        return `${baseUrl}?aktoerId=${fnr}`;
    }

    return '';
}

export default useUrlNyPersonforvalter;
