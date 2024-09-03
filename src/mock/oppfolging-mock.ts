import { fakerNB_NO as faker } from '@faker-js/faker';
import {
    AnsattEnhet,
    Dagpenger,
    DetaljertOppfolging,
    Oppfolging,
    OppfolgingsVedtak,
    OppfolgingsYtelse,
    Saksbehandler,
    SyfoPunkt
} from '../models/oppfolging';
import { fyllRandomListe } from './utils/mock-utils';
import navfaker from 'nav-faker';
import dayjs from 'dayjs';
import { backendDatoformat } from '../utils/date-utils';

export function getMockOppfolging(fodselsnummer: string): Oppfolging {
    faker.seed(Number(fodselsnummer));
    const erUnderOppfolging = faker.random.boolean();

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
        id: 'E0001',
        navn: faker.company.companyName(),
        status: 'ESTAT'
    };
}

export function getMockYtelserOgKontrakter(fodselsnummer: string): DetaljertOppfolging {
    faker.seed(Number(fodselsnummer));
    navfaker.seed(fodselsnummer + 'oppf');

    return {
        oppfolging: getMockOppfolging(fodselsnummer),
        meldeplikt: faker.random.boolean(),
        formidlingsgruppe: 'FMGRP' + faker.random.number(5),
        innsatsgruppe: 'INGRP' + faker.random.number(10),
        sykemeldtFra: dayjs(faker.date.recent(10)).format(backendDatoformat),
        rettighetsgruppe: 'RGRP' + faker.random.number(10),
        vedtaksdato: dayjs(faker.date.recent(10)).format(backendDatoformat),
        sykefraværsoppfølging: fyllRandomListe(getSyfoPunkt, 5),
        ytelser: fyllRandomListe(() => navfaker.random.arrayElement([getYtelse(), getDagpenger()]), 4)
    };
}

function getSyfoPunkt(): SyfoPunkt {
    return {
        dato: dayjs(faker.date.recent(100)).format(backendDatoformat),
        fastOppfølgingspunkt: faker.random.boolean(),
        status: 'Ferdig behandlet',
        syfoHendelse: faker.lorem.words(6)
    };
}

function getYtelse(): OppfolgingsYtelse {
    return {
        datoKravMottatt: dayjs(faker.date.recent(30)).format(backendDatoformat),
        fom: dayjs(faker.date.recent(20)).format(backendDatoformat),
        tom: dayjs(faker.date.recent(10)).format(backendDatoformat),
        status: navfaker.random.arrayElement(['Aktiv', 'Avsluttet', 'Inaktiv', 'Lukket']),
        type: navfaker.random.arrayElement(['Arbeidsavklaringspenger', 'Individstønad']),
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
        dagerIgjen: faker.random.number(30),
        ukerIgjen: faker.random.number(10),
        dagerIgjenPermittering: 0,
        ukerIgjenPermittering: 0
    };
}

function getVedtak(): OppfolgingsVedtak {
    return {
        aktivFra: dayjs(faker.date.recent(40)).format(backendDatoformat),
        aktivTil: dayjs(faker.date.recent(20)).format(backendDatoformat),
        aktivitetsfase: 'Ikke spesif. aktivitetsfase',
        vedtakstatus: navfaker.random.arrayElement(['Iverksatt', 'Avsluttet']),
        vedtakstype: 'Ordinære dagpenger'
    };
}
