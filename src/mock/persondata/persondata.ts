import FetchMock from 'yet-another-fetch-mock';
import { Data as PersonData, EgenAnsatt, Person } from '../../app/personside/visittkort-v2/PersondataDomain';
import { apiBaseUri } from '../../api/config';

export function setupPersondataMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/v2/person/:fodselsnummer', (req, res, ctx) =>
        res(ctx.json(lagPersondata(req.pathParams.fnr)))
    );
}

function lagPersondata(fnr: string): PersonData {
    const person: Person = {
        fnr: fnr,
        navn: [],
        kjonn: [],
        fodselsdato: [],
        dodsdato: [],
        bostedAdresse: [],
        kontaktAdresse: [],
        navEnhet: null,
        statsborgerskap: [],
        adressebeskyttelse: [],
        sikkerhetstiltak: [],
        erEgenAnsatt: EgenAnsatt.UKJENT,
        personstatus: [],
        sivilstand: [],
        foreldreansvar: [],
        deltBosted: [],
        dodsbo: [],
        fullmakt: [],
        vergemal: [],
        tilrettelagtKommunikasjon: {
            talesprak: [],
            tegnsprak: []
        },
        telefonnummer: [],
        kontaktOgReservasjon: null,
        bankkonto: null
    };

    return { feilendeSystemer: [], person };
}
