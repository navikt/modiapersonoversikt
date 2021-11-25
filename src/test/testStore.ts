import { applyMiddleware, createStore, Dispatch, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { cache, createCacheKey } from '@nutgaard/use-fetch';
import reducers, { AppState } from '../redux/reducers';
import { mockBaseUrls } from '../mock/baseUrls-mock';
import { mockTilrettelagtKommunikasjonKodeverk } from '../mock/kodeverk/tilrettelagt-kommunikasjon-kodeverk-mock';
import { mockRetningsnummereKodeverk } from '../mock/kodeverk/retningsnummer-mock';
import { mockPostnummere } from '../mock/kodeverk/postnummer-kodeverk-mock';
import { mockLandKodeverk } from '../mock/kodeverk/land-kodeverk-mock';
import { mockValutaKodeverk } from '../mock/kodeverk/valuta-kodeverk-mock';
import { getStaticMockSaksoversikt } from '../mock/saksoversikt/saksoversikt-mock';
import { statiskDittnavEventVarselMock, statiskVarselMock } from '../mock/varsler/statiskVarselMock';
import setGjeldendeBrukerIRedux from '../redux/gjeldendeBruker/actions';
import { statiskOppfolgingMock } from '../mock/statiskOppfolgingMock';
import { getMockGsakTema } from '../mock/meldinger/oppgave-mock';
import { getMockInnloggetSaksbehandler } from '../mock/innloggetSaksbehandler-mock';
import { pleiepengerTestData } from '../app/personside/infotabs/ytelser/pleiepenger/pleiepengerTestData';
import { statiskForeldrepengeMock } from '../mock/ytelse/statiskForeldrepengeMock';
import { statiskSykepengerMock } from '../mock/ytelse/statiskSykepengerMock';
import { statiskTraadMock } from '../mock/meldinger/statiskTraadMock';
import { statiskMockUtbetalingRespons } from '../mock/utbetalinger/statiskMockUtbetalingRespons';
import { SaksbehandlerRoller } from '../app/personside/dialogpanel/RollerUtils';
import { apiBaseUri } from '../api/config';
import { aremark } from '../mock/persondata/aremark';
import { hentPersondata } from '../mock/persondata/persondata';

export function getTestStore(): Store<AppState> {
    const testStore = createStore(reducers, applyMiddleware(thunkMiddleware));
    const restResources = testStore.getState().restResources;
    const aremarkFnr = aremark.fnr;

    const dispatch = testStore.dispatch as Dispatch<any>;
    dispatch(setGjeldendeBrukerIRedux(aremarkFnr));
    dispatch(hentPersondata(aremarkFnr));
    dispatch(restResources.innloggetSaksbehandler.actions.setData(getMockInnloggetSaksbehandler()));
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
            toggleId: false
        })
    );
    dispatch(restResources.traader.actions.setData([statiskTraadMock]));
    dispatch(restResources.pleiepenger.actions.setData({ pleiepenger: [pleiepengerTestData] }));
    dispatch(restResources.foreldrepenger.actions.setData({ foreldrepenger: [statiskForeldrepengeMock] }));
    dispatch(restResources.sykepenger.actions.setData({ sykepenger: [statiskSykepengerMock] }));

    setupFetchCache();

    return testStore;
}

export function setupFetchCache() {
    const fnrheader = (fnr: string) =>
        ({
            credentials: 'include',
            headers: {
                fodselsnummer: fnr
            }
        } as RequestInit);

    cache.putResolved(createCacheKey(`${apiBaseUri}/varsler/${aremark.fnr}`), statiskVarselMock);
    cache.putResolved(
        createCacheKey(`/modiapersonoversikt/proxy/dittnav-eventer-modia/fetch/oppgave/all`, fnrheader(aremark.fnr)),
        statiskDittnavEventVarselMock
    );
    cache.putResolved(
        createCacheKey(`/modiapersonoversikt/proxy/dittnav-eventer-modia/fetch/beskjed/all`, fnrheader(aremark.fnr)),
        statiskDittnavEventVarselMock
    );
    cache.putResolved(
        createCacheKey(`${apiBaseUri}/person/${aremark.fnr}/aktorid`),
        `000${aremark.fnr}000` as unknown as object
    );
}
