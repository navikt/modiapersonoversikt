import * as faker from 'faker/locale/nb_NO';

import navfaker from 'nav-faker';

import { Verge, Vergemal } from '../../../models/vergemal/vergemal';
import { aremark } from '../aremark';
import { getSistOppdatert, vektetSjanse } from '../../utils/mock-utils';
import { lagNavn } from '../../utils/person-utils';
import { Kodeverk } from '../../../models/kodeverk';

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
    lagKodeverksverdi('ADP', 'Tilpasset mandat (utfyllende tekst i eget felt)')
];

export function mockVergemal(fødselsnummer: string): Vergemal {
    if (fødselsnummer === aremark.fødselsnummer) {
        return getAremarkVerge();
    }
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer);
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
    const vergesFødselsnummer = navfaker.personIdentifikator.myndigFødselsnummer();
    const vergemålManglerVergeData = vektetSjanse(faker, 0.2);
    return {
        ident: vergemålManglerVergeData ? undefined : vergesFødselsnummer,
        vergesakstype: getTilfeldigVergesakstype(),
        mandattype: vektetSjanse(faker, 0.5) ? getTilfeldigMandattype() : undefined,
        mandattekst: vektetSjanse(faker, 0.1) ? 'Fritekst vedrørende mandat' : undefined,
        virkningsperiode: getTilfeldigPeriode(),
        navn: vergemålManglerVergeData ? undefined : lagNavn(vergesFødselsnummer),
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