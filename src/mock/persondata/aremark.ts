import {
    AdresseBeskyttelse,
    EgenAnsatt,
    ForelderBarnRelasjon,
    ForelderBarnRelasjonRolle,
    FullmaktsRolle,
    Kjonn,
    LocalDate,
    LocalDateTime,
    Person,
    PersonStatus,
    SivilstandType,
    Skifteform
} from '../../app/personside/visittkort-v2/PersondataDomain';
import { harDiskresjonskode } from '../../app/personside/visittkort-v2/visittkort-utils';

export function hentBarnAremark(): ForelderBarnRelasjon[] {
    return [
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
            kjonn: [
                {
                    kode: Kjonn.K,
                    beskrivelse: 'Kvinne'
                }
            ],
            adressebeskyttelse: [
                {
                    kode: AdresseBeskyttelse.UGRADERT,
                    beskrivelse: 'UGRADERT'
                }
            ],
            harSammeAdresse: false,
            dodsdato: []
        },
        {
            ident: '12345678911',
            rolle: ForelderBarnRelasjonRolle.BARN,
            navn: [
                {
                    fornavn: 'BARN1',
                    mellomnavn: null,
                    etternavn: 'BARNESEN'
                }
            ],
            fodselsdato: ['2008-03-15' as LocalDate],
            alder: null,
            kjonn: [
                {
                    kode: Kjonn.K,
                    beskrivelse: 'Kvinne'
                }
            ],
            adressebeskyttelse: [],
            harSammeAdresse: false,
            dodsdato: []
        }
    ];
}

export const aremark: Person = {
    fnr: '10108000398',
    navn: [
        {
            fornavn: 'AREMARK',
            mellomnavn: null,
            etternavn: 'TESTFAMILIEN'
        }
    ],
    kjonn: [
        {
            kode: Kjonn.M,
            beskrivelse: 'Mann'
        }
    ],
    fodselsdato: ['1980-10-10' as LocalDate],
    geografiskTilknytning: '0118',
    alder: 41,
    dodsdato: [],
    bostedAdresse: [
        {
            linje1: 'Islandsgate 49',
            linje2: '7693 Hovedøya',
            linje3: 'Norge',
            sistEndret: {
                ident: 'Folkeregisteret',
                tidspunkt: '2010-02-20T10:15:30' as LocalDateTime,
                system: 'FREG'
            },
            gyldighetsPeriode: null
        }
    ],
    kontaktAdresse: [
        {
            linje1: 'Aremarkveien 1',
            linje2: '0320 Aremark',
            linje3: null,
            sistEndret: {
                ident: 'Folkeregisteret',
                tidspunkt: '2020-01-01T10:15:30' as LocalDateTime,
                system: 'FREG'
            },
            gyldighetsPeriode: null
        }
    ],
    oppholdsAdresse: [
        {
            linje1: 'Oppholdsadresse 1',
            linje2: '0000 AREMARK',
            linje3: null,
            sistEndret: null,
            gyldighetsPeriode: {
                gyldigFraOgMed: '2021-02-01' as LocalDate,
                gyldigTilOgMed: '2022-05-01' as LocalDate
            }
        }
    ],
    navEnhet: {
        id: '0219',
        navn: 'NAV Bærum',
        publikumsmottak: [
            {
                besoksadresse: {
                    linje1: 'Adressevei 1',
                    linje2: '0000 AREMARK',
                    linje3: null,
                    sistEndret: null,
                    gyldighetsPeriode: null
                },
                apningstider: [
                    {
                        ukedag: 'Mandag',
                        apningstid: '09.00 - 15.00'
                    },
                    {
                        ukedag: 'Tirsdag',
                        apningstid: '09.00 - 15.00'
                    },
                    {
                        ukedag: 'Onsdag',
                        apningstid: '10.00 - 16.00'
                    }
                ]
            }
        ]
    },
    statsborgerskap: [
        {
            land: {
                kode: 'NOR',
                beskrivelse: 'NORGE'
            },
            gyldighetsPeriode: {
                gyldigFraOgMed: '2021-02-01' as LocalDate,
                gyldigTilOgMed: '2022-05-01' as LocalDate
            }
        }
    ],
    adressebeskyttelse: [
        {
            kode: AdresseBeskyttelse.KODE6,
            beskrivelse: 'Kode 6'
        }
    ],
    sikkerhetstiltak: [
        {
            type: 'TFUS',
            beskrivelse: 'Telefonisk utestengelse',
            gyldighetsPeriode: {
                gyldigFraOgMed: '2021-02-01' as LocalDate,
                gyldigTilOgMed: '2022-05-01' as LocalDate
            }
        }
    ],
    erEgenAnsatt: EgenAnsatt.JA,
    personstatus: [
        {
            kode: PersonStatus.BOSATT,
            beskrivelse: 'Bosatt i Norge'
        }
    ],
    sivilstand: [
        {
            type: {
                kode: SivilstandType.GIFT,
                beskrivelse: 'Gift'
            },
            gyldigFraOgMed: '2005-12-12' as LocalDate,
            sivilstandRelasjon: {
                fnr: '12345555555',
                navn: [
                    {
                        fornavn: 'BAREMARK',
                        mellomnavn: null,
                        etternavn: 'TESTFAMILIEN'
                    }
                ],
                alder: 40,
                adressebeskyttelse: [
                    {
                        kode: AdresseBeskyttelse.UGRADERT,
                        beskrivelse: 'UGRADERT'
                    }
                ],
                harSammeAdresse: true
            }
        }
    ],
    foreldreansvar: hentBarnAremark().map((barn) => ({
        ansvar: 'felles',
        ansvarlig: null,
        ansvarsubject: {
            navn: harDiskresjonskode(barn.adressebeskyttelse) ? null : barn.navn.firstOrNull(),
            ident: barn.ident
        }
    })),
    deltBosted: [
        {
            gyldighetsPeriode: {
                gyldigFraOgMed: '2021-02-01' as LocalDate,
                gyldigTilOgMed: '2022-05-01' as LocalDate
            },
            adresse: {
                linje1: `Adresseveien 1`,
                linje2: '0000 Aremark',
                linje3: null,
                sistEndret: null,
                gyldighetsPeriode: null
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
                linje3: null,
                sistEndret: null,
                gyldighetsPeriode: null
            },
            registrert: '2010-02-02' as LocalDate,
            skifteform: Skifteform.OFFENTLIG,
            sistEndret: {
                ident: 'Folkeregisteret',
                tidspunkt: '2020-01-01T10:15:30' as LocalDateTime,
                system: 'Folkeregisteret'
            }
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
            omrade: [
                {
                    kode: '*',
                    beskrivelse: ''
                }
            ],
            gyldighetsPeriode: {
                gyldigFraOgMed: '2021-06-01' as LocalDate,
                gyldigTilOgMed: '2022-05-01' as LocalDate
            }
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
            vergesakstype: 'Voksen',
            omfang: 'Ivareta personens interesser innenfor det personlige og økonomiske området',
            embete: 'Fylkesmannen i Troms og Finnmark',
            gyldighetsPeriode: {
                gyldigFraOgMed: '2021-06-01' as LocalDate,
                gyldigTilOgMed: '2022-05-10' as LocalDate
            }
        },
        {
            ident: '123456799',
            navn: {
                fornavn: 'Truls',
                mellomnavn: null,
                etternavn: 'Tøffel'
            },
            vergesakstype: 'Fremtidsfullmakt',
            omfang: 'Ivareta personens interesser innenfor det økonomiske området',
            embete: 'Fylkesmannen i Troms og Finnmark',
            gyldighetsPeriode: {
                gyldigFraOgMed: '2021-02-10' as LocalDate,
                gyldigTilOgMed: '2022-05-01' as LocalDate
            }
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
                beskrivelse: 'Norge'
            },
            identifikator: '99009900',
            sistEndret: {
                ident: '11223344',
                tidspunkt: '2018-06-14T00:00:00' as LocalDateTime,
                system: 'BD06'
            },
            prioritet: -1
        }
    ],
    kontaktOgReservasjon: {
        personident: '10108000398',
        reservasjon: 'true',
        epostadresse: {
            value: 'epost@nav.no',
            sistOppdatert: null,
            sistVerifisert: '2013-01-01' as LocalDate
        },
        mobiltelefonnummer: {
            value: '12345678',
            sistOppdatert: '2021-11-02' as LocalDate,
            sistVerifisert: '2021-11-02' as LocalDate
        }
    },
    bankkonto: {
        kontonummer: '12345678900',
        banknavn: 'DNB ASA',
        sistEndret: {
            ident: '1010800 BD03',
            tidspunkt: '2006-03-15T00:00:00' as LocalDateTime,
            system: ''
        },
        bankkode: null,
        swift: 'DNBANOKKXXX',
        landkode: null,
        adresse: {
            linje1: 'Bankveien 1,',
            linje2: '0357 Bankestad',
            linje3: null,
            sistEndret: null,
            gyldighetsPeriode: null
        },
        valuta: {
            kode: 'NOK',
            beskrivelse: 'Norske kroner'
        }
    },
    forelderBarnRelasjon: hentBarnAremark()
};
