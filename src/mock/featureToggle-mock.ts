import { FeatureToggleResponse } from '../models/featureToggle';
import { FeatureToggles } from '../components/featureToggle/toggleIDs';

export function mockFeatureToggle(toggleId: FeatureToggles): FeatureToggleResponse {
    switch (toggleId) {
        case FeatureToggles.Tooltip:
            return false;
        case FeatureToggles.SaksoversiktNyttVindu:
            return true;
        case FeatureToggles.VisTilbakemelding:
            return true;
        case FeatureToggles.SaksDokumentIEgetVindu:
            return true;
        default:
            return Math.random() > 0.5;
    }
}
