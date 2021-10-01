import FetchMock from 'yet-another-fetch-mock';
import {
    AdresseBeskyttelse,
    Data as PersonData,
    EgenAnsatt,
    ForelderBarnRelasjon,
    ForelderBarnRelasjonRolle,
    FullmaktsRolle,
    Kjonn,
    LocalDate,
    LocalDateTime,
    Person,
    PersonStatus,
    SikkerhetstiltakType,
    SivilstandType,
    Skifteform
} from '../../app/personside/visittkort-v2/PersondataDomain';
import { apiBaseUri } from '../../api/config';

export function setupPersondataMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/v2/person/:fodselsnummer', (req, res, ctx) =>
        res(ctx.json(lagPersondata(req.pathParams.fodselsnummer)))
    );
}

// Til bruk under testing av funksjonalitet
const erDod = false;
const visEtiketter = false;

function lagPersondata(fnr: string): PersonData {
    const person: Person = {
        fnr: fnr,
        navn: [
            {
                fornavn: 'TESTFAMILIE',
                mellomnavn: 'MELLOMNAVN',
                etternavn: 'ETTERNAVN'
            }
        ],
        kjonn: [
            {
                kode: Kjonn.K,
                beskrivelse: 'Kvinne'
            }
        ],
        fodselsdato: ['2000-02-02' as LocalDate],
        alder: 21,
        dodsdato: erDod ? ['2018-06-07' as LocalDate] : [],
        bostedAdresse: [
            {
                linje1: 'Adressevei 1',
                linje2: '0000 AREMARK',
                linje3: 'Norge'
            }
        ],
        kontaktAdresse: [
            {
                linje1: 'Kontaktadresse 1',
                linje2: '0320 HEI',
                linje3: null
            }
        ],
        navEnhet: {
            id: '0219',
            navn: 'NAV Bærum'
        },
        statsborgerskap: [
            {
                land: {
                    kode: 'NOR',
                    beskrivelse: 'Norsk statsborger'
                },
                gyldigFraOgMed: '2000-02-02' as LocalDate,
                gyldigTilOgMed: '2018-06-07' as LocalDate
            }
        ],
        adressebeskyttelse: [
            {
                kode: visEtiketter ? AdresseBeskyttelse.KODE6 : AdresseBeskyttelse.UGRADERT,
                beskrivelse: 'Ingen'
            }
        ],
        sikkerhetstiltak: [
            {
                type: SikkerhetstiltakType.TFUS,
                gyldigFraOgMed: '2005-02-13' as LocalDate,
                gyldigTilOgMed: visEtiketter ? ('2030-02-15' as LocalDate) : ('2010-02-15' as LocalDate)
            }
        ],
        erEgenAnsatt: visEtiketter ? EgenAnsatt.JA : EgenAnsatt.UKJENT,
        personstatus: [
            {
                kode: erDod ? PersonStatus.DOD : PersonStatus.BOSATT,
                beskrivelse: erDod ? 'Død' : 'Bosatt i Norge'
            }
        ],
        sivilstand: [
            {
                type: {
                    kode: SivilstandType.SKILT,
                    beskrivelse: 'Skilt'
                },
                gyldigFraOgMed: '2010-03-06' as LocalDate
            }
        ],
        foreldreansvar: [
            {
                ansvar: 'felles',
                ansvarlig: {
                    fornavn: 'Test',
                    etternavn: 'Testesen',
                    mellomnavn: null
                },
                ansvarsubject: {
                    fornavn: 'Barn',
                    etternavn: 'Barnesen',
                    mellomnavn: null
                }
            }
        ],
        deltBosted: [
            {
                startdatoForKontrakt: '2000-10-10' as LocalDate,
                sluttdatoForKontrakt: '2005-05-07' as LocalDate,
                adresse: {
                    linje1: `Adresseveien 1`,
                    linje2: '0000 Aremark',
                    linje3: null
                }
            }
        ],
        dodsbo: [
            {
                adressat: {
                    advokatSomAdressat: {
                        kontaktperson: {
                            fornavn: 'Advokat',
                            mellomnavn: null,
                            etternavn: 'Navnesen'
                        },
                        organisasjonsnavn: 'Advokatkontoret Aremark',
                        organisasjonsnummer: '01234567891011'
                    },
                    organisasjonSomAdressat: null,
                    personSomAdressat: null
                },
                adresse: {
                    linje1: 'Elgelia 20, 0000 Aremark',
                    linje2: null,
                    linje3: null
                },
                registrert: '2010-02-02' as LocalDate,
                skifteform: Skifteform.OFFENTLIG
            }
        ],
        fullmakt: [
            {
                motpartsPersonident: '123456789',
                motpartsPersonNavn: {
                    fornavn: 'Navn',
                    mellomnavn: null,
                    etternavn: 'Navnesen'
                },
                motpartsRolle: FullmaktsRolle.FULLMEKTIG,
                omraade: ['*'],
                gyldigFraOgMed: '2015-01-01' as LocalDate,
                gyldigTilOgMed: '2017-12-12' as LocalDate
            }
        ],
        vergemal: [
            {
                ident: '21042900076',
                navn: {
                    fornavn: 'Simen',
                    mellomnavn: null,
                    etternavn: 'Solli'
                },
                vergesakstype: 'voksen',
                omfang: 'personligeOgOekonomiskeInteresser',
                embete: 'Fylkesmannen i Troms og Finnmark',
                gyldighetstidspunkt: '2016-03-27' as LocalDate,
                opphoerstidspunkt: '2017-06-30' as LocalDate
            }
        ],
        tilrettelagtKommunikasjon: {
            talesprak: [
                {
                    kode: 'NO',
                    beskrivelse: 'Norsk'
                }
            ],
            tegnsprak: [
                {
                    kode: 'NO',
                    beskrivelse: 'Norsk'
                }
            ]
        },
        telefonnummer: [
            {
                retningsnummer: {
                    kode: '+47',
                    beskrivelse: 'retningsnummer er norsk'
                },
                identifikator: '99009900',
                sistEndret: '2017-10-10T10:15:30' as LocalDateTime,
                sistEndretAv: 'TESTFAMILIEN AREMARK',
                prioritet: 1
            }
        ],
        kontaktOgReservasjon: {
            personident: '10108000398',
            reservasjon: 'reservert',
            epostadresse: {
                value: null,
                sistOppdatert: null,
                sistVerifisert: '2013-01-01' as LocalDate
            },
            mobiltelefonnummer: {
                value: null,
                sistOppdatert: null,
                sistVerifisert: null
            }
        },
        bankkonto: {
            kontonummer: '1234567890',
            banknavn: 'DNB ASA',
            sistEndret: '2006-03-15T00:00:00' as LocalDateTime,
            sistEndretAv: '1010800 BD03',

            bankkode: null,
            swift: 'DNBANOKKXXX',
            landkode: null,
            adresse: {
                linje1: 'Bankveien 1,',
                linje2: '0357 Bankestad',
                linje3: null
            },
            valuta: {
                kode: 'NOK',
                beskrivelse: 'Norske kroner'
            }
        },
        forelderBarnRelasjon: barnMock
    };

    return { feilendeSystemer: [], person };
}

const barnMock: ForelderBarnRelasjon[] = [
    {
        ident: '12345678910',
        rolle: ForelderBarnRelasjonRolle.BARN,
        navn: [
            {
                fornavn: 'BARN1',
                mellomnavn: null,
                etternavn: 'BARNESEN'
            }
        ],
        fodselsdato: ['2008-03-15' as LocalDate],
        alder: 13,
        adressebeskyttelse: [
            {
                kode: AdresseBeskyttelse.UGRADERT,
                beskrivelse: 'UGRADERT'
            }
        ],
        bostedAdresse: [
            {
                linje1: 'Gatenavn 1',
                linje2: '0000 AREMARK',
                linje3: 'Norge'
            }
        ],
        personstatus: [
            {
                kode: PersonStatus.BOSATT,
                beskrivelse: 'BOSATT'
            }
        ]
    },
    {
        ident: '12345678911',
        rolle: ForelderBarnRelasjonRolle.BARN,
        navn: [
            {
                fornavn: 'BARN2',
                mellomnavn: null,
                etternavn: 'BARNESEN'
            }
        ],
        fodselsdato: ['2010-04-21' as LocalDate],
        alder: null,
        adressebeskyttelse: [
            {
                kode: AdresseBeskyttelse.UGRADERT,
                beskrivelse: 'UGRADERT'
            }
        ],
        bostedAdresse: [],
        personstatus: [
            {
                kode: PersonStatus.DOD,
                beskrivelse: 'DØD'
            }
        ]
    },
    {
        ident: '12345678912',
        rolle: ForelderBarnRelasjonRolle.BARN,
        navn: [
            {
                fornavn: 'BARN3',
                mellomnavn: null,
                etternavn: 'BARNESEN'
            }
        ],
        fodselsdato: ['2012-06-05' as LocalDate],
        alder: 9,
        adressebeskyttelse: [
            {
                kode: AdresseBeskyttelse.KODE6,
                beskrivelse: 'KODE 6'
            }
        ],
        bostedAdresse: [
            {
                linje1: 'Gatenavn 22',
                linje2: '0000 AREMARK',
                linje3: 'Norge'
            }
        ],
        personstatus: [
            {
                kode: PersonStatus.BOSATT,
                beskrivelse: 'BOSATT'
            }
        ]
    },
    {
        ident: '12345678913',
        rolle: ForelderBarnRelasjonRolle.BARN,
        navn: [
            {
                fornavn: 'BARN4',
                mellomnavn: null,
                etternavn: 'BARNESEN'
            }
        ],
        fodselsdato: ['1998-04-09' as LocalDate],
        alder: 23,
        adressebeskyttelse: [
            {
                kode: AdresseBeskyttelse.KODE6_UTLAND,
                beskrivelse: 'KODE 6 UTLAND'
            }
        ],
        bostedAdresse: [
            {
                linje1: 'Gatenavn 22',
                linje2: '0000 AREMARK',
                linje3: 'Sverige'
            }
        ],
        personstatus: [
            {
                kode: PersonStatus.UTFLYTTET,
                beskrivelse: 'UTFLYTTET'
            }
        ]
    },
    {
        ident: '12345678914',
        rolle: ForelderBarnRelasjonRolle.BARN,
        navn: [
            {
                fornavn: 'BARN5',
                mellomnavn: null,
                etternavn: 'BARNESEN'
            }
        ],
        fodselsdato: ['1998-04-09' as LocalDate],
        alder: 23,
        adressebeskyttelse: [
            {
                kode: AdresseBeskyttelse.KODE7,
                beskrivelse: 'KODE 7'
            }
        ],
        bostedAdresse: [
            {
                linje1: 'Gatenavn 22',
                linje2: '0000 AREMARK',
                linje3: 'Norge'
            }
        ],
        personstatus: [
            {
                kode: PersonStatus.BOSATT,
                beskrivelse: 'BOSATT'
            }
        ]
    }
];
