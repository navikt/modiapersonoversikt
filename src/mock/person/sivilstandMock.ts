import * as moment from 'moment';
import FakerStatic = Faker.FakerStatic;
import { Moment } from 'moment';

import { vektetSjanse } from '../utils/mock-utils';
import { Sivilstand, SivilstandTyper } from '../../models/person';

const ugift = (fødselsdato: Moment) => {
    return {
        value: SivilstandTyper.Ugift,
        beskrivelse: 'Ugift',
        fraOgMed: fødselsdato.toDate().toDateString()
    };
};

export function getSivilstand(fødselsdato: Moment, faker: FakerStatic): Sivilstand {
    const alder = moment().diff(fødselsdato, 'years');

    if (alder < 18) {
        return ugift(fødselsdato);
    }
    if (vektetSjanse(faker, 0.2)) {
        return {
            value: SivilstandTyper.Gift,
            beskrivelse: 'Gift',
            fraOgMed: getSistOppdatert(alder, faker)
        };
    } else if (vektetSjanse(faker, 0.2)) {
        return {
            value: SivilstandTyper.Skilt,
            beskrivelse: 'Skilt',
            fraOgMed: getSistOppdatert(alder, faker)
        };
    } else if (vektetSjanse(faker, 0.2)) {
        return ugift(fødselsdato);
    } else if (vektetSjanse(faker, 0.2)) {
        return {
            value: SivilstandTyper.Samboer,
            beskrivelse: 'Samboer',
            fraOgMed: getSistOppdatert(alder, faker)
        };
    } else {
        return {
            value: SivilstandTyper.Enke,
            beskrivelse: 'Enke/-mann',
            fraOgMed: getSistOppdatert(alder, faker)
        };
    }
}

function getSistOppdatert(alder: number, faker: FakerStatic) {
    const maxYearsAgo = alder - 18;
    return moment(faker.date.past(maxYearsAgo)).format('YYYY-MM-DD');
}