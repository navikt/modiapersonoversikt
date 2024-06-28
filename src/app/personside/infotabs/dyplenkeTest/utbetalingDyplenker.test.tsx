import * as React from 'react';
import { render, within } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import TestProvider from '../../../../test/Testprovider';
import InfoTabs from '../InfoTabs';
import { BrowserRouter } from 'react-router-dom';
import { INFOTABS } from '../InfoTabEnum';
import { getAktivTab, utbetalingerTest } from './utils-dyplenker-test';
import { setupReactQueryMocks } from '../../../../test/testStore';

test('bytter til riktig tab og setter fokus på riktig utbetaling ved bruk av dyplenke fra oversikt', async () => {
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
    await clickOnUtbetalingIOversikt(infoTabs, user);

    expect(getAktivTab(infoTabs)).toHaveTextContent(new RegExp(INFOTABS.UTBETALING.path, 'i'));

    const activeElement = document.activeElement?.outerHTML;
    const expectedElement = infoTabs.querySelectorAll('li.' + utbetalingerTest.utbetaling)[1]?.outerHTML;

    expect(activeElement).toEqual(expectedElement);
});

async function clickOnUtbetalingIOversikt(infoTabs: HTMLElement, user: UserEvent) {
    const tab = infoTabs.querySelectorAll('.' + utbetalingerTest.oversikt)[1] as HTMLElement;
    const button = within(tab).getByRole('button');

    await user.click(button);
}
