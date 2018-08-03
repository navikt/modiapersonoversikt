import * as moment from 'moment';

import navfaker from 'nav-faker';

import { Familierelasjon, Relasjonstype, Sivilstand, SivilstandTyper } from '../../../models/person/person';
import { lagForeldre } from './relasjoner/foreldre';
import { mockBarn } from './relasjoner/barn';
import { lagPartner } from './relasjoner/partner';
import { getDiskresjonskode } from '../../utils/diskresjonskode-util';

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

function kanskjeLeggTilDiskresjonskoder(relasjoner: Familierelasjon[]): Familierelasjon[] {
    const saksbehandlerHarTilgangTilDiskresjonskoder = harSaksbehandlerTilgangTilDiskresjonskode();
    return relasjoner.map(relasjon => {
       if (navfaker.random.vektetSjanse(0.1)) {
           return leggTilDiskresjonskode(relasjon, saksbehandlerHarTilgangTilDiskresjonskoder);
       } else {
           return relasjon;
       }
    });
}

function leggTilDiskresjonskode(relasjon: Familierelasjon, saksBehandlerHarTilgangTilDiskresjonskode: boolean) {
    relasjon.tilPerson.diskresjonskode = getDiskresjonskode();

    if (!saksBehandlerHarTilgangTilDiskresjonskode) {
        relasjon.tilPerson.navn = null;
        relasjon.tilPerson.fødselsnummer = undefined;
        relasjon.harSammeBosted = undefined;
        relasjon.tilPerson.alder = undefined;
        relasjon.tilPerson.alderMåneder = undefined;
    }

    return relasjon;
}

function harSaksbehandlerTilgangTilDiskresjonskode() {
    return navfaker.random.vektetSjanse(0.5);
}
