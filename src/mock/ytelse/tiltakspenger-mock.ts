import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';

import navfaker from 'nav-faker/dist/index';
import {
    VedtakPerioderResponseInnerKilde,
    VedtakPerioderResponseInnerRettighet
} from 'src/generated/modiapersonoversikt-api';
import type { Tiltakspenger, TiltakspengerResource } from '../../models/ytelse/tiltakspenger';
import { backendDatoformat } from '../../utils/date-utils';
import { aremark } from '../persondata/aremark';
import { fyllRandomListe } from '../utils/mock-utils';
import { statiskTiltakspengerMock } from './statiskTiltakspengerMock';

export function getMockTiltakspenger(fødselsnummer: string): TiltakspengerResource {
    if (fødselsnummer === aremark.personIdent) {
        return [statiskTiltakspengerMock];
    }

    faker.seed(Number(fødselsnummer));
    navfaker.seed(`${fødselsnummer}tiltakspenger`);

    if (navfaker.random.vektetSjanse(0.3)) {
        return null;
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
            ? VedtakPerioderResponseInnerKilde.ARENA
            : VedtakPerioderResponseInnerKilde.TPSAK,
        vedtakId: faker.string.alphanumeric(8),
        rettighet: VedtakPerioderResponseInnerRettighet.TILTAKSPENGER,
        periode: {
            fraOgMed: fom,
            tilOgMed: tom
        },
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
