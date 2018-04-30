import { Provider } from 'react-redux';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import VisittkortHeader from './VisittkortHeader';
import { actionNames } from '../../../../redux/navkontor';
import { personinformasjonActionNames } from '../../../../redux/personinformasjon';
import { getMockNavKontor } from '../../../../mock/navkontor-mock';
import { testStore } from '../../../../setupTests';
import { aremark } from '../../../../mock/person/aremark';
import {getPerson} from '../../../../mock/person/personMock';

test('viser info om bruker i visittkort-header', () => {
    testStore.dispatch({type: personinformasjonActionNames.OK, data: getPerson('10108000398')});
    testStore.dispatch({type: actionNames.OK, data: getMockNavKontor('0118')});

    const visittkortheader = renderer.create(
        <Provider store={testStore}><VisittkortHeader person={aremark} /></Provider>
    );

    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});
