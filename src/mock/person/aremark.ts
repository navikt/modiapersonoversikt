import { Diskresjonskoder, TilrettelagtKommunikasjonsTyper } from '../../konstanter';
import { Kjønn, Person, SivilstandTyper } from '../../models/person/person';

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
            behovKode: TilrettelagtKommunikasjonsTyper.TOHJ.toString(),
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
    familierelasjoner: []
};