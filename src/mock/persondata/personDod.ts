import {
    EgenAnsatt,
    ForelderBarnRelasjonRolle,
    Kjonn,
    LocalDate,
    LocalDateTime,
    Person,
    PersonStatus,
    SivilstandType,
    Skifteform
} from '../../app/personside/visittkort-v2/PersondataDomain';

export const personDod: Person = {
    fnr: '28077405285',
    navn: [
        {
            fornavn: 'ABSURD',
            mellomnavn: 'LURENDE',
            etternavn: 'TAREMEL'
        }
    ],
    kjonn: [
        {
            kode: Kjonn.K,
            beskrivelse: 'Kvinne'
        }
    ],
    fodselsdato: ['1974-07-28' as LocalDate],
    alder: 47,
    dodsdato: ['2018-08-28' as LocalDate],
    bostedAdresse: [],
    kontaktAdresse: [],
    navEnhet: {
        id: '1219',
        navn: 'NAV Bømlo',
        publikumsmottak: [
            {
                besoksadresse: {
                    linje1: 'Kulturhusvegen 19',
                    linje2: '5430 BREMNES',
                    linje3: null,
                    sistEndret: null
                },
                apningstider: [
                    {
                        ukedag: 'MANDAG',
                        apningstid: '10.00 - 14.00'
                    },
                    {
                        ukedag: 'ONSDAG',
                        apningstid: '10.00 - 14.00'
                    },
                    {
                        ukedag: 'FREDAG',
                        apningstid: '10.00 - 14.00'
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
            gyldigFraOgMed: '1974-07-28' as LocalDate,
            gyldigTilOgMed: null
        }
    ],
    adressebeskyttelse: [],
    sikkerhetstiltak: [],
    erEgenAnsatt: EgenAnsatt.NEI,
    personstatus: [
        {
            kode: PersonStatus.DOD,
            beskrivelse: 'Død'
        }
    ],
    sivilstand: [
        {
            type: {
                kode: SivilstandType.GIFT,
                beskrivelse: 'Gift'
            },
            gyldigFraOgMed: '2011-10-05' as LocalDate,
            sivilstandRelasjon: {
                fnr: '07028222461',
                navn: [
                    {
                        fornavn: 'GØYAL',
                        mellomnavn: 'MÅPENDE',
                        etternavn: 'TRANFLASKE'
                    }
                ],
                alder: 39,
                adressebeskyttelse: [],
                harSammeAdresse: true
            }
        }
    ],
    foreldreansvar: [
        {
            ansvar: 'felles',
            ansvarlig: {
                fornavn: 'GØYAL',
                mellomnavn: 'MÅPENDE',
                etternavn: 'TRANFLASKE'
            },
            ansvarsubject: {
                fornavn: 'LITEN',
                mellomnavn: 'GYNGENDE',
                etternavn: 'VEGGPRYD'
            }
        }
    ],
    deltBosted: [],
    dodsbo: [
        {
            adressat: {
                advokatSomAdressat: {
                    kontaktperson: {
                        fornavn: 'BETYDELIG',
                        mellomnavn: 'OPPRETTHOLDENDE',
                        etternavn: 'SYSTEM'
                    },
                    organisasjonsnavn: 'Advokat Hermansen',
                    organisasjonsnummer: '192837467'
                },
                personSomAdressat: null,
                organisasjonSomAdressat: null
            },
            adresse: {
                linje1: 'Advokatgata 1',
                linje2: '9190 AKKARVIK NOR',
                linje3: null,
                sistEndret: null
            },
            registrert: '2018-09-12' as LocalDate,
            skifteform: Skifteform.OFFENTLIG,
            sistEndret: {
                ident: 'Folkeregisteret',
                tidspunkt: '2021-10-28T15:10:17' as LocalDateTime,
                system: 'FREG'
            }
        }
    ],
    fullmakt: [],
    vergemal: [],
    tilrettelagtKommunikasjon: {
        talesprak: [],
        tegnsprak: []
    },
    telefonnummer: [
        {
            retningsnummer: {
                kode: '+47',
                beskrivelse: 'Norge'
            },
            identifikator: '12345678',
            sistEndret: {
                ident: 'srvdolly',
                tidspunkt: '2021-10-28T15:10:08' as LocalDateTime,
                system: 'srvdolly'
            },
            prioritet: -1
        }
    ],
    kontaktOgReservasjon: {
        personident: '28077405285',
        reservasjon: 'false',
        epostadresse: null,
        mobiltelefonnummer: null
    },
    bankkonto: null,
    forelderBarnRelasjon: [
        {
            ident: '06051780203',
            rolle: ForelderBarnRelasjonRolle.BARN,
            navn: [
                {
                    fornavn: 'LITEN',
                    mellomnavn: 'GYNGENDE',
                    etternavn: 'VEGGPRYD'
                }
            ],
            fodselsdato: ['2017-05-06' as LocalDate],
            kjonn: [
                {
                    kode: Kjonn.K,
                    beskrivelse: 'Kvinne'
                }
            ],
            alder: 4,
            adressebeskyttelse: [],
            harSammeAdresse: true,
            personstatus: [
                {
                    kode: PersonStatus.BOSATT,
                    beskrivelse: 'Bosatt'
                }
            ]
        }
    ]
};
