import { faker } from '@faker-js/faker';
import { Locale, type Tekster } from 'src/app/personside/dialogpanel/sendMelding/standardTekster/domain';

const randUUID = faker.string.uuid();

export const skrivestotteMock: Tekster = {
    [randUUID]: {
        id: randUUID,
        overskrift: faker.word.sample(),
        tags: ['eksempel'],
        innhold: {
            [Locale.nb_NO]: faker.lorem.paragraph()
        },
        vekttall: faker.number.int({ min: 0, max: 5 })
    }
};
