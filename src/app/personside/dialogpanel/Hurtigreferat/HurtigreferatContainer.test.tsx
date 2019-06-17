import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import HurtigreferatContainer from './HurtigreferatContainer';

beforeEach(() => {
    Date.prototype.getTime = jest.fn(() => 0);
});

test('viser hurtigreferat', () => {
    const visittkortbody = renderer.create(
        <TestProvider>
            <HurtigreferatContainer />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
