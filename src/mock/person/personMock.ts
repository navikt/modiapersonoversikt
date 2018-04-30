import * as faker from 'faker/locale/nb_NO';
import * as moment from 'moment';
import {
    Endringsinfo,
    Gateadresse,
    Matrikkeladresse, Periode,
    Personadresse,
    UstrukturertAdresse,
    Utlandsadresse
} from '../../models/personadresse';

import { Bostatus, BostatusTyper, Person } from '../../models/person';
import { Diskresjonskoder, TilrettelagtKommunikasjonsTyper } from '../../konstanter';
import { getSivilstand } from './sivilstandMock';
import { getFamilierelasjoner } from './familerelasjonerMock';
import { getFodselsdato } from '../utils/fnr-utils';
import { aremark } from './aremark';
import { vektetSjanse } from '../utils/mock-utils';
import { getBankKonto } from './bankkontoMock';
import { utledKjønnFraFødselsnummer } from '../../utils/fnr-utils';

export const gateadresse: Gateadresse = {
    tilleggsadresse: 'Tillegsgaten 1',
    gatenavn: 'Tilfeldighetsgaten',
    husnummer: '3',
    postnummer: '0666',
    poststed: 'HELL',
    periode: getPeriode()
};

export const matrikkeladresse: Matrikkeladresse = {
   eiendomsnavn: 'Bogstad Gård',
   postnummer: '1234',
   poststed: 'OSLO',
   periode: getPeriode()
};

export const utlandsadresse: Utlandsadresse = {
    landkode: 'BM',
    adresselinje: 'Hytte 2, Stranda, Bahamas',
    periode: getPeriode()
};

export const ustrukturertAdresse: UstrukturertAdresse = {
    adresselinje: 'Storgata 1, 9876 NARVIK'
};

export function getPerson(fødselsnummer: string): Person {
    if (fødselsnummer === aremark.fødselsnummer) {
        return aremark;
    } else {
        faker.seed(Number(fødselsnummer));
        return getTilfeldigPerson(fødselsnummer);
    }
}

function getTilfeldigPerson(fødselsnummer: string): Person {
    const fornavn = getFornavn(fødselsnummer);
    const etternavn = faker.name.lastName();
    const mellomnavn = '';
    const alder = moment().diff(getFodselsdato(fødselsnummer), 'years');
    const sivilstand = getSivilstand(getFodselsdato(fødselsnummer), faker);
    return {
        fødselsnummer: fødselsnummer,
        kjønn: utledKjønnFraFødselsnummer(fødselsnummer),
        geografiskTilknytning: getGeografiskTilknytning(),
        alder: alder,
        navn: {
            fornavn: fornavn,
            etternavn: etternavn,
            mellomnavn: mellomnavn,
            sammensatt: `${fornavn} ${mellomnavn} ${etternavn}`
        },
        tilrettelagtKommunikasjonListe: getTilrettelagtKommunikasjonsListe(),
        diskresjonskode: getDiskresjonskode(),
        statsborgerskap: getStatsborgerskap(),
        personstatus: getPersonstatus(alder),
        bankkonto: getBankKonto(),
        folkeregistrertAdresse: getTilfeldigAdresse(),
        alternativAdresse: vektetSjanse(faker, 0.2) ? getTilfeldigAdresse() : undefined,
        postadresse: vektetSjanse(faker, 0.2) ? getTilfeldigAdresse() : undefined,
        sivilstand: sivilstand,
        familierelasjoner: getFamilierelasjoner(faker, alder, sivilstand)
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
    if (vektetSjanse(faker, 0.1)) {
        return [
            {
                behovKode: 'LESA',
                beskrivelse: TilrettelagtKommunikasjonsTyper.LESA
            }
        ];
    } else if (vektetSjanse(faker, 0.1)) {
        return [
            {
                behovKode: 'KOSK',
                beskrivelse: TilrettelagtKommunikasjonsTyper.KOSK
            }
        ];
    } else if (vektetSjanse(faker, 0.1)) {
        return [
            {
                behovKode: 'KOMU',
                beskrivelse: TilrettelagtKommunikasjonsTyper.KOMU
            }
        ];
    } else if (vektetSjanse(faker, 0.1)) {
        return [
            {
                behovKode: 'TOHJ',
                beskrivelse: TilrettelagtKommunikasjonsTyper.TOHJ
            }
        ];
    } else if (vektetSjanse(faker, 0.1)) {
        return [
            {
                behovKode: 'LESA',
                beskrivelse: TilrettelagtKommunikasjonsTyper.LESA
            },

        ];
    } else if (vektetSjanse(faker, 0.05)) {
        return [
            {
                behovKode: 'LESA',
                beskrivelse: TilrettelagtKommunikasjonsTyper.LESA
            },
            {
                behovKode: 'KOMU',
                beskrivelse: TilrettelagtKommunikasjonsTyper.KOMU
            }
        ];
    } else if (vektetSjanse(faker, 0.05)) {
        return [
            {
                behovKode: 'TOHJ',
                beskrivelse: TilrettelagtKommunikasjonsTyper.TOHJ
            },
            {
                behovKode: 'KOMU',
                beskrivelse: TilrettelagtKommunikasjonsTyper.KOMU
            }
        ];
    } else {
        return [];
    }
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

function getSistOppdatert() {
    return moment(faker.date.past(5)).format(moment.ISO_8601.__momentBuiltinFormatBrand);
}

function getTilfeldigAdresse(): Personadresse {
    if (vektetSjanse(faker, 0.2)) {
        return {
            endringsinfo: getEndringsinfo(),
            matrikkeladresse: matrikkeladresse
        };
    } else if (vektetSjanse(faker, 0.2)) {
        return {
            endringsinfo: getEndringsinfo(),
            utlandsadresse: utlandsadresse
        };
    } else if (vektetSjanse(faker, 0.2)) {
        return {
            endringsinfo: getEndringsinfo(),
            ustrukturert: ustrukturertAdresse
        };
    } else {
        return {
            endringsinfo: getEndringsinfo(),
            gateadresse: gateadresse
        };
    }

}

function getEndringsinfo(): Endringsinfo {
    return {
        sistEndret: getSistOppdatert(),
        sistEndretAv: 'AA001'
    };
}

function getPeriode(): Periode {
    return {
        fra: getSistOppdatert(),
        til: getSistOppdatert()
    };
}
