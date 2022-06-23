import { applyMiddleware, createStore, Dispatch, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { cache, createCacheKey } from '@nutgaard/use-fetch';
import reducers, { AppState } from '../redux/reducers';
import { mockBaseUrls } from '../mock/baseUrls-mock';
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
import { setInnstillingerData } from '../redux/innstillinger';

export function getTestStore(): Store<AppState> {
    const testStore = createStore(reducers, applyMiddleware(thunkMiddleware));
    const restResources = testStore.getState().restResources;
    const aremarkFnr = aremark.personIdent;

    const dispatch = testStore.dispatch as Dispatch<any>;
    dispatch(setGjeldendeBrukerIRedux(aremarkFnr));
    dispatch(
        setInnstillingerData({
            sistLagret: new Date().toISOString(),
            innstillinger: {}
        })
    );
    dispatch(restResources.innloggetSaksbehandler.actions.setData(getMockInnloggetSaksbehandler()));
    dispatch(restResources.baseUrl.actions.setData(mockBaseUrls()));
    dispatch(restResources.veilederRoller.actions.setData({ roller: [SaksbehandlerRoller.HentOppgave] }));
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
    cache.putResolved(createCacheKey(`${apiBaseUri}/v2/person/${aremark.personIdent}`), {
        feiledeSystemer: [],
        person: aremark
    });
    cache.putResolved(createCacheKey(`${apiBaseUri}/v2/varsler/${aremark.personIdent}`), {
        feil: [],
        varsler: [
            ...statiskVarselMock,
            ...statiskDittnavEventVarselMock,
            ...statiskDittnavEventVarselMock,
            ...statiskDittnavEventVarselMock
        ]
    });
    cache.putResolved(
        createCacheKey(`${apiBaseUri}/v2/person/${aremark.personIdent}/aktorid`),
        `000${aremark.personIdent}000` as unknown as object
    );
}
