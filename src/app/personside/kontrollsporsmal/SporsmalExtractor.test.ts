import { hentEpost, hentFødselsdatoBarn, hentGiftedato } from './SporsmalExtractors';
import { Familierelasjon, Person, Relasjonstype, SivilstandTyper } from '../../../models/person/person';
import { aremark } from '../../../mock/person/aremark';
import { getPersonstatus } from '../../../mock/person/personMock';
import { Diskresjonskoder } from '../../../konstanter';
import { KRRKontaktinformasjon } from '../../../models/kontaktinformasjon';

describe('hentGiftedato', () => {
    const GIFTEDATO = '11.11.2011';

    it('Gir korrekt navn og dato', () => {
        let person = lagMockGiftPerson();
        const korrektTekst = GIFTEDATO + ' (Aremark Sin Ektefelle)';

        const tekst = hentGiftedato(person);

        expect(tekst).toBe(korrektTekst);
    });

    it('Gir tom hvis person ikke sivilstand gift', () => {
        let person = {
            ...lagMockGiftPerson(),
            sivilstand: {
                ...lagMockGiftPerson().sivilstand,
                kodeRef: SivilstandTyper.Enke
            }
        };
        const korrektTekst = '';

        const tekst = hentGiftedato(person);

        expect(tekst).toBe(korrektTekst);
    });

    it('Gir tom dato hvis TPS nulldato', () => {
        let person = {
            ...lagMockGiftPerson(),
            sivilstand: {
                ...lagMockGiftPerson().sivilstand,
                fraOgMed: '9999-01-01'
            }
        };
        const korrektTekst = '';

        const tekst = hentGiftedato(person);

        expect(tekst).toBe(korrektTekst);
    });

    it('Gir tomt navn hvis ikke partner navn', () => {
        let person = lagMockGiftPerson();
        person.familierelasjoner[0].tilPerson.navn = null;
        const korrektTekst = GIFTEDATO;

        const tekst = hentGiftedato(person);

        expect(tekst).toBe(korrektTekst);
    });

    it('Gir tom dato hvis partner har diskresjonskode', () => {
        let person = lagMockGiftPerson();
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
            lagMockBarn(),
            lagMockBarnOver21(),
            lagMockBarnAnnetBosted(),
            lagMockBarnDiskresjonskode(),
            LagMockBarnDød()
        ];

        const tekst = hentFødselsdatoBarn(person);

        expect(tekst).toEqual({ beskrivelse: 'Aremark Sitt Barn', tekst: '01.01.2001' });
    });

    it('Gir tom streng ved ingen barn', () => {
        let person = aremark;
        person.familierelasjoner = [];
        const korrektSvar = { tekst: '' };

        const tekst = hentFødselsdatoBarn(person);

        expect(tekst).toEqual(korrektSvar);
    });
});

describe('hentEpost', () => {
    it('Gir korrekt e-post', () => {
        const kontaktInformasjon: KRRKontaktinformasjon = {
            epost: {
                value: 'aremarksinmail@test.no',
                sistOppdatert: ''
            }
        };
        const korrektSvar = { tekst: 'aremarksinmail@test.no' };

        const tekst = hentEpost(kontaktInformasjon);

        expect(tekst).toEqual(korrektSvar);
    });

    it('Gir tom streng når reservert i KRR', () => {
        const kontaktInformasjon: KRRKontaktinformasjon = {
            epost: {
                value: 'aremarksinmail@test.no',
                sistOppdatert: ''
            },
            reservasjon: 'true'
        };
        const korrektSvar = { tekst: '' };

        const tekst = hentEpost(kontaktInformasjon);

        expect(tekst).toEqual(korrektSvar);
    });
});

function lagMockGiftPerson(): Person {
    let person = aremark;

    person.sivilstand = {
        fraOgMed: '2011-11-11',
        kodeRef: SivilstandTyper.Gift,
        beskrivelse: 'ubrukt'
    };

    person.familierelasjoner = [
        {
            tilPerson: {
                navn: {
                    sammensatt: 'Aremark Ektefelle',
                    fornavn: 'Aremark',
                    mellomnavn: 'Sin',
                    etternavn: 'Ektefelle'
                },
                personstatus: getPersonstatus(65)
            },
            rolle: Relasjonstype.Gift
        }
    ];

    return person;
}

function lagMockBarn(): Familierelasjon {
    return {
        rolle: Relasjonstype.Barn,
        harSammeBosted: true,
        tilPerson: {
            fødselsnummer: '01010150000',
            alder: 6,
            navn: {
                sammensatt: 'Aremark Barn',
                fornavn: 'Aremark',
                mellomnavn: 'Sitt',
                etternavn: 'Barn'
            },
            personstatus: {}
        }
    };
}

function lagMockBarnOver21(): Familierelasjon {
    let barn = lagMockBarn();
    barn.tilPerson.alder = 22;
    return barn;
}

function lagMockBarnAnnetBosted() {
    let barn = lagMockBarn();
    barn.harSammeBosted = false;
    return barn;
}

function lagMockBarnDiskresjonskode() {
    let barn = lagMockBarn();
    barn.tilPerson.diskresjonskode = {
        kodeRef: Diskresjonskoder.FORTROLIG_ADRESSE,
        beskrivelse: 'Sperret adresse, fortrolig'
    };
    return barn;
}

function LagMockBarnDød() {
    let barn = lagMockBarn();
    barn.tilPerson.personstatus.dødsdato = '2001-01-01';
    return barn;
}
