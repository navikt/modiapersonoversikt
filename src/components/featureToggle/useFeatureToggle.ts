import { FeatureToggles } from './toggleIDs';
import featuretoggles from '../../rest/resources/featuretoggles';
import { hasError, isPending } from '@nutgaard/use-fetch';

function useFeatureToggle(toggleId: FeatureToggles) {
    const toggles = featuretoggles.useFetch();
    if (isPending(toggles)) {
        return { pending: true };
    } else if (hasError(toggles)) {
        return { pending: true };
    } else {
        return { pending: false, isOn: toggles.data[toggleId] };
    }
}

export default useFeatureToggle;
