import { FeatureToggleResponse } from '../models/featureToggle';
import { FeatureToggles } from '../components/featureToggle/toggleIDs';

export function mockFeatureToggle(toggleId: FeatureToggles): FeatureToggleResponse {
    switch (toggleId) {
        case FeatureToggles.VisTilbakemelding:
            return true;
        case FeatureToggles.UtloggingsInfo:
            return true;
        case FeatureToggles.BruksmonsterSurvey:
            // Vil ikke at denne skal dukke opp lokalt eller på heroku
            return false;
        default:
            return Math.random() > 0.5;
    }
}
