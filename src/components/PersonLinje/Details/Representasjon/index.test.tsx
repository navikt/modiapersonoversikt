import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    type Fullmaktsoppdrag,
    type PersonData,
    PersonDataFeilendeSystemer,
    Skjulingsaarsak
} from 'src/lib/types/modiapersonoversikt-api';
import { representasjonsoppdragMock } from 'src/mock/persondata/representasjonsoppdrag';
import { createPersonData } from 'src/test/createPersonData';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Representasjon } from './index';

let person = createPersonData();
let feilendeSystemer: PersonDataFeilendeSystemer[] = [];
let harPersondata = true;
let oppdrag: Pick<PersonData, 'fullmaktsgivere' | 'vergehavere'>;

vi.mock('src/lib/clients/modiapersonoversikt-api', () => ({
    usePersonData: () => ({ data: harPersondata ? { person: { ...person, ...oppdrag }, feilendeSystemer } : undefined })
}));

beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-03-10T12:00:00Z'));
    person = createPersonData();
    feilendeSystemer = [];
    harPersondata = true;
    oppdrag = { fullmaktsgivere: [], vergehavere: [] };
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
        oppdrag = representasjonsoppdragMock;
        render(<Representasjon />);
        const region = screen.getByRole('region', { name: tittel });
        await userEvent.click(within(region).getByRole('button', { name: `${navn} Aktiv` }));
        expect(within(region).getByText(navn, { selector: 'p' })).toBeVisible();
        expect(within(region).getByRole('button', { name: /^Kopier f\.nr\./ })).toBeVisible();
    });

    it('sorterer alle forhold, beholder flere forhold til samme person og inkluderer begge datogrenser', async () => {
        oppdrag = {
            fullmaktsgivere: [
                fullmakt('historisk', '2020-01-01', '2026-03-09'),
                fullmakt('fremtidig', '2026-03-11'),
                fullmakt('slutter', '2025-01-01', '2026-03-10'),
                fullmakt('begynner', '2026-03-10', '2026-03-10'),
                fullmakt('a', '2024-01-01'),
                fullmakt('b', '2024-01-01')
            ],
            vergehavere: []
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
        oppdrag = {
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
            oppdrag = {
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
                vergehavere: []
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

    it('viser ikke tomtilstand eller separat lasting når persondata mangler', () => {
        harPersondata = false;
        const { rerender } = render(<Representasjon />);
        expect(screen.queryByText('Ingen representasjonsdata')).not.toBeInTheDocument();
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
        harPersondata = true;
        rerender(<Representasjon />);
        expect(screen.getByText('Ingen representasjonsdata')).toBeVisible();
        expect(screen.queryByRole('button', { name: 'Prøv igjen' })).not.toBeInTheDocument();
    });

    it.each([PersonDataFeilendeSystemer.REPR_API_FULLMAKTSGIVERE, PersonDataFeilendeSystemer.REPR_API_VERGEHAVERE])(
        'beholder vellykket liste og eksisterende innhold ved %s-feil',
        (feil) => {
            person.rettsligHandleevne = [{ omfang: 'Testomfang', gyldighetsPeriode: {} }];
            feilendeSystemer = [feil];
            oppdrag = {
                ...representasjonsoppdragMock,
                fullmaktsgivere:
                    feil === PersonDataFeilendeSystemer.REPR_API_FULLMAKTSGIVERE
                        ? []
                        : representasjonsoppdragMock.fullmaktsgivere,
                vergehavere:
                    feil === PersonDataFeilendeSystemer.REPR_API_VERGEHAVERE
                        ? []
                        : representasjonsoppdragMock.vergehavere
            };
            render(<Representasjon />);
            expect(screen.getByRole('heading', { name: 'Rettslig handleevne' })).toBeVisible();
            expect(
                screen.getByText(
                    feil === PersonDataFeilendeSystemer.REPR_API_FULLMAKTSGIVERE
                        ? 'Kunne ikke hente hvem personen har fullmakt for.'
                        : 'Kunne ikke hente hvem personen er verge for.'
                )
            ).toBeVisible();
            expect(
                screen.getByRole('button', {
                    name:
                        feil === PersonDataFeilendeSystemer.REPR_API_FULLMAKTSGIVERE
                            ? 'Testperson Vergehaver Aktiv'
                            : 'Testperson Fullmaktsgiver Aktiv'
                })
            ).toBeVisible();
            expect(screen.queryByRole('button', { name: 'Prøv igjen' })).not.toBeInTheDocument();
            expect(screen.queryByText('Ingen representasjonsdata')).not.toBeInTheDocument();
        }
    );

    it.each([
        PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER,
        PersonDataFeilendeSystemer.TILGANGSMASKINEN_TREDJEPARTSPERSONER
    ])('viser feil fra felles tredjepersonoppslag uten retry-knapp ved %s', (feil) => {
        feilendeSystemer = [feil];
        oppdrag = representasjonsoppdragMock;
        render(<Representasjon />);
        expect(screen.getByText('Noen personopplysninger kunne ikke hentes.')).toBeVisible();
        expect(screen.getByRole('button', { name: 'Testperson Vergehaver Aktiv' })).toBeVisible();
        expect(screen.queryByRole('button', { name: 'Prøv igjen' })).not.toBeInTheDocument();
        expect(screen.queryByText('Ingen representasjonsdata')).not.toBeInTheDocument();
    });

    it('viser tomtilstand bare når gamle og nye data er avklart som tomme uten feil', () => {
        const { rerender } = render(<Representasjon />);
        expect(screen.getByText('Ingen representasjonsdata')).toBeVisible();
        feilendeSystemer = [PersonDataFeilendeSystemer.REPR_API];
        rerender(<Representasjon />);
        expect(screen.queryByText('Ingen representasjonsdata')).not.toBeInTheDocument();
        expect(screen.getByText('Feilet ved uthenting av fullmakter')).toBeVisible();
    });

    it('skiller to feilende kilder fra ingen forhold', () => {
        feilendeSystemer = [
            PersonDataFeilendeSystemer.REPR_API_FULLMAKTSGIVERE,
            PersonDataFeilendeSystemer.REPR_API_VERGEHAVERE
        ];
        render(<Representasjon />);
        expect(screen.getByText('Kunne ikke hente hvem personen er verge for.')).toBeVisible();
        expect(screen.getByText('Kunne ikke hente hvem personen har fullmakt for.')).toBeVisible();
        expect(screen.queryByText('Ingen representasjonsdata')).not.toBeInTheDocument();
    });
});
