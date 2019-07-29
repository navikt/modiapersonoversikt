import { applyMiddleware, createStore, Store } from 'redux';
import reducers, { AppState } from '../redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { aremark } from '../mock/person/aremark';
import { personinformasjonActionNames } from '../redux/restReducers/personinformasjon';
import { getPerson } from '../mock/person/personMock';
import { actionNames as navKontorActionNames } from '../redux/restReducers/navkontor';
import { getMockNavKontor } from '../mock/navkontor-mock';
import { getMockKontaktinformasjon } from '../mock/person/krrKontaktinformasjon/kontaktinformasjon-mock';
import { erEgenAnsatt } from '../mock/egenansatt-mock';
import { mockVergemal } from '../mock/person/vergemal/vergemalMock';
import { mockBaseUrls } from '../mock/baseUrls-mock';
import { getMockVeilederRoller } from '../mock/veilderRoller-mock';
import { tilrettelagtKommunikasjonActionNames } from '../redux/restReducers/kodeverk/tilrettelagtKommunikasjonReducer';
import { mockTilrettelagtKommunikasjonKodeverk } from '../mock/kodeverk/tilrettelagt-kommunikasjon-kodeverk-mock';
import { mockRetningsnummereKodeverk } from '../mock/kodeverk/retningsnummer-mock';
import { mockPostnummere } from '../mock/kodeverk/postnummer-kodeverk-mock';
import { landActionNames } from '../redux/restReducers/kodeverk/landKodeverk';
import { mockLandKodeverk } from '../mock/kodeverk/land-kodeverk-mock';
import { valutaerActionNames } from '../redux/restReducers/kodeverk/valutaKodeverk';
import { mockValutaKodeverk } from '../mock/kodeverk/valuta-kodeverk-mock';
import { utbetalingerActions } from '../redux/restReducers/utbetalinger';
import { statiskMockUtbetaling } from '../mock/statiskMockUtbetaling';
import { saksoversiktActions } from '../redux/restReducers/saksoversikt';
import { getStaticMockSaksoversikt } from '../mock/saksoversikt/saksoversikt-mock';
import { statiskVarselMock } from '../mock/varsler/statiskVarselMock';
import setNyGjeldendeBruker from '../redux/gjeldendeBruker/actions';
import { statiskOppfolgingMock } from '../mock/statiskOppfolgingMock';
import { getMockGsakTema } from '../mock/meldinger/oppgave-mock';
import { getMockInnloggetSaksbehandler } from '../mock/innloggetSaksbehandler-mock';
import { featureToggleActionNames } from '../redux/restReducers/featureToggles';

export function getTestStore(): Store<AppState> {
    const testStore = createStore(reducers, applyMiddleware(thunkMiddleware));
    const restResources = testStore.getState().restResources;
    const aremarkFnr = aremark.fødselsnummer;

    testStore.dispatch({ type: personinformasjonActionNames.FINISHED, data: getPerson(aremarkFnr) });
    testStore.dispatch(restResources.innloggetSaksbehandler.actions.setData(getMockInnloggetSaksbehandler()));
    testStore.dispatch({
        type: navKontorActionNames.FINISHED,
        data: { navKontor: getMockNavKontor('0118', undefined) }
    });
    testStore.dispatch(restResources.kontaktinformasjon.actions.setData(getMockKontaktinformasjon(aremarkFnr)));
    testStore.dispatch(restResources.egenAnsatt.actions.setData(erEgenAnsatt(aremarkFnr)));
    testStore.dispatch(restResources.vergemal.actions.setData(mockVergemal(aremarkFnr)));
    testStore.dispatch(restResources.baseUrl.actions.setData(mockBaseUrls()));
    testStore.dispatch(restResources.veilederRoller.actions.setData(getMockVeilederRoller()));
    testStore.dispatch({
        type: tilrettelagtKommunikasjonActionNames.FINISHED,
        data: mockTilrettelagtKommunikasjonKodeverk()
    });
    testStore.dispatch(restResources.retningsnummer.actions.setData(mockRetningsnummereKodeverk()));
    testStore.dispatch(restResources.postnummer.actions.setData(mockPostnummere()));
    testStore.dispatch({ type: landActionNames.FINISHED, data: mockLandKodeverk() });
    testStore.dispatch({ type: valutaerActionNames.FINISHED, data: mockValutaKodeverk() });
    testStore.dispatch({
        type: utbetalingerActions.FINISHED,
        data: {
            utbetalinger: [statiskMockUtbetaling],
            periode: { startDato: '1905-01-01', sluttDato: '1986-12-28' }
        }
    });
    testStore.dispatch({ type: saksoversiktActions.FINISHED, data: getStaticMockSaksoversikt() });
    testStore.dispatch(restResources.brukersVarsler.actions.setData(statiskVarselMock));
    testStore.dispatch(setNyGjeldendeBruker(aremarkFnr));
    testStore.dispatch(restResources.oppfolging.actions.setData(statiskOppfolgingMock));
    testStore.dispatch(restResources.oppgaveGsakTema.actions.setData(getMockGsakTema()));
    testStore.dispatch({ type: featureToggleActionNames.FINISHED, data: { 'saksoversikt-nytt-vindu': true } });

    return testStore;
}
