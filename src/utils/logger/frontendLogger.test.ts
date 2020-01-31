import { emptyStringToUndefined } from './frontendLogger';

test('mapper tomme strenger til undefined fordi grafana/influxdb/frontendlogger ikke ser ut til å håndtere det så bra', () => {
    const testVerdier = {
        skalBli: 'Hei',
        skalVekk: ''
    };
    const forventetResultat = {
        skalBli: 'Hei',
        skalVekk: undefined
    };

    const resultat = emptyStringToUndefined(testVerdier);

    expect(resultat).toEqual(forventetResultat);
});
