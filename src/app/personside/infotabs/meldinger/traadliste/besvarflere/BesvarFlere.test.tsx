import * as React from 'react';
import TestProvider from '../../../../../../test/Testprovider';
import BesvarFlere from './BesvarFlere';
import { statiskTraadMock } from '../../../../../../mock/meldinger/statiskTraadMock';
import * as renderer from 'react-test-renderer';

test('BesvarFler matcher snapshot', () => {
    const besvarFler = renderer.create(
        <TestProvider>
            <BesvarFlere traader={[statiskTraadMock, statiskTraadMock]} lukkModal={() => null} />
        </TestProvider>
    );

    expect(besvarFler.toJSON()).toMatchSnapshot();
});
