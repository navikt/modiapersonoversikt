import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    DodsboSkifteform,
    ForelderBarnRelasjonRolle,
    type PersonData,
    PersonDataFeilendeSystemer,
    SivilstandType
} from 'src/lib/types/modiapersonoversikt-api';
import { createPersonData } from 'src/test/createPersonData';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Barn from './Details/Familie/Barn';
import { ForelderBarnRelasjonVisning } from './Details/Familie/components';
import { ForelderBarnRelasjonVisningGammel } from './Details/Familie/componentsGammel';
import ForeldreansvarListe from './Details/Familie/ForeldreansvarListe';
import Sivilstand from './Details/Familie/Sivilstand';
import SivilstandGammel from './Details/Familie/SivilstandGammel';
import ForeldreAnsvar from './Details/ForeldreAnsvar';
import Fullmakter from './Details/Fullmakt';
import KontaktinformasjonDodsbo from './Details/KontaktInfo/Dodsbo';
import { Fullmakt } from './Details/Representasjon/Fullmakt';
import Vergemal from './Details/Representasjon/Vergemal';
import VergemalGammel from './Details/VergemalGammel';
import type { Skjulingsaarsak } from './skjulingsaarsak';

let person: PersonData;
let feilendeSystemer: PersonDataFeilendeSystemer[];

vi.mock('src/lib/clients/modiapersonoversikt-api', () => ({
    usePersonData: () => ({ data: { person, feilendeSystemer } })
}));

beforeEach(() => {
    person = createPersonData();
    feilendeSystemer = [];
});

function barn(skjulingsaarsak?: Skjulingsaarsak | null): PersonData['forelderBarnRelasjon'][number] {
    return {
        ident: null,
        rolle: ForelderBarnRelasjonRolle.BARN,
        navn: [],
        fodselsdato: [],
        kjonn: [],
        alder: null,
        adressebeskyttelse: [],
        harSammeAdresse: false,
        dodsdato: [],
        skjulingsaarsak
    };
}

const aarsaker: [Skjulingsaarsak, string][] = [
    ['MANGLER_TILGANG', 'Personopplysninger skjult'],
    ['UAVKLART', 'Personopplysninger kunne ikke hentes']
];

describe.each(aarsaker)('%s', (skjulingsaarsak, tekst) => {
    it.each([ForelderBarnRelasjonVisning, ForelderBarnRelasjonVisningGammel])(
        'beholder barn uten å utlede navn, alder, kjønn eller bosted fra tomme felt (%s)',
        (Komponent) => {
            render(<Komponent harFeilendeSystem relasjon={barn(skjulingsaarsak)} beskrivelse="Ukjent" erBarn />);
            expect(screen.getByText(/Barn/)).toBeInTheDocument();
            expect(screen.getByText(new RegExp(tekst))).toBeInTheDocument();
            expect(screen.queryByText(/Ukjent|Bor ikke med bruker|Feilet ved uthenting/)).not.toBeInTheDocument();
            expect(screen.queryByRole('button')).not.toBeInTheDocument();
        }
    );

    it.each([Sivilstand, SivilstandGammel])('beholder sivilstand og årsak selv ved PDL-feil (%s)', (Komponent) => {
        render(
            <Komponent
                harFeilendeSystem
                sivilstand={[
                    {
                        type: { kode: SivilstandType.GIFT, beskrivelse: 'Gift' },
                        sivilstandRelasjon: {
                            fnr: '',
                            navn: [],
                            adressebeskyttelse: [],
                            harSammeAdresse: false,
                            dodsdato: [],
                            skjulingsaarsak
                        }
                    }
                ]}
            />
        );
        expect(screen.getByText('Gift')).toBeInTheDocument();
        expect(screen.getByText(tekst)).toBeInTheDocument();
        expect(screen.queryByText(/Bor ikke med bruker|Ukjent|undefined|Feilet ved uthenting/)).not.toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('behandler partene i foreldreansvar separat', () => {
        person.foreldreansvar = [
            {
                ansvar: 'felles',
                ansvarlig: { navn: { fornavn: 'Test', etternavn: 'Forelder' }, ident: '01010112345' },
                ansvarsubject: { navn: null, ident: null, skjulingsaarsak }
            }
        ];
        render(<ForeldreansvarListe harFeilendeSystem foreldreansvar={person.foreldreansvar} />);
        expect(screen.getByText('Ansvarlig: Test Forelder')).toBeInTheDocument();
        expect(screen.getByText(`Gjelder for: ${tekst}`)).toBeInTheDocument();
        expect(screen.getAllByRole('button')).toHaveLength(1);
        expect(screen.queryByText(/Ukjent|Feilet ved uthenting/)).not.toBeInTheDocument();
    });

    it('viser årsak per part også i eldre foreldreansvarvisning', () => {
        person.foreldreansvar = [
            {
                ansvar: 'felles',
                ansvarlig: { ident: null, navn: null, skjulingsaarsak },
                ansvarsubject: { ident: null, navn: { fornavn: 'Test', etternavn: 'Barn' } }
            }
        ];
        feilendeSystemer = [PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER];
        render(<ForeldreAnsvar />);
        expect(screen.getByText(`Ansvarlig: ${tekst}`)).toBeInTheDocument();
        expect(screen.getByText(/Gjelder for: Test Barn/)).toBeInTheDocument();
        expect(screen.queryByText(/Feilet ved uthenting/)).not.toBeInTheDocument();
    });

    it.each([Fullmakt, Fullmakter])('beholder fullmaktsmetadata uten tom kopieringsknapp (%s)', async (Komponent) => {
        person.fullmektige = [
            {
                ident: '',
                navn: null,
                skjulingsaarsak,
                fullmakt: {
                    fullmaktId: 'test-fullmakt',
                    fullmaktsgiver: person.fnr,
                    fullmektig: '',
                    gyldigFraOgMed: '2020-01-01',
                    gyldigTilOgMed: null,
                    leserettigheter: [{ kode: 'AAP', beskrivelse: 'Arbeidsavklaringspenger' }],
                    skriverettigheter: [],
                    endringslogg: []
                }
            }
        ];
        render(<Komponent />);
        const utvid = screen.queryByRole('button', { name: /Fullmektig:/ });
        if (utvid) await userEvent.click(utvid);
        expect(screen.getAllByText(new RegExp(tekst)).length).toBeGreaterThan(0);
        expect(screen.getByText(/Gyldig:/)).toBeInTheDocument();
        expect(screen.queryByText(/Ukjent|Navn ikke tilgjengelig/)).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /Kopier/ })).not.toBeInTheDocument();
    });

    it.each([Vergemal, VergemalGammel])(
        'beholder vergemålsmetadata uten personopplysninger (%s)',
        async (Komponent) => {
            person.vergemal = [
                {
                    ident: null,
                    navn: null,
                    skjulingsaarsak,
                    vergesakstype: 'Voksen',
                    omfang: 'Økonomiske forhold',
                    historisk: false
                }
            ];
            render(<Komponent />);
            const utvid = screen.queryByRole('button', { name: /Verge:/ });
            if (utvid) await userEvent.click(utvid);
            expect(screen.getAllByText(new RegExp(tekst)).length).toBeGreaterThan(0);
            expect(screen.getByText(/Økonomiske forhold/)).toBeInTheDocument();
            expect(screen.queryByText(/Ukjent|Navn ikke tilgjengelig/)).not.toBeInTheDocument();
            expect(screen.queryByRole('button', { name: /Kopier/ })).not.toBeInTheDocument();
        }
    );

    it('beholder dødsbokontakten og skifteformen uten tom adresse', () => {
        const dodsbo: PersonData['dodsbo'] = [
            {
                adressat: { personSomAdressat: { navn: [], fnr: null, skjulingsaarsak } },
                adresse: { linje1: '' },
                registrert: '2024-01-01',
                skifteform: DodsboSkifteform.OFFENTLIG
            }
        ];
        render(<KontaktinformasjonDodsbo dodsbo={dodsbo} harFeilendeSystem />);
        expect(screen.getByText(`Dødsbokontakt: ${tekst}`)).toBeInTheDocument();
        expect(screen.getByText('Skifteform: Offentlig')).toBeInTheDocument();
        expect(screen.queryByText(/Ukjent|Feilet ved uthenting|Ingen adressat/)).not.toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
});

it('beholder flere skjulte barn og tilgjengelige barn ved delvis tilgang', () => {
    render(
        <Barn
            harFeilendeSystem={false}
            relasjoner={[
                barn('MANGLER_TILGANG'),
                barn('UAVKLART'),
                { ...barn(), alder: 10, navn: [{ fornavn: 'Test', etternavn: 'Barn' }] }
            ]}
        />
    );
    expect(screen.getByText('Barn: Personopplysninger skjult')).toBeInTheDocument();
    expect(screen.getByText('Barn: Personopplysninger kunne ikke hentes')).toBeInTheDocument();
    expect(screen.getByText(/Test Barn/)).toBeInTheDocument();
    expect(screen.getAllByText('Bor ikke med bruker')).toHaveLength(1);
});

it('beholder historiske vergemål selv når flere vergers ident er skjult', async () => {
    person.historiskeVergemal = aarsaker.map(([skjulingsaarsak]) => ({
        ident: null,
        navn: null,
        skjulingsaarsak,
        vergesakstype: 'Voksen',
        omfang: 'Økonomiske forhold',
        historisk: true,
        gyldighetsPeriode: { gyldigFraOgMed: '2020-01-01', gyldigTilOgMed: '2021-01-01' }
    }));
    feilendeSystemer = [PersonDataFeilendeSystemer.TILGANGSMASKINEN_TREDJEPARTSPERSONER];
    render(<Vergemal />);
    expect(screen.getAllByText('Historisk')).toHaveLength(2);
    for (const [, tekst] of aarsaker) {
        await userEvent.click(screen.getByRole('button', { name: new RegExp(`Verge: ${tekst}`) }));
        expect(screen.getByText(tekst)).toBeInTheDocument();
    }
    expect(screen.queryByRole('button', { name: /Kopier/ })).not.toBeInTheDocument();
});

it.each([null, undefined])('beholder tidligere mapping for barn uten ident og uten årsak (%s)', (skjulingsaarsak) => {
    render(
        <ForelderBarnRelasjonVisning
            harFeilendeSystem={false}
            relasjon={{ ...barn(skjulingsaarsak), navn: [{ fornavn: 'Test', etternavn: 'Barn' }], alder: 10 }}
            beskrivelse="Barn"
        />
    );
    expect(screen.getByText(/Test Barn/)).toBeInTheDocument();
    expect(screen.queryByText(/Personopplysninger/)).not.toBeInTheDocument();
});
