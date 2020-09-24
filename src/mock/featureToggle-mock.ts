import { FeatureToggleResponse } from '../models/featureToggle';
import { FeatureToggles } from '../components/featureToggle/toggleIDs';

export function mockFeatureToggle(toggleId: FeatureToggles): FeatureToggleResponse {
    switch (toggleId) {
        case FeatureToggles.VisTilbakemelding:
            return true;
        case FeatureToggles.Infomelding:
            return true;
        case FeatureToggles.UtloggingsInfo:
            return true;
        case FeatureToggles.Oppdateringslogg:
            return true;
        default:
            return Math.random() > 0.5;
    }
}
