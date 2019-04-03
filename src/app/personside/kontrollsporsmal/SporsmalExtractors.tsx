import {
    erDød,
    Familierelasjon,
    getBarnUnder21,
    getNavn,
    getPartner,
    Person,
    PersonRespons,
    SivilstandTyper
} from '../../../models/person/person';
import { fødselsnummerTilDato } from 'nav-faker/dist/personidentifikator/helpers/fodselsdato-beregner';
import { KRRKontaktinformasjon } from '../../../models/kontaktinformasjon';
import { formaterDato } from '../../../utils/stringFormatting';
import { shuffle } from '../../../utils/list-utils';
import { Svar } from '../../../redux/kontrollSporsmal/types';
import moment from 'moment';
import { formatertKontonummerString } from '../../../utils/FormatertKontonummer';

export interface SpørsmålsExtractor<T> {
    spørsmål: string;
    extractSvar: (data: T) => Svar[];
}

export const personInformasjonSpørsmål: SpørsmålsExtractor<PersonRespons>[] = [
    {
        spørsmål: 'Hva er bankkontonummeret ditt?',
        extractSvar: personinformasjon => {
            const bankkonto = (personinformasjon as Person).bankkonto;
            return [
                {
                    tekst: bankkonto ? formatertKontonummerString(bankkonto.kontonummer) : ''
                }
            ];
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
            return [{ tekst: hentGiftedato(person) }];
        }
    }
];

export const kontaktInformasjonSpørsmål: SpørsmålsExtractor<KRRKontaktinformasjon>[] = [
    {
        spørsmål: 'Hva er din e-post adresse?',
        extractSvar: kontaktinformasjon => {
            return [hentEpost(kontaktinformasjon)];
        }
    }
];

export function hentFødselsdatoBarn(person: Person): Svar {
    const gyldigeBarn = getBarnUnder21(person.familierelasjoner)
        .filter(barn => barn.harSammeBosted)
        .filter(barn => !barn.tilPerson.diskresjonskode)
        .filter(barn => !erDød(barn.tilPerson.personstatus));

    if (gyldigeBarn.length === 0) {
        return { tekst: '' };
    }

    const barnet = ettTilfeldigBarn(gyldigeBarn);

    return {
        tekst: hentFødselsdato(barnet),
        beskrivelse: barnet.tilPerson.navn ? getNavn(barnet.tilPerson.navn) : undefined
    };
}

function hentFødselsdato(barn: Familierelasjon): string {
    if (barn.tilPerson.fødselsnummer) {
        return utledFødselsdato(barn.tilPerson.fødselsnummer);
    }
    return '';
}

function utledFødselsdato(fnr: string): string {
    return formaterDato(fødselsnummerTilDato(fnr));
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
    return ' (' + getNavn(partner.tilPerson.navn) + ')';
}

export function hentEpost(kontaktinformasjon: KRRKontaktinformasjon) {
    if (kontaktinformasjon.reservasjon === 'true') {
        return { tekst: '' };
    }
    return { tekst: kontaktinformasjon.epost ? kontaktinformasjon.epost.value : '' };
}
