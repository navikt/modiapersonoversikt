import NavFaker from 'nav-faker/dist/navfaker';
import { LocalDateTimeType, OptionalJodaDateTimeType } from '../../utils/localDateTimeUtils';
import { Baksystem } from '../../models/saksoversikt/fellesEnum';
import { vektetSjanse } from '../utils/mock-utils';
import FakerStatic = Faker.FakerStatic;

export function getLocalDateTime(navfaker: NavFaker): LocalDateTimeType {
    return {
        year: navfaker.random.integer(2018, 2016),
        monthValue: navfaker.random.integer(12, 1),
        dayOfMonth: navfaker.random.integer(28, 1),
        hour: navfaker.random.integer(23, 1),
        minute: navfaker.random.integer(59, 1),
        second: navfaker.random.integer(59, 1)
    };
}

export function getOptionalJodaDateTime(faker: FakerStatic, navfaker: NavFaker): OptionalJodaDateTimeType {
    if (vektetSjanse(faker, 0.4)) {
        return {
            present: false
        };
    }

    return {
        year: navfaker.random.integer(2018, 2016),
        monthOfYear: navfaker.random.integer(12, 1),
        dayOfMonth: navfaker.random.integer(28, 1),
        hourOfDay: navfaker.random.integer(23, 1),
        minuteOfHour: navfaker.random.integer(59, 1),
        secondOfMinute: navfaker.random.integer(59, 1)
    };
}

export function getBaksystem(faker: FakerStatic): Baksystem {
    if (vektetSjanse(faker, 0.1)) {
        return Baksystem.Aktoer;
    } else if (vektetSjanse(faker, 0.1)) {
        return Baksystem.Gsak;
    } else if (vektetSjanse(faker, 0.1)) {
        return Baksystem.Henvendelse;
    } else if (vektetSjanse(faker, 0.1)) {
        return Baksystem.Joark;
    } else if (vektetSjanse(faker, 0.1)) {
        return Baksystem.JoarkSikkerhetsbegrensning;
    } else if (vektetSjanse(faker, 0.1)) {
        return Baksystem.Kodeverk;
    } else if (vektetSjanse(faker, 0.1)) {
        return Baksystem.PdfKonvertering;
    } else if (vektetSjanse(faker, 0.1)) {
        return Baksystem.Pesys;
    } else {
        return Baksystem.SakOgBehandling;
    }
}