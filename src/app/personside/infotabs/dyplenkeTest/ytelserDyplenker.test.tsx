import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import TestProvider from '../../../../test/Testprovider';
import InfoTabs from '../InfoTabs';
import { BrowserRouter } from 'react-router-dom';
import { INFOTABS } from '../InfoTabEnum';
import { getAktivTab, ytelserTest } from './utils';

test('bytter til riktig tab og åpner valgt ytelse ved bruk av dyplenke fra oversikt', () => {
    const infoTabs = mount(
        <TestProvider>
            <BrowserRouter>
                <InfoTabs />
            </BrowserRouter>
        </TestProvider>
    );

    expect(getAktivTab(infoTabs)).toContain(INFOTABS.OVERSIKT);

    clickOnYtelse(infoTabs);

    expect(getAktivTab(infoTabs)).toContain(INFOTABS.YTELSER);
    console.log('1');
});

function clickOnYtelse(infoTabs: ReactWrapper) {
    infoTabs
        .find('.' + ytelserTest.oversikt)
        .first()
        .find('button')
        .simulate('click');
}
