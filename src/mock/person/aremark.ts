import { Diskresjonskoder, TilrettelagtKommunikasjonsTyper } from '../../konstanter';
import { Kjønn, Person, Relasjonstype, SivilstandTyper } from '../../models/person/person';

export const aremark: Person = {
    fødselsnummer: '10108000398',
    kjønn: Kjønn.Mann,
    geografiskTilknytning: '0118',
    alder: 42,
    navn: {
        sammensatt: 'AREMARK TESTFAMILIEN',
        fornavn: 'AREMARK',
        mellomnavn: '',
        etternavn: 'TESTFAMILIEN',
    },
    tilrettelagtKomunikasjonsListe: [
        {
            behovKode: 'TOHJ',
            beskrivelse: TilrettelagtKommunikasjonsTyper.TOHJ
        }
    ],
    diskresjonskode: Diskresjonskoder.FORTROLIG_ADRESSE,
    statsborgerskap: 'NORSK',
    personstatus: {
        dødsdato: undefined,
        bostatus: undefined
    },
    sivilstand: {
        value: SivilstandTyper.Gift,
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
            fødselsnummer: '10117100000',
            personstatus: {}
        }

    }],
    kontaktinformasjon: {
        mobil: {
            sistEndret: '2014-06-21T18:44:39+02:00',
            telefonnummer: '99887766',
            retningsnummer: '47',
            sistEndretAv: 'BRUKER'
        }
    }
};