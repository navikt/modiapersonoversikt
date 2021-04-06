import * as React from 'react';
import { mount, ReactWrapper } from '../../../../test/enzyme-container';
import TestProvider from '../../../../test/Testprovider';
import InfoTabs from '../InfoTabs';
import { BrowserRouter } from 'react-router-dom';
import { INFOTABS, InfotabsType } from '../InfoTabEnum';
import { getAktivTab, utbetalingerTest } from './utils-dyplenker-test';

function clickOnUtbetalingIOversikt(infoTabs: ReactWrapper) {
    infoTabs
        .find('.' + utbetalingerTest.oversikt)
        .at(1)
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

    expect(getAktivTab(infoTabs).toLowerCase()).toContain(INFOTABS[InfotabsType.OVERSIKT].path);

    clickOnUtbetalingIOversikt(infoTabs);

    expect(getAktivTab(infoTabs).toLowerCase()).toContain(INFOTABS[InfotabsType.UTBETALING].path);

    const activeElement = document.activeElement ? document.activeElement.outerHTML : fail('ingen elementer i fokus');
    const expectedElement = infoTabs
        .find('li.' + utbetalingerTest.utbetaling)
        .at(1)
        .html();

    expect(activeElement).toEqual(expectedElement);
});
