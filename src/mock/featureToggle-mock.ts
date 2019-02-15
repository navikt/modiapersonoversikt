import { FeatureToggleResponse } from '../models/featureToggle';

export function mockFeatureToggle(toggleId: string): FeatureToggleResponse {
    switch (toggleId) {
        case 'tooltip':
            return true;
        case 'saf':
            return false;
        case 'kontrollsporsmal':
            return true;
        default:
            return Math.random() > 0.5;
    }
}
