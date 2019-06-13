import { MidlertidigAdressetype, PersonsokResponse } from '../../models/person/personsok';
import { aremark } from './aremark';
import { moss } from './moss';

export function mockStaticPersonsokResponse(): PersonsokResponse[] {
    return [
        {
            diskresjonskode: {
                kodeRef: '6',
                beskrivelse: 'Kode 6'
            },
            postadresse: {
                adresselinje1: 'Gate 1',
                adresselinje2: '1234 Oslo',
                adresselinje3: 'Norge'
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
                        adresselinje1: 'Svingen 3',
                        adresselinje2: '4321 Bergen'
                    }
                }
            }
        },
        {
            bostedsadresse: {
                landkode: {
                    kodeRef: '123',
                    beskrivelse: 'Island'
                },
                tilleggsadresse: 'Solgaten 1, Reykjavik',
                tilleggsadresseType: 'Gateadresse'
            },
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
                        adresselinje1: '23rd street',
                        adresselinje2: 'New York',
                        adresselinje3: 'USA'
                    }
                }
            }
        }
    ];
}
