import { render, within } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import TestProvider from '../../../../test/Testprovider';
import InfoTabs from '../InfoTabs';
import { BrowserRouter } from 'react-router-dom';
import { INFOTABS } from '../InfoTabEnum';
import { getAktivTab, sakerTest } from './utils-dyplenker-test';
import { setupReactQueryMocks } from '../../../../test/testStore';

test('bytter til riktig tab og setter riktig sakstema ved bruk av dyplenke fra oversikt', async () => {
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

    const expectedSak = (infoTabs.querySelector('.' + sakerTest.oversikt) as HTMLElement).textContent;

    await clickOnSak(infoTabs, user);

    expect(getAktivTab(infoTabs)).toHaveTextContent(new RegExp(INFOTABS.SAKER.path, 'i'));

    const valgtSak = infoTabs.querySelector('.' + sakerTest.dokument)?.textContent;

    expect(expectedSak).toEqual(valgtSak);
});

async function clickOnSak(infoTabs: HTMLElement, user: UserEvent) {
    const tab = infoTabs.querySelector('.' + sakerTest.sakstema) as HTMLElement;
    const button = within(tab).getByRole('button');

    await user.click(button);
}
