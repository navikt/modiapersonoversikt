import faker from 'faker/locale/nb_NO';
import dayjs from 'dayjs';
import navfaker from 'nav-faker/dist/index';

import { Bostatus, BostatusTyper, Navn, Person, PersonRespons } from '../../models/person/person';
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
import { erGyldigFødselsnummer } from 'nav-faker/dist/personidentifikator/helpers/fodselsnummer-utils';
import { moss } from './moss';
import { getMockDoedsbo } from './doedsbo';
import { getMockFullmakter } from './fullmakter-mock';
import { TilrettelagtKommunikasjonType } from '../../models/kodeverk';
import { mockVergemal } from './vergemal/vergemalMock';
import { getDeltBostedMock } from './deltbosted-mock';

export function getPerson(fødselsnummer: string): PersonRespons {
    if (fødselsnummer === aremark.fødselsnummer) {
        return aremark;
    } else if (fødselsnummer === moss.fødselsnummer) {
        return moss;
    } else if (!erGyldigFødselsnummer(fødselsnummer)) {
        return {};
    } else {
        faker.seed(Number(fødselsnummer));
        navfaker.seed(fødselsnummer);
        return genererPerson(fødselsnummer);
    }
}

function genererPerson(fødselsnummer: string): Person {
    const fødselsdato = navfaker.personIdentifikator.getFødselsdato(fødselsnummer);
    const alder = dayjs().diff(fødselsdato, 'years');
    const sivilstand = getSivilstand(dayjs(fødselsdato), faker);
    return {
        fødselsnummer,
        kjønn: utledKjønnFraFødselsnummer(fødselsnummer),
        geografiskTilknytning: getGeografiskTilknytning(),
        alder: alder,
        navn: getMockNavn(fødselsnummer),
        tilrettelagtKomunikasjonsListe: getTilrettelagtKommunikasjonsListe(),
        diskresjonskode: navfaker.random.vektetSjanse(0.05) ? getDiskresjonskode() : undefined,
        statsborgerskap: getStatsborgerskap(),
        personstatus: getPersonstatus(alder),
        bankkonto: getBankKonto(),
        folkeregistrertAdresse: getTilfeldigFolkeregistrertAdresse(),
        alternativAdresse: vektetSjanse(faker, 0.2) ? getTilfeldigAdresseMedPeriode() : undefined,
        postadresse: vektetSjanse(faker, 0.2) ? getTilfeldigAdresseMedPeriode() : undefined,
        sivilstand: sivilstand,
        familierelasjoner: getFamilierelasjoner(fødselsnummer, sivilstand),
        sikkerhetstiltak: getSikkerhetstiltak(),
        kontaktinformasjon: getNavKontaktinformasjon(faker),
        kontaktinformasjonForDoedsbo: getMockDoedsbo(faker),
        fullmakt: getMockFullmakter(faker, navfaker),
        vergemal: mockVergemal(fødselsnummer),
        deltBosted: getDeltBostedMock(faker, navfaker)
    };
}

export function getMockNavn(fødselsnummer: string): Navn {
    if (fødselsnummer === aremark.fødselsnummer) {
        return aremark.navn;
    }
    faker.seed(Number(fødselsnummer));
    const fornavn = getFornavn(faker, fødselsnummer).toUpperCase();
    const etternavn = faker.name.lastName().toUpperCase();
    const mellomnavn = vektetSjanse(faker, 0.5) ? faker.name.lastName().toUpperCase() : '';
    return {
        endringsinfo: {
            sistEndret: '2012-12-12',
            sistEndretAv: 'Z010101, BD06'
        },
        fornavn: fornavn,
        etternavn: etternavn,
        mellomnavn: mellomnavn,
        sammensatt: `${fornavn} ${mellomnavn} ${etternavn}`
    };
}

export function getBedriftsNavn(id: string): string {
    faker.seed(Number(id));
    return faker.name.lastName() + ' AS';
}

export function getPersonstatus(alder: number): Bostatus {
    const bostatus = getBostatus();
    const dødsdato =
        bostatus && bostatus.kodeRef === BostatusTyper.Dod ? dayjs(faker.date.past(alder)).toISOString() : undefined;
    return {
        bostatus,
        dødsdato
    };
}

function getBostatus() {
    if (vektetSjanse(faker, 0.1)) {
        return { kodeRef: BostatusTyper.Dod, beskrivelse: 'Død' };
    } else if (vektetSjanse(faker, 0.1)) {
        return { kodeRef: BostatusTyper.Utvandret, beskrivelse: 'Utvandret' };
    } else {
        return undefined;
    }
}

function getTilrettelagtKommunikasjonsListe() {
    var liste = [];
    if (vektetSjanse(faker, 0.1)) {
        liste.push({
            type: TilrettelagtKommunikasjonType.TALESPRAK,
            kodeRef: 'SV',
            beskrivelse: 'Svensk'
        });
    } else if (vektetSjanse(faker, 0.1)) {
        liste.push({
            type: TilrettelagtKommunikasjonType.TEGNSPRAK,
            kodeRef: 'NO',
            beskrivelse: 'Norsk'
        });
    }

    return liste;
}

function getFornavn(seededFaker: Faker.FakerStatic, fødselsnummer: string): string {
    if (Number(fødselsnummer.charAt(8)) % 2 === 0) {
        return seededFaker.name.firstName(1);
    } else {
        return seededFaker.name.firstName(0);
    }
}

function getGeografiskTilknytning() {
    if (vektetSjanse(faker, 0.7)) {
        return String(faker.random.number({ min: 1000, max: 9999 }));
    } else if (vektetSjanse(faker, 0.15)) {
        return faker.address.countryCode();
    } else {
        return undefined;
    }
}

function getStatsborgerskap() {
    if (vektetSjanse(faker, 0.7)) {
        return { kodeRef: 'NOR', beskrivelse: 'NORGE' };
    }
    return {
        kodeRef: faker.address.countryCode(),
        beskrivelse: faker.address.country().toUpperCase()
    };
}
