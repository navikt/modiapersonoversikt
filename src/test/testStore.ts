import { applyMiddleware, createStore, Store } from 'redux';
import reducers, { AppState } from '../redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { aremark } from '../mock/person/aremark';
import { getPerson } from '../mock/person/personMock';
import { getMockNavKontor } from '../mock/navkontor-mock';
import { getMockKontaktinformasjon } from '../mock/person/krrKontaktinformasjon/kontaktinformasjon-mock';
import { erEgenAnsatt } from '../mock/egenansatt-mock';
import { mockVergemal } from '../mock/person/vergemal/vergemalMock';
import { mockBaseUrls } from '../mock/baseUrls-mock';
import { getMockVeilederRoller } from '../mock/veilderRoller-mock';
import { mockTilrettelagtKommunikasjonKodeverk } from '../mock/kodeverk/tilrettelagt-kommunikasjon-kodeverk-mock';
import { mockRetningsnummereKodeverk } from '../mock/kodeverk/retningsnummer-mock';
import { mockPostnummere } from '../mock/kodeverk/postnummer-kodeverk-mock';
import { mockLandKodeverk } from '../mock/kodeverk/land-kodeverk-mock';
import { mockValutaKodeverk } from '../mock/kodeverk/valuta-kodeverk-mock';
import { statiskMockUtbetaling } from '../mock/statiskMockUtbetaling';
import { getStaticMockSaksoversikt } from '../mock/saksoversikt/saksoversikt-mock';
import { statiskVarselMock } from '../mock/varsler/statiskVarselMock';
import setGjeldendeBrukerIRedux from '../redux/gjeldendeBruker/actions';
import { statiskOppfolgingMock } from '../mock/statiskOppfolgingMock';
import { getMockGsakTema } from '../mock/meldinger/oppgave-mock';
import { getMockInnloggetSaksbehandler } from '../mock/innloggetSaksbehandler-mock';
import { FeatureToggles } from '../components/featureToggle/toggleIDs';

export function getTestStore(): Store<AppState> {
    const testStore = createStore(reducers, applyMiddleware(thunkMiddleware));
    const restResources = testStore.getState().restResources;
    const aremarkFnr = aremark.fødselsnummer;

    testStore.dispatch(restResources.personinformasjon.actions.setData(getPerson(aremarkFnr)));
    testStore.dispatch(restResources.innloggetSaksbehandler.actions.setData(getMockInnloggetSaksbehandler()));
    testStore.dispatch(restResources.brukersNavKontor.actions.setData(getMockNavKontor('0118', undefined)));
    testStore.dispatch(restResources.kontaktinformasjon.actions.setData(getMockKontaktinformasjon(aremarkFnr)));
    testStore.dispatch(restResources.egenAnsatt.actions.setData(erEgenAnsatt(aremarkFnr)));
    testStore.dispatch(restResources.vergemal.actions.setData(mockVergemal(aremarkFnr)));
    testStore.dispatch(restResources.baseUrl.actions.setData(mockBaseUrls()));
    testStore.dispatch(restResources.veilederRoller.actions.setData(getMockVeilederRoller()));
    testStore.dispatch(
        restResources.tilrettelagtKommunikasjonKodeverk.actions.setData(mockTilrettelagtKommunikasjonKodeverk())
    );
    testStore.dispatch(restResources.retningsnummer.actions.setData(mockRetningsnummereKodeverk()));
    testStore.dispatch(restResources.postnummer.actions.setData(mockPostnummere()));
    testStore.dispatch(restResources.land.actions.setData(mockLandKodeverk()));
    testStore.dispatch(restResources.valuta.actions.setData(mockValutaKodeverk()));
    testStore.dispatch(
        restResources.utbetalinger.actions.setData({
            utbetalinger: [statiskMockUtbetaling],
            periode: { startDato: '1905-01-01', sluttDato: '1986-12-28' }
        })
    );
    testStore.dispatch(restResources.sakstema.actions.setData(getStaticMockSaksoversikt()));
    testStore.dispatch(restResources.brukersVarsler.actions.setData(statiskVarselMock));
    testStore.dispatch(setGjeldendeBrukerIRedux(aremarkFnr));
    testStore.dispatch(restResources.oppfolging.actions.setData(statiskOppfolgingMock));
    testStore.dispatch(restResources.oppgaveGsakTema.actions.setData(getMockGsakTema()));
    testStore.dispatch(restResources.featureToggles.actions.setData({ [FeatureToggles.SaksoversiktNyttVindu]: true }));

    return testStore;
}
