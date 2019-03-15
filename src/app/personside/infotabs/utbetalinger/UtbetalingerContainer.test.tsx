import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import UtbetalingerContainer from './UtbetalingerContainer';

test('Viser utbetalingercontainer med alt innhold', () => {
    const visittkortheader = renderer.create(
        <TestProvider>
            <UtbetalingerContainer />
        </TestProvider>
    );

    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});
