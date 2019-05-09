import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import OppfolgingContainer from './OppfolgingContainer';

beforeEach(() => {
    Date.prototype.getTime = jest.fn(() => 0);
});

test('Viser oppfølgingcontainer med alt innhold', () => {
    const container = renderer.create(
        <TestProvider>
            <OppfolgingContainer />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
