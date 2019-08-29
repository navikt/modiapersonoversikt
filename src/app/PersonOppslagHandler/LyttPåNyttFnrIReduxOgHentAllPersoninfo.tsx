import { resetKontrollSpørsmål } from '../../redux/kontrollSporsmal/actions';
import { useEffect } from 'react';
import { AppState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { AsyncAction } from '../../redux/ThunkTypes';
import { useFetchFeatureTogglesOnNewFnr } from './FetchFeatureToggles';
import { cache } from '@nutgaard/use-fetch';
import { setDialogpanelTraad } from '../../redux/oppgave/actions';

function useDispatchOnNewFnr(action: Action | AsyncAction, fnr: string) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(action);
    }, [action, fnr, dispatch]);
}

function LyttPåNyttFnrIReduxOgHentAllPersoninfo() {
    const fnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const restResources = useSelector((state: AppState) => state.restResources);

    useDispatchOnNewFnr(resetKontrollSpørsmål, fnr);
    useDispatchOnNewFnr(restResources.personinformasjon.actions.fetch, fnr);
    useDispatchOnNewFnr(restResources.kontaktinformasjon.actions.fetch, fnr);
    useDispatchOnNewFnr(restResources.vergemal.actions.fetch, fnr);
    useDispatchOnNewFnr(restResources.egenAnsatt.actions.fetch, fnr);
    useDispatchOnNewFnr(restResources.tildDelteOppgaver.actions.fetch, fnr);

    useDispatchOnNewFnr(restResources.brukersNavKontor.actions.reset, fnr);
    useDispatchOnNewFnr(restResources.utbetalinger.actions.reset, fnr);
    useDispatchOnNewFnr(restResources.pleiepenger.actions.reset, fnr);
    useDispatchOnNewFnr(restResources.sykepenger.actions.reset, fnr);
    useDispatchOnNewFnr(restResources.foreldrepenger.actions.reset, fnr);
    useDispatchOnNewFnr(restResources.sendReferat.actions.reset, fnr);
    useDispatchOnNewFnr(restResources.sendSpørsmål.actions.reset, fnr);
    useDispatchOnNewFnr(restResources.sendSvar.actions.reset, fnr);
    useDispatchOnNewFnr(restResources.leggTilbakeOppgave.actions.reset, fnr);
    useDispatchOnNewFnr(restResources.tråderOgMeldinger.actions.reset, fnr);
    useDispatchOnNewFnr(restResources.brukersVarsler.actions.reset, fnr);
    useDispatchOnNewFnr(restResources.sakstema.actions.reset, fnr);
    useDispatchOnNewFnr(restResources.oppfolging.actions.reset, fnr);
    useDispatchOnNewFnr(restResources.opprettOppgave.actions.reset, fnr);

    useFetchFeatureTogglesOnNewFnr();
    useDispatchOnNewFnr(setDialogpanelTraad(undefined), fnr);

    useEffect(() => {
        cache.clear();
    }, [fnr]);

    return null;
}

export default LyttPåNyttFnrIReduxOgHentAllPersoninfo;
