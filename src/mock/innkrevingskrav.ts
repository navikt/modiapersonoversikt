import { fakerNB_NO as faker } from '@faker-js/faker';
import type { paths } from 'src/generated/modiapersonoversikt-api';
import { fyllRandomListe } from './utils/mock-utils';

type Innkrevingskrav = paths['/rest/innkrevingskrav/{innkrevingskravId}']['get']['responses']['200']['content']['*/*'];

export const mockInnkrevingsKrav = (kravId: string): Innkrevingskrav => {
    const seedNr = kravId
        .split('')
        .map((c) => c.charCodeAt(0))
        .reduce((s, c) => s + c, 0);
    faker.seed(seedNr);

    return {
        kravId,
        kravType: 'kravtype',
        kid: 'KID123455132',
        opprettetDato: faker.date.past().toUTCString(),
        posteringer: fyllRandomListe<Innkrevingskrav['posteringer'][0]>(getMockKravLinje, 4),
        kreditor: {
            kreditorId: '12342341234',
            name: 'Kreditor Kretitorsen',
            ident: '1234234234',
            identType: 'FNR'
        },
        debitor: {
            debitorId: '2341234',
            name: 'Debitor Debitorsen',
            ident: '1234234234',
            identType: 'ORG_NR'
        }
    };
};

const getMockKravLinje = (): Innkrevingskrav['posteringer'][0] => {
    faker.seed();
    return {
        kode: faker.lorem.words({ min: 1, max: 5 }),
        beskrivelse: faker.helpers.arrayElement(['kravLinje', 'renter']),
        opprinneligBelop: Number(faker.commerce.price()),
        gjenstaendeBelop: Number(faker.commerce.price()),
        betaltBelop: Number(faker.commerce.price()),
        opprettetDato: faker.date.past().toUTCString()
    };
};
