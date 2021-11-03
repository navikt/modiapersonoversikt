import {
    EgenAnsatt,
    ForelderBarnRelasjonRolle,
    Kjonn,
    LocalDate,
    LocalDateTime,
    Person,
    PersonStatus,
    SivilstandType
} from '../../app/personside/visittkort-v2/PersondataDomain';

export const personDeltBosted: Person = {
    fnr: '01021865210',
    navn: [
        {
            fornavn: 'SNERPETE',
            mellomnavn: null,
            etternavn: 'HAKKE'
        }
    ],
    kjonn: [
        {
            kode: Kjonn.M,
            beskrivelse: 'Mann'
        }
    ],
    fodselsdato: ['2018-01-02' as LocalDate],
    alder: 3,
    dodsdato: [],
    bostedAdresse: [
        {
            linje1: 'Kystkulturveien 1886 H0101',
            linje2: '9470 GRATANGEN',
            linje3: '5414',
            sistEndret: {
                ident: 'Folkeregisteret',
                tidspunkt: '2021-02-22T21:31:23' as LocalDateTime,
                system: 'FREG'
            }
        }
    ],
    kontaktAdresse: [],
    navEnhet: {
        id: '1805',
        navn: 'NAV Narvik',
        publikumsmottak: [
            {
                besoksadresse: {
                    linje1: 'Bergvikveien 11',
                    linje2: '8533 BOGEN I LOFOTEN',
                    linje3: null,
                    sistEndret: null
                },
                apningstider: [
                    {
                        ukedag: 'TIRSDAG',
                        apningstid: '11.30 - 13.30'
                    },
                    {
                        ukedag: 'TORSDAG',
                        apningstid: '11.30 - 13.30'
                    }
                ]
            },
            {
                besoksadresse: {
                    linje1: 'Nergårdveien 2',
                    linje2: '9470 GRATANGEN',
                    linje3: null,
                    sistEndret: null
                },
                apningstider: []
            },
            {
                besoksadresse: {
                    linje1: 'Kongens gate 51',
                    linje2: '8514 NARVIK',
                    linje3: null,
                    sistEndret: null
                },
                apningstider: [
                    {
                        ukedag: 'TIRSDAG',
                        apningstid: '11.30 - 13.30'
                    },
                    {
                        ukedag: 'TORSDAG',
                        apningstid: '11.30 - 13.30'
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
            gyldigFraOgMed: null,
            gyldigTilOgMed: null
        }
    ],
    adressebeskyttelse: [],
    sikkerhetstiltak: [],
    erEgenAnsatt: EgenAnsatt.NEI,
    personstatus: [
        {
            kode: PersonStatus.BOSATT,
            beskrivelse: 'Bosatt'
        }
    ],
    sivilstand: [
        {
            type: {
                kode: SivilstandType.UGIFT,
                beskrivelse: 'Ugift'
            },
            gyldigFraOgMed: null,
            sivilstandRelasjon: null
        }
    ],
    foreldreansvar: [
        {
            ansvar: 'felles',
            ansvarlig: null,
            ansvarsubject: null
        },
        {
            ansvar: 'felles',
            ansvarlig: null,
            ansvarsubject: null
        }
    ],
    deltBosted: [
        {
            startdatoForKontrakt: '2021-02-10' as LocalDate,
            sluttdatoForKontrakt: null,
            adresse: {
                linje1: 'Storåkeren 17 H0101',
                linje2: '9411 HARSTAD',
                linje3: '5402',
                sistEndret: null
            }
        }
    ],
    dodsbo: [],
    fullmakt: [],
    vergemal: [],
    tilrettelagtKommunikasjon: {
        talesprak: [],
        tegnsprak: []
    },
    telefonnummer: [],
    kontaktOgReservasjon: {
        personident: '30871998104',
        reservasjon: 'false',
        epostadresse: {
            value: 'noreply@nav.no',
            sistOppdatert: '2000-01-01' as LocalDate,
            sistVerifisert: '2000-01-01' as LocalDate
        },
        mobiltelefonnummer: {
            value: '11111111',
            sistOppdatert: '2000-01-01' as LocalDate,
            sistVerifisert: '2000-01-01' as LocalDate
        }
    },
    bankkonto: {
        kontonummer: '1234567890',
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
            sistEndret: null
        },
        valuta: {
            kode: 'NOK',
            beskrivelse: 'Norske kroner'
        }
    },
    forelderBarnRelasjon: [
        {
            ident: '24835498561',
            rolle: ForelderBarnRelasjonRolle.FAR,
            navn: [
                {
                    fornavn: 'ALFABETISK',
                    mellomnavn: null,
                    etternavn: 'KLASSE'
                }
            ],
            fodselsdato: ['1954-03-24' as LocalDate],
            kjonn: [
                {
                    kode: Kjonn.M,
                    beskrivelse: 'Mann'
                }
            ],
            alder: 67,
            adressebeskyttelse: [],
            harSammeAdresse: true,
            personstatus: [
                {
                    kode: PersonStatus.BOSATT,
                    beskrivelse: 'Bosatt'
                }
            ]
        },
        {
            ident: '09884397631',
            rolle: ForelderBarnRelasjonRolle.MOR,
            navn: [
                {
                    fornavn: 'LATTERMILD',
                    mellomnavn: null,
                    etternavn: 'HAKKE'
                }
            ],
            fodselsdato: ['1943-08-09' as LocalDate],
            kjonn: [
                {
                    kode: Kjonn.K,
                    beskrivelse: 'Kvinne'
                }
            ],
            alder: 78,
            adressebeskyttelse: [],
            harSammeAdresse: false,
            personstatus: [
                {
                    kode: PersonStatus.BOSATT,
                    beskrivelse: 'Bosatt'
                }
            ]
        }
    ]
};
