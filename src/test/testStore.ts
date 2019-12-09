import { applyMiddleware, createStore, Dispatch, Store } from 'redux';
import reducers, { AppState } from '../redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { aremark } from '../mock/person/aremark';
import { getPerson } from '../mock/person/personMock';
import { getMockNavKontor } from '../mock/navkontor-mock';
import { getMockKontaktinformasjon } from '../mock/person/krrKontaktinformasjon/kontaktinformasjon-mock';
import { erEgenAnsatt } from '../mock/egenansatt-mock';
import { mockVergemal } from '../mock/person/vergemal/vergemalMock';
import { mockBaseUrls } from '../mock/baseUrls-mock';
import { mockTilrettelagtKommunikasjonKodeverk } from '../mock/kodeverk/tilrettelagt-kommunikasjon-kodeverk-mock';
import { mockRetningsnummereKodeverk } from '../mock/kodeverk/retningsnummer-mock';
import { mockPostnummere } from '../mock/kodeverk/postnummer-kodeverk-mock';
import { mockLandKodeverk } from '../mock/kodeverk/land-kodeverk-mock';
import { mockValutaKodeverk } from '../mock/kodeverk/valuta-kodeverk-mock';
import { getStaticMockSaksoversikt } from '../mock/saksoversikt/saksoversikt-mock';
import { statiskVarselMock } from '../mock/varsler/statiskVarselMock';
import setGjeldendeBrukerIRedux from '../redux/gjeldendeBruker/actions';
import { statiskOppfolgingMock } from '../mock/statiskOppfolgingMock';
import { getMockGsakTema } from '../mock/meldinger/oppgave-mock';
import { getMockInnloggetSaksbehandler } from '../mock/innloggetSaksbehandler-mock';
import { FeatureToggles } from '../components/featureToggle/toggleIDs';
import { pleiepengerTestData } from '../app/personside/infotabs/ytelser/pleiepenger/pleiepengerTestData';
import { statiskForeldrepengeMock } from '../mock/ytelse/statiskForeldrepengeMock';
import { statiskSykepengerMock } from '../mock/ytelse/statiskSykepengerMock';
import { statiskTraadMock } from '../mock/meldinger/statiskTraadMock';
import { statiskMockUtbetalingRespons } from '../mock/utbetalinger/statiskMockUtbetalingRespons';
import { SaksbehandlerRoller } from '../utils/RollerUtils';

export function getTestStore(): Store<AppState> {
    const testStore = createStore(reducers, applyMiddleware(thunkMiddleware));
    const restResources = testStore.getState().restResources;
    const aremarkFnr = aremark.fødselsnummer;

    const dispatch = testStore.dispatch as Dispatch<any>;
    dispatch(setGjeldendeBrukerIRedux(aremarkFnr));
    dispatch(restResources.personinformasjon.actions.setData(getPerson(aremarkFnr)));
    dispatch(restResources.innloggetSaksbehandler.actions.setData(getMockInnloggetSaksbehandler()));
    dispatch(restResources.brukersNavKontor.actions.setData(getMockNavKontor('0118', undefined)));
    dispatch(restResources.kontaktinformasjon.actions.setData(getMockKontaktinformasjon(aremarkFnr)));
    dispatch(restResources.egenAnsatt.actions.setData(erEgenAnsatt(aremarkFnr)));
    dispatch(restResources.vergemal.actions.setData(mockVergemal(aremarkFnr)));
    dispatch(restResources.baseUrl.actions.setData(mockBaseUrls()));
    dispatch(restResources.veilederRoller.actions.setData({ roller: [SaksbehandlerRoller.HentOppgave] }));
    dispatch(restResources.tilrettelagtKommunikasjonKodeverk.actions.setData(mockTilrettelagtKommunikasjonKodeverk()));
    dispatch(restResources.retningsnummer.actions.setData(mockRetningsnummereKodeverk()));
    dispatch(restResources.postnummer.actions.setData(mockPostnummere()));
    dispatch(restResources.land.actions.setData(mockLandKodeverk()));
    dispatch(restResources.valuta.actions.setData(mockValutaKodeverk()));
    dispatch(restResources.utbetalinger.actions.setData(statiskMockUtbetalingRespons));
    dispatch(restResources.utbetalingerOversikt.actions.setData(statiskMockUtbetalingRespons));
    dispatch(restResources.sakstema.actions.setData(getStaticMockSaksoversikt()));
    dispatch(restResources.brukersVarsler.actions.setData(statiskVarselMock));
    dispatch(restResources.oppfolging.actions.setData(statiskOppfolgingMock));
    dispatch(restResources.oppgaveGsakTema.actions.setData(getMockGsakTema()));
    dispatch(
        restResources.featureToggles.actions.setData({
            [FeatureToggles.SaksoversiktNyttVindu]: true
        })
    );
    dispatch(restResources.tråderOgMeldinger.actions.setData([statiskTraadMock]));
    dispatch(restResources.pleiepenger.actions.setData({ pleiepenger: [pleiepengerTestData] }));
    dispatch(restResources.foreldrepenger.actions.setData({ foreldrepenger: [statiskForeldrepengeMock] }));
    dispatch(restResources.sykepenger.actions.setData({ sykepenger: [statiskSykepengerMock] }));
    return testStore;
}
