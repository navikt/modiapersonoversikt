import { FeatureToggleResponse } from '../models/featureToggle';
import { FeatureToggles } from '../components/featureToggle/toggleIDs';

export function mockFeatureToggle(toggleId: FeatureToggles): FeatureToggleResponse {
    switch (toggleId) {
        case FeatureToggles.Tooltip:
            return false;
        case FeatureToggles.Kontrollspørsmål:
            return true;
        case FeatureToggles.SaksoversiktNyttVindu:
            return true;
        default:
            return Math.random() > 0.5;
    }
}
