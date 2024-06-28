import { ReactWrapper } from 'enzyme';

export function getAktivTab(infoTabs: ReactWrapper) {
    return infoTabs.find('button[role="tab"][aria-selected=true]').text();
}

export const meldingerTest = {
    oversikt: 'test-meldinger-oversikt',
    melding: 'test-meldinger-melding'
};

export const sakerTest = {
    oversikt: 'test-saker-oversikt',
    dokument: 'test-saker-dokumenter',
    sakstema: 'test-sakstema-list'
};
export const utbetalingerTest = {
    oversikt: 'test-utbetalinger-oversikt',
    utbetaling: 'test-utbetaling-utbetalinglamell'
};

export const ytelserTest = {
    oversikt: 'test-ytelse-oversikt',
    ytelse: 'test-ytelse-ytelselamell'
};
