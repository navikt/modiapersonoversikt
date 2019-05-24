import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import HurtigreferatContainer from './HurtigreferatContainer';

// Mock react collapse sin UnmountClosed
jest.mock('react-collapse', () => {
    return {
        // @ts-ignore
        UnmountClosed: props => props.children
    };
});

test('viser hurtigreferat', () => {
    const visittkortbody = renderer.create(
        <TestProvider>
            <HurtigreferatContainer />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
