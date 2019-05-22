import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../../../../test/Testprovider';
import OppgaveContainer from './OppgaveContainer';

test('Viser oppgavecontainer med alt innhold', () => {
    const container = renderer.create(
        <TestProvider>
            <OppgaveContainer lukkPanel={() => {}} />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
