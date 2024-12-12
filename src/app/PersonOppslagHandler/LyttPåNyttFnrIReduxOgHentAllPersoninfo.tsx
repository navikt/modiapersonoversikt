import { useEffect } from 'react';
import { useGjeldendeBruker } from '../../redux/gjeldendeBruker/types';
import tildelteoppgaver from '../../rest/resources/tildelteoppgaverResource';
import { loggEvent } from '../../utils/logger/frontendLogger';

function LyttPåNyttFnrIReduxOgHentAllPersoninfo() {
    const fnr = useGjeldendeBruker();
    tildelteoppgaver.useFetch();

    useEffect(() => {
        if (fnr.length !== 0) {
            loggEvent('OppslagNyPerson', 'HentAllPersoninfo');
        }
    }, [fnr]);
    return null;
}

export default LyttPåNyttFnrIReduxOgHentAllPersoninfo;
