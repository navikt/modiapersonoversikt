import { Kodeverk } from '../../models/kodeverk';
import { vektetSjanse } from '../utils';
import FakerStatic = Faker.FakerStatic;

const ugift = {
    value: 'UGIF',
    beskrivelse: 'Ugift'
};

export function getSiviltilstand(alder: number, faker: FakerStatic): Kodeverk {
    if (alder < 18) {
        return ugift;
    }
    if (vektetSjanse(faker, 0.2)) {
        return {
            value: 'GIFT',
            beskrivelse: 'Gift'
        };
    } else if (vektetSjanse(faker, 0.2)) {
        return {
            value: 'SKIL',
            beskrivelse: 'Skilt'
        };
    } else if (vektetSjanse(faker, 0.2)) {
        return ugift;
    } else if (vektetSjanse(faker, 0.2)) {
        return {
            value: 'SAMB',
            beskrivelse: 'Samboer'
        };
    } else {
        return {
            value: 'ENKE',
            beskrivelse: 'Enke/-mann'
        };
    }
}