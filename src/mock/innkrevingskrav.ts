import { fakerNB_NO as faker } from '@faker-js/faker';
import { fyllRandomListe } from './utils/mock-utils';
import { Innkrevingskrav } from '../app/innkrevingskrav/Innkrevingskrav';
import dayjs from 'dayjs';
import { backendDatoformat } from '../utils/date-utils';

export const mockInnkrevingsKrav = (kravId: string): Innkrevingskrav => {
    const seedNr = kravId
        .split('')
        .map((c) => c.charCodeAt(0))
        .reduce((s, c) => s + c, 0);
    faker.seed(seedNr);

    return {
        kravgrunnlag: {
            datoNaarKravVarBesluttetHosOppdragsgiver: dayjs(faker.date.past({ years: 1 })).format(backendDatoformat)
        },
        krav: fyllRandomListe<Innkrevingskrav['krav'][0]>(getMockKravLinje, 4)
    };
};

const getMockKravLinje = () => {
    return {
        kravType: faker.helpers.arrayElement(['kravLinje', 'renter']),
        opprinneligBeløp: Number(faker.commerce.price()),
        gjenståendeBeløp: Number(faker.commerce.price())
    };
};
