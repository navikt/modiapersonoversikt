import * as faker from 'faker/locale/nb_NO';
import * as moment from 'moment';

import { Bostatus, BostatusTyper, Navn, Person } from '../../models/person';
import { Diskresjonskoder, TilrettelagtKommunikasjonsTyper } from '../../konstanter';
import { getSivilstand } from './sivilstandMock';
import { getFamilierelasjoner } from './familerelasjonerMock';
import { getFodselsdato } from '../utils/fnr-utils';
import { aremark } from './aremark';
import { vektetSjanse } from '../utils/mock-utils';
import { getBankKonto } from './bankkontoMock';
import { utledKjønnFraFødselsnummer } from '../../utils/fnr-utils';
import { getTilfeldigAdresse } from './adresseMock';
import { getSikkerhetstiltak } from './sikkerhetstiltakMock';

export function getPerson(fødselsnummer: string): Person {
    if (fødselsnummer === aremark.fødselsnummer) {
        return aremark;
    } else {
        faker.seed(Number(fødselsnummer));
        return getTilfeldigPerson(fødselsnummer);
    }
}

function getTilfeldigPerson(fødselsnummer: string): Person {
    const alder = moment().diff(getFodselsdato(fødselsnummer), 'years');
    const sivilstand = getSivilstand(getFodselsdato(fødselsnummer), faker);
    return {
        fødselsnummer: fødselsnummer,
        kjønn: utledKjønnFraFødselsnummer(fødselsnummer),
        geografiskTilknytning: getGeografiskTilknytning(),
        alder: alder,
        navn: getNavn(fødselsnummer),
        tilrettelagtKomunikasjonsListe: getTilrettelagtKommunikasjonsListe(),
        diskresjonskode: getDiskresjonskode(),
        statsborgerskap: getStatsborgerskap(),
        personstatus: getPersonstatus(alder),
        bankkonto: getBankKonto(),
        folkeregistrertAdresse: getTilfeldigAdresse(),
        alternativAdresse: vektetSjanse(faker, 0.2) ? getTilfeldigAdresse() : undefined,
        postadresse: vektetSjanse(faker, 0.2) ? getTilfeldigAdresse() : undefined,
        sivilstand: sivilstand,
        familierelasjoner: getFamilierelasjoner(faker, alder, sivilstand),
        sikkerhetstiltak: getSikkerhetstiltak()
    };
}

function getNavn(fødselsnummer: string): Navn {
    const fornavn = getFornavn(fødselsnummer);
    const etternavn = faker.name.lastName();
    const mellomnavn = '';
    return {
        fornavn: fornavn,
        etternavn: etternavn,
        mellomnavn: mellomnavn,
        sammensatt: `${fornavn} ${mellomnavn} ${etternavn}`
    };
}

export function getPersonstatus(alder: number): Bostatus {
    const bostatus = getBostatus();
    const dødsdato = bostatus === BostatusTyper.Død ? moment(faker.date.past(alder))
        .format(moment.ISO_8601.__momentBuiltinFormatBrand) : undefined;
    return {
        bostatus,
        dødsdato
    };
}

function getBostatus() {
    if (vektetSjanse(faker, 0.1)) {
        return BostatusTyper.Død;
    } else if (vektetSjanse(faker, 0.1)) {
        return BostatusTyper.Utvandret;
    } else {
        return undefined;
    }
}

function getTilrettelagtKommunikasjonsListe() {
    var liste = [];
    if (vektetSjanse(faker, 0.1)) {
        liste.push(
            {
                behovKode: 'LESA',
                beskrivelse: TilrettelagtKommunikasjonsTyper.LESA
            }
        );
    } else if (vektetSjanse(faker, 0.1)) {
        liste.push(
            {
                behovKode: 'KOSK',
                beskrivelse: TilrettelagtKommunikasjonsTyper.KOSK
            }
        );
    } else if (vektetSjanse(faker, 0.1)) {
        liste.push(
            {
                behovKode: 'KOMU',
                beskrivelse: TilrettelagtKommunikasjonsTyper.KOMU
            }
        );
    } else if (vektetSjanse(faker, 0.1)) {
        liste.push(
            {
                behovKode: 'TOHJ',
                beskrivelse: TilrettelagtKommunikasjonsTyper.TOHJ
            }
        );
    } else if (vektetSjanse(faker, 0.1)) {
        liste.push(
            {
                behovKode: 'LESA',
                beskrivelse: TilrettelagtKommunikasjonsTyper.LESA
            },

        );
    } else if (vektetSjanse(faker, 0.05)) {
        liste.push(
            {
                behovKode: 'LESA',
                beskrivelse: TilrettelagtKommunikasjonsTyper.LESA
            },
            {
                behovKode: 'KOMU',
                beskrivelse: TilrettelagtKommunikasjonsTyper.KOMU
            }
        );
    } else if (vektetSjanse(faker, 0.05)) {
        liste.push(
            {
                behovKode: 'TOHJ',
                beskrivelse: TilrettelagtKommunikasjonsTyper.TOHJ
            },
            {
                behovKode: 'KOMU',
                beskrivelse: TilrettelagtKommunikasjonsTyper.KOMU
            }
        );
    }

    return liste;
}

function getDiskresjonskode() {
    if (vektetSjanse(faker, 0.1)) {
        return Diskresjonskoder.FORTROLIG_ADRESSE;
    } else if (vektetSjanse(faker, 0.1)) {
        return Diskresjonskoder.STRENGT_FORTROLIG_ADRESSE;
    } else {
        return undefined;
    }
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
        return 'NORGE';
    }
    return faker.address.country().toUpperCase();
}
