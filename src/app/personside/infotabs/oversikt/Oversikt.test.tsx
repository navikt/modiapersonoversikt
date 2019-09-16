import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import Oversikt from './Oversikt';

beforeEach(() => {
    Date.prototype.getTime = jest.fn(() => 0);
});

test('Viser oversikt med alt innhold', () => {
    const container = renderer.create(
        <TestProvider>
            <Oversikt />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
