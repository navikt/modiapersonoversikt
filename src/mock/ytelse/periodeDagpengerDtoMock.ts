import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import navfaker from 'nav-faker/dist/index';
import { type PeriodeDagpengerDto, PeriodeDagpengerDtoYtelseType } from 'src/generated/modiapersonoversikt-api';
import { statiskPeriodeDagpengerDtoMock } from 'src/mock/ytelse/statiskPeriodeDagpengerDtoMock';
import { backendDatoformat } from 'src/utils/date-utils';
import { aremark } from '../persondata/aremark';
import { fyllRandomListe } from '../utils/mock-utils';

export function getMockPeriodeDagpengerDtoResponse(fnr: string): PeriodeDagpengerDto[] {
    if (fnr === aremark.personIdent) {
        return [statiskPeriodeDagpengerDtoMock];
    }
    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}xyzzy`);
    if (navfaker.random.vektetSjanse(0.3)) {
        return []; // why?
    }
    return fyllRandomListe<PeriodeDagpengerDto>(() => getMockPeriodeDagpengerDto(fnr), 3);
}

function getMockPeriodeDagpengerDto(fnr: string): PeriodeDagpengerDto {
    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}xyzzy`); // why are we seeding these once more?

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
