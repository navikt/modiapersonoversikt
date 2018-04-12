import '../../../../../src/testSetup';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { aremark } from '../../../../mock/person-mock';
import VisittkortBody from './VisittkortBody';


test.skip('viser info om bruker i visittkortbody', () => {
    const visittkortbody = renderer.create(
        <VisittkortBody person={aremark} />
    );

    const json = visittkortbody.toJSON();
    expect(json).toMatchSnapshot();
});
