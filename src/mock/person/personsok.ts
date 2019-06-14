import {
    Brukerinfo,
    MidlertidigAdresse,
    MidlertidigAdressetype,
    NorskIdent,
    PersonsokRequest,
    PersonsokResponse,
    StrukturertAdresse,
    UstrukturertAdresse
} from '../../models/person/personsok';
import { aremark } from './aremark';
import { moss } from './moss';
import faker from 'faker/locale/nb_NO';

import navfaker from 'nav-faker/dist/index';
import { Kodeverk } from '../../models/kodeverk';
import { fyllRandomListe, vektetSjanse } from '../utils/mock-utils';
import { getMockNavn } from './personMock';

export function mockPersonsokResponse(request: PersonsokRequest): PersonsokResponse[] {
    faker.seed(Number(aremark.fødselsnummer));
    navfaker.seed(aremark.fødselsnummer);

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

function getPostadresse(): UstrukturertAdresse {
    const landkode = vektetSjanse(faker, 0.5) ? getLandkode() : null;
    return {
        landkode: landkode,
        adresselinje1: faker.address.streetAddress(true),
        adresselinje2: faker.address.city(),
        adresselinje3: faker.address.country(),
        adresselinje4: null
    };
}

function getBostedsadresse(): StrukturertAdresse {
    const landkode = vektetSjanse(faker, 0.5) ? getLandkode() : null;

    return {
        landkode: landkode,
        tilleggsadresse: faker.address.streetAddress(true),
        tilleggsadresseType: 'Gateadresse'
    };
}

function getDiskresjonskode(): Kodeverk {
    return {
        kodeRef: '6',
        beskrivelse: 'Kode 6'
    };
}

function getLandkode(): Kodeverk {
    return {
        kodeRef: faker.address.countryCode(),
        beskrivelse: faker.address.country()
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
    const midlertidigAdresse = vektetSjanse(faker, 0.5) ? getMidlertidigAdresse() : null;

    return {
        ansvarligEnhet: '1234',
        gjeldendePostadresseType: {
            kodeRef: 'P',
            beskrivelse: 'Postadresse'
        },
        midlertidigPostadresse: midlertidigAdresse
    };
}

function getMidlertidigAdresse(): MidlertidigAdresse {
    return {
        type: MidlertidigAdressetype.PostadresseNorge,
        ustrukturertAdresse: getPostadresse()
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
            postadresse: {
                landkode: null,
                adresselinje1: 'Gate 1',
                adresselinje2: '1234 Oslo',
                adresselinje3: 'Norge',
                adresselinje4: null
            },
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
                midlertidigPostadresse: {
                    type: MidlertidigAdressetype.PostadresseNorge,
                    ustrukturertAdresse: {
                        landkode: null,
                        adresselinje1: 'Svingen 3',
                        adresselinje2: '4321 Bergen',
                        adresselinje3: null,
                        adresselinje4: null
                    }
                }
            }
        },
        {
            diskresjonskode: null,
            bostedsadresse: {
                landkode: {
                    kodeRef: '123',
                    beskrivelse: 'Island'
                },
                tilleggsadresse: 'Solgaten 1, Reykjavik',
                tilleggsadresseType: 'Gateadresse'
            },
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
                midlertidigPostadresse: {
                    type: MidlertidigAdressetype.PostadresseUtland,
                    ustrukturertAdresse: {
                        landkode: null,
                        adresselinje1: '23rd street',
                        adresselinje2: 'New York',
                        adresselinje3: 'USA',
                        adresselinje4: null
                    }
                }
            }
        }
    ];
}
