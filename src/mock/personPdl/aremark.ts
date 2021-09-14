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
import { getAremarkVerge } from './vergemalMock';
import { DigitalKontaktinformasjon } from '../../models/personPdl/digitalKontaktinformasjon';
import { Fullmakt, FullmaktsRolle } from '../../models/personPdl/fullmakt';
import { DeltBosted } from '../../models/personPdl/deltBosted';
import { Dodsbo, Skifteform } from '../../models/personPdl/dodsbo';
import { Bankkonto } from '../../models/personPdl/bankkonto';

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

export const deltBostedAremark: DeltBosted = {
    startdatoForKontrakt: new Date('1990-10-10'),
    sluttdatoForKontrakt: new Date('2005-05-07'),
    adresse: {
        linje1: `Adresseveien 1`,
        linje2: '0000 Aremark',
        linje3: null
    }
};

export const dodsboAremark: Dodsbo = {
    adressat: {
        advokatSomAdressat: {
            kontaktperson: {
                fornavn: 'Advokat',
                mellomnavn: null,
                etternavn: 'Navnesen'
            },
            organisasjonsnavn: 'Advokatkontoret Aremark',
            organisasjonsnummer: '01234567891011'
        },
        organisasjonSomAdressat: null,
        personSomAdressat: null
    },
    adresse: {
        linje1: 'Elgelia 20, 0000 Aremark',
        linje2: null,
        linje3: null
    },
    registrert: new Date('2020-02-02'),
    skifteform: Skifteform.Offentlig
};

export const bankkontoAremark: Bankkonto = {
    kontonummer: '1234567890',
    banknavn: 'DNB ASA',
    sistEndret: new Date(),
    sistEndretAv: '1010800 BD03',

    bankkode: null,
    swift: 'DNBANOKKXXX',
    landkode: null,
    adresse: {
        linje1: 'Bankveien 1,',
        linje2: '0357 Bankestad',
        linje3: null
    },
    valuta: {
        kode: 'NOK',
        beskrivelse: 'Norske kroner'
    }
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
    deltBosted: [deltBostedAremark],
    dodsbo: [dodsboAremark],
    fullmakt: [fullmaktAremark],
    vergemal: getAremarkVerge(),
    tilrettelagtKommunikasjon: tilrettelagtKommunikasjonAremark,
    telefonnummer: [telefonAremark],
    kontaktOgReservasjon: digitalKontaktInformasjonAremark,
    bankkonto: bankkontoAremark
};
