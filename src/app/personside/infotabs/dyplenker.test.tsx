import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import TestProvider from '../../../test/Testprovider';
import InfoTabs from './InfoTabs';
import { BrowserRouter } from 'react-router-dom';
import { INFOTABS } from './InfoTabEnum';

function getAktivTab(infoTabs: ReactWrapper) {
    return infoTabs.find('button[role="tab"][aria-selected=true]').text();
}

function clickOnUtbetalingIOversikt(infoTabs: ReactWrapper) {
    infoTabs
        .find('ol[aria-label="Oversikt brukers utbetalinger"]')
        .find('li')
        .first()
        .find('button')
        .simulate('click');
}

test('bytter til riktig tab og setter fokus på riktig utbetaling ved bruk av dyplenke fra oversikt', () => {
    const infoTabs = mount(
        <TestProvider>
            <BrowserRouter>
                <InfoTabs />
            </BrowserRouter>
        </TestProvider>
    );

    expect(getAktivTab(infoTabs)).toContain(INFOTABS.OVERSIKT);

    clickOnUtbetalingIOversikt(infoTabs);

    expect(getAktivTab(infoTabs)).toContain(INFOTABS.UTBETALING);

    const activeElement = document.activeElement ? document.activeElement.innerHTML : fail('ingen elementer i fokus');
    const expectedElement = infoTabs.find('article[aria-label="Utbetaling Sykepenger"]').html();

    expect(activeElement).toEqual(expectedElement);
});
