import * as React from 'react';
import * as renderer from 'react-test-renderer';
import VisittkortBody from './VisittkortBody';
import { testStore } from '../../../../setupTests';
import { Provider } from 'react-redux';
import { getMockNavKontor } from '../../../../mock/navkontor-mock';
import { actionNames as navKontorActionNames } from '../../../../redux/navkontor';
import { aremark } from '../../../../mock/person/aremark';
import { StaticRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { personOversiktTheme } from '../../../../themes/personOversiktTheme';

test('viser info om bruker i visittkortbody', () => {
    const visittkortbody = renderer.create(
        <Provider store={testStore}>
            <ThemeProvider theme={personOversiktTheme}>
                <StaticRouter context={{}}>
                    <VisittkortBody person={aremark}/>
                </StaticRouter>
            </ThemeProvider>
        </Provider>
    );

    testStore.dispatch({ type: navKontorActionNames.OK, data: getMockNavKontor('0118', undefined) });

    const json = visittkortbody.toJSON();
    expect(json).toMatchSnapshot();
});
