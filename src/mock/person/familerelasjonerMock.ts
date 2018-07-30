import FakerStatic = Faker.FakerStatic;
import * as moment from 'moment';

import navfaker from 'nav-faker/dist/index';

import { getPersonstatus } from './personMock';
import { Familierelasjon, Kjønn, Relasjonstype, Sivilstand, SivilstandTyper } from '../../models/person/person';
import { vektetSjanse } from '../utils/mock-utils';
import { seededTilfeldigFodselsnummer } from '../utils/fnr-utils';
import { lagNavn } from '../utils/person-utils';
import { Diskresjonskoder } from '../../konstanter';

export function getFamilierelasjoner(faker: FakerStatic, alder: number, sivilstand: Sivilstand) {
    let relasjoner: Familierelasjon[] = [];
    if (alder >= 18) {
        relasjoner = relasjoner.concat(getMockBarn(faker, alder));
    }

    relasjoner = relasjoner.concat(lagForeldre(faker, alder));

    if (sivilstand.kodeRef === SivilstandTyper.Gift) {
        relasjoner.push(lagPartner(faker, Relasjonstype.Ektefelle));
    } else if (sivilstand.kodeRef === SivilstandTyper.Samboer) {
        relasjoner.push(lagPartner(faker, Relasjonstype.Samboer));
    }

    relasjoner = kanskjeLeggTilDiskresjonskoder(faker, relasjoner);

    return relasjoner;
}

function getMockBarn(faker: FakerStatic, foreldresAlder: number) {
    const antallBarn = kalkulerAntallBarn(faker, foreldresAlder);
    let barn = [];
    for (let i =  0; i < antallBarn; i++) {
        barn.push(lagBarn(faker, foreldresAlder));
    }
    return barn;
}

function kalkulerAntallBarn(faker: FakerStatic, foreldresAlder: number) {
    const maksAntallBarn = foreldresAlder - 18;
    if (vektetSjanse(faker, 0.05)) {
        return faker.random.number({min: 0, max: Math.min(maksAntallBarn, 15)});
    } else if (vektetSjanse(faker, 0.75)) {
        return faker.random.number(Math.min(maksAntallBarn, 5));
    }
    return 0;
}

function lagBarn(faker: FakerStatic, foreldresAlder: number): Familierelasjon {
    const maxAlder = foreldresAlder - 18;
    const minAlder = Math.max(foreldresAlder - 50, 0);
    const barnetsFødselsnummer = seededTilfeldigFodselsnummer(minAlder, maxAlder);
    const alder = getAlderFromFødselsnummer(barnetsFødselsnummer);
    return {
        harSammeBosted: vektetSjanse(faker, 0.7),
        rolle: Relasjonstype.Barn,
        tilPerson: {
            navn: lagNavn(faker),
            alder: alder,
            alderMåneder: alder > 0 ? alder * 12 + 1 : 3,
            fødselsnummer: barnetsFødselsnummer,
            personstatus: getPersonstatus(alder)
        },
    };
}

function lagPartner(faker: FakerStatic, relasjonstype: Relasjonstype): Familierelasjon {
    const partnersFødslesnummer = seededTilfeldigFodselsnummer(18, 100);
    const alder = getAlderFromFødselsnummer(partnersFødslesnummer);
    return {
        harSammeBosted: vektetSjanse(faker, 0.9),
        rolle: relasjonstype,
        tilPerson: {
            navn: lagNavn(faker),
            alder: alder,
            alderMåneder: alder * 12 + 2,
            fødselsnummer: partnersFødslesnummer,
            personstatus: getPersonstatus(alder)
        }
    };
}

function lagForeldre(faker: FakerStatic, barnetsAlder: number): Familierelasjon[] {
    let foreldre = [];
    if (vektetSjanse(faker, 0.9)) {
        foreldre.push(lagForelder(faker, barnetsAlder, Relasjonstype.Mor));
    }
    if (vektetSjanse(faker, 0.9)) {
        foreldre.push(lagForelder(faker, barnetsAlder, Relasjonstype.Far));
    }
    return foreldre;
}

function lagForelder(faker: FakerStatic, barnetsAlder: number, relasjonstype: Relasjonstype) {
    const minAlder = barnetsAlder + 18;
    const kjønn = relasjonstype === Relasjonstype.Mor ? Kjønn.Kvinne : Kjønn.Mann;
    const foreldersFødselsnummer = seededTilfeldigFodselsnummer(minAlder, Math.max(minAlder, 100), kjønn);
    const alder = getAlderFromFødselsnummer(foreldersFødselsnummer);
    return {
        harSammeBosted: vektetSjanse(faker, 0.9),
        rolle: relasjonstype,
        tilPerson: {
            navn: lagNavn(faker),
            alder: alder,
            alderMåneder: alder * 12 + 3,
            fødselsnummer: foreldersFødselsnummer,
            personstatus: getPersonstatus(alder)
        }
    };
}

function getAlderFromFødselsnummer(fødselsnummer: string) {
    return moment().diff(navfaker.fødselsnummer.getFødselsdato(fødselsnummer), 'years');
}

function kanskjeLeggTilDiskresjonskoder(faker: FakerStatic, relasjoner: Familierelasjon[]) {
    relasjoner.forEach(relasjon => {
       if (vektetSjanse(faker, 0.1)) {
           relasjon.tilPerson.diskresjonskode = {
               kodeRef: Diskresjonskoder.FORTROLIG_ADRESSE,
               beskrivelse: 'Sperret adresse, fortrolig'
           };
           relasjon.tilPerson.navn = null;
           relasjon.tilPerson.fødselsnummer = null;
       }
    });
    return relasjoner;
}