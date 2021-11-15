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

const forelderBarnRelasjonMock = [
    {
        ident: '25075405645',
        rolle: ForelderBarnRelasjonRolle.MOR,
        navn: [
            {
                fornavn: 'RASK',
                mellomnavn: 'SLØVENDE',
                etternavn: 'BUSK'
            }
        ],
        fodselsdato: ['1954-07-25' as LocalDate],
        kjonn: [
            {
                kode: Kjonn.K,
                beskrivelse: 'Kvinne'
            }
        ],
        alder: 67,
        adressebeskyttelse: [
            {
                kode: AdresseBeskyttelse.KODE6_UTLAND,
                beskrivelse: 'Sperret adresse, strengt fortrolig'
            }
        ],
        harSammeAdresse: false,
        personstatus: [
            {
                kode: PersonStatus.BOSATT,
                beskrivelse: 'Bosatt'
            }
        ]
    },
    {
        ident: '13022081416',
        rolle: ForelderBarnRelasjonRolle.BARN,
        navn: [
            {
                fornavn: 'GØYAL',
                mellomnavn: 'TIKKENDE',
                etternavn: 'MULDVARP'
            }
        ],
        fodselsdato: ['2020-02-13' as LocalDate],
        kjonn: [
            {
                kode: Kjonn.K,
                beskrivelse: 'Kvinne'
            }
        ],
        alder: 1,
        adressebeskyttelse: [],
        harSammeAdresse: false,
        personstatus: [
            {
                kode: PersonStatus.DOD,
                beskrivelse: 'Død'
            }
        ]
    },
    {
        ident: '03060777011',
        rolle: ForelderBarnRelasjonRolle.BARN,
        navn: [
            {
                fornavn: 'ARTIG',
                mellomnavn: 'SKJELVENDE',
                etternavn: 'RHODODENRON'
            }
        ],
        fodselsdato: ['2007-06-03' as LocalDate],
        kjonn: [
            {
                kode: Kjonn.K,
                beskrivelse: 'Kvinne'
            }
        ],
        alder: 14,
        adressebeskyttelse: [
            {
                kode: AdresseBeskyttelse.KODE6,
                beskrivelse: 'Sperret adresse, strengt fortrolig'
            }
        ],
        harSammeAdresse: false,
        personstatus: [
            {
                kode: PersonStatus.BOSATT,
                beskrivelse: 'Bosatt'
            }
        ]
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
        adressebeskyttelse: [
            {
                kode: AdresseBeskyttelse.KODE6_UTLAND,
                beskrivelse: 'Sperret adresse, strengt fortrolig'
            }
        ],
        harSammeAdresse: false,
        personstatus: [
            {
                kode: PersonStatus.BOSATT,
                beskrivelse: 'Bosatt'
            }
        ]
    },
    {
        ident: '10050550120',
        rolle: ForelderBarnRelasjonRolle.BARN,
        navn: [
            {
                fornavn: 'ROBUST',
                mellomnavn: 'DANSENDE',
                etternavn: 'VEPS'
            }
        ],
        fodselsdato: ['2005-05-10' as LocalDate],
        kjonn: [
            {
                kode: Kjonn.M,
                beskrivelse: 'Mann'
            }
        ],
        alder: 16,
        adressebeskyttelse: [
            {
                kode: AdresseBeskyttelse.KODE7,
                beskrivelse: 'Sperret adresse, fortrolig'
            }
        ],
        harSammeAdresse: false,
        personstatus: [
            {
                kode: PersonStatus.BOSATT,
                beskrivelse: 'Bosatt'
            }
        ]
    },
    {
        ident: '23060450188',
        rolle: ForelderBarnRelasjonRolle.BARN,
        navn: [
            {
                fornavn: 'TRIVIELL',
                mellomnavn: 'DRØVTYGGENDE',
                etternavn: 'VEPS'
            }
        ],
        fodselsdato: ['2004-06-23' as LocalDate],
        kjonn: [
            {
                kode: Kjonn.M,
                beskrivelse: 'Mann'
            }
        ],
        alder: 17,
        adressebeskyttelse: [
            {
                kode: AdresseBeskyttelse.KODE6,
                beskrivelse: 'Sperret adresse, strengt fortrolig'
            }
        ],
        harSammeAdresse: false,
        personstatus: [
            {
                kode: PersonStatus.BOSATT,
                beskrivelse: 'Bosatt'
            }
        ]
    }
];

export const personKode6: Person = {
    fnr: '03016516057',
    navn: [
        {
            fornavn: 'ARTIG',
            mellomnavn: 'TVILENDE',
            etternavn: 'MIDTPUNKT'
        }
    ],
    kjonn: [
        {
            kode: Kjonn.K,
            beskrivelse: 'Kvinne'
        }
    ],
    fodselsdato: ['1965-01-03' as LocalDate],
    alder: 56,
    dodsdato: [],
    bostedAdresse: [],
    kontaktAdresse: [],
    navEnhet: null,
    statsborgerskap: [
        {
            land: {
                kode: 'DZA',
                beskrivelse: 'ALGERIE'
            },
            gyldigFraOgMed: '1965-11-02' as LocalDate,
            gyldigTilOgMed: '2017-04-25' as LocalDate
        }
    ],
    adressebeskyttelse: [
        {
            kode: AdresseBeskyttelse.KODE6,
            beskrivelse: 'Sperret adresse, strengt fortrolig'
        }
    ],
    sikkerhetstiltak: [
        {
            type: 'TOAN',
            beskrivelse: 'To ansatte i samtale',
            gyldigFraOgMed: '2021-11-02' as LocalDate,
            gyldigTilOgMed: '2021-11-24' as LocalDate
        }
    ],
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
    foreldreansvar: forelderBarnRelasjonMock
        .filter(relasjon => relasjon.rolle === ForelderBarnRelasjonRolle.BARN)
        .map(barn => ({
            ansvar: 'felles',
            ansvarlig: null,
            ansvarsubject: {
                navn: barn.navn.firstOrNull(),
                ident: barn.ident
            }
        })),
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
            omrade: [
                {
                    kode: 'BAR',
                    beskrivelse: 'Barnetrygd'
                }
            ],
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
        talesprak: [],
        tegnsprak: []
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
    forelderBarnRelasjon: forelderBarnRelasjonMock
};
