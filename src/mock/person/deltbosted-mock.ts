import NavFaker from 'nav-faker/dist/navfaker';
import dayjs from 'dayjs';
import { backendDatoformat } from '../../utils/date-utils';
import { DeltBosted } from '../../models/deltBosted';
import { vektetSjanse } from '../utils/mock-utils';

export function getDeltBostedMock(faker: Faker.FakerStatic, navfaker: NavFaker): DeltBosted[] {
    return [
        {
            startdatoForKontrakt: dayjs(faker.date.past(1)).format(backendDatoformat),
            sluttdatoForKontrakt: dayjs(faker.date.future(2)).format(backendDatoformat),
            adresse: {
                adressenavn: faker.address.streetName(),
                husnummer: navfaker.random.integer(1, 50).toString(),
                husbokstav: undefined,
                bruksenhetsnummer: undefined,
                kommunenummer: '0301',
                postnummer: '0000',
                bydelsnummer: '1',
                tilleggsnavn: undefined,
                coAdressenavn: vektetSjanse(faker, 0.2) ? navfaker.navn.fornavn(1) : undefined
            },
            ukjentBosted: undefined
        }
    ];
}
