import { FeatureToggleResponse } from '../models/featureToggle';
import { FeatureToggles } from '../components/featureToggle/toggleIDs';

export function mockFeatureToggle(toggleId: FeatureToggles): FeatureToggleResponse {
    switch (toggleId) {
        case FeatureToggles.BrukNyDecorator:
            return true;
        case FeatureToggles.JournalforUtenSvar:
            return true;
        case FeatureToggles.VisDraftStatus:
            return true;
        case FeatureToggles.BrukNyTiltakspenger:
            return true;
        case FeatureToggles.FnrSokForInnkreving:
            return true;
        case FeatureToggles.OrgnrSokForInnkreving:
            return true;
        default:
            return Math.random() > 0.5;
    }
}
