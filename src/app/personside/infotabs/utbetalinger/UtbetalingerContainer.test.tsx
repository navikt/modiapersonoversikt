import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import UtbetalingerContainer from './UtbetalingerContainer';
import { aremark } from '../../../../mock/person/aremark';

test('Viser utbetalingercontainer med alt innhold', () => {
    const visittkortheader = renderer.create(
        <TestProvider>
            <UtbetalingerContainer fødselsnummer={aremark.fødselsnummer} />
        </TestProvider>
    );

    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});
