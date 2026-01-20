import { type Faker, fakerNB_NO as faker } from '@faker-js/faker';
import md5 from 'md5';
import navfaker from 'nav-faker/dist/index';
import type { Person } from '../../app/personside/visittkort-v2/PersondataDomain';
import type { Kodeverk } from '../../models/kodeverk';
import type {
    Brukerinfo,
    Navn,
    NorskIdent,
    PersonsokRequestV3,
    PersonsokResponse,
    UtenlandskID
} from '../../models/person/personsok';
import { aremark } from '../persondata/aremark';
import { fyllRandomListe, vektetSjanse } from '../utils/mock-utils';

export function mockPersonsokResponse(request: PersonsokRequestV3): PersonsokResponse[] {
    navfaker.seed(md5(JSON.stringify(request)));
    const seednr = navfaker.personIdentifikator.fødselsnummer();
    faker.seed(Number(seednr));
    navfaker.seed(seednr);
    const fyllRandomListeSokUtenlandskID = fyllRandomListe(() => getPersonsokResponseSokUtenlandskID(), 50);
    const fyllRandomListeUtenUtenlandskIDSok = fyllRandomListe(() => getPersonsokResponse(), 50);
    const fyltRandomListe = vektetSjanse(faker, 0.5)
        ? fyllRandomListeUtenUtenlandskIDSok
        : fyllRandomListeSokUtenlandskID;

    return fyltRandomListe;
}

function getPersonsokResponse(): PersonsokResponse {
    const fodselsnummer = navfaker.personIdentifikator.fødselsnummer();
    const diskresjonskode = vektetSjanse(faker, 0.5) ? getDiskresjonskode() : null;
    const postadresse = vektetSjanse(faker, 0.5) ? getPostadresse() : null;
    const bostedsadresse = vektetSjanse(faker, 0.5) ? getBostedsadresse() : null;
    const brukerinfo = vektetSjanse(faker, 0.5) ? getBrukerinfo() : null;
    const utenlandskID = null;

    return {
        diskresjonskode: diskresjonskode,
        postadresse: postadresse,
        bostedsadresse: bostedsadresse,
        kjonn: getKjonn(),
        navn: getMockNavn(fodselsnummer),
        status: getStatus(),
        ident: getIdent(fodselsnummer),
        brukerinfo: brukerinfo,
        utenlandskID: utenlandskID
    };
}

function getPersonsokResponseSokUtenlandskID(): PersonsokResponse {
    const fodselsnummer = navfaker.personIdentifikator.fødselsnummer();
    const postadresse = vektetSjanse(faker, 0.5) ? getPostadresse() : null;
    const bostedsadresse = vektetSjanse(faker, 0.5) ? getBostedsadresse() : null;
    const brukerinfo = getBrukerinfoSokUtenlandsID();

    return {
        diskresjonskode: null,
        postadresse: postadresse,
        bostedsadresse: bostedsadresse,
        kjonn: null,
        navn: getMockNavn(fodselsnummer),
        status: null,
        ident: getIdent(fodselsnummer),
        brukerinfo: brukerinfo,
        utenlandskID: getUtenlandskID()
    };
}

function getUtenlandskID(): UtenlandskID[] {
    const utenlandskID1 = {
        identifikasjonsnummer: '12345',
        utstederland: 'FIN'
    };
    const utenlandskID2 = {
        identifikasjonsnummer: '12658',
        utstederland: 'AFG'
    };
    const utenlandskIDListe = [utenlandskID1, utenlandskID2];
    return utenlandskIDListe;
}

function getPostadresse(): string {
    return `${faker.location.streetAddress(true)} ${faker.location.city()} ${faker.location.country()}`;
}

function getBostedsadresse(): string {
    return faker.address.streetAddress(true);
}

function getDiskresjonskode(): Kodeverk {
    return {
        kodeRef: '6',
        beskrivelse: 'Kode 6'
    };
}

function parseAremarkNavn(aremark: Person): Navn {
    const aremarkNavn = aremark.navn[0];
    return {
        ...aremarkNavn,
        sammensatt: `${aremarkNavn.fornavn} ${aremarkNavn.mellomnavn} ${aremarkNavn.etternavn}`
    };
}

function getMockNavn(fodselsnummer: string): Navn {
    if (fodselsnummer === aremark.personIdent) {
        return parseAremarkNavn(aremark);
    }
    faker.seed(Number(fodselsnummer));
    const fornavn = getFornavn(faker, fodselsnummer).toUpperCase();
    const etternavn = faker.person.lastName().toUpperCase();
    const mellomnavn = vektetSjanse(faker, 0.5) ? faker.person.lastName().toUpperCase() : '';
    return {
        fornavn: fornavn,
        etternavn: etternavn,
        mellomnavn: mellomnavn,
        sammensatt: `${fornavn} ${mellomnavn} ${etternavn}`
    };
}

function getFornavn(seededFaker: Faker, fødselsnummer: string): string {
    if (Number(fødselsnummer.charAt(8)) % 2 === 0) {
        return seededFaker.person.firstName('male');
    }
    return seededFaker.person.firstName('female');
}

function getKjonn(): Kodeverk {
    if (vektetSjanse(faker, 0.5)) {
        return {
            kodeRef: 'M',
            beskrivelse: 'Mann'
        };
    }
    return {
        kodeRef: 'K',
        beskrivelse: 'Kvinne'
    };
}

function getStatus(): Kodeverk {
    return {
        kodeRef: 'A',
        beskrivelse: 'Aktiv'
    };
}

function getIdent(fodselsnummer: string): NorskIdent {
    return {
        ident: fodselsnummer,
        type: {
            kodeRef: 'F',
            beskrivelse: 'Fødselsnummer'
        }
    };
}

function getBrukerinfo(): Brukerinfo {
    const midlertidigAdresse = vektetSjanse(faker, 0.5) ? getPostadresse() : null;

    return {
        ansvarligEnhet: '1234',
        gjeldendePostadresseType: {
            kodeRef: 'P',
            beskrivelse: 'Postadresse'
        },
        midlertidigPostadresse: midlertidigAdresse
    };
}

function getBrukerinfoSokUtenlandsID(): Brukerinfo {
    return {
        ansvarligEnhet: null,
        gjeldendePostadresseType: null,
        midlertidigPostadresse: null
    };
}

export function mockStaticPersonsokRequest(): PersonsokRequestV3 {
    return {
        enhet: '0219',
        navn: 'Aremark'
    };
}
