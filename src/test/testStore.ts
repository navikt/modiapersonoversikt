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
import innstillingerResource from '../rest/resources/innstillingerResource';
import dialogResource from '../rest/resources/dialogResource';

export function getTestStore(): Store<AppState> {
    const testStore = createStore(reducers, applyMiddleware(thunkMiddleware));
    const aremarkFnr = aremark.personIdent;

    const dispatch = testStore.dispatch as Dispatch<any>;
    dispatch(setGjeldendeBrukerIRedux(aremarkFnr));
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
    cache.putResolved(createCacheKey(`${apiBaseUri}/dialog/${aremark.personIdent}/meldinger`), [statiskTraadMock]);
    cache.putResolved(createCacheKey(`${apiBaseUri}/featuretoggle`), {
        toggleId: false
    });
    cache.putResolved(createCacheKey(`${apiBaseUri}/hode/me`), getMockInnloggetSaksbehandler());
    cache.putResolved(
        createCacheKey(
            `${apiBaseUri}/oppfolging/${aremark.personIdent}/ytelserogkontrakter?startDato=1969-11-01&sluttDato=1970-02-01`
        ),
        statiskOppfolgingMock
    );
    cache.putResolved(
        createCacheKey(`${apiBaseUri}/utbetaling/${aremark.personIdent}?startDato=1969-12-02&sluttDato=1970-04-11`),
        statiskMockUtbetalingRespons
    );
    cache.putResolved(createCacheKey('/modiapersonoversikt/proxy/modia-innstillinger/api/innstillinger'), {
        sistLagret: new Date().toISOString(),
        innstillinger: {}
    });
}

export function setupReactQueryMocks() {
    jest.spyOn(innstillingerResource, 'useFetch');
    jest.spyOn(dialogResource, 'useFetch');
    (innstillingerResource.useFetch as jest.Mock<any>).mockImplementation(() => ({
        data: {
            sistLagret: new Date().toISOString(),
            innstillinger: {}
        }
    }));
    (dialogResource.useFetch as jest.Mock<any>).mockImplementation(() => ({
        data: [statiskTraadMock]
    }));
}
