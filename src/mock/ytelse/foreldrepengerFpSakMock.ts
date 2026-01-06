import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import navfaker from 'nav-faker/dist/index';
import { type ForeldrepengerFpSak, ForeldrepengerFpSakYtelse } from 'src/generated/modiapersonoversikt-api';
import {
    statiskEngangstonadFpSakMock,
    statiskForeldrepengerFpSakMock,
    statiskSvangerskapspengerFpSakMock
} from 'src/mock/ytelse/statiskForeldrepengerFpSakMock';
import { backendDatoformat } from 'src/utils/date-utils';
import { aremark } from '../persondata/aremark';
import { fyllRandomListe } from '../utils/mock-utils';

export function getMockForeldrepengerFpSakResponse(fnr: string): ForeldrepengerFpSak[] {
    if (fnr === aremark.personIdent) {
        return [statiskForeldrepengerFpSakMock, statiskSvangerskapspengerFpSakMock, statiskEngangstonadFpSakMock];
    }
    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}foreldrepengerFpSak`);

    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return fyllRandomListe<ForeldrepengerFpSak>(() => getMockForeldrepengerFpSak(fnr), 3);
}

function getMockForeldrepengerFpSak(fnr: string): ForeldrepengerFpSak {
    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}foreldrepengerFpSak`);

    const fomDato = dayjs(faker.date.past({ years: 2 })).format(backendDatoformat);
    const tomDatoForstePeriode = dayjs(fomDato).add(faker.number.int(40), 'days').format(backendDatoformat);

    const fomDatoAndrePeriode = dayjs(tomDatoForstePeriode).add(faker.number.int(40), 'days').format(backendDatoformat);
    const tomDato = dayjs(fomDatoAndrePeriode).add(faker.number.int(40), 'days').format(backendDatoformat);

    const ytelseType = navfaker.random.arrayElement([
        ForeldrepengerFpSakYtelse.FORELDREPENGER,
        ForeldrepengerFpSakYtelse.ENGANGSST_NAD,
        ForeldrepengerFpSakYtelse.SVANGERSKAPSPENGER
    ]);

    return {
        ytelse: ytelseType,
        fom: fomDato,
        tom: tomDato,
        perioder: [
            {
                fom: fomDatoAndrePeriode,
                tom: tomDato,
                grad: 100
            },
            {
                fom: fomDato,
                tom: tomDatoForstePeriode,
                grad: 100
            }
        ],
        saksnummer: '2023123456'
    };
}
