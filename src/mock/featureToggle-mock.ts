import { FeatureToggleResponse } from '../models/featureToggle';

export function mockFeatureToggle(toggleId: string): FeatureToggleResponse {
    switch (toggleId) {
        case 'tooltip':
            return true;
        case 'kontrollsporsmal':
            return true;
        default:
            return Math.random() > .5;
    }
}
