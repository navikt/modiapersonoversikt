import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../../../../test/Testprovider';
import OpprettOppgaveContainer from './OpprettOppgaveContainer';

test('Viser oppgavecontainer med alt innhold', () => {
    const container = renderer.create(
        <TestProvider>
            <OpprettOppgaveContainer lukkPanel={() => {}} />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
