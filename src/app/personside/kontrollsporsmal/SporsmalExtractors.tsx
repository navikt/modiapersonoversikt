import {
    DigitalKontaktinformasjon,
    ForelderBarnRelasjon,
    Person,
    PersonStatus,
    SivilstandType
} from '../visittkort-v2/PersondataDomain';
import { shuffle } from './list-utils';
import { Svar } from '../../../redux/kontrollSporsmal/types';
import { formatertKontonummerString } from '../../../utils/FormatertKontonummer';
import { harDiskresjonskode, hentBarnUnder22, hentNavn, hentPartner } from '../visittkort-v2/visittkort-utils';

export interface SporsmalsExtractor<T> {
    sporsmal: string;
    extractSvar: (data: T) => Svar[];
}

export const personInformasjonSporsmal: SporsmalsExtractor<Person>[] = [
    {
        sporsmal: 'Hva er bankkontonummeret ditt?',
        extractSvar: (personinformasjon) => {
            const bankkonto = (personinformasjon as Person).bankkonto;
            return [
                {
                    tekst: bankkonto ? formatertKontonummerString(bankkonto.kontonummer) : ''
                }
            ];
        }
    },
    {
        sporsmal: 'Hva er fødselsdatoen til ditt barn _______',
        extractSvar: (personinformasjon) => {
            const person = personinformasjon as Person;
            return [hentFodselsdatoBarn(person)];
        }
    },
    {
        sporsmal: 'Hvilken dato giftet du deg?',
        extractSvar: (personinformasjon) => {
            const person = personinformasjon as Person;
            return [{ tekst: hentGiftedato(person) }];
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
        .filter((barn) => barn.personstatus.firstOrNull()?.kode !== PersonStatus.DOD);

    if (gyldigeBarn.isEmpty()) {
        return { tekst: '' };
    }

    const barnet = ettTilfeldigBarn(gyldigeBarn);

    return {
        tekst: barnet.fodselsdato.firstOrNull() || '',
        beskrivelse: hentNavn(barnet.navn.firstOrNull())
    };
}

function ettTilfeldigBarn(barn: ForelderBarnRelasjon[]): ForelderBarnRelasjon {
    return shuffle(barn)[0];
}

export function hentGiftedato(person: Person) {
    const sivilstand = person.sivilstand.firstOrNull();
    const partner = hentPartner(person.sivilstand);
    if (sivilstand?.type.kode !== SivilstandType.GIFT) {
        return '';
    }

    const dato = sivilstand.gyldigFraOgMed;
    if (!dato) {
        return '';
    }

    if (
        partner?.sivilstandRelasjon?.adressebeskyttelse &&
        harDiskresjonskode(partner?.sivilstandRelasjon?.adressebeskyttelse)
    ) {
        return '';
    }

    const partnerNavn = partner?.sivilstandRelasjon?.navn
        ? hentNavn(partner?.sivilstandRelasjon?.navn.firstOrNull())
        : '';
    return `${dato} (${partnerNavn})`;
}

export function hentEpost(kontaktinformasjon: DigitalKontaktinformasjon) {
    if (kontaktinformasjon.reservasjon === 'true') {
        return { tekst: '' };
    }
    return { tekst: kontaktinformasjon.epostadresse?.value ? kontaktinformasjon.epostadresse.value : '' };
}
