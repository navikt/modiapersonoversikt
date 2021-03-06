import { BostatusTyper, Kjonn, Person, Relasjonstype, SivilstandTyper } from '../../models/person/person';
import { Personadresse } from '../../models/personadresse';
import { Diskresjonskoder } from '../../app/personside/visittkort/body/familie/common/Diskresjonskode';

export const gateAdresseMoss: Personadresse = {
    endringsinfo: {
        sistEndret: '2017-11-25T21:29:14.049Z',
        sistEndretAv: 'SKD'
    },
    gateadresse: {
        gatenavn: 'Mossgata',
        husnummer: '16',
        postnummer: '5468',
        poststed: 'Jan Mayen'
    }
};

export const matrikkelAdresseMoss: Personadresse = {
    endringsinfo: {
        sistEndret: '2018-04-10T09:06:58.256Z',
        sistEndretAv: 'SKD'
    },
    matrikkeladresse: {
        postnummer: '5468',
        poststed: 'Lillomarka'
    }
};

export const utlandsAdresseMoss: Personadresse = {
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

export const moss: Person = {
    fødselsnummer: '07063000250',
    kjønn: Kjonn.Kvinne,
    geografiskTilknytning: '0001',
    alder: 10,
    folkeregistrertAdresse: gateAdresseMoss,
    alternativAdresse: utlandsAdresseMoss,
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
    sikkerhetstiltak: undefined,
    navn: {
        endringsinfo: {
            sistEndret: '2000-12-12',
            sistEndretAv: 'NAV'
        },
        sammensatt: 'MOSS TESTFAMILIEN',
        fornavn: 'MOSS',
        mellomnavn: '',
        etternavn: 'TESTFAMILIEN'
    },
    tilrettelagtKomunikasjonsListe: [],
    diskresjonskode: undefined,
    statsborgerskap: { kodeRef: 'SVA', beskrivelse: 'Svalbard' },
    personstatus: {
        dødsdato: undefined,
        bostatus: {
            kodeRef: BostatusTyper.Utvandret,
            beskrivelse: BostatusTyper.Utvandret
        }
    },
    sivilstand: {
        kodeRef: SivilstandTyper.Ugift,
        beskrivelse: 'Ugift',
        fraOgMed: '2005-12-12'
    },
    familierelasjoner: [
        {
            rolle: Relasjonstype.Far,
            tilPerson: {
                navn: {
                    fornavn: 'Aremark',
                    etternavn: 'Testfamilien',
                    sammensatt: 'Aremark Testfamilien',
                    mellomnavn: ''
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
        },
        jobbTelefon: {
            sistEndret: '2014-06-21T18:44:39+02:00',
            identifikator: '99887766',
            retningsnummer: null,
            sistEndretAv: 'Z999999'
        }
    },
    vergemal: [],
    foreldreansvar: undefined,
    deltBosted: [
        {
            startdatoForKontrakt: '2020-12-12',
            sluttdatoForKontrakt: '2023-12-12',
            adresse: undefined,
            ukjentBosted: {
                bostedskommune: 'Oslo'
            }
        }
    ]
};
