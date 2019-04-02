import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import { aremark } from '../../../../mock/person/aremark';
import MeldingerContainer from './MeldingerContainer';

test('Viser meldingercontainer med alt innhold', () => {
    const container = renderer.create(
        <TestProvider>
            <MeldingerContainer fødselsnummer={aremark.fødselsnummer} />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
