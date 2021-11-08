import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { aremark } from '../../../../../../mock/persondata/aremark';
import TestProvider from '../../../../../../test/Testprovider';
import KontaktinformasjonDodsbo from './Dodsbo';

test('viser dodsbo', () => {
    const dodsbo = renderer.create(
        <TestProvider>
            <KontaktinformasjonDodsbo dodsbo={aremark.dodsbo} />
        </TestProvider>
    );

    expect(dodsbo.toJSON()).toMatchSnapshot();
});
