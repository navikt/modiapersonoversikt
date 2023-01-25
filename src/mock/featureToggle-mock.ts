import { FeatureToggleResponse } from '../models/featureToggle';
import { FeatureToggles } from '../components/featureToggle/toggleIDs';

export function mockFeatureToggle(toggleId: FeatureToggles): FeatureToggleResponse {
    switch (toggleId) {
        case FeatureToggles.VisTilbakemelding:
            return false;
        case FeatureToggles.useNewDialogComponents:
            return false;
        default:
            return Math.random() > 0.5;
    }
}
