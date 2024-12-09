import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';

import navfaker from 'nav-faker/dist/index';
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
    navfaker.seed(fødselsnummer + 'tiltakspenger');

    if (navfaker.random.vektetSjanse(0.3)) {
        return null;
    }

    return fyllRandomListe<Tiltakspenger>(() => getMockTiltakspengerYtelser(fødselsnummer), 3);
}

export function getMockTiltakspengerYtelser(fødselsnummer: string): Tiltakspenger {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'pleiepenger');

    const fom = dayjs(faker.date.past({ years: 2 })).format(backendDatoformat);
    const tom = dayjs(fom).add(faker.number.int(40), 'days').format(backendDatoformat);

    const barneTillegg: Partial<Tiltakspenger> = { antallBarn: undefined };
    if (navfaker.random.vektetSjanse(0.8)) {
        barneTillegg.antallBarn = navfaker.random.integer(3, 1);
        barneTillegg.dagsatsBarnetillegg = navfaker.random.integer(300);
    }

    return {
        vedtakId: faker.string.alphanumeric(8),
        relaterteTiltak: faker.string.alphanumeric(8),
        rettighet: 'TILTAKSPENGER',
        fom,
        tom,
        dagsatsTiltakspenger: navfaker.random.integer(500),
        antallDager: navfaker.random.integer(20),
        ...barneTillegg
    };
}
