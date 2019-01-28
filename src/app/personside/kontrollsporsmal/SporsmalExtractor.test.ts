import {
    formatterGateadresse,
    formatterMatrikkeladresse,
    formatterPostboksadresse,
    formatterUstrukturertAdresse,
    formatterUtenlandsadresse,
    hentFødselsdatoBarn,
    hentGiftedato
} from './SporsmalExtractors';
import {
    Gateadresse,
    Matrikkeladresse,
    Postboksadresse,
    UstrukturertAdresse,
    Utlandsadresse
} from '../../../models/personadresse';
import { Familierelasjon, Person, Relasjonstype, SivilstandTyper } from '../../../models/person/person';
import { aremark } from '../../../mock/person/aremark';
import { getPersonstatus } from '../../../mock/person/personMock';
import { Diskresjonskoder } from '../../../konstanter';

describe('formaterGateAdresse', () => {
    it('Gir riktig formattert adresse med alle felter', () => {
            const gateAdresse = hentGateAdresse();
            const korrektFormattering =
                '09.11.2016 - 31.10.2017\n' +
                'tilleggsadresse\n' +
                'gatenavn husnummerhusbokstav\n' +
                'bolignummer\n' +
                'postnummer poststed';

            const adresseTekst = formatterGateadresse(gateAdresse);

            expect(adresseTekst).toBe(korrektFormattering);
        }
    );

    it('Gir riktig formattert, mangler tilleggsadresse, bolignummer, periode og husbokstav', () => {
        const gateAdresse = hentGateAdresse();
        gateAdresse.tilleggsadresse = undefined;
        gateAdresse.bolignummer = undefined;
        gateAdresse.periode = undefined;
        gateAdresse.husbokstav = undefined;
        const korrektFormattering =
            'gatenavn husnummer\n' +
            'postnummer poststed';

        const adresseTekst = formatterGateadresse(gateAdresse);

        expect(adresseTekst).toBe(korrektFormattering);
    });
});

describe('formaterMatrikkeladresse', () => {
    it('Gir riktig formattert adresse med alle felter', () => {
        const matrikkelAdresse = hentMatrikkeladresse();
        const korrektFormattering =
            '09.11.2016 - 31.10.2017\n' +
            'tilleggsadresse\n' +
            'eiendomsnavn\n' +
            'postnummer poststed';

        const adresseTekst = formatterMatrikkeladresse(matrikkelAdresse);

        expect(adresseTekst).toBe(korrektFormattering);
    });

    it('Gir riktig formattert adresse, mangler tilleggsadresse, eiendomsnavn og periode', () => {
        const matrikkeladresse = hentMatrikkeladresse();
        matrikkeladresse.tilleggsadresse = undefined;
        matrikkeladresse.eiendomsnavn = undefined;
        matrikkeladresse.periode = undefined;
        const korrektFormattering =
            'postnummer poststed';

        const adresseTekst = formatterMatrikkeladresse(matrikkeladresse);

        expect(adresseTekst).toBe(korrektFormattering);
    });
});

describe('formatterPostboksadresse', () => {
    it('Gir riktig formattert adresse med alle felter', () => {
        const postboksadresse = hentPostboksadresse();
        const korrektFormattering =
            '09.11.2016 - 31.10.2017\n' +
            'tilleggsadresse\n' +
            'postboksanlegg, postboksnummer postboksnummer\n' +
            'postnummer poststed';

        const adresseTekst = formatterPostboksadresse(postboksadresse);

        expect(adresseTekst).toBe(korrektFormattering);
    });

    it('Gir riktig formattert, mangler tilleggsadresse, postboksanlegg og periode', () => {
        const postboksAdresse = hentPostboksadresse();
        postboksAdresse.tilleggsadresse = undefined;
        postboksAdresse.postboksanlegg = undefined;
        postboksAdresse.periode = undefined;
        const korrektFormattering =
            'Postboksnummer postboksnummer\n' +
            'postnummer poststed';

        const adresseTekst = formatterPostboksadresse(postboksAdresse);

        expect(adresseTekst).toBe(korrektFormattering);
    });
});

describe('formatterUtenlandsadresse', () => {
    it('Gir riktig formattert adresse med alle felter', () => {
        const utenlandsAdresse = hentUtenlandsadresse();
        const korrektFormattering =
            '09.11.2016 - 31.10.2017\n' +
            'linje 1\n' +
            'linje 2\n' +
            'linje 3\n' +
            'landkodeBeskrivelse';

        const adressetekst = formatterUtenlandsadresse(utenlandsAdresse);

        expect(adressetekst).toBe(korrektFormattering);
    });

    it('Gir riktig formattert, mangler periode, linje 2 og 3 og landkodebeskrivelse', () => {
        const utenlandsAdresse: Utlandsadresse = {
            adresselinjer: ['linje 1']
        };
        const korrektFormattering =
            'linje 1';

        const adresseTekst = formatterUtenlandsadresse(utenlandsAdresse);

        expect(adresseTekst).toBe(korrektFormattering);
    });
});

describe('formatterUstrukturertAdresse', () => {
    it('Gir korrekt formattering', () => {
        const ustrukturertAdresse: UstrukturertAdresse = {adresselinje: 'Adresselinje'};
        const korrektFormattering = 'Adresselinje';

        const adresseTekst = formatterUstrukturertAdresse(ustrukturertAdresse);

        expect(adresseTekst).toBe(korrektFormattering);
    });
});

describe('hentGiftedato', () => {
    const GIFTEDATO = '11.11.2011';

    it('Gir tom hvis person ikke sivilstand gift', () => {
        let person = hentGiftPerson();
        person.sivilstand.kodeRef = SivilstandTyper.Enke;
        const korrektTekst = '';

        const tekst = hentGiftedato(person);

        expect(tekst).toBe(korrektTekst);
    });

    it('Gir tom dato hvis TPS nulldato', () => {
        let person = hentGiftPerson();
        person.sivilstand.fraOgMed = '9999-01-01';
        const korrektTekst = '';

        const tekst = hentGiftedato(person);

        expect(tekst).toBe(korrektTekst);
    });

    it('Gir tomt navn hvis ikke partner navn', () => {
        let person = hentGiftPerson();
        person.familierelasjoner[0].tilPerson.navn = null;
        const korrektTekst = GIFTEDATO;

        const tekst = hentGiftedato(person);

        expect(tekst).toBe(korrektTekst);
    });

    it('Gir tom dato hvis partner har diskresjonskode', () => {
        let person = hentGiftPerson();
        person.familierelasjoner[0].tilPerson.diskresjonskode = {
            kodeRef: Diskresjonskoder.STRENGT_FORTROLIG_ADRESSE,
            beskrivelse: 'ubrukt'
        };
        const korrektTekst = '';

        const tekst = hentGiftedato(person);

        expect(tekst).toBe(korrektTekst);
    });
});

describe('hentFødselsdatoBarn', () => {
    it('Filtrerer ut: barn over 21, ikke samme bosted, har diskresjonskode og er død', () => {
        let person = aremark;
        person.familierelasjoner = [
            hentBarn(),
            hentBarn(),
            hentBarnOver21(),
            hentBarnAnnetBosted(),
            hentBarnDiskresjonskode(),
            hentBarnDød()
        ];

        const tekst = hentFødselsdatoBarn(person);

        expect(tekst).toEqual('Aremark Barn:  1.0.2001\nAremark Barn:  1.0.2001');
    });

    it('Gir tom streng ved ingen barn', () => {
        let person = aremark;
        person.familierelasjoner = [];
        const korrektTekst = '';

        const tekst = hentFødselsdatoBarn(person);

        expect(tekst).toBe(korrektTekst);
    });
});

function hentGateAdresse(): Gateadresse {
    return {
        tilleggsadresse: 'tilleggsadresse',
        gatenavn: 'gatenavn',
        husnummer: 'husnummer',
        husbokstav: 'husbokstav',
        postnummer: 'postnummer',
        poststed: 'poststed',
        bolignummer: 'bolignummer',
        periode: {
            fra: '2016-11-09',
            til: '2017-10-31'
        }
    };
}

function hentMatrikkeladresse(): Matrikkeladresse {
    return {
        tilleggsadresse: 'tilleggsadresse',
        eiendomsnavn: 'eiendomsnavn',
        postnummer: 'postnummer',
        poststed: 'poststed',
        periode: {
            fra: '2016-11-09',
            til: '2017-10-31'
        }
    };

}

function hentPostboksadresse(): Postboksadresse {
    return {
        postboksnummer: 'postboksnummer',
        postnummer: 'postnummer',
        poststed: 'poststed',
        tilleggsadresse: 'tilleggsadresse',
        postboksanlegg: 'postboksanlegg',
        periode: {
            fra: '2016-11-09',
            til: '2017-10-31'
        }
    };
}

function hentUtenlandsadresse(): Utlandsadresse {
    return {
        landkode: {
            kodeRef: 'landkodeRef',
            beskrivelse: 'landkodeBeskrivelse'
        },
        adresselinjer: [
            'linje 1',
            'linje 2',
            'linje 3'
        ],
        periode: {
            fra: '2016-11-09',
            til: '2017-10-31'
        }
    };
}

function hentGiftPerson(): Person {
    let person = aremark;

    person.sivilstand = {
        fraOgMed: '2011-11-11',
        kodeRef: SivilstandTyper.Gift,
        beskrivelse: 'ubrukt'
    };

    person.familierelasjoner = [{
        tilPerson: {
            navn: {
                sammensatt: 'Aremarks Ektefelle',
                fornavn: null,
                mellomnavn: null,
                etternavn: null,

            },
            personstatus: getPersonstatus(65)
        },
        rolle: Relasjonstype.Gift
    }];

    return person;
}

function hentBarn(): Familierelasjon {
    return {
        rolle: Relasjonstype.Barn,
        harSammeBosted: true,
        tilPerson: {
            fødselsnummer: '01010150000',
            alder: 6,
            navn: {
                sammensatt: 'Aremark Barn',
                fornavn: null,
                mellomnavn: null,
                etternavn: null
            },
            personstatus: {}
        }
    };
}

function hentBarnOver21(): Familierelasjon {
    let barn = hentBarn();
    barn.tilPerson.alder = 22;
    return barn;
}

function hentBarnAnnetBosted() {
    let barn = hentBarn();
    barn.harSammeBosted = false;
    return barn;
}

function hentBarnDiskresjonskode() {
    let barn = hentBarn();
    barn.tilPerson.diskresjonskode = {
        kodeRef: Diskresjonskoder.FORTROLIG_ADRESSE,
        beskrivelse: 'Sperret adresse, fortrolig'
    };
    return barn;
}

function hentBarnDød() {
    let barn = hentBarn();
    barn.tilPerson.personstatus.dødsdato = '2001-01-01';
    return barn;
}