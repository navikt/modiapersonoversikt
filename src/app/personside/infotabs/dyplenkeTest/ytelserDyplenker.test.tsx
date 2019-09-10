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

    const apenYtelse = infoTabs.find('.ekspanderbartPanel--apen').html();
    const expectedApenYtelse = infoTabs
        .find('.' + ytelserTest.ytelse)
        .last()
        .children()
        .html();

    expect(apenYtelse).toEqual(expectedApenYtelse);
});

function clickOnYtelse(infoTabs: ReactWrapper) {
    infoTabs
        .find('.' + ytelserTest.oversikt)
        .last()
        .find('button')
        .simulate('click');
}
