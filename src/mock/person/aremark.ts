import { Diskresjonskoder } from '../../constants';
import { Person } from '../../models/person';

export const aremark: Person = {
    fødselsnummer: '10108000398',
    kjønn: 'M',
    geografiskTilknytning: '0118',
    alder: 42,
    navn: {
        sammensatt: 'AREMARK TESTFAMILIEN',
        fornavn: 'AREMARK',
        mellomnavn: '',
        etternavn: 'TESTFAMILIEN',
    },
    diskresjonskode: Diskresjonskoder.FORTROLIG_ADRESSE,
    statsborgerskap: 'NORSK',
    status: {
        dødsdato: undefined,
        bostatus: undefined
    },
    sivilstand: {
        value: 'GIFT',
        beskrivelse: 'Gift'
    },
    familierelasjoner: []
};