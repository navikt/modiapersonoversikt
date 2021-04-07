import { InfotabConfig, INFOTABS } from './InfoTabEnum';
import { getOpenTabFromRouterPath } from './utils/useOpenTab';

test('henter riktig tab fra routerpath', () => {
    const path = 'http://localhost:7777/modiapersonoversikt/person/1000000000/' + INFOTABS.UTBETALING.path + '/';

    const apenLamell: InfotabConfig = getOpenTabFromRouterPath(path);

    expect(apenLamell.path).toEqual(INFOTABS.UTBETALING.path);
});

test('åpner oversikt som default hvis url ikke matcher en infotab', () => {
    const path = 'http://localhost:7777/modiapersonoversikt/person/1000000000/' + 'tull&tøys' + '/';

    const apenLamell: InfotabConfig = getOpenTabFromRouterPath(path);

    expect(apenLamell.path).toEqual(INFOTABS.OVERSIKT.path);
});
