import { Diskresjonskoder, TilrettelagtKommunikasjonsTyper } from '../../konstanter';
import { Kjønn, Person, Relasjonstype, SivilstandTyper } from '../../models/person/person';
import { SikkerhetstiltakTyper } from '../../models/sikkerhetstiltak';

export const aremark: Person = {
    fødselsnummer: '10108000398',
    kjønn: Kjønn.Mann,
    geografiskTilknytning: '0118',
    alder: 42,
    bankkonto: {
        banknavn: 'Bien sparebank',
        kontonummer: '12345678910',
        sistEndret: '2005-12-12',
        sistEndretAv: 'Daniel'
    },
    sikkerhetstiltak: {
        sikkerhetstiltaksbeskrivelse: 'Får verken møte opp på NAV-kontor eller ringe på telefon ' +
        'grunnet truende oppførsel og språk.',
        sikkerhetstiltakskode: SikkerhetstiltakTyper.FysiskOgTelefonUtestengelse,
        periode: {
            fra: '2005-12-12',
            til: '2025-12-12'
        }
    },
    navn: {
        sammensatt: 'TESTFAMILIEN AREMARK',
        fornavn: 'AREMARK',
        mellomnavn: '',
        etternavn: 'TESTFAMILIEN',
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
        bostatus: undefined
    },
    sivilstand: {
        kodeRef: SivilstandTyper.Gift,
        beskrivelse: 'Gift',
        fraOgMed: '2005-12-12'
    },
    familierelasjoner: [{
        harSammeBosted: false,
        rolle: Relasjonstype.Barn,
        tilPerson: {
            navn: {
                sammensatt: '',
                fornavn: 'Siri',
                mellomnavn: null,
                etternavn: 'Aremark'
            },
            alder: 17,
            alderMåneder: 184,
            fødselsnummer: '10117100000',
            personstatus: {}
        }

    }],
    kontaktinformasjon: {
        mobil: {
            sistEndret: '2014-06-21T18:44:39+02:00',
            identifikator: '99887766',
            retningsnummer: { kodeRef: '+47', beskrivelse: 'Norge' },
            sistEndretAv: 'BRUKER'
        }
    }
};