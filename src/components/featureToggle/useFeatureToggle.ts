import { FeatureToggles } from './toggleIDs';
import featuretoggles from '../../rest/resources/featuretogglesResource';

function useFeatureToggle(toggleId: FeatureToggles) {
    const toggles = featuretoggles.useFetch();
    if (toggles.isLoading) {
        return { pending: true };
    } else if (toggles.isError) {
        return { pending: true };
    } else {
        return { pending: false, isOn: toggles.data[toggleId] };
    }
}

export default useFeatureToggle;
