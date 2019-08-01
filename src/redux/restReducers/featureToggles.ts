import { FeatureToggles } from '../../components/featureToggle/toggleIDs';
import { FeatureToggleResponse } from '../../models/featureToggle';
import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { apiBaseUri } from '../../api/config';
import { loggError } from '../../utils/frontendLogger';

export default createRestResourceReducerAndActions<{ [name: string]: boolean }>('featureToggles', () => '');

export async function fetchAllFeatureToggles() {
    const featureToggleKeys = Object.keys(FeatureToggles);

    const featureTogglePromises: Promise<FeatureToggleResponse>[] = featureToggleKeys.map(key => {
        return fetchFeatureToggle(FeatureToggles[key]);
    });

    const toggleStates = await Promise.all(featureTogglePromises);

    // @ts-ignore
    const keysAndStatus = featureToggleKeys.reduce((acc, key, index) => {
        const toggleId = FeatureToggles[key];
        return {
            ...acc,
            [toggleId]: toggleStates[index]
        };
    }, []);

    return keysAndStatus;
}

function fetchFeatureToggle(toggleId: string): Promise<FeatureToggleResponse> {
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
