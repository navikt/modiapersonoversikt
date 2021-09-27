import FetchMock from 'yet-another-fetch-mock';
import {
    AdresseBeskyttelse,
    Data as PersonData,
    EgenAnsatt,
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
        res(ctx.json(lagPersondata(req.pathParams.fnr)))
    );
}

const erDod = false;

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
        dodsdato: erDod ? ['2018-06-07' as LocalDate] : [],
        bostedAdresse: [
            {
                linje1: 'Adressevei 1',
                linje2: '0000 AREMARK',
                linje3: 'Norge'
            }
        ],
        kontaktAdresse: [
            {
                linje1: 'Kontaktadresse 1',
                linje2: '0320 HEI',
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
                    beskrivelse: 'Norsk statsborger'
                },
                gyldigFraOgMed: '2000-02-02' as LocalDate,
                gyldigTilOgMed: '2018-06-07' as LocalDate
            }
        ],
        adressebeskyttelse: [
            {
                kode: AdresseBeskyttelse.UGRADERT,
                beskrivelse: 'Ingen'
            }
        ],
        sikkerhetstiltak: [
            {
                type: SikkerhetstiltakType.TFUS,
                gyldigFraOgMed: '2005-02-13' as LocalDate,
                gyldigTilOgMed: '2015-02-02' as LocalDate
            }
        ],
        erEgenAnsatt: EgenAnsatt.UKJENT,
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
            reservasjon: 'reservert',
            epostadresse: {
                value: null,
                sistOppdatert: null,
                sistVerifisert: '2013-01-01' as LocalDate
            },
            mobiltelefonnummer: {
                value: null,
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
        }
    };

    return { feilendeSystemer: [], person };
}
