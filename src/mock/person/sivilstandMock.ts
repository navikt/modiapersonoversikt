import * as moment from 'moment';
import { Moment } from 'moment';

import { vektetSjanse } from '../utils/mock-utils';
import { Sivilstand, SivilstandTyper } from '../../models/person';
import FakerStatic = Faker.FakerStatic;

const ugift = (alder: number, faker: FakerStatic) => {
    return {
        value: SivilstandTyper.Ugift,
        beskrivelse: 'Ugift',
        fraOgMed: getSistOppdatert(alder, faker)
    };
};

const gift = (alder: number, faker: FakerStatic) => {
    return {
        value: SivilstandTyper.Gift,
        beskrivelse: 'Gift',
        fraOgMed: getSistOppdatert(alder, faker)
    };
};

const skilt = (alder: number, faker: FakerStatic) => {
    return {
        value: SivilstandTyper.Skilt,
        beskrivelse: 'Skilt',
        fraOgMed: getSistOppdatert(alder, faker)
    };
};

const samboer = (alder: number, faker: FakerStatic) => {
    return {
        value: SivilstandTyper.Samboer,
        beskrivelse: 'Samboer',
        fraOgMed: getSistOppdatert(alder, faker)
    };
};

const enke = (alder: number, faker: FakerStatic) => {
    return {
        value: SivilstandTyper.Enke,
        beskrivelse: 'Enke',
        fraOgMed: getSistOppdatert(alder, faker)
    };
};

export function getSivilstand(fødselsdato: Moment, faker: FakerStatic): Sivilstand {
    const alder = moment().diff(fødselsdato, 'years');

    if (alder < 18) {
        return ugift(alder, faker);
    }
    return getTilfeldigSilvstand(faker, alder);
}

function getTilfeldigSilvstand(faker: FakerStatic, alder: number) {
    if (vektetSjanse(faker, 0.2)) {
        return gift(alder, faker);
    } else if (vektetSjanse(faker, 0.2)) {
        return skilt(alder, faker);
    } else if (vektetSjanse(faker, 0.2)) {
        return ugift(alder, faker);
    } else if (vektetSjanse(faker, 0.2)) {
        return samboer(alder, faker);
    } else {
        return enke(alder, faker);
    }
}

function getSistOppdatert(alder: number, faker: FakerStatic) {
    const maxYearsAgo = alder - 18;
    return moment(faker.date.past(maxYearsAgo)).format('YYYY-MM-DD');
}