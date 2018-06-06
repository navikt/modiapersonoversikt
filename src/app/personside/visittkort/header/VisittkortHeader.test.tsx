import { Provider } from 'react-redux';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import VisittkortHeader from './VisittkortHeader';
import { actionNames as navKontorActionNames } from '../../../../redux/navkontor';
import { personinformasjonActionNames } from '../../../../redux/personinformasjon';
import { getMockNavKontor } from '../../../../mock/navkontor-mock';
import { testStore } from '../../../../setupTests';
import { aremark } from '../../../../mock/person/aremark';
import { getPerson } from '../../../../mock/person/personMock';
import { actionNames as vergeMålActionNames } from '../../../../redux/vergemal';
import { mockVergemal } from '../../../../mock/vergemal-mocks';
import { getEgenAnsatt } from '../../../../api/egenansatt';
import { actionNames as egenAnsattActionNames } from '../../../../redux/egenansatt';

test('viser info om bruker i visittkort-header', () => {
    testStore.dispatch({type: personinformasjonActionNames.OK, data: getPerson('10108000398')});
    testStore.dispatch({ type: navKontorActionNames.OK, data: getMockNavKontor('0118', undefined) });
    testStore.dispatch({ type: egenAnsattActionNames.OK, data: getEgenAnsatt('10108000398') });
    testStore.dispatch({ type: vergeMålActionNames.OK, data: mockVergemal('10108000398') });

    const visittkortheader = renderer.create(
        <Provider store={testStore}><VisittkortHeader person={aremark} /></Provider>
    );

    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});
