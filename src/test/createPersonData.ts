import { type PersonData, PersonErEgenAnsatt } from 'src/lib/types/modiapersonoversikt-api';

export function createPersonData(): PersonData {
    return {
        fnr: '00000000000',
        personIdent: '00000000000',
        navn: [{ fornavn: 'Test', etternavn: 'Person' }],
        kjonn: [],
        fodselsdato: [],
        fodested: [],
        dodsdato: [],
        bostedAdresse: [{ linje1: 'Testgata 1', sistEndret: null }],
        historiskeBostedAdresser: [],
        kontaktAdresse: [],
        oppholdsAdresse: [],
        statsborgerskap: [],
        adressebeskyttelse: [],
        sikkerhetstiltak: [],
        erEgenAnsatt: PersonErEgenAnsatt.NEI,
        personstatus: [],
        sivilstand: [],
        foreldreansvar: [],
        deltBosted: [],
        dodsbo: [],
        fullmakt: [],
        vergemal: [],
        historiskeVergemal: [],
        tilrettelagtKommunikasjon: { talesprak: [], tegnsprak: [] },
        rettsligHandleevne: [],
        telefonnummer: [
            { identifikator: '88888888', prioritet: 2 },
            { identifikator: '77777777', prioritet: 1 }
        ],
        kontaktInformasjon: {
            erReservert: { value: false },
            mobil: { value: '99999999', sistOppdatert: '2024-01-02' },
            epost: { value: 'test@example.no', sistOppdatert: '2024-02-03' }
        },
        bankkonto: { kontonummer: '00000000000', opprettetAv: 'system' },
        forelderBarnRelasjon: [],
        innflyttingTilNorge: [],
        utflyttingFraNorge: []
    };
}
