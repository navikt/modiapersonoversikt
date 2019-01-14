import { FeatureToggleResponse } from '../models/featureToggle';

export function mockFeatureToggle(toggleId: string): FeatureToggleResponse {
    return Math.random() > .5;
}
