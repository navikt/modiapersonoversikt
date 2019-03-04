import { apiBaseUri } from './config';
import { FeatureToggleResponse } from '../models/featureToggle';

export function getFeatureToggle(toggleId: string): Promise<FeatureToggleResponse> {
    const uri = `${apiBaseUri}/featuretoggle/${toggleId}`;
    return fetch(uri, { credentials: 'include' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return false; // feature toggles default false
            throw response.statusText;
        }
    });
}
