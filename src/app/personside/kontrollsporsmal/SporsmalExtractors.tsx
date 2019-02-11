import {
    erDød,
    Familierelasjon,
    getBarnUnder21,
    getPartner,
    Person,
    PersonRespons,
    SivilstandTyper
} from '../../../models/person/person';
import { fødselsnummerTilDato } from 'nav-faker/dist/personidentifikator/helpers/fodselsdato-beregner';
import { KRRKontaktinformasjon } from '../../../models/kontaktinformasjon';
import * as personadresse from '../../../models/personadresse';
import { Gateadresse, Matrikkeladresse, Postboksadresse, Utlandsadresse } from '../../../models/personadresse';
import { Periode } from '../../../models/periode';
import { formaterDato } from '../../../utils/dateUtils';
import { shuffle } from '../../../utils/list-utils';
import { Svar } from '../../../redux/restReducers/kontrollSporsmal/types';
import moment = require('moment');

export interface SpørsmålsExtractor<T> {
    spørsmål: string;
    extractSvar: (data: T) => Svar[];
}

export const personInformasjonSpørsmål: SpørsmålsExtractor<PersonRespons>[] = [
    {
        spørsmål: 'Hva er bankkontonummeret ditt?',
        extractSvar: personinformasjon => {
            const bankkonto = (personinformasjon as Person).bankkonto;
            return [{
                tekst: bankkonto
                    ? bankkonto.kontonummer
                    : ''
            }];

        }
    },
    {
        spørsmål: 'Hva er mellomnavnet ditt?',
        extractSvar: personinformasjon => {
            const person = personinformasjon as Person;
            return [{
                tekst: person.navn.mellomnavn
                    ? person.navn.mellomnavn
                    : ''
            }];
        }
    },
    {
        spørsmål: 'Hva er fødselsdatoen til ditt barn _______',
        extractSvar: personinformasjon => {
            const person = personinformasjon as Person;
            return [hentFødselsdatoBarn(person)];

        }
    },
    {
        spørsmål: 'Hvilken dato giftet du deg?',
        extractSvar: personinformasjon => {
            const person = personinformasjon as Person;
            return [{tekst: hentGiftedato(person)}];
        }
    },
    {
        spørsmål: 'Hva er din adresse?',
        extractSvar: personinformasjon => {
            const person = personinformasjon as Person;
            return hentAdresse(person);
        }
    }
];

export const kontaktInformasjonSpørsmål: SpørsmålsExtractor<KRRKontaktinformasjon>[] = [
    {
        spørsmål: 'Hva er din e-post adresse?',
        extractSvar: kontaktinformasjon => {
            return [{
                tekst: kontaktinformasjon.epost
                    ? kontaktinformasjon.epost.value
                    : ''
            }];
        }
    }
];

export function hentFødselsdatoBarn(person: Person): Svar {
    const gyldigeBarn = getBarnUnder21(person.familierelasjoner)
        .filter(barn => barn.harSammeBosted)
        .filter(barn => !barn.tilPerson.diskresjonskode)
        .filter(barn => !erDød(barn.tilPerson.personstatus));

    if (gyldigeBarn.length === 0) {
        return {tekst: ''};
    }

    const barnet = ettTilfeldigBarn(gyldigeBarn);

    return {
        tekst: hentFødselsdato(barnet),
        beskrivelse: barnet.tilPerson.navn ? barnet.tilPerson.navn.sammensatt : undefined
    };
}

function hentFødselsdato(barn: Familierelasjon): string {
    if (barn.tilPerson.fødselsnummer) {
        return utledFødselsdato(barn.tilPerson.fødselsnummer);
    }
    return '';
}

function utledFødselsdato(fnr: string): string {
    const dato = fødselsnummerTilDato(fnr);
    return '' + dato.getDay() + '.' + dato.getMonth() + '.' + dato.getFullYear();
}

function ettTilfeldigBarn(barn: Familierelasjon[]): Familierelasjon {
    return shuffle(barn)[0];
}

export function hentGiftedato(person: Person) {
    if (person.sivilstand.kodeRef !== SivilstandTyper.Gift) {
        return '';
    }

    const dato = hentDato(person);
    if (dato === '') {
        return '';
    }

    if (partnerHarDiskresjonskode(person)) {
        return '';
    }
    const partnerNavn = hentPartnerNavn(person);
    return dato + partnerNavn;
}

function hentDato(person: Person): string {
    const relasjonFraOgMed = moment(person.sivilstand.fraOgMed).format('DD.MM.YYYY');
    const nullDatoFraTPS = '01.01.9999';

    if (relasjonFraOgMed === nullDatoFraTPS) {
        return '';
    }
    return relasjonFraOgMed;
}

function partnerHarDiskresjonskode(person: Person) {
    const partner = getPartner(person);
    return partner && partner.tilPerson.diskresjonskode;
}

function hentPartnerNavn(person: Person) {
    const partner = getPartner(person);
    if (!partner || !partner.tilPerson.navn) {
        return '';
    }
    return '  (' + partner.tilPerson.navn.sammensatt + ')';
}

function hentAdresse(person: Person) {
    let adresser: Svar[] = [];

    if (hentFolkeregistrertAdresse(person) !== '') {
        adresser.push({
            tekst: hentFolkeregistrertAdresse(person),
            beskrivelse: 'Folkeregistrert adresse'
        });
    }

    if (hentMidlertidigAdresse(person) !== '') {
        adresser.push({
            tekst: hentMidlertidigAdresse(person),
            beskrivelse: 'Midlertidig adresse'
        });
    }

    if (hentPostadresse(person) !== '') {
        adresser.push({
            tekst: hentPostadresse(person),
            beskrivelse: 'Postadresse'
        });
    }
    return adresser;
}

function hentFolkeregistrertAdresse(person: Person) {
    return person.folkeregistrertAdresse != null ? formatterRiktigAdresse(person.folkeregistrertAdresse) : '';
}

function hentMidlertidigAdresse(person: Person) {
    return person.alternativAdresse != null ? formatterRiktigAdresse(person.alternativAdresse) : '';
}

function hentPostadresse(person: Person) {
    return person.postadresse != null ? formatterRiktigAdresse(person.postadresse) : '';
}

export function formatterRiktigAdresse(adresse: personadresse.Personadresse) {
    let adressetekst = '';

    if (adresse.gateadresse != null) {
        adressetekst = formatterGateadresse(adresse.gateadresse);
    } else if (adresse.matrikkeladresse != null) {
        adressetekst = formatterMatrikkeladresse(adresse.matrikkeladresse);
    } else if (adresse.postboksadresse != null) {
        adressetekst = formatterPostboksadresse(adresse.postboksadresse);
    } else if (adresse.utlandsadresse != null) {
        adressetekst = formatterUtenlandsadresse(adresse.utlandsadresse);
    } else if (adresse.ustrukturert != null) {
        adressetekst = formatterUstrukturertAdresse(adresse.ustrukturert);
    }

    return adressetekst;
}

export function formatterGateadresse(adresse: personadresse.Gateadresse) {
    const gateadresse = adresse.gatenavn + ' ' + adresse.husnummer + (adresse.husbokstav || '') + '\n';
    const bolignummer = adresse.bolignummer ? adresse.bolignummer + '\n' : '';

    return hentPeriode(adresse.periode) +
        hentTilleggsadresse(adresse.tilleggsadresse) +
        gateadresse +
        bolignummer +
        hentPoststed(adresse);
}

export function formatterMatrikkeladresse(adresse: personadresse.Matrikkeladresse) {
    const eiendom = adresse.eiendomsnavn ? adresse.eiendomsnavn + '\n' : '';

    return hentPeriode(adresse.periode) +
        hentTilleggsadresse(adresse.tilleggsadresse) +
        eiendom +
        hentPoststed(adresse);
}

export function formatterPostboksadresse(adresse: personadresse.Postboksadresse) {
    return hentPeriode(adresse.periode) +
        hentTilleggsadresse(adresse.tilleggsadresse) +
        hentPostboksTekst(adresse.postboksanlegg, adresse.postboksnummer) +
        hentPoststed(adresse);
}

export function formatterUtenlandsadresse(adresse: personadresse.Utlandsadresse): string {
    const landKode = adresse.landkode && ('\n' + adresse.landkode.beskrivelse) || '';

    return hentPeriode(adresse.periode) +
        hentAdresselinjer(adresse) +
        landKode;
}

function hentAdresselinjer(adresse: Utlandsadresse) {
    return adresse.adresselinjer.reduce((acc, current) => acc + (acc !== '' ? '\n' : '') + current, '');
}

export function formatterUstrukturertAdresse(adresse: personadresse.UstrukturertAdresse) {
    return adresse.adresselinje;
}

function hentPoststed(adresse: Gateadresse | Matrikkeladresse | Postboksadresse) {
    return adresse.postnummer + ' ' + adresse.poststed;
}

function hentPeriode(periode?: Periode) {
    if (periode != null) {
        const fra = formaterDato(periode.fra);
        const til = formaterDato(periode.til);
        return fra + ' - ' + til + '\n';
    }
    return '';
}

function hentTilleggsadresse(tilleggsadresse?: string) {
    return tilleggsadresse ? tilleggsadresse + '\n' : '';
}

function hentPostboksTekst(postboksanlegg: string | undefined, postboksnummer: string) {
    if (postboksanlegg) {
        return postboksanlegg + ', postboksnummer ' + postboksnummer + '\n';
    } else {
        return 'Postboksnummer ' + postboksnummer + '\n';
    }
}