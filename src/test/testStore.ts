import { applyMiddleware, createStore, Dispatch, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers, { AppState } from '../redux/reducers';
import { mockBaseUrls } from '../mock/baseUrls-mock';
import { getStaticMockSaksoversiktV2 } from '../mock/saksoversikt/saksoversikt-mock';
import { statiskDittnavEventVarselMock, statiskVarselMock } from '../mock/varsler/statiskVarselMock';
import setGjeldendeBrukerIRedux from '../redux/gjeldendeBruker/actions';
import { statiskOppfolgingMock } from '../mock/statiskOppfolgingMock';
import { getMockGsakTema } from '../mock/meldinger/oppgave-mock';
import { pleiepengerTestData } from '../app/personside/infotabs/ytelser/pleiepenger/pleiepengerTestData';
import { statiskForeldrepengeMock } from '../mock/ytelse/statiskForeldrepengeMock';
import { statiskSykepengerMock } from '../mock/ytelse/statiskSykepengerMock';
import { statiskTraadMock } from '../mock/meldinger/statiskTraadMock';
import { statiskMockUtbetalingRespons } from '../mock/utbetalinger/statiskMockUtbetalingRespons';
import { aremark } from '../mock/persondata/aremark';
import innstillingerResource from '../rest/resources/innstillingerResource';
import dialogResource from '../rest/resources/dialogResource';
import baseurlsResource from '../rest/resources/baseurlsResource';
import featuretogglesResource from '../rest/resources/featuretogglesResource';
import foreldrepengerResource from '../rest/resources/foreldrepengerResource';
import pleiepengerResource from '../rest/resources/pleiepengerResource';
import sykepengerResource from '../rest/resources/sykepengerResource';
import gsaktemaResource from '../rest/resources/gsaktemaResource';
import oppfolgingResource from '../rest/resources/oppfolgingResource';
import sakstemaResource from '../rest/resources/sakstemaResource';
import utbetalingerResource from '../rest/resources/utbetalingerResource';
import persondataResource from '../rest/resources/persondataResource';
import aktoridResource from '../rest/resources/aktoridResource';
import varselResource from '../rest/resources/varselResource';
import { MockInstance, vi } from 'vitest';
import { createBrowserHistory } from 'history';
import { UseQueryResult } from '@tanstack/react-query';
import { FeatureToggles } from '../components/featureToggle/toggleIDs';
import { FetchError } from '../api/api';

const history = createBrowserHistory();

export function getTestStore(): Store<AppState> {
    const testStore = createStore(reducers(history), applyMiddleware(thunkMiddleware));
    const aremarkFnr = aremark.personIdent;

    // eslint-disable-next-line
    const dispatch = testStore.dispatch as Dispatch<any>;
    dispatch(setGjeldendeBrukerIRedux(aremarkFnr));

    return testStore;
}

export function mockReactQuery<A extends unknown[], R>(
    resource: (...args: A) => UseQueryResult<R>,
    data: R,
    extra: Partial<Omit<UseQueryResult<R>, 'data'>>
) {
    (resource as unknown as MockInstance<A, Partial<UseQueryResult<R, FetchError>>>).mockImplementation(
        () =>
            ({
                data,
                ...extra
            }) as Partial<UseQueryResult<R, FetchError>>
    );
}
export function setupReactQueryMocks() {
    vi.spyOn(innstillingerResource, 'useFetch');
    vi.spyOn(dialogResource, 'useFetch');
    vi.spyOn(baseurlsResource, 'useFetch');
    vi.spyOn(featuretogglesResource, 'useFetch');
    vi.spyOn(foreldrepengerResource, 'useFetch');
    vi.spyOn(pleiepengerResource, 'useFetch');
    vi.spyOn(sykepengerResource, 'useFetch');
    vi.spyOn(gsaktemaResource, 'useFetch');
    vi.spyOn(oppfolgingResource, 'useFetch');
    vi.spyOn(sakstemaResource, 'useFetch');
    vi.spyOn(utbetalingerResource, 'useFetch');
    vi.spyOn(persondataResource, 'useFetch');
    vi.spyOn(aktoridResource, 'useFetch');
    vi.spyOn(varselResource, 'useFetch');

    mockReactQuery(innstillingerResource.useFetch, {
        sistLagret: new Date().toISOString(),
        innstillinger: {}
    });
    mockReactQuery(dialogResource.useFetch, [statiskTraadMock]);
    mockReactQuery(baseurlsResource.useFetch, mockBaseUrls());
    mockReactQuery(featuretogglesResource.useFetch, {
        [FeatureToggles.BrukNyDecorator]: true,
        [FeatureToggles.JournalforUtenSvar]: true,
        [FeatureToggles.VisPromptMeldingSending]: true,
        [FeatureToggles.BrukWebworkerPaaInnLogging]: true
    });
    mockReactQuery(gsaktemaResource.useFetch, getMockGsakTema());
    mockReactQuery(foreldrepengerResource.useFetch, {
        foreldrepenger: [statiskForeldrepengeMock]
    });
    mockReactQuery(pleiepengerResource.useFetch, {
        pleiepenger: [pleiepengerTestData]
    });
    mockReactQuery(sykepengerResource.useFetch, {
        sykepenger: [statiskSykepengerMock]
    });
    mockReactQuery(oppfolgingResource.useFetch, statiskOppfolgingMock);
    mockReactQuery(sakstemaResource.useFetch, getStaticMockSaksoversiktV2());
    mockReactQuery(utbetalingerResource.useFetch, statiskMockUtbetalingRespons);
    mockReactQuery(persondataResource.useFetch, {
        feilendeSystemer: [],
        person: aremark
    });
    mockReactQuery(aktoridResource.useFetch, `000${aremark.personIdent}000`);
    mockReactQuery(varselResource.useFetch, {
        feil: [],
        varsler: [
            ...statiskVarselMock,
            ...statiskDittnavEventVarselMock,
            ...statiskDittnavEventVarselMock,
            ...statiskDittnavEventVarselMock
        ]
    });
}
