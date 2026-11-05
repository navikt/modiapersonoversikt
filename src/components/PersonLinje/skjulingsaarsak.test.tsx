import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    DodsboSkifteform,
    ForelderBarnRelasjonRolle,
    FullmaktEndringHendelse,
    FullmaktEndringKilde,
    type PersonData,
    PersonDataFeilendeSystemer,
    SivilstandType,
    type Tilgangsavslag
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
import Personopplysninger from './Personopplysninger';
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

function barn(
    skjulingsaarsak?: Skjulingsaarsak | null,
    tilgangsavslag?: Tilgangsavslag
): PersonData['forelderBarnRelasjon'][number] {
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
        skjulingsaarsak,
        tilgangsavslag
    };
}

const aarsaker: [Skjulingsaarsak, string][] = [
    ['MANGLER_TILGANG', 'Personopplysninger skjult'],
    ['UAVKLART', 'Personopplysninger kunne ikke hentes']
];

const detaljertAvslag: [Skjulingsaarsak, string, Tilgangsavslag] = [
    'MANGLER_TILGANG',
    'Personopplysninger er skjult: Du har ikke tilgang til skjermet person',
    { title: 'AVVIST_SKJERMING', message: 'Du har ikke tilgang til skjermet person' }
];

describe.each([...aarsaker, detaljertAvslag])('%s: %s', (skjulingsaarsak, tekst, tilgangsavslag?: Tilgangsavslag) => {
    it.each([ForelderBarnRelasjonVisning, ForelderBarnRelasjonVisningGammel])(
        'beholder barn uten å utlede navn, alder, kjønn eller bosted fra tomme felt (%s)',
        (Komponent) => {
            render(
                <Komponent
                    harFeilendeSystem
                    relasjon={barn(skjulingsaarsak, tilgangsavslag)}
                    beskrivelse="Ukjent"
                    erBarn
                />
            );
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
                            skjulingsaarsak,
                            tilgangsavslag
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
                ansvarsubject: { navn: null, ident: null, skjulingsaarsak, tilgangsavslag }
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
                ansvarlig: { ident: null, navn: null, skjulingsaarsak, tilgangsavslag },
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
                tilgangsavslag,
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
        expect(screen.queryByRole('button', { name: 'Endringslogg' })).not.toBeInTheDocument();
    });

    it.each([Fullmakt, Fullmakter])(
        'viser fullmaktens ident uten skjult profil eller endringslogg (%s)',
        async (Komponent) => {
            person.fullmektige = [
                {
                    ident: '',
                    navn: { fornavn: 'Skjult', etternavn: 'Fullmektig' },
                    digitalKontaktinformasjonTredjepartsperson: { mobiltelefonnummer: '99999999' },
                    skjulingsaarsak,
                    tilgangsavslag,
                    fullmakt: {
                        fullmaktId: 'test-fullmakt',
                        fullmaktsgiver: person.fnr,
                        fullmektig: '01010112345',
                        gyldigFraOgMed: '2020-01-01',
                        leserettigheter: [{ kode: 'AAP', beskrivelse: 'Arbeidsavklaringspenger' }],
                        skriverettigheter: [],
                        endringslogg: [
                            {
                                endringId: 1,
                                registrert: '2020-01-01T10:30:00',
                                registrertAv: 'testsystem',
                                kilde: FullmaktEndringKilde.SYSTEM,
                                hendelse: FullmaktEndringHendelse.OPPRETTELSE_AV_BRUKER,
                                gyldigFraOgMed: '2020-01-01',
                                gyldigTilOgMed: '2020-12-31',
                                leserettigheter: [{ kode: 'AAP', beskrivelse: 'Arbeidsavklaringspenger' }],
                                skriverettigheter: []
                            }
                        ]
                    }
                }
            ];
            feilendeSystemer = [PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER];
            render(<Komponent />);
            const utvid = screen.queryByRole('button', { name: /Fullmektig:/ });
            if (utvid) await userEvent.click(utvid);

            expect(screen.getByRole('button', { name: 'Kopier f.nr.: 010101 12345' })).toBeVisible();
            expect(screen.queryByText(/Skjult Fullmektig|99999999/)).not.toBeInTheDocument();
            const detaljer = screen.queryByRole('button', { name: 'Detaljer' });
            if (detaljer) await userEvent.click(detaljer);
            expect(screen.queryByRole('button', { name: 'Endringslogg' })).not.toBeInTheDocument();
            expect(screen.queryByText('Registrert av: testsystem')).not.toBeInTheDocument();
            expect(screen.getAllByText('Leserettigheter: arbeidsavklaringspenger').length).toBeGreaterThan(0);
        }
    );

    it.each([Vergemal, VergemalGammel])(
        'beholder vergemålsmetadata uten personopplysninger (%s)',
        async (Komponent) => {
            person.vergemal = [
                {
                    ident: null,
                    navn: null,
                    skjulingsaarsak,
                    tilgangsavslag,
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
                adressat: { personSomAdressat: { navn: [], fnr: null, skjulingsaarsak, tilgangsavslag } },
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

it.each([
    [{ title: ' ', message: '' }, 'Personopplysninger skjult'],
    [{ title: 'AVVIST_SKJERMING', message: '  ' }, 'Personopplysninger skjult'],
    [{ title: null, message: 'Begrunnelse uten tittel' }, 'Personopplysninger er skjult: Begrunnelse uten tittel'],
    [{ title: 'NY_AVSLAGSKODE', message: null }, 'Personopplysninger skjult']
])('viser meldingen eller generell årsak, aldri tittelen (%s)', (tilgangsavslag, tekst) => {
    render(
        <Personopplysninger skjulingsaarsak="MANGLER_TILGANG" tilgangsavslag={tilgangsavslag}>
            Skjult personprofil
        </Personopplysninger>
    );
    expect(screen.getByText(tekst)).toBeVisible();
    expect(screen.queryByText('Skjult personprofil')).not.toBeInTheDocument();
});

it('skjuler tittelen og viser meldingen som tekst, ikke HTML', () => {
    const title = '<img src=x onerror=alert(1)>';
    const message = '<script>alert(2)</script>';
    const { container } = render(
        <Personopplysninger skjulingsaarsak="MANGLER_TILGANG" tilgangsavslag={{ title, message }} />
    );
    expect(screen.getByText(`Personopplysninger er skjult: ${message}`)).toBeVisible();
    expect(screen.queryByText(title, { exact: false })).not.toBeInTheDocument();
    expect(container.querySelector('img, script')).toBeNull();
});

it.each([null, 'UAVKLART'] as const)('bruker ikke avslagsdetaljer ved %s', (skjulingsaarsak) => {
    render(
        <Personopplysninger skjulingsaarsak={skjulingsaarsak} tilgangsavslag={detaljertAvslag[2]}>
            Innebygd personnavn
        </Personopplysninger>
    );
    expect(
        screen.getByText(skjulingsaarsak ? 'Personopplysninger kunne ikke hentes' : 'Innebygd personnavn')
    ).toBeVisible();
    expect(screen.queryByText(/AVVIST_SKJERMING/)).not.toBeInTheDocument();
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

it.each([ForelderBarnRelasjonVisning, ForelderBarnRelasjonVisningGammel])(
    'viser innebygde barneopplysninger selv ved teknisk PDL-feil (%s)',
    (Komponent) => {
        render(
            <Komponent
                harFeilendeSystem
                relasjon={{ ...barn(), navn: [{ fornavn: 'Innebygd', etternavn: 'Barn' }], alder: 10 }}
                beskrivelse="Barn"
                erBarn
            />
        );
        expect(screen.getByText(/Innebygd Barn/)).toBeVisible();
    }
);

it.each(['ny', 'eldre'])('viser innebygd ansvarlig ved teknisk PDL-feil i %s visning', (visning) => {
    person.foreldreansvar = [
        {
            ansvar: 'felles',
            ansvarlig: { navn: { fornavn: 'Innebygd', etternavn: 'Forelder' }, ident: null },
            ansvarsubject: null
        }
    ];
    feilendeSystemer = [PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER];
    render(
        visning === 'ny' ? (
            <ForeldreansvarListe harFeilendeSystem foreldreansvar={person.foreldreansvar} />
        ) : (
            <ForeldreAnsvar />
        )
    );
    expect(screen.getByText(/Ansvarlig: Innebygd Forelder/)).toBeVisible();
    expect(screen.queryByText(/Feilet ved uthenting/)).not.toBeInTheDocument();
});
