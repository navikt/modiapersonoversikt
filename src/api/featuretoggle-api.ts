import { apiBaseUri } from './config';
import { FeatureToggleResponse } from '../models/featureToggle';
import { loggError } from '../utils/frontendLogger';

export function getFeatureToggle(toggleId: string): Promise<FeatureToggleResponse> {
    const uri = `${apiBaseUri}/featuretoggle/${toggleId}`;
    return fetch(uri, { credentials: 'include' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            loggError(new Error(response.statusText + ' Kunne ikke hente featuretoggle med ID: ' + toggleId));
            return false; // feature toggles default false
        }
    });
}
