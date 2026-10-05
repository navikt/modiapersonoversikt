import {
    AdresseBeskyttelse,
    EgenAnsatt,
    type ForelderBarnRelasjon,
    ForelderBarnRelasjonRolle,
    Kjonn,
    type LocalDate,
    type LocalDateTime,
    type Person,
    PersonStatus,
    SivilstandType,
    Skifteform
} from '../../app/personside/visittkort-v2/PersondataDomain';
import { harDiskresjonskode } from '../../app/personside/visittkort-v2/visittkort-utils';
import { FullmaktEndringHendelse, FullmaktEndringKilde } from '../../generated/modiapersonoversikt-api';

function hentBarnAremark(): ForelderBarnRelasjon[] {
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
            dodsdato: ['2010-01-01' as LocalDate]
        }
    ];
}

export const aremark: Person = {
    personIdent: '10108000398',
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
            coAdresse: null,
            linje1: 'Islandsgate 49',
            linje2: '7693 Hovedøya',
            linje3: 'Norge',
            sistEndret: {
                ident: 'Folkeregisteret',
                tidspunkt: '2010-02-20T10:15:30' as LocalDateTime,
                system: 'folkeregisteret',
                kilde: 'bruker'
            },
            gyldighetsPeriode: null
        }
    ],
    historiskeBostedAdresser: [
        {
            coAdresse: null,
            linje1: 'Islandsgate 49',
            linje2: '7693 Hovedøya',
            linje3: 'Norge',
            angittFlyttedato: null,
            sistEndret: {
                ident: 'Folkeregisteret',
                tidspunkt: '2021-10-01T10:00:00' as LocalDateTime,
                system: 'Folkeregisteret',
                kilde: 'Bruker'
            },
            gyldighetsPeriode: {
                gyldigFraOgMed: '2021-10-01' as LocalDate,
                gyldigTilOgMed: null
            }
        },
        {
            coAdresse: null,
            linje1: 'Aremarkveien 7',
            linje2: '1798 Aremark',
            linje3: 'Norge',
            angittFlyttedato: '2020-01-01' as LocalDate,
            sistEndret: {
                ident: 'Folkeregisteret',
                tidspunkt: '2020-01-02T10:00:00' as LocalDateTime,
                system: 'Folkeregisteret',
                kilde: 'Bruker'
            },
            gyldighetsPeriode: {
                gyldigFraOgMed: '2020-01-01' as LocalDate,
                gyldigTilOgMed: '2021-01-01' as LocalDate
            }
        }
    ],
    kontaktAdresse: [
        {
            coAdresse: 'C/O Annet navn',
            linje1: 'Aremarkveien 1',
            linje2: '0320 Aremark',
            linje3: null,
            sistEndret: {
                ident: 'Folkeregisteret',
                tidspunkt: '2020-01-01T10:15:30' as LocalDateTime,
                system: 'folkeregisteret',
                kilde: 'bruker'
            },
            gyldighetsPeriode: null
        }
    ],
    oppholdsAdresse: [
        {
            coAdresse: null,
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
        telefonnummer: '55 55 33 33',
        epost: 'nav.baerum@nav.no',
        publikumsmottak: [
            {
                besoksadresse: {
                    coAdresse: null,
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
            },
            {
                besoksadresse: {
                    coAdresse: null,
                    linje1: 'Kjempelang adressevei 2',
                    linje2: '0001 AREMARK',
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
            },
            {
                besoksadresse: {
                    coAdresse: null,
                    linje1: 'Adressevei 3',
                    linje2: '0002 AREMARK',
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
            beskrivelse: 'Sperret adresse, strengt fortrolig'
        }
    ],
    sikkerhetstiltak: !import.meta.env.VITE_E2E
        ? [
              {
                  type: 'TFUS',
                  beskrivelse: 'Telefonisk utestengelse',
                  gyldighetsPeriode: {
                      gyldigFraOgMed: '2021-02-01' as LocalDate,
                      gyldigTilOgMed: '2022-05-01' as LocalDate
                  }
              }
          ]
        : [],
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
                harSammeAdresse: true,
                dodsdato: ['2022-01-01' as LocalDate]
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
                coAdresse: null,
                linje1: 'Adresseveien 1',
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
                coAdresse: null,
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
                system: 'folkeregisteret',
                kilde: 'tingretten'
            }
        }
    ],
    fullmektige: [
        {
            ident: '123456789',
            navn: {
                fornavn: 'Navn',
                mellomnavn: null,
                etternavn: 'Navnesen'
            },
            digitalKontaktinformasjonTredjepartsperson: {
                mobiltelefonnummer: '90909090',
                reservasjon: false
            },
            fullmakt: {
                fullmaktId: '123e4567-e89b-12d3-a456-426614174000',
                fullmaktsgiver: '10108000398',
                fullmektig: '123456789',
                gyldigFraOgMed: '2026-01-01',
                gyldigTilOgMed: '2027-12-31',
                leserettigheter: [
                    {
                        kode: 'AAP',
                        beskrivelse: 'Arbeidsavklaringspenger'
                    },
                    {
                        kode: 'DAG',
                        beskrivelse: 'Dagpenger'
                    }
                ],
                skriverettigheter: [
                    {
                        kode: 'DAG',
                        beskrivelse: 'Dagpenger'
                    }
                ],
                endringslogg: [
                    {
                        endringId: 1,
                        registrert: '2026-01-01T10:00:00',
                        registrertAv: '10108000398',
                        kilde: FullmaktEndringKilde.BRUKER,
                        hendelse: FullmaktEndringHendelse.OPPRETTELSE_AV_BRUKER,
                        gyldigFraOgMed: '2026-01-01',
                        gyldigTilOgMed: '2027-12-31',
                        leserettigheter: [
                            {
                                kode: 'AAP',
                                beskrivelse: 'Arbeidsavklaringspenger'
                            },
                            {
                                kode: 'DAG',
                                beskrivelse: 'Dagpenger'
                            }
                        ],
                        skriverettigheter: [
                            {
                                kode: 'DAG',
                                beskrivelse: 'Dagpenger'
                            }
                        ]
                    }
                ]
            }
        },
        {
            ident: '12345678111',
            navn: {
                fornavn: 'Navn2',
                mellomnavn: null,
                etternavn: 'Navnesen2'
            },
            digitalKontaktinformasjonTredjepartsperson: {
                mobiltelefonnummer: null,
                reservasjon: true
            },
            fullmakt: {
                fullmaktId: '123e4567-e89b-12d3-a456-426614174001',
                fullmaktsgiver: '10108000398',
                fullmektig: '12345678111',
                gyldigFraOgMed: '2026-01-01',
                leserettigheter: [],
                skriverettigheter: [
                    {
                        kode: 'AAP',
                        beskrivelse: 'Arbeidsavklaringspenger'
                    }
                ],
                endringslogg: []
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
            omfang: '',
            tjenesteOppgaver: ['Arbeid', 'Familie', 'Hjelpemidler', 'Sosiale Tjenester'],
            embete: 'Fylkesmannen i Troms og Finnmark',
            gyldighetsPeriode: {
                gyldigFraOgMed: '2024-06-01' as LocalDate,
                gyldigTilOgMed: '2027-05-10' as LocalDate
            },
            historisk: false
        }
    ],
    historiskeVergemal: [
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
                gyldigFraOgMed: '2022-02-10' as LocalDate,
                gyldigTilOgMed: '2022-05-01' as LocalDate
            },
            historisk: true
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
                system: 'NAV',
                kilde: 'bruker'
            },
            prioritet: -1
        }
    ],
    kontaktInformasjon: {
        erReservert: {
            value: true,
            sistOppdatert: '2020-01-01' as LocalDate,
            sistVerifisert: null
        },
        erManuell: true,
        epost: {
            value: 'epost@nav.no',
            sistOppdatert: null,
            sistVerifisert: '2013-01-01' as LocalDate
        },
        mobil: {
            value: '12345678',
            sistOppdatert: '2021-11-02' as LocalDate,
            sistVerifisert: '2021-11-02' as LocalDate
        }
    },
    bankkonto: {
        kontonummer: '12345678900',
        banknavn: 'DNB ASA',
        kilde: 'Kontoregister',
        sistEndret: {
            ident: '1010800 BD03',
            tidspunkt: '2006-03-15T00:00:00' as LocalDateTime,
            system: '',
            kilde: ''
        },
        bankkode: null,
        swift: 'DNBANOKKXXX',
        landkode: null,
        adresse: {
            coAdresse: null,
            linje1: 'Bankveien 1,',
            linje2: '0357 Bankestad',
            linje3: null,
            sistEndret: null,
            gyldighetsPeriode: null
        },
        valuta: {
            kode: 'NOK',
            beskrivelse: 'Norske kroner'
        },
        opprettetAv: '1010800 BD03'
    },
    forelderBarnRelasjon: hentBarnAremark(),
    innflyttingTilNorge: [
        {
            fraflyttingsland: 'Sverige',
            gyldighetsPeriode: {
                gyldigFraOgMed: '2020-01-01' as LocalDate,
                gyldigTilOgMed: '2030-01-01' as LocalDate
            },
            sistEndret: {
                ident: 'Folkeregisteret',
                tidspunkt: '2010-02-20T10:15:30' as LocalDateTime,
                system: 'folkeregisteret',
                kilde: 'bruker'
            }
        },
        {
            fraflyttingsland: 'Hellas',
            gyldighetsPeriode: {
                gyldigFraOgMed: '2020-01-01' as LocalDate,
                gyldigTilOgMed: '2030-01-01' as LocalDate
            },
            sistEndret: {
                ident: 'Folkeregisteret',
                tidspunkt: '2010-02-20T10:15:30' as LocalDateTime,
                system: 'folkeregisteret',
                kilde: 'bruker'
            }
        }
    ],
    utflyttingFraNorge: [
        {
            tilflyttingsland: 'Danmark',
            utflyttingsdato: '2025-01-01' as LocalDate,
            gyldighetsPeriode: {
                gyldigFraOgMed: '2020-01-01' as LocalDate,
                gyldigTilOgMed: '2025-01-01' as LocalDate
            },
            sistEndret: {
                ident: 'Folkeregisteret',
                tidspunkt: '2010-02-20T10:15:30' as LocalDateTime,
                system: 'folkeregisteret',
                kilde: 'bruker'
            }
        }
    ],
    rettsligHandleevne: [
        {
            omfang: 'begrenset',
            gyldighetsPeriode: {
                gyldigFraOgMed: '2020-01-01' as LocalDate,
                gyldigTilOgMed: '2025-01-01' as LocalDate
            }
        }
    ]
};
