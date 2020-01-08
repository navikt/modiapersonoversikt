import { FeatureToggles } from './toggleIDs';
import { useRestResource } from '../../rest/consumer/useRestResource';

function useFeatureToggle(toggleId: FeatureToggles) {
    const featureToggleResouce = useRestResource(resources => resources.featureToggles);
    if (!featureToggleResouce.data) {
        return {
            pending: true
        };
    }
    return {
        pending: false,
        isOn: featureToggleResouce.data[toggleId]
    };
}

export default useFeatureToggle;
