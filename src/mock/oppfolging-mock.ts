import faker from 'faker/locale/nb_NO';
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
import { backendDatoformat, fyllRandomListe } from './utils/mock-utils';
import navfaker from 'nav-faker';
import moment from 'moment';

export function getMockOppfølging(fødselsnummer: string): Oppfolging {
    faker.seed(Number(fødselsnummer));
    const erUnderOppfolging = faker.random.boolean();

    return {
        erUnderOppfølging: erUnderOppfolging,
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

export function getMockYtelserOgKontrakter(fødselsnummer: string): DetaljertOppfolging {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'oppf');

    return {
        oppfølging: getMockOppfølging(fødselsnummer),
        meldeplikt: faker.random.boolean(),
        formidlingsgruppe: 'FMGRP' + faker.random.number(5),
        innsatsgruppe: 'INGRP' + faker.random.number(10),
        sykemeldtFra: moment(faker.date.recent(10)).format(backendDatoformat),
        rettighetsgruppe: 'RGRP' + faker.random.number(10),
        vedtaksdato: moment(faker.date.recent(10)).format(backendDatoformat),
        sykefraværsoppfølging: fyllRandomListe(getSyfoPunkt, 5),
        ytelser: fyllRandomListe(() => navfaker.random.arrayElement([getYtelse(), getDagpenger()]), 4)
    };
}

function getSyfoPunkt(): SyfoPunkt {
    return {
        dato: moment(faker.date.recent(100)).format(backendDatoformat),
        fastOppfølgingspunkt: faker.random.boolean(),
        status: 'Ferdig behandlet',
        syfoHendelse: faker.lorem.words(6)
    };
}

function getYtelse(): OppfolgingsYtelse {
    return {
        datoKravMottatt: moment(faker.date.recent(30)).format(backendDatoformat),
        fom: moment(faker.date.recent(20)).format(backendDatoformat),
        tom: moment(faker.date.recent(10)).format(backendDatoformat),
        status: navfaker.random.arrayElement(['Aktiv', 'Avsluttet']),
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
        aktivFra: moment(faker.date.recent(40)).format(backendDatoformat),
        aktivTil: moment(faker.date.recent(20)).format(backendDatoformat),
        aktivitetsfase: 'Ikke spesif. aktivitetsfase',
        vedtakstatus: navfaker.random.arrayElement(['Iverksatt', 'Avsluttet']),
        vedtakstype: 'Ordinære dagpenger'
    };
}
