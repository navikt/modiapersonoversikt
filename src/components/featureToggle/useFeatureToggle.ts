import { useRestResource } from '../../utils/customHooks';
import { hasData } from '../../rest/utils/restResource';
import { FeatureToggles } from './toggleIDs';

function useFeatureToggle(toggleId: FeatureToggles) {
    const featureToggleResouce = useRestResource(resources => resources.featureToggles);
    if (!hasData(featureToggleResouce)) {
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
