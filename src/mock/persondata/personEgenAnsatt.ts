import {
    AdresseBeskyttelse,
    EgenAnsatt,
    ForelderBarnRelasjonRolle,
    FullmaktsRolle,
    Kjonn,
    LocalDate,
    LocalDateTime,
    Person,
    PersonStatus,
    SivilstandType
} from '../../app/personside/visittkort-v2/PersondataDomain';

export const personEgenAnsatt: Person = {
    fnr: '05018811814',
    navn: [
        {
            fornavn: 'SNILL',
            mellomnavn: null,
            etternavn: 'MIDTPUNKT'
        }
    ],
    kjonn: [
        {
            kode: Kjonn.M,
            beskrivelse: 'Mann'
        }
    ],
    fodselsdato: ['1965-01-03' as LocalDate],
    alder: 56,
    dodsdato: [],
    bostedAdresse: [],
    kontaktAdresse: [
        {
            linje1: 'Blåsbortveien 2 D',
            linje2: '0873 OSLO',
            linje3: '030108 0301',
            sistEndret: {
                ident: 'Folkeregisteret',
                tidspunkt: '2021-11-02T08:12:55' as LocalDateTime,
                system: 'FREG'
            }
        }
    ],
    navEnhet: null,
    statsborgerskap: [
        {
            land: {
                kode: 'DZA',
                beskrivelse: 'ALGERIE'
            },
            gyldigFraOgMed: '1965-11-02' as LocalDate,
            gyldigTilOgMed: '2017-04-25' as LocalDate
        },
        {
            land: {
                kode: 'NOR',
                beskrivelse: 'NORGE'
            },
            gyldigFraOgMed: '1974-07-28' as LocalDate,
            gyldigTilOgMed: null
        }
    ],
    adressebeskyttelse: [],
    sikkerhetstiltak: [],
    erEgenAnsatt: EgenAnsatt.JA,
    personstatus: [
        {
            kode: PersonStatus.BOSATT,
            beskrivelse: 'Bosatt'
        }
    ],
    sivilstand: [
        {
            type: {
                kode: SivilstandType.GIFT,
                beskrivelse: 'Gift'
            },
            gyldigFraOgMed: '2018-08-07' as LocalDate,
            sivilstandRelasjon: {
                fnr: '08076124060',
                navn: [
                    {
                        fornavn: 'SMIDIG',
                        mellomnavn: 'GRYNTENDE',
                        etternavn: 'GASELLE'
                    }
                ],
                alder: 60,
                adressebeskyttelse: [
                    {
                        kode: AdresseBeskyttelse.KODE6,
                        beskrivelse: 'Sperret adresse, strengt fortrolig'
                    }
                ],
                harSammeAdresse: false
            }
        }
    ],
    foreldreansvar: [
        {
            ansvar: 'felles',
            ansvarlig: null,
            ansvarsubject: {
                fornavn: 'ARTIG',
                mellomnavn: 'SKJELVENDE',
                etternavn: 'RHODODENRON'
            }
        }
    ],
    deltBosted: [],
    dodsbo: [],
    fullmakt: [
        {
            motpartsPersonident: '22087121635',
            motpartsPersonNavn: {
                fornavn: 'LUGUBER',
                mellomnavn: 'GRYNTENDE',
                etternavn: 'SNERK'
            },
            motpartsRolle: FullmaktsRolle.FULLMEKTIG,
            omrade: ['Barnetrygd'],
            gyldigFraOgMed: '2020-03-02' as LocalDate,
            gyldigTilOgMed: '2025-11-13' as LocalDate
        }
    ],
    vergemal: [
        {
            ident: '14107224042',
            navn: {
                fornavn: 'RAKRYGGET',
                mellomnavn: 'MÅPENDE',
                etternavn: 'LAPP'
            },
            vergesakstype: 'Voksen',
            omfang:
                'Ivareta personens interesser innenfor det personlige og økonomiske området herunder utlendingssaken (kun for EMA)',
            embete: 'Fylkesmannen i Møre og Romsdal',
            gyldighetstidspunkt: '2021-11-02' as LocalDate,
            opphorstidspunkt: null
        }
    ],
    tilrettelagtKommunikasjon: {
        talesprak: [
            {
                kode: 'DK',
                beskrivelse: 'Dansk'
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
                kode: '+213',
                beskrivelse: 'Algerie'
            },
            identifikator: '11111111',
            sistEndret: {
                ident: 'srvdolly',
                tidspunkt: '2021-11-02T08:13:00' as LocalDateTime,
                system: 'srvdolly'
            },
            prioritet: -1
        },
        {
            retningsnummer: {
                kode: '+47',
                beskrivelse: 'Norge'
            },
            identifikator: '12345678',
            sistEndret: {
                ident: 'srvdolly',
                tidspunkt: '2021-11-02T08:13:00' as LocalDateTime,
                system: 'srvdolly'
            },
            prioritet: -1
        }
    ],
    kontaktOgReservasjon: {
        personident: '03016516057',
        reservasjon: 'true',
        epostadresse: {
            value: 'navn@nav.no',
            sistOppdatert: '2021-11-02' as LocalDate,
            sistVerifisert: '2021-11-02' as LocalDate
        },
        mobiltelefonnummer: {
            value: '12345678',
            sistOppdatert: '2021-11-02' as LocalDate,
            sistVerifisert: '2021-11-02' as LocalDate
        }
    },
    bankkonto: null,
    forelderBarnRelasjon: [
        {
            ident: '',
            rolle: ForelderBarnRelasjonRolle.MOR,
            navn: [],
            fodselsdato: [],
            kjonn: [],
            alder: null,
            adressebeskyttelse: [
                {
                    kode: AdresseBeskyttelse.KODE6_UTLAND,
                    beskrivelse: 'Sperret adresse, strengt fortrolig'
                }
            ],
            harSammeAdresse: false,
            personstatus: []
        },
        {
            ident: '26115122184',
            rolle: ForelderBarnRelasjonRolle.FAR,
            navn: [
                {
                    fornavn: 'LUGUBER',
                    mellomnavn: 'LURENDE',
                    etternavn: 'KAMELEON'
                }
            ],
            fodselsdato: ['1951-11-26' as LocalDate],
            kjonn: [
                {
                    kode: Kjonn.M,
                    beskrivelse: 'Mann'
                }
            ],
            alder: 69,
            adressebeskyttelse: [],
            harSammeAdresse: false,
            personstatus: [
                {
                    kode: PersonStatus.BOSATT,
                    beskrivelse: 'Bosatt'
                }
            ]
        },
        {
            ident: '',
            rolle: ForelderBarnRelasjonRolle.BARN,
            navn: [],
            fodselsdato: [],
            kjonn: [],
            alder: null,
            adressebeskyttelse: [
                {
                    kode: AdresseBeskyttelse.KODE6,
                    beskrivelse: 'Sperret adresse, strengt fortrolig'
                }
            ],
            harSammeAdresse: false,
            personstatus: []
        }
    ]
};
