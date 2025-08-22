import { FeatureToggles } from '../components/featureToggle/toggleIDs';
import type { FeatureToggleResponse } from '../models/featureToggle';

export function mockFeatureToggle(toggleId: FeatureToggles): FeatureToggleResponse {
    switch (toggleId) {
        case FeatureToggles.JournalforUtenSvar:
            return true;
        case FeatureToggles.BrukNyTiltakspenger:
            return true;
        case FeatureToggles.NyModiaKnapp:
            return true;
        case FeatureToggles.BrukPensjon:
            return true;
        default:
            return Math.random() > 0.5;
    }
}
