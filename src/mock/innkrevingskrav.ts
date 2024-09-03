import faker from 'faker/locale/nb_NO';
import { fyllRandomListe } from './utils/mock-utils';
import { Innkrevingskrav } from '../app/innkrevingskrav/Innkrevingskrav';
import dayjs from 'dayjs';
import { backendDatoformat } from '../utils/date-utils';
import navfaker from 'nav-faker';

export const mockInnkrevingsKrav = (kravId: string): Innkrevingskrav => {
    const seedNr = kravId
        .split('')
        .map((c) => c.charCodeAt(0))
        .reduce((s, c) => s + c, 0);
    faker.seed(seedNr);
    navfaker.seed(kravId);

    return {
        kravgrunnlag: {
            datoNaarKravVarBesluttetHosOppdragsgiver: dayjs(faker.date.past(1)).format(backendDatoformat)
        },
        krav: fyllRandomListe<Innkrevingskrav['krav'][0]>(getMockKravLinje, 4)
    };
};

const getMockKravLinje = () => {
    return {
        kravType: navfaker.random.arrayElement(['kravLinje', 'renter']),
        opprinneligBeløp: Number(faker.commerce.price()),
        gjenståendeBeløp: Number(faker.commerce.price())
    };
};
