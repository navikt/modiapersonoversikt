import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../test/Testprovider';
import PersonsokKomponent from './PersonsokKomponent';

test('viser dialogpanel', () => {
    const dialogPanelBody = renderer.create(
        <TestProvider>
            <PersonsokKomponent />
        </TestProvider>
    );

    expect(dialogPanelBody.toJSON()).toMatchSnapshot();
});
