import { configure } from 'enzyme';
import EnzymeReactAdapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'babel-polyfill';
import { getMockNavKontor } from './mock/navkontor-mock';
import 'jest-styled-components';
import reducers, { AppState } from './redux/reducers';
import { applyMiddleware, createStore, Store } from 'redux';
import { actionNames as navKontorActionNames } from './redux/restReducers/navkontor';
import { mockVergemal } from './mock/person/vergemal/vergemalMock';
import { kontaktinformasjonActionNames } from './redux/restReducers/kontaktinformasjon';
import { actionNames as egenAnsattActionNames } from './redux/restReducers/egenansatt';
import { actionNames as vergeMålActionNames } from './redux/restReducers/vergemal';
import { actionNames as baseUrlsActionNames } from './redux/restReducers/baseurls';
import { getMockKontaktinformasjon } from './mock/person/krrKontaktinformasjon/kontaktinformasjon-mock';
import { personinformasjonActionNames } from './redux/restReducers/personinformasjon';
import { getPerson } from './mock/person/personMock';
import { erEgenAnsatt } from './mock/egenansatt-mock';
import { mockBaseUrls } from './mock/baseUrls-mock';
import { veilederRollerReducerActionNames } from './redux/restReducers/veilederRoller';
import { getMockVeilederRoller } from './mock/veilderRoller-mock';
import { tilrettelagtKommunikasjonActionNames } from './redux/restReducers/kodeverk/tilrettelagtKommunikasjonReducer';
import { mockTilrettelagtKommunikasjonKodeverk } from './mock/kodeverk/tilrettelagt-kommunikasjon-kodeverk-mock';
import { retningsnummerKodeverkActionNames } from './redux/restReducers/kodeverk/retningsnummereReducer';
import { postnummerActionNames } from './redux/restReducers/kodeverk/postnummerReducer';
import { mockRetningsnummereKodeverk } from './mock/kodeverk/retningsnummer-mock';
import { mockPostnummere } from './mock/kodeverk/postnummer-kodeverk-mock';
import thunkMiddleware from 'redux-thunk';
import { landActionNames } from './redux/restReducers/kodeverk/landKodeverk';
import { mockLandKodeverk } from './mock/kodeverk/land-kodeverk-mock';
import { mockValutaKodeverk } from './mock/kodeverk/valuta-kodeverk-mock';
import { aremark } from './mock/person/aremark';
import { valutaerActionNames } from './redux/restReducers/kodeverk/valutaKodeverk';
import { utbetalingerActions } from './redux/restReducers/utbetalinger';
import { statiskMockUtbetaling } from './mock/statiskMockUtbetaling';
import { saksoversiktActions } from './redux/restReducers/saksoversikt';
import { getMockSaksoversiktForTest } from './mock/saksoversikt/saksoversikt-mock';
import FeatureToggle from './redux/featureToggle/FeatureToggle';

configure({ adapter: new EnzymeReactAdapter() });

// @ts-ignore
const globalAny: any = global;
globalAny._apiBaseUri = '';
globalAny._mockEnabled = 'true';

// Mocker funksjoner som returnerer dynamisk data
Date.now = jest.fn(() => 0);
const JSutils = require('nav-frontend-js-utils');
JSutils.guid = jest.fn(() => 'Helt tilfeldig ID');
FeatureToggle.prototype.actualRender = FeatureToggle.prototype.render;
FeatureToggle.prototype.render = function() {
    return this.props.children;
};

// @ts-ignore
window['frontendlogger'] = { info: () => null, warn: () => null, error: () => null, event: () => null };

export function getTestStore(): Store<AppState> {
    const testStore = createStore(reducers, applyMiddleware(thunkMiddleware));
    const aremarkFnr = aremark.fødselsnummer;

    testStore.dispatch({ type: personinformasjonActionNames.FINISHED, data: getPerson(aremarkFnr) });
    testStore.dispatch({
        type: navKontorActionNames.FINISHED,
        data: { navKontor: getMockNavKontor('0118', undefined) }
    });
    testStore.dispatch({ type: kontaktinformasjonActionNames.FINISHED, data: getMockKontaktinformasjon(aremarkFnr) });
    testStore.dispatch({ type: egenAnsattActionNames.FINISHED, data: erEgenAnsatt(aremarkFnr) });
    testStore.dispatch({ type: vergeMålActionNames.FINISHED, data: mockVergemal(aremarkFnr) });
    testStore.dispatch({ type: baseUrlsActionNames.FINISHED, data: mockBaseUrls() });
    testStore.dispatch({ type: veilederRollerReducerActionNames.FINISHED, data: getMockVeilederRoller() });
    testStore.dispatch({
        type: tilrettelagtKommunikasjonActionNames.FINISHED,
        data: mockTilrettelagtKommunikasjonKodeverk()
    });
    testStore.dispatch({ type: retningsnummerKodeverkActionNames.FINISHED, data: mockRetningsnummereKodeverk() });
    testStore.dispatch({ type: postnummerActionNames.FINISHED, data: mockPostnummere() });
    testStore.dispatch({ type: landActionNames.FINISHED, data: mockLandKodeverk() });
    testStore.dispatch({ type: valutaerActionNames.FINISHED, data: mockValutaKodeverk() });
    testStore.dispatch({
        type: utbetalingerActions.FINISHED,
        data: {
            utbetalinger: [statiskMockUtbetaling],
            periode: { startDato: '1905-01-01', sluttDato: '1986-12-28' }
        }
    });
    testStore.dispatch({ type: saksoversiktActions.FINISHED, data: getMockSaksoversiktForTest(aremarkFnr) });

    return testStore;
}
