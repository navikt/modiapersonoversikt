import { Provider } from 'react-redux';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import VisittkortHeader from './VisittkortHeader';
import { testStore } from '../../../../setupTests';
import { aremark } from '../../../../mock/person/aremark';

test('viser info om bruker i visittkort-header', () => {
    const visittkortheader = renderer.create(
        <Provider store={testStore}><VisittkortHeader person={aremark} /></Provider>
    );

    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});
