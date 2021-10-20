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
    SikkerhetstiltakType,
    SivilstandType,
    Skifteform
} from '../../app/personside/visittkort-v2/PersondataDomain';

export const barnAremark: ForelderBarnRelasjon[] = [
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
        adressebeskyttelse: [
            {
                kode: AdresseBeskyttelse.UGRADERT,
                beskrivelse: 'UGRADERT'
            }
        ],
        bostedAdresse: [
            {
                linje1: 'Islandsgate 49',
                linje2: '7693 Hovedøya',
                linje3: 'Norge'
            }
        ],
        personstatus: [
            {
                kode: PersonStatus.BOSATT,
                beskrivelse: 'BOSATT'
            }
        ]
    }
];

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
    alder: 41,
    dodsdato: [],
    bostedAdresse: [
        {
            linje1: 'Islandsgate 49',
            linje2: '7693 Hovedøya',
            linje3: 'Norge'
        }
    ],
    kontaktAdresse: [
        {
            linje1: 'Aremarkveien 1',
            linje2: '0320 Aremark',
            linje3: null
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
                beskrivelse: 'NORGE'
            },
            gyldigFraOgMed: '1980-10-10' as LocalDate,
            gyldigTilOgMed: null,
            erHistorisk: false
        }
    ],
    adressebeskyttelse: [
        {
            kode: AdresseBeskyttelse.KODE6,
            beskrivelse: 'Ingen'
        }
    ],
    sikkerhetstiltak: [
        {
            type: SikkerhetstiltakType.TFUS,
            gyldigFraOgMed: '2005-02-13' as LocalDate,
            gyldigTilOgMed: '2030-02-15' as LocalDate
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
            gyldigFraOgMed: '2005-12-12' as LocalDate
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
                linje3: null
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
                linje3: null
            },
            registrert: '2010-02-02' as LocalDate,
            skifteform: Skifteform.OFFENTLIG
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
            omraade: ['*'],
            gyldigFraOgMed: '2015-01-01' as LocalDate,
            gyldigTilOgMed: '2017-12-12' as LocalDate
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
            vergesakstype: 'voksen',
            omfang: 'personligeOgOekonomiskeInteresser',
            embete: 'Fylkesmannen i Troms og Finnmark',
            gyldighetstidspunkt: '2016-03-27' as LocalDate,
            opphoerstidspunkt: '2017-06-30' as LocalDate
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
                beskrivelse: 'retningsnummer er norsk'
            },
            identifikator: '99009900',
            sistEndret: '2017-10-10T10:15:30' as LocalDateTime,
            sistEndretAv: 'TESTFAMILIEN AREMARK',
            prioritet: 1
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
            value: '90000000',
            sistOppdatert: null,
            sistVerifisert: null
        }
    },
    bankkonto: {
        kontonummer: '1234567890',
        banknavn: 'DNB ASA',
        sistEndret: '2006-03-15T00:00:00' as LocalDateTime,
        sistEndretAv: '1010800 BD03',

        bankkode: null,
        swift: 'DNBANOKKXXX',
        landkode: null,
        adresse: {
            linje1: 'Bankveien 1,',
            linje2: '0357 Bankestad',
            linje3: null
        },
        valuta: {
            kode: 'NOK',
            beskrivelse: 'Norske kroner'
        }
    },
    forelderBarnRelasjon: barnAremark
};
