import * as faker from 'faker/locale/nb_NO';
import { getSistOppdatert, vektetSjanse } from './utils/mock-utils';
import { Verge, Vergemal } from '../models/vergemal/vergemal';
import { seededTilfeldigFodselsnummer } from './utils/fnr-utils';
import { lagNavn } from './utils/person-utils';

export function mockVergemal(fødselsnummer: String): Vergemal {
    faker.seed(Number(fødselsnummer));
    if (vektetSjanse(faker, 0.7)) {
        return {
            verger: []
        };
    }
    return getVergemal();

}

function getVergemal() {
    const antallVerger = faker.random.number(3);
    let verger = [];
    for (let i = 0; i < antallVerger; i++) {
        verger.push(getVerge());
    }
    return {
        verger: verger
    };
}

function getVerge(): Verge {
    const vergesFødselsnummer = seededTilfeldigFodselsnummer(faker, 18, 100);
    return {
        ident: vergesFødselsnummer,
        vergesakstype: getTilfeldigVergesakstype(),
        mandattype: getTilfeldigMandattype(),
        mandattekst: 'Her kommen en fritekst som er sånn passelig lang',
        periode: getTilfeldigPeriode(),
        navn: lagNavn(faker),
        vergetype: getTilfeldigVergetype(),
        embete: 'Fylkesmannen i ' + faker.address.city()
    };
}

function getTilfeldigVergesakstype() {
    const typer = [
        'Enslig mindreårig asylsøker',
        'Voksen',
        'Voksen midlertidlig',
        'Mindreårig',
        'Fremtidsfullmakt',
        'Forvaltning utenfor vergemål',
        undefined
    ];

    return typer[faker.random.number(typer.length - 1)];
}

function getTilfeldigMandattype() {
    const typer = [
        'Ivareta personens interesser innenfor det personlige og økonomiske området herunder utlendingssaken ' +
        '(kun for EMA)',
        'Ivareta personens interesser innenfor det personlige og økonomiske området',
        'Ivareta personens interesser innenfor det økonomiske området',
        'Ivareta personens interesser innenfor det personlige området',
        'Tilpasset mandat (utfyllende tekst i eget felt)',
        undefined
    ];

    return typer[faker.random.number(typer.length - 1)];
}

function getTilfeldigVergetype() {
    const typer = [
        'Advokat',
        'Alminnelig',
        'Ektefelle/Samboer',
        'Foreldreverge',
        'Nærstående familie',
        'Representant (kun for EMA)',
        'Fast / Profesjonell',
        'Fullmektig',
        'Forvalter',
        undefined
    ];

    return typer[faker.random.number(typer.length - 1)];
}

function getTilfeldigPeriode() {
    const fraOgMed = vektetSjanse(faker, 0.8) ? getSistOppdatert() : undefined;
    const tilOgMed = vektetSjanse(faker, 0.8) ? getSistOppdatert() : undefined;
    return {
        fom: fraOgMed,
        tom: tilOgMed
    };
}
