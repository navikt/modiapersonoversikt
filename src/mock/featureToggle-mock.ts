import { FeatureToggleResponse } from '../models/featureToggle';

export function mockFeatureToggleAdminBrukerprofil(toggleId: string): FeatureToggleResponse {
    return {
        toggleId: 'ny-brukerprofil',
        value: false
    };
}