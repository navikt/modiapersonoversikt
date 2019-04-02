import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import { aremark } from '../../../../mock/person/aremark';
import OppfolgingContainer from './OppfolgingContainer';

test('Viser oppfølgingcontainer med alt innhold', () => {
    const container = renderer.create(
        <TestProvider>
            <OppfolgingContainer fødselsnummer={aremark.fødselsnummer} />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
