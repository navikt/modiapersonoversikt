import * as React from 'react';
import * as renderer from 'react-test-renderer';
import VisittkortBody from './VisittkortBody';
import { testStore } from '../../../../setupTests';
import { Provider } from 'react-redux';
import { getMockNavKontor } from '../../../../mock/navkontor-mock';
import { actionNames as navKontorActionNames } from '../../../../redux/navkontor';
import { actionNames as egenAnsattActionNames } from '../../../../redux/egenansatt';
import { actionNames as vergeMålActionNames } from '../../../../redux/vergemal';
import { kontaktinformasjonActionNames } from '../../../../redux/kontaktinformasjon';
import { aremark } from '../../../../mock/person/aremark';
import { StaticRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { personOversiktTheme } from '../../../../themes/personOversiktTheme';
import { getMockKontaktinformasjon } from '../../../../mock/kontaktinformasjon-mock';
import { getEgenAnsatt } from '../../../../api/egenansatt';
import { mockVergemal } from '../../../../mock/vergemal-mock';

test('viser info om bruker i visittkortbody', () => {
    testStore.dispatch({ type: navKontorActionNames.OK, data: getMockNavKontor('0118', undefined) });
    testStore.dispatch({ type: kontaktinformasjonActionNames.OK, data: getMockKontaktinformasjon('10108000398') });
    testStore.dispatch({ type: egenAnsattActionNames.OK, data: getEgenAnsatt('10108000398') });
    testStore.dispatch({ type: vergeMålActionNames.OK, data: mockVergemal('10108000398') });

    const visittkortbody = renderer.create(
        <Provider store={testStore}>
            <ThemeProvider theme={personOversiktTheme}>
                <StaticRouter context={{}}>
                    <VisittkortBody person={aremark}/>
                </StaticRouter>
            </ThemeProvider>
        </Provider>
    );

    const json = visittkortbody.toJSON();
    expect(json).toMatchSnapshot();
});
