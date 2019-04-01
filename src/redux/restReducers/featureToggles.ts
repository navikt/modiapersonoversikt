import { createActionsAndReducer } from './restResource';
import { getFeatureToggle } from '../../api/featuretoggle-api';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';
import { FeatureToggleResponse } from '../../models/featureToggle';

const { reducer, action, tilbakestill, actionNames } = createActionsAndReducer('featureToggles');

export function hentFeatureToggles() {
    return action(() => getAllFeatureToggles());
}

async function getAllFeatureToggles() {
    const featureToggleKeys = Object.keys(FeatureToggles);

    const featureTogglePromises: Promise<FeatureToggleResponse>[] = featureToggleKeys.map(key => {
        return getFeatureToggle(FeatureToggles[key]);
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

export function resetFeatureToggles() {
    return tilbakestill;
}

export const featureToggleActionNames = actionNames;

export default reducer;
