import * as faker from 'faker/locale/nb_NO';
import { getSistOppdatert, vektetSjanse } from './utils/mock-utils';
import { Verge, Vergemal } from '../models/vergemal/vergemal';
import { seededTilfeldigFodselsnummer } from './utils/fnr-utils';
import { lagNavn } from './utils/person-utils';
import { Kodeverk } from '../models/kodeverk';
import { aremark } from './person/aremark';

const VERGETYPER = [
    lagKodeverksverdi('ADV', 'Advokat'),
    lagKodeverksverdi('ALM', 'Alminnelig'),
    lagKodeverksverdi('EKT', 'Ektefelle / Samboer'),
    lagKodeverksverdi('FDV', 'Foreldreverge'),
    lagKodeverksverdi('PRF', 'Fast /profesjonell'),
    undefined
];

const VERGESAKSTYPER = [
    lagKodeverksverdi('EMA', 'Enslig mindreårig asylsøker'),
    lagKodeverksverdi('VOK', 'Voksen'),
    lagKodeverksverdi('VOM', 'Voksen midlertidlig'),
    lagKodeverksverdi('MIN', 'Mindreårig (unntatt EMF)'),
    lagKodeverksverdi('FRE', 'Fremtidsfullmakt'),
    lagKodeverksverdi('ANN', 'Forvaltning utenfor vergemål'),
    undefined
];

const MANDATTYPER = [
    lagKodeverksverdi('FOR', 'Ivareta personens interesser innenfor det personlige og økonomiske ' +
        'området herunder utlendingssaken (kun for EMA)'),
    lagKodeverksverdi('CMB', 'Ivareta personens interesser innenfor det personlige og økonomiske området'),
    lagKodeverksverdi('FIN', 'Ivareta personens interesser innenfor det økonomiske området'),
    lagKodeverksverdi('PER', 'Ivareta personens interesser innenfor det personlige området'),
    lagKodeverksverdi('ADP', 'Tilpasset mandat (utfyllende tekst i eget felt)'),
    undefined
];

export function mockVergemal(fødselsnummer: String): Vergemal {
    if (fødselsnummer === aremark.fødselsnummer) {
        return getAremarkVerge();
    }
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
        virkningsperiode: getTilfeldigPeriode(),
        navn: lagNavn(faker),
        vergetype: getTilfeldigVergetype(),
        embete: lagKodeverksverdi('AAA', 'Fylkesmannen i ' + faker.address.city())
    };
}

function getTilfeldigVergesakstype(): Kodeverk | undefined {
    return VERGESAKSTYPER[faker.random.number(VERGESAKSTYPER.length - 1)];
}

function getTilfeldigMandattype(): Kodeverk | undefined {
    return MANDATTYPER[faker.random.number(MANDATTYPER.length - 1)];
}

function getTilfeldigVergetype(): Kodeverk | undefined {
    return VERGETYPER[faker.random.number(VERGETYPER.length - 1)];
}

function lagKodeverksverdi(kodeRef: string, beskrivelse: string): Kodeverk {
    return {
        kodeRef: kodeRef,
        beskrivelse: beskrivelse,
    };
}

function getTilfeldigPeriode() {
    const fraOgMed = vektetSjanse(faker, 0.8) ? getSistOppdatert() : undefined;
    const tilOgMed = vektetSjanse(faker, 0.8) ? getSistOppdatert() : undefined;
    return {
        fom: fraOgMed,
        tom: tilOgMed
    };
}

function getAremarkVerge() {
    return {
        verger: [
            {
                ident: '21042900076',
                vergesakstype: VERGESAKSTYPER[0],
                mandattype: MANDATTYPER[0],
                mandattekst: 'Her kommen en fritekst som er sånn passelig lang',
                vergetype: VERGETYPER[0],
                virkningsperiode: {
                    fom: '2016-03-27T18:16:49+02:00',
                    tom: '2013-06-30T11:50:13+02:00'
                },
                navn: {
                    fornavn: 'Simen',
                    etternavn: 'Solli',
                    mellomnavn: '',
                    sammensatt: ' Solli Simen'
                },
                embete: lagKodeverksverdi('AAA', 'Fylkesmannen i ' + 'Østfold')
            }
        ]
    };
}