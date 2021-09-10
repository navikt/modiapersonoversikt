import { DeltBosted } from '../../models/personPdl/deltBosted';

export function getDeltBostedMock(faker: Faker.FakerStatic): DeltBosted[] {
    return [
        {
            startdatoForKontrakt: new Date(faker.date.past(1)),
            sluttdatoForKontrakt: new Date(faker.date.future(2)),
            adresse: {
                linje1: `${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.zipCode('####')}`,
                linje2: null,
                linje3: null
            }
        }
    ];
}
