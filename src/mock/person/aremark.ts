import { BostatusTyper, Kjonn, Person, Relasjonstype, SivilstandTyper } from '../../models/person/person';
import { SikkerhetstiltakTyper } from '../../models/sikkerhetstiltak';
import { Personadresse } from '../../models/personadresse';
import { TilrettelagtKommunikasjonType } from '../../models/kodeverk';
import { Diskresjonskoder } from '../../app/personside/visittkort/body/familie/common/Diskresjonskode';

export const gateAdresseAremark: Personadresse = {
    endringsinfo: {
        sistEndret: '2017-11-25T21:29:14.049Z',
        sistEndretAv: 'SKD'
    },
    gateadresse: {
        gatenavn: 'Islandsgate',
        husnummer: '49',
        postnummer: '7693',
        poststed: 'Hovedøya'
    }
};

export const postboksAdresseAremark: Personadresse = {
    endringsinfo: {
        sistEndret: '2018-04-10T09:06:58.256Z',
        sistEndretAv: 'SKD'
    },
    postboksadresse: {
        postboksnummer: '9698',
        postnummer: '7705',
        poststed: 'Færder fyr'
    }
};

export const matrikkelAdresseAremark: Personadresse = {
    endringsinfo: {
        sistEndret: '2018-04-10T09:06:58.256Z',
        sistEndretAv: 'SKD'
    },
    matrikkeladresse: {
        postnummer: '5468',
        poststed: 'Lillomarka'
    }
};

export const utlandsAdresseAremark: Personadresse = {
    endringsinfo: {
        sistEndret: '2018-04-10T09:06:58.256Z',
        sistEndretAv: 'SKD'
    },
    utlandsadresse: {
        landkode: {
            kodeRef: 'SYD',
            beskrivelse: 'Syden'
        },
        adresselinjer: ['Ut av landet', 'Rundt svingen']
    }
};

export const aremark: Person = {
    fødselsnummer: '10108000398',
    kjønn: Kjonn.Mann,
    geografiskTilknytning: '0118',
    alder: 42,
    folkeregistrertAdresse: gateAdresseAremark,
    alternativAdresse: postboksAdresseAremark,
    bankkonto: {
        banknavn: 'Bien sparebank',
        kontonummer: '12345678911',
        sistEndret: '2005-12-12',
        sistEndretAv: 'z9910',
        landkode: {
            kodeRef: 'NOR',
            beskrivelse: 'Norge'
        },
        valuta: {
            beskrivelse: 'Spesidaler',
            kodeRef: 'SPD'
        }
    },
    sikkerhetstiltak: {
        sikkerhetstiltaksbeskrivelse:
            'Får verken møte opp på NAV-kontor eller ringe på telefon grunnet truende oppførsel og språk.',
        sikkerhetstiltakskode: SikkerhetstiltakTyper.FysiskOgTelefonUtestengelse,
        periode: {
            fra: '2005-12-12',
            til: '2025-12-12'
        }
    },
    navn: {
        endringsinfo: {
            sistEndret: '2012-12-12',
            sistEndretAv: 'NAV'
        },
        sammensatt: 'AREMARK TESTFAMILIEN',
        fornavn: 'AREMARK',
        mellomnavn: '',
        etternavn: 'TESTFAMILIEN'
    },
    tilrettelagtKomunikasjonsListe: [
        {
            type: TilrettelagtKommunikasjonType.TALESPRAK,
            kodeRef: 'SV',
            beskrivelse: 'Svensk'
        },
        {
            type: TilrettelagtKommunikasjonType.TEGNSPRAK,
            kodeRef: 'NO',
            beskrivelse: 'Norwegian'
        }
    ],
    diskresjonskode: { kodeRef: Diskresjonskoder.FORTROLIG_ADRESSE, beskrivelse: 'Sperret adresse, fortrolig' },
    statsborgerskap: { kodeRef: 'NOR', beskrivelse: 'NORGE' },
    personstatus: {
        dødsdato: undefined,
        bostatus: {
            kodeRef: BostatusTyper.Utvandret,
            beskrivelse: BostatusTyper.Utvandret
        }
    },
    sivilstand: {
        kodeRef: SivilstandTyper.Gift,
        beskrivelse: 'Gift',
        fraOgMed: '2005-12-12'
    },
    familierelasjoner: [
        {
            rolle: Relasjonstype.Barn,
            tilPerson: {
                navn: null,
                diskresjonskode: {
                    kodeRef: Diskresjonskoder.FORTROLIG_ADRESSE,
                    beskrivelse: 'Sperret adresse, fortrolig'
                },
                personstatus: {}
            }
        },
        {
            rolle: Relasjonstype.Barn,
            tilPerson: {
                navn: null,
                diskresjonskode: {
                    kodeRef: Diskresjonskoder.STRENGT_FORTROLIG_ADRESSE,
                    beskrivelse: 'Sperret adresse, strengt fortrolig'
                },
                personstatus: {}
            }
        },
        {
            harSammeBosted: false,
            rolle: Relasjonstype.Barn,
            tilPerson: {
                fødselsnummer: '10011100001',
                navn: {
                    fornavn: '',
                    etternavn: '',
                    mellomnavn: '',
                    sammensatt: 'NAVN'
                },
                personstatus: {
                    dødsdato: '2011-01-01T00:00:00.000',
                    bostatus: {
                        kodeRef: 'DØD',
                        beskrivelse: 'Død'
                    }
                }
            }
        },
        {
            harSammeBosted: true,
            rolle: Relasjonstype.Barn,
            tilPerson: {
                fødselsnummer: '10117100000',
                navn: {
                    sammensatt: 'Siri Bellomnavn Aremark',
                    fornavn: 'Siri',
                    mellomnavn: 'Bellomnavn',
                    etternavn: 'Aremark'
                },
                personstatus: {},
                alder: 15
            }
        },
        {
            harSammeBosted: false,
            rolle: Relasjonstype.Barn,
            tilPerson: {
                fødselsnummer: '10117100100',
                navn: {
                    sammensatt: 'Ola Ballomnavn Aremark',
                    fornavn: 'Ola',
                    mellomnavn: 'Ballomnavn',
                    etternavn: 'Aremark'
                },
                personstatus: {},
                alderMåneder: 5
            }
        },
        {
            harSammeBosted: false,
            rolle: Relasjonstype.Ektefelle,
            tilPerson: {
                navn: null,
                diskresjonskode: {
                    kodeRef: Diskresjonskoder.STRENGT_FORTROLIG_ADRESSE,
                    beskrivelse: 'Sperret adresse, strengt fortrolig'
                },
                personstatus: {}
            }
        }
    ],
    kontaktinformasjon: {
        mobil: {
            sistEndret: '2014-06-21T18:44:39+02:00',
            identifikator: '99887766',
            retningsnummer: { kodeRef: '+47', beskrivelse: 'Norge' },
            sistEndretAv: '10108000398'
        }
    },
    fullmakt: [
        {
            motpartsRolle: 'FULLMEKTIG',
            motpartsPersonident: '12345678',
            motpartsPersonNavn: 'Navn Navensen',
            omraade: ['*'],
            gyldigFraOgMed: '2019-01-01',
            gyldigTilOgMed: '2022-12-12'
        }
    ],
    telefonnummer: [
        {
            identifikator: '99887766',
            sistEndret: '2014-06-21T18:44:39+02:00',
            sistEndretAv: '10108000398',
            retningsnummer: { kodeRef: '+47', beskrivelse: 'Altmulig rart' }
        },
        {
            identifikator: '99887767',
            sistEndret: '2014-05-21T18:44:39+02:00',
            sistEndretAv: 'Z123456',
            retningsnummer: null
        }
    ],
    vergemal: [
        {
            ident: '12076918951',
            embete: 'Fylkesmannen i Troms og Finnmark',
            gyldighetstidspunkt: '2021-02-15T00:00:00',
            navn: {
                fornavn: 'LUNKEN',
                mellomnavn: null,
                etternavn: 'KOPP',
                sammensatt: 'LUNKEN KOPP'
            },
            omfang: 'personligeOgOekonomiskeInteresser',
            opphoerstidspunkt: null,
            vergesakstype: 'voksen'
        }
    ],
    foreldreansvar: [
        {
            ansvar: 'felles',
            ansvarlig: {
                fornavn: 'Ola',
                etternavn: 'Normann',
                mellomnavn: '',
                sammensatt: 'Ola Normann'
            },
            ansvarssubjekt: {
                fornavn: 'Pål',
                etternavn: 'Askeladden',
                mellomnavn: '',
                sammensatt: 'Pål Askeladden'
            }
        },
        {
            ansvar: 'far',
            ansvarlig: {
                fornavn: 'Petter',
                etternavn: 'Pettersen',
                mellomnavn: '',
                sammensatt: 'Petter Pettersen'
            },
            ansvarssubjekt: undefined
        }
    ],
    deltBosted: [
        {
            startdatoForKontrakt: '2020-12-12',
            sluttdatoForKontrakt: '2023-12-12',
            adresse: {
                adressenavn: 'Adresseveien',
                husnummer: '1',
                husbokstav: undefined,
                bruksenhetsnummer: 'H0201',
                kommunenummer: '0301',
                postnummer: '0661',
                poststed: 'AREMARKSTAD',
                bydelsnummer: '1',
                tilleggsnavn: undefined,
                coAdressenavn: undefined
            },
            ukjentBosted: undefined
        }
    ]
};
