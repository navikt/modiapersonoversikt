import { Diskresjonskoder, TilrettelagtKommunikasjonsTyper } from '../../konstanter';
import { BostatusTyper, Kjønn, Person, Relasjonstype, SivilstandTyper } from '../../models/person/person';
import { SikkerhetstiltakTyper } from '../../models/sikkerhetstiltak';
import { Personadresse } from '../../models/personadresse';

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
    kjønn: Kjønn.Mann,
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
            kodeRef: 'TOHJ',
            beskrivelse: TilrettelagtKommunikasjonsTyper.TOHJ
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
    }
};
