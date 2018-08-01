import * as faker from 'faker/locale/nb_NO';
import * as moment from 'moment';

import navfaker from 'nav-faker/dist/index';

import {
    BegrensetTilgang,
    BegrensetTilgangTyper,
    Bostatus,
    BostatusTyper,
    Navn,
    Person,
    PersonRespons
} from '../../models/person/person';
import { TilrettelagtKommunikasjonsTyper } from '../../konstanter';
import { getSivilstand } from './sivilstandMock';
import { getFamilierelasjoner } from './familierelasjoner/familerelasjonerMock';
import { aremark } from './aremark';
import { vektetSjanse } from '../utils/mock-utils';
import { getBankKonto } from './bankkontoMock';
import { utledKjønnFraFødselsnummer } from '../../utils/fnr-utils';
import { getTilfeldigAdresseMedPeriode, getTilfeldigFolkeregistrertAdresse } from './adresseMock';
import { getSikkerhetstiltak } from './sikkerhetstiltakMock';
import { getNavKontaktinformasjon } from './navKontaktinformasjonMock';
import { getDiskresjonskode } from '../utils/diskresjonskode-util';

export function getPerson(fødselsnummer: string): PersonRespons {
    if (fødselsnummer === aremark.fødselsnummer) {
        return aremark;
    } else {
        faker.seed(Number(fødselsnummer));
        navfaker.seed(fødselsnummer);
        if (vektetSjanse(faker, 0.02)) {
            return getBegrensetInnsyn();
        } else {
            return genererPerson(fødselsnummer);
        }
    }
}

function getBegrensetInnsyn(): BegrensetTilgang {
    return {
        begrunnelse: BegrensetTilgangTyper.Kode6,
        sikkerhetstiltak: getSikkerhetstiltak()
    };
}

function genererPerson(fødselsnummer: string): Person {
    const fødselsdato = navfaker.fødselsnummer.getFødselsdato(fødselsnummer);
    const alder = moment().diff(fødselsdato, 'years');
    const sivilstand = getSivilstand(moment(fødselsdato), faker);
    return {
        fødselsnummer: fødselsnummer,
        kjønn: utledKjønnFraFødselsnummer(fødselsnummer),
        geografiskTilknytning: getGeografiskTilknytning(),
        alder: alder,
        navn: getNavn(fødselsnummer),
        tilrettelagtKomunikasjonsListe: getTilrettelagtKommunikasjonsListe(),
        diskresjonskode: navfaker.random.vektetSjanse(0.05) ? getDiskresjonskode() : undefined,
        statsborgerskap: getStatsborgerskap(),
        personstatus: getPersonstatus(alder),
        bankkonto: getBankKonto(),
        folkeregistrertAdresse: getTilfeldigFolkeregistrertAdresse(),
        alternativAdresse: vektetSjanse(faker, 0.2) ? getTilfeldigAdresseMedPeriode() : undefined,
        postadresse: vektetSjanse(faker, 0.2) ? getTilfeldigAdresseMedPeriode() : undefined,
        sivilstand: sivilstand,
        familierelasjoner: getFamilierelasjoner(faker, fødselsdato, sivilstand),
        sikkerhetstiltak: getSikkerhetstiltak(),
        kontaktinformasjon: getNavKontaktinformasjon(faker)
    };
}

function getNavn(fødselsnummer: string): Navn {
    const fornavn = getFornavn(fødselsnummer).toUpperCase();
    const etternavn = faker.name.lastName().toUpperCase();
    const mellomnavn = vektetSjanse(faker, 0.5) ? faker.name.lastName().toUpperCase() : '';
    return {
        fornavn: fornavn,
        etternavn: etternavn,
        mellomnavn: mellomnavn,
        sammensatt: `${fornavn} ${mellomnavn} ${etternavn}`
    };
}

export function getPersonstatus(alder: number): Bostatus {
    const bostatus = getBostatus();
    const dødsdato = bostatus && bostatus.kodeRef === BostatusTyper.Død ? moment(faker.date.past(alder))
        .format(moment.ISO_8601.__momentBuiltinFormatBrand) : undefined;
    return {
        bostatus,
        dødsdato
    };
}

function getBostatus() {
    if (vektetSjanse(faker, 0.1)) {
        return { kodeRef: BostatusTyper.Død, beskrivelse: 'Død' };
    } else if (vektetSjanse(faker, 0.1)) {
        return { kodeRef: BostatusTyper.Utvandret, beskrivelse: 'Utvandret' };
    } else {
        return undefined;
    }
}

function getTilrettelagtKommunikasjonsListe() {
    var liste = [];
    if (vektetSjanse(faker, 0.1)) {
        liste.push(
            {
                kodeRef: 'LESA',
                beskrivelse: TilrettelagtKommunikasjonsTyper.LESA
            }
        );
    } else if (vektetSjanse(faker, 0.1)) {
        liste.push(
            {
                kodeRef: 'KOSK',
                beskrivelse: TilrettelagtKommunikasjonsTyper.KOSK
            }
        );
    } else if (vektetSjanse(faker, 0.1)) {
        liste.push(
            {
                kodeRef: 'KOMU',
                beskrivelse: TilrettelagtKommunikasjonsTyper.KOMU
            }
        );
    } else if (vektetSjanse(faker, 0.1)) {
        liste.push(
            {
                kodeRef: 'TOHJ',
                beskrivelse: TilrettelagtKommunikasjonsTyper.TOHJ
            }
        );
    } else if (vektetSjanse(faker, 0.1)) {
        liste.push(
            {
                kodeRef: 'LESA',
                beskrivelse: TilrettelagtKommunikasjonsTyper.LESA
            },

        );
    } else if (vektetSjanse(faker, 0.05)) {
        liste.push(
            {
                kodeRef: 'LESA',
                beskrivelse: TilrettelagtKommunikasjonsTyper.LESA
            },
            {
                kodeRef: 'KOMU',
                beskrivelse: TilrettelagtKommunikasjonsTyper.KOMU
            }
        );
    } else if (vektetSjanse(faker, 0.05)) {
        liste.push(
            {
                kodeRef: 'TOHJ',
                beskrivelse: TilrettelagtKommunikasjonsTyper.TOHJ
            },
            {
                kodeRef: 'KOMU',
                beskrivelse: TilrettelagtKommunikasjonsTyper.KOMU
            }
        );
    }

    return liste;
}

function getFornavn(fødselsnummer: string): string {
    if (Number(fødselsnummer.charAt(8)) % 2 === 0 ) {
        return faker.name.firstName(1);
    } else {
        return faker.name.firstName(0);
    }
}

function getGeografiskTilknytning() {
    if (vektetSjanse(faker, 0.7)) {
        return String(faker.random.number({min: 1000, max: 9999}));
    } else if (vektetSjanse(faker, 0.15)) {
        return faker.address.countryCode();
    } else {
        return undefined;
    }
}

function getStatsborgerskap() {
    if (vektetSjanse(faker, 0.7)) {
        return { kodeRef: 'NOR', beskrivelse: 'NORGE' };
    }
    return {
        kodeRef: faker.address.countryCode(),
        beskrivelse: faker.address.country().toUpperCase()
    };
}
