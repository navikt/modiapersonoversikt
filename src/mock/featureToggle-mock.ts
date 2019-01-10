import { FeatureToggleResponse } from '../models/featureToggle';

export function mockFeatureToggle(toggleId: string): FeatureToggleResponse {
    return {
        ['modiabrukerdialog.' + toggleId]: Math.random() > .5
    };
}