import FakerStatic = Faker.FakerStatic;
import * as moment from 'moment';
import { Familierelasjon, Relasjonstype, Sivilstand, SivilstandTyper } from '../../../models/person/person';
import { vektetSjanse } from '../../utils/mock-utils';
import { Diskresjonskoder } from '../../../konstanter';
import { lagForeldre } from './relasjoner/foreldre';
import { getMockBarn } from './relasjoner/barn';
import { lagPartner } from './relasjoner/partner';

export function getFamilierelasjoner(faker: FakerStatic, fødselsdato: Date, sivilstand: Sivilstand) {
    let relasjoner: Familierelasjon[] = [];
    const alder = moment().diff(fødselsdato, 'years');
    if (alder >= 18) {
        relasjoner = relasjoner.concat(getMockBarn(faker, alder));
    }

    relasjoner = relasjoner.concat(lagForeldre(faker, moment(fødselsdato)));

    if (sivilstand.kodeRef === SivilstandTyper.Gift) {
        relasjoner.push(lagPartner(faker, Relasjonstype.Ektefelle));
    } else if (sivilstand.kodeRef === SivilstandTyper.Samboer) {
        relasjoner.push(lagPartner(faker, Relasjonstype.Samboer));
    }

    relasjoner = kanskjeLeggTilDiskresjonskoder(faker, relasjoner);

    return relasjoner;
}

function kanskjeLeggTilDiskresjonskoder(faker: FakerStatic, relasjoner: Familierelasjon[]) {
    relasjoner.forEach(relasjon => {
       if (vektetSjanse(faker, 0.1)) {
           relasjon.tilPerson.diskresjonskode = {
               kodeRef: Diskresjonskoder.FORTROLIG_ADRESSE,
               beskrivelse: 'Sperret adresse, fortrolig'
           };
           relasjon.tilPerson.navn = null;
           relasjon.tilPerson.fødselsnummer = undefined;
       }
    });
    return relasjoner;
}