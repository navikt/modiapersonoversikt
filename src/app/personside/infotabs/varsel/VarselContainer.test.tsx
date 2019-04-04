import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import VarselContainer from './VarslerContainer';

test('Viser varselcontainer med alt innhold', () => {
    const container = renderer.create(
        <TestProvider>
            <VarselContainer />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
