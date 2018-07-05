import { FeatureToggleResponse } from '../models/featureToggle';

export function mockFeatureToggleAdminBrukerprofil(toggleId: string): FeatureToggleResponse {
    return {
        'modiabrukerdialog.ny-brukerprofil': true
    };
}