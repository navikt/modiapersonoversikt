import { applyMiddleware, createStore, Dispatch, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers, { AppState } from '../redux/reducers';
import { mockBaseUrls } from '../mock/baseUrls-mock';
import { getStaticMockSaksoversikt, getStaticMockSaksoversiktV2 } from '../mock/saksoversikt/saksoversikt-mock';
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
import sakstemaResource, { sakstemaResourceV2 } from '../rest/resources/sakstemaResource';
import utbetalingerResource from '../rest/resources/utbetalingerResource';
import persondataResource from '../rest/resources/persondataResource';
import aktoridResource from '../rest/resources/aktoridResource';
import varselResource from '../rest/resources/varselResource';

export function getTestStore(): Store<AppState> {
    const testStore = createStore(reducers, applyMiddleware(thunkMiddleware));
    const aremarkFnr = aremark.personIdent;

    const dispatch = testStore.dispatch as Dispatch<any>;
    dispatch(setGjeldendeBrukerIRedux(aremarkFnr));

    return testStore;
}

export function mockReactQuery(resource: any, data: any, extra: {} = {}) {
    (resource as jest.Mock<any>).mockImplementation(() => ({
        data,
        ...extra
    }));
}
export function setupReactQueryMocks() {
    jest.spyOn(innstillingerResource, 'useFetch');
    jest.spyOn(dialogResource, 'useFetch');
    jest.spyOn(baseurlsResource, 'useFetch');
    jest.spyOn(featuretogglesResource, 'useFetch');
    jest.spyOn(foreldrepengerResource, 'useFetch');
    jest.spyOn(pleiepengerResource, 'useFetch');
    jest.spyOn(sykepengerResource, 'useFetch');
    jest.spyOn(gsaktemaResource, 'useFetch');
    jest.spyOn(oppfolgingResource, 'useFetch');
    jest.spyOn(sakstemaResource, 'useFetch');
    jest.spyOn(sakstemaResourceV2, 'useFetch');
    jest.spyOn(utbetalingerResource, 'useFetch');
    jest.spyOn(persondataResource, 'useFetch');
    jest.spyOn(aktoridResource, 'useFetch');
    jest.spyOn(varselResource, 'useFetch');

    mockReactQuery(innstillingerResource.useFetch, {
        sistLagret: new Date().toISOString(),
        innstillinger: {}
    });
    mockReactQuery(dialogResource.useFetch, [statiskTraadMock]);
    mockReactQuery(baseurlsResource.useFetch, mockBaseUrls());
    mockReactQuery(featuretogglesResource.useFetch, { toggleId: false });
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
    mockReactQuery(sakstemaResource.useFetch, getStaticMockSaksoversikt());
    mockReactQuery(sakstemaResourceV2.useFetch, getStaticMockSaksoversiktV2());
    mockReactQuery(utbetalingerResource.useFetch, statiskMockUtbetalingRespons);
    mockReactQuery(persondataResource.useFetch, {
        feiledeSystemer: [],
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
