import { Provider } from 'react-redux';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { aremark } from '../../../../mock/person/person-mock';
import VisittkortHeader from './VisittkortHeader';
import { actionNames } from '../../../../redux/navkontor';
import { getMockNavKontor } from '../../../../mock/navkontor-mock';
import { testStore } from '../../../../setupTests';

test('viser info om bruker i visittkort-header', () => {
    const visittkortheader = renderer.create(
        <Provider store={testStore}><VisittkortHeader person={aremark} /></Provider>
    );

    testStore.dispatch({type: actionNames.OK, data: getMockNavKontor('0118')});

    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});
