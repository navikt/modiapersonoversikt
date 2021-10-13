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
const erDod = true;
const visEtiketter = true;
const erReservert = false;
const ikkeRegistrert = false;

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
                linje3: 'Norge',
                sistEndret: {
                    ident: 'Folkeregisteret',
                    tidspunkt: '2020-01-01T10:15:30' as LocalDateTime,
                    system: 'Folkeregisteret'
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
                }
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
        sikkerhetstiltak: visEtiketter
            ? [
                  {
                      type: SikkerhetstiltakType.TFUS,
                      gyldigFraOgMed: '2005-02-13' as LocalDate,
                      gyldigTilOgMed: visEtiketter ? ('2030-02-15' as LocalDate) : ('2010-02-15' as LocalDate)
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
                    linje3: null,
                    sistEndret: null
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
                          sistEndret: null
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
                      omraade: ['*'],
                      gyldigFraOgMed: '2015-01-01' as LocalDate,
                      gyldigTilOgMed: '2017-12-12' as LocalDate
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
                      vergesakstype: 'voksen',
                      omfang: 'personligeOgOekonomiskeInteresser',
                      embete: 'Fylkesmannen i Troms og Finnmark',
                      gyldighetstidspunkt: '2016-03-27' as LocalDate,
                      opphoerstidspunkt: '2017-06-30' as LocalDate
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
                    beskrivelse: 'retningsnummer er norsk'
                },
                identifikator: '99009900',
                sistEndret: '2017-10-10T10:15:30' as LocalDateTime,
                sistEndretAv: 'TESTFAMILIEN AREMARK',
                prioritet: 1
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
                sistEndret: null
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
        rolle: ForelderBarnRelasjonRolle.MOR,
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
                beskrivelse: 'Militær'
            }
        ],
        bostedAdresse: [
            {
                linje1: 'Gatenavn 1',
                linje2: '0000 AREMARK',
                linje3: 'Norge',
                sistEndret: null
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
        rolle: ForelderBarnRelasjonRolle.MEDMOR,
        navn: [
            {
                fornavn: 'BARN2',
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
        bostedAdresse: [],
        harSammeAdresse: false,
        personstatus: [
            {
                kode: PersonStatus.DOD,
                beskrivelse: 'DØD'
            }
        ]
    },
    {
        ident: '12345678912',
        rolle: ForelderBarnRelasjonRolle.FAR,
        navn: [
            {
                fornavn: 'BARN3',
                mellomnavn: null,
                etternavn: 'BARNESEN'
            }
        ],
        fodselsdato: ['2012-06-05' as LocalDate],
        alder: 9,
        kjonn: [],
        adressebeskyttelse: [
            {
                kode: AdresseBeskyttelse.KODE6,
                beskrivelse: 'Sperret adresse, strengt fortrolig'
            }
        ],
        bostedAdresse: [
            {
                linje1: 'Gatenavn 22',
                linje2: '0000 AREMARK',
                linje3: 'Norge',
                sistEndret: null
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
                kode: AdresseBeskyttelse.KODE6_UTLAND,
                beskrivelse: 'Sperret adresse, strengt fortrolig utland'
            }
        ],
        bostedAdresse: [
            {
                linje1: 'Gatenavn 22',
                linje2: '0000 AREMARK',
                linje3: 'Sverige',
                sistEndret: null
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
        kjonn: [
            {
                kode: Kjonn.K,
                beskrivelse: 'Kvinne'
            }
        ],
        adressebeskyttelse: [
            {
                kode: AdresseBeskyttelse.KODE7,
                beskrivelse: 'Sperret adresse, fortrolig'
            }
        ],
        bostedAdresse: [
            {
                linje1: 'Gatenavn 22',
                linje2: '0000 AREMARK',
                linje3: 'Norge',
                sistEndret: null
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
