import {
    DigitalKontaktinformasjon,
    ForelderBarnRelasjon,
    Person
} from '../visittkort-v2/PersondataDomain';
import { shuffle } from './list-utils';
import { Svar } from '../../../redux/kontrollSporsmal/types';
import { formatertKontonummerString } from '../../../utils/FormatertKontonummer';
import { erPartner, harDiskresjonskode, hentBarnUnder22, hentNavn } from '../visittkort-v2/visittkort-utils';
import { formatterDato } from '../../../utils/date-utils';

export interface SporsmalsExtractor<T> {
    sporsmal: string;
    extractSvar: (data: T) => Svar[];
}

export const personInformasjonSporsmal: SporsmalsExtractor<Person>[] = [
    {
        sporsmal: 'Hva er bankkontonummeret ditt?',
        extractSvar: (personinformasjon) => {
            const bankkonto = personinformasjon.bankkonto;
            return [
                {
                    tekst: bankkonto ? formatertKontonummerString(bankkonto.kontonummer) : ''
                }
            ];
        }
    },
    {
        sporsmal: 'Hva er fødselsdatoen til ditt barn?',
        extractSvar: (personinformasjon) => {
            return [hentFodselsdatoBarn(personinformasjon)];
        }
    },
    {
        sporsmal: 'Hvilken dato giftet du deg?',
        extractSvar: (personinformasjon) => {
            return [{ tekst: hentGiftedato(personinformasjon) }];
        }
    }
];

export const kontaktInformasjonSporsmal: SporsmalsExtractor<DigitalKontaktinformasjon>[] = [
    {
        sporsmal: 'Hva er din e-post adresse?',
        extractSvar: (kontaktinformasjon) => {
            return [hentEpost(kontaktinformasjon)];
        }
    }
];

export function hentFodselsdatoBarn(person: Person): Svar {
    const gyldigeBarn = hentBarnUnder22(person.forelderBarnRelasjon)
        .filter((barn) => !harDiskresjonskode(barn.adressebeskyttelse))
        .filter((barn) => barn.harSammeAdresse)
        .filter((barn) => barn.dodsdato.isEmpty());

    if (gyldigeBarn.isEmpty()) {
        return { tekst: '' };
    }

    const barnet = ettTilfeldigBarn(gyldigeBarn);

    return {
        tekst: formatterDato(barnet.fodselsdato.firstOrNull() || ''),
        beskrivelse: hentNavn(barnet.navn.firstOrNull())
    };
}

function ettTilfeldigBarn(barn: ForelderBarnRelasjon[]): ForelderBarnRelasjon {
    return shuffle(barn)[0];
}

export function hentGiftedato(person: Person) {
    const sivilstand = person.sivilstand.firstOrNull();
    if (!sivilstand || !erPartner(sivilstand)) {
        return '';
    }

    const dato = formatterDato(sivilstand.gyldigFraOgMed?.toString() || '');
    if (!dato) {
        return '';
    }

    if (
        sivilstand?.sivilstandRelasjon?.adressebeskyttelse &&
        harDiskresjonskode(sivilstand?.sivilstandRelasjon?.adressebeskyttelse)
    ) {
        return '';
    }

    const partnerNavn = sivilstand?.sivilstandRelasjon?.navn
        ? hentNavn(sivilstand?.sivilstandRelasjon?.navn.firstOrNull())
        : '';
    return `${dato} (${partnerNavn})`;
}

export function hentEpost(kontaktinformasjon: DigitalKontaktinformasjon) {
    if (kontaktinformasjon.reservasjon === 'true') {
        return { tekst: '' };
    }
    return { tekst: kontaktinformasjon.epostadresse?.value ? kontaktinformasjon.epostadresse.value : '' };
}
