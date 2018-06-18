import * as React from 'react';
import * as renderer from 'react-test-renderer';
import VisittkortHeader from './VisittkortHeader';
import { aremark } from '../../../../mock/person/aremark';
import TestProvider from '../../../../test/Testprovider';

test('viser info om bruker i visittkort-header', () => {
    const visittkortheader = renderer.create(
        <TestProvider><VisittkortHeader person={aremark} /></TestProvider>
    );

    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});
