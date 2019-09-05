import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import TestProvider from '../../../../test/Testprovider';
import InfoTabs from '../InfoTabs';
import { BrowserRouter } from 'react-router-dom';
import { INFOTABS } from '../InfoTabEnum';
import { getAktivTab } from './utils';

function clickOnMeldingerIOversikt(infoTabs: ReactWrapper) {
    infoTabs
        .find('ol[aria-label="Oversikt brukers meldinger"]')
        .find('li')
        .first()
        .find('button')
        .simulate('click');
}

test('bytter til riktig tab og setter fokus på riktig melding ved bruk av dyplenke fra oversikt', () => {
    const infoTabs = mount(
        <TestProvider>
            <BrowserRouter>
                <InfoTabs />
            </BrowserRouter>
        </TestProvider>
    );

    expect(getAktivTab(infoTabs)).toContain(INFOTABS.OVERSIKT);

    clickOnMeldingerIOversikt(infoTabs);

    expect(getAktivTab(infoTabs)).toContain(INFOTABS.MELDINGER);

    const activeElement = document.activeElement ? document.activeElement.innerHTML : fail('ingen elementer i fokus');
    const expectedElement = infoTabs
        .find('nav')
        .last()
        .find('ol')
        .find('li')
        .children()
        .first()
        .html();

    expect(activeElement).toEqual(expectedElement);
});
