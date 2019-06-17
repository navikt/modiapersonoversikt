import { hentFeatureToggles } from '../../redux/restReducers/featureToggles';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function FetchFeatureToggles() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hentFeatureToggles());
    }, [dispatch]);

    return null;
}

export default FetchFeatureToggles;
