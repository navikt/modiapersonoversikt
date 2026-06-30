import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';

import navfaker from 'nav-faker/dist/index';
import {
    HentVedtaksperioder200ResponseInnerKilde,
    HentVedtaksperioder200ResponseInnerRettighet
} from 'src/generated/modiapersonoversikt-api';
import type { Tiltakspenger } from 'src/models/ytelse/tiltakspenger';
import { backendDatoformat } from 'src/utils/date-utils';
import { aremark } from '../persondata/aremark';
import { fyllRandomListe } from '../utils/mock-utils';
import { statiskTiltakspengerMock } from './statiskTiltakspengerMock';

export function getMockTiltakspenger(fødselsnummer: string): Tiltakspenger[] {
    if (fødselsnummer === aremark.personIdent) {
        return [statiskTiltakspengerMock];
    }

    faker.seed(Number(fødselsnummer));
    navfaker.seed(`${fødselsnummer}tiltakspenger`);

    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return fyllRandomListe<Tiltakspenger>((i) => getMockTiltakspengerYtelser(fødselsnummer, i), 3);
}

function getMockTiltakspengerYtelser(fødselsnummer: string, i?: number): Tiltakspenger {
    faker.seed(Number(fødselsnummer) + (i ?? 0));
    navfaker.seed(`${fødselsnummer}pleiepenger${i}`);

    const fom = dayjs(faker.date.past({ years: 2 })).format(backendDatoformat);
    const tom = dayjs(fom).add(faker.number.int(40), 'days').format(backendDatoformat);

    return {
        kilde: navfaker.random.vektetSjanse(0.4)
            ? HentVedtaksperioder200ResponseInnerKilde.ARENA
            : HentVedtaksperioder200ResponseInnerKilde.TPSAK,
        vedtakId: faker.string.alphanumeric(8),
        rettighet: HentVedtaksperioder200ResponseInnerRettighet.TILTAKSPENGER,
        vedtaksperiode: {
            fraOgMed: fom,
            tilOgMed: tom
        },
        periode: {
            fraOgMed: fom,
            tilOgMed: tom
        },
        innvilgelsesperioder: [],
        barnetillegg: navfaker.random.vektetSjanse(0.5)
            ? { perioder: fyllRandomListe(mockBarnetillegg, 3, false) }
            : undefined
    };
}

const mockBarnetillegg = (): NonNullable<NonNullable<Tiltakspenger['barnetillegg']>['perioder']>[number] => {
    const fraOgMed = dayjs(faker.date.past({ years: 2 })).format(backendDatoformat);
    const tilOgMed = dayjs(fraOgMed).add(faker.number.int(40), 'days').format(backendDatoformat);

    return {
        antallBarn: navfaker.random.integer(3, 1),
        periode: {
            fraOgMed,
            tilOgMed
        }
    };
};
