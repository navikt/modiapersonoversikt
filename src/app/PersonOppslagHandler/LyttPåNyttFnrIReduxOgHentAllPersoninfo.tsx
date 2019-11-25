import { useEffect } from 'react';
import { reset } from '../../redux/reducer-utils';
import { useDispatch, useSelector } from 'react-redux';
import { cache } from '@nutgaard/use-fetch';
import { useGjeldendeBruker } from '../../redux/gjeldendeBruker/types';
import { AppState } from '../../redux/reducers';
import { useFetchFeatureTogglesOnNewFnr } from './FetchFeatureToggles';
import { resetKeepScroll } from '../../utils/hooks/useKeepScroll';

function LyttPåNyttFnrIReduxOgHentAllPersoninfo() {
    const dispatch = useDispatch();
    const fnr = useGjeldendeBruker();

    const restResources = useSelector((state: AppState) => state.restResources);
    const personinformasjonFetch = restResources.personinformasjon.actions.fetch;
    const tråderFetch = restResources.tråderOgMeldinger.actions.fetch;
    const kontaktinformasjonFetch = restResources.kontaktinformasjon.actions.fetch;
    const vergemalFetch = restResources.vergemal.actions.fetch;
    const egenAnsattFetch = restResources.egenAnsatt.actions.fetch;
    const tildDelteOppgaverFetch = restResources.tildelteOppgaver.actions.fetch;

    useEffect(() => {
        cache.clear();
        dispatch(reset());
        resetKeepScroll();
        if (fnr.length !== 0) {
            dispatch(personinformasjonFetch);
            dispatch(tråderFetch);
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
        tildDelteOppgaverFetch,
        tråderFetch
    ]);
    useFetchFeatureTogglesOnNewFnr();

    return null;
}

export default LyttPåNyttFnrIReduxOgHentAllPersoninfo;
