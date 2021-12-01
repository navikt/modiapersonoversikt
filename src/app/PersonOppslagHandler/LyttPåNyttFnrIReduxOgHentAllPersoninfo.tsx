import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGjeldendeBruker } from '../../redux/gjeldendeBruker/types';
import { AppState } from '../../redux/reducers';
import { useFetchFeatureTogglesOnNewFnr } from './FetchFeatureToggles';
import { loggEvent } from '../../utils/logger/frontendLogger';

function LyttPåNyttFnrIReduxOgHentAllPersoninfo() {
    const dispatch = useDispatch();
    const fnr = useGjeldendeBruker();

    const restResources = useSelector((state: AppState) => state.restResources);

    const tildDelteOppgaverFetch = restResources.tildelteOppgaver.actions.fetch;

    useEffect(() => {
        if (fnr.length !== 0) {
            loggEvent('OppslagNyPerson', 'HentAllPersoninfo');
            dispatch(tildDelteOppgaverFetch);
        }
    }, [dispatch, fnr, tildDelteOppgaverFetch]);
    useFetchFeatureTogglesOnNewFnr();
    return null;
}

export default LyttPåNyttFnrIReduxOgHentAllPersoninfo;
