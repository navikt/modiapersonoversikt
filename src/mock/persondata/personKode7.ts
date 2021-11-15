import {
    AdresseBeskyttelse,
    EgenAnsatt,
    ForelderBarnRelasjonRolle,
    Kjonn,
    LocalDate,
    LocalDateTime,
    Person,
    PersonStatus,
    SivilstandType
} from '../../app/personside/visittkort-v2/PersondataDomain';

const forelderBarnRelasjonMock = [
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
];

export const personKode7: Person = {
    fnr: '09057118773',
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
    dodsdato: [],
    bostedAdresse: [
        {
            linje1: 'Melingsvegen 23',
            linje2: '5430 BREMNES',
            linje3: '4613',
            sistEndret: {
                ident: 'Folkeregisteret',
                tidspunkt: '2021-10-28T15:10:06' as LocalDateTime,
                system: 'FREG'
            }
        }
    ],
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
    adressebeskyttelse: [
        {
            kode: AdresseBeskyttelse.KODE7,
            beskrivelse: 'Sperret adresse, fortrolig'
        }
    ],
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
    fullmakt: [],
    vergemal: [],
    tilrettelagtKommunikasjon: {
        talesprak: [
            {
                kode: 'NO',
                beskrivelse: 'Norsk'
            }
        ],
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
    forelderBarnRelasjon: forelderBarnRelasjonMock
};
