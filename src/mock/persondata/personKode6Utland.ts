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

export const personKode6Utland: Person = {
    fnr: '27118410268',
    navn: [
        {
            fornavn: 'TVILSOM',
            mellomnavn: 'VAKLENDE',
            etternavn: 'KRONJUVEL'
        }
    ],
    kjonn: [
        {
            kode: Kjonn.K,
            beskrivelse: 'Kvinne'
        }
    ],
    fodselsdato: ['1984-11-27' as LocalDate],
    alder: 36,
    dodsdato: [],
    bostedAdresse: [
        {
            linje1: 'Østlifaret 61',
            linje2: '1476 RASTA',
            linje3: '3029',
            sistEndret: {
                ident: 'Folkeregisteret',
                tidspunkt: '2021-10-28T14:08:25' as LocalDateTime,
                system: 'FREG'
            }
        }
    ],
    kontaktAdresse: [],
    navEnhet: {
        id: '0230',
        navn: 'NAV Lørenskog',
        publikumsmottak: [
            {
                besoksadresse: {
                    linje1: 'Skårersletta 61',
                    linje2: '1473 Lørenskog',
                    linje3: null,
                    sistEndret: null
                },
                apningstider: []
            }
        ]
    },
    statsborgerskap: [
        {
            land: {
                kode: 'NOR',
                beskrivelse: 'NORGE'
            },
            gyldigFraOgMed: '1984-11-27' as LocalDate,
            gyldigTilOgMed: null
        }
    ],
    adressebeskyttelse: [
        {
            kode: AdresseBeskyttelse.KODE6_UTLAND,
            beskrivelse: 'Sperret adresse, strengt fortrolig'
        }
    ],
    sikkerhetstiltak: [
        {
            type: 'TOAN',
            beskrivelse: 'To ansatte i samtale',
            gyldigFraOgMed: '2021-10-28' as LocalDate,
            gyldigTilOgMed: '2021-12-28' as LocalDate
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
            gyldigFraOgMed: '2021-09-27' as LocalDate,
            sivilstandRelasjon: {
                fnr: '06027413933',
                navn: [
                    {
                        fornavn: 'GODSLIG',
                        mellomnavn: 'SKJELENDE',
                        etternavn: 'STAUDE'
                    }
                ],
                alder: 47,
                adressebeskyttelse: [],
                harSammeAdresse: true
            }
        }
    ],
    foreldreansvar: [
        {
            ansvar: 'felles',
            ansvarlig: null,
            ansvarsubject: {
                fornavn: 'NOBEL',
                mellomnavn: 'SLØVENDE',
                etternavn: 'POTET'
            }
        }
    ],
    deltBosted: [],
    dodsbo: [],
    fullmakt: [
        {
            motpartsPersonident: '06027513288',
            motpartsPersonNavn: {
                fornavn: 'ÅPENHJERTIG',
                mellomnavn: 'GRYNTENDE',
                etternavn: 'KNOTT'
            },
            motpartsRolle: FullmaktsRolle.FULLMEKTIG,
            omrade: ['AAP'],
            gyldigFraOgMed: '2021-10-28' as LocalDate,
            gyldigTilOgMed: '2021-12-28' as LocalDate
        }
    ],
    vergemal: [
        {
            ident: '17079008052',
            navn: {
                fornavn: 'TVILSOM',
                mellomnavn: 'DANSENDE',
                etternavn: 'BOLLE'
            },
            vergesakstype: 'Voksen',
            omfang: 'Ivareta personens interesser innenfor det personlige og økonomiske området',
            embete: 'Fylkesmannen i Møre og Romsdal',
            gyldighetstidspunkt: '2021-10-28' as LocalDate,
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
                kode: '+47',
                beskrivelse: 'Norge'
            },
            identifikator: '12345678',
            sistEndret: {
                ident: 'srvdolly',
                tidspunkt: '2021-10-28T14:08:27' as LocalDateTime,
                system: 'srvdolly'
            },
            prioritet: -1
        }
    ],
    kontaktOgReservasjon: {
        personident: '27118410268',
        reservasjon: 'false',
        epostadresse: null,
        mobiltelefonnummer: null
    },
    bankkonto: null,
    forelderBarnRelasjon: [
        {
            ident: '05031577278',
            rolle: ForelderBarnRelasjonRolle.BARN,
            navn: [
                {
                    fornavn: 'NOBEL',
                    mellomnavn: 'SLØVENDE',
                    etternavn: 'POTET'
                }
            ],
            fodselsdato: ['2015-03-05' as LocalDate],
            kjonn: [
                {
                    kode: Kjonn.K,
                    beskrivelse: 'Kvinne'
                }
            ],
            alder: 6,
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
