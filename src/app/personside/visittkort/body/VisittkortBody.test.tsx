import * as React from 'react';
import * as renderer from 'react-test-renderer';
import VisittkortBody from './VisittkortBody';
import { testStore } from '../../../../setupTests';
import { Provider } from 'react-redux';
import { getMockNavKontor } from '../../../../mock/navkontor-mock';
import { actionNames } from '../../../../redux/navkontor';
import { aremark } from '../../../../mock/person/aremark';

test('viser info om bruker i visittkortbody', () => {
    const visittkortbody = renderer.create(
        <Provider store={testStore}><VisittkortBody person={aremark} /></Provider>
    );

    testStore.dispatch({type: actionNames.OK, data: getMockNavKontor( '0118')});

    const json = visittkortbody.toJSON();
    expect(json).toMatchSnapshot();
});
