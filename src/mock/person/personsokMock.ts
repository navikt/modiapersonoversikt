import { Brukerinfo, NorskIdent, PersonsokRequest, PersonsokResponse } from '../../models/person/personsok';
import { aremark } from './aremark';
import { moss } from './moss';
import faker from 'faker/locale/nb_NO';

import navfaker from 'nav-faker/dist/index';
import { Kodeverk } from '../../models/kodeverk';
import { fyllRandomListe, vektetSjanse } from '../utils/mock-utils';
import { getMockNavn } from './personMock';
import md5 from 'md5';

export function mockPersonsokResponse(request: PersonsokRequest): PersonsokResponse[] {
    navfaker.seed(md5(JSON.stringify(request)));
    const seednr = navfaker.personIdentifikator.fødselsnummer();
    faker.seed(Number(seednr));
    navfaker.seed(seednr);

    return fyllRandomListe(() => getPersonsokResponse(), 10);
}

function getPersonsokResponse(): PersonsokResponse {
    const fodselsnummer = navfaker.personIdentifikator.fødselsnummer();
    const diskresjonskode = vektetSjanse(faker, 0.5) ? getDiskresjonskode() : null;
    const postadresse = vektetSjanse(faker, 0.5) ? getPostadresse() : null;
    const bostedsadresse = vektetSjanse(faker, 0.5) ? getBostedsadresse() : null;
    const brukerinfo = vektetSjanse(faker, 0.5) ? getBrukerinfo() : null;

    return {
        diskresjonskode: diskresjonskode,
        postadresse: postadresse,
        bostedsadresse: bostedsadresse,
        kjonn: getKjonn(),
        navn: getMockNavn(fodselsnummer),
        status: getStatus(),
        ident: getIdent(fodselsnummer),
        brukerinfo: brukerinfo
    };
}

function getPostadresse(): string {
    return `${faker.address.streetAddress(true)} ${faker.address.city()} ${faker.address.country()}`;
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

function getKjonn(): Kodeverk {
    if (vektetSjanse(faker, 0.5)) {
        return {
            kodeRef: 'M',
            beskrivelse: 'Mann'
        };
    } else {
        return {
            kodeRef: 'K',
            beskrivelse: 'Kvinne'
        };
    }
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

export function mockStaticPersonsokResponse(): PersonsokResponse[] {
    return [
        {
            diskresjonskode: {
                kodeRef: '6',
                beskrivelse: 'Kode 6'
            },
            bostedsadresse: null,
            postadresse: 'Gate 1 1234 Oslo Norge',
            kjonn: {
                kodeRef: 'M',
                beskrivelse: 'Mann'
            },
            navn: aremark.navn,
            status: {
                kodeRef: 'A',
                beskrivelse: 'Aktiv'
            },
            ident: {
                ident: aremark.fødselsnummer,
                type: {
                    kodeRef: 'F',
                    beskrivelse: 'Fødsesnummer'
                }
            },
            brukerinfo: {
                ansvarligEnhet: '1234',
                gjeldendePostadresseType: {
                    kodeRef: 'P',
                    beskrivelse: 'Postadresse'
                },
                midlertidigPostadresse: 'Svingen 3 4321 Bergen'
            }
        },
        {
            diskresjonskode: null,
            bostedsadresse: 'Solgaten 1, Reykjavik',
            postadresse: null,
            kjonn: {
                kodeRef: 'K',
                beskrivelse: 'Kvinne'
            },
            navn: moss.navn,
            status: {
                kodeRef: 'A',
                beskrivelse: 'Aktiv'
            },
            ident: {
                ident: moss.fødselsnummer,
                type: {
                    kodeRef: 'F',
                    beskrivelse: 'Fødsesnummer'
                }
            },
            brukerinfo: {
                ansvarligEnhet: '1234',
                gjeldendePostadresseType: {
                    kodeRef: 'P',
                    beskrivelse: 'Postadresse'
                },
                midlertidigPostadresse: '23rd street New York USA'
            }
        }
    ];
}
