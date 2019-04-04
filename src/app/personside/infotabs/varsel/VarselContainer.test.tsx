import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import { aremark } from '../../../../mock/person/aremark';
import VarselContainer from './VarslerContainer';

test('Viser varselcontainer med alt innhold', () => {
    const container = renderer.create(
        <TestProvider>
            <VarselContainer fødselsnummer={aremark.fødselsnummer} />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
