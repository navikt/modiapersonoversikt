import '../../../../../src/testSetup';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { aremark } from '../../../../mock/person-mock';
import VisittkortHeader from './VisittkortHeader';

test.skip('viser info om bruker i visittkort-header', () => {
    const visittkortheader = renderer.create(
        <VisittkortHeader person={aremark} />
    );

    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});
