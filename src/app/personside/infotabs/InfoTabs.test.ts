import { INFOTABS } from './InfoTabEnum';
import { getOpenTabFromRouterPath } from './InfoTabs';

test('henter riktig tab fra routerpath', () => {
    const path = 'http://localhost:7777/modiapersonoversikt/person/1000000000/' + INFOTABS.UTBETALING + '/';

    const åpenLamell: INFOTABS = getOpenTabFromRouterPath(path);

    expect(åpenLamell.toLowerCase()).toEqual(INFOTABS.UTBETALING.toLowerCase());
});

test('åpner oversikt som default hvis url ikke matcher en infotab', () => {
    const path = 'http://localhost:7777/modiapersonoversikt/person/1000000000/' + 'tull&tøys' + '/';

    const åpenLamell: INFOTABS = getOpenTabFromRouterPath(path);

    expect(åpenLamell.toLowerCase()).toEqual(INFOTABS.OVERSIKT.toLowerCase());
});
