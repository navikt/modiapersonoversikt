import type { UseQueryResult } from '@tanstack/react-query';
import { applyMiddleware, createStore, type Dispatch, type Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { statiskArbeidsavklaringspengerMock } from 'src/mock/ytelse/statiskArbeidsavklaringspengerMock';
import {
    statiskEngangstonadFpSakMock,
    statiskForeldrepengerFpSakMock
} from 'src/mock/ytelse/statiskForeldrepengerFpSakMock';
import { statiskPensjonMock } from 'src/mock/ytelse/statiskPensjonMock';
import { statiskPeriodeDagpengerDtoMock } from 'src/mock/ytelse/statiskPeriodeDagpengerDtoMock';
import { statiskSykepengerSpokelseMock } from 'src/mock/ytelse/statiskSykepengerSpokelseMock';
import { type MockInstance, vi } from 'vitest';
import type { FetchError } from '../api/api';
import { pleiepengerTestData } from '../app/personside/infotabs/ytelser/pleiepenger/pleiepengerTestData';
import { FeatureToggles } from '../components/featureToggle/toggleIDs';
import { mockBaseUrls } from '../mock/baseUrls-mock';
import { getMockGsakTema } from '../mock/meldinger/oppgave-mock';
import { statiskTraadMock } from '../mock/meldinger/statiskTraadMock';
import { aremark } from '../mock/persondata/aremark';
import { getStaticMockSaksoversiktV2 } from '../mock/saksoversikt/saksoversikt-mock';
import { statiskOppfolgingMock } from '../mock/statiskOppfolgingMock';
import { statiskMockUtbetalingRespons } from '../mock/utbetalinger/statiskMockUtbetalingRespons';
import { statiskDittnavEventVarselMock } from '../mock/varsler/statiskVarselMock';
import { statiskForeldrepengeMock } from '../mock/ytelse/statiskForeldrepengeMock';
import { statiskSykepengerMock } from '../mock/ytelse/statiskSykepengerMock';
import { statiskTiltakspengerMock } from '../mock/ytelse/statiskTiltakspengerMock';
import setGjeldendeBrukerIRedux from '../redux/gjeldendeBruker/actions';
import reducers, { type AppState } from '../redux/reducers';
import aktoridResource from '../rest/resources/aktoridResource';
import * as arbeidsavklaringspengerReesource from '../rest/resources/arbeidsavklaringspengerResource';
import baseurlsResource from '../rest/resources/baseurlsResource';
import * as dagpengerResource from '../rest/resources/dagpengerResource';
import dialogResource from '../rest/resources/dialogResource';
import featuretogglesResource from '../rest/resources/featuretogglesResource';
import * as foreldrepengerFpSakResource from '../rest/resources/foreldrepengerFpSakResource';
import * as foreldrepengerResource from '../rest/resources/foreldrepengerResource';
import gsaktemaResource from '../rest/resources/gsaktemaResource';
import innstillingerResource from '../rest/resources/innstillingerResource';
import oppfolgingResource from '../rest/resources/oppfolgingResource';
import * as pensjonResource from '../rest/resources/pensjonResource';
import persondataResource from '../rest/resources/persondataResource';
import * as pleiepengerResource from '../rest/resources/pleiepengerResource';
import sakstemaResource from '../rest/resources/sakstemaResource';
import * as sykepengerResource from '../rest/resources/sykepengerResource';
import * as sykepengerSpokelseResource from '../rest/resources/sykepengerSpokelseResource';
import * as tiltakspengerResource from '../rest/resources/tiltakspengerResource';
import utbetalingerResource from '../rest/resources/utbetalingerResource';
import varselResource from '../rest/resources/varselResource';

export function getTestStore(): Store<AppState> {
    const testStore = createStore(reducers(), applyMiddleware(thunkMiddleware));
    const aremarkFnr = aremark.personIdent;

    // eslint-disable-next-line
    //biome-ignore lint/suspicious/noExplicitAny: biome migration
    const dispatch = testStore.dispatch as Dispatch<any>;
    dispatch(setGjeldendeBrukerIRedux(aremarkFnr));

    return testStore;
}

export function mockReactQuery<A extends unknown[], R>(
    resource: (...args: A) => UseQueryResult<R>,
    data: R,
    extra?: Partial<Omit<UseQueryResult<R>, 'data'>>
) {
    (resource as unknown as MockInstance<(...args: A) => Partial<UseQueryResult<R>>>).mockImplementation(
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
    vi.spyOn(foreldrepengerResource, 'useForeldrepenger');
    vi.spyOn(pleiepengerResource, 'usePleiepenger');
    vi.spyOn(sykepengerResource, 'useSykepenger');
    vi.spyOn(sykepengerSpokelseResource, 'useSykepengerSpokelse');
    vi.spyOn(tiltakspengerResource, 'useTiltakspenger');
    vi.spyOn(pensjonResource, 'usePensjon');
    vi.spyOn(arbeidsavklaringspengerReesource, 'useArbeidsavklaringspenger');
    vi.spyOn(foreldrepengerFpSakResource, 'useForeldrepengerFpSak');
    vi.spyOn(dagpengerResource, 'usePeriodeDagpengerDto');
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
        [FeatureToggles.JournalforUtenSvar]: true,
        [FeatureToggles.VisPromptMeldingSending]: true,
        [FeatureToggles.VisSiste14aVedtak]: true,
        [FeatureToggles.NyModiaKnapp]: true,
        [FeatureToggles.InfotrygdForeldrepenger]: true,
        [FeatureToggles.InfotrygdPleiepenger]: true,
        [FeatureToggles.InfotrygdSykepenger]: true,
        [FeatureToggles.SpokelseSykepenger]: true
    });
    mockReactQuery(gsaktemaResource.useFetch, getMockGsakTema());
    mockReactQuery(foreldrepengerResource.useForeldrepenger, {
        foreldrepenger: [statiskForeldrepengeMock]
    });
    mockReactQuery(pleiepengerResource.usePleiepenger, {
        pleiepenger: [pleiepengerTestData]
    });
    mockReactQuery(sykepengerResource.useSykepenger, {
        sykepenger: [statiskSykepengerMock]
    });
    mockReactQuery(tiltakspengerResource.useTiltakspenger, [statiskTiltakspengerMock]);
    mockReactQuery(pensjonResource.usePensjon, [statiskPensjonMock]);
    mockReactQuery(arbeidsavklaringspengerReesource.useArbeidsavklaringspenger, [statiskArbeidsavklaringspengerMock]);
    mockReactQuery(foreldrepengerFpSakResource.useForeldrepengerFpSak, [
        statiskForeldrepengerFpSakMock,
        statiskEngangstonadFpSakMock,
        statiskEngangstonadFpSakMock
    ]);
    mockReactQuery(dagpengerResource.usePeriodeDagpengerDto, [statiskPeriodeDagpengerDtoMock]);
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
        varsler: [...statiskDittnavEventVarselMock, ...statiskDittnavEventVarselMock, ...statiskDittnavEventVarselMock]
    });
    mockReactQuery(sykepengerSpokelseResource.useSykepengerSpokelse, statiskSykepengerSpokelseMock);
}
