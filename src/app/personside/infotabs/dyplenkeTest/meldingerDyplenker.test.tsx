import { render, within } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import TestProvider from '../../../../test/Testprovider';
import InfoTabs from '../InfoTabs';
import { INFOTABS } from '../InfoTabEnum';
import { getAktivTab, meldingerTest } from './utils-dyplenker-test';
import { getTestStore, setupReactQueryMocks } from '../../../../test/testStore';
import { aremark } from '../../../../mock/persondata/aremark';
import { getMockTraader } from '../../../../mock/meldinger/meldinger-mock';
import dialogResource from '../../../../rest/resources/dialogResource';

test('bytter til riktig tab og setter fokus på riktig melding ved bruk av dyplenke fra oversikt', async () => {
    setupReactQueryMocks();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    (dialogResource.useFetch as jest.Mock<any>).mockImplementation(() => ({
        data: getMockTraader(aremark.personIdent)
    }));
    const store = getTestStore();
    const { container: infoTabs } = render(
        <TestProvider customStore={store}>
            <InfoTabs />
        </TestProvider>
    );

    expect(getAktivTab(infoTabs)).toHaveTextContent(new RegExp(INFOTABS.OVERSIKT.path, 'i'));
    const user = userEvent.setup();

    await clickOnMeldingerIOversikt(infoTabs, user);

    expect(getAktivTab(infoTabs)).toHaveTextContent(new RegExp(INFOTABS.MELDINGER.tittel, 'i'));

    const checkedMelding = within(infoTabs).getAllByRole('radio', { checked: true })[0];

    const expectedElement = within(infoTabs).getAllByRole('radio')[1];

    expect(checkedMelding).toEqual(expectedElement);
});

async function clickOnMeldingerIOversikt(infoTabs: HTMLElement, user: UserEvent) {
    const tab = infoTabs.querySelectorAll('.' + meldingerTest.oversikt)[1] as HTMLElement;
    const button = within(tab).getByRole('button');

    await user.click(button);
}
