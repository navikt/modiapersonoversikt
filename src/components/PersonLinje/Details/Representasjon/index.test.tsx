import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    type Fullmaktsoppdrag,
    PersonDataFeilendeSystemer,
    type Representasjonsoppdrag,
    RepresentasjonsoppdragFeilendeSystemer,
    Skjulingsaarsak
} from 'src/lib/types/modiapersonoversikt-api';
import { representasjonsoppdragMock } from 'src/mock/persondata/representasjonsoppdrag';
import { createPersonData } from 'src/test/createPersonData';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Representasjon } from './index';

let person = createPersonData();
let feilendeSystemer: PersonDataFeilendeSystemer[] = [];
const refetch = vi.fn();
let oppdrag: {
    data?: Representasjonsoppdrag;
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    isFetching: boolean;
    refetch: typeof refetch;
};

vi.mock('src/lib/clients/modiapersonoversikt-api', () => ({
    usePersonData: () => ({ data: { person, feilendeSystemer } }),
    useRepresentasjonsoppdrag: () => oppdrag
}));

beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-03-10T12:00:00Z'));
    person = createPersonData();
    feilendeSystemer = [];
    refetch.mockClear();
    oppdrag = {
        data: { fullmaktsgivere: [], vergehavere: [], feilendeSystemer: [] },
        isPending: false,
        isError: false,
        isSuccess: true,
        isFetching: false,
        refetch
    };
});

afterEach(() => vi.useRealTimers());

function fullmakt(id: string, gyldigFraOgMed: string, gyldigTilOgMed?: string): Fullmaktsoppdrag {
    return {
        ...representasjonsoppdragMock.fullmaktsgivere[0],
        id,
        person: { navn: { fornavn: 'Testperson', etternavn: id === 'a' || id === 'b' ? 'Felles' : id } },
        gyldigFraOgMed,
        gyldigTilOgMed
    };
}

describe('Representasjonsoppdrag på Hjem', () => {
    it.each([
        ['Er verge for', 'Testperson Vergehaver'],
        ['Har fullmakt for', 'Testperson Fullmaktsgiver']
    ])('viser navn og FNR-kopieringsknapp inne i %s', async (tittel, navn) => {
        oppdrag.data = representasjonsoppdragMock;
        render(<Representasjon />);
        const region = screen.getByRole('region', { name: tittel });
        await userEvent.click(within(region).getByRole('button', { name: `${navn} Aktiv` }));
        expect(within(region).getByText(navn, { selector: 'p' })).toBeVisible();
        expect(within(region).getByRole('button', { name: /^Kopier f\.nr\./ })).toBeVisible();
    });

    it('sorterer alle forhold, beholder flere forhold til samme person og inkluderer begge datogrenser', async () => {
        oppdrag.data = {
            fullmaktsgivere: [
                fullmakt('historisk', '2020-01-01', '2026-03-09'),
                fullmakt('fremtidig', '2026-03-11'),
                fullmakt('slutter', '2025-01-01', '2026-03-10'),
                fullmakt('begynner', '2026-03-10', '2026-03-10'),
                fullmakt('a', '2024-01-01'),
                fullmakt('b', '2024-01-01')
            ],
            vergehavere: [],
            feilendeSystemer: []
        };
        render(<Representasjon />);
        expect(
            screen
                .getAllByRole('button')
                .map((knapp) => [
                    within(knapp).getByText(/^Testperson/).textContent,
                    within(knapp).getByText(/^(Aktiv|Fremtidig|Historisk)$/).textContent
                ])
        ).toEqual([
            ['Testperson Begynner', 'Aktiv'],
            ['Testperson Slutter', 'Aktiv'],
            ['Testperson Felles', 'Aktiv'],
            ['Testperson Felles', 'Aktiv'],
            ['Testperson Fremtidig', 'Fremtidig'],
            ['Testperson Historisk', 'Historisk']
        ]);
        const begynner = screen.getByRole('button', { name: 'Testperson Begynner Aktiv' });
        expect(within(begynner).getByText('Aktiv')).toHaveAttribute('data-color', 'success');
        for (const status of ['Fremtidig', 'Historisk']) {
            const knapp = screen.getByRole('button', { name: `Testperson ${status} ${status}` });
            expect(within(knapp).getByText(status)).toHaveAttribute('data-color', 'neutral');
        }
        await userEvent.click(begynner);
        expect(screen.getByText('Gyldig: 10.03.2026 – 10.03.2026')).toBeVisible();
    });

    it('viser også ett vergemål i accordion med statusetikett og bevarer tastaturstyrt utvidelse', async () => {
        oppdrag.data = {
            ...representasjonsoppdragMock,
            vergehavere: [{ ...representasjonsoppdragMock.vergehavere[0], aktivt: false, gyldigFraOgMed: '2030-01-01' }]
        };
        render(<Representasjon />);
        expect(screen.getByRole('heading', { name: 'Er verge for', level: 4 })).toBeVisible();
        expect(screen.getByRole('heading', { name: 'Har fullmakt for', level: 4 })).toBeVisible();
        const verge = screen.getByRole('button', { name: 'Testperson Vergehaver Historisk' });
        expect(within(verge).getByText('Historisk')).toHaveAttribute('data-color', 'neutral');
        expect(verge).toHaveAttribute('aria-expanded', 'false');
        expect(screen.queryByRole('button', { name: 'Vis detaljer' })).not.toBeInTheDocument();
        verge.focus();
        await userEvent.keyboard('{Enter}');
        expect(verge).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByText('Vergemålstype: VOKSEN')).toBeVisible();
        expect(screen.getByText('Gyldig fra: 01.01.2030')).toBeVisible();
        expect(screen.getByText('Skriverettigheter: arbeidsavklaringspenger')).toBeVisible();
        await userEvent.keyboard('{Enter}');
        expect(verge).toHaveAttribute('aria-expanded', 'false');
        expect(verge).toHaveFocus();
    });

    it.each([Skjulingsaarsak.MANGLER_TILGANG, Skjulingsaarsak.UAVKLART])(
        'viser årsak uten motpartens navn eller ident ved %s',
        async (skjulingsaarsak) => {
            oppdrag.data = {
                fullmaktsgivere: [
                    {
                        ...fullmakt('skjult', '2020-01-01'),
                        person: {
                            ident: '19818197553',
                            navn: { fornavn: 'Skjult', etternavn: 'Testnavn' },
                            skjulingsaarsak
                        }
                    }
                ],
                vergehavere: [],
                feilendeSystemer: []
            };
            const { container } = render(<Representasjon />);
            await userEvent.click(screen.getByRole('button', { name: /Personopplysninger/ }));
            expect(container).not.toHaveTextContent('19818197553');
            expect(container).not.toHaveTextContent('Skjult Testnavn');
            expect(container).toHaveTextContent(
                skjulingsaarsak === Skjulingsaarsak.MANGLER_TILGANG
                    ? 'Personopplysninger skjult'
                    : 'Personopplysninger kunne ikke hentes'
            );
            expect(screen.getByText('Leserettigheter: dagpenger')).toBeVisible();
            expect(screen.queryByRole('button', { name: /kopier/i })).not.toBeInTheDocument();
        }
    );

    it('viser ikke tomtilstand under lasting eller etter feil, og lar saksbehandler prøve igjen', async () => {
        oppdrag = { ...oppdrag, data: undefined, isPending: true, isSuccess: false };
        const { rerender } = render(<Representasjon />);
        expect(screen.getByRole('status')).toHaveTextContent('Henter hvem personen representerer');
        expect(screen.queryByText('Ingen representasjonsdata')).not.toBeInTheDocument();
        oppdrag = { ...oppdrag, isPending: false, isError: true };
        rerender(<Representasjon />);
        await userEvent.click(screen.getByRole('button', { name: 'Prøv igjen' }));
        expect(refetch).toHaveBeenCalledOnce();
        expect(screen.queryByText('Ingen representasjonsdata')).not.toBeInTheDocument();
    });

    it.each([RepresentasjonsoppdragFeilendeSystemer.FULLMAKTER, RepresentasjonsoppdragFeilendeSystemer.VERGEMAL])(
        'beholder vellykket liste og eksisterende innhold ved %s-feil',
        async (feil) => {
            person.rettsligHandleevne = [{ omfang: 'Testomfang', gyldighetsPeriode: {} }];
            oppdrag.data = {
                ...representasjonsoppdragMock,
                fullmaktsgivere:
                    feil === RepresentasjonsoppdragFeilendeSystemer.FULLMAKTER
                        ? []
                        : representasjonsoppdragMock.fullmaktsgivere,
                vergehavere:
                    feil === RepresentasjonsoppdragFeilendeSystemer.VERGEMAL
                        ? []
                        : representasjonsoppdragMock.vergehavere,
                feilendeSystemer: [feil]
            };
            render(<Representasjon />);
            expect(screen.getByRole('heading', { name: 'Rettslig handleevne' })).toBeVisible();
            expect(
                screen.getByText(
                    feil === RepresentasjonsoppdragFeilendeSystemer.FULLMAKTER
                        ? 'Kunne ikke hente hvem personen har fullmakt for.'
                        : 'Kunne ikke hente hvem personen er verge for.'
                )
            ).toBeVisible();
            expect(
                screen.getByRole('button', {
                    name:
                        feil === RepresentasjonsoppdragFeilendeSystemer.FULLMAKTER
                            ? 'Testperson Vergehaver Aktiv'
                            : 'Testperson Fullmaktsgiver Aktiv'
                })
            ).toBeVisible();
            await userEvent.click(screen.getByRole('button', { name: 'Prøv igjen' }));
            expect(refetch).toHaveBeenCalledOnce();
            expect(screen.queryByText('Ingen representasjonsdata')).not.toBeInTheDocument();
        }
    );

    it('viser tomtilstand bare når gamle og nye data er avklart som tomme uten feil', () => {
        const { rerender } = render(<Representasjon />);
        expect(screen.getByText('Ingen representasjonsdata')).toBeVisible();
        feilendeSystemer = [PersonDataFeilendeSystemer.REPR_API];
        rerender(<Representasjon />);
        expect(screen.queryByText('Ingen representasjonsdata')).not.toBeInTheDocument();
        expect(screen.getByText('Feilet ved uthenting av fullmakter')).toBeVisible();
    });

    it('skiller to feilende kilder fra ingen forhold', () => {
        oppdrag.data = {
            fullmaktsgivere: [],
            vergehavere: [],
            feilendeSystemer: [
                RepresentasjonsoppdragFeilendeSystemer.FULLMAKTER,
                RepresentasjonsoppdragFeilendeSystemer.VERGEMAL
            ]
        };
        render(<Representasjon />);
        expect(screen.getByText('Kunne ikke hente hvem personen er verge for.')).toBeVisible();
        expect(screen.getByText('Kunne ikke hente hvem personen har fullmakt for.')).toBeVisible();
        expect(screen.queryByText('Ingen representasjonsdata')).not.toBeInTheDocument();
    });
});
