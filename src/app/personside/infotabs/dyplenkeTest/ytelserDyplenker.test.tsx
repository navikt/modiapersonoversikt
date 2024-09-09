import * as React from 'react';
import { render, within } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import TestProvider from '../../../../test/Testprovider';
import InfoTabs from '../InfoTabs';
import { INFOTABS } from '../InfoTabEnum';
import { getAktivTab, ytelserTest } from './utils-dyplenker-test';
import { BrowserRouter } from 'react-router-dom';
import { setupReactQueryMocks } from '../../../../test/testStore';

test('bytter til riktig tab og åpner valgt ytelse ved bruk av dyplenke fra oversikt', async () => {
    setupReactQueryMocks();
    const { container: infoTabs } = render(
        <TestProvider>
            <BrowserRouter>
                <InfoTabs />
            </BrowserRouter>
        </TestProvider>
    );

    expect(getAktivTab(infoTabs)).toHaveTextContent(new RegExp(INFOTABS.OVERSIKT.path, 'i'));

    const user = userEvent.setup();

    await clickOnYtelse(infoTabs, user);

    expect(getAktivTab(infoTabs)).toHaveTextContent(new RegExp(INFOTABS.YTELSER.path, 'i'));

    const forventetMarkert = within(infoTabs).getAllByRole('listitem')[1].querySelector('button[aria-selected="true"]');

    expect(forventetMarkert).toBeInTheDocument();

    const ikkeMarkert = within(infoTabs).getAllByRole('listitem')[0].querySelector('button[aria-selected="true"]');

    expect(ikkeMarkert).not.toBeInTheDocument();
});

async function clickOnYtelse(infoTabs: HTMLElement, user: UserEvent) {
    const tab = infoTabs.querySelectorAll('.' + ytelserTest.oversikt)[1] as HTMLElement;
    console.log(infoTabs.querySelectorAll('.' + ytelserTest.oversikt));
    const button = within(tab).getByRole('button');

    await user.click(button);
}
