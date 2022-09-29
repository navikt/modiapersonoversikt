import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGjeldendeBruker } from '../../redux/gjeldendeBruker/types';
import { useFetchFeatureTogglesOnNewFnr } from './FetchFeatureToggles';
import { loggEvent } from '../../utils/logger/frontendLogger';
import tildelteoppgaver from '../../rest/resources/tildelteoppgaver';

function LyttPåNyttFnrIReduxOgHentAllPersoninfo() {
    const dispatch = useDispatch();
    const fnr = useGjeldendeBruker();
    tildelteoppgaver.useFetch();

    useEffect(() => {
        if (fnr.length !== 0) {
            loggEvent('OppslagNyPerson', 'HentAllPersoninfo');
        }
    }, [dispatch, fnr]);
    useFetchFeatureTogglesOnNewFnr();
    return null;
}

export default LyttPåNyttFnrIReduxOgHentAllPersoninfo;
