import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import navfaker from 'nav-faker/dist/index';
import {
    type PeriodeDagpengerDto,
    PeriodeDagpengerDtoYtelseType,
    type PseudoDagpengerVedtak
} from 'src/generated/modiapersonoversikt-api';
import { statiskPeriodeDagpengerDtoMock } from 'src/mock/ytelse/statiskPeriodeDagpengerDtoMock';
import { backendDatoformat } from 'src/utils/date-utils';
import { aremark } from '../persondata/aremark';
import { fyllRandomListe } from '../utils/mock-utils';

export function getMockDagpengerResponse(fnr: string): PseudoDagpengerVedtak {
    if (fnr === aremark.personIdent) {
        const statisk = statiskPeriodeDagpengerDtoMock;
        const først = statiskPeriodeDagpengerDtoMock.fraOgMedDato;
        return {
            perioder: [statisk, statisk],
            nyesteFraOgMedDato: først
        };
    }
    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}xyzzy`);
    // sometimes we want an empty list
    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }
    const perioder = fyllRandomListe<PeriodeDagpengerDto>(() => getMockPeriodeDagpengerDto(fnr), 3);
    const først = perioder[0].fraOgMedDato;
    return {
        perioder: perioder,
        nyesteFraOgMedDato: først
    };
}

function getMockPeriodeDagpengerDto(fnr: string): PeriodeDagpengerDto {
    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}xyzzy`); // seed again for predictability

    const fomDato = dayjs(faker.date.past({ years: 2 })).format(backendDatoformat);
    const tomDato = dayjs(fomDato).add(faker.number.int(40), 'days').format(backendDatoformat);

    const ytelseType = navfaker.random.arrayElement([
        PeriodeDagpengerDtoYtelseType.DAGPENGER_ARBEIDSSOKER_ORDINAER,
        PeriodeDagpengerDtoYtelseType.DAGPENGER_PERMITTERING_ORDINAER,
        PeriodeDagpengerDtoYtelseType.DAGPENGER_PERMITTERING_FISKEINDUSTRI
    ]);

    return {
        fraOgMedDato: fomDato,
        ytelseType: ytelseType,
        tilOgMedDato: tomDato
    };
}
