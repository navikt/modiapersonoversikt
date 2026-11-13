import type { FetchError } from '../../api/api';
import featuretoggles from '../../rest/resources/featuretogglesResource';
import { FeatureToggles } from './toggleIDs';

type DeaktiverGammelModiaResult =
    | { status: 'pending' }
    | { status: 'success'; isOn: boolean }
    | { status: 'error'; isOn: true; error: FetchError };

function useDeaktiverGammelModia(): DeaktiverGammelModiaResult {
    const toggles = featuretoggles.useFetch();
    if (toggles.isError) {
        return { status: 'error', isOn: true, error: toggles.error };
    }
    if (toggles.isPending) {
        return { status: 'pending' };
    }
    return { status: 'success', isOn: toggles.data[FeatureToggles.DeaktiverGammelModia] ?? false };
}

export default useDeaktiverGammelModia;
