import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import navfaker from 'nav-faker';
import type {
    AnsattEnhet,
    Dagpenger,
    DetaljertOppfolging,
    Oppfolging,
    OppfolgingsVedtak,
    OppfolgingsYtelse,
    Saksbehandler,
    SyfoPunkt
} from '../models/oppfolging';
import { backendDatoformat } from '../utils/date-utils';
import { fyllRandomListe } from './utils/mock-utils';

export function getMockOppfolging(fodselsnummer: string): Oppfolging {
    faker.seed(Number(fodselsnummer));
    const erUnderOppfolging = faker.datatype.boolean();

    return {
        erUnderOppfolging: erUnderOppfolging,
        veileder: erUnderOppfolging ? getSaksbehandler() : null,
        enhet: erUnderOppfolging ? getAnsattEnhet() : null
    };
}

function getSaksbehandler(): Saksbehandler {
    return {
        ident: 'Z0000001',
        navn: 'Testident Testidentesen'
    };
}

function getAnsattEnhet(): AnsattEnhet {
    return {
        enhetId: 'E0001',
        navn: faker.company.name(),
        status: 'ESTAT'
    };
}

export function getMockYtelserOgKontrakter(fodselsnummer: string): DetaljertOppfolging {
    faker.seed(Number(fodselsnummer));
    navfaker.seed(`${fodselsnummer}oppf`);

    return {
        oppfolging: getMockOppfolging(fodselsnummer),
        meldeplikt: faker.datatype.boolean(),
        formidlingsgruppe: `FMGRP${faker.number.int(5)}`,
        innsatsgruppe: `INGRP${faker.number.int(10)}`,
        sykemeldtFra: dayjs(faker.date.recent({ days: 10 })).format(backendDatoformat),
        rettighetsgruppe: `RGRP${faker.number.int(10)}`,
        vedtaksdato: dayjs(faker.date.recent({ days: 10 })).format(backendDatoformat),
        sykefravaersoppfolging: fyllRandomListe(getSyfoPunkt, 5),
        ytelser: fyllRandomListe(() => faker.helpers.arrayElement([getYtelse(), getDagpenger()]), 4)
    };
}

function getSyfoPunkt(): SyfoPunkt {
    return {
        dato: dayjs(faker.date.recent({ days: 100 })).format(backendDatoformat),
        fastOppfolgingspunkt: faker.datatype.boolean(),
        status: 'Ferdig behandlet',
        syfoHendelse: faker.lorem.words(6)
    };
}

function getYtelse(): OppfolgingsYtelse {
    return {
        datoKravMottatt: dayjs(faker.date.recent({ days: 30 })).format(backendDatoformat),
        fom: dayjs(faker.date.recent({ days: 20 })).format(backendDatoformat),
        tom: dayjs(faker.date.recent({ days: 10 })).format(backendDatoformat),
        status: faker.helpers.arrayElement(['Aktiv', 'Avsluttet', 'Inaktiv', 'Lukket']),
        type: faker.helpers.arrayElement(['Arbeidsavklaringspenger', 'Individstønad']),
        vedtak: Array(navfaker.random.integer(5, 1))
            .fill(null)
            .map(() => getVedtak()),
        dagerIgjenMedBortfall: navfaker.random.integer(100, 0),
        ukerIgjenMedBortfall: navfaker.random.integer(10, 0)
    };
}

function getDagpenger(): Dagpenger {
    return {
        ...getYtelse(),
        type: 'Dagpenger',
        dagerIgjen: faker.number.int(30),
        ukerIgjen: faker.number.int(10),
        dagerIgjenPermittering: 0,
        ukerIgjenPermittering: 0
    };
}

function getVedtak(): OppfolgingsVedtak {
    return {
        aktivFra: dayjs(faker.date.recent({ days: 40 })).format(backendDatoformat),
        aktivTil: dayjs(faker.date.recent({ days: 20 })).format(backendDatoformat),
        aktivitetsfase: 'Ikke spesif. aktivitetsfase',
        vedtakstatus: faker.helpers.arrayElement(['Iverksatt', 'Avsluttet']),
        vedtakstype: 'Ordinære dagpenger'
    };
}
