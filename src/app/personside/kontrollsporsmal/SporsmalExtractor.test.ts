import { aremark, hentBarnAremark } from '../../../mock/persondata/aremark';
import {
    AdresseBeskyttelse,
    DigitalKontaktinformasjon,
    ForelderBarnRelasjon,
    KodeBeskrivelse,
    LocalDate,
    Person,
    PersonStatus,
    SivilstandType
} from '../visittkort-v2/PersondataDomain';
import { hentEpost, hentFodselsdatoBarn, hentGiftedato } from './SporsmalExtractors';

describe('hentGiftedato', () => {
    const GIFTEDATO = '11.11.2011';

    it('Gir korrekt navn og dato', () => {
        let person = lagMockGiftPerson();
        const korrektTekst = GIFTEDATO + ' (Aremark Sin Ektefelle)';

        const tekst = hentGiftedato(person);

        expect(tekst).toBe(korrektTekst);
    });

    it('Gir tom hvis person ikke sivilstand gift', () => {
        let person = lagMockGiftPerson({
            kode: SivilstandType.ENKE_ELLER_ENKEMANN,
            beskrivelse: 'Enke eller enkemann'
        });
        const korrektTekst = '';

        const tekst = hentGiftedato(person);

        expect(tekst).toBe(korrektTekst);
    });

    it('Gir ukjent navn hvis ikke partner navn', () => {
        let person = lagMockGiftPerson();
        person.sivilstand[0].sivilstandRelasjon!!.navn = [];
        const korrektTekst = GIFTEDATO + ' (Ukjent navn)';

        const tekst = hentGiftedato(person);

        expect(tekst).toBe(korrektTekst);
    });

    it('Gir tom dato hvis partner har diskresjonskode', () => {
        let person = lagMockGiftPerson();
        person.sivilstand[0].sivilstandRelasjon!!.adressebeskyttelse = [
            {
                kode: AdresseBeskyttelse.KODE6,
                beskrivelse: 'Sperret adresse, strengt fortrolig'
            }
        ];
        const korrektTekst = '';

        const tekst = hentGiftedato(person);

        expect(tekst).toBe(korrektTekst);
    });
});

describe('hentFødselsdatoBarn', () => {
    it('Spørsmål om  barn retunerers der barn ', () => {
        let person = aremark;
        person.forelderBarnRelasjon[0].navn = [
            {
                fornavn: 'Aremark',
                mellomnavn: 'Sitt',
                etternavn: 'Barn'
            }
        ];
        person.forelderBarnRelasjon[0].fodselsdato = ['2001-01-01' as LocalDate];
        person.forelderBarnRelasjon[0].harSammeAdresse = true;

        const tekst = hentFodselsdatoBarn(person);

        expect(tekst).toEqual({ beskrivelse: 'Aremark Sitt Barn', tekst: '01.01.2001' });
    });

    it('Barn over 21 skal ikke returnerest', () => {
        let person = aremark;
        person.forelderBarnRelasjon = lagMockBarnOver21();
        const korrektSvar = { tekst: '' };
        const tekst = hentFodselsdatoBarn(person);

        expect(tekst).toEqual(korrektSvar);
    });

    it('barn med annet bosted skal ikke returneres', () => {
        let person = aremark;
        person.forelderBarnRelasjon = lagMockBarnAnnetBosted();
        const korrektSvar = { tekst: '' };
        const tekst = hentFodselsdatoBarn(person);

        expect(tekst).toEqual(korrektSvar);
    });
    it('barn med diskresjonskode skal ikke returneres', () => {
        let person = aremark;
        person.forelderBarnRelasjon = lagMockBarnDiskresjonskode();
        const korrektSvar = { tekst: '' };
        const tekst = hentFodselsdatoBarn(person);

        expect(tekst).toEqual(korrektSvar);
    });
    it('barn med dødsdato skal ikke returneres', () => {
        let person = aremark;
        person.forelderBarnRelasjon = LagMockBarnDød();
        const korrektSvar = { tekst: '' };
        const tekst = hentFodselsdatoBarn(person);

        expect(tekst).toEqual(korrektSvar);
    });

    it('Gir tom streng ved ingen barn', () => {
        let person = aremark;
        person.forelderBarnRelasjon = [];
        const korrektSvar = { tekst: '' };

        const tekst = hentFodselsdatoBarn(person);

        expect(tekst).toEqual(korrektSvar);
    });
});

describe('hentEpost', () => {
    it('Gir korrekt e-post', () => {
        const kontaktInformasjon: DigitalKontaktinformasjon = {
            personident: '10108000398',
            reservasjon: 'false',
            epostadresse: {
                value: 'aremarksinmail@test.no',
                sistOppdatert: null,
                sistVerifisert: '2013-01-01' as LocalDate
            },
            mobiltelefonnummer: null
        };
        const korrektSvar = { tekst: 'aremarksinmail@test.no' };

        const tekst = hentEpost(kontaktInformasjon);

        expect(tekst).toEqual(korrektSvar);
    });

    it('Gir tom streng når reservert i KRR', () => {
        const kontaktInformasjon: DigitalKontaktinformasjon = {
            personident: '10108000398',
            reservasjon: 'true',
            epostadresse: {
                value: 'epost@nav.no',
                sistOppdatert: null,
                sistVerifisert: '2013-01-01' as LocalDate
            },
            mobiltelefonnummer: null
        };
        const korrektSvar = { tekst: '' };

        const tekst = hentEpost(kontaktInformasjon);

        expect(tekst).toEqual(korrektSvar);
    });
});

function lagMockGiftPerson(
    sivilstandType: KodeBeskrivelse<SivilstandType> = {
        kode: SivilstandType.GIFT,
        beskrivelse: 'Gift'
    }
): Person {
    let person = aremark;

    person.sivilstand = [
        {
            gyldigFraOgMed: '2011-11-11' as LocalDate,
            type: sivilstandType,
            sivilstandRelasjon: {
                fnr: '12345555555',
                navn: [
                    {
                        fornavn: 'Aremark',
                        mellomnavn: 'Sin',
                        etternavn: 'Ektefelle'
                    }
                ],
                alder: 40,
                adressebeskyttelse: [
                    {
                        kode: AdresseBeskyttelse.UGRADERT,
                        beskrivelse: 'UGRADERT'
                    }
                ],
                harSammeAdresse: true
            }
        }
    ];

    return person;
}

function lagMockBarnOver21(): ForelderBarnRelasjon[] {
    let barn = hentBarnAremark();
    barn[0].alder = 22;
    return barn;
}

function lagMockBarnAnnetBosted(): ForelderBarnRelasjon[] {
    let barn = hentBarnAremark();
    barn[0].harSammeAdresse = false;
    return barn;
}

function lagMockBarnDiskresjonskode() {
    let barn = hentBarnAremark();
    barn[0].adressebeskyttelse = [
        {
            kode: AdresseBeskyttelse.KODE6,
            beskrivelse: 'Sperret adresse, strengt fortrolig'
        }
    ];
    return barn;
}

function LagMockBarnDød() {
    let barn = hentBarnAremark();
    barn[0].personstatus = [
        {
            kode: PersonStatus.DOD,
            beskrivelse: 'DØD'
        }
    ];
    return barn;
}
