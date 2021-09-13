import {
    Adresse,
    AdresseBeskyttelse,
    EgenAnsatt,
    Enhet,
    Kjonn,
    KodeBeskrivelse,
    Navn,
    Person,
    PersonStatus,
    Sikkerhetstiltak,
    SikkerhetstiltakType,
    Sivilstand,
    SivilstandType,
    Statsborgerskap,
    Telefon,
    TilrettelagtKommunikasjon
} from '../../models/personPdl/person';
import { getAremarkForeldreansvar } from './foreldreansvarMock';
import { getDeltBostedMock } from './deltBostedMock';
import * as faker from 'faker';
import { getMockDodsbo } from './dodsbo';
import navfaker from 'nav-faker/dist/index';
import { mockVergemal } from './vergemalMock';
import { DigitalKontaktinformasjon } from '../../models/personPdl/digitalKontaktinformasjon';
import { getBankKonto } from './bankkontoMock';
import { Fullmakt, FullmaktsRolle } from '../../models/personPdl/fullmakt';

export const navnAremark: Navn = {
    fornavn: 'TESTFAMILIEN',
    mellomnavn: null,
    etternavn: 'AREMARK'
};

export const kodeBeskrivelseKjonn: KodeBeskrivelse<Kjonn> = {
    kode: Kjonn.Mann,
    beskrivelse: 'Mann'
};

export const adresseAremark: Adresse = {
    linje1: 'Adresseveien 1, 0661 AREMARKSTAD',
    linje2: null,
    linje3: null
};

export const navEnhetAremark: Enhet = {
    id: '0000',
    navn: 'Nav-kontor'
};

export const statsborgerskapAremark: Statsborgerskap = {
    land: {
        kode: 'NOR',
        beskrivelse: 'Norsk statsborger'
    },
    gyldigFraOgMed: new Date('1980-10-10'),
    gyldigTilOgMed: null
};

export const adressebeskyttelseAremark: KodeBeskrivelse<AdresseBeskyttelse> = {
    kode: AdresseBeskyttelse.Ugradert,
    beskrivelse: 'Ingen'
};

export const sikkerhetstiltakAremark: Sikkerhetstiltak = {
    type: SikkerhetstiltakType.TelefoniskUtestengelse,
    gyldigFraOgMed: new Date('2005-02-13'),
    gyldigTilOgMed: new Date('2020-02-02')
};

export const personstatusAremark: KodeBeskrivelse<PersonStatus> = {
    kode: PersonStatus.Bosatt,
    beskrivelse: 'Bosatt i Norge'
};

export const sivilstandAremark: Sivilstand = {
    type: {
        kode: SivilstandType.Skilt,
        beskrivelse: 'Skilt'
    },
    gyldigFraOgMed: new Date('2010-03-06')
};

export const tilrettelagtKommunikasjonAremark: TilrettelagtKommunikasjon = {
    talesprak: [
        {
            kode: 'NO',
            beskrivelse: 'Norsk'
        }
    ],
    tegnsprak: [
        {
            kode: 'NO',
            beskrivelse: 'Norsk'
        }
    ]
};

export const telefonAremark: Telefon = {
    retningsnummer: {
        kode: '+47',
        beskrivelse: 'retningsnummer er norsk'
    },
    identifikator: '99009900',
    sistEndret: new Date('2017-10-10'),
    sistEndretAv: 'TESTFAMILIEN AREMARK',
    prioritet: 1
};

export const digitalKontaktInformasjonAremark: DigitalKontaktinformasjon = {
    personident: '10108000398',
    reservasjon: 'reservert',
    epostadresse: {
        value: null,
        sistOppdatert: null,
        sisVerifisert: new Date('2013-01-01')
    },
    mobiltelefonnummer: {
        value: null,
        sistOppdatert: null,
        sisVerifisert: null
    }
};

export const fullmaktAremark: Fullmakt = {
    motpartsPersonident: '123456789',
    motpartsPersonNavn: {
        fornavn: 'Navn',
        mellomnavn: null,
        etternavn: 'Navnesen'
    },
    motpartsRolle: FullmaktsRolle.Fullmektig,
    omraade: ['*'],
    gyldigFraOgMed: new Date('2019-01-01'),
    gyldigTilOgMed: new Date('2022-12-12')
};

export const aremark: Person = {
    fnr: '10108000398',
    navn: [navnAremark],
    kjonn: [kodeBeskrivelseKjonn],
    fodselsdato: [new Date('1980-10-10')],
    dodsdato: [],
    bostedAdresse: [adresseAremark],
    kontaktAdresse: [adresseAremark],
    navEnhet: navEnhetAremark,
    statsborgerskap: [statsborgerskapAremark],
    adressebeskyttelse: [adressebeskyttelseAremark],
    sikkerhetstiltak: [sikkerhetstiltakAremark],
    erEgenAnsatt: EgenAnsatt.Nei,
    personstatus: [personstatusAremark],
    sivilstand: [sivilstandAremark],
    foreldreansvar: [getAremarkForeldreansvar()],
    deltBosted: getDeltBostedMock(faker),
    dodsbo: getMockDodsbo(faker),
    fullmakt: [fullmaktAremark],
    vergemal: mockVergemal(navfaker.personIdentifikator.fødselsnummer()),
    tilrettelagtKommunikasjon: tilrettelagtKommunikasjonAremark,
    telefonnummer: [telefonAremark],
    kontaktOgReservasjon: digitalKontaktInformasjonAremark,
    bankkonto: getBankKonto()
};
