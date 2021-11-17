import { erGyldigFødselsnummer } from 'nav-faker/dist/personidentifikator/helpers/fodselsnummer-utils';
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
    SivilstandType,
    Skifteform
} from '../../app/personside/visittkort-v2/PersondataDomain';
import { aremark } from './aremark';

// Til bruk under testing av funksjonalitet
const erDod = false;
const visEtiketter = true;
const erReservert = false;
const ikkeRegistrert = false;

export function hentPersondata(fodselsnummer: string): PersonData | null {
    if (fodselsnummer === aremark.fnr) {
        return { feilendeSystemer: [], person: aremark };
    } else if (!erGyldigFødselsnummer(fodselsnummer)) {
        return null;
    } else {
        return { feilendeSystemer: [], person: lagPerson(fodselsnummer) };
    }
}

function lagPerson(fnr: string): Person {
    return {
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
                linje3: 'Norge',
                sistEndret: {
                    ident: 'Folkeregisteret',
                    tidspunkt: '2020-01-01T10:15:30' as LocalDateTime,
                    system: 'Folkeregisteret'
                },
                gyldighetsPeriode: {
                    gyldigFraOgMed: '2021-02-01' as LocalDate,
                    gyldigTilOgMed: '2022-05-01' as LocalDate
                }
            }
        ],
        kontaktAdresse: [
            {
                linje1: 'Kontaktadresse 1',
                linje2: '0320 HEI',
                linje3: null,
                sistEndret: {
                    ident: 'D159000',
                    tidspunkt: '2021-10-10T10:15:30' as LocalDateTime,
                    system: 'NAV'
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
                            apningstid: '09.00 - 14.00'
                        }
                    ]
                },
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
            },
            {
                land: {
                    kode: 'DNK',
                    beskrivelse: 'DANMARK'
                },
                gyldighetsPeriode: {
                    gyldigFraOgMed: '2021-02-01' as LocalDate,
                    gyldigTilOgMed: null
                }
            },
            {
                land: {
                    kode: 'FIN',
                    beskrivelse: 'FINLAND'
                },
                gyldighetsPeriode: {
                    gyldigFraOgMed: '2021-02-01' as LocalDate,
                    gyldigTilOgMed: '2022-05-01' as LocalDate
                }
            }
        ],
        adressebeskyttelse: [
            {
                kode: visEtiketter ? AdresseBeskyttelse.KODE6 : AdresseBeskyttelse.UGRADERT,
                beskrivelse: visEtiketter ? 'Kode 6' : ''
            }
        ],
        sikkerhetstiltak: visEtiketter
            ? [
                  {
                      type: 'TFUS',
                      beskrivelse: 'Telefonisk utestengelse',
                      gyldighetsPeriode: {
                          gyldigFraOgMed: '2021-02-01' as LocalDate,
                          gyldigTilOgMed: visEtiketter ? ('2030-02-15' as LocalDate) : ('2010-02-15' as LocalDate)
                      }
                  }
              ]
            : [],
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
                    kode: SivilstandType.GIFT,
                    beskrivelse: 'Gift'
                },
                gyldigFraOgMed: '2010-03-06' as LocalDate,
                sivilstandRelasjon: {
                    fnr: '',
                    navn: [],
                    alder: null,
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
        dodsbo: visEtiketter
            ? [
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
                          linje1: 'Elgelia 20',
                          linje2: '0000 Aremark',
                          linje3: null,
                          sistEndret: null,
                          gyldighetsPeriode: null
                      },
                      registrert: '2010-02-02' as LocalDate,
                      skifteform: Skifteform.OFFENTLIG,
                      sistEndret: {
                          ident: 'Folkeregisteret',
                          tidspunkt: '2015-01-01T10:15:30' as LocalDateTime,
                          system: 'Folkeregisteret'
                      }
                  }
              ]
            : [],
        fullmakt: visEtiketter
            ? [
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
                          gyldigFraOgMed: '2021-02-01' as LocalDate,
                          gyldigTilOgMed: '2022-05-01' as LocalDate
                      }
                  }
              ]
            : [],
        vergemal: visEtiketter
            ? [
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
                          gyldigFraOgMed: '2021-02-01' as LocalDate,
                          gyldigTilOgMed: '2022-05-01' as LocalDate
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
                          gyldigFraOgMed: '2021-02-01' as LocalDate,
                          gyldigTilOgMed: '2022-05-01' as LocalDate
                      }
                  }
              ]
            : [],
        tilrettelagtKommunikasjon: {
            talesprak: visEtiketter
                ? [
                      {
                          kode: 'NO',
                          beskrivelse: 'Norsk'
                      }
                  ]
                : [],
            tegnsprak: visEtiketter
                ? [
                      {
                          kode: 'NO',
                          beskrivelse: 'Norsk'
                      }
                  ]
                : []
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
                    tidspunkt: '2018-06-01T00:00:00' as LocalDateTime,
                    system: 'BD06'
                },
                prioritet: 1
            },
            {
                retningsnummer: {
                    kode: '+47',
                    beskrivelse: 'Norge'
                },
                identifikator: '55003399',
                sistEndret: {
                    ident: '11223344',
                    tidspunkt: '2011-06-14T00:00:00' as LocalDateTime,
                    system: ''
                },
                prioritet: -1
            }
        ],
        kontaktOgReservasjon: ikkeRegistrert
            ? {
                  personident: '10108000398',
                  reservasjon: erReservert ? 'true' : 'false',
                  epostadresse: {
                      value: null,
                      sistOppdatert: null,
                      sistVerifisert: null
                  },
                  mobiltelefonnummer: {
                      value: null,
                      sistOppdatert: null,
                      sistVerifisert: null
                  }
              }
            : {
                  personident: '10108000398',
                  reservasjon: erReservert ? 'true' : 'false',
                  epostadresse: {
                      value: 'epost@nav.no',
                      sistOppdatert: '2013-01-01' as LocalDate,
                      sistVerifisert: '2013-01-01' as LocalDate
                  },
                  mobiltelefonnummer: {
                      value: '90000000',
                      sistOppdatert: '2015-02-01' as LocalDate,
                      sistVerifisert: null
                  }
              },
        bankkonto: {
            kontonummer: '12345678910',
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
        forelderBarnRelasjon: forelderBarnMock
    };
}

const forelderBarnMock: ForelderBarnRelasjon[] = [
    {
        ident: '12345678910',
        rolle: ForelderBarnRelasjonRolle.MOR,
        navn: [
            {
                fornavn: 'MOR',
                mellomnavn: null,
                etternavn: 'MORSAN'
            }
        ],
        fodselsdato: ['1971-03-15' as LocalDate],
        alder: 50,
        kjonn: [
            {
                kode: Kjonn.K,
                beskrivelse: 'Kvinne'
            }
        ],
        adressebeskyttelse: [
            {
                kode: AdresseBeskyttelse.UGRADERT,
                beskrivelse: 'Militær'
            }
        ],
        harSammeAdresse: true,
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
                fornavn: 'BARN1',
                mellomnavn: null,
                etternavn: 'BARNESEN'
            }
        ],
        fodselsdato: ['2010-04-21' as LocalDate],
        alder: null,
        kjonn: [
            {
                kode: Kjonn.M,
                beskrivelse: 'Mann'
            }
        ],
        adressebeskyttelse: [
            {
                kode: AdresseBeskyttelse.UGRADERT,
                beskrivelse: 'Pendler'
            }
        ],
        harSammeAdresse: false,
        personstatus: [
            {
                kode: PersonStatus.DOD,
                beskrivelse: 'DØD'
            }
        ]
    },
    {
        ident: '',
        rolle: ForelderBarnRelasjonRolle.FAR,
        navn: [],
        fodselsdato: [],
        alder: null,
        kjonn: [],
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
        kjonn: [
            {
                kode: Kjonn.U,
                beskrivelse: 'Ukjent kjønn'
            }
        ],
        adressebeskyttelse: [
            {
                kode: AdresseBeskyttelse.UGRADERT,
                beskrivelse: 'UGRADERT'
            }
        ],
        harSammeAdresse: true,
        personstatus: [
            {
                kode: PersonStatus.UTFLYTTET,
                beskrivelse: 'UTFLYTTET'
            }
        ]
    },
    {
        ident: '',
        rolle: ForelderBarnRelasjonRolle.BARN,
        navn: [],
        fodselsdato: [],
        alder: null,
        kjonn: [],
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
                beskrivelse: 'BOSATT'
            }
        ]
    }
];
