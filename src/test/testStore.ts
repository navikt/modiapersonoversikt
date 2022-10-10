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
    dispatch(restResources.utbetalinger.actions.setData(statiskMockUtbetalingRespons));
    dispatch(restResources.utbetalingerOversikt.actions.setData(statiskMockUtbetalingRespons));
    dispatch(restResources.oppfolging.actions.setData(statiskOppfolgingMock));
    dispatch(restResources.traader.actions.setData([statiskTraadMock]));
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
    cache.putResolved(createCacheKey(`${apiBaseUri}/dialogoppgave/v2/tema`), getMockGsakTema());
    cache.putResolved(
        createCacheKey(`${apiBaseUri}/saker/${aremark.personIdent}/sakstema`),
        getStaticMockSaksoversikt()
    );
    cache.putResolved(createCacheKey(`${apiBaseUri}/baseurls`), mockBaseUrls());
    cache.putResolved(createCacheKey(`${apiBaseUri}/veileder/roller`), { roller: [SaksbehandlerRoller.HentOppgave] });
    cache.putResolved(createCacheKey(`${apiBaseUri}/ytelse/sykepenger/${aremark.personIdent}`), {
        sykepenger: [statiskSykepengerMock]
    });
    cache.putResolved(createCacheKey(`${apiBaseUri}/ytelse/pleiepenger/${aremark.personIdent}`), {
        pleiepenger: [pleiepengerTestData]
    });
    cache.putResolved(createCacheKey(`${apiBaseUri}/ytelse/foreldrepenger/${aremark.personIdent}`), {
        foreldrepenger: [statiskForeldrepengeMock]
    });
    cache.putResolved(createCacheKey(`${apiBaseUri}/featuretoggle`), {
        toggleId: false
    });
    cache.putResolved(createCacheKey(`${apiBaseUri}/hode/me`), getMockInnloggetSaksbehandler());
}
