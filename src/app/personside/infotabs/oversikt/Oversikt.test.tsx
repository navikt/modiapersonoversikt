import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import Oversikt from './Oversikt';

test('Viser oversikt med alt innhold', () => {
    const container = renderer.create(
        <TestProvider>
            <Oversikt />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
