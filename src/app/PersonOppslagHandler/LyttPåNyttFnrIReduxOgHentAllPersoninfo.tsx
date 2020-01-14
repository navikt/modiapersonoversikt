import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGjeldendeBruker } from '../../redux/gjeldendeBruker/types';
import { AppState } from '../../redux/reducers';
import { useFetchFeatureTogglesOnNewFnr } from './FetchFeatureToggles';
import { loggEvent } from '../../utils/frontendLogger';

function LyttPåNyttFnrIReduxOgHentAllPersoninfo() {
    const dispatch = useDispatch();
    const fnr = useGjeldendeBruker();

    const restResources = useSelector((state: AppState) => state.restResources);
    const personinformasjonFetch = restResources.personinformasjon.actions.fetch;
    const kontaktinformasjonFetch = restResources.kontaktinformasjon.actions.fetch;
    const vergemalFetch = restResources.vergemal.actions.fetch;
    const egenAnsattFetch = restResources.egenAnsatt.actions.fetch;
    const tildDelteOppgaverFetch = restResources.tildelteOppgaver.actions.fetch;

    useEffect(() => {
        if (fnr.length !== 0) {
            loggEvent('OppslagNyPerson', 'HentAllPersoninfo');
            dispatch(personinformasjonFetch);
            dispatch(kontaktinformasjonFetch);
            dispatch(vergemalFetch);
            dispatch(egenAnsattFetch);
            dispatch(tildDelteOppgaverFetch);
        }
    }, [
        dispatch,
        fnr,
        personinformasjonFetch,
        kontaktinformasjonFetch,
        vergemalFetch,
        egenAnsattFetch,
        tildDelteOppgaverFetch
    ]);
    useFetchFeatureTogglesOnNewFnr();
    return null;
}

export default LyttPåNyttFnrIReduxOgHentAllPersoninfo;
