import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { fetchAllFeatureToggles } from '../../redux/restReducers/featureToggles';
import { useEffect } from 'react';

export function useFetchFeatureTogglesOnNewFnr() {
    const dispatch = useDispatch();
    const fnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const setFeatureToggleData = useSelector((state: AppState) => state.restResources.featureToggles.actions.setData);

    useEffect(() => {
        fetchAllFeatureToggles().then(toggles => dispatch(setFeatureToggleData(toggles)));
    }, [fnr, dispatch, setFeatureToggleData]);
}

function FetchFeatureToggles() {
    useFetchFeatureTogglesOnNewFnr();
    return null;
}

export default FetchFeatureToggles;
