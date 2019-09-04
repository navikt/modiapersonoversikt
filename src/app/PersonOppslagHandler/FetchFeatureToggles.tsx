import { useDispatch } from 'react-redux';
import { fetchAllFeatureToggles } from '../../redux/restReducers/featureToggles';
import { useEffect } from 'react';
import { useGjeldendeBruker } from '../../redux/gjeldendeBruker/types';
import { useRestResource } from '../../utils/customHooks';

export function useFetchFeatureTogglesOnNewFnr() {
    const dispatch = useDispatch();
    const fnr = useGjeldendeBruker();
    const setFeatureToggleData = useRestResource(restReducers => restReducers.featureToggles).actions.setData;

    useEffect(() => {
        fetchAllFeatureToggles().then(toggles => dispatch(setFeatureToggleData(toggles)));
    }, [fnr, dispatch, setFeatureToggleData]);
}

function FetchFeatureToggles() {
    useFetchFeatureTogglesOnNewFnr();
    return null;
}

export default FetchFeatureToggles;
