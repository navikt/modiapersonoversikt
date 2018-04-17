import { Kodeverk } from '../../models/kodeverk';
import FakerStatic = Faker.FakerStatic;
import { vektetSjanse } from '../utils/mock-utils';

const ugift = {
    value: 'UGIF',
    beskrivelse: 'Ugift'
};

export function getSivilstand(alder: number, faker: FakerStatic): Kodeverk {
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