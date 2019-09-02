import { useEffect } from 'react';
import { reset } from '../../redux/reducer-utils';
import { useDispatch } from 'react-redux';
import { cache } from '@nutgaard/use-fetch';
import { useGjeldendeBruker } from '../../redux/gjeldendeBruker/types';
import { fetchAllFeatureToggles } from '../../redux/restReducers/featureToggles';
import { useRestResource } from '../../utils/customHooks';

function LyttPåNyttFnrIReduxOgHentAllPersoninfo() {
    const dispatch = useDispatch();
    const fnr = useGjeldendeBruker();
    const setFeatureToggleData = useRestResource(restReducers => restReducers.featureToggles).actions.setData;

    useEffect(() => {
        cache.clear();
        dispatch(reset());

        fetchAllFeatureToggles().then(toggles => dispatch(setFeatureToggleData(toggles)));
    }, [dispatch, reset, fnr]);

    return null;
}

export default LyttPåNyttFnrIReduxOgHentAllPersoninfo;
