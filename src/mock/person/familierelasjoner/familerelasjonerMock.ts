import * as moment from 'moment';

import navfaker from 'nav-faker';

import { Familierelasjon, Relasjonstype, Sivilstand, SivilstandTyper } from '../../../models/person/person';
import { Diskresjonskoder } from '../../../konstanter';
import { lagForeldre } from './relasjoner/foreldre';
import { mockBarn } from './relasjoner/barn';
import { lagPartner } from './relasjoner/partner';

export function getFamilierelasjoner(forFødselsnummer: string, sivilstand: Sivilstand) {
    const fødselsdato = navfaker.fødselsnummer.getFødselsdato(forFødselsnummer);
    const alder = moment().diff(fødselsdato, 'years');

    let relasjoner: Familierelasjon[] = [];
    if (alder >= 18) {
        relasjoner = relasjoner.concat(mockBarn(forFødselsnummer));
    }

    relasjoner = relasjoner.concat(lagForeldre(moment(fødselsdato)));

    if (sivilstand.kodeRef === SivilstandTyper.Gift) {
        relasjoner.push(lagPartner(Relasjonstype.Ektefelle));
    } else if (sivilstand.kodeRef === SivilstandTyper.Samboer) {
        relasjoner.push(lagPartner(Relasjonstype.Samboer));
    }

    relasjoner = kanskjeLeggTilDiskresjonskoder(relasjoner);

    return relasjoner;
}

function kanskjeLeggTilDiskresjonskoder(relasjoner: Familierelasjon[]) {
    relasjoner.forEach(relasjon => {
       if (navfaker.random.vektetSjanse(0.1)) {
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