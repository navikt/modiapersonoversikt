import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGjeldendeBruker } from '../../redux/gjeldendeBruker/types';
import tildelteoppgaver from '../../rest/resources/tildelteoppgaverResource';
import { loggEvent } from '../../utils/logger/frontendLogger';

function LyttPåNyttFnrIReduxOgHentAllPersoninfo() {
    const dispatch = useDispatch();
    const fnr = useGjeldendeBruker();
    tildelteoppgaver.useFetch();

    useEffect(() => {
        if (fnr.length !== 0) {
            loggEvent('OppslagNyPerson', 'HentAllPersoninfo');
        }
    }, [dispatch, fnr]);
    return null;
}

export default LyttPåNyttFnrIReduxOgHentAllPersoninfo;
