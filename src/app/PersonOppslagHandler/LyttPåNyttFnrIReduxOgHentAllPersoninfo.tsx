import { hentFeatureToggles } from '../../redux/restReducers/featureToggles';
import { resetNavKontorResource } from '../../redux/restReducers/navkontor';
import { resetUtbetalingerResource } from '../../redux/restReducers/utbetalinger';
import { resetKontrollSpørsmål } from '../../redux/kontrollSporsmal/actions';
import { hentPerson } from '../../redux/restReducers/personinformasjon';
import { useEffect } from 'react';
import { AppState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';

function LyttPåNyttFnrIReduxOgHentAllPersoninfo() {
    const dispatch = useDispatch();
    const fnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const restResources = useSelector((state: AppState) => state.restResources);

    useEffect(() => {
        dispatch(hentPerson(fnr));
        dispatch(restResources.kontaktinformasjon.actions.fetch);
        dispatch(restResources.vergemal.actions.fetch);
        dispatch(restResources.egenAnsatt.actions.fetch);
        dispatch(hentFeatureToggles());
        dispatch(resetNavKontorResource());
        dispatch(resetUtbetalingerResource());
        dispatch(restResources.sykepenger.actions.reset);
        dispatch(restResources.pleiepenger.actions.reset);
        dispatch(restResources.foreldrepenger.actions.reset);
        dispatch(restResources.utførteUtbetalingerYtelser.actions.reset);
        dispatch(resetKontrollSpørsmål());
        dispatch(restResources.sendMelding.actions.reset);
        dispatch(restResources.tråderOgMeldinger.actions.reset);
        dispatch(restResources.brukersVarsler.actions.reset);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, fnr]);

    return null;
}

export default LyttPåNyttFnrIReduxOgHentAllPersoninfo;
